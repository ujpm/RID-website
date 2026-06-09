import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { BlockRenderer } from '../components/ui/BlockRenderer';

const UpdateDetail = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const [post, setPost] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const apiUrl = import.meta.env.VITE_API_URL || '/api';
        const res = await fetch(`${apiUrl}/updates/post/${slug}`);
        const json = await res.json();
        if (json.success) setPost(json.data);
      } catch (err) { console.error(err); } 
      finally { setLoading(false); }
    };
    fetchPost();
  }, [slug]);

  if (loading) return <div style={{ padding: '100px', textAlign: 'center' }}>Loading Article...</div>;
  if (!post) return <div style={{ padding: '100px', textAlign: 'center' }}>Article not found.</div>;

  return (
    <div style={{ padding: '60px 20px', maxWidth: '800px', margin: '0 auto', fontFamily: 'sans-serif' }}>
      <button onClick={() => navigate('/updates')} style={{ background: 'none', border: 'none', color: '#f39c12', cursor: 'pointer', fontWeight: 'bold', marginBottom: '20px' }}>&larr; Back to Updates</button>
      <img src={post.imageUrl} alt={post.title} style={{ width: '100%', height: '400px', objectFit: 'cover', borderRadius: '12px', marginBottom: '30px' }} />
      <span style={{ color: '#666', fontSize: '0.9em', textTransform: 'uppercase' }}>{new Date(post.publishedDate).toLocaleDateString(undefined, { year: 'numeric', month: 'long', day: 'numeric' })}</span>
      <h1 style={{ color: '#002147', fontSize: '2.8em', marginTop: '10px', marginBottom: '20px', lineHeight: '1.2' }}>{post.title}</h1>
      <p style={{ fontSize: '1.3em', fontWeight: 'bold', color: '#444', marginBottom: '40px', borderLeft: '4px solid #f39c12', paddingLeft: '20px' }}>{post.excerpt}</p>
      
      <BlockRenderer content={post.content} />
    </div>
  );
};
export default UpdateDetail;
