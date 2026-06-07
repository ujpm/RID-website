import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const AdminLogin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const apiUrl = import.meta.env.VITE_API_URL || '/api';
      const response = await fetch(`${apiUrl}/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ user: email, password })
      });

      const json = await response.json();

      if (json.success) {
        // Securely store the JWT token
        localStorage.setItem('rid_admin_token', json.data.token);
        navigate('/admin/dashboard');
      } else {
        setError(json.error || 'Invalid credentials.');
      }
    } catch (err) {
      setError('Server connection failed.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ maxWidth: '400px', margin: '100px auto', padding: '20px', textAlign: 'center' }}>
      <h2>Admin Portal</h2>
      <p>Restricted Access</p>
      {error && <div style={{ color: 'red', margin: '10px 0' }}>{error}</div>}
      
      <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', gap: '15px', marginTop: '20px' }}>
        <input 
          type="text" 
          placeholder="Admin Username" 
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required 
          style={{ padding: '10px', borderRadius: '5px', border: '1px solid #ccc' }}
        />
        <input 
          type="password" 
          placeholder="Password" 
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required 
          style={{ padding: '10px', borderRadius: '5px', border: '1px solid #ccc' }}
        />
        <button type="submit" disabled={loading} style={{ padding: '10px', backgroundColor: '#002147', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer' }}>
          {loading ? 'Authenticating...' : 'Secure Login'}
        </button>
      </form>
    </div>
  );
};

export default AdminLogin;
