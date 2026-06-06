/**
 * Hero Component
 * Displays the primary mission statement and call-to-action on the Home page.
 */
import React from 'react';
import { Link } from 'react-router-dom';
import styles from './Hero.module.css';

export default function Hero() {
  return (
    <section className={styles.hero}>
      <div className={styles.heroContent}>
        <h1 className={styles.title}>
          Empowering Young People to Lead Through Research and Innovation
        </h1>
        <p className={styles.subtitle}>
          We are a youth-led movement transforming our peers into leaders and problem-solvers.
        </p>
        <div className={styles.ctaGroup}>
          <Link to="/programs" className={styles.primaryBtn}>Explore Our Programs</Link>
          <Link to="/impact" className={styles.secondaryBtn}>See Our Impact</Link>
        </div>
      </div>
    </section>
  );
}
