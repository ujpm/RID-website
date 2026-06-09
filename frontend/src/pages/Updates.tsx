import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Updates = () => {
  const navigate = useNavigate();
  const [updates, setUpdates] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUpdates = async () => {
      try {
        const res = await fetch(`${import.meta.env.VITE_API_URL || '/api'}/updates`);
        const json = await res.json();
        if (json.success) setUpdates(json.data);
      } catch (error) {} finally { setLoading(false); }
    };
    fetchUpdates();
  }, []);

  return (
    <div style={{ padding: '60px 20px', maxWidth: '1100px', margin: '0 auto' }}>
      <header style={{ textAlign: 'center', marginBottom: '60px' }}>
        <h1 style={{ fontSize: '3em', color: '#002147', marginBottom: '10px' }}>Latest Updates & News</h1>
        <p style={{ fontSize: '1.2em', color: '#666' }}>Stay informed about our recent activities and impact.</p>
      </header>

      {loading ? <p style={{ textAlign: 'center' }}>Loading news...</p> : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '60px' }}>
          {updates.map((update, index) => (
            // Z-Pattern Logic: Even index = standard, Odd index = row-reverse
            <div key={update._id} style={{ display: 'flex', flexDirection: index % 2 !== 0 ? 'row-reverse' : 'row', flexWrap: 'wrap', gap: '40px', alignItems: 'center' }}>
              
              <div style={{ flex: '1 1 400px' }}>
                <img src={update.imageUrl} alt={update.title} style={{ width: '100%', height: '350px', objectFit: 'cover', borderRadius: '12px', boxShadow: '0 10px 30px rgba(0,0,0,0.1)' }} />
              </div>
              
              <div style={{ flex: '1 1 400px', padding: '20px 0' }}>
                <span style={{ color: '#888', textTransform: 'uppercase', fontSize: '0.9em', fontWeight: 'bold' }}>{new Date(update.publishedDate).toLocaleDateString()}</span>
                <h2 style={{ fontSize: '2.2em', color: '#002147', margin: '15px 0' }}>{update.title}</h2>
                <p style={{ fontSize: '1.1em', color: '#555', lineHeight: '1.7', marginBottom: '25px' }}>{update.excerpt}</p>
                <button onClick={() => navigate(`/updates/${update.slug || update._id}`)} style={{ padding: '12px 25px', backgroundColor: '#f39c12', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer', fontWeight: 'bold', fontSize: '1em' }}>Read Full Article &rarr;</button>
              </div>

            </div>
          ))}
        </div>
      )}
    </div>
  );
};
export default Updates;
