import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import styles from './Navbar.module.css';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();

  const toggleMenu = () => setIsOpen(!isOpen);
  const closeMenu = () => setIsOpen(false);

  // Scroll listener for transparent-to-solid effect
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Determine if we are on a page where the top should be transparent
  // Usually, Home is the best place for this. You can add '/about' if it has a hero image.
  const isHomePage = location.pathname === '/';
  
  // Apply classes based on scroll state and current page
  const navClasses = `${styles.navbar} ${isScrolled ? styles.scrolled : (isHomePage ? styles.transparent : styles.solidTop)}`;

  return (
    <nav className={navClasses}>
      <div className={styles.navContainer}>
        
        {/* Replaced Text with Image Logo */}
        <Link to="/" className={styles.logo} onClick={closeMenu}>
          <img 
            src="/images/logo-1-bg.png" 
            alt="RID Logo" 
            className={styles.logoImage} 
            onError={(e) => {
              // Fallback if logo.png is missing
              e.currentTarget.style.display = 'none';
              e.currentTarget.parentElement!.innerHTML = '<span style="font-size: 24px; font-weight: bold; color: inherit;">RID</span>';
            }}
          />
        </Link>

        <div className={styles.menuIcon} onClick={toggleMenu}>
          {isOpen ? <X size={28} /> : <Menu size={28} />}
        </div>

        <ul className={`${styles.navLinks} ${isOpen ? styles.active : ''}`}>
          <li><Link to="/" onClick={closeMenu}>Home</Link></li>
          <li><Link to="/about" onClick={closeMenu}>About Us</Link></li>
          <li><Link to="/programs" onClick={closeMenu}>Programs</Link></li>
          <li><Link to="/impact" onClick={closeMenu}>Our Impact</Link></li>
          <li><Link to="/updates" onClick={closeMenu}>Updates</Link></li>
          <li><Link to="/gallery" onClick={closeMenu}>Gallery</Link></li>
          <li>
            <Link to="/support" className={styles.ctaButton} onClick={closeMenu}>
              Support Us
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
