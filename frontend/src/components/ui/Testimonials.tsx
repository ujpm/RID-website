/**
 * Testimonials Component
 * Features a UVU Bio-inspired card layout with an overlapping profile picture,
 * corner country flags, and an auto-scrolling 3-slide carousel.
 */
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import styles from './Testimonials.module.css';

// Placeholder data representing our diverse international community
const testimonialsData = [
  { 
    id: 1, 
    name: "Sarah Simon", 
    role: "Student", 
    country: "South Sudan",
    quote: "This program equipped me with valuable leadership, public speaking, and teamwork skills while boosting my confidence. The supportive environment encouraged growth and helped me unlock my full potential.",
    avatar: "/images/testimonials/simon.jpg",
    flag: "/images/flags/ss.png"
  },
  { 
    id: 2, 
    name: "Momoun Mohammed Adam", 
    role: "Student", 
    country: "Sudan",
    quote: "The training strengthened my soft skills in communication and teamwork while expanding my understanding of ICT and AI. The engaging environment boosted my confidence and collaborative abilities.",
    avatar: "/images/testimonials/adam.jpg",
    flag: "/images/flags/sd.png"
  },
  { 
    id: 3, 
    name: "Thomas Nsengiyaremye", 
    role: "Student", 
    country: "Rwanda",
    quote: "The soft skills sessions enhanced my communication and teamwork abilities while introducing me to modern technologies like ICT and AI. This training will help me excel in my academic and professional journey.",
    avatar: "/images/testimonials/thomas.jpg",
    flag: "/images/flags/rw.png"
  }
];

export default function Testimonials() {
  return (
    <section className={styles.testimonialsSection}>
      <div className={styles.container}>
        <h2 className={styles.sectionTitle}>Voices of Our Community</h2>
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
          {testimonialsData.map((t) => (
            <SwiperSlide key={t.id}>
              <div className={styles.card}>
                
                {/* Overlapping Avatar Badge */}
                <div className={styles.avatarBadge}>
                  <img src={t.avatar} alt={t.name} className={styles.avatarImg} />
                  {/* Corner Flag Overlay */}
                  <div className={styles.flagContainer}>
                    <img src={t.flag} alt={t.country} className={styles.flagImg} />
                  </div>
                </div>

                {/* Card Content */}
                <div className={styles.cardContent}>
                  <p className={styles.quote}>"{t.quote}"</p>
                  <h4 className={styles.name}>{t.name}</h4>
                  <p className={styles.role}>{t.role}</p>
                </div>

              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
}
