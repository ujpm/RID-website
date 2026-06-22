/**
 * Hero Component
 * An immersive, auto-playing carousel featuring 3 dynamic slides, 
 * a gradient overlay, and a curved bottom edge.
 */
import { Link } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination, EffectFade } from 'swiper/modules';
import { useModal } from '../../context/ModalContext';

import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/effect-fade';
import styles from './Hero.module.css';

const heroSlides = [
  {
    id: 1,
    title: 'Empowering Young People to Lead Through Research and Innovation',
    subtitle: 'We are a youth-led movement transforming our peers into leaders and problem-solvers.',
    imgSrc: '/images/hero-1.jpg',
  },
  {
    id: 2,
    title: 'Fostering the Next Generation of African Innovators',
    subtitle: 'Equipping youth with future-proof skills, critical thinking, and a rigorous research spirit.',
    imgSrc: '/images/hero-2.jpg',
  },
  {
    id: 3,
    title: 'Building Tangible Solutions for Real-World Problems',
    subtitle: 'From health tech to bio-innovations, we bridge the gap between theory and reality.',
    imgSrc: '/images/hero-3.jpg',
  }
];

export default function Hero() {
  const { openModal } = useModal();

  return (
    <section className={styles.heroWrapper}>
      <Swiper
        modules={[Autoplay, Pagination, EffectFade]}
        effect="fade" /* Gives it a premium cross-fade transition */
        slidesPerView={1}
        pagination={{ clickable: true }}
        autoplay={{ delay: 5000, disableOnInteraction: false }}
        className={styles.swiperContainer}
      >
        {heroSlides.map((slide) => (
          <SwiperSlide key={slide.id}>
            <div 
              className={styles.slideBackground}
              style={{ backgroundImage: `url(${slide.imgSrc})` }}
            >
              <div className={styles.overlay}>
                <div className={styles.heroContent}>
                  <h1 className={styles.title}>{slide.title}</h1>
                  <p className={styles.subtitle}>{slide.subtitle}</p>
                  <div className={styles.ctaGroup}>
                    <Link to="/programs" className={styles.primaryBtn}>Explore Our Programs</Link>
                    <button onClick={() => openModal('Member')} className={styles.secondaryBtn}>Become a Member</button>
                  </div>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
}
