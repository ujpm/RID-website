export interface IBlock {
  id: string;
  type: 'paragraph' | 'heading' | 'quote' | 'image';
  content: string;
  metadata?: string;
}

export const BlockRenderer = ({ content }: { content: any }) => {
  // Graceful fallback for legacy string data
  if (typeof content === 'string') {
    return <div style={{ whiteSpace: 'pre-wrap', lineHeight: '1.6', color: '#444' }}>{content}</div>;
  }
  
  // New Block-based rendering
  if (Array.isArray(content)) {
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
        {content.map((block: IBlock) => {
          switch (block.type) {
            case 'heading': 
              return <h3 key={block.id} style={{ color: '#002147', marginTop: '10px', fontSize: '1.5em' }}>{block.content}</h3>;
            case 'paragraph': 
              return <p key={block.id} style={{ lineHeight: '1.8', color: '#444', fontSize: '1.05em' }}>{block.content}</p>;
            case 'quote': 
              return (
                <blockquote key={block.id} style={{ borderLeft: '4px solid #f39c12', paddingLeft: '20px', fontStyle: 'italic', color: '#555', margin: '20px 0', backgroundColor: '#fdfaef', padding: '20px', borderRadius: '0 8px 8px 0' }}>
                  <p style={{ fontSize: '1.2em', margin: 0 }}>"{block.content}"</p>
                  {block.metadata && <footer style={{ marginTop: '10px', fontWeight: 'bold', fontStyle: 'normal', color: '#002147' }}>— {block.metadata}</footer>}
                </blockquote>
              );
            case 'image': 
              return <img key={block.id} src={block.content} alt="Article visual" style={{ width: '100%', borderRadius: '8px', objectFit: 'cover', margin: '15px 0' }} />;
            default: 
              return null;
          }
        })}
      </div>
    );
  }

  return null;
};
