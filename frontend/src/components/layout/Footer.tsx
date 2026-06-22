/**
 * Global Footer Component
 * Anchors the site with branding, navigation, contact information, 
 * and a newsletter signup form. Designed to be placed in the global App layout.
 */
import { Link } from 'react-router-dom';
import { Mail, MapPin } from 'lucide-react';
import { useModal } from '../../context/ModalContext';
import styles from './Footer.module.css';

const LinkedInIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
    <rect x="2" y="9" width="4" height="12"></rect>
    <circle cx="4" cy="4" r="2"></circle>
  </svg>
);

const TwitterIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5 0.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"></path>
  </svg>
);

const YouTubeIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M2.5 17a24.12 24.12 0 0 1 0-10 2 2 0 0 1 1.4-1.4 49.56 49.56 0 0 1 16.2 0A2 2 0 0 1 21.5 7a24.12 24.12 0 0 1 0 10 2 2 0 0 1-1.4 1.4 49.55 49.55 0 0 1-16.2 0A2 2 0 0 1 2.5 17"></path>
    <path d="m10 15 5-3-5-3z"></path>
  </svg>
);

export default function Footer() {
  const { openModal } = useModal();

  // Helper inline style to reset button defaults so it looks like a link
  const linkBtnStyle: React.CSSProperties = {
    background: 'none', border: 'none', color: 'inherit', cursor: 'pointer', padding: 0, font: 'inherit', textAlign: 'left'
  };

  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        
        {/* Newsletter Signup Section */}
        <div className={styles.newsletter}>
          <h3 className={styles.newsletterTitle}>Join Our Innovation Ecosystem</h3>
          <form className={styles.form} onSubmit={(e) => e.preventDefault()}>
            <input type="email" placeholder="Enter your email address" className={styles.input} required />
            <button type="submit" className={styles.submitBtn}>Subscribe</button>
          </form>
        </div>

        {/* Main Footer Navigation & Info Grid */}
        <div className={styles.grid}>
          
          <div className={styles.brand}>
            <Link to="/" style={{ textDecoration: 'none', display: 'inline-block', marginBottom: '15px' }}>
              <img src="/images/logo-1-bg.png" alt="RID Logo" style={{ height: '45px', width: 'auto', filter: 'brightness(0) invert(1)' }} />
            </Link>
            <p className={styles.brandDesc}>
              Empowering the next generation of African innovators through research, 
              leadership, and tangible real-world solutions.
            </p>
          </div>
          
          <div className={styles.links}>
            <h4 className={styles.columnTitle}>Quick Links</h4>
            <Link to="/" className={styles.linkItem}>Home</Link>
            <Link to="/programs" className={styles.linkItem}>Programs</Link>
            <Link to="/impact" className={styles.linkItem}>Impact</Link>
            <Link to="/research" className={styles.linkItem}>Research</Link>
            <Link to="/admin" className={styles.linkItem}>Admin Access</Link>
          </div>

          {/* New Get Involved Section */}
          <div className={styles.links}>
            <h4 className={styles.columnTitle}>Get Involved</h4>
            <button style={linkBtnStyle} className={styles.linkItem} onClick={() => openModal('Support')}>Support</button>
            <button style={linkBtnStyle} className={styles.linkItem} onClick={() => openModal('Mentor')}>Become a Mentor</button>
            <button style={linkBtnStyle} className={styles.linkItem} onClick={() => openModal('Member')}>Become a Member</button>
          </div>

          <div className={styles.contact}>
            <h4 className={styles.columnTitle}>Contact Us</h4>
            <div className={styles.contactItem}><MapPin size={18} /><span>Musanze, Rwanda</span></div>
            <div className={styles.contactItem}><Mail size={18} /><span>contact@weare-rid.xyz</span></div>
          </div>
        </div>

        <div className={styles.bottomBar}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '15px', flexWrap: 'wrap' }}>
            <p className={styles.copyright} style={{ margin: 0 }}>
              © {new Date().getFullYear()} Research and Innovation for Development. All rights reserved.
            </p>
          </div>
          <div className={styles.socialIcons}>
            <a href="https://www.linkedin.com/company/ines-research-innovation-club/" aria-label="LinkedIn"><LinkedInIcon /></a>
            <a href="#" aria-label="Twitter"><TwitterIcon /></a>
            <a href="#" aria-label="YouTube"><YouTubeIcon /></a>
          </div>
        </div>
      </div>
    </footer>
  );
}
