import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import rocketImg from '../../../assets/rocket-removebg-preview.png';
import ringImg    from '../../../assets/ring.png';
import aeRingImg from '../../../assets/AE RING Ø 2250MM.jpg';
import canisterImg from '../../../assets/CANISTER Ø 2250MM.jpg';
import tBulkRingImg from '../../../assets/T BULK RING Ø 2840MM (ALU).jpg';
import aftShieldImg from '../../../assets/AFT SHEILD ASSY  FIX.jpg';
import csatImg      from '../../../assets/CSAT ASSY FIX 4.2 METER.jpg';
import k4Img        from '../../../assets/K-4.jpg';
import nadirImg     from '../../../assets/NADIR ASSY FIX 4.4 METER.jpg';
import vsscImg      from '../../../assets/VSSC-GAGANYAAN.jpg';
import './Aerospace.css';

const aerospaceProducts = [
  { id: 1, name: 'Fore End Ring', spec: 'Ø 2840 mm (ALU)', client: 'ISRO', img: tBulkRingImg,
    desc: 'CNC-machined aluminium ring forming the fore-end structural boundary of PSLV launch vehicles.' },
  { id: 2, name: 'AFT Shield Assembly', spec: 'Fixed Configuration', client: 'ISRO', img: aftShieldImg,
    desc: 'Aft-end protective shield assembly with complex interlocking structural geometry.' },
  { id: 3, name: 'AE Ring', spec: 'Ø 2250 mm', client: 'ISRO', img: aeRingImg,
    desc: 'Aft equipment bay ring machined to micron tolerances for satellite integration.' },
  { id: 4, name: 'T Bulk Ring', spec: 'Ø 2840 mm (ALU)', client: 'ISRO', img: tBulkRingImg,
    desc: 'Thrust bulkhead ring — load-bearing interface between propellant stage and payload bay.' },
  { id: 5, name: 'Canister Ø 2250', spec: 'Ø 2250 mm', client: 'ISRO / VSSC', img: canisterImg,
    desc: 'Cylindrical canister for avionics and telemetry systems aboard ISRO launch vehicles.' },
  { id: 6, name: 'Canister Ø 2500', spec: 'Ø 2500 mm HT-2250', client: 'ISRO / VSSC', img: canisterImg,
    desc: 'Larger canister with extended height for GSLV payload accommodation.' },
  { id: 7, name: 'CEOS Adaptor', spec: 'Gaganyaan Programme', client: 'VSSC', img: vsscImg,
    desc: "Crew module adaptor for India's crewed spaceflight mission — manufactured & painted by MILLTECH CNC." },
  { id: 8, name: 'NADIR Assembly', spec: '4.4 Metre Span', client: 'ISRO', img: nadirImg,
    desc: 'Large nadir-pointing instrument mounting fixture for satellite integration.' },
  { id: 9, name: 'CSAT Assembly', spec: '4.2 Metre Span', client: 'ISRO', img: csatImg,
    desc: 'Communication satellite assembly fixture spanning 4.2m for final integration.' },
  { id: 10, name: 'K-4 Component', spec: 'Defence Programme', client: 'BrahMos / DRDO', img: k4Img,
    desc: 'Mission-critical stacked component for ballistic missile systems.' },
];

const stats = [
  { value: '25+',   label: 'Years in Aerospace' },
  { value: '0.02mm', label: 'Tolerance Accuracy' },
  { value: '100T',  label: 'Max Load Capacity' },
  { value: '8.2m',  label: 'Max Swing Diameter' },
];

// ── ROCKET RING ASSEMBLY SCENE ──
// Landscape rocket with ring (isometric look), ring clicks and slides into cylinder
function RocketAssemblyScene() {
  const [phase, setPhase]       = useState('idle');   // idle | flying | assembled | returning
  const [ringAnim, setRingAnim] = useState({ x: 0, scale: 1, rotate: 0, progress: 0 });
  const [hint, setHint]         = useState('Click the ring → it will fit into the rocket cylinder');
  const animRef = useRef(null);
  const phaseRef = useRef('idle');

  const easeOut  = t => 1 - Math.pow(1 - t, 3);
  const easeIn   = t => t * t * t;

  const startAssemble = () => {
    if (phaseRef.current !== 'idle') return;
    phaseRef.current = 'flying';
    setPhase('flying');
    setHint('Ring integrating into cylinder...');
    let start = null;
    const dur = 1100;

    const animate = ts => {
      if (!start) start = ts;
      const t    = Math.min((ts - start) / dur, 1);
      const ease = easeOut(t);
      // Ring slides LEFT (negative x) to fit into rocket cylinder mid-section
      setRingAnim({
        x:        ease * -1,          // CSS will translate via progress
        scale:    1 - ease * 0.32,    // ring shrinks as it fits into cylinder
        rotate:   ease * 540,         // 1.5 rotations
        progress: ease,
      });
      if (t < 1) {
        animRef.current = requestAnimationFrame(animate);
      } else {
        phaseRef.current = 'assembled';
        setPhase('assembled');
        setHint('✓ Assembled! Click the rocket to disassemble');
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
    const dur = 800;

    const animate = ts => {
      if (!start) start = ts;
      const t    = Math.min((ts - start) / dur, 1);
      const ease = easeIn(t);
      setRingAnim({
        x:        1 - ease,
        scale:    0.68 + ease * 0.32,
        rotate:   540 - ease * 540,
        progress: 1 - ease,
      });
      if (t < 1) {
        animRef.current = requestAnimationFrame(animate);
      } else {
        phaseRef.current = 'idle';
        setPhase('idle');
        setRingAnim({ x: 0, scale: 1, rotate: 0, progress: 0 });
        setHint('Click the ring → it will fit into the rocket cylinder');
      }
    };
    animRef.current = requestAnimationFrame(animate);
  };

  useEffect(() => () => { if (animRef.current) cancelAnimationFrame(animRef.current); }, []);

  const fp          = ringAnim.progress || 0;
  const isAssembled = phase === 'assembled';
  const isIdle      = phase === 'idle';

  // Ring translation: moves from right side toward rocket cylinder center
  // In landscape: rocket on left, ring on right
  // ring moves left by fp * 54% (toward cylinder area of rocket)
  const ringTranslateX = `calc(${-fp * 54}%)`;

  return (
    <div className="ras">
      {/* Stars bg */}
      <div className="ras__bg">
        {[...Array(60)].map((_, i) => (
          <div key={i} className="ras__star" style={{
            left:             `${(i * 137.5) % 100}%`,
            top:              `${(i * 89.3) % 100}%`,
            width:            `${0.8 + (i % 4) * 0.5}px`,
            height:           `${0.8 + (i % 4) * 0.5}px`,
            animationDelay:   `${(i * 0.31) % 3}s`,
            animationDuration:`${2 + (i % 5) * 0.6}s`,
          }} />
        ))}
      </div>

      {/* Earth glow at bottom */}
      <div className="ras__earth" />

      {/* Scene inner */}
      <div className="ras__inner">

        {/* ROCKET — landscape (horizontal) on LEFT */}
        <div
          className={`ras__rocket ${isAssembled ? 'ras__rocket--glow' : ''}`}
          onClick={isAssembled ? startDisassemble : undefined}
          style={{ cursor: isAssembled ? 'pointer' : 'default' }}
        >
          {/* Landscape rocket image */}
          <img
            src={rocketImg}
            alt="Rocket"
            className="ras__rocket-img"
            style={{
              transform: `rotate(-90deg)`,   // portrait rocket → rotate to landscape
            }}
          />
          {/* Cylinder slot indicator */}
          <div className={`ras__cylinder-slot ${fp > 0.2 ? 'ras__cylinder-slot--active' : ''}`}>
            {fp > 0.2 && fp < 0.95 && (
              <div className="ras__cylinder-progress" style={{ width: `${fp * 100}%` }} />
            )}
          </div>
          {/* Assembled glow ring on rocket */}
          {isAssembled && <div className="ras__fit-glow" />}
        </div>

        {/* RING — on RIGHT, moves toward rocket */}
        <div
          className={`ras__ring ${isIdle ? 'ras__ring--float' : ''} ${isAssembled ? 'ras__ring--fitted' : ''}`}
          style={{
            transform: `translateX(${ringTranslateX}) scale(${ringAnim.scale}) rotate(${ringAnim.rotate}deg)`,
            transition: isIdle ? 'none' : undefined,
          }}
          onClick={isIdle ? startAssemble : undefined}
        >
          <img src={ringImg} alt="AE Ring Ø2250mm" className="ras__ring-img" />
          {/* Isometric shine overlay */}
          <div className="ras__ring-shine" />
          {isIdle && <div className="ras__ring-pulse" />}
        </div>

      </div>

      {/* Hint bar */}
      <div className={`ras__hint ${isAssembled ? 'ras__hint--done' : ''}`}>
        <span className="ras__hint-dot" />
        {hint}
      </div>

      {/* Labels */}
      <div className="ras__labels">
        <div className="ras__label">
          <span>ISRO PSLV Rocket</span>
          <span className="ras__label-spec">Landscape · Interactive</span>
        </div>
        <div className="ras__label ras__label--right">
          <span>AE Ring Ø 2250mm</span>
          <span className="ras__label-spec">Click to assemble</span>
        </div>
      </div>
    </div>
  );
}

// ── PRODUCT SCROLL CARDS ──
// Cards scroll up on viewport entry — cascade from bottom
function AeroProductCard({ product, index }) {
  const ref    = useRef(null);
  const [vis, setVis] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setVis(true); obs.disconnect(); } },
      { threshold: 0.08 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  const isEven = index % 2 === 0;

  return (
    <div
      ref={ref}
      className={`apcard ${vis ? 'apcard--visible' : ''} ${isEven ? 'apcard--even' : 'apcard--odd'}`}
      style={{ transitionDelay: `${(index % 4) * 0.09}s` }}
    >
      {/* LEFT: image */}
      <div className="apcard__img-col">
        <div className="apcard__img-wrap">
          <img
            src={product.img}
            alt={product.name}
            className="apcard__img"
            onError={e => { e.target.style.display = 'none'; }}
          />
          <div className="apcard__img-overlay" />
          <span className="apcard__client-badge">{product.client}</span>
        </div>
      </div>

      {/* RIGHT: details */}
      <div className="apcard__info">
        <div className="apcard__num">{String(product.id).padStart(2, '0')}</div>
        <h3 className="apcard__name">{product.name}</h3>
        <span className="apcard__spec">{product.spec}</span>
        <p className="apcard__desc">{product.desc}</p>
        <Link to={`/products/${product.id}`} className="apcard__btn btn btn-indigo">
          View Component →
        </Link>
      </div>
    </div>
  );
}

export default function Aerospace() {
  useEffect(() => {
    window.scrollTo(0, 0);
    const els = document.querySelectorAll('.aero-reveal');
    const obs = new IntersectionObserver(
      entries => entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible'); }),
      { threshold: 0.05 }
    );
    els.forEach(el => obs.observe(el));
    return () => obs.disconnect();
  }, []);

  return (
    <div className="aerospace-page">

      {/* ── HERO ── */}
      <section className="aero-hero">
        <div className="aero-hero__bg" />
        <div className="container aero-hero__content">
          <div className="aero-hero__text aero-reveal">
            <span className="aero-hero__tag">Aerospace &amp; Defence Division</span>
            <h1 className="aero-hero__title">
              Machined for the<br/>
              <span className="aero-hero__accent">Final Frontier</span>
            </h1>
            <p className="aero-hero__sub">
              MILLTECH CNC manufactures mission-critical structural components for
              ISRO, BrahMos, and India's Gaganyaan crewed spaceflight mission.
            </p>
            <div className="aero-hero__clients">
              {['ISRO', 'BrahMos', 'VSSC', 'Gaganyaan', 'IGCAR'].map(c => (
                <span key={c} className="aero-client-chip">{c}</span>
              ))}
            </div>
          </div>
        </div>
        <div className="aero-hero__wave">
          <svg viewBox="0 0 1440 80" preserveAspectRatio="none">
            <path d="M0,40 C360,80 1080,0 1440,40 L1440,80 L0,80 Z" fill="#F8FAFF" />
          </svg>
        </div>
      </section>

      {/* ── STATS ── */}
      <section className="aero-stats-section">
        <div className="container">
          <div className="aero-stats-grid aero-reveal">
            {stats.map(s => (
              <div key={s.label} className="aero-stat-card">
                <span className="aero-stat-value">{s.value}</span>
                <span className="aero-stat-label">{s.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── ABOUT ── */}
      <section className="aero-about section">
        <div className="container">
          <div className="aero-about__grid">
            <div className="aero-reveal">
              <p className="eyebrow">Who We Work For</p>
              <h2 className="section-title">
                Building Components<br/><span style={{ color: 'var(--red)' }}>That Leave Earth</span>
              </h2>
              <div className="line-red" />
              <p className="aero-about__p">
                Since 2002, MILLTECH CNC has been at the forefront of aerospace component manufacturing in India.
                Our Unit 2 facility houses a BERTHIEZ 8.2m CNC VTL — one of the largest in South Asia — enabling us
                to machine structures most shops cannot handle.
              </p>
              <p className="aero-about__p">
                We work directly with ISRO's VSSC and LPSC supplying rings, canisters, and assembly fixtures for PSLV
                and GSLV. Our Gaganyaan crew module adaptor is a milestone in Indian aerospace manufacturing.
              </p>
              <Link to="/contact" className="btn btn-indigo" style={{ marginTop: '1.5rem' }}>
                Request a Quote →
              </Link>
            </div>
            <div className="aero-caps-grid aero-reveal">
              {[
                { icon: '⚙️', title: 'CNC Vertical Turning',  desc: 'BERTHIEZ 8.2m VTL with 100-ton capacity and 0.02mm accuracy' },
                { icon: '📐', title: 'MasterCAM 26',          desc: 'In-house 4/5-axis CNC programming for complex toolpaths' },
                { icon: '⚗️', title: 'Material Expertise',    desc: 'Aluminium alloys, SS304/316, and high-strength mild steel' },
                { icon: '🔬', title: 'Dimensional Inspection', desc: 'TESA Uni-master, Pi Tapes, tubular micrometers to 5000mm' },
              ].map((c, i) => (
                <div key={i} className="aero-cap-card">
                  <span className="aero-cap-icon">{c.icon}</span>
                  <h3 className="aero-cap-title">{c.title}</h3>
                  <p className="aero-cap-desc">{c.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── RING ROCKET ASSEMBLY ANIMATION ── */}
      <section className="aero-3d-section section">
        <div className="container">
          <div className="aero-reveal" style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
            <p className="eyebrow" style={{ justifyContent: 'center' }}>Interactive Demo</p>
            <h2 className="section-title">Ring Component Assembly</h2>
            <p style={{ color: 'var(--txt-3)', fontSize: '0.95rem', maxWidth: '500px', margin: '0 auto' }}>
              Watch how MILLTECH CNC rings integrate into ISRO launch vehicles.
              Click the ring to assemble, click the rocket to reset.
            </p>
          </div>
          <RocketAssemblyScene />
        </div>
      </section>

      {/* ── PRODUCTS — Scroll flow cards with images ── */}
      <section className="aero-products section">
        <div className="container">
          <div className="aero-reveal" style={{ textAlign: 'center', marginBottom: '3.5rem' }}>
            <p className="eyebrow" style={{ justifyContent: 'center' }}>What We've Manufactured</p>
            <h2 className="section-title">Components for Space</h2>
          </div>
          <div className="aero-prod-flow">
            {aerospaceProducts.map((p, i) => (
              <AeroProductCard key={p.id} product={p} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="aero-cta">
        <div className="aero-cta__bg" />
        <div className="container aero-cta__inner aero-reveal">
          <div>
            <h2 className="aero-cta__title">Ready to Manufacture Your Aerospace Component?</h2>
            <p className="aero-cta__sub">Send us your drawings. Our engineering team responds within 24 hours.</p>
          </div>
          <div className="aero-cta__btns">
            <Link to="/contact" className="btn btn-red">Request a Quote</Link>
            <Link to="/products" className="btn btn-outline" style={{ borderColor: 'rgba(255,255,255,0.4)', color: '#fff' }}>
              View All Products →
            </Link>
          </div>
        </div>
      </section>

    </div>
  );
}