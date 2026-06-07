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
  // NEW: State to toggle the full post preview mode
  const [showPreview, setShowPreview] = useState(false);
  
  const token = localStorage.getItem('rid_admin_token');
  const apiUrl = import.meta.env.VITE_API_URL || '/api';

  useEffect(() => {
    if (!token) {
      navigate('/admin');
      return;
    }
    fetchUpdates();
  }, [navigate, token]);

  useEffect(() => {
    return () => {
      if (previewUrl) URL.revokeObjectURL(previewUrl);
    };
  }, [previewUrl]);

  const fetchUpdates = async () => {
    try {
      const res = await fetch(`${apiUrl}/updates`);
      const json = await res.json();
      if (json.success) setUpdates(json.data);
    } catch (err) {
      console.error('Failed to fetch updates.');
    } finally {
      setLoading(false);
    }
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setImageFile(file);
      setPreviewUrl(URL.createObjectURL(file));
    } else {
      setImageFile(null);
      setPreviewUrl(null);
    }
  };

  const handleCreate = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!imageFile) {
      alert('Please select an image file to upload.');
      return;
    }

    setUploading(true);

    try {
      const uploadData = new FormData();
      uploadData.append('image', imageFile);

      const uploadRes = await fetch(`${apiUrl}/upload`, {
        method: 'POST',
        headers: { Authorization: `Bearer ${token}` },
        body: uploadData
      });
      const uploadJson = await uploadRes.json();

      if (!uploadJson.success) throw new Error(uploadJson.error || 'Image upload failed.');

      const imageUrl = uploadJson.data.url;

      const postRes = await fetch(`${apiUrl}/updates`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({ ...formData, imageUrl })
      });
      const postJson = await postRes.json();

      if (postJson.success) {
        setFormData({ title: '', excerpt: '', content: '' });
        setImageFile(null);
        setPreviewUrl(null);
        setShowPreview(false); // Reset preview mode
        
        const fileInput = document.getElementById('image-upload') as HTMLInputElement;
        if (fileInput) fileInput.value = '';
        
        fetchUpdates();
      } else {
        alert(postJson.error);
      }
    } catch (err: any) {
      alert(err.message || 'Failed to publish update.');
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
    } catch (err) {
      alert('Failed to delete update.');
    }
  };

  return (
    <div style={{ padding: '50px', maxWidth: '900px', margin: '0 auto' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '30px' }}>
        <h2>Manage Updates</h2>
        <button onClick={() => navigate('/admin/dashboard')} style={{ padding: '8px 15px', cursor: 'pointer' }}>Back to Dashboard</button>
      </div>

      <div style={{ backgroundColor: '#f9f9f9', padding: '20px', borderRadius: '8px', marginBottom: '40px' }}>
        
        {/* EDIT MODE */}
        {!showPreview ? (
          <>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <h3>Create New Update</h3>
              <button 
                type="button" 
                onClick={() => {
                  if (!formData.title || !imageFile) return alert('Please add a title and image to preview.');
                  setShowPreview(true);
                }} 
                style={{ padding: '8px 15px', backgroundColor: '#f39c12', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}
              >
                👀 Preview Post
              </button>
            </div>

            <form onSubmit={handleCreate} style={{ display: 'flex', flexDirection: 'column', gap: '15px', marginTop: '15px' }}>
              <input type="text" placeholder="Title" value={formData.title} onChange={(e) => setFormData({...formData, title: e.target.value})} required style={{ padding: '10px' }} />
              <input type="text" placeholder="Excerpt (Short summary)" value={formData.excerpt} onChange={(e) => setFormData({...formData, excerpt: e.target.value})} required style={{ padding: '10px' }} />
              <textarea placeholder="Full Content" value={formData.content} onChange={(e) => setFormData({...formData, content: e.target.value})} required rows={5} style={{ padding: '10px', resize: 'vertical' }} />
              
              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', padding: '15px', border: '1px dashed #ccc', borderRadius: '5px', backgroundColor: '#fff' }}>
                <label htmlFor="image-upload" style={{ fontWeight: 'bold', fontSize: '0.9em' }}>Upload Cover Image:</label>
                <input id="image-upload" type="file" accept="image/*" onChange={handleImageChange} required />
              </div>

              <button type="submit" disabled={uploading} style={{ padding: '12px', backgroundColor: '#002147', color: 'white', border: 'none', borderRadius: '4px', cursor: uploading ? 'not-allowed' : 'pointer', fontSize: '1.05em' }}>
                {uploading ? 'Publishing...' : '🚀 Publish Directly'}
              </button>
            </form>
          </>
        ) : (
          /* PREVIEW MODE */
          <div style={{ padding: '20px', border: '2px solid #002147', borderRadius: '8px', backgroundColor: '#fff' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px', borderBottom: '1px solid #ddd', paddingBottom: '10px' }}>
              <h3 style={{ margin: 0, color: '#f39c12' }}>Live Preview Mode</h3>
              <button onClick={() => setShowPreview(false)} style={{ padding: '5px 10px', cursor: 'pointer' }}>✏️ Back to Edit</button>
            </div>
            
            {/* Mockup of how the post will look */}
            <article style={{ fontFamily: 'sans-serif' }}>
              {previewUrl && <img src={previewUrl} alt="Preview" style={{ width: '100%', height: '300px', objectFit: 'cover', borderRadius: '8px', marginBottom: '20px' }} />}
              <h1 style={{ color: '#002147', marginBottom: '10px' }}>{formData.title}</h1>
              <p style={{ color: '#666', fontSize: '0.9em', marginBottom: '20px' }}>Published: {new Date().toLocaleDateString()}</p>
              <p style={{ fontSize: '1.2em', fontWeight: 'bold', color: '#333', marginBottom: '20px', borderLeft: '4px solid #f39c12', paddingLeft: '10px' }}>
                {formData.excerpt}
              </p>
              <div style={{ whiteSpace: 'pre-wrap', lineHeight: '1.6', color: '#444' }}>
                {formData.content}
              </div>
            </article>

            <div style={{ marginTop: '30px', paddingTop: '20px', borderTop: '1px solid #ddd', display: 'flex', justifyContent: 'flex-end', gap: '15px' }}>
              <button onClick={() => setShowPreview(false)} style={{ padding: '10px 20px', backgroundColor: '#ccc', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>Cancel</button>
              <button onClick={() => handleCreate()} disabled={uploading} style={{ padding: '10px 20px', backgroundColor: '#27ae60', color: 'white', border: 'none', borderRadius: '4px', cursor: uploading ? 'not-allowed' : 'pointer', fontWeight: 'bold' }}>
                {uploading ? 'Publishing...' : '✅ Confirm & Publish'}
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
              <button onClick={() => handleDelete(update._id)} style={{ backgroundColor: '#e74c3c', color: 'white', border: 'none', padding: '5px 10px', borderRadius: '4px', cursor: 'pointer', height: 'fit-content' }}>Delete</button>
            </li>
          ))}
          {updates.length === 0 && <p>No updates found.</p>}
        </ul>
      )}
    </div>
  );
};

export default AdminUpdates;
