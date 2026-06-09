import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Gallery = () => {
  const navigate = useNavigate();
  const [albums, setAlbums] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState('All');

  useEffect(() => {
    const fetchAlbums = async () => {
      try {
        const res = await fetch(`${import.meta.env.VITE_API_URL || '/api'}/gallery`);
        const json = await res.json();
        if (json.success) setAlbums(json.data);
      } catch (error) {} finally { setLoading(false); }
    };
    fetchAlbums();
  }, []);

  const categories = ['All', ...Array.from(new Set(albums.map(a => a.category)))];
  const filtered = activeCategory === 'All' ? albums : albums.filter(a => a.category === activeCategory);

  return (
    <div style={{ padding: '60px 20px', maxWidth: '1100px', margin: '0 auto' }}>
      <header style={{ textAlign: 'center', marginBottom: '50px' }}>
        <h1 style={{ fontSize: '3em', color: '#002147', marginBottom: '10px' }}>Our Impact Gallery</h1>
        <p style={{ fontSize: '1.2em', color: '#666' }}>Explore stories and moments from our community.</p>
      </header>

      <div style={{ display: 'flex', justifyContent: 'center', gap: '15px', marginBottom: '50px', flexWrap: 'wrap' }}>
        {categories.map(cat => (
          <button key={cat as string} onClick={() => setActiveCategory(cat as string)} style={{ padding: '8px 20px', backgroundColor: activeCategory === cat ? '#002147' : '#f1f4f8', color: activeCategory === cat ? 'white' : '#002147', border: 'none', borderRadius: '20px', cursor: 'pointer', fontWeight: 'bold' }}>{cat as string}</button>
        ))}
      </div>

      {loading ? <p style={{ textAlign: 'center' }}>Loading albums...</p> : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '60px' }}>
          {filtered.map((album, index) => (
            // Z-Pattern Logic
            <div key={album._id} style={{ display: 'flex', flexDirection: index % 2 !== 0 ? 'row-reverse' : 'row', flexWrap: 'wrap', gap: '40px', alignItems: 'center' }}>
              
              <div style={{ flex: '1 1 400px', position: 'relative' }}>
                <img src={album.coverImage} alt={album.title} style={{ width: '100%', height: '350px', objectFit: 'cover', borderRadius: '12px', boxShadow: '0 10px 30px rgba(0,0,0,0.1)' }} />
                <span style={{ position: 'absolute', bottom: '20px', right: '20px', backgroundColor: 'rgba(0,0,0,0.8)', color: 'white', padding: '6px 12px', borderRadius: '6px', fontWeight: 'bold' }}>{album.images.length} Photos</span>
              </div>
              
              <div style={{ flex: '1 1 400px', padding: '20px 0' }}>
                <span style={{ backgroundColor: '#f39c12', color: 'white', padding: '4px 10px', borderRadius: '4px', fontSize: '0.85em', fontWeight: 'bold', textTransform: 'uppercase' }}>{album.category}</span>
                <h2 style={{ fontSize: '2.2em', color: '#002147', margin: '15px 0' }}>{album.title}</h2>
                <p style={{ fontSize: '1.1em', color: '#555', lineHeight: '1.7', marginBottom: '25px' }}>{album.description}</p>
                <button onClick={() => navigate(`/gallery/${album.slug || album._id}`)} style={{ padding: '12px 25px', backgroundColor: '#002147', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer', fontWeight: 'bold', fontSize: '1em' }}>Open Album</button>
              </div>

            </div>
          ))}
          {filtered.length === 0 && <p style={{ textAlign: 'center', width: '100%', color: '#888' }}>No albums found.</p>}
        </div>
      )}
    </div>
  );
};
export default Gallery;
