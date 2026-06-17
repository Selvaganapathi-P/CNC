import React, { useState } from 'react';
import useScrollReveal from '../../hooks/useScrollReveal';
import { machines } from '../../data/machines';
import './Machines.css';

const ACCENTS = ['#4F46E5','#7C3AED','#E8192C','#10B981','#F59E0B','#EA580C','#0EA5E9','#F43F5E'];

const INSPECTION = [
  { icon:'📏', label:'Uni-master (TESA)',           spec:'100–3500 mm',   clr:'#4F46E5' },
  { icon:'🔧', label:'Inside Tubular Micrometer',   spec:'100–4000 mm',   clr:'#E8192C' },
  { icon:'⬜', label:'Surface Table (2 Nos)',        spec:'1000 × 1000 mm', clr:'#10B981' },
  { icon:'📐', label:'Tubular Micrometer XL',       spec:'1000–5000 mm',  clr:'#F59E0B' },
  { icon:'🔩', label:'Outside Micrometer',          spec:'0–1100 mm',     clr:'#7C3AED' },
  { icon:'📊', label:'Vernier Calipers',            spec:'0–1000 mm',     clr:'#0EA5E9' },
  { icon:'⭕', label:'Pi Tapes',                    spec:'Up to 3050 mm', clr:'#EA580C' },
  { icon:'🔬', label:'Bore Gauges',                 spec:'Various ranges', clr:'#F43F5E' },
];

// ── MACHINE DETAIL PANEL ──
function MachineDetailPanel({ machine, accent }) {
  if (!machine) {
    return (
      <div className="mdet-empty">
        <div className="mdet-empty__icon">⚙️</div>
        <p className="mdet-empty__text">Select a machine to view specifications</p>
      </div>
    );
  }

  return (
    <div className="mdet" key={machine.id} style={{ '--m-accent': accent }}>
      <div className="mdet__img-wrap">
        <img
          src={machine.image}
          alt={machine.name}
          className="mdet__img"
          onError={e => { e.target.src = 'https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?w=800&q=80'; }}
        />
        <div className="mdet__img-overlay" />
        <span className="mdet__unit-badge">Unit {machine.unit}</span>
      </div>

      <div className="mdet__body">
        <span className="mdet__make">{machine.make}</span>
        <h2 className="mdet__name">{machine.name}</h2>
        <p className="mdet__type">{machine.type}</p>
        <p className="mdet__highlight">{machine.highlight}</p>

        <div className="mdet__divider" />

        <h4 className="mdet__specs-title">Technical Specifications</h4>
        <div className="mdet__specs-list">
          {Object.entries(machine.specs).map(([k, v]) => (
            <div key={k} className="mdet__spec-row">
              <span className="mdet__spec-key">{k}</span>
              <span className="mdet__spec-val">{v}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ── MACHINE CARD (left column) ──
function MachineCard({ machine, isActive, onClick, accent }) {
  const [tab, setTab] = useState('spec'); // 'spec' | 'details'

  return (
    <div
      className={`mcard ${isActive ? 'mcard--active' : ''}`}
      style={{ '--m-accent': accent }}
    >
      {/* Top row: image + name */}
      <div className="mcard__top" onClick={onClick}>
        <div className="mcard__img-wrap">
          <img
            src={machine.image}
            alt={machine.name}
            className="mcard__img"
            onError={e => { e.target.src = 'https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?w=800&q=80'; }}
          />
        </div>
        <div className="mcard__meta">
          <span className="mcard__unit">Unit {machine.unit}</span>
          <h3 className="mcard__name">{machine.name}</h3>
          <span className="mcard__make">{machine.make}</span>
          <p className="mcard__type">{machine.type}</p>
        </div>
        <div className="mcard__arrow">{isActive ? '▴' : '▾'}</div>
      </div>

      {/* Tab buttons */}
      <div className="mcard__tabs">
        <button
          className={`mcard__tab ${tab === 'spec' ? 'mcard__tab--active' : ''}`}
          onClick={() => setTab('spec')}
        >
          Specifications
        </button>
        <button
          className={`mcard__tab ${tab === 'details' ? 'mcard__tab--active' : ''}`}
          onClick={() => { setTab('details'); onClick(); }}
        >
          Details →
        </button>
      </div>

      {/* Spec preview (always shown) */}
      {tab === 'spec' && (
        <div className="mcard__spec-preview">
          {Object.entries(machine.specs).slice(0, 4).map(([k, v]) => (
            <div key={k} className="mcard__spec-row">
              <span>{k}</span>
              <strong>{v}</strong>
            </div>
          ))}
        </div>
      )}

      {/* Details tab — highlight text */}
      {tab === 'details' && (
        <div className="mcard__detail-preview">
          <p className="mcard__highlight">{machine.highlight}</p>
          <button className="btn btn-indigo mcard__view-btn" onClick={onClick}>
            Full Specs on Right →
          </button>
        </div>
      )}
    </div>
  );
}

export default function Machines() {
  const [activeUnit, setActiveUnit] = useState(0);
  const [selectedId,  setSelectedId]  = useState(null);
  const gridRef = useScrollReveal();

  const filtered = activeUnit ? machines.filter(m => m.unit === activeUnit) : machines;
  const selectedMachine = machines.find(m => m.id === selectedId) || null;
  const selectedAccent  = selectedMachine ? (ACCENTS[selectedMachine.id - 1] || '#4F46E5') : '#4F46E5';

  return (
    <main className="machines-page">

      {/* ── HERO ── */}
      <section className="page-hero">
        <div className="page-hero__bg" />
        <div className="container page-hero__content">
          <p className="page-hero__tag">Our Facility</p>
          <h1 className="page-hero__title display">Machines</h1>
          <p className="page-hero__sub">
            Two units with machines from France, Germany, Japan, UK &amp; Taiwan — the largest CNC fleet in South India.
          </p>
        </div>
      </section>

      {/* ── FILTER BAR ── */}
      <div className="machines-filter-bar">
        <div className="container">
          <div className="filter-bar">
            {[
              { l: 'All Machines', v: 0 },
              { l: 'Unit 1 — Ekattuthangal', v: 1 },
              { l: 'Unit 2 — Thirumudivakkam', v: 2 },
            ].map(u => (
              <button
                key={u.v}
                className={`filter-btn ${activeUnit === u.v ? 'filter-btn--active' : ''}`}
                onClick={() => { setActiveUnit(u.v); setSelectedId(null); }}
              >
                {u.l}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* ── MAIN LAYOUT: cards left, detail right ── */}
      <section className="section machines-main" ref={gridRef}>
        <div className="container">
          <div className="machines-layout">

            {/* LEFT: Cards list */}
            <div className="machines-list stagger">
              {filtered.map((m, i) => (
                <div key={m.id} className="reveal">
                  <MachineCard
                    machine={m}
                    isActive={selectedId === m.id}
                    onClick={() => setSelectedId(prev => prev === m.id ? null : m.id)}
                    accent={ACCENTS[m.id - 1] || '#4F46E5'}
                  />
                </div>
              ))}
            </div>

            {/* RIGHT: Detail panel — sticky */}
            <div className="machines-detail-col">
              <div className="machines-detail-sticky reveal from-right">
                <MachineDetailPanel machine={selectedMachine} accent={selectedAccent} />
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ── INSPECTION SECTION ── */}
      <section className="inspection-section section">
        <div className="container">
          <p className="eyebrow">Quality Assurance</p>
          <h2 className="section-title">Inspection Facilities</h2>
          <div className="line-ind" />
          <div className="inspection-grid">
            {INSPECTION.map((item, i) => (
              <div key={i} className="inspection-item" style={{ '--ins-clr': item.clr }}>
                <span className="inspection-item__icon">{item.icon}</span>
                <div>
                  <strong style={{ color: 'var(--txt)', display: 'block', fontSize: '0.88rem' }}>{item.label}</strong>
                  <span style={{ fontSize: '0.78rem', color: 'var(--txt-3)' }}>{item.spec}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

    </main>
  );
}