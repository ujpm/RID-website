/**
 * Global Footer Component
 * Anchors the site with branding, navigation, contact information, 
 * and a newsletter signup form. Designed to be placed in the global App layout.
 */
import React from 'react';
import { Link } from 'react-router-dom';
import { Mail, MapPin, Linkedin, Twitter, Youtube } from 'lucide-react';
import styles from './Footer.module.css';

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        
        {/* Newsletter Signup Section */}
        <div className={styles.newsletter}>
          <h3 className={styles.newsletterTitle}>Join Our Innovation Ecosystem</h3>
          <form className={styles.form} onSubmit={(e) => e.preventDefault()}>
            <input 
              type="email" 
              placeholder="Enter your email address" 
              className={styles.input}
              required 
            />
            <button type="submit" className={styles.submitBtn}>Subscribe</button>
          </form>
        </div>

        {/* Main Footer Navigation & Info Grid */}
        <div className={styles.grid}>
          
          {/* Column 1: Brand & Mission */}
          <div className={styles.brand}>
            <h3 className={styles.brandName}>RID</h3>
            <p className={styles.brandDesc}>
              Empowering the next generation of African innovators through research, 
              leadership, and tangible real-world solutions.
            </p>
          </div>
          
          {/* Column 2: Quick Links */}
          <div className={styles.links}>
            <h4 className={styles.columnTitle}>Quick Links</h4>
            <Link to="/" className={styles.linkItem}>Home</Link>
            <Link to="/programs" className={styles.linkItem}>Programs</Link>
            <Link to="/impact" className={styles.linkItem}>Impact</Link>
            <Link to="/research" className={styles.linkItem}>Research</Link>
          </div>

          {/* Column 3: Contact Information */}
          <div className={styles.contact}>
            <h4 className={styles.columnTitle}>Contact Us</h4>
            <div className={styles.contactItem}>
              <MapPin size={18} />
              <span>Kigali, Rwanda</span>
            </div>
            <div className={styles.contactItem}>
              <Mail size={18} />
              <span>contact@rid.rw</span>
            </div>
          </div>

        </div>

        {/* Bottom Bar: Copyright & Socials */}
        <div className={styles.bottomBar}>
          <p className={styles.copyright}>
            © {new Date().getFullYear()} Research and Innovation for Development. All rights reserved.
          </p>
          <div className={styles.socialIcons}>
            <a href="#" aria-label="LinkedIn"><Linkedin size={20} /></a>
            <a href="#" aria-label="Twitter"><Twitter size={20} /></a>
            <a href="#" aria-label="YouTube"><Youtube size={20} /></a>
          </div>
        </div>

      </div>
    </footer>
  );
}
