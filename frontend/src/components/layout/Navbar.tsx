/**
 * Navigation Bar Component
 * Provides links to all main sections, with responsive mobile menu functionality.
 */
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import styles from './Navbar.module.css';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);
  const closeMenu = () => setIsOpen(false);

  return (
    <nav className={styles.navbar}>
      <div className={styles.brand}>
        <Link to="/" onClick={closeMenu}>RID</Link>
      </div>
      
      {/* Mobile Hamburger Button */}
      <div className={styles.hamburger} onClick={toggleMenu}>
        {isOpen ? '✕' : '☰'}
      </div>

      <ul className={`${styles.navLinks} ${isOpen ? styles.active : ''}`}>
        <li><Link to="/about" onClick={closeMenu}>About</Link></li>
        <li><Link to="/programs" onClick={closeMenu}>Programs</Link></li>
        <li><Link to="/impact" onClick={closeMenu}>Impact</Link></li>
        <li><Link to="/gallery" onClick={closeMenu}>Gallery</Link></li>
        <li><Link to="/updates" onClick={closeMenu}>Updates</Link></li>
        <li><Link to="/support" className={styles.supportBtn} onClick={closeMenu}>Support Us</Link></li>
      </ul>
    </nav>
  );
}
