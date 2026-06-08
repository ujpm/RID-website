import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

interface IGallery {
  _id: string;
  category: string;
  imageUrl: string;
  altText: string;
  uploadedAt: string;
}

const CATEGORIES = ['Innovation', 'Research', 'Team', 'Events', 'General'];

const AdminGallery = () => {
  const navigate = useNavigate();
  const [images, setImages] = useState<IGallery[]>([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  
  const [category, setCategory] = useState(CATEGORIES[0]);
  const [altText, setAltText] = useState('');
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  
  const token = localStorage.getItem('rid_admin_token');
  const apiUrl = import.meta.env.VITE_API_URL || '/api';

  useEffect(() => {
    if (!token) navigate('/admin');
    else fetchGallery();
  }, [navigate, token]);

  useEffect(() => {
    return () => {
      if (previewUrl && previewUrl.startsWith('blob:')) URL.revokeObjectURL(previewUrl);
    };
  }, [previewUrl]);

  const fetchGallery = async () => {
    try {
      const res = await fetch(`${apiUrl}/gallery`);
      const json = await res.json();
      if (json.success) setImages(json.data);
    } catch (err) {
      console.error('Failed to fetch gallery.');
    } finally {
      setLoading(false);
    }
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setImageFile(file);
      setPreviewUrl(URL.createObjectURL(file));
      // Auto-fill alt text if empty
      if (!altText) setAltText(file.name.split('.')[0]); 
    } else {
      setImageFile(null);
      setPreviewUrl(null);
    }
  };

  const handleUpload = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!imageFile) return alert('Please select an image file to upload.');

    setUploading(true);

    try {
      // Step 1: Upload to Cloudinary using existing endpoint
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

      // Step 2: Save to Gallery database
      const postRes = await fetch(`${apiUrl}/gallery`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({ category, imageUrl, altText })
      });
      const postJson = await postRes.json();

      if (postJson.success) {
        setAltText('');
        setImageFile(null);
        setPreviewUrl(null);
        const fileInput = document.getElementById('gallery-upload') as HTMLInputElement;
        if (fileInput) fileInput.value = '';
        fetchGallery();
      } else {
        alert(postJson.error);
      }
    } catch (err: any) {
      alert(err.message || 'Failed to upload to gallery.');
    } finally {
      setUploading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm('Delete this image permanently?')) return;
    try {
      const res = await fetch(`${apiUrl}/gallery/${id}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` }
      });
      const json = await res.json();
      if (json.success) fetchGallery();
      else alert(json.error);
    } catch (err) {
      alert('Failed to delete image.');
    }
  };

  return (
    <div style={{ padding: '50px', maxWidth: '1000px', margin: '0 auto' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '30px' }}>
        <h2>Manage Gallery</h2>
        <button onClick={() => navigate('/admin/dashboard')} style={{ padding: '8px 15px', cursor: 'pointer' }}>Back to Dashboard</button>
      </div>

      <div style={{ backgroundColor: '#f9f9f9', padding: '20px', borderRadius: '8px', marginBottom: '40px' }}>
        <h3>Upload New Image</h3>
        <form onSubmit={handleUpload} style={{ display: 'flex', flexDirection: 'column', gap: '15px', marginTop: '15px' }}>
          
          <div style={{ display: 'flex', gap: '15px' }}>
            <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '5px' }}>
              <label style={{ fontWeight: 'bold', fontSize: '0.9em' }}>Category:</label>
              <select value={category} onChange={(e) => setCategory(e.target.value)} style={{ padding: '10px' }}>
                {CATEGORIES.map(cat => <option key={cat} value={cat}>{cat}</option>)}
              </select>
            </div>
            <div style={{ flex: 2, display: 'flex', flexDirection: 'column', gap: '5px' }}>
              <label style={{ fontWeight: 'bold', fontSize: '0.9em' }}>Alt Text (Accessibility):</label>
              <input type="text" placeholder="Description of image..." value={altText} onChange={(e) => setAltText(e.target.value)} required style={{ padding: '10px' }} />
            </div>
          </div>
          
          <div style={{ padding: '15px', border: '1px dashed #ccc', borderRadius: '5px', backgroundColor: '#fff' }}>
            <input id="gallery-upload" type="file" accept="image/*" onChange={handleImageChange} required />
            {previewUrl && (
              <div style={{ marginTop: '10px' }}>
                <img src={previewUrl} alt="Preview" style={{ height: '150px', borderRadius: '4px', objectFit: 'cover' }} />
              </div>
            )}
          </div>

          <button type="submit" disabled={uploading} style={{ padding: '12px', backgroundColor: '#27ae60', color: 'white', border: 'none', borderRadius: '4px', cursor: uploading ? 'not-allowed' : 'pointer', fontSize: '1.05em' }}>
            {uploading ? 'Uploading to Cloudinary...' : 'Upload Image'}
          </button>
        </form>
      </div>

      <h3>Image Library</h3>
      {loading ? <p>Loading...</p> : (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '20px', marginTop: '20px' }}>
          {images.map(img => (
            <div key={img._id} style={{ position: 'relative', border: '1px solid #ddd', borderRadius: '8px', overflow: 'hidden', backgroundColor: '#fff' }}>
              <img src={img.imageUrl} alt={img.altText} style={{ width: '100%', height: '150px', objectFit: 'cover', display: 'block' }} />
              <div style={{ padding: '10px', fontSize: '0.85em' }}>
                <span style={{ display: 'inline-block', backgroundColor: '#002147', color: 'white', padding: '2px 6px', borderRadius: '4px', marginBottom: '5px' }}>{img.category}</span>
                <p style={{ margin: 0, color: '#555', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{img.altText}</p>
              </div>
              <button 
                onClick={() => handleDelete(img._id)} 
                style={{ position: 'absolute', top: '5px', right: '5px', backgroundColor: '#e74c3c', color: 'white', border: 'none', width: '30px', height: '30px', borderRadius: '50%', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                title="Delete Image"
              >
                ✕
              </button>
            </div>
          ))}
          {images.length === 0 && <p style={{ gridColumn: '1 / -1' }}>No images in the gallery yet.</p>}
        </div>
      )}
    </div>
  );
};

export default AdminGallery;
