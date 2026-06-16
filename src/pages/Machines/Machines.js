import React, { useState } from 'react';
import useScrollReveal from '../../hooks/useScrollReveal';
import { machines } from '../../data/machines';
import './Machines.css';

const ACCENTS = ['#4F46E5','#7C3AED','#E8192C','#10B981','#F59E0B','#EA580C','#0EA5E9','#F43F5E'];
const INSPECTION = [
  {icon:'📏',label:'Uni-master (TESA)',spec:'100–3500 mm',clr:'#4F46E5'},
  {icon:'🔧',label:'Inside Tubular Micrometer',spec:'100–4000 mm',clr:'#E8192C'},
  {icon:'⬜',label:'Surface Table (2 Nos)',spec:'1000 × 1000 mm',clr:'#10B981'},
  {icon:'📐',label:'Tubular Micrometer XL',spec:'1000–5000 mm',clr:'#F59E0B'},
  {icon:'🔩',label:'Outside Micrometer',spec:'0–1100 mm',clr:'#7C3AED'},
  {icon:'📊',label:'Vernier Calipers',spec:'0–1000 mm',clr:'#0EA5E9'},
  {icon:'⭕',label:'Pi Tapes',spec:'Up to 3050 mm',clr:'#EA580C'},
  {icon:'🔬',label:'Bore Gauges',spec:'Various ranges',clr:'#F43F5E'},
];

function MachineModal({ machine, onClose }) {
  if (!machine) return null;
  return (
    <div className="machine-modal" onClick={onClose}>
      <div className="machine-modal__box" onClick={e=>e.stopPropagation()}>
        <button className="machine-modal__close" onClick={onClose}>✕</button>
        <div className="machine-modal__img">
          <img
            src={machine.image}
            alt={machine.name}
            onError={e=>{e.target.src='https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?w=800&q=80'}}
          />
        </div>
        <div className="machine-modal__body">
          <span className="badge badge-ind">Unit {machine.unit}</span>
          <h2 className="machine-modal__name">{machine.name}</h2>
          <p className="machine-modal__make">{machine.make}</p>
          <p className="machine-modal__highlight">{machine.highlight}</p>
          <table className="machine-modal__specs">
            <tbody>
              {Object.entries(machine.specs).map(([k,v])=>(
                <tr key={k}>
                  <td className="machine-modal__spec-key">{k}</td>
                  <td className="machine-modal__spec-val">{v}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

function MachineCard({ machine, onClick, accent }) {
  return (
    <div className="machine-card" onClick={onClick} style={{'--m-accent':accent}}>
      <div className="machine-card__img">
        <img
          src={machine.image}
          alt={machine.name}
          onError={e=>{e.target.src='https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?w=800&q=80'}}
        />
        <div className="machine-card__img-overlay"><span>View Full Specs →</span></div>
        <div className="machine-card__unit">Unit {machine.unit}</div>
      </div>
      <div className="machine-card__body">
        <h3 className="machine-card__name">{machine.name}</h3>
        <p className="machine-card__make">{machine.make}</p>
        <p className="machine-card__type">{machine.type}</p>
        <div className="machine-card__specs">
          {Object.entries(machine.specs).slice(0,2).map(([k,v])=>(
            <div key={k} className="machine-card__spec"><span>{k}</span><strong>{v}</strong></div>
          ))}
        </div>
        <button className="machine-card__btn">View Full Specs →</button>
      </div>
    </div>
  );
}

export default function Machines() {
  const [activeUnit, setActiveUnit] = useState(0);
  const [selected, setSelected] = useState(null);
  const gridRef = useScrollReveal();

  const filtered = activeUnit ? machines.filter(m=>m.unit===activeUnit) : machines;

  return (
    <main className="machines-page">
      <section className="page-hero">
        <div className="page-hero__bg"/>
        <div className="page-hero__bg" style={{opacity:0.3}}/>
        <div className="container page-hero__content">
          <p className="page-hero__tag">Our Facility</p>
          <h1 className="page-hero__title display">Machines</h1>
          <p className="page-hero__sub">Two units with machines from France, Germany, Japan, UK &amp; Taiwan — the largest CNC fleet in South India.</p>
        </div>
      </section>

      <div className="machines-filter-bar">
        <div className="container">
          <div className="filter-bar">
            {[{l:'All Machines',v:0},{l:'Unit 1 — Ekattuthangal',v:1},{l:'Unit 2 — Thirumudivakkam',v:2}].map(u=>(
              <button key={u.v} className={`filter-btn ${activeUnit===u.v?'filter-btn--active':''}`} onClick={()=>setActiveUnit(u.v)}>
                {u.l}
              </button>
            ))}
          </div>
        </div>
      </div>

      <section className="section" ref={gridRef}>
        <div className="container">
          <div className="machines-grid stagger">
            {filtered.map((m,i)=>(
              <div key={m.id} className="reveal">
                <MachineCard machine={m} onClick={()=>setSelected(m)} accent={ACCENTS[m.id-1]||'#4F46E5'}/>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="inspection-section">
        <div className="container">
          <p className="eyebrow">Quality Assurance</p>
          <h2 className="section-title">Inspection Facilities</h2>
          <div className="line-ind"/>
          <div className="inspection-grid">
            {INSPECTION.map((item,i)=>(
              <div key={i} className="inspection-item" style={{'--ins-clr':item.clr}}>
                <span className="inspection-item__icon">{item.icon}</span>
                <div><strong style={{color:'var(--txt)',display:'block',fontSize:'0.88rem'}}>{item.label}</strong><span style={{fontSize:'0.78rem',color:'var(--txt-3)'}}>{item.spec}</span></div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {selected && <MachineModal machine={selected} onClose={()=>setSelected(null)}/>}
    </main>
  );
}