import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

interface IMetric {
  _id?: string;
  label: string;
  value: string;
}

// Our locked list of metrics
const LOCKED_LABELS = [
  'Young People Reached',
  'Masterclass Sessions',
  'Innovations Supported',
  'Countries Represented',
  'Mentorship Hours'
];

const AdminMetrics = () => {
  const navigate = useNavigate();
  const [metrics, setMetrics] = useState<IMetric[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState<string | null>(null);

  const token = localStorage.getItem('rid_admin_token');
  const apiUrl = import.meta.env.VITE_API_URL || '/api';

  useEffect(() => {
    if (!token) navigate('/admin');
    else fetchMetrics();
  }, [navigate, token]);

  const fetchMetrics = async () => {
    try {
      const res = await fetch(`${apiUrl}/metrics`);
      const json = await res.json();
      
      // Map existing DB data, or create placeholders for missing ones
      const mappedMetrics = LOCKED_LABELS.map(label => {
        const existing = json.data?.find((m: any) => m.label === label);
        return existing || { label, value: '' }; // Fallback to empty if not in DB yet
      });
      setMetrics(mappedMetrics);
    } catch (err) { console.error('Failed to fetch metrics.'); }
    finally { setLoading(false); }
  };

  const handleValueChange = (label: string, newValue: string) => {
    setMetrics(prev => prev.map(m => m.label === label ? { ...m, value: newValue } : m));
  };

  const handleSave = async (metric: IMetric) => {
    setSaving(metric.label);
    try {
      const endpoint = metric._id ? `${apiUrl}/metrics/${metric._id}` : `${apiUrl}/metrics`;
      const method = metric._id ? 'PUT' : 'POST';

      const res = await fetch(endpoint, {
        method,
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
        body: JSON.stringify({ label: metric.label, value: metric.value })
      });
      const json = await res.json();

      if (json.success) fetchMetrics(); // Refresh to get the new DB _id if it was a POST
      else alert(json.error);
    } catch (err) { alert('Failed to save metric.'); }
    finally { setSaving(null); }
  };

  return (
    <div style={{ padding: '50px', maxWidth: '800px', margin: '0 auto' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '30px' }}>
        <h2>Manage Impact Metrics</h2>
        <button onClick={() => navigate('/admin/dashboard')} style={{ padding: '8px 15px', cursor: 'pointer' }}>Back to Dashboard</button>
      </div>

      <div style={{ backgroundColor: '#f9f9f9', padding: '20px', borderRadius: '8px' }}>
        <p style={{ color: '#666', marginBottom: '20px' }}>
          <strong>Note:</strong> To protect the frontend layout, you can only edit the numerical values. Labels and icons are locked.
        </p>

        {loading ? <p>Loading...</p> : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
            {metrics.map(metric => (
              <div key={metric.label} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '15px', backgroundColor: '#fff', border: '1px solid #ddd', borderRadius: '6px' }}>
                <div style={{ flex: 1 }}>
                  <strong style={{ display: 'block', color: '#002147' }}>{metric.label}</strong>
                </div>
                <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
                  <input 
                    type="text" 
                    value={metric.value} 
                    onChange={e => handleValueChange(metric.label, e.target.value)} 
                    placeholder="e.g. 100+" 
                    style={{ padding: '8px', width: '120px', borderRadius: '4px', border: '1px solid #ccc' }} 
                  />
                  <button 
                    onClick={() => handleSave(metric)} 
                    disabled={saving === metric.label || !metric.value}
                    style={{ padding: '8px 15px', backgroundColor: '#27ae60', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer', fontWeight: 'bold' }}
                  >
                    {saving === metric.label ? 'Saving...' : 'Save'}
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminMetrics;
