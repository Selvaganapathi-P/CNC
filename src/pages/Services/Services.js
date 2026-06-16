import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import './Services.css';

const services = [
  {
    id: 'aerospace',
    num: '01',
    title: 'Aerospace & Defence',
    subtitle: 'Precision for Space & Missiles',
    icon: '🚀',
    description: 'High-tolerance CNC machining of mission-critical structural components for ISRO launch vehicles, BrahMos missile systems, and India\'s crewed Gaganyaan programme.',
    highlights: ['ISRO PSLV & GSLV rings', 'BrahMos missile sub-assemblies', 'Gaganyaan crew module adaptor', '0.02mm dimensional accuracy'],
    active: true,
    link: '/services/aerospace',
    accent: '#00C8E0',
  },
  {
    id: 'windmill',
    num: '02',
    title: 'Windmill Components',
    subtitle: 'Renewable Energy Fabrication',
    icon: '🌬️',
    description: 'Precision fabrication of windmill structural components including tanks, cooling unit pipe lines, trolleys, and pallet systems.',
    highlights: ['Cooling unit pipe lines', 'Structural tanks & frames', 'Trolley & pallet systems', 'Heavy alloy fabrication'],
    active: false,
    accent: '#10B981',
  },
  {
    id: 'cement',
    num: '03',
    title: 'Cement Machinery',
    subtitle: 'Heavy Industrial Machining',
    icon: '⚙️',
    description: 'Robust machining for cement plant equipment — impellers, valve bodies, pressure vessels, and heavy forging alloy components.',
    highlights: ['Impeller & valve machining', 'Heavy forging alloys', 'Thermal plant vessels', 'Earth-moving parts'],
    active: false,
    accent: '#F59E0B',
  },
];

export default function Services() {
  useEffect(() => {
    window.scrollTo(0, 0);
    const els = document.querySelectorAll('.svc-reveal');
    const obs = new IntersectionObserver(
      entries => entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible'); }),
      { threshold: 0.05 }
    );
    els.forEach(el => obs.observe(el));
    return () => obs.disconnect();
  }, []);

  return (
    <div className="services-page">

      {/* ── AEROSPACE HERO BANNER (WING STAR inspired) ── */}
      <section className="svc-hero">
        <div className="svc-hero__stars">
          {[...Array(80)].map((_, i) => (
            <div key={i} className="svc-hero__star" style={{ '--i': i }}/>
          ))}
        </div>
        <div className="svc-hero__orb svc-hero__orb--1"/>
        <div className="svc-hero__orb svc-hero__orb--2"/>
        <div className="svc-hero__grid"/>

        {/* Earth curve at bottom */}
        <div className="svc-hero__earth">
          <div className="svc-hero__earth-glow"/>
        </div>

        <div className="container svc-hero__content">
          <div className="svc-hero__tag">
            <span className="svc-hero__tag-dot"/>
            Mission-Critical Manufacturing · Est. 2002
          </div>
          <h1 className="svc-hero__title">
            Engineering<br/>
            <span className="svc-hero__title-accent">Services</span>
          </h1>
          <p className="svc-hero__sub">
            From aerospace precision to heavy industrial fabrication —<br/>
            three verticals, zero compromise.
          </p>
          <div className="svc-hero__clients">
            {['ISRO', 'BrahMos', 'L&T', 'IGCAR', 'FLSmidth'].map(c => (
              <span key={c} className="svc-hero__client-pill">{c}</span>
            ))}
          </div>
        </div>

        {/* Animated rocket silhouette */}
        <div className="svc-hero__rocket">
          <svg viewBox="0 0 120 280" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M60 10 L80 60 L80 220 L60 240 L40 220 L40 60 Z" fill="rgba(255,255,255,0.04)" stroke="rgba(255,255,255,0.15)" strokeWidth="1.5"/>
            <path d="M60 10 L80 60 L40 60 Z" fill="rgba(200,16,46,0.3)" stroke="rgba(200,16,46,0.5)" strokeWidth="1"/>
            <ellipse cx="60" cy="140" rx="20" ry="6" fill="none" stroke="rgba(0,200,224,0.4)" strokeWidth="2"/>
            <ellipse cx="60" cy="180" rx="20" ry="6" fill="none" stroke="rgba(212,175,55,0.4)" strokeWidth="1.5"/>
            <path d="M40 210 L20 250 L40 240 Z" fill="rgba(200,16,46,0.2)" stroke="rgba(200,16,46,0.4)" strokeWidth="1"/>
            <path d="M80 210 L100 250 L80 240 Z" fill="rgba(200,16,46,0.2)" stroke="rgba(200,16,46,0.4)" strokeWidth="1"/>
            <rect x="48" y="220" width="24" height="30" rx="2" fill="rgba(37,99,235,0.15)" stroke="rgba(37,99,235,0.3)" strokeWidth="1"/>
            <ellipse cx="60" cy="262" rx="16" ry="8" fill="rgba(200,16,46,0.08)" stroke="#C8102E" strokeWidth="1.5"/>
            {/* Engine glow */}
            <ellipse cx="60" cy="270" rx="12" ry="6" fill="rgba(255,150,50,0.25)" filter="url(#rglow)"/>
            <defs><filter id="rglow"><feGaussianBlur stdDeviation="4" result="blur"/><feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge></filter></defs>
          </svg>
        </div>

        <div className="svc-hero__cut"/>
      </section>

      {/* ── SERVICE CARDS ── */}
      <section className="svc-cards-section">
        <div className="container">
          <div className="svc-cards-grid">
            {services.map((svc) => (
              <div
                key={svc.id}
                className={`svc-card svc-reveal ${svc.active ? 'svc-card--active' : 'svc-card--soon'}`}
                style={{ '--svc-accent': svc.accent }}
              >
                <div className="svc-card__num">{svc.num}</div>
                {!svc.active && <span className="svc-card__badge">Coming Soon</span>}
                <div className="svc-card__icon">{svc.icon}</div>
                <h2 className="svc-card__title">{svc.title}</h2>
                <p className="svc-card__subtitle">{svc.subtitle}</p>
                <p className="svc-card__desc">{svc.description}</p>
                <ul className="svc-card__list">
                  {svc.highlights.map(h => (
                    <li key={h}>
                      <span className="svc-card__dot"/>
                      {h}
                    </li>
                  ))}
                </ul>
                {svc.active ? (
                  <Link to={svc.link} className="svc-card__btn svc-card__btn--active">
                    Explore →
                  </Link>
                ) : (
                  <button className="svc-card__btn svc-card__btn--disabled" disabled>Coming Soon</button>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="svc-cta">
        <div className="container svc-cta__inner svc-reveal">
          <div>
            <h2 className="svc-cta__title">Need a Custom Engineering Solution?</h2>
            <p className="svc-cta__sub">Our team reviews your drawings and responds within 24 hours.</p>
          </div>
          <Link to="/contact" className="btn btn-primary">Get In Touch</Link>
        </div>
      </section>
    </div>
  );
}