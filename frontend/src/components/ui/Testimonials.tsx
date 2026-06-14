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
    name: "Sarah simon", 
    role: "Student", 
    country: "South Sudan",
    quote: "This training has been one of the most impactful learning experiences I have had. It equipped me with valuable leadership, public speaking, and teamwork skills while boosting my confidence and self-belief. The trainers created an engaging and supportive environment that encouraged growth and active participation. I proudly recommend this program to anyone who wants to unlock their potential and become a more effective leader and communicator.",
    avatar: "/images/testimonials/simon.jpg",
    flag: "/images/flags/ss.png"
  },
  { 
    id: 2, 
    name: "Momoun Mohammed Adam", 
    role: "Student", 
    country: "South Sudan",
    quote: "I participated in the RID Soft Skills Training at INES Ruhengeri, which greatly contributed to my personal and academic development. The program improved my understanding of ICT and Artificial Intelligence (AI) and their importance in education and future careers. It also strengthened my communication, public speaking, and teamwork skills. Through the sessions, I gained leadership abilities, increased self-confidence, and learned to collaborate effectively with others. The trainers created a supportive and engaging environment that encouraged active participation and growth. Overall, the experience was highly valuable, and I strongly recommend it to future students.",
    avatar: "/images/testimonials/adam.jpg",
    flag: "/images/flags/ss.png"
  },
  { 
    id: 3, 
    name: "Thomas NSENGIYAREMYE", 
    role: "Student", 
    country: "Rwanda",
    quote: "I attended soft skills sessions set for RID in INES RUHENGERI. the sessions of soft skills are so helpful as it made me aware on the use of modern technology such as ICT, AI in my studies which hel me in exploring the globe especially in the domain of health sciences. It also equiped me with communication skills which helps in interacting with the people, enhancing relationship and teamwork. So these sessions were in need and it would be better if we have another sessions.",
    avatar: "/images/testimonials/thomas.jpg",
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
