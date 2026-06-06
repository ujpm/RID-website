/**
 * Impact Summary Component (Pillars)
 * Features a Swiper carousel with image overlay cards and sleek hover animations.
 */
import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination } from 'swiper/modules';
import { Link } from 'react-router-dom';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import styles from './ImpactSummary.module.css';

const impactData = [
  {
    id: 1,
    title: 'Youth Leadership & Mentorship',
    description: 'Transforming young people into community leaders and proactive problem-solvers through dedicated mentorship.',
    imgSrc: '/images/impact-leadership.jpg', 
  },
  {
    id: 2,
    title: 'Research Masterclasses',
    description: 'Instilling a rigorous research spirit through hands-on workshops, critical thinking, and data analysis training.',
    imgSrc: '/images/impact-research.jpg', 
  },
  {
    id: 3,
    title: 'Tangible Innovations',
    description: 'Bridging the gap between theory and reality by building solutions like the Smart Glove and bio-innovations.',
    imgSrc: '/images/impact-innovation.jpg', 
  }
];

export default function ImpactSummary() {
  return (
    <section className={styles.impactSection}>
      <div className={styles.container}>
        <h2 className={styles.sectionTitle}>Our Core Pillars</h2>
        
        <Swiper
          modules={[Autoplay, Pagination]}
          spaceBetween={30}
          slidesPerView={1}
          pagination={{ clickable: true }}
          autoplay={{ delay: 4000, disableOnInteraction: false }}
          breakpoints={{
            768: { slidesPerView: 2 },
            1024: { slidesPerView: 3 },
          }}
          className={styles.swiperContainer}
        >
          {impactData.map((item) => (
            <SwiperSlide key={item.id}>
              <div className={styles.card}>
                <img src={item.imgSrc} alt={item.title} className={styles.image} />
                <div className={styles.overlay}>
                  <h3 className={styles.cardTitle}>{item.title}</h3>
                  <div className={styles.hoverContent}>
                    <p className={styles.cardDesc}>{item.description}</p>
                    {/* Updated to use brand styling */}
                    <Link to="/programs" className={styles.brandBtn}>Learn More</Link>
                  </div>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
}
