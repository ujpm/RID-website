import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('rid_admin_token');
    if (!token) navigate('/admin');
    else setIsAuthenticated(true);
  }, [navigate]);

  if (!isAuthenticated) return null;

  return (
    <div style={{ padding: '50px', maxWidth: '1200px', margin: '0 auto' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '2px solid #eee', paddingBottom: '20px', marginBottom: '30px' }}>
        <h2>RID Control Center</h2>
        <button onClick={() => { localStorage.removeItem('rid_admin_token'); navigate('/admin'); }} style={{ padding: '8px 15px', backgroundColor: '#e74c3c', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>
          Logout
        </button>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '20px' }}>
        <div style={{ padding: '20px', border: '1px solid #ddd', borderRadius: '8px', textAlign: 'center', backgroundColor: '#fff' }}>
          <h3>Manage Updates</h3>
          <p style={{ color: '#666' }}>Create, edit, or delete news articles.</p>
          <button onClick={() => navigate('/admin/updates')} style={{ padding: '10px 20px', marginTop: '10px', backgroundColor: '#002147', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer', fontWeight: 'bold' }}>Go to Updates</button>
        </div>
        
        <div style={{ padding: '20px', border: '1px solid #ddd', borderRadius: '8px', textAlign: 'center', backgroundColor: '#fff' }}>
          <h3>Manage Gallery</h3>
          <p style={{ color: '#666' }}>Upload and organize event albums.</p>
          <button onClick={() => navigate('/admin/gallery')} style={{ padding: '10px 20px', marginTop: '10px', backgroundColor: '#002147', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer', fontWeight: 'bold' }}>Go to Gallery</button>
        </div>

        <div style={{ padding: '20px', border: '1px solid #ddd', borderRadius: '8px', textAlign: 'center', backgroundColor: '#fff' }}>
          <h3>Manage Metrics</h3>
          <p style={{ color: '#666' }}>Update homepage impact statistics.</p>
          <button onClick={() => navigate('/admin/metrics')} style={{ padding: '10px 20px', marginTop: '10px', backgroundColor: '#002147', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer', fontWeight: 'bold' }}>Go to Metrics</button>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
