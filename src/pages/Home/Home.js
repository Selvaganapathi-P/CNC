import React, { useEffect, useRef, useState, useCallback } from 'react';
import { Link } from 'react-router-dom';
import AnimatedCounter from '../../components/AnimatedCounter/AnimatedCounter';
import ReviewSlider from '../../components/ReviewSlider/ReviewSlider';
import ProductCard from '../../components/ProductCard/ProductCard';
import useScrollReveal from '../../hooks/useScrollReveal';
import { products } from '../../data/products';
import { reviews } from '../../data/reviews';
import rocketImg from '../../assets/rocket-removebg-preview.png';
import ringImg from '../../assets/ring.png';

import buildingImg from '../../assets/building.jpg';
import aerospaceImg from '../../assets/aerospace.jpg';
import windmillImg  from '../../assets/windmill.jpg';
import logoBrahmos  from '../../assets/miltech logo/BrahMos_Aerospace.svg.png';
import logoFLSmidth from '../../assets/miltech logo/FLSmidth.png';
import logoIGCAR    from '../../assets/miltech logo/Indira_Gandhi_Centre_for_Atomic_Research_Logo.png';
import logoLT       from '../../assets/miltech logo/L&T (DEFENCE, ECC, Rubber Processing Machinery), Chennai..png';
import logoLPSC     from '../../assets/miltech logo/Liquid_Propulsion_Systems_Centre_Logo.png';
import logoVSSC     from '../../assets/miltech logo/VIKRAM SARABHAI SPACE RESEARCH CENTRE, Thiruvananthapuram. logo.png';
import logoMiltech  from '../../assets/logoo_mtc-removebg-preview.png';

import './Home.css';

// Banner slides
const SLIDES = [
  {
    img: aerospaceImg,
    label: 'Aerospace',
    tag: 'ISRO · BrahMos · PSLV · Gaganyaan',
    title: ['CNC', 'Aerospace', 'Engineering'],
    sub: 'Critical aerospace components manufactured to ISRO-grade specifications with zero-tolerance quality.',
    accent: '#4F46E5',
  },
  {
    img: windmillImg,
    label: 'Wind Energy',
    tag: 'Renewable · Heavy Machining',
    title: ['Heavy Duty', 'Wind Turbine', 'Components'],
    sub: 'Large nacelle frames, hub flanges and structural parts machined on our 12.5m KOLB Gantry.',
    accent: '#10B981',
  },
  {
    img: buildingImg,
    label: 'Infrastructure',
    tag: 'Heavy Fabrication · Thermal Plants',
    title: ['Industrial', 'Infrastructure', 'Solutions'],
    sub: 'High-pressure tanks, earth-moving equipment and thermal power plant components since 2002.',
    accent: '#F59E0B',
  },
];

const CLIENTS = [
  { abbr: 'ISRO / VSSC', logo: logoVSSC,     color: '#F59E0B' },
  { abbr: 'BrahMos',     logo: logoBrahmos,   color: '#4F46E5' },
  { abbr: 'L&T',         logo: logoLT,        color: '#E8192C' },
  { abbr: 'IGCAR',       logo: logoIGCAR,     color: '#10B981' },
  { abbr: 'FLSmidth',    logo: logoFLSmidth,  color: '#0EA5E9' },
  { abbr: 'LPSC',        logo: logoLPSC,      color: '#7C3AED' },
];

const EXPERTISE = [
  { img: 'https://images.unsplash.com/photo-1581092921461-eab62e97a780?w=600&q=80', title: 'CNC Machining', desc: '0.02mm tolerances on aerospace-grade alloys', color: '#4F46E5' },
  { img: 'https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?w=600&q=80', title: 'Heavy Fabrication', desc: 'Up to 100T on our BERTHIEZ 8.2m VTL', color: '#E8192C' },
  { img: 'https://images.unsplash.com/photo-1518364538800-6bae3c2ea0f2?w=600&q=80', title: 'Dimensional Inspection', desc: 'TESA, Pi-tape, tubular micrometers to 5000mm', color: '#10B981' },
  { img: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=600&q=80', title: 'Aerospace Certified', desc: 'ISRO-approved, Gaganyaan & PSLV components', color: '#F59E0B' },
  { img: 'https://images.unsplash.com/photo-1565514020179-026b92b84bb6?w=600&q=80', title: 'MasterCAM Programming', desc: 'In-house 4/5-axis CNC programming expertise', color: '#7C3AED' },
  { img: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=600&q=80', title: 'ISO 9001:2015', desc: 'Certified quality management, full traceability', color: '#EA580C' },
];

// ── BANNER HERO ──
function BannerHero() {
  const [current, setCurrent] = useState(0);
  const [prev, setPrev]       = useState(null);
const [, setAnimDir] = useState('next');
  const timerRef = useRef(null);

  const goTo = useCallback((idx, dir = 'next') => {
    setPrev(current);
    setAnimDir(dir);
    setCurrent(idx);
  }, [current]);

  useEffect(() => {
    timerRef.current = setInterval(() => {
      setCurrent(c => {
        const next = (c + 1) % SLIDES.length;
        setPrev(c);
        setAnimDir('next');
        return next;
      });
    }, 5500);
    return () => clearInterval(timerRef.current);
  }, []);

  const slide = SLIDES[current];

  return (
    <section className="banner-hero">
      {SLIDES.map((s, i) => (
        <div key={i} className={`banner-slide ${i === current ? 'banner-slide--active' : ''} ${i === prev ? 'banner-slide--prev' : ''}`}>
          <img src={s.img} alt={s.label} className="banner-slide__img" />
          <div className="banner-slide__overlay" style={{ background: `linear-gradient(135deg, rgba(10,10,30,0.92) 0%, rgba(10,10,30,0.6) 60%, transparent 100%)` }} />
        </div>
      ))}

      <div className="banner-grid-overlay" />

      <div className="container banner-hero__content">
        <div className="banner-pill" style={{ borderColor: `${slide.accent}55` }}>
          <span className="banner-pill-dot" style={{ background: slide.accent }} />
          <span>{slide.tag}</span>
        </div>

        <h1 className="banner-title">
          {slide.title.map((line, i) => (
            <span key={i} className={`banner-title__line banner-title__line--${i}`}
              style={i === 1 ? { WebkitTextStroke: `2px ${slide.accent}`, color: 'transparent' } : {}}>
              {line}
            </span>
          ))}
        </h1>

        <p className="banner-sub">{slide.sub}</p>

        <div className="banner-btns">
          <Link to="/products" className="btn btn-red">Explore Products</Link>
          <Link to="/contact"  className="btn btn-ghost">Get a Quote →</Link>
        </div>

        <div className="banner-tags">
          {['ISRO Supplier', 'BrahMos Approved', 'Gaganyaan Programme', 'ISO Certified'].map(t => (
            <span key={t} className="banner-tag">{t}</span>
          ))}
        </div>
      </div>

      <div className="banner-dots">
        {SLIDES.map((s, i) => (
          <button key={i}
            className={`banner-dot ${i === current ? 'banner-dot--active' : ''}`}
            style={{ '--dc': SLIDES[i].accent }}
            onClick={() => goTo(i, i > current ? 'next' : 'prev')}
          >
            <span className="banner-dot__label">{s.label}</span>
            {i === current && <span className="banner-dot__progress" />}
          </button>
        ))}
      </div>

      <div className="banner-counter">
        <span className="banner-counter__cur">{String(current + 1).padStart(2, '0')}</span>
        <span className="banner-counter__sep">/</span>
        <span className="banner-counter__tot">{String(SLIDES.length).padStart(2, '0')}</span>
      </div>

      <div className="banner-wave">
        <svg viewBox="0 0 1440 80" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none">
          <path d="M0,40 C360,80 1080,0 1440,40 L1440,80 L0,80 Z" fill="#F8FAFE"/>
        </svg>
      </div>
    </section>
  );
}

// ── RING ASSEMBLY SCENE (2D Premium) — kept, no rocket animation here ──
function RingAssemblyScene() {
  const [phase, setPhase]     = useState('idle');
  const [ringPos, setRingPos] = useState({ x: 0, y: 0, scale: 1, opacity: 1, rotate: 0 });
  const [hint, setHint]       = useState('Click the ring to assemble');
  const animRef   = useRef(null);
  const phaseRef  = useRef('idle');

  const easeOutCubic = t => 1 - Math.pow(1 - t, 3);
  const easeInCubic  = t => t * t * t;

  const startAssemble = () => {
    if (phaseRef.current !== 'idle') return;
    phaseRef.current = 'flying';
    setPhase('flying');
    setHint('Assembling...');
    let start = null;
    const duration = 1200;
    const animate = ts => {
      if (!start) start = ts;
      const t = Math.min((ts - start) / duration, 1);
      const ease = easeOutCubic(t);
      setRingPos({ x: 0, y: 0, scale: 1 - ease * 0.35, opacity: 1, rotate: ease * 720, flyProgress: ease });
      if (t < 1) {
        animRef.current = requestAnimationFrame(animate);
      } else {
        phaseRef.current = 'assembled';
        setPhase('assembled');
        setHint('Assembled! Click rocket to disassemble');
      }
    };
    animRef.current = requestAnimationFrame(animate);
  };

  const startDisassemble = () => {
    if (phaseRef.current !== 'assembled') return;
    phaseRef.current = 'returning';
    setPhase('returning');
    setHint('Disassembling...');
    let start = null;
    const duration = 900;
    const animate = ts => {
      if (!start) start = ts;
      const t = Math.min((ts - start) / duration, 1);
      const ease = easeInCubic(t);
      setRingPos({ x: 0, y: 0, scale: 0.65 + ease * 0.35, opacity: 1, rotate: 720 - ease * 720, flyProgress: 1 - ease });
      if (t < 1) {
        animRef.current = requestAnimationFrame(animate);
      } else {
        phaseRef.current = 'idle';
        setPhase('idle');
        setRingPos({ x: 0, y: 0, scale: 1, opacity: 1, rotate: 0, flyProgress: 0 });
        setHint('Click the ring to assemble');
      }
    };
    animRef.current = requestAnimationFrame(animate);
  };

  useEffect(() => () => { if (animRef.current) cancelAnimationFrame(animRef.current); }, []);

  const fp          = ringPos.flyProgress || 0;
  const isAssembled = phase === 'assembled';
  const isIdle      = phase === 'idle';

  return (
    <div className="ring-scene">
      <div className="ring-scene__bg">
        {[...Array(40)].map((_, i) => (
          <div key={i} className="ring-star" style={{
            left:             `${Math.random() * 100}%`,
            top:              `${Math.random() * 100}%`,
            width:            `${1 + Math.random() * 2}px`,
            height:           `${1 + Math.random() * 2}px`,
            animationDelay:   `${Math.random() * 3}s`,
            animationDuration:`${2 + Math.random() * 3}s`,
          }} />
        ))}
      </div>

      <div className="ring-scene__inner">
        {/* Rocket */}
        <div
          className={`ring-rocket ${isAssembled ? 'ring-rocket--assembled' : ''}`}
          onClick={isAssembled ? startDisassemble : undefined}
          style={{ cursor: isAssembled ? 'pointer' : 'default' }}
        >
          <img src={rocketImg} alt="Rocket" className="ring-rocket__img" />
          <div className={`ring-chamber ${fp > 0.3 ? 'ring-chamber--active' : ''}`} />
          {isAssembled && <div className="ring-assembled-glow" />}
        </div>

        {/* Ring */}
        <div
          className={`ring-obj ${isIdle ? 'ring-obj--float' : ''} ${isAssembled ? 'ring-obj--fitted' : ''}`}
          style={{
            transform: isIdle
              ? 'translate(0, 0) scale(1) rotate(0deg)'
              : isAssembled
              ? `translate(0, 0) scale(${ringPos.scale}) rotate(${ringPos.rotate}deg)`
              : `translateX(calc(${-fp * 52}%)) scale(${ringPos.scale}) rotate(${ringPos.rotate}deg)`,
            transition: isIdle ? 'none' : undefined,
          }}
          onClick={isIdle ? startAssemble : undefined}
        >
          <img src={ringImg} alt="AE Ring Ø2250mm" className="ring-obj__img" />
          {isIdle && <div className="ring-obj__pulse" />}
        </div>
      </div>

      <div className={`ring-hint ${isAssembled ? 'ring-hint--success' : ''}`}>
        <span className="ring-hint__dot" />
        {hint}
      </div>

      <div className="ring-scene__labels">
        <div className="ring-label ring-label--rocket">
          <span>PSLV Stage Ring</span>
          <span className="ring-label__spec">Ø 2250mm · Aluminium Alloy</span>
        </div>
        <div className="ring-label ring-label--ring">
          <span>AE Ring Assembly</span>
          <span className="ring-label__spec">Click to interact</span>
        </div>
      </div>
    </div>
  );
}

export default function Home() {
  const statsRef   = useScrollReveal();
  const expRef     = useScrollReveal();
  const aboutRef   = useScrollReveal();
  const prodRef    = useScrollReveal();
  const qualityRef = useScrollReveal();
  const ctaRef     = useScrollReveal();

  return (
    <div className="home">

      {/* ══ BANNER HERO (no rocket animation here) ══ */}
      <BannerHero />

      {/* ══ STATS ══ */}
      <section className="stats-section" ref={statsRef}>
        <div className="container">
          <div className="stats-grid stagger">
            {[
              { v: 25, s: '+', l: 'Years Experience',  sub: 'Est. 2002' },
              { v: 2,  s: '',  l: 'CNC Facilities',    sub: 'Thirumudivakkam' },
              { v: 6,  s: '+', l: 'Tier-1 Clients',    sub: 'ISRO · BrahMos · L&T' },
              { v: 100, s: 'T', l: 'Max Machine Cap',  sub: 'BERTHIEZ VTL' },
            ].map((s, i) => (
              <div key={i} className="stat-card glass reveal">
                <div className="stat-card__top"/>
                <AnimatedCounter value={s.v} suffix={s.s} label={s.l} sublabel={s.sub}/>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══ EXPERTISE / EXPLORE MACHINES ══ */}
      <section className="section bg-indigo-lt" ref={expRef}>
        <div className="container">
          <div className="exp-layout">
            <div className="exp-text reveal from-left">
              <p className="eyebrow">Our Capabilities</p>
              <h2 className="section-title">Engineering<br/>Excellence &amp;<br/><span className="text-red">Accuracy</span></h2>
              <div className="line-red"/>
              <p className="section-sub">Two specialised CNC units with machines from France, Germany, Japan and Taiwan.</p>
              <Link to="/machines" className="btn btn-indigo" style={{ marginTop: '1.5rem' }}>Explore Machines →</Link>
            </div>
            <div className="exp-grid stagger">
              {EXPERTISE.map((e, i) => (
                <div key={i} className="exp-card reveal" style={{ '--ec': e.color }}>
                  <div className="exp-card__img-bg">
                    <img src={e.img} alt={e.title} />
                    <div className="exp-card__img-overlay" style={{ background: `linear-gradient(135deg, ${e.color}22, ${e.color}44)` }} />
                  </div>
                  <div className="exp-card__body">
                    <div className="exp-card__accent" style={{ background: e.color }} />
                    <h3 className="exp-card__title">{e.title}</h3>
                    <p className="exp-card__desc">{e.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ══ ABOUT ══ */}
      <section className="about-section section bg-white" ref={aboutRef}>
        <div className="container">
          <div className="about-grid">
            <div className="about-images reveal from-left">
              <div className="about-img-primary">
                <img src={aerospaceImg} alt="MILLTECH CNC aerospace work"/>
                <div className="about-img-caption">Aerospace Components · MILLTECH CNC</div>
              </div>
              <div className="about-img-secondary">
                <img src={buildingImg} alt="MILLTECH CNC facility"/>
                <div className="about-img-caption-sm">Our Facility — Thirumudivakkam</div>
              </div>
              <div className="about-logo-badge float-anim">
                <img src={logoMiltech} alt="MILLTECH CNC Logo" />
              </div>
            </div>

            <div className="about-body reveal from-right">
              <p className="eyebrow">Who We Are</p>
              <h2 className="section-title">Engineering Excellence<br/><span className="text-indigo">Since 2002</span></h2>
              <div className="line-ind"/>
              <p className="about-p">
                MILLTECH CNC is established in the year 2002 with a bold and innovative high-tech initiation of
                well-qualified MILLTECH Engineers. We started functioning from our CNC Machining Unit I
                (Ekattuthangal) and added the second Heavy Duty Machining unit at Thirumudivakkam.
                We got ISO 9001:2015 certification for our Unit I.
              </p>
              <p className="about-p" style={{color:'var(--txt-3)'}}>
                More than 25 years of experience in providing high quality heavy and critical Fabrication,
                machining, Assembly, Surface Treatment, Painting for ISRO, BrahMos, Earth moving Equipment,
                Thermal power plant High Pressure Tanks, Valve Bodies, Impellers, Defence Products, and
                high accuracy aerospace components.
              </p>

              <div className="about-vmq">
                {[
                  { icon:'🎯', heading:'Our Vision',    text:'To become a leader in products and services of Special Machining and Fabrication.', color: 'var(--indigo)' },
                  { icon:'🚀', heading:'Our Mission',   text:'Drive continuous improvement utilizing Lean Manufacturing principles and employee involvement to achieve Customer Satisfaction.', color: 'var(--red)' },
                  { icon:'✅', heading:'Quality Policy', text:'Consistently provide Products and Services that achieve Total Customer Satisfaction by continuously improving processes and Quality System.', color: 'var(--emerald)' },
                ].map((v, i) => (
                  <div key={i} className="about-vmq__item">
                    <span className="about-vmq__icon">{v.icon}</span>
                    <div>
                      <strong style={{color: v.color}}>{v.heading}</strong>
                      <p>{v.text}</p>
                    </div>
                  </div>
                ))}
              </div>

              <Link to="/about" className="btn btn-outline" style={{ marginTop: '2rem' }}>Learn More →</Link>
            </div>
          </div>
        </div>
      </section>

      {/* ══ CLIENTS MARQUEE ══ */}
      <section className="clients-section">
        <div className="container" style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
          <p className="eyebrow" style={{ justifyContent: 'center' }}>Trusted By India's Best</p>
          <h2 className="section-title" style={{ fontSize: '1.8rem' }}>Our Elite Client Portfolio</h2>
        </div>
        <div className="marquee-wrap">
          <div className="marquee-track">
            {[...CLIENTS, ...CLIENTS].map((c, i) => (
              <div key={i} className="marquee-card" style={{ '--mc': c.color }}>
                <div className="marquee-card__glow"/>
                <img src={c.logo} alt={c.abbr} className="marquee-card__logo"/>
                <span className="marquee-card__abbr">{c.abbr}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══ PRODUCTS ══ */}
      <section className="section bg-indigo-lt" ref={prodRef}>
        <div className="container">
          <div className="prod-header">
            <div>
              <p className="eyebrow">What We Make</p>
              <h2 className="section-title">Featured <span className="text-red">Products</span></h2>
            </div>
            <Link to="/products" className="btn btn-outline">View All →</Link>
          </div>
          <div className="prod-grid stagger">
            {products.slice(0, 6).map((p) => (
              <div key={p.id} className="reveal">
                <ProductCard product={p}/>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══ QUALITY ══ */}
      <section className="quality-section" ref={qualityRef}>
        <div className="quality-bg"/>
        <div className="container">
          <div className="quality-inner reveal">
            <div className="quality-text">
              <p className="eyebrow" style={{ color: 'rgba(255,255,255,0.8)' }}>Our Commitment</p>
              <h2 className="quality-title">Quality is not an act,<br/><em className="quality-em">it is a habit.</em></h2>
              <div style={{ width: '56px', height: '3px', background: 'rgba(255,255,255,0.4)', borderRadius: '2px', margin: '1rem 0 1.5rem' }}/>
              <p className="quality-p">
                We maintain ISO 9001:2015 certified Quality Management with complete dimensional traceability,
                customer sign-off protocols, and zero-tolerance for defects on every aerospace component we manufacture.
              </p>
            </div>
            <div className="quality-badge float-anim">
              <div className="quality-badge__ring rotate-slow">
                <svg viewBox="0 0 160 160">
                  <circle cx="80" cy="80" r="74" stroke="rgba(255,255,255,0.3)" strokeWidth="1.5" fill="none" strokeDasharray="6 4"/>
                </svg>
              </div>
              <div className="quality-badge__body">
                <strong>ISO</strong><span>9001:2015</span><span>CERTIFIED</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ══ RING ASSEMBLY ══ */}
      <section className="section bg-indigo-lt">
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
            <p className="eyebrow" style={{ justifyContent: 'center' }}>Interactive Demo</p>
            <h2 className="section-title">Ring Component Assembly</h2>
            <p style={{ color: 'var(--txt-3)', fontSize: '0.95rem' }}>
              Click the ring to see how MILLTECH CNC components integrate into ISRO launch vehicles.
            </p>
          </div>
          <RingAssemblyScene />
        </div>
      </section>

      {/* ══ REVIEWS ══ */}
      <section className="section bg-white">
        <div className="container">
          <p className="eyebrow" style={{ justifyContent: 'center' }}>Client Testimonials</p>
          <h2 className="section-title" style={{ textAlign: 'center', marginBottom: '3rem' }}>What Our Clients Say</h2>
          <ReviewSlider reviews={reviews}/>
        </div>
      </section>

      {/* ══ CTA ══ */}
      <section className="cta-section" ref={ctaRef}>
        <div className="cta-bg"/>
        <div className="container cta-inner reveal">
          <div>
            <h2 className="cta-title">Ready to Work Together?</h2>
            <p className="cta-sub">Send us your drawings — we respond within 24 hours.</p>
          </div>
          <div className="cta-btns">
            <Link to="/contact"  className="btn btn-white">Request a Quote</Link>
            <Link to="/products" className="btn btn-outline" style={{ borderColor: 'rgba(255,255,255,0.4)', color: '#fff' }}>
              Browse Products →
            </Link>
          </div>
        </div>
      </section>

    </div>
  );
}