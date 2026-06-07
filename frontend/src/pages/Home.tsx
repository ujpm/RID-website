/**
 * Home Page Component
 * Serves as the landing page, introducing the mission and highlighting key sections.
 */
import React from 'react';
import Hero from '../components/ui/Hero';
import ImpactSummary from '../components/ui/ImpactSummary';
import ImpactMetrics from '../components/ui/ImpactMetrics';
import Testimonials from '../components/ui/Testimonials';

export default function Home() {
  return (
    <div>
      <Hero />
      <ImpactSummary />
      <ImpactMetrics />
      <Testimonials />
    </div>
  );
}
