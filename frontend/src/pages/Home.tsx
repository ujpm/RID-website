/**
 * Home Page Component
 * Serves as the landing page, introducing the mission and highlighting key sections.
 */
import React from 'react';
import Hero from '../components/ui/Hero';

export default function Home() {
  return (
    <div>
      <Hero />
      
      {/* Future Section: Impact Summary */}
      <section style={{ padding: '4rem 5%', textAlign: 'center' }}>
        <h2>Our Impact</h2>
        <p style={{ marginTop: '1rem', color: 'var(--color-text)' }}>
          Impact summary component will be integrated here.
        </p>
      </section>

      {/* Future Section: Testimonials */}
      <section style={{ padding: '4rem 5%', backgroundColor: 'white', textAlign: 'center' }}>
        <h2>What People Say</h2>
        <p style={{ marginTop: '1rem', color: 'var(--color-text)' }}>
          Testimonial slider component will be integrated here.
        </p>
      </section>
    </div>
  );
}
