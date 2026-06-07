/**
 * Support Page Component
 * Call to action page for partnerships, donations, and volunteering.
 */
import styles from './Support.module.css';

export default function Support() {
  return (
    <div className={styles.pageContainer}>
      <header className={styles.hero}>
        <div className={styles.heroContent}>
          <h1 className={styles.title}>Get Involved</h1>
          <p className={styles.subtitle}>
            Your support accelerates African innovation. Partner with us to scale our impact.
          </p>
        </div>
      </header>

      <section className={styles.contentSection}>
        <div className={styles.container}>
          <div className={styles.actionGrid}>
            <div className={styles.actionCard}>
              <div className={styles.iconPlaceholder}>🤝</div>
              <h2 className={styles.cardTitle}>Partner With Us</h2>
              <p className={styles.cardDesc}>Collaborate on research projects, co-host masterclasses, or provide organizational backing.</p>
              <button className={styles.actionBtn}>Become a Partner</button>
            </div>
            
            <div className={styles.actionCard}>
              <div className={styles.iconPlaceholder}>💡</div>
              <h2 className={styles.cardTitle}>Become a Mentor</h2>
              <p className={styles.cardDesc}>Share your industry expertise and guide the next generation of biomedical innovators.</p>
              <button className={styles.actionBtn}>Apply to Mentor</button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
