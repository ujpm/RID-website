import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { BlockEditor } from '../components/ui/BlockEditor';
import { BlockRenderer } from '../components/ui/BlockRenderer';
import type { IBlock } from '../components/ui/BlockRenderer';

interface IUpdate {
  _id: string;
  title: string;
  excerpt: string;
  content: any; // Can be string or IBlock[]
  imageUrl: string;
  publishedDate: string;
}

const AdminUpdates = () => {
  const navigate = useNavigate();
  const [updates, setUpdates] = useState<IUpdate[]>([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  
  const [formData, setFormData] = useState({ title: '', excerpt: '' });
  const [blocks, setBlocks] = useState<IBlock[]>([{ id: 'init', type: 'paragraph', content: '' }]);
  
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [showPreview, setShowPreview] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  
  const token = localStorage.getItem('rid_admin_token');
  const apiUrl = import.meta.env.VITE_API_URL || '/api';

  useEffect(() => {
    if (!token) navigate('/admin');
    else fetchUpdates();
  }, [navigate, token]);

  const fetchUpdates = async () => {
    try {
      const res = await fetch(`${apiUrl}/updates`);
      const json = await res.json();
      if (json.success) setUpdates(json.data);
    } catch (err) { console.error('Failed to fetch updates.'); } 
    finally { setLoading(false); }
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setImageFile(e.target.files[0]);
      setPreviewUrl(URL.createObjectURL(e.target.files[0]));
    } else {
      setImageFile(null);
      if (!editingId) setPreviewUrl(null);
    }
  };

  const handleEditClick = (update: IUpdate) => {
    setEditingId(update._id);
    setFormData({ title: update.title, excerpt: update.excerpt });
    setPreviewUrl(update.imageUrl);
    setImageFile(null);
    setShowPreview(false);
    
    // Graceful fallback to convert legacy strings into the new Block Editor format
    if (typeof update.content === 'string') {
      setBlocks([{ id: Date.now().toString(), type: 'paragraph', content: update.content }]);
    } else {
      setBlocks(update.content || []);
    }
    
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const resetForm = () => {
    setEditingId(null);
    setFormData({ title: '', excerpt: '' });
    setBlocks([{ id: Date.now().toString(), type: 'paragraph', content: '' }]);
    setImageFile(null);
    setPreviewUrl(null);
    setShowPreview(false);
    const fileInput = document.getElementById('image-upload') as HTMLInputElement;
    if (fileInput) fileInput.value = '';
  };

  const handleSubmit = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!imageFile && !editingId) return alert('Please select a cover image.');

    setUploading(true);
    let finalImageUrl = previewUrl;

    try {
      if (imageFile) {
        const uploadData = new FormData();
        uploadData.append('image', imageFile);
        const uploadRes = await fetch(`${apiUrl}/upload`, {
          method: 'POST',
          headers: { Authorization: `Bearer ${token}` },
          body: uploadData
        });
        const uploadJson = await uploadRes.json();
        if (!uploadJson.success) throw new Error('Cover image upload failed.');
        finalImageUrl = uploadJson.data.url;
      }

      const method = editingId ? 'PUT' : 'POST';
      const endpoint = editingId ? `${apiUrl}/updates/${editingId}` : `${apiUrl}/updates`;

      const postRes = await fetch(endpoint, {
        method,
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
        body: JSON.stringify({ ...formData, content: blocks, imageUrl: finalImageUrl })
      });
      const postJson = await postRes.json();

      if (postJson.success) {
        resetForm();
        fetchUpdates();
      } else alert(postJson.error);
    } catch (err: any) { alert(err.message || 'Failed to save update.'); } 
    finally { setUploading(false); }
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm('Delete this update?')) return;
    try {
      const res = await fetch(`${apiUrl}/updates/${id}`, { method: 'DELETE', headers: { Authorization: `Bearer ${token}` } });
      const json = await res.json();
      if (json.success) fetchUpdates();
    } catch (err) { alert('Failed to delete update.'); }
  };

  return (
    <div style={{ padding: '50px', maxWidth: '1000px', margin: '0 auto' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '30px' }}>
        <h2>Manage Updates</h2>
        <button onClick={() => navigate('/admin/dashboard')} style={{ padding: '8px 15px', cursor: 'pointer' }}>Back to Dashboard</button>
      </div>

      <div style={{ backgroundColor: '#f9f9f9', padding: '20px', borderRadius: '8px', marginBottom: '40px', border: editingId ? '2px solid #f39c12' : 'none' }}>
        {!showPreview ? (
          <>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <h3 style={{ color: editingId ? '#f39c12' : 'inherit' }}>{editingId ? '✏️ Editing Post' : 'Create New Update'}</h3>
              <div>
                {editingId && <button type="button" onClick={resetForm} style={{ marginRight: '10px', padding: '8px 15px', backgroundColor: '#ccc', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>Cancel Edit</button>}
                <button type="button" onClick={() => {
                  if (!formData.title || (!imageFile && !previewUrl)) return alert('Add a title and image to preview.');
                  setShowPreview(true);
                }} style={{ padding: '8px 15px', backgroundColor: '#f39c12', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>👀 Preview Post</button>
              </div>
            </div>

            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '20px', marginTop: '15px' }}>
              <input type="text" placeholder="Title" value={formData.title} onChange={e => setFormData({...formData, title: e.target.value})} required style={{ padding: '10px', fontSize: '1.2em', fontWeight: 'bold' }} />
              <input type="text" placeholder="Excerpt (Short summary)" value={formData.excerpt} onChange={e => setFormData({...formData, excerpt: e.target.value})} required style={{ padding: '10px' }} />
              
              <div style={{ padding: '15px', border: '1px dashed #ccc', borderRadius: '5px', backgroundColor: '#fff' }}>
                <label htmlFor="image-upload" style={{ fontWeight: 'bold', fontSize: '0.9em' }}>{editingId ? 'Change Cover Image (Optional):' : <>Upload Cover Image:<br/><span style={{fontSize:'0.8em', color:'#666', fontWeight:'normal'}}>* Recommended Size: 1200x800px (16:9 ratio)</span></>}</label>
                <input id="image-upload" type="file" accept="image/*" onChange={handleImageChange} required={!editingId} style={{ display: 'block', marginTop: '10px' }} />
                {previewUrl && <img src={previewUrl} alt="Preview" style={{ marginTop: '10px', width: '100%', maxWidth: '300px', borderRadius: '4px', objectFit: 'cover' }} />}
              </div>

              {/* MODULAR BLOCK EDITOR INJECTED HERE */}
              <BlockEditor blocks={blocks} onChange={setBlocks} />

              <button type="submit" disabled={uploading} style={{ padding: '15px', backgroundColor: editingId ? '#27ae60' : '#002147', color: 'white', border: 'none', borderRadius: '4px', cursor: uploading ? 'not-allowed' : 'pointer', fontSize: '1.1em', fontWeight: 'bold' }}>
                {uploading ? 'Saving Data...' : (editingId ? '✅ Update Post' : '🚀 Publish Directly')}
              </button>
            </form>
          </>
        ) : (
          <div style={{ padding: '20px', border: '2px solid #002147', borderRadius: '8px', backgroundColor: '#fff' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px', borderBottom: '1px solid #ddd', paddingBottom: '10px' }}>
              <h3 style={{ margin: 0, color: '#f39c12' }}>Live Preview Mode</h3>
              <button onClick={() => setShowPreview(false)} style={{ padding: '5px 10px', cursor: 'pointer' }}>✏️ Back to Edit</button>
            </div>
            
            <article style={{ fontFamily: 'sans-serif', maxWidth: '800px', margin: '0 auto' }}>
              {previewUrl && <img src={previewUrl} alt="Preview" style={{ width: '100%', height: '400px', objectFit: 'cover', borderRadius: '8px', marginBottom: '20px' }} />}
              <h1 style={{ color: '#002147', marginBottom: '10px', fontSize: '2.5em' }}>{formData.title}</h1>
              <p style={{ fontSize: '1.2em', fontWeight: 'bold', color: '#333', marginBottom: '30px', borderLeft: '4px solid #f39c12', paddingLeft: '15px' }}>{formData.excerpt}</p>
              
              {/* MODULAR BLOCK RENDERER INJECTED HERE */}
              <BlockRenderer content={blocks} />
            </article>

            <div style={{ marginTop: '30px', paddingTop: '20px', borderTop: '1px solid #ddd', display: 'flex', justifyContent: 'flex-end', gap: '15px' }}>
              <button onClick={() => setShowPreview(false)} style={{ padding: '10px 20px', backgroundColor: '#ccc', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>Cancel</button>
              <button onClick={() => handleSubmit()} disabled={uploading} style={{ padding: '10px 20px', backgroundColor: '#27ae60', color: 'white', border: 'none', borderRadius: '4px', cursor: uploading ? 'not-allowed' : 'pointer', fontWeight: 'bold' }}>
                {uploading ? 'Saving...' : (editingId ? '✅ Confirm Update' : '✅ Confirm & Publish')}
              </button>
            </div>
          </div>
        )}
      </div>

      {/* List rendering logic unchanged */}
      <h3>Current Updates</h3>
      {loading ? <p>Loading...</p> : (
        <ul style={{ listStyle: 'none', padding: 0 }}>
          {updates.map(update => (
            <li key={update._id} style={{ display: 'flex', justifyContent: 'space-between', padding: '15px', borderBottom: '1px solid #ddd', alignItems: 'center' }}>
              <div style={{ display: 'flex', gap: '15px', alignItems: 'center' }}>
                <img src={update.imageUrl} alt={update.title} style={{ width: '80px', height: '60px', objectFit: 'cover', borderRadius: '4px' }} />
                <div>
                  <strong>{update.title}</strong>
                  <p style={{ margin: '5px 0', fontSize: '0.9em', color: '#555' }}>{new Date(update.publishedDate).toLocaleDateString()}</p>
                </div>
              </div>
              <div style={{ display: 'flex', gap: '10px' }}>
                <button onClick={() => handleEditClick(update)} style={{ backgroundColor: '#f39c12', color: 'white', border: 'none', padding: '5px 10px', borderRadius: '4px', cursor: 'pointer' }}>Edit</button>
                <button onClick={() => handleDelete(update._id)} style={{ backgroundColor: '#e74c3c', color: 'white', border: 'none', padding: '5px 10px', borderRadius: '4px', cursor: 'pointer' }}>Delete</button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default AdminUpdates;
