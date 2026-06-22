/**
 * Support Page Component
 * Call to action page for partnerships, donations, and volunteering.
 * Uses Lucide icons and Global Modal Context for interaction.
 */
import { Handshake, Lightbulb, Banknote, UserPlus } from 'lucide-react';
import { useModal } from '../context/ModalContext';
import styles from './Support.module.css';

export default function Support() {
  const { openModal } = useModal();

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
            
            {/* Membership Card */}
            <div className={styles.actionCard}>
              <div className={styles.iconWrapper}>
                <UserPlus size={48} strokeWidth={1.5} />
              </div>
              <h2 className={styles.cardTitle}>Become a Member</h2>
              <p className={styles.cardDesc}>Join our vibrant network of youth shaping the future of research and innovation in Africa.</p>
              <button className={styles.actionBtn} onClick={() => openModal('Member')}>Join Us</button>
            </div>

            {/* Partnership Card */}
            <div className={styles.actionCard}>
              <div className={styles.iconWrapper}>
                <Handshake size={48} strokeWidth={1.5} />
              </div>
              <h2 className={styles.cardTitle}>Partner With Us</h2>
              <p className={styles.cardDesc}>Collaborate on research projects, co-host masterclasses, or provide organizational backing.</p>
              <button className={styles.actionBtn} onClick={() => openModal('Partner')}>Become a Partner</button>
            </div>
            
            {/* Mentorship Card */}
            <div className={styles.actionCard}>
              <div className={styles.iconWrapper}>
                <Lightbulb size={48} strokeWidth={1.5} />
              </div>
              <h2 className={styles.cardTitle}>Become a Mentor</h2>
              <p className={styles.cardDesc}>Share your industry expertise and guide the next generation of biomedical innovators.</p>
              <button className={styles.actionBtn} onClick={() => openModal('Mentor')}>Apply to Mentor</button>
            </div>

            {/* Support/Agaseke Card */}
            <div className={styles.actionCard}>
              <div className={styles.iconWrapper}>
                <Banknote size={48} strokeWidth={1.5} />
              </div>
              <h2 className={styles.cardTitle}>Support Our Mission</h2>
              <p className={styles.cardDesc}>Fuel our grassroots initiatives by contributing directly to our skills training and innovation hubs.</p>
              <button className={styles.actionBtn} onClick={() => openModal('Support')}>Contribute</button>
            </div>

          </div>
        </div>
      </section>
    </div>
  );
}
