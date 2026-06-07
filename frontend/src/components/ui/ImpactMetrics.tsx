import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination } from 'swiper/modules';
import { Users, GraduationCap, Lightbulb, Globe, Clock } from 'lucide-react';
import 'swiper/css';
import 'swiper/css/pagination';
import styles from './ImpactMetrics.module.css';

const metricsData = [
  { id: 1, icon: <Users size={28} />, number: '100+', label: 'Young People Reached' },
  { id: 2, icon: <GraduationCap size={28} />, number: '15+', label: 'Masterclass Sessions' },
  { id: 3, icon: <Lightbulb size={28} />, number: '5+', label: 'Innovations Supported' },
  { id: 4, icon: <Globe size={28} />, number: '5+', label: 'Countries Represented' },
  { id: 5, icon: <Clock size={28} />, number: '100+', label: 'Mentorship Hours' }
];

export default function ImpactMetrics() {
  return (
    <section className={styles.metricsSection}>
      <div className={styles.container}>
        <Swiper
          modules={[Autoplay, Pagination]}
          spaceBetween={20}
          slidesPerView={1}
          pagination={{ clickable: true }}
          autoplay={{ delay: 3000, disableOnInteraction: false }}
          breakpoints={{ 480: { slidesPerView: 2 }, 768: { slidesPerView: 3 }, 1024: { slidesPerView: 4 } }}
          className={styles.swiperContainer}
        >
          {metricsData.map((metric) => (
            <SwiperSlide key={metric.id}>
              <div className={styles.metricCard}>
                <div className={styles.badge}>{metric.icon}</div>
                <h3 className={styles.number}>{metric.number}</h3>
                <p className={styles.label}>{metric.label}</p>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
}
