/**
 * Home Page Component
 * Serves as the landing page, introducing the mission and highlighting key sections.
 */
import React from 'react';
import Hero from '../components/ui/Hero';
import ImpactSummary from '../components/ui/ImpactSummary';
import ImpactMetrics from '../components/ui/ImpactMetrics';

export default function Home() {
  return (
    <div>
      <Hero />
      <ImpactSummary />
      <ImpactMetrics />

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
