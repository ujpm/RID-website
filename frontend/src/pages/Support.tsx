import React, { useState } from 'react';
import { Mail, HeartHandshake, Banknote } from 'lucide-react'; // Professional icons
import SupportModal from '../components/ui/SupportModal';
import styles from './Support.module.css';

const Support: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className={styles.supportContainer}>
      <h1 className={styles.pageTitle}>Support Us</h1>
      
      <div className={styles.cardsGrid}>
        {/* Card 1: Contact/Support Mail */}
        <div className={styles.supportCard}>
          <Mail className={styles.cardIcon} size={32} />
          <h3>Contact Support</h3>
          <p>Have a question or need assistance? Reach out to our dedicated team.</p>
          <a href="mailto:support@ridlab.xyz" className={styles.cardLink}>support@ridlab.xyz</a>
        </div>

        {/* Card 2: Partner With Us */}
        <div className={styles.supportCard}>
          <HeartHandshake className={styles.cardIcon} size={32} />
          <h3>Partner With Us</h3>
          <p>Collaborate with us to expand our impact and empower youth.</p>
          <button className={styles.cardButton}>View Partner Form</button> 
          {/* We will wire this button up to the partner form in the next phase */}
        </div>

        {/* Card 3: Support Our Mission */}
        <div className={styles.supportCard} onClick={() => setIsModalOpen(true)}>
          <Banknote className={styles.cardIcon} size={32} />
          <h3>Support Our Mission</h3>
          <p>Contribute to our initiatives and help us build sustainable solutions.</p>
          <button className={styles.cardButton}>Make a Contribution</button>
        </div>
      </div>

      {/* Render the Modal cleanly outside the main flow */}
      <SupportModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
      />
    </div>
  );
};

export default Support;