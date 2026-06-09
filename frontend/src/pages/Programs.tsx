import { useEffect, useRef, useState, ReactNode } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './Programs.module.css';

// 1. Reusable Animation Wrapper Component
const FadeInSection = ({ children, delay = 0 }: { children: ReactNode, delay?: number }) => {
  const [isVisible, setVisible] = useState(false);
  const domRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          setVisible(true);
        }
      });
    }, { threshold: 0.15 });

    if (domRef.current) observer.observe(domRef.current);
    
    return () => {
      if (domRef.current) observer.unobserve(domRef.current);
    };
  }, []);

  return (
    <div
      ref={domRef}
      style={{
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? 'translateY(0)' : 'translateY(40px)',
        transition: `opacity 0.8s cubic-bezier(0.16, 1, 0.3, 1) ${delay}ms, transform 0.8s cubic-bezier(0.16, 1, 0.3, 1) ${delay}ms`,
        width: '100%'
      }}
    >
      {children}
    </div>
  );
};

// 2. Restored Authentic Program Data paired with existing assets for the Z-Pattern
const programsData = [
  {
    id: 1,
    title: "Research and Innovation for Development",
    description: "Conducting applied research and creating innovative solutions that directly address pressing development and health needs in our communities.",
    tag: "Core Focus",
    imageUrl: "/images/impact-research.jpg"
  },
  {
    id: 2,
    title: "Digital Health and Assistive Technologies",
    description: "Developing digital systems and assistive tools, such as the Smart Limb Connect and Smart Glove, to promote inclusion and access to essential services.",
    tag: "Technology",
    imageUrl: "/images/impact-innovation.jpg"
  },
  {
    id: 3,
    title: "Youth Capacity Building, Leadership, and Teamwork",
    description: "Empowering the next generation through intensive training to build essential leadership, teamwork, and soft skills.",
    tag: "Empowerment",
    imageUrl: "/images/impact-leadership.jpg"
  },
  {
    id: 4,
    title: "Community Engagement and Evidence-Based Learning",
    description: "Translating research findings into practical applications while working closely with communities to ensure our solutions create real-world impact.",
    tag: "Community",
    imageUrl: "/images/hero-2.jpg"
  }
];

export default function Programs() {
  const navigate = useNavigate();

  return (
    <div style={{ padding: '80px 20px', maxWidth: '1100px', margin: '0 auto', overflow: 'hidden' }}>
      
      {/* Restored Authentic Header */}
      <FadeInSection>
        <header style={{ textAlign: 'center', marginBottom: '80px' }}>
          <h1 style={{ fontSize: '3.5em', color: '#002147', marginTop: '15px', marginBottom: '20px', lineHeight: '1.2' }}>
            Our Programs
          </h1>
          <p style={{ fontSize: '1.2em', color: '#666', maxWidth: '700px', margin: '0 auto', lineHeight: '1.6' }}>
            Structured initiatives designed to cultivate expertise, drive innovation, and build resilient networks.
          </p>
        </header>
      </FadeInSection>

      {/* Z-Pattern Program List */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '80px' }}>
        {programsData.map((prog, index) => (
          <FadeInSection key={prog.id} delay={100}>
            <div style={{ 
              display: 'flex', 
              flexDirection: index % 2 !== 0 ? 'row-reverse' : 'row', // Z-Pattern alternating logic
              flexWrap: 'wrap', 
              gap: '50px', 
              alignItems: 'center' 
            }}>
              
              {/* Image Side */}
              <div style={{ flex: '1 1 400px', position: 'relative' }}>
                <div style={{ 
                  position: 'absolute', 
                  top: index % 2 !== 0 ? '-15px' : '15px', 
                  left: index % 2 !== 0 ? '15px' : '-15px', 
                  right: index % 2 !== 0 ? '-15px' : '15px', 
                  bottom: index % 2 !== 0 ? '15px' : '-15px', 
                  backgroundColor: '#f1f4f8', 
                  borderRadius: '12px', 
                  zIndex: -1 
                }} />
                <img 
                  src={prog.imageUrl} 
                  alt={prog.title} 
                  style={{ width: '100%', height: '350px', objectFit: 'cover', borderRadius: '12px', boxShadow: '0 10px 30px rgba(0,0,0,0.08)' }} 
                />
              </div>
              
              {/* Content Side */}
              <div style={{ flex: '1 1 400px', padding: '20px 0' }}>
                <span style={{ backgroundColor: '#002147', color: 'white', padding: '5px 12px', borderRadius: '4px', fontSize: '0.85em', fontWeight: 'bold', textTransform: 'uppercase' }}>
                  {prog.tag}
                </span>
                <h2 style={{ fontSize: '2.2em', color: '#002147', margin: '20px 0' }}>{prog.title}</h2>
                <p style={{ fontSize: '1.15em', color: '#555', lineHeight: '1.7', marginBottom: '30px' }}>
                  {prog.description}
                </p>
                
                <button 
                  onClick={() => navigate('/about')} 
                  style={{ padding: '12px 28px', backgroundColor: '#f39c12', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer', fontWeight: 'bold', fontSize: '1.05em', transition: 'background-color 0.2s' }}
                  onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#e67e22'}
                  onMouseOut={(e) => e.currentTarget.style.backgroundColor = '#f39c12'}
                >
                  Learn more
                </button>
              </div>

            </div>
          </FadeInSection>
        ))}
      </div>

    </div>
  );
}
