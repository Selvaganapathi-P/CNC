import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import './Aerospace.css';

const aerospaceProducts = [
  { id:1, name:'Fore End Ring', spec:'Ø 2840 mm (ALU)', client:'ISRO', desc:'Precision aluminium ring forming the fore-end structural boundary of PSLV launch vehicles.' },
  { id:2, name:'AFT Shield Assembly', spec:'Fixed Configuration', client:'ISRO', desc:'Aft-end protective shield assembly with complex interlocking structural geometry.' },
  { id:3, name:'AE Ring', spec:'Ø 2250 mm', client:'ISRO', desc:'Aft equipment bay ring machined to micron tolerances for satellite integration.' },
  { id:4, name:'T Bulk Ring', spec:'Ø 2840 mm (ALU)', client:'ISRO', desc:'Thrust bulkhead ring — load-bearing interface between propellant stage and payload bay.' },
  { id:5, name:'Canister Ø 2250', spec:'Ø 2250 mm', client:'ISRO / VSSC', desc:'Cylindrical canister for avionics and telemetry systems aboard ISRO launch vehicles.' },
  { id:6, name:'Canister Ø 2500', spec:'Ø 2500 mm HT-2250', client:'ISRO / VSSC', desc:'Larger canister with extended height for GSLV payload accommodation.' },
  { id:7, name:'CEOS Adaptor', spec:'Gaganyaan Programme', client:'VSSC', desc:"Crew module adaptor for India's crewed spaceflight mission — manufactured & painted by MILLTECH CNC." },
  { id:8, name:'NADIR Assembly', spec:'4.4 Metre Span', client:'ISRO', desc:'Large nadir-pointing instrument mounting fixture for satellite integration.' },
  { id:9, name:'CSAT Assembly', spec:'4.2 Metre Span', client:'ISRO', desc:'Communication satellite assembly fixture spanning 4.2m for final integration.' },
  { id:10, name:'K-4 Component', spec:'Defence Programme', client:'BrahMos / DRDO', desc:'Mission-critical stacked component for ballistic missile systems.' },
];

const stats = [
  { value:'25+', label:'Years in Aerospace' },
  { value:'0.02mm', label:'Tolerance Accuracy' },
  { value:'100T', label:'Max Load Capacity' },
  { value:'8.2m', label:'Max Swing Diameter' },
];

// ── RING ASSEMBLY ANIMATION ──
function RingRocketAnimation() {
  const canvasRef = useRef(null);
  const stateRef = useRef({
    phase: 'idle', // idle | disassembling | ringMoving | assembling | done
    t: 0,
    ringX: 120, ringY: 250,
    ringTargetX: 0, ringTargetY: 0,
    parts: [],
    rocketAngle: 0,
  });
  const animRef = useRef(null);
  const [phase, setPhase] = useState('idle');
  const [hint, setHint] = useState('Click the ring to begin assembly');

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const W = canvas.width = canvas.offsetWidth * window.devicePixelRatio;
    const H = canvas.height = canvas.offsetHeight * window.devicePixelRatio;
    canvas.style.width = canvas.offsetWidth + 'px';
    canvas.style.height = canvas.offsetHeight + 'px';
    ctx.scale(window.devicePixelRatio, window.devicePixelRatio);
    const w = canvas.offsetWidth, h = canvas.offsetHeight;

    // Rocket center
    const rx = w * 0.72, ry = h * 0.45;
    stateRef.current.ringX = w * 0.15;
    stateRef.current.ringY = h * 0.42;
    stateRef.current.ringTargetX = rx;
    stateRef.current.ringTargetY = ry + 30;

    // Init parts (rocket sections that scatter)
    stateRef.current.parts = [
      { name:'nose', ox:0, oy:-80, sx:0, sy:-180, progress:0 },
      { name:'body', ox:0, oy:0, sx:60, sy:30, progress:0 },
      { name:'fin-l', ox:-30, oy:50, sx:-100, sy:100, progress:0 },
      { name:'fin-r', ox:30, oy:50, sx:100, sy:100, progress:0 },
      { name:'nozzle', ox:0, oy:70, sx:0, sy:160, progress:0 },
      { name:'panel-l', ox:-50, oy:-10, sx:-130, sy:-60, progress:0 },
      { name:'panel-r', ox:50, oy:-10, sx:130, sy:-60, progress:0 },
    ];

    function easeInOut(t) { return t < 0.5 ? 2*t*t : -1+(4-2*t)*t; }
    function easeOut(t) { return 1 - Math.pow(1-t, 3); }

    function drawStars() {
      ctx.fillStyle = '#fff';
      for (let i = 0; i < 80; i++) {
        const sx = ((i * 137.5) % w);
        const sy = ((i * 89.3) % h);
        const size = i % 5 === 0 ? 1.5 : 0.8;
        const alpha = 0.2 + (i % 7) * 0.1;
        ctx.globalAlpha = alpha;
        ctx.beginPath();
        ctx.arc(sx, sy, size, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.globalAlpha = 1;
    }

    function drawEarth() {
      const grad = ctx.createRadialGradient(w*0.5, h+h*0.3, 0, w*0.5, h+h*0.3, h*0.7);
      grad.addColorStop(0, '#4FC3F7');
      grad.addColorStop(0.4, '#1565C0');
      grad.addColorStop(1, '#0D47A1');
      ctx.beginPath();
      ctx.arc(w*0.5, h + h*0.3, h*0.7, 0, Math.PI*2);
      ctx.fillStyle = grad;
      ctx.fill();
      // atmosphere
      ctx.beginPath();
      ctx.arc(w*0.5, h + h*0.3, h*0.72, 0, Math.PI*2);
      ctx.strokeStyle = 'rgba(100,200,255,0.35)';
      ctx.lineWidth = 8;
      ctx.stroke();
    }

    function drawRing(x, y, alpha=1, scale=1) {
      ctx.save();
      ctx.translate(x, y);
      ctx.scale(scale, scale);
      ctx.globalAlpha = alpha;
      // Outer glow
      const g = ctx.createRadialGradient(0,0,20, 0,0,55);
      g.addColorStop(0, 'rgba(79,70,229,0)');
      g.addColorStop(1, 'rgba(79,70,229,0.3)');
      ctx.fillStyle = g;
      ctx.beginPath(); ctx.arc(0,0,55,0,Math.PI*2); ctx.fill();
      // Ring body
      ctx.beginPath();
      ctx.arc(0,0,42,0,Math.PI*2);
      ctx.arc(0,0,28,0,Math.PI*2,true);
      const ringGrad = ctx.createLinearGradient(-42,-42,42,42);
      ringGrad.addColorStop(0,'#818CF8');
      ringGrad.addColorStop(0.5,'#4F46E5');
      ringGrad.addColorStop(1,'#3730A3');
      ctx.fillStyle = ringGrad;
      ctx.fill();
      // Bolt holes
      for (let i=0; i<12; i++) {
        const a = (i/12)*Math.PI*2;
        ctx.beginPath();
        ctx.arc(35*Math.cos(a), 35*Math.sin(a), 3, 0, Math.PI*2);
        ctx.fillStyle = '#FFD700';
        ctx.fill();
      }
      // Label
      ctx.font = 'bold 9px Oswald, sans-serif';
      ctx.fillStyle = 'rgba(255,255,255,0.8)';
      ctx.textAlign = 'center';
      ctx.fillText('Ø 2840mm', 0, 3);
      ctx.restore();
    }

    function drawRocketPart(name, x, y, alpha=1) {
      ctx.save();
      ctx.translate(x, y);
      ctx.globalAlpha = alpha;
      if (name === 'nose') {
        ctx.beginPath();
        ctx.moveTo(0, -40); ctx.lineTo(-18, 0); ctx.lineTo(18, 0); ctx.closePath();
        const g = ctx.createLinearGradient(-18,0,18,0);
        g.addColorStop(0,'#E8192C'); g.addColorStop(1,'#FF6B35');
        ctx.fillStyle = g; ctx.fill();
      } else if (name === 'body') {
        ctx.beginPath();
        ctx.roundRect(-18, -50, 36, 100, 4);
        const g = ctx.createLinearGradient(-18,0,18,0);
        g.addColorStop(0,'#CBD5E1'); g.addColorStop(0.5,'#F1F5F9'); g.addColorStop(1,'#94A3B8');
        ctx.fillStyle = g; ctx.fill();
        // stripes
        ctx.fillStyle = '#1D4ED8';
        ctx.fillRect(-18, -15, 36, 8);
        ctx.fillStyle = '#E8192C';
        ctx.fillRect(-18, 5, 36, 5);
        // window
        ctx.beginPath(); ctx.arc(0,-28,7,0,Math.PI*2);
        ctx.fillStyle='#38BDF8'; ctx.fill();
        ctx.beginPath(); ctx.arc(0,-28,5,0,Math.PI*2);
        ctx.fillStyle='#0284C7'; ctx.fill();
      } else if (name === 'fin-l') {
        ctx.beginPath();
        ctx.moveTo(0,0); ctx.lineTo(-22,30); ctx.lineTo(0,20); ctx.closePath();
        ctx.fillStyle='#C8102E'; ctx.fill();
      } else if (name === 'fin-r') {
        ctx.beginPath();
        ctx.moveTo(0,0); ctx.lineTo(22,30); ctx.lineTo(0,20); ctx.closePath();
        ctx.fillStyle='#C8102E'; ctx.fill();
      } else if (name === 'nozzle') {
        ctx.beginPath();
        ctx.moveTo(-14,0); ctx.lineTo(-18,20); ctx.lineTo(18,20); ctx.lineTo(14,0); ctx.closePath();
        const g = ctx.createLinearGradient(0,0,0,20);
        g.addColorStop(0,'#78716C'); g.addColorStop(1,'#44403C');
        ctx.fillStyle=g; ctx.fill();
        // flame
        ctx.beginPath();
        ctx.moveTo(-10,18); ctx.quadraticCurveTo(0,50,10,18);
        const fg = ctx.createLinearGradient(0,18,0,50);
        fg.addColorStop(0,'#FF6B35'); fg.addColorStop(0.5,'#FFD700'); fg.addColorStop(1,'transparent');
        ctx.fillStyle=fg; ctx.fill();
      } else if (name === 'panel-l') {
        ctx.fillStyle='#1D4ED8';
        ctx.beginPath(); ctx.roundRect(-28,-5,24,12,2); ctx.fill();
        ctx.strokeStyle='#60A5FA'; ctx.lineWidth=0.5; ctx.stroke();
        for(let j=0;j<3;j++){
          ctx.beginPath(); ctx.moveTo(-24+j*7,-5); ctx.lineTo(-24+j*7,7);
          ctx.strokeStyle='rgba(96,165,250,0.4)'; ctx.stroke();
        }
      } else if (name === 'panel-r') {
        ctx.fillStyle='#1D4ED8';
        ctx.beginPath(); ctx.roundRect(4,-5,24,12,2); ctx.fill();
        ctx.strokeStyle='#60A5FA'; ctx.lineWidth=0.5; ctx.stroke();
        for(let j=0;j<3;j++){
          ctx.beginPath(); ctx.moveTo(8+j*7,-5); ctx.lineTo(8+j*7,7);
          ctx.strokeStyle='rgba(96,165,250,0.4)'; ctx.stroke();
        }
      }
      ctx.restore();
    }

    function drawRocket(cx, cy, assembled=true, parts=[], ringProgress=0) {
      if (assembled) {
        // Draw complete rocket
        drawRocketPart('panel-l', cx-40, cy-10);
        drawRocketPart('panel-r', cx+16, cy-10);
        drawRocketPart('nozzle', cx, cy+70);
        drawRocketPart('fin-l', cx-18, cy+50);
        drawRocketPart('fin-r', cx+18, cy+50);
        drawRocketPart('body', cx, cy);
        // Ring slot indicator
        if (ringProgress > 0 && ringProgress < 1) {
          ctx.save();
          ctx.translate(cx, cy+30);
          ctx.globalAlpha = ringProgress * 0.5;
          ctx.beginPath();
          ctx.arc(0,0,30,0,Math.PI*2);
          ctx.strokeStyle='#818CF8';
          ctx.lineWidth=2;
          ctx.setLineDash([4,4]);
          ctx.stroke();
          ctx.restore();
        }
        // Ring assembled
        if (ringProgress >= 0.95) {
          drawRing(cx, cy+30, 1, 0.7);
        }
        drawRocketPart('nose', cx, cy-50);
      } else {
        // Scattered parts
        parts.forEach(p => {
          const e = easeOut(p.progress);
          const px = cx + p.ox + (p.sx - p.ox) * e;
          const py = cy + p.oy + (p.sy - p.oy) * e;
          const alpha = 0.3 + (1-e)*0.7;
          drawRocketPart(p.name, px, py, alpha);
        });
      }
    }

    let prevTime = null;
    function loop(time) {
      if (!prevTime) prevTime = time;
      const dt = Math.min((time - prevTime) / 1000, 0.05);
      prevTime = time;
      const S = stateRef.current;

      ctx.clearRect(0,0,w,h);

      // Background
      const bgGrad = ctx.createLinearGradient(0,0,w,h);
      bgGrad.addColorStop(0,'#0F1729');
      bgGrad.addColorStop(1,'#1a0533');
      ctx.fillStyle = bgGrad;
      ctx.fillRect(0,0,w,h);

      drawStars();
      drawEarth();

      if (S.phase === 'idle') {
        drawRocket(rx, ry);
        // Ring floats gently
        S.ringY = h*0.42 + Math.sin(time/1000)*8;
        drawRing(S.ringX, S.ringY);
        // Pulse hint
        ctx.font = '11px monospace';
        ctx.fillStyle = 'rgba(255,255,255,0.6)';
        ctx.textAlign = 'center';
        ctx.fillText('← RING COMPONENT', S.ringX + 55, S.ringY + 65);
        ctx.fillText('ISRO PSLV ROCKET →', rx - 20, ry + 130);

      } else if (S.phase === 'disassembling') {
        S.t = Math.min(S.t + dt * 0.8, 1);
        S.parts.forEach(p => { p.progress = Math.min(p.progress + dt * 0.9, 1); });
        drawRocket(rx, ry, false, S.parts);
        drawRing(S.ringX, S.ringY);
        if (S.t >= 1) {
          S.phase = 'ringMoving';
          S.t = 0;
          setPhase('ringMoving');
          setHint('Ring integrating into rocket structure...');
        }

      } else if (S.phase === 'ringMoving') {
        S.t = Math.min(S.t + dt * 0.6, 1);
        const e = easeInOut(S.t);
        const cx2 = S.ringX + (S.ringTargetX - S.ringX) * e;
        const cy2 = S.ringY + (S.ringTargetY - S.ringY) * e;
        drawRocket(rx, ry, false, S.parts.map(p => ({...p, progress: 1})));
        drawRing(cx2, cy2, 1, 1 - e*0.3);
        if (S.t >= 1) {
          S.phase = 'assembling';
          S.t = 0;
          setPhase('assembling');
          setHint('Reassembling rocket with integrated ring...');
        }

      } else if (S.phase === 'assembling') {
        S.t = Math.min(S.t + dt * 0.7, 1);
        S.parts.forEach(p => { p.progress = Math.max(p.progress - dt * 0.9, 0); });
        drawRocket(rx, ry, false, S.parts);
        drawRing(S.ringTargetX, S.ringTargetY, S.t, 0.7);
        if (S.t >= 1 && S.parts.every(p => p.progress <= 0)) {
          S.phase = 'done';
          setPhase('done');
          setHint('✓ Assembly complete! Click rocket to disassemble again.');
        }

      } else if (S.phase === 'done') {
        drawRocket(rx, ry, true, [], 1);
        // Celebration glow
        ctx.save();
        ctx.translate(rx, ry);
        ctx.beginPath();
        ctx.arc(0, 0, 90 + Math.sin(time/300)*10, 0, Math.PI*2);
        ctx.strokeStyle = `rgba(79,70,229,${0.2 + Math.sin(time/400)*0.1})`;
        ctx.lineWidth = 3;
        ctx.stroke();
        ctx.restore();
      }

      animRef.current = requestAnimationFrame(loop);
    }

    animRef.current = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(animRef.current);
  }, []);

  function handleClick(e) {
    const S = stateRef.current;
    const rect = canvasRef.current.getBoundingClientRect();
    const mx = e.clientX - rect.left, my = e.clientY - rect.top;
    const w = rect.width, h = rect.height;
    const rx = w * 0.72, ry = h * 0.45;

    if (S.phase === 'idle') {
      // Check if clicking ring area
      const dx = mx - S.ringX, dy = my - S.ringY;
      if (Math.sqrt(dx*dx + dy*dy) < 55) {
        S.phase = 'disassembling';
        S.t = 0;
        S.parts.forEach(p => { p.progress = 0; });
        setPhase('disassembling');
        setHint('Disassembling rocket for ring integration...');
      }
    } else if (S.phase === 'done') {
      // Click rocket to reset
      const dx = mx - rx, dy = my - ry;
      if (Math.sqrt(dx*dx + dy*dy) < 90) {
        S.phase = 'idle';
        S.t = 0;
        S.ringX = w * 0.15;
        S.ringY = h * 0.42;
        S.ringTargetX = rx;
        S.ringTargetY = ry + 30;
        S.parts.forEach(p => { p.progress = 0; });
        setPhase('idle');
        setHint('Click the ring to begin assembly');
      }
    }
  }

  const phaseColors = {
    idle: '#4F46E5',
    disassembling: '#E8192C',
    ringMoving: '#F59E0B',
    assembling: '#10B981',
    done: '#4F46E5',
  };

  return (
    <div className="ring-anim">
      <canvas ref={canvasRef} className="ring-anim__canvas" onClick={handleClick}/>
      <div className="ring-anim__hint" style={{borderColor: phaseColors[phase]}}>
        <span className="ring-anim__hint-dot" style={{background: phaseColors[phase]}}/>
        {hint}
      </div>
      <div className="ring-anim__controls">
        <span>🖱 Click ring to assemble</span>
        <span>🚀 Click rocket to reset</span>
      </div>
    </div>
  );
}

export default function Aerospace() {
  const [activeProduct, setActiveProduct] = useState(null);

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
        <div className="aero-hero__bg"/>
        <div className="container aero-hero__content">
          <div className="aero-hero__text aero-reveal">
            <span className="aero-hero__tag">Aerospace & Defence Division</span>
            <h1 className="aero-hero__title">
              Precision for the<br/>
              <span className="aero-hero__accent">Final Frontier</span>
            </h1>
            <p className="aero-hero__sub">
              MILLTECH CNC manufactures mission-critical structural components for
              ISRO, BrahMos, and India's Gaganyaan crewed spaceflight mission.
            </p>
            <div className="aero-hero__clients">
              {['ISRO','BrahMos','VSSC','Gaganyaan','IGCAR'].map(c=>(
                <span key={c} className="aero-client-chip">{c}</span>
              ))}
            </div>
          </div>
        </div>
        <div className="aero-hero__wave">
          <svg viewBox="0 0 1440 80" preserveAspectRatio="none">
            <path d="M0,40 C360,80 1080,0 1440,40 L1440,80 L0,80 Z" fill="#F8FAFF"/>
          </svg>
        </div>
      </section>

      {/* ── STATS ── */}
      <section className="aero-stats-section">
        <div className="container">
          <div className="aero-stats-grid aero-reveal">
            {stats.map(s=>(
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
              <h2 className="section-title">Building Components<br/><span style={{color:'var(--red)'}}>That Leave Earth</span></h2>
              <div className="line-red"/>
              <p className="aero-about__p">Since 2002, MILLTECH CNC has been at the forefront of aerospace component manufacturing in India. Our Unit 2 facility houses a BERTHIEZ 8.2m CNC VTL — one of the largest in South Asia — enabling us to machine structures most shops cannot handle.</p>
              <p className="aero-about__p">We work directly with ISRO's VSSC and LPSC supplying rings, canisters, and assembly fixtures for PSLV and GSLV. Our Gaganyaan crew module adaptor is a milestone in Indian aerospace manufacturing.</p>
              <Link to="/contact" className="btn btn-indigo" style={{marginTop:'1.5rem'}}>Request a Quote →</Link>
            </div>
            <div className="aero-caps-grid aero-reveal">
              {[
                {icon:'⚙️',title:'CNC Vertical Turning',desc:'BERTHIEZ 8.2m VTL with 100-ton capacity and 0.02mm accuracy'},
                {icon:'📐',title:'MasterCAM 26',desc:'In-house 4/5-axis CNC programming for complex toolpaths'},
                {icon:'⚗️',title:'Material Expertise',desc:'Aluminium alloys, SS304/316, and high-strength mild steel'},
                {icon:'🔬',title:'Precision Inspection',desc:'TESA Uni-master, Pi Tapes, tubular micrometers to 5000mm'},
              ].map((c,i)=>(
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

      {/* ── PRODUCTS ── */}
      <section className="aero-products section bg-indigo-lt">
        <div className="container">
          <p className="eyebrow aero-reveal" style={{justifyContent:'center'}}>What We've Manufactured</p>
          <h2 className="section-title aero-reveal" style={{textAlign:'center',marginBottom:'3rem'}}>Components for Space</h2>
          <div className="aero-prod-grid aero-reveal">
            {aerospaceProducts.map(p=>(
              <div key={p.id} className={`aero-prod-card ${activeProduct===p.id?'active':''}`} onClick={()=>setActiveProduct(activeProduct===p.id?null:p.id)}>
                <div className="aero-prod-num">{String(p.id).padStart(2,'0')}</div>
                <div className="aero-prod-info">
                  <h3 className="aero-prod-name">{p.name}</h3>
                  <span className="aero-prod-spec">{p.spec}</span>
                  <span className="aero-prod-client">{p.client}</span>
                </div>
                <span className="aero-prod-toggle">{activeProduct===p.id?'−':'+'}</span>
                {activeProduct===p.id && <p className="aero-prod-desc">{p.desc}</p>}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── RING ASSEMBLY ANIMATION ── */}
      <section className="aero-3d-section section">
        <div className="container">
          <div className="aero-reveal" style={{textAlign:'center',marginBottom:'2rem'}}>
            <p className="eyebrow" style={{justifyContent:'center'}}>Interactive Demo</p>
            <h2 className="section-title">Ring Component Assembly</h2>
            <p style={{color:'var(--txt-3)',fontSize:'0.95rem'}}>
              Watch how MILLTECH CNC precision rings integrate into ISRO launch vehicles
            </p>
          </div>
          <RingRocketAnimation />
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="aero-cta">
        <div className="aero-cta__bg"/>
        <div className="container aero-cta__inner aero-reveal">
          <div>
            <h2 className="aero-cta__title">Ready to Manufacture Your Aerospace Component?</h2>
            <p className="aero-cta__sub">Send us your drawings. Our engineering team responds within 24 hours.</p>
          </div>
          <div className="aero-cta__btns">
            <Link to="/contact" className="btn btn-red">Request a Quote</Link>
            <Link to="/products" className="btn btn-outline">View All Products →</Link>
          </div>
        </div>
      </section>
    </div>
  );
}