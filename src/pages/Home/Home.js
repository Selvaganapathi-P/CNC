import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import AnimatedCounter from '../../components/AnimatedCounter/AnimatedCounter';
import ReviewSlider from '../../components/ReviewSlider/ReviewSlider';
import ProductCard from '../../components/ProductCard/ProductCard';
import useScrollReveal from '../../hooks/useScrollReveal';
import { products } from '../../data/products';
import { reviews } from '../../data/reviews';
import './Home.css';

const CLIENTS = [
  { abbr:'ISRO',     full:'Indian Space Research Organisation', color:'#F59E0B' },
  { abbr:'BrahMos',  full:'BrahMos Aerospace',                 color:'#4F46E5' },
  { abbr:'L&T',      full:'Larsen & Toubro Defence',           color:'#E8192C' },
  { abbr:'IGCAR',    full:'Indira Gandhi Centre for Atomic Research', color:'#10B981' },
  { abbr:'FLSmidth', full:'FLSmidth, Chennai',                 color:'#0EA5E9' },
  { abbr:'LPSC',     full:'Liquid Propulsion Systems Centre',  color:'#7C3AED' },
];

const EXPERTISE = [
  { icon:'⚙️', title:'CNC Precision Machining',  desc:'0.02mm tolerances on aerospace-grade alloys', color:'#4F46E5' },
  { icon:'🏗️', title:'Heavy Fabrication',         desc:'Up to 100T on our BERTHIEZ 8.2m VTL',        color:'#E8192C' },
  { icon:'🔬', title:'Precision Inspection',      desc:'TESA, Pi-tape, tubular micrometers to 5000mm', color:'#10B981' },
  { icon:'🚀', title:'Aerospace Certified',        desc:'ISRO-approved, Gaganyaan & PSLV components',  color:'#F59E0B' },
  { icon:'🎯', title:'MasterCAM Programming',     desc:'In-house 4/5-axis CNC programming expertise',  color:'#7C3AED' },
  { icon:'🏆', title:'ISO 9001:2015',              desc:'Certified quality management, full traceability', color:'#EA580C' },
];


// Animated rocket orbiting Earth
function HeroRocketAnim() {
  return (
    <div className="hero-anim">
      <svg viewBox="0 0 500 500" xmlns="http://www.w3.org/2000/svg" className="hero-anim__svg">
        <defs>
          <radialGradient id="earthGrad" cx="50%" cy="40%" r="55%">
            <stop offset="0%" stopColor="#4FC3F7"/>
            <stop offset="40%" stopColor="#1565C0"/>
            <stop offset="100%" stopColor="#0D47A1"/>
          </radialGradient>
          <radialGradient id="earthGlow" cx="50%" cy="50%" r="50%">
            <stop offset="70%" stopColor="transparent"/>
            <stop offset="100%" stopColor="rgba(79,195,247,0.3)"/>
          </radialGradient>
          <radialGradient id="spaceGrad" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#1a1a3e"/>
            <stop offset="100%" stopColor="#000010"/>
          </radialGradient>
          <linearGradient id="rocketBody" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#E8E8F0"/>
            <stop offset="100%" stopColor="#9090B0"/>
          </linearGradient>
          <linearGradient id="flameGrad" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#FF6B35"/>
            <stop offset="50%" stopColor="#FFB800"/>
            <stop offset="100%" stopColor="transparent"/>
          </linearGradient>
          <filter id="glow">
            <feGaussianBlur stdDeviation="3" result="blur"/>
            <feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge>
          </filter>
          <filter id="earthBlur">
            <feGaussianBlur stdDeviation="1.5"/>
          </filter>
          <clipPath id="earthClip">
            <circle cx="250" cy="340" r="180"/>
          </clipPath>
        </defs>

        {/* Space background */}
        <circle cx="250" cy="250" r="250" fill="url(#spaceGrad)"/>

        {/* Stars */}
        {[
          [50,80],[120,40],[200,70],[320,30],[400,90],[460,50],[30,150],[480,180],
          [70,220],[430,260],[100,300],[480,320],[40,380],[460,400],[150,430],[380,450],
          [300,120],[60,120],[420,140],[180,160]
        ].map(([x,y],i) => (
          <circle key={i} cx={x} cy={y} r={i%3===0?1.5:1} fill="white"
            opacity={0.4+Math.random()*0.4}
            style={{animation:`pulse ${1.5+i*0.3}s ease-in-out infinite alternate`}}
          />
        ))}

        {/* Earth (partially visible at bottom) */}
        <circle cx="250" cy="420" r="200" fill="url(#earthGrad)"/>
        {/* Cloud layer */}
        <ellipse cx="200" cy="350" rx="60" ry="20" fill="rgba(255,255,255,0.3)" transform="rotate(-20,200,350)"/>
        <ellipse cx="300" cy="380" rx="50" ry="15" fill="rgba(255,255,255,0.25)" transform="rotate(10,300,380)"/>
        <ellipse cx="160" cy="400" rx="40" ry="12" fill="rgba(255,255,255,0.2)"/>
        <ellipse cx="330" cy="360" rx="35" ry="10" fill="rgba(255,255,255,0.2)" transform="rotate(-15,330,360)"/>
        {/* Earth atmosphere glow */}
        <circle cx="250" cy="420" r="205" fill="none" stroke="rgba(100,200,255,0.4)" strokeWidth="8" filter="url(#earthBlur)"/>
        <circle cx="250" cy="420" r="210" fill="none" stroke="rgba(100,200,255,0.15)" strokeWidth="15" filter="url(#earthBlur)"/>

        {/* Orbit path (ellipse) */}
        <ellipse cx="250" cy="260" rx="160" ry="60"
          fill="none" stroke="rgba(255,255,255,0.1)" strokeWidth="1" strokeDasharray="6 4"/>

        {/* Rocket orbiting (animated along path) */}
        <g className="hero-anim__rocket">
          {/* Flame */}
          <ellipse cx="0" cy="32" rx="7" ry="18" fill="url(#flameGrad)" className="hero-anim__flame" filter="url(#glow)"/>
          <ellipse cx="0" cy="28" rx="4" ry="10" fill="#FFD700" opacity="0.9" className="hero-anim__flame2"/>
          {/* Rocket nozzle */}
          <path d="M-8,22 L8,22 L6,30 L-6,30 Z" fill="#888"/>
          {/* Rocket body */}
          <rect x="-10" y="-18" width="20" height="40" rx="4" fill="url(#rocketBody)"/>
          {/* Red stripe */}
          <rect x="-10" y="4" width="20" height="6" fill="#E8192C"/>
          {/* Window */}
          <circle cx="0" cy="-4" r="5" fill="#4FC3F7" stroke="#fff" strokeWidth="1"/>
          <circle cx="0" cy="-4" r="3" fill="#1565C0"/>
          {/* Nose cone */}
          <path d="M-10,-18 L0,-38 L10,-18 Z" fill="#E8192C"/>
          {/* Fins */}
          <path d="M-10,14 L-18,28 L-10,22 Z" fill="#C8102E"/>
          <path d="M10,14 L18,28 L10,22 Z" fill="#C8102E"/>
          {/* Solar panels */}
          <rect x="-26" y="-8" width="16" height="10" rx="2" fill="#1565C0" stroke="#4FC3F7" strokeWidth="0.5"/>
          <rect x="10" y="-8" width="16" height="10" rx="2" fill="#1565C0" stroke="#4FC3F7" strokeWidth="0.5"/>
          <line x1="-18" y1="-3" x2="-10" y2="-3" stroke="#4FC3F7" strokeWidth="0.5"/>
          <line x1="10" y1="-3" x2="18" y2="-3" stroke="#4FC3F7" strokeWidth="0.5"/>
        </g>

        {/* Orbit indicator dot */}
        <circle className="hero-anim__dot" cx="0" cy="0" r="3" fill="#FFB800" filter="url(#glow)"/>
      </svg>
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
  const [heroIn, setHeroIn] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setHeroIn(true), 80);
    return () => clearTimeout(t);
  }, []);

  return (
    <div className="home">

      {/* ══ HERO ══ */}
      <section className="hero">
        <div className="hero__gradient-bg"/>
        <div className="hero__shape hero__shape--1"/>
        <div className="hero__shape hero__shape--2"/>
        <div className="hero__shape hero__shape--3"/>

        <div className="container hero__inner">
          <div className={`hero__left ${heroIn?'in':''}`}>
            <div className="hero__pill">
              <span className="hero__pill-dot"/>
              ISO 9001:2015 · Est. 2002 · Chennai, India
            </div>
            <h1 className="hero__title">
              <span className="hero__title-l1">Precision</span>
              <span className="hero__title-l2">Engineering</span>
              <span className="hero__title-l3">for Space</span>
            </h1>
            <p className="hero__sub">
              Manufacturer of <strong>heavy engineering components</strong> trusted by
              ISRO, BrahMos &amp; L&T. Two state-of-the-art CNC facilities in Chennai.
            </p>
            <div className="hero__btns">
              <Link to="/products" className="btn btn-red">Explore Products</Link>
              <Link to="/contact" className="btn btn-white">Get a Quote →</Link>
            </div>
            <div className="hero__tags">
              {['ISRO Supplier','BrahMos Approved','Gaganyaan Programme','ISO Certified'].map(t=>(
                <span key={t} className="hero__tag">{t}</span>
              ))}
            </div>
          </div>

          <div className={`hero__right ${heroIn?'in':''}`}>
            <div className="hero__anim-wrap">
              <HeroRocketAnim />
            </div>
            <div className="hero__img-badge">
              <span className="hero__badge-num">25+</span>
              <span className="hero__badge-txt">Years</span>
            </div>
            <div className="hero__img-stat">
              <span className="hero__stat-val">8.2m</span>
              <span className="hero__stat-lbl">Max VTL Swing</span>
            </div>
          </div>
        </div>

        <div className="hero__wave">
          <svg viewBox="0 0 1440 80" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none">
            <path d="M0,40 C360,80 1080,0 1440,40 L1440,80 L0,80 Z" fill="#F8FAFE"/>
          </svg>
        </div>
      </section>

      {/* ══ STATS ══ */}
      <section className="stats-section" ref={statsRef}>
        <div className="container">
          <div className="stats-grid stagger">
            {[
              {v:25, s:'+', l:'Years Experience',  sub:'Since 2002'},
              {v:2,  s:'',  l:'CNC Facilities',    sub:'Chennai'},
              {v:6,  s:'+', l:'Tier-1 Clients',    sub:'ISRO, BrahMos, L&T...'},
              {v:100,s:'T', l:'Max Machine Cap',   sub:'BERTHIEZ VTL'},
            ].map((s,i)=>(
              <div key={i} className="stat-card glass reveal">
                <div className="stat-card__top"/>
                <AnimatedCounter value={s.v} suffix={s.s} label={s.l} sublabel={s.sub}/>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══ EXPERTISE ══ */}
      <section className="section bg-indigo-lt" ref={expRef}>
        <div className="container">
          <div className="exp-layout">
            <div className="exp-text reveal from-left">
              <p className="eyebrow">Our Capabilities</p>
              <h2 className="section-title">Engineering<br/>Excellence &amp;<br/><span className="text-red">Precision</span></h2>
              <div className="line-red"/>
              <p className="section-sub">Two specialised CNC units with machines from France, Germany, Japan and Taiwan.</p>
              <Link to="/machines" className="btn btn-indigo" style={{marginTop:'1.5rem'}}>Explore Machines →</Link>
            </div>
            <div className="exp-grid stagger">
              {EXPERTISE.map((e,i)=>(
                <div key={i} className="exp-card glass reveal" style={{'--ec':e.color}}>
                  <div className="exp-card__glow"/>
                  <span className="exp-card__icon">{e.icon}</span>
                  <h3 className="exp-card__title">{e.title}</h3>
                  <p className="exp-card__desc">{e.desc}</p>
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
                <img
                  src="https://upload.wikimedia.org/wikipedia/commons/thumb/3/3e/PSLV-C40-_One_of_the_strap-ons_being_assembled_with_core_stage.jpg/800px-PSLV-C40-_One_of_the_strap-ons_being_assembled_with_core_stage.jpg"
                  alt="ISRO PSLV assembly"
                  onError={e=>{e.target.src='https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?w=800&q=80'}}
                />
                <div className="about-img-caption">ISRO PSLV Assembly · Components by MILLTECH CNC</div>
              </div>
              <div className="about-img-secondary">
                <img
                  src="https://images.unsplash.com/photo-1581092160607-ee22621dd758?w=600&q=80"
                  alt="CNC precision machining"
                />
                <div className="about-img-caption-sm">CNC Precision Machining</div>
              </div>
              <div className="about-iso float-anim">
                <div className="about-iso__ring rotate-slow">
                  <svg viewBox="0 0 80 80"><defs><linearGradient id="ig" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stopColor="#4F46E5"/><stop offset="100%" stopColor="#E8192C"/></linearGradient></defs><circle cx="40" cy="40" r="37" stroke="url(#ig)" strokeWidth="1.5" fill="none" strokeDasharray="5 3"/></svg>
                </div>
                <div className="about-iso__body">
                  <strong>ISO</strong><span>9001</span><span>:2015</span>
                </div>
              </div>
            </div>

            <div className="about-body reveal from-right">
              <p className="eyebrow">Who We Are</p>
              <h2 className="section-title">Engineering Precision<br/><span className="text-indigo">Since 2002</span></h2>
              <div className="line-ind"/>
              <p className="about-p">MILLTECH CNC was established in 2002 by well-qualified engineers. Starting from CNC Machining Unit I at Ekattuthangal, we expanded to a Heavy Duty unit at Thirumudivakkam — equipped with some of the largest CNC machines in South India.</p>
              <p className="about-p text-muted">25+ years of experience in Fabrication, Machining, Assembly, Surface Treatment, and Painting for ISRO, BrahMos, L&T, IGCAR &amp; FLSmidth.</p>
              <div className="about-highlights">
                {['BERTHIEZ VTL — 8.2m swing, 100T capacity','KOLB Gantry — 12.5m span','MasterCAM 26 in-house CNC programming','ISO 9001:2015 certified, full traceability'].map(h=>(
                  <div key={h} className="about-hl">
                    <span className="about-hl__dot"/>
                    <span>{h}</span>
                  </div>
                ))}
              </div>
              <Link to="/about" className="btn btn-outline" style={{marginTop:'2rem'}}>Learn More →</Link>
            </div>
          </div>
        </div>
      </section>

      {/* ══ CLIENTS MARQUEE ══ */}
      <section className="clients-section">
        <div className="container" style={{textAlign:'center',marginBottom:'2rem'}}>
          <p className="eyebrow" style={{justifyContent:'center'}}>Trusted By India's Best</p>
          <h2 className="section-title" style={{fontSize:'1.6rem'}}>Our Elite Client Portfolio</h2>
        </div>
        <div className="marquee-wrap">
          <div className="marquee-track">
            {[...CLIENTS,...CLIENTS].map((c,i)=>(
              <div key={i} className="marquee-card" style={{'--mc':c.color}}>
                <div className="marquee-card__glow"/>
                <span className="marquee-card__abbr">{c.abbr}</span>
                <span className="marquee-card__full">{c.full}</span>
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
            {products.slice(0,6).map((p,i)=>(
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
              <p className="eyebrow" style={{color:'rgba(255,255,255,0.8)'}}>Our Commitment</p>
              <h2 className="quality-title">Quality is not an act,<br/><em className="quality-em">it is a habit.</em></h2>
              <div style={{width:'56px',height:'3px',background:'rgba(255,255,255,0.4)',borderRadius:'2px',margin:'1rem 0 1.5rem'}}/>
              <p className="quality-p">We maintain ISO 9001:2015 certified Quality Management with complete dimensional traceability, customer sign-off protocols, and zero-tolerance for defects on every aerospace component we manufacture.</p>
            </div>
            <div className="quality-badge float-anim">
              <div className="quality-badge__ring rotate-slow">
                <svg viewBox="0 0 160 160"><circle cx="80" cy="80" r="74" stroke="rgba(255,255,255,0.3)" strokeWidth="1.5" fill="none" strokeDasharray="6 4"/></svg>
              </div>
              <div className="quality-badge__body">
                <strong>ISO</strong><span>9001:2015</span><span>CERTIFIED</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ══ REVIEWS ══ */}
      <section className="section bg-white">
        <div className="container">
          <p className="eyebrow" style={{justifyContent:'center'}}>Client Testimonials</p>
          <h2 className="section-title" style={{textAlign:'center',marginBottom:'3rem'}}>What Our Clients Say</h2>
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
            <Link to="/contact" className="btn btn-white">Request a Quote</Link>
            <Link to="/products" className="btn btn-outline" style={{borderColor:'rgba(255,255,255,0.4)',color:'#fff'}}>Browse Products →</Link>
          </div>
        </div>
      </section>

    </div>
  );
}