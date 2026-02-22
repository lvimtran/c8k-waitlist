import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { supabase } from '../lib/supabase';
import styles from './Hero.module.css';

export default function Hero() {
  const containerRef = useRef(null);
  const pillRef = useRef(null);
  const headlineRef = useRef(null);
  const subRef = useRef(null);
  const formRef = useRef(null);
  const socialRef = useRef(null);
  const smokeRefs = useRef([]);

  const [email, setEmail] = useState('');
  const [status, setStatus] = useState('idle'); // idle | loading | success | error | duplicate
  const [errorMsg, setErrorMsg] = useState('');

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Smoke orbs floating
      smokeRefs.current.forEach((el, i) => {
        if (!el) return;
        gsap.to(el, {
          y: gsap.utils.random(-30, 30),
          x: gsap.utils.random(-20, 20),
          scale: gsap.utils.random(0.95, 1.05),
          duration: gsap.utils.random(6, 10),
          repeat: -1,
          yoyo: true,
          ease: 'sine.inOut',
          delay: i * 0.8,
        });
      });

      // Entrance animation stagger
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });
      tl.from(pillRef.current, { opacity: 0, y: -16, duration: 0.7 })
        .from(headlineRef.current.children, { opacity: 0, y: 30, stagger: 0.12, duration: 0.8 }, '-=0.3')
        .from(subRef.current, { opacity: 0, y: 20, duration: 0.6 }, '-=0.4')
        .from(formRef.current, { opacity: 0, y: 20, duration: 0.6 }, '-=0.3')
        .from(socialRef.current, { opacity: 0, duration: 0.5 }, '-=0.2');
    }, containerRef);
    return () => ctx.revert();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg('');
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setErrorMsg('Please enter a valid email.');
      return;
    }
    setStatus('loading');
    try {
      const { error } = await supabase.from('waitlist').insert({ email });
      if (error) {
        if (error.code === '23505') { setStatus('duplicate'); return; }
        throw error;
      }
      setStatus('success');
    } catch {
      setStatus('error');
      setErrorMsg('Something went wrong. Please try again.');
    }
  };

  return (
    <section className={styles.hero} ref={containerRef}>
      {/* Smoke background */}
      <div className={styles.smokeWrap}>
        {[...Array(5)].map((_, i) => (
          <div key={i} className={`${styles.smoke} ${styles[`smoke${i}`]}`}
            ref={el => smokeRefs.current[i] = el} />
        ))}
      </div>

      <div className={styles.inner}>
        {/* Status pill */}
        <div className={styles.pill} ref={pillRef}>
          <span className={styles.dot} />
          Launching soon
        </div>

        {/* Headline */}
        <div className={styles.headline} ref={headlineRef}>
          <span>Cooking <em>recipe</em></span>
          <span>is all saved here</span>
        </div>

        {/* Sub */}
        <p className={styles.sub} ref={subRef}>
          Save recipes from Instagram, TikTok, YouTube, websites,<br />
          and more — all in one beautiful, minimalist app.
        </p>

        {/* Form */}
        <div className={styles.formWrap} ref={formRef}>
          {status === 'success' || status === 'duplicate' ? (
            <div className={styles.successBox}>
              <span className={styles.checkIcon}>✓</span>
              <p>{status === 'duplicate'
                ? "You're already on the list — we'll see you at launch!"
                : "You're on the list! Expect a discount code when we launch."}</p>
            </div>
          ) : (
            <form className={styles.form} onSubmit={handleSubmit}>
              <div className={styles.inputWrap}>
                <input
                  type="email"
                  placeholder="your@email.com"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  className={styles.input}
                />
                <button
                  type="submit"
                  className={styles.btn}
                  disabled={status === 'loading'}
                >
                  {status === 'loading' ? '...' : 'Join Waitlist'}
                </button>
              </div>
              {errorMsg && <p className={styles.error}>{errorMsg}</p>}
            </form>
          )}
        </div>

        {/* Social proof */}
        <div className={styles.social} ref={socialRef}>
          <div className={styles.avatars}>
            {['🧑‍🍳', '👩‍🍳', '🧑'].map((e, i) => (
              <div key={i} className={styles.avatar}>{e}</div>
            ))}
          </div>
          <span>Join home cooks saving their favorite recipes</span>
        </div>
      </div>
    </section>
  );
}