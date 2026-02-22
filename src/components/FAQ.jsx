import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import styles from './FAQ.module.css';

gsap.registerPlugin(ScrollTrigger);

const faqs = [
  { q: "When is C8K launching?", a: "We're launching very soon — within the next few weeks. Join the waitlist to be the first to know and get your exclusive discount code." },
  { q: "What platforms does C8K support?", a: "C8K is available on iOS and Android. You can save recipes from Instagram, TikTok, YouTube, Facebook, any website URL, screenshots, photos, or add them manually." },
  { q: "Is there a free version?", a: "Yes! C8K has a free tier so you can get started right away. Waitlist members get an exclusive discount on the premium plan." },
  { q: "How does the Fridge feature work?", a: "You simply tell C8K what ingredients you currently have. The app then scans your saved recipes and suggests what you can cook right now — helping you reduce food waste." },
  { q: "Do I need an account to use the app?", a: "You'll need a quick sign-up to sync your recipes across devices and keep everything backed up. It takes under a minute." },
  { q: "Is my recipe data safe?", a: "Absolutely. Your recipes are securely stored and only accessible by you. We never share or sell your data." },
];

function FAQItem({ item, index }) {
  const [open, setOpen] = useState(false);
  const bodyRef = useRef(null);

  const toggle = () => {
    const el = bodyRef.current;
    if (!open) {
      gsap.fromTo(el, { height: 0, opacity: 0 }, { height: 'auto', opacity: 1, duration: 0.35, ease: 'power2.out' });
    } else {
      gsap.to(el, { height: 0, opacity: 0, duration: 0.25, ease: 'power2.in' });
    }
    setOpen(!open);
  };

  return (
    <div className={styles.item}>
      <button className={styles.question} onClick={toggle}>
        <span>{item.q}</span>
        <span className={`${styles.icon} ${open ? styles.iconOpen : ''}`}>+</span>
      </button>
      <div className={styles.answer} ref={bodyRef} style={{ height: 0, overflow: 'hidden', opacity: 0 }}>
        <p>{item.a}</p>
      </div>
    </div>
  );
}

export default function FAQ() {
  const sectionRef = useRef(null);
  const titleRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(titleRef.current.children, {
        opacity: 0, y: 24, stagger: 0.1, duration: 0.7, ease: 'power3.out',
        scrollTrigger: { trigger: titleRef.current, start: 'top 80%' },
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  const col1 = faqs.filter((_, i) => i % 2 === 0);
  const col2 = faqs.filter((_, i) => i % 2 !== 0);

  return (
    <section className={styles.section} ref={sectionRef}>
      <div className={styles.titleWrap} ref={titleRef}>
        <span className={styles.label}>FAQ</span>
        <h2 className={styles.title}>Frequently Asked<br /><em>Questions</em></h2>
      </div>

      <div className={styles.grid}>
        <div className={styles.col}>
          {col1.map((item, i) => <FAQItem key={i * 2} item={item} index={i * 2} />)}
        </div>
        <div className={styles.col}>
          {col2.map((item, i) => <FAQItem key={i * 2 + 1} item={item} index={i * 2 + 1} />)}
        </div>
      </div>

      <div className={styles.contact}>
        Questions? <a href="mailto:hello@c8k.app">hello@c8k.app</a>
      </div>
    </section>
  );
}