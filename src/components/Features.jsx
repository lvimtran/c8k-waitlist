import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import styles from './Features.module.css';

gsap.registerPlugin(ScrollTrigger);

const features = [
  {
    icon: '🔗',
    title: 'Save From Anywhere',
    desc: 'Instagram, TikTok, YouTube, Facebook, websites, screenshots, photos, or manual — one tap saves it all.',
  },
  {
    icon: '🧊',
    title: 'Fridge Feature',
    desc: 'Tell the app what ingredients you have. It suggests recipes you can make right now, minimising food waste.',
  },
  {
    icon: '📅',
    title: 'Meal Planning',
    desc: 'Organise your saved recipes into weekly or monthly meal plans — breakfast, lunch, dinner, snacks and more.',
  },
  {
    icon: '🎙️',
    title: 'Hands-Free Cooking',
    desc: 'Cook without touching your phone. The app reads steps aloud and listens for "Next", "Previous", "Repeat".',
  },
  {
    icon: '🤖',
    title: 'AI Recipe Assistant',
    desc: 'Ask cooking questions, get ingredient substitutions, or modify recipes to fit your dietary needs.',
  },
  {
    icon: '🎲',
    title: 'Random Pick & Smart Search',
    desc: 'Can\'t decide what to eat? Random pick or describe your craving — "quick lazy meal with no spice" — and get the perfect match.',
  },
];

export default function Features() {
  const sectionRef = useRef(null);
  const titleRef = useRef(null);
  const cardsRef = useRef([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(titleRef.current.children, {
        opacity: 0, y: 30, stagger: 0.1, duration: 0.7, ease: 'power3.out',
        scrollTrigger: { trigger: titleRef.current, start: 'top 80%' },
      });

      cardsRef.current.forEach((card, i) => {
        if (!card) return;
        gsap.from(card, {
          opacity: 0, y: 40, duration: 0.6, ease: 'power3.out',
          delay: (i % 3) * 0.08,
          scrollTrigger: { trigger: card, start: 'top 85%' },
        });
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section className={styles.section} ref={sectionRef}>
      <div className={styles.titleWrap} ref={titleRef}>
        <span className={styles.label}>Features</span>
        <h2 className={styles.title}>Everything a home cook<br /><em>actually needs</em></h2>
      </div>

      <div className={styles.grid}>
        {features.map((f, i) => (
          <div key={i} className={styles.card} ref={el => cardsRef.current[i] = el}>
            <div className={styles.iconBox}>{f.icon}</div>
            <h3 className={styles.cardTitle}>{f.title}</h3>
            <p className={styles.cardDesc}>{f.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}