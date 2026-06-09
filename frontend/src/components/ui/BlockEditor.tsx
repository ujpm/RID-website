import { useState, useRef } from 'react';
import type { IBlock } from './BlockRenderer';

interface BlockEditorProps {
  blocks: IBlock[];
  onChange: (blocks: IBlock[]) => void;
}

export const BlockEditor = ({ blocks, onChange }: BlockEditorProps) => {
  const [uploadingId, setUploadingId] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [activeImageBlockId, setActiveImageBlockId] = useState<string | null>(null);

  const token = localStorage.getItem('rid_admin_token');
  const apiUrl = import.meta.env.VITE_API_URL || '/api';

  const generateId = () => Math.random().toString(36).substring(2, 9);

  const addBlock = (type: IBlock['type'], index: number) => {
    const newBlock: IBlock = { id: generateId(), type, content: '' };
    const updated = [...blocks];
    updated.splice(index + 1, 0, newBlock);
    onChange(updated);
    
    // Automatically open file picker if image block added
    if (type === 'image') {
      setActiveImageBlockId(newBlock.id);
      setTimeout(() => fileInputRef.current?.click(), 100);
    }
  };

  const removeBlock = (index: number) => {
    const updated = blocks.filter((_, i) => i !== index);
    onChange(updated.length === 0 ? [{ id: generateId(), type: 'paragraph', content: '' }] : updated);
  };

  const updateBlock = (index: number, key: keyof IBlock, value: string) => {
    const updated = [...blocks];
    updated[index] = { ...updated[index], [key]: value };
    onChange(updated);
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || !e.target.files[0] || !activeImageBlockId) return;
    
    const file = e.target.files[0];
    setUploadingId(activeImageBlockId);

    try {
      const uploadData = new FormData();
      uploadData.append('image', file);
      
      const res = await fetch(`${apiUrl}/upload`, {
        method: 'POST',
        headers: { Authorization: `Bearer ${token}` },
        body: uploadData
      });
      const json = await res.json();
      
      if (json.success) {
        const updated = blocks.map(b => b.id === activeImageBlockId ? { ...b, content: json.data.url } : b);
        onChange(updated);
      } else {
        alert(json.error || 'Failed to upload inline image.');
      }
    } catch (err) {
      alert('Upload error.');
    } finally {
      setUploadingId(null);
      setActiveImageBlockId(null);
      if (fileInputRef.current) fileInputRef.current.value = '';
    }
  };

  // Add Menu Component
  const AddMenu = ({ index }: { index: number }) => (
    <div style={{ display: 'flex', gap: '10px', margin: '15px 0', padding: '10px', backgroundColor: '#f1f4f8', borderRadius: '6px', justifyContent: 'center' }}>
      <button type="button" onClick={() => addBlock('paragraph', index)} style={btnStyle}>+ Paragraph</button>
      <button type="button" onClick={() => addBlock('heading', index)} style={btnStyle}>+ Heading</button>
      <button type="button" onClick={() => addBlock('quote', index)} style={btnStyle}>+ Quote</button>
      <button type="button" onClick={() => addBlock('image', index)} style={btnStyle}>+ Image</button>
    </div>
  );

  const btnStyle = { padding: '5px 10px', cursor: 'pointer', border: '1px solid #ccc', borderRadius: '4px', backgroundColor: '#fff', fontSize: '0.85em' };

  return (
    <div style={{ border: '1px solid #ddd', borderRadius: '8px', padding: '20px', backgroundColor: '#fff' }}>
      <label style={{ fontWeight: 'bold', fontSize: '1.1em', display: 'block', marginBottom: '15px' }}>Article Content (Block Editor)</label>
      
      {blocks.length === 0 && <AddMenu index={-1} />}
      
      {blocks.map((block, index) => (
        <div key={block.id} style={{ position: 'relative', marginBottom: '10px', padding: '15px', border: '1px solid #eee', borderRadius: '6px', backgroundColor: '#fafafa' }}>
          
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px' }}>
            <span style={{ fontSize: '0.8em', textTransform: 'uppercase', color: '#888', fontWeight: 'bold' }}>{block.type}</span>
            <button type="button" onClick={() => removeBlock(index)} style={{ color: '#e74c3c', background: 'none', border: 'none', cursor: 'pointer', fontSize: '1.2em' }}>✕</button>
          </div>

          {block.type === 'paragraph' && (
            <textarea value={block.content} onChange={e => updateBlock(index, 'content', e.target.value)} placeholder="Write your paragraph here..." rows={4} style={{ width: '100%', padding: '10px', resize: 'vertical', border: '1px solid #ccc', borderRadius: '4px' }} />
          )}

          {block.type === 'heading' && (
            <input type="text" value={block.content} onChange={e => updateBlock(index, 'content', e.target.value)} placeholder="Heading text..." style={{ width: '100%', padding: '10px', fontSize: '1.2em', fontWeight: 'bold', border: '1px solid #ccc', borderRadius: '4px' }} />
          )}

          {block.type === 'quote' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              <textarea value={block.content} onChange={e => updateBlock(index, 'content', e.target.value)} placeholder="Quote text..." rows={3} style={{ width: '100%', padding: '10px', resize: 'vertical', border: '1px solid #ccc', borderRadius: '4px', fontStyle: 'italic' }} />
              <input type="text" value={block.metadata || ''} onChange={e => updateBlock(index, 'metadata', e.target.value)} placeholder="Author / Source (Optional)" style={{ width: '100%', padding: '10px', border: '1px solid #ccc', borderRadius: '4px' }} />
            </div>
          )}

          {block.type === 'image' && (
            <div style={{ textAlign: 'center', padding: '20px', backgroundColor: '#fff', border: '1px dashed #ccc', borderRadius: '4px' }}>
              {uploadingId === block.id ? (
                <p>Uploading image to Cloudinary...</p>
              ) : block.content ? (
                <img src={block.content} alt="Block content" style={{ maxWidth: '100%', maxHeight: '300px', borderRadius: '4px', objectFit: 'cover' }} />
              ) : (
                <p style={{ color: '#666', fontStyle: 'italic' }}>Image slot created. Waiting for upload...</p>
              )}
            </div>
          )}

          <AddMenu index={index} />
        </div>
      ))}
      
      {/* Hidden file input for handling image block uploads directly */}
      <input type="file" ref={fileInputRef} style={{ display: 'none' }} accept="image/*" onChange={handleImageUpload} />
    </div>
  );
};
