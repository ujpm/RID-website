/**
 * Navigation Bar Component
 * Provides links to all main sections of the application.
 */
import React from 'react';
import { Link } from 'react-router-dom';
import styles from './Navbar.module.css';

export default function Navbar() {
  return (
    <nav className={styles.navbar}>
      <div className={styles.brand}>
        <Link to="/">RID</Link>
      </div>
      <ul className={styles.navLinks}>
        <li><Link to="/about">About</Link></li>
        <li><Link to="/programs">Programs</Link></li>
        <li><Link to="/impact">Impact</Link></li>
        <li><Link to="/gallery">Gallery</Link></li>
        <li><Link to="/updates">Updates</Link></li>
        <li><Link to="/support" className={styles.supportBtn}>Support Us</Link></li>
      </ul>
    </nav>
  );
}
