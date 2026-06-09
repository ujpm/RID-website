import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const AlbumDetail = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const [album, setAlbum] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAlbum = async () => {
      try {
        const apiUrl = import.meta.env.VITE_API_URL || '/api';
        const res = await fetch(`${apiUrl}/gallery/album/${slug}`);
        const json = await res.json();
        if (json.success) setAlbum(json.data);
      } catch (err) { console.error(err); } 
      finally { setLoading(false); }
    };
    fetchAlbum();
  }, [slug]);

  if (loading) return <div style={{ padding: '100px', textAlign: 'center' }}>Loading Album...</div>;
  if (!album) return <div style={{ padding: '100px', textAlign: 'center' }}>Album not found.</div>;

  return (
    <div style={{ padding: '60px 20px', maxWidth: '1100px', margin: '0 auto', minHeight: '60vh' }}>
      <button onClick={() => navigate('/gallery')} style={{ marginBottom: '30px', cursor: 'pointer', padding: '10px 20px', background: '#f1f4f8', color: '#002147', border: 'none', borderRadius: '4px', fontWeight: 'bold' }}>&larr; Back to Albums</button>
      
      <div style={{ textAlign: 'center', marginBottom: '50px', maxWidth: '800px', margin: '0 auto 40px auto' }}>
        <span style={{ backgroundColor: '#f39c12', color: '#fff', padding: '5px 12px', borderRadius: '20px', fontSize: '0.9em', fontWeight: 'bold', textTransform: 'uppercase' }}>{album.category}</span>
        <h1 style={{ color: '#002147', fontSize: '3em', marginTop: '20px', marginBottom: '20px' }}>{album.title}</h1>
        <p style={{ color: '#555', lineHeight: '1.8', fontSize: '1.2em' }}>{album.description}</p>
      </div>
      
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '20px' }}>
        {album.images && album.images.length > 0 ? (
          album.images.map((img: string, i: number) => (
            <img key={i} src={img} alt={`${album.title} - ${i}`} style={{ width: '100%', height: '300px', objectFit: 'cover', borderRadius: '8px', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }} />
          ))
        ) : (
          <p style={{ gridColumn: '1/-1', textAlign: 'center', color: '#888', padding: '40px' }}>No additional images in this album.</p>
        )}
      </div>
    </div>
  );
};
export default AlbumDetail;
