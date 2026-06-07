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
    role: "Clinical Researcher", 
    country: "Sudan",
    quote: "The masterclasses completely transformed how I approach data analysis in resource-limited settings.",
    avatar: "/images/team/sudan.jpg",
    flag: "/images/flags/sd.png"
  },
  { 
    id: 2, 
    name: "Mabior Deng", 
    role: "Public Health Advocate", 
    country: "South Sudan",
    quote: "RID gave me the network and confidence to lead community health initiatives across borders.",
    avatar: "/images/team/south-sudan.jpg",
    flag: "/images/flags/ss.png"
  },
  { 
    id: 3, 
    name: "Claire Mutoni", 
    role: "Bio-Innovation Fellow", 
    country: "Rwanda",
    quote: "Having a dedicated community of young problem-solvers helped me turn my prototype into reality.",
    avatar: "/images/team/rwanda.jpg",
    flag: "/images/flags/rw.png"
  },
  { 
    id: 4, 
    name: "Samuel Ochieng", 
    role: "Health Tech Developer", 
    country: "Kenya",
    quote: "The mentorship hours provided a practical framework that I use in my development cycle daily.",
    avatar: "/images/team/kenya.jpg",
    flag: "/images/flags/ke.png"
  },
  { 
    id: 5, 
    name: "Fatime Mahamat", 
    role: "Epidemiologist", 
    country: "Chad",
    quote: "The cross-border collaboration fostered here is exactly what the African bioeconomy needs.",
    avatar: "/images/team/chad.jpg",
    flag: "/images/flags/td.png"
  },
  { 
    id: 6, 
    name: "Josephine Kollie", 
    role: "Laboratory Technician", 
    country: "Liberia",
    quote: "I was able to scale my laboratory skills exponentially thanks to the rigorous training programs.",
    avatar: "/images/team/liberia.jpg",
    flag: "/images/flags/lr.png"
  },
  { 
    id: 7, 
    name: "Oluwaseun Adeyemi", 
    role: "Biomedical Engineer", 
    country: "Nigeria",
    quote: "This is more than an association; it is an ecosystem that breeds excellence and innovation.",
    avatar: "/images/team/nigeria.jpg",
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
