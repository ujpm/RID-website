/**
 * Gallery Page Component
 * UI Mockup with interactive frontend filtering.
 */
import { useState } from 'react';
import styles from './Gallery.module.css';

// Dummy data for visual layout
const galleryData = [
  { id: 1, category: "Innovation", image: "/images/impact-innovation.jpg", alt: "Lab session" },
  { id: 2, category: "Mentorship", image: "/images/impact-leadership.jpg", alt: "Mentorship meeting" },
  { id: 3, category: "Community", image: "/images/impact-research.jpg", alt: "Community outreach" },
  { id: 4, category: "Innovation", image: "/images/hero-1.jpg", alt: "Hackathon" },
  { id: 5, category: "Community", image: "/images/hero-2.jpg", alt: "Field work" },
  { id: 6, category: "Mentorship", image: "/images/hero-3.jpg", alt: "Workshop" }
];

const categories = ["All", "Innovation", "Mentorship", "Community"];

export default function Gallery() {
  const [activeFilter, setActiveFilter] = useState("All");

  const filteredImages = activeFilter === "All" 
    ? galleryData 
    : galleryData.filter(item => item.category === activeFilter);

  return (
    <div className={styles.pageContainer}>
      <header className={styles.hero}>
        <div className={styles.heroContent}>
          <h1 className={styles.title}>Media Gallery</h1>
          <p className={styles.subtitle}>Visual highlights of our youth in action.</p>
        </div>
      </header>

      <section className={styles.gallerySection}>
        <div className={styles.container}>
          {/* Interactive Filters */}
          <div className={styles.filterBar}>
            {categories.map(category => (
              <button 
                key={category}
                className={`${styles.filterBtn} ${activeFilter === category ? styles.active : ''}`}
                onClick={() => setActiveFilter(category)}
              >
                {category}
              </button>
            ))}
          </div>

          {/* Image Grid */}
          <div className={styles.imageGrid}>
            {filteredImages.map(item => (
              <div key={item.id} className={styles.imageCard}>
                <img src={item.image} alt={item.alt} />
                <div className={styles.imageOverlay}>
                  <span className={styles.imageTag}>{item.category}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
