import React from 'react';
import { Link } from 'react-router-dom';
import useScrollReveal from '../../hooks/useScrollReveal';
import './AboutUs.css';

const TIMELINE = [
  { year: '2002', title: 'Company Founded', desc: 'MILLTECH CNC established by qualified engineers with a bold, high-tech vision for precision machining.' },
  { year: '2004', title: 'Unit 1 — Ekattuthangal', desc: 'CNC Machining Unit 1 fully operational at Ekattuthangal, Chennai with VMC and VTL machines.' },
  { year: '2010', title: 'ISRO Partnership', desc: 'First critical aerospace components delivered to ISRO. Beginning of a long-standing relationship.' },
  { year: '2015', title: 'ISO 9001:2015 Certified', desc: 'Unit 1 achieves ISO 9001:2015 certification — confirming our quality management system.' },
  { year: '2018', title: 'Unit 2 — Thirumudivakkam', desc: 'Heavy Duty Machining Unit 2 commissioned with BERTHIEZ 8.2m VTL and KOLB 12.5m Gantry machine.' },
  { year: '2023', title: 'Gaganyaan Programme', desc: 'CEOS Adaptor Assembly manufactured for VSSC\'s Gaganyaan — India\'s first human spaceflight mission.' },
];

const CLIENTS = [
  { name: 'ISRO – VSSC', full: 'Vikram Sarabhai Space Research Centre, Thiruvananthapuram', icon: '🚀' },
  { name: 'LPSC – ISRO', full: 'Liquid Propulsion System Centre, ISRO', icon: '⚙️' },
  { name: 'BrahMos Aerospace', full: 'BrahMos Aerospace Thiruvananthapuram Limited', icon: '🛡️' },
  { name: 'IGCAR', full: 'Indira Gandhi Centre for Atomic Research, Kalpakkam', icon: '⚛️' },
  { name: 'L&T', full: 'L&T (Defence, ECC, Rubber Processing Machinery), Chennai', icon: '🏗️' },
  { name: 'FLSmidth', full: 'FLSmidth, Chennai', icon: '🏭' },
];

const AboutUs = () => {
  const timelineRef = useScrollReveal();
  const whoRef = useScrollReveal();
  const clientsRef = useScrollReveal();

  return (
    <main className="about-page">
      {/* ── PAGE HERO ── */}
      <section className="page-hero">
        <div className="page-hero__bg" />
        <div className="container page-hero__content">
          <p className="section-eyebrow" style={{color:'rgba(255,255,255,0.5)'}}>Our Story</p>
          <h1 className="page-hero__title display-title">About Us</h1>
          <p className="page-hero__subtitle">
            Two decades of precision. One passion — Engineering excellence.
          </p>
        </div>
      </section>

      {/* ── WHO WE ARE ── */}
      <section className="section about-who" ref={whoRef}>
        <div className="container about-who__grid">
          <div className="about-who__img reveal">
            <img
              src="https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?w=800&q=80"
              alt="CNC manufacturing facility"
              onError={e=>{e.target.src='https://images.unsplash.com/photo-1581092160607-ee22621dd758?w=800&q=80'}}
            />
          </div>
          <div className="about-who__text">
            <p className="section-eyebrow reveal from-right">Who We Are</p>
            <h2 className="section-title reveal from-right delay-1">A Legacy of<br/><span style={{color:'var(--red)'}}>Precision Engineering</span></h2>
            <div className="red-line reveal from-right delay-2" />
            <p className="about-who__body reveal from-right delay-3">
              MILLTECH CNC is established in the year 2002 with a bold and innovative high-tech initiation of well-qualified MILLTECH Engineers. We started functioning from our CNC Machining Unit I (Ekattuthangal) and added the second Heavy Duty Machining unit at Thirumudivakkam.
            </p>
            <p className="about-who__body reveal from-right delay-4">
              We have more than 25 years of experience in providing high quality heavy and critical Fabrication, machining, Assembly, Surface Treatment, Painting of many engineering goods for different applications — ISRO, BrahMos, Earth moving Equipment, Thermal power plant High Pressure Tanks, Machining of Heavy-forging alloys, Valve Bodies, Impellers, Defence Products, and high precision aerospace components.
            </p>
            <div className="about-who__tags reveal from-right delay-5">
              {['Aluminium Alloy', 'Stainless Steel', 'Mild Steel', 'High-Alloy Steel', 'Aerospace Grade Materials'].map(t => (
                <span key={t} className="about-who__tag">{t}</span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── TIMELINE ── */}
      <section className="section timeline-section" ref={timelineRef}>
        <div className="container">
          <div className="section-header reveal" style={{textAlign:'center',marginBottom:'4rem'}}>
            <p className="section-eyebrow" style={{justifyContent:'center'}}>Our Journey</p>
            <h2 className="section-title">Milestones</h2>
          </div>
          <div className="timeline">
            {TIMELINE.map((item, i) => (
              <div key={i} className={`timeline-item reveal ${i % 2 === 0 ? 'from-left' : 'from-right'} delay-${Math.min(i+1, 6)}`}>
                <div className="timeline-item__marker">
                  <div className="timeline-item__dot" />
                  <div className="timeline-item__line" />
                </div>
                <div className="timeline-item__card">
                  <span className="timeline-item__year">{item.year}</span>
                  <h3 className="timeline-item__title">{item.title}</h3>
                  <p className="timeline-item__desc">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── ISO BADGE ── */}
      <section className="iso-section">
        <div className="container iso-content">
          <div className="iso-badge-large">
            <div className="iso-badge-large__ring">
              <svg viewBox="0 0 200 200">
                <circle cx="100" cy="100" r="90" fill="none" stroke="var(--red)" strokeWidth="2" strokeDasharray="6 4" />
                <circle cx="100" cy="100" r="75" fill="none" stroke="rgba(192,22,28,0.3)" strokeWidth="1" />
              </svg>
              <div className="iso-badge-large__inner">
                <span className="iso-badge-large__label">ISO</span>
                <span className="iso-badge-large__num">9001</span>
                <span className="iso-badge-large__year">2015</span>
                <span className="iso-badge-large__cert">CERTIFIED</span>
              </div>
            </div>
          </div>
          <div className="iso-text">
            <p className="section-eyebrow">Quality Assurance</p>
            <h2 className="section-title">ISO 9001:2015<br/>Certified Organisation</h2>
            <div className="red-line" />
            <p style={{color:'var(--txt-3)',lineHeight:1.8}}>
              Our Unit 1 at Thirumudivakkam holds ISO 9001:2015 certification — a testament to our consistent quality management system. Every component we produce is traceable, documented, and inspected to the highest standards before delivery.
            </p>
          </div>
        </div>
      </section>

      {/* ── CLIENTS GRID ── */}
      <section className="section clients-section" ref={clientsRef}>
        <div className="container">
          <div className="section-header reveal" style={{textAlign:'center',marginBottom:'3rem'}}>
            <p className="section-eyebrow" style={{justifyContent:'center'}}>Trusted By</p>
            <h2 className="section-title">Our Valued Customers</h2>
          </div>
          <div className="clients-grid stagger-children">
            {CLIENTS.map((c, i) => (
              <div key={c.name} className={`client-card reveal delay-${i+1}`}>
                <div className="client-card__icon">{c.icon}</div>
                <h3 className="client-card__name">{c.name}</h3>
                <p className="client-card__full">{c.full}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="cta-strip">
        <div className="container cta-strip__inner">
          <div>
            <h2 className="cta-strip__heading">Ready to work with us?</h2>
            <p className="cta-strip__sub">Get in touch for quotes and technical discussions.</p>
          </div>
          <Link to="/contact" className="btn btn-outline cta-strip__btn">Contact Us →</Link>
        </div>
      </section>
    </main>
  );
};

export default AboutUs;