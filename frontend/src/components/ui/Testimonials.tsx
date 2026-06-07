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
    name: "Amira Elamin", 
    role: "Student", 
    country: "Sudan",
    quote: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    avatar: "/images/team/1.jpg",
    flag: "/images/flags/sd.png"
  },
  { 
    id: 2, 
    name: "Mabior Deng", 
    role: "Student", 
    country: "South Sudan",
    quote: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    avatar: "/images/team/1.jpg",
    flag: "/images/flags/ss.png"
  },
  { 
    id: 3, 
    name: "Claire Mutoni", 
    role: "Student", 
    country: "Rwanda",
    quote: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    avatar: "/images/team/1.jpg",
    flag: "/images/flags/rw.png"
  },
  { 
    id: 4, 
    name: "Samuel Ochieng", 
    role: "Student", 
    country: "Kenya",
    quote: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    avatar: "/images/team/1.jpg",
    flag: "/images/flags/ke.png"
  },
  { 
    id: 5, 
    name: "Fatime Mahamat", 
    role: "Student", 
    country: "Chad",
    quote: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    avatar: "/images/team/1.jpg",
    flag: "/images/flags/td.png"
  },
  { 
    id: 6, 
    name: "Josephine Kollie", 
    role: "Student", 
    country: "Liberia",
    quote: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    avatar: "/images/team/1.jpg",
    flag: "/images/flags/lr.png"
  },
  { 
    id: 7, 
    name: "Oluwaseun Adeyemi", 
    role: "Student", 
    country: "Nigeria",
    quote: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    avatar: "/images/team/1.jpg",
    flag: "/images/flags/ng.png"
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
