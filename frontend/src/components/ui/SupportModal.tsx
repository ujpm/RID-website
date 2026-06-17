import React from 'react';
import { X } from 'lucide-react';
import styles from './SupportModal.module.css';

interface SupportModalProps {
  isOpen: boolean;
  onClose: () => void;
}

/**
 * SupportModal Component
 * Displays a clean, empowering message about the RID mission 
 * before redirecting users to the external crowdfunding platform.
 */
const SupportModal: React.FC<SupportModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className={styles.modalOverlay} onClick={onClose}>
      <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
        <button 
          className={styles.closeButton} 
          onClick={onClose} 
          aria-label="Close modal"
        >
          <X size={24} />
        </button>
        
        <h2 className={styles.modalTitle}>Thank you for standing with us.</h2>
        
        <div className={styles.modalBody}>
          <p>
            At RID, our core mission is to empower youth through localized innovation, 
            technology, and skills training. We believe that equipping young minds with 
            the right resources is the key to building sustainable solutions for our communities.
          </p>
          <p>
            Your contribution directly fuels these initiatives. Thank you for helping us 
            shape the future.
          </p>
        </div>

        <div className={styles.modalActions}>
          <a 
            href="https://agaseke.me/rid" 
            target="_blank" 
            rel="noopener noreferrer" 
            className={styles.primaryButton}
            onClick={onClose} // Optional: closes modal when they click the link
          >
            Proceed to Agaseke
          </a>
        </div>
      </div>
    </div>
  );
};

export default SupportModal;