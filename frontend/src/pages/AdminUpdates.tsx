import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

interface IUpdate {
  _id: string;
  title: string;
  excerpt: string;
  content: string;
  imageUrl: string;
  publishedDate: string;
}

const AdminUpdates = () => {
  const navigate = useNavigate();
  const [updates, setUpdates] = useState<IUpdate[]>([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  
  const [formData, setFormData] = useState({ title: '', excerpt: '', content: '' });
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [showPreview, setShowPreview] = useState(false);
  
  // NEW: State to track if we are editing an existing post
  const [editingId, setEditingId] = useState<string | null>(null);
  
  const token = localStorage.getItem('rid_admin_token');
  const apiUrl = import.meta.env.VITE_API_URL || '/api';

  useEffect(() => {
    if (!token) navigate('/admin');
    else fetchUpdates();
  }, [navigate, token]);

  useEffect(() => {
    return () => {
      // Only revoke object URLs, not our actual Cloudinary URLs
      if (previewUrl && previewUrl.startsWith('blob:')) URL.revokeObjectURL(previewUrl);
    };
  }, [previewUrl]);

  const fetchUpdates = async () => {
    try {
      const res = await fetch(`${apiUrl}/updates`);
      const json = await res.json();
      if (json.success) setUpdates(json.data);
    } catch (err) {
      console.error('Failed to fetch updates.');
    } finally { setLoading(false); }
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setImageFile(file);
      setPreviewUrl(URL.createObjectURL(file));
    } else {
      setImageFile(null);
      if (!editingId) setPreviewUrl(null); // Keep preview if editing and they cancel file dialog
    }
  };

  // NEW: Load existing data into form
  const handleEditClick = (update: IUpdate) => {
    setEditingId(update._id);
    setFormData({ title: update.title, excerpt: update.excerpt, content: update.content });
    setPreviewUrl(update.imageUrl);
    setImageFile(null); // Clear any pending local file
    setShowPreview(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const resetForm = () => {
    setEditingId(null);
    setFormData({ title: '', excerpt: '', content: '' });
    setImageFile(null);
    setPreviewUrl(null);
    setShowPreview(false);
    const fileInput = document.getElementById('image-upload') as HTMLInputElement;
    if (fileInput) fileInput.value = '';
  };

  const handleSubmit = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!imageFile && !editingId) {
      alert('Please select an image file to upload.');
      return;
    }

    setUploading(true);
    let finalImageUrl = previewUrl; // Default to existing URL if editing

    try {
      // Only upload to Cloudinary if they selected a NEW file
      if (imageFile) {
        const uploadData = new FormData();
        uploadData.append('image', imageFile);

        const uploadRes = await fetch(`${apiUrl}/upload`, {
          method: 'POST',
          headers: { Authorization: `Bearer ${token}` },
          body: uploadData
        });
        const uploadJson = await uploadRes.json();
        if (!uploadJson.success) throw new Error(uploadJson.error || 'Image upload failed.');
        finalImageUrl = uploadJson.data.url;
      }

      // Determine Method and URL
      const method = editingId ? 'PUT' : 'POST';
      const endpoint = editingId ? `${apiUrl}/updates/${editingId}` : `${apiUrl}/updates`;

      const postRes = await fetch(endpoint, {
        method: method,
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
        body: JSON.stringify({ ...formData, imageUrl: finalImageUrl })
      });
      const postJson = await postRes.json();

      if (postJson.success) {
        resetForm();
        fetchUpdates();
      } else {
        alert(postJson.error);
      }
    } catch (err: any) {
      alert(err.message || 'Failed to save update.');
    } finally {
      setUploading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm('Are you sure you want to delete this update?')) return;
    try {
      const res = await fetch(`${apiUrl}/updates/${id}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` }
      });
      const json = await res.json();
      if (json.success) fetchUpdates();
      else alert(json.error);
    } catch (err) { alert('Failed to delete update.'); }
  };

  return (
    <div style={{ padding: '50px', maxWidth: '900px', margin: '0 auto' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '30px' }}>
        <h2>Manage Updates</h2>
        <button onClick={() => navigate('/admin/dashboard')} style={{ padding: '8px 15px', cursor: 'pointer' }}>Back to Dashboard</button>
      </div>

      <div style={{ backgroundColor: '#f9f9f9', padding: '20px', borderRadius: '8px', marginBottom: '40px', border: editingId ? '2px solid #f39c12' : 'none' }}>
        
        {!showPreview ? (
          <>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <h3 style={{ color: editingId ? '#f39c12' : 'inherit' }}>
                {editingId ? '✏️ Editing Post' : 'Create New Update'}
              </h3>
              <div>
                {editingId && (
                  <button type="button" onClick={resetForm} style={{ marginRight: '10px', padding: '8px 15px', backgroundColor: '#ccc', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>Cancel Edit</button>
                )}
                <button type="button" onClick={() => {
                  if (!formData.title || (!imageFile && !previewUrl)) return alert('Please add a title and image to preview.');
                  setShowPreview(true);
                }} style={{ padding: '8px 15px', backgroundColor: '#f39c12', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>
                  👀 Preview Post
                </button>
              </div>
            </div>

            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '15px', marginTop: '15px' }}>
              <input type="text" placeholder="Title" value={formData.title} onChange={(e) => setFormData({...formData, title: e.target.value})} required style={{ padding: '10px' }} />
              <input type="text" placeholder="Excerpt (Short summary)" value={formData.excerpt} onChange={(e) => setFormData({...formData, excerpt: e.target.value})} required style={{ padding: '10px' }} />
              <textarea placeholder="Full Content" value={formData.content} onChange={(e) => setFormData({...formData, content: e.target.value})} required rows={5} style={{ padding: '10px', resize: 'vertical' }} />
              
              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', padding: '15px', border: '1px dashed #ccc', borderRadius: '5px', backgroundColor: '#fff' }}>
                <label htmlFor="image-upload" style={{ fontWeight: 'bold', fontSize: '0.9em' }}>
                  {editingId ? 'Change Cover Image (Optional):' : 'Upload Cover Image:'}
                </label>
                <input id="image-upload" type="file" accept="image/*" onChange={handleImageChange} required={!editingId} />
                
                {previewUrl && (
                  <div style={{ marginTop: '10px' }}>
                    <p style={{ fontSize: '0.85em', color: '#666', marginBottom: '5px' }}>Image Preview:</p>
                    <img src={previewUrl} alt="Preview" style={{ width: '100%', maxWidth: '300px', height: 'auto', borderRadius: '4px', objectFit: 'cover', border: '1px solid #ddd' }} />
                  </div>
                )}
              </div>

              <button type="submit" disabled={uploading} style={{ padding: '12px', backgroundColor: editingId ? '#27ae60' : '#002147', color: 'white', border: 'none', borderRadius: '4px', cursor: uploading ? 'not-allowed' : 'pointer', fontSize: '1.05em' }}>
                {uploading ? 'Saving...' : (editingId ? '✅ Update Post' : '🚀 Publish Directly')}
              </button>
            </form>
          </>
        ) : (
          /* PREVIEW MODE (Remains unchanged visually, updated logic) */
          <div style={{ padding: '20px', border: '2px solid #002147', borderRadius: '8px', backgroundColor: '#fff' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px', borderBottom: '1px solid #ddd', paddingBottom: '10px' }}>
              <h3 style={{ margin: 0, color: '#f39c12' }}>Live Preview Mode</h3>
              <button onClick={() => setShowPreview(false)} style={{ padding: '5px 10px', cursor: 'pointer' }}>✏️ Back to Edit</button>
            </div>
            
            <article style={{ fontFamily: 'sans-serif' }}>
              {previewUrl && <img src={previewUrl} alt="Preview" style={{ width: '100%', height: '300px', objectFit: 'cover', borderRadius: '8px', marginBottom: '20px' }} />}
              <h1 style={{ color: '#002147', marginBottom: '10px' }}>{formData.title}</h1>
              <p style={{ fontSize: '1.2em', fontWeight: 'bold', color: '#333', marginBottom: '20px', borderLeft: '4px solid #f39c12', paddingLeft: '10px' }}>{formData.excerpt}</p>
              <div style={{ whiteSpace: 'pre-wrap', lineHeight: '1.6', color: '#444' }}>{formData.content}</div>
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
                <button onClick={() => handleEditClick(update)} style={{ backgroundColor: '#f39c12', color: 'white', border: 'none', padding: '5px 10px', borderRadius: '4px', cursor: 'pointer', height: 'fit-content' }}>Edit</button>
                <button onClick={() => handleDelete(update._id)} style={{ backgroundColor: '#e74c3c', color: 'white', border: 'none', padding: '5px 10px', borderRadius: '4px', cursor: 'pointer', height: 'fit-content' }}>Delete</button>
              </div>
            </li>
          ))}
          {updates.length === 0 && <p>No updates found.</p>}
        </ul>
      )}
    </div>
  );
};

export default AdminUpdates;
