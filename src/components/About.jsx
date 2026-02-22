import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import styles from './About.module.css';

gsap.registerPlugin(ScrollTrigger);

export default function About() {
  const cardRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(cardRef.current, {
        opacity: 0, y: 50, duration: 0.8, ease: 'power3.out',
        scrollTrigger: { trigger: cardRef.current, start: 'top 80%' },
      });
    });
    return () => ctx.revert();
  }, []);

  return (
    <section className={styles.section}>
      <div className={styles.card} ref={cardRef}>
        <span className={styles.label}>Mission</span>
        <h2 className={styles.title}>One app for every<br /><em>recipe you'll ever love</em></h2>
        <p className={styles.body}>
          We built C8K because recipes are scattered everywhere — saved in DMs, buried in browser tabs,
          or lost in camera rolls. C8K brings them all into one clean, beautiful home.
        </p>
        <p className={styles.body}>
          No clutter, no ads, no friction. Just your recipes, always at your fingertips.
        </p>

        <div className={styles.meta}>
          <div className={styles.metaRow}>
            <span className={styles.metaKey}>Launching</span>
            <span className={styles.metaVal}>Coming soon</span>
          </div>
          <div className={styles.metaRow}>
            <span className={styles.metaKey}>Key Benefit</span>
            <span className={styles.metaVal}>All your recipes, one minimalist app</span>
          </div>
          <div className={styles.metaRow}>
            <span className={styles.metaKey}>Built For</span>
            <span className={styles.metaVal}>Home cooks who love good food</span>
          </div>
        </div>

        <div className={styles.founder}>
          <div className={styles.founderAvatar}>🧑‍🍳</div>
          <div>
            <div className={styles.founderName}>Lily</div>
            <div className={styles.founderTitle}>Founder of C8K</div>
          </div>
        </div>
      </div>
    </section>
  );
}