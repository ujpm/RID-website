/**
 * About Page Component
 * Details the mission, vision, leadership, and advisors of RID.
 * Features an interactive modal and mobile-friendly Swiper carousels.
 */
import { useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import styles from './About.module.css';

// Shared bio placeholder
const loremBio = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.";

// Leadership data
const teamData = [
  { id: 1, name: "M. Shomen Abdaljabar", role: "President", image: "/images/team/1.jpg", bio: loremBio, email: "president@rid.rw", linkedin: "#" },
  { id: 2, name: "Teta Erssie", role: "Vice-President", image: "/images/team/1.jpg", bio: loremBio, email: "vp@rid.rw", linkedin: "#" },
  { id: 3, name: "Methode Emmanuel Ihirwe", role: "Secretary", image: "/images/team/1.jpg", bio: loremBio, email: "secretary@rid.rw", linkedin: "#" },
  { id: 4, name: "Mudatenguha leonce", role: "Treasurer", image: "/images/team/1.jpg", bio: loremBio, email: "treasurer@rid.rw", linkedin: "#" },
  { id: 5, name: "UWIZEYIMANA Jean Pierre", role: "Research & Innovation", image: "/images/team/1.jpg", bio: loremBio, email: "research@rid.rw", linkedin: "#" },
  { id: 6, name: "Stella Fideline NIYONKURU", role: "Youth Dev & Capacity", image: "/images/team/1.jpg", bio: loremBio, email: "youth@rid.rw", linkedin: "#" },
  { id: 7, name: "Mousa Suliman", role: "Executive Director", image: "/images/team/moussa.jpg", bio: loremBio, email: "director@rid.rw", linkedin: "#" }
];

// Board of Advisors data
const advisorsData = [
  { id: 1, name: "Prof. Samson A. Oyebadejo", role: "Board of Advisors", image: "/images/team/1.jpg", bio: loremBio, email: "advisor1@rid.rw", linkedin: "#" },
  { id: 2, name: "Mr. Willian NIYONZIMA", role: "Board of Advisors", image: "/images/team/1.jpg", bio: loremBio, email: "advisor2@rid.rw", linkedin: "#" },
  { id: 3, name: "Mr. Clement MUNYENTWARI", role: "Board of Advisors", image: "/images/team/1.jpg", bio: loremBio, email: "advisor3@rid.rw", linkedin: "#" }
];

export default function About() {
  const [selectedMember, setSelectedMember] = useState<any>(null);

  const openModal = (member: any) => {
    setSelectedMember(member);
    document.body.style.overflow = 'hidden'; 
  };

  const closeModal = () => {
    setSelectedMember(null);
    document.body.style.overflow = 'auto'; 
  };

  return (
    <div className={styles.pageContainer}>
      {/* Page Header */}
      <header className={styles.hero}>
        <div className={styles.heroContent}>
          <h1 className={styles.title}>Who We Are</h1>
          <p className={styles.subtitle}>
            A youth-led initiative utilizing scientific research, innovation, and technology to address real development challenges.
          </p>
        </div>
      </header>

      {/* Mission & Vision Section */}
      <section className={styles.missionSection}>
        <div className={styles.container}>
          <div className={styles.grid}>
            <div className={styles.card}>
              <h2 className={styles.cardTitle}>Our Mission</h2>
              <p className={styles.cardText}>
                To empower youth and communities through research and innovation, building leadership capacity and practical skills to produce evidence-based solutions to development challenges.
              </p>
            </div>
            <div className={styles.card}>
              <h2 className={styles.cardTitle}>Our Vision</h2>
              <p className={styles.cardText}>
                A society where research, innovation, and youth leadership contribute to inclusive and sustainable development.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Executive Leadership Section */}
      <section className={styles.teamSection}>
        <div className={styles.container}>
          <h2 className={styles.sectionTitle}>Leadership</h2>
          <div className={styles.teamGrid}>
            {teamData.map((member, index) => (
              <div 
                key={member.id} 
                className={styles.teamCard}
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className={styles.imageWrapper} onClick={() => openModal(member)}>
                  <img src={member.image} alt={member.name} className={styles.teamImage} />
                  <div className={styles.imageOverlay}>
                    <button className={styles.readBioBtn}>Read Bio</button>
                  </div>
                </div>
                <h3 className={styles.memberName}>{member.name}</h3>
                <p className={styles.memberRole}>{member.role}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Board of Advisors Section (Swipeable) */}
      <section className={styles.advisorsSection}>
        <div className={styles.container}>
          <h2 className={styles.sectionTitle}>Board of Advisors</h2>
          <div className={styles.swiperWrapper}>
            <Swiper
              modules={[Pagination]}
              spaceBetween={30}
              slidesPerView={1}
              pagination={{ clickable: true }}
              breakpoints={{
                640: { slidesPerView: 1 },
                768: { slidesPerView: 2 },
                1024: { slidesPerView: 3 },
              }}
            >
              {advisorsData.map((advisor) => (
                <SwiperSlide key={advisor.id} className={styles.slideItem}>
                  <div className={styles.advisorCard}>
                    <div className={styles.advisorImageWrapper} onClick={() => openModal(advisor)}>
                      <img src={advisor.image} alt={advisor.name} className={styles.teamImage} />
                      <div className={styles.imageOverlay}>
                        <button className={styles.readBioBtn}>Read Bio</button>
                      </div>
                    </div>
                    <h3 className={styles.memberName}>{advisor.name}</h3>
                    <p className={styles.memberRole}>{advisor.role}</p>
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </div>
      </section>

      {/* Shared Modal Overlay */}
      {selectedMember && (
        <div className={styles.modalBackdrop} onClick={closeModal}>
          <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
            <button className={styles.closeModalBtn} onClick={closeModal}>&times;</button>
            
            <div className={styles.modalHeader}>
              <img src={selectedMember.image} alt={selectedMember.name} className={styles.modalAvatar} />
              <div>
                <h3 className={styles.modalName}>{selectedMember.name}</h3>
                <p className={styles.modalRole}>{selectedMember.role}</p>
              </div>
            </div>
            
            <div className={styles.modalBody}>
              <p>{selectedMember.bio}</p>
            </div>
            
            <div className={styles.modalFooter}>
              <a href={selectedMember.linkedin} target="_blank" rel="noopener noreferrer" className={styles.contactLink}>
                LinkedIn Profile
              </a>
              <a href={`mailto:${selectedMember.email}`} className={styles.contactBtn}>
                Email Contact
              </a>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}