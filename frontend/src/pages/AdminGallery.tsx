import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

interface IAlbum {
  _id: string;
  title: string;
  category: string;
  description: string;
  coverImage: string;
  images: string[];
  uploadedAt: string;
}

const CATEGORIES = ['Innovation', 'Research', 'Team', 'Events', 'General'];

const AdminGallery = () => {
  const navigate = useNavigate();
  const [albums, setAlbums] = useState<IAlbum[]>([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  
  // View States
  const [showPreview, setShowPreview] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);

  // Form States
  const [formData, setFormData] = useState({ title: '', category: CATEGORIES[0], description: '' });
  
  // File States
  const [coverFile, setCoverFile] = useState<File | null>(null);
  const [coverPreviewUrl, setCoverPreviewUrl] = useState<string | null>(null);
  const [imageFiles, setImageFiles] = useState<File[]>([]);
  const [imagePreviewUrls, setImagePreviewUrls] = useState<string[]>([]);
  const [existingImages, setExistingImages] = useState<string[]>([]); // For edits

  const token = localStorage.getItem('rid_admin_token');
  const apiUrl = import.meta.env.VITE_API_URL || '/api';

  useEffect(() => {
    if (!token) navigate('/admin');
    else fetchAlbums();
  }, [navigate, token]);

  useEffect(() => {
    // Memory cleanup
    return () => {
      if (coverPreviewUrl && coverPreviewUrl.startsWith('blob:')) URL.revokeObjectURL(coverPreviewUrl);
      imagePreviewUrls.forEach(url => { if (url.startsWith('blob:')) URL.revokeObjectURL(url); });
    };
  }, [coverPreviewUrl, imagePreviewUrls]);

  const fetchAlbums = async () => {
    try {
      const res = await fetch(`${apiUrl}/gallery`);
      const json = await res.json();
      if (json.success) setAlbums(json.data);
    } catch (err) {
      console.error('Failed to fetch albums.');
    } finally { setLoading(false); }
  };

  const handleCoverChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setCoverFile(e.target.files[0]);
      setCoverPreviewUrl(URL.createObjectURL(e.target.files[0]));
    } else {
      setCoverFile(null);
      if (!editingId) setCoverPreviewUrl(null);
    }
  };

  const handleBulkImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const filesArray = Array.from(e.target.files);
      setImageFiles(filesArray);
      
      const newUrls = filesArray.map(file => URL.createObjectURL(file));
      setImagePreviewUrls(newUrls);
    }
  };

  const resetForm = () => {
    setEditingId(null);
    setFormData({ title: '', category: CATEGORIES[0], description: '' });
    setCoverFile(null);
    setCoverPreviewUrl(null);
    setImageFiles([]);
    setImagePreviewUrls([]);
    setExistingImages([]);
    setShowPreview(false);
    
    const coverInput = document.getElementById('cover-upload') as HTMLInputElement;
    const bulkInput = document.getElementById('bulk-upload') as HTMLInputElement;
    if (coverInput) coverInput.value = '';
    if (bulkInput) bulkInput.value = '';
  };

  const handleEditClick = (album: IAlbum) => {
    setEditingId(album._id);
    setFormData({ title: album.title, category: album.category, description: album.description });
    setCoverPreviewUrl(album.coverImage);
    setExistingImages(album.images);
    setCoverFile(null);
    setImageFiles([]);
    setImagePreviewUrls([]);
    setShowPreview(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSubmit = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!coverFile && !editingId) return alert('Please upload a cover image.');

    setUploading(true);
    let finalCoverUrl = coverPreviewUrl;
    let finalImagesArray = [...existingImages];

    try {
      // 1. Upload Cover Image (if new)
      if (coverFile) {
        const coverData = new FormData();
        coverData.append('image', coverFile);
        const coverRes = await fetch(`${apiUrl}/upload`, {
          method: 'POST',
          headers: { Authorization: `Bearer ${token}` },
          body: coverData
        });
        const coverJson = await coverRes.json();
        if (!coverJson.success) throw new Error('Cover upload failed.');
        finalCoverUrl = coverJson.data.url;
      }

      // 2. Upload Bulk Images (if any new ones are selected)
      if (imageFiles.length > 0) {
        const bulkData = new FormData();
        imageFiles.forEach(file => bulkData.append('images', file));
        
        const bulkRes = await fetch(`${apiUrl}/upload/bulk`, {
          method: 'POST',
          headers: { Authorization: `Bearer ${token}` },
          body: bulkData
        });
        const bulkJson = await bulkRes.json();
        if (!bulkJson.success) throw new Error('Bulk images upload failed.');
        
        // Append new images to existing ones
        finalImagesArray = [...finalImagesArray, ...bulkJson.data.urls];
      }

      // 3. Save Album
      const method = editingId ? 'PUT' : 'POST';
      const endpoint = editingId ? `${apiUrl}/gallery/${editingId}` : `${apiUrl}/gallery`;

      const postRes = await fetch(endpoint, {
        method,
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
        body: JSON.stringify({ 
          ...formData, 
          coverImage: finalCoverUrl, 
          images: finalImagesArray 
        })
      });
      const postJson = await postRes.json();

      if (postJson.success) {
        resetForm();
        fetchAlbums();
      } else {
        alert(postJson.error);
      }
    } catch (err: any) { alert(err.message || 'Failed to save album.'); } 
    finally { setUploading(false); }
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm('Delete this album and all its images permanently?')) return;
    try {
      const res = await fetch(`${apiUrl}/gallery/${id}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` }
      });
      const json = await res.json();
      if (json.success) fetchAlbums();
    } catch (err) { alert('Failed to delete album.'); }
  };

  return (
    <div style={{ padding: '50px', maxWidth: '1100px', margin: '0 auto' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '30px' }}>
        <h2>Manage Albums</h2>
        <button onClick={() => navigate('/admin/dashboard')} style={{ padding: '8px 15px', cursor: 'pointer' }}>Back to Dashboard</button>
      </div>

      <div style={{ backgroundColor: '#f9f9f9', padding: '20px', borderRadius: '8px', marginBottom: '40px', border: editingId ? '2px solid #f39c12' : 'none' }}>
        
        {!showPreview ? (
          <>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <h3 style={{ color: editingId ? '#f39c12' : 'inherit' }}>{editingId ? '✏️ Editing Album' : 'Create New Album'}</h3>
              <div>
                {editingId && <button type="button" onClick={resetForm} style={{ marginRight: '10px', padding: '8px 15px', backgroundColor: '#ccc', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>Cancel Edit</button>}
                <button type="button" onClick={() => {
                  if (!formData.title || (!coverFile && !coverPreviewUrl)) return alert('Please add a title and cover image to preview.');
                  setShowPreview(true);
                }} style={{ padding: '8px 15px', backgroundColor: '#f39c12', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>👀 Preview Album</button>
              </div>
            </div>

            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '15px', marginTop: '15px' }}>
              <input type="text" placeholder="Album Title" value={formData.title} onChange={(e) => setFormData({...formData, title: e.target.value})} required style={{ padding: '10px' }} />
              
              <div style={{ display: 'flex', flexDirection: 'column', gap: '5px' }}>
                <label style={{ fontWeight: 'bold', fontSize: '0.9em' }}>Category:</label>
                <select value={formData.category} onChange={(e) => setFormData({...formData, category: e.target.value})} style={{ padding: '10px' }}>
                  {CATEGORIES.map(cat => <option key={cat} value={cat}>{cat}</option>)}
                </select>
              </div>

              <textarea placeholder="Event description or story..." value={formData.description} onChange={(e) => setFormData({...formData, description: e.target.value})} required rows={3} style={{ padding: '10px', resize: 'vertical' }} />
              
              {/* Cover Image Upload */}
              <div style={{ padding: '15px', border: '1px dashed #ccc', borderRadius: '5px', backgroundColor: '#fff' }}>
                <label style={{ fontWeight: 'bold', fontSize: '0.9em', display: 'block', marginBottom: '10px' }}>{editingId ? 'Change Cover Image (Optional):' : <>Upload Cover Image (Required):<br/><span style={{fontSize:'0.8em', color:'#666', fontWeight:'normal'}}>* Recommended Size: 1200x800px (16:9 ratio)</span></>}</label>
                <input id="cover-upload" type="file" accept="image/*" onChange={handleCoverChange} required={!editingId} />
                {coverPreviewUrl && <img src={coverPreviewUrl} alt="Cover Preview" style={{ marginTop: '10px', height: '150px', borderRadius: '4px', objectFit: 'cover' }} />}
              </div>

              {/* Bulk Image Upload */}
              <div style={{ padding: '15px', border: '1px dashed #ccc', borderRadius: '5px', backgroundColor: '#fff' }}>
                <label style={{ fontWeight: 'bold', fontSize: '0.9em', display: 'block', marginBottom: '10px' }}>Add Album Images (You can select multiple files):</label>
                <input id="bulk-upload" type="file" accept="image/*" multiple onChange={handleBulkImageChange} />
                
                {imagePreviewUrls.length > 0 && (
                  <div style={{ marginTop: '10px', display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
                    {imagePreviewUrls.map((url, i) => <img key={i} src={url} alt="bulk prev" style={{ width: '80px', height: '80px', objectFit: 'cover', borderRadius: '4px' }} />)}
                  </div>
                )}
                {editingId && existingImages.length > 0 && (
                  <div style={{ marginTop: '15px' }}>
                    <p style={{ fontSize: '0.85em', color: '#666' }}>Currently in album ({existingImages.length}):</p>
                    <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
                      {existingImages.map((url, i) => <img key={i} src={url} alt="existing" style={{ width: '80px', height: '80px', objectFit: 'cover', borderRadius: '4px', opacity: 0.8 }} />)}
                    </div>
                  </div>
                )}
              </div>

              <button type="submit" disabled={uploading} style={{ padding: '12px', backgroundColor: editingId ? '#27ae60' : '#002147', color: 'white', border: 'none', borderRadius: '4px', cursor: uploading ? 'not-allowed' : 'pointer', fontSize: '1.05em' }}>
                {uploading ? 'Processing & Uploading...' : (editingId ? '✅ Update Album' : '🚀 Publish Album Directly')}
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
            
            <article>
              {coverPreviewUrl && <img src={coverPreviewUrl} alt="Cover" style={{ width: '100%', height: '350px', objectFit: 'cover', borderRadius: '8px', marginBottom: '20px' }} />}
              <span style={{ backgroundColor: '#002147', color: 'white', padding: '4px 10px', borderRadius: '4px', fontSize: '0.85em' }}>{formData.category}</span>
              <h1 style={{ color: '#002147', marginTop: '10px', marginBottom: '10px' }}>{formData.title}</h1>
              <p style={{ whiteSpace: 'pre-wrap', lineHeight: '1.6', color: '#444', marginBottom: '30px' }}>{formData.description}</p>
              
              <h4>Album Images</h4>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(150px, 1fr))', gap: '15px' }}>
                {/* Show existing images if editing */}
                {existingImages.map((url, i) => <img key={`exist-${i}`} src={url} alt="" style={{ width: '100%', height: '150px', objectFit: 'cover', borderRadius: '6px' }} />)}
                {/* Show newly selected images */}
                {imagePreviewUrls.map((url, i) => <img key={`new-${i}`} src={url} alt="" style={{ width: '100%', height: '150px', objectFit: 'cover', borderRadius: '6px', border: '2px solid #27ae60' }} />)}
              </div>
            </article>

            <div style={{ marginTop: '30px', paddingTop: '20px', borderTop: '1px solid #ddd', display: 'flex', justifyContent: 'flex-end', gap: '15px' }}>
              <button onClick={() => setShowPreview(false)} style={{ padding: '10px 20px', backgroundColor: '#ccc', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>Cancel</button>
              <button onClick={() => handleSubmit()} disabled={uploading} style={{ padding: '10px 20px', backgroundColor: '#27ae60', color: 'white', border: 'none', borderRadius: '4px', cursor: uploading ? 'not-allowed' : 'pointer', fontWeight: 'bold' }}>
                {uploading ? 'Processing...' : (editingId ? '✅ Confirm Update' : '✅ Confirm & Publish')}
              </button>
            </div>
          </div>
        )}
      </div>

      <h3>Existing Albums</h3>
      {loading ? <p>Loading...</p> : (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '20px', marginTop: '20px' }}>
          {albums.map(album => (
            <div key={album._id} style={{ border: '1px solid #ddd', borderRadius: '8px', overflow: 'hidden', backgroundColor: '#fff', display: 'flex', flexDirection: 'column' }}>
              <div style={{ position: 'relative' }}>
                <img src={album.coverImage} alt={album.title} style={{ width: '100%', height: '200px', objectFit: 'cover', display: 'block' }} />
                <span style={{ position: 'absolute', bottom: '10px', right: '10px', backgroundColor: 'rgba(0,0,0,0.7)', color: 'white', padding: '4px 8px', borderRadius: '4px', fontSize: '0.8em' }}>
                  {album.images.length} Photos
                </span>
              </div>
              <div style={{ padding: '15px', flex: 1 }}>
                <span style={{ display: 'inline-block', backgroundColor: '#002147', color: 'white', padding: '3px 8px', borderRadius: '4px', fontSize: '0.75em', marginBottom: '10px' }}>{album.category}</span>
                <h4 style={{ margin: '0 0 10px 0', color: '#333' }}>{album.title}</h4>
                <p style={{ margin: 0, fontSize: '0.9em', color: '#666', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>{album.description}</p>
              </div>
              <div style={{ padding: '10px 15px', borderTop: '1px solid #eee', display: 'flex', justifyContent: 'space-between' }}>
                <button onClick={() => handleEditClick(album)} style={{ padding: '6px 12px', backgroundColor: '#f39c12', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer', fontSize: '0.9em' }}>Edit</button>
                <button onClick={() => handleDelete(album._id)} style={{ padding: '6px 12px', backgroundColor: '#e74c3c', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer', fontSize: '0.9em' }}>Delete</button>
              </div>
            </div>
          ))}
          {albums.length === 0 && <p style={{ gridColumn: '1 / -1' }}>No albums created yet.</p>}
        </div>
      )}
    </div>
  );
};

export default AdminGallery;
