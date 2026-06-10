/**
 * Impact Page Component
 * Showcases RID's completed and ongoing projects and metrics.
 */
import ImpactMetrics from '../components/ui/ImpactMetrics';
import styles from './Impact.module.css';

// Projects
const projects = [
  {
    id: 1,
    title: "Smart Glove Project",
    category: "Assistive Technology",
    description: "A smart glove that translates sign language into speech, addressing communication challenges for people with hearing and speech impairments. Ranked sixth nationally in the ALX Rwanda innovation competition.",
    status: "Completed",
    image: "/images/smart-glove.jpg" 
  },
  {
    id: 2,
    title: "Smart Limb Connect (SLC)",
    category: "Digital Health",
    description: "Implemented in partnership with the IREME initiative. A mobile-based digital health system connecting amputees with service providers for rehabilitation and follow-up via smartphones, USSD, and SMS.",
    status: "Ongoing",
    image: "/images/slc.jpg"
  },
  {
    id: 3,
    title: "Microsmart - the most affordabble smart microscope",
    category: "Diagnostics",
    description: "Integrating smart hardware and AI, MicroSmart automates microscopy for blood, infectious diseases, and Pap smears, delivering reliable clinical diagnostics to low-resource healthcare settings.",
    status: "Completed",
    image: "/images/microsmart.jpg"
  }
];

export default function Impact() {
  return (
    <div className={styles.pageContainer}>
      <header className={styles.hero}>
        <div className={styles.heroContent}>
          <h1 className={styles.title}>Our Impact</h1>
          <p className={styles.subtitle}>
            Transforming research into tangible solutions that drive inclusive development across Rwanda.
          </p>
        </div>
      </header>

      <section className={styles.projectsSection}>
        <div className={styles.container}>
          <h2 className={styles.sectionTitle}>Featured Innovations</h2>
          <div className={styles.projectsGrid}>
            {projects.map((project, index) => (
              <div 
                key={project.id} 
                className={styles.projectCard}
                style={{ animationDelay: `${index * 0.15}s` }}
              >
                <div className={styles.imageWrapper}>
                  <img src={project.image} alt={project.title} className={styles.projectImage} />
                  <span className={`${styles.statusBadge} ${project.status === 'Ongoing' ? styles.statusOngoing : styles.statusCompleted}`}>
                    {project.status}
                  </span>
                </div>
                <div className={styles.cardContent}>
                  <span className={styles.category}>{project.category}</span>
                  <h3 className={styles.projectTitle}>{project.title}</h3>
                  <p className={styles.projectDesc}>{project.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Reusing the modular Impact Metrics component from the Home page */}
      <ImpactMetrics />
    </div>
  );
}
