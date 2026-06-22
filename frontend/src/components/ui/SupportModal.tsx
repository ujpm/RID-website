/**
 * Global Modal Component (Formerly SupportModal)
 * Handles dynamic forms, state management, and API submission to the backend.
 */
import { useState, useEffect } from 'react';
import { useModal } from '../../context/ModalContext';
import styles from './SupportModal.module.css';

export default function SupportModal() {
  const { activeModal: type, closeModal: onClose } = useModal();
  const isOpen = type !== null;

  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [formData, setFormData] = useState({
    name: '', email: '', message: '', organization: '', interest: '', linkedin: '', expertise: ''
  });

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      setIsSubmitted(false);
      setError(null);
      setFormData({
        name: '', email: '', message: '', organization: '', interest: '', linkedin: '', expertise: ''
      });
    } else {
      document.body.style.overflow = 'auto';
    }
    return () => { document.body.style.overflow = 'auto'; };
  }, [isOpen]);

  if (!isOpen) return null;

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { id, value } = e.target;
    setFormData(prev => ({ ...prev, [id]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    const isMember = type === 'Member';
    const endpoint = isMember ? '/api/members' : '/api/inquiries';

    // Different payloads based on the entity
    const payload = isMember
      ? { 
          name: formData.name, email: formData.email, message: formData.message, linkedinProfile: formData.linkedin 
        }
      : {
          name: formData.name, email: formData.email, message: formData.message, type: type,
          additionalData: type === 'Partner' 
            ? { organization: formData.organization, interest: formData.interest }
            : { linkedin: formData.linkedin, expertise: formData.expertise }
        };

    try {
      const response = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      if (!response.ok) throw new Error('Failed to submit request. Please try again later.');
      setIsSubmitted(true);
    } catch (err: any) {
      setError(err.message || 'A network error occurred.');
    } finally {
      setIsLoading(false);
    }
  };

  const renderContent = () => {
    if (isSubmitted) {
      return (
        <div className={styles.successState}>
          <div className={styles.successIcon}>✓</div>
          <h2 className={styles.title}>Thank You!</h2>
          <p className={styles.subtitle}>Our team will reach out to you shortly.</p>
          <button className={styles.closeActionBtn} onClick={onClose}>Close</button>
        </div>
      );
    }

    if (type === 'Support') {
      return (
        <div className={styles.supportState}>
          <h2 className={styles.title}>Thank you for standing with us.</h2>
          <p className={styles.supportText}>
            At RID, our core mission is to empower youth through localized innovation, technology, and skills training. We believe that equipping young minds with the right resources is the key to building sustainable solutions for our communities.
          </p>
          <p className={styles.supportText}>Your contribution directly fuels these initiatives.</p>
          <a href="https://agaseke.me/rid" target="_blank" rel="noopener noreferrer" className={styles.agasekeBtn}>Proceed to Agaseke</a>
        </div>
      );
    }

    return (
      <>
        <h2 className={styles.title}>
          {type === 'Partner' ? 'Partner With RID' : type === 'Member' ? 'Become a Member' : 'Become a Mentor'}
        </h2>
        <p className={styles.subtitle}>Leave your details below and our team will get in touch shortly.</p>

        {error && <div className={styles.errorMessage}>{error}</div>}

        <form className={styles.form} onSubmit={handleSubmit}>
          <div className={styles.inputGroup}>
            <label htmlFor="name" className={styles.label}>Full Name</label>
            <input type="text" id="name" value={formData.name} onChange={handleInputChange} className={styles.input} required disabled={isLoading} />
          </div>
          
          <div className={styles.inputGroup}>
            <label htmlFor="email" className={styles.label}>Email Address</label>
            <input type="email" id="email" value={formData.email} onChange={handleInputChange} className={styles.input} required disabled={isLoading} />
          </div>

          {type === 'Partner' && (
            <>
              <div className={styles.inputGroup}>
                <label htmlFor="organization" className={styles.label}>Organization / Company</label>
                <input type="text" id="organization" value={formData.organization} onChange={handleInputChange} className={styles.input} required disabled={isLoading} />
              </div>
              <div className={styles.inputGroup}>
                <label htmlFor="interest" className={styles.label}>Collaboration Area</label>
                <select id="interest" value={formData.interest} onChange={handleInputChange} className={styles.select} required disabled={isLoading}>
                  <option value="">Select an area...</option>
                  <option value="Research Projects">Research Projects</option>
                  <option value="Masterclasses">Masterclasses</option>
                  <option value="Organizational Backing">Organizational Backing</option>
                </select>
              </div>
            </>
          )}

          {(type === 'Mentor' || type === 'Member') && (
            <div className={styles.inputGroup}>
              <label htmlFor="linkedin" className={styles.label}>LinkedIn Profile URL {type === 'Member' && '(Optional)'}</label>
              <input type="url" id="linkedin" value={formData.linkedin} onChange={handleInputChange} className={styles.input} required={type === 'Mentor'} disabled={isLoading} />
            </div>
          )}

          {type === 'Mentor' && (
            <div className={styles.inputGroup}>
              <label htmlFor="expertise" className={styles.label}>Area of Expertise</label>
              <input type="text" id="expertise" value={formData.expertise} onChange={handleInputChange} className={styles.input} required disabled={isLoading} />
            </div>
          )}

          <div className={styles.inputGroup}>
            <label htmlFor="message" className={styles.label}>Message {type === 'Member' && '(Why do you want to join?)'}</label>
            <textarea id="message" value={formData.message} onChange={handleInputChange} className={styles.textarea} rows={4} required disabled={isLoading}></textarea>
          </div>
          
          <button type="submit" className={styles.submitBtn} disabled={isLoading}>
            {isLoading ? 'Sending...' : 'Submit Application'}
          </button>
        </form>
      </>
    );
  };

  return (
    <div className={styles.modalBackdrop} onClick={onClose}>
      <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
        <button className={styles.closeBtn} onClick={onClose} disabled={isLoading}>&times;</button>
        {renderContent()}
      </div>
    </div>
  );
}
