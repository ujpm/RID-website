/**
 * Support Page Component
 * Call to action page for partnerships, donations, and volunteering.
 * Uses Lucide icons and dynamic SupportModal for interaction.
 */
import { useState } from 'react';
import { Handshake, Lightbulb, Banknote } from 'lucide-react';
import SupportModal from '../components/ui/SupportModal';
import styles from './Support.module.css';

export default function Support() {
  const [modalConfig, setModalConfig] = useState<{ isOpen: boolean; type: string }>({
    isOpen: false,
    type: ''
  });

  const openModal = (type: string) => setModalConfig({ isOpen: true, type });
  const closeModal = () => setModalConfig({ isOpen: false, type: '' });

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

      {/* Dynamic Modal Integration */}
      <SupportModal 
        isOpen={modalConfig.isOpen} 
        type={modalConfig.type} 
        onClose={closeModal} 
      />
    </div>
  );
}
