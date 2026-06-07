/**
 * Programs Page Component
 * Outlines the core program
 */
import styles from './Programs.module.css';

// Program areas 
const programs = [
  {
    id: 1,
    title: "Research and Innovation for Development",
    description: "Conducting applied research and creating innovative solutions that directly address pressing development and health needs in our communities.",
    tag: "Core Focus"
  },
  {
    id: 2,
    title: "Digital Health and Assistive Technologies",
    description: "Developing digital systems and assistive tools, such as the Smart Limb Connect and Smart Glove, to promote inclusion and access to essential services.",
    tag: "Technology"
  },
  {
    id: 3,
    title: "Youth Capacity Building, Leadership, and Teamwork",
    description: "Empowering the next generation through intensive training to build essential leadership, teamwork, and soft skills.",
    tag: "Empowerment"
  },
  {
    id: 4,
    title: "Community Engagement and Evidence-Based Learning",
    description: "Translating research findings into practical applications while working closely with communities to ensure our solutions create real-world impact.",
    tag: "Community"
  }
];

export default function Programs() {
  return (
    <div className={styles.pageContainer}>
      <header className={styles.hero}>
        <div className={styles.heroContent}>
          <h1 className={styles.title}>Our Programs</h1>
          <p className={styles.subtitle}>
            Structured initiatives designed to cultivate expertise, drive innovation, and build resilient networks.
          </p>
        </div>
      </header>

      <section className={styles.contentSection}>
        <div className={styles.container}>
          <div className={styles.programsGrid}>
            {programs.map((prog) => (
              <div key={prog.id} className={styles.programCard}>
                <span className={styles.tag}>{prog.tag}</span>
                <h2 className={styles.programTitle}>{prog.title}</h2>
                <p className={styles.programDesc}>{prog.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
