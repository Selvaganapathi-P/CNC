import React from 'react';
import buildingImg from '../../assets/building.jpg';
import aerospaceImg from '../../assets/aerospace.jpg';
import { Link } from 'react-router-dom';
import useScrollReveal from '../../hooks/useScrollReveal';
import logoBrahmos from '../../assets/miltech logo/BrahMos_Aerospace.svg.png';
import logoFLSmidth from '../../assets/miltech logo/FLSmidth.png';
import logoIGCAR from '../../assets/miltech logo/Indira_Gandhi_Centre_for_Atomic_Research_Logo.png';
import logoLT from '../../assets/miltech logo/L&T (DEFENCE, ECC, Rubber Processing Machinery), Chennai..png';
import logoLPSC from '../../assets/miltech logo/Liquid_Propulsion_Systems_Centre_Logo.png';
import logoVSSC from '../../assets/miltech logo/VIKRAM SARABHAI SPACE RESEARCH CENTRE, Thiruvananthapuram. logo.png';
import logoMiltech from '../../assets/logoo_mtc-removebg-preview.png';
import './AboutUs.css';

const TIMELINE = [
  { year: '2002', title: 'Company Founded', desc: 'MILLTECH CNC established in the year 2002 with a bold and innovative high-tech initiation of well-qualified MILLTECH Engineers.' },
  { year: '2004', title: 'Unit 1 — Ekattuthangal', desc: 'CNC Machining Unit I fully operational at Ekattuthangal, Chennai with VMC and VTL machines.' },
  { year: '2010', title: 'ISRO Partnership', desc: 'First critical aerospace components delivered to ISRO. Beginning of a long-standing trust relationship.' },
  { year: '2015', title: 'ISO 9001:2015 Certified', desc: 'Unit I achieves ISO 9001:2015 certification — confirming our quality management system excellence.' },
  { year: '2018', title: 'Unit 2 — Thirumudivakkam', desc: 'Heavy Duty Machining Unit 2 commissioned with BERTHIEZ 8.2m VTL and KOLB 12.5m Gantry machine.' },
  { year: '2023', title: 'Gaganyaan Programme', desc: 'CEOS Adaptor Assembly manufactured for VSSC\'s Gaganyaan — India\'s first human spaceflight mission.' },
];

const CLIENTS = [
  { name: 'ISRO – VSSC',       full: 'Vikram Sarabhai Space Research Centre, Thiruvananthapuram', logo: logoVSSC,    color: '#F59E0B' },
  { name: 'LPSC – ISRO',       full: 'Liquid Propulsion System Centre, ISRO',                      logo: logoLPSC,    color: '#7C3AED' },
  { name: 'BrahMos Aerospace',  full: 'BrahMos Aerospace Thiruvananthapuram Limited',               logo: logoBrahmos, color: '#4F46E5' },
  { name: 'IGCAR',              full: 'Indira Gandhi Centre for Atomic Research, Kalpakkam',        logo: logoIGCAR,   color: '#10B981' },
  { name: 'L&T',                full: 'L&T (Defence, ECC, Rubber Processing Machinery), Chennai',   logo: logoLT,      color: '#E8192C' },
  { name: 'FLSmidth',           full: 'FLSmidth, Chennai',                                          logo: logoFLSmidth,color: '#0EA5E9' },
];

const AboutUs = () => {
  const timelineRef = useScrollReveal();
  const whoRef      = useScrollReveal();
  const clientsRef  = useScrollReveal();

  return (
    <main className="about-page">

      {/* ── PAGE HEADER ── */}
      <section className="about-page-header">
        <div className="about-page-header__bg"/>
        <div className="container about-page-header__content">
          <p className="section-eyebrow" style={{color:'rgba(255,255,255,0.55)'}}>Our Story</p>
          <h1 className="about-page-header__title">About <span>MILLTECH</span></h1>
          <p className="about-page-header__sub">Two decades of precision. One passion — Engineering excellence.</p>
          <div className="about-page-header__stats">
            <div className="about-hero-stat"><span className="about-hero-stat__num">25+</span><span className="about-hero-stat__lbl">Years</span></div>
            <div className="about-hero-stat__div"/>
            <div className="about-hero-stat"><span className="about-hero-stat__num">2</span><span className="about-hero-stat__lbl">Units</span></div>
            <div className="about-hero-stat__div"/>
            <div className="about-hero-stat"><span className="about-hero-stat__num">6+</span><span className="about-hero-stat__lbl">Clients</span></div>
          </div>
        </div>
      </section>

      {/* ── WHO WE ARE ── */}
      <section className="section about-who" ref={whoRef}>
        <div className="container about-who__grid">
          <div className="about-who__img reveal">
            <img src={buildingImg} alt="CNC manufacturing facility" />
            <div className="about-who__img-badge">
              <span>ISO 9001:2015</span>
              <span>Certified</span>
            </div>
          </div>
          <div className="about-who__text">
            <p className="section-eyebrow reveal from-right">Who We Are</p>
            <h2 className="section-title reveal from-right delay-1">A Legacy of<br/><span style={{color:'var(--red)'}}>Precision Engineering</span></h2>
            <div className="red-line reveal from-right delay-2" />
            <p className="about-who__body reveal from-right delay-3">
              MILLTECH CNC is established in the year 2002 with a bold and innovative high-tech initiation of well-qualified MILLTECH Engineers. We started functioning from our CNC Machining Unit I (Ekattuthangal) and added the second Heavy Duty Machining unit at Thirumudivakkam. We got ISO 9001:2015 certification for our Unit I.
            </p>
            <p className="about-who__body reveal from-right delay-4">
              We have more than 25 years of experience in providing high quality heavy and critical Fabrication, machining, Assembly, Surface Treatment, Painting of many engineering goods for different applications — ISRO, BrahMos, Earth moving Equipment, Thermal power plant High Pressure Tanks, Machining of Heavy-forging alloys, Valve Bodies, Impellers, Defence Products, and high precision aerospace components to giant Corporate Companies both Private and Government.
            </p>

            {/* Vision / Mission / Quality */}
            <div className="about-vmq reveal from-right delay-5">
              <div className="about-vmq__card">
                <div className="about-vmq__icon-wrap" style={{background:'rgba(79,70,229,0.1)',borderColor:'rgba(79,70,229,0.2)'}}>🎯</div>
                <div>
                  <strong style={{color:'var(--indigo)'}}>Our Vision</strong>
                  <p>To become a leader in products and services of Special Machining and Fabrication.</p>
                </div>
              </div>
              <div className="about-vmq__card">
                <div className="about-vmq__icon-wrap" style={{background:'rgba(232,25,44,0.08)',borderColor:'rgba(232,25,44,0.15)'}}>🚀</div>
                <div>
                  <strong style={{color:'var(--red)'}}>Our Mission</strong>
                  <p>Drive continuous improvement utilizing Lean Manufacturing principles and employee involvement to achieve Customer Satisfaction.</p>
                </div>
              </div>
              <div className="about-vmq__card">
                <div className="about-vmq__icon-wrap" style={{background:'rgba(16,185,129,0.08)',borderColor:'rgba(16,185,129,0.2)'}}>✅</div>
                <div>
                  <strong style={{color:'var(--emerald)'}}>Quality Policy</strong>
                  <p>Consistently provide Products and Services of Fabrication and Machining that achieve Total Customer Satisfaction by continuously improving processes and Quality System.</p>
                </div>
              </div>
            </div>

            <div className="about-who__tags reveal from-right" style={{marginTop:'1.5rem'}}>
              {['Aluminium Alloy','Stainless Steel','Mild Steel','High-Alloy Steel','Aerospace Grade'].map(t => (
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
              <div key={i} className={`timeline-item reveal ${i % 2 === 0 ? 'from-left' : 'from-right'} delay-${Math.min(i+1,6)}`}>
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

      {/* ── LOCATIONS ── */}
      <section className="section location-section">
        <div className="container">
          <div style={{textAlign:'center',marginBottom:'3rem'}}>
            <p className="section-eyebrow" style={{justifyContent:'center'}}>Find Us</p>
            <h2 className="section-title">Our Locations</h2>
          </div>
          <div className="location-grid">
            <div className="location-card reveal from-left">
              <div className="location-card__num">Unit 1</div>
              <h3 className="location-card__title">MKB Industrial Estate</h3>
              <p className="location-card__addr">Plot No. 28, Arul Murugan Nagar,<br/>MKB Industrial Estate,<br/>Thirumudivakkam,<br/>Chennai – 600132</p>
              <a
                href="https://maps.google.com/?q=Arul+Murugan+Nagar+MKB+Industrial+Estate+Thirumudivakkam+Chennai+600132"
                target="_blank"
                rel="noopener noreferrer"
                className="location-card__link"
              >
                View on Map →
              </a>
            </div>
            <div className="location-card reveal from-right">
              <div className="location-card__num">Unit 2</div>
              <h3 className="location-card__title">14th Main Road</h3>
              <p className="location-card__addr">X3GM+R6P, 14th Main Road,<br/>Thirumudivakkam,<br/>Tamil Nadu – 600132</p>
              <a
                href="https://maps.google.com/?q=X3GM%2BR6P+14th+Main+Rd+Thirumudivakkam+Tamil+Nadu+600132"
                target="_blank"
                rel="noopener noreferrer"
                className="location-card__link"
              >
                View on Map →
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ── ISO BADGE ── */}
      <section className="iso-section">
        <div className="container iso-content">
          <div className="iso-badge-large">
            <div className="iso-badge-large__ring">
              <svg viewBox="0 0 200 200">
                <circle cx="100" cy="100" r="90" fill="none" stroke="var(--red)" strokeWidth="2" strokeDasharray="6 4"/>
                <circle cx="100" cy="100" r="75" fill="none" stroke="rgba(192,22,28,0.3)" strokeWidth="1"/>
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
            <div className="red-line"/>
            <p style={{color:'var(--txt-3)',lineHeight:1.8}}>
              Our Unit I holds ISO 9001:2015 certification — a testament to our consistent quality management system. Every component we produce is traceable, documented, and inspected to the highest standards before delivery.
            </p>
          </div>
        </div>
      </section>

      {/* ── CLIENTS GRID WITH LOGOS ── */}
      <section className="section clients-logo-section" ref={clientsRef}>
        <div className="container">
          <div className="section-header reveal" style={{textAlign:'center',marginBottom:'3rem'}}>
            <p className="section-eyebrow" style={{justifyContent:'center'}}>Trusted By</p>
            <h2 className="section-title">Our Valued Customers</h2>
          </div>
          <div className="clients-logo-grid stagger-children">
            {CLIENTS.map((c, i) => (
              <div key={c.name} className={`client-logo-card reveal delay-${i+1}`} style={{'--clc': c.color}}>
                <div className="client-logo-card__glow"/>
                <div className="client-logo-card__img-wrap">
                  <img src={c.logo} alt={c.name} className="client-logo-card__img"/>
                </div>
                <h3 className="client-logo-card__name">{c.name}</h3>
                <p className="client-logo-card__full">{c.full}</p>
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