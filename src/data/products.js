// src/data/products.js — ALL LOCAL ASSETS
import ringImg         from '../assets/ring.png';
import rocketImg       from '../assets/rocket-removebg-preview.png';
import aeRingImg from '../assets/AE RING Ø 2250MM.jpg';
import canisterImg from '../assets/CANISTER Ø 2250MM.jpg';
import tBulkRingImg from '../assets/T BULK RING Ø 2840MM (ALU).jpg';
import aftShieldImg    from '../assets/AFT SHEILD ASSY  FIX.jpg';
import csatImg         from '../assets/CSAT ASSY FIX 4.2 METER.jpg';
import k4Img           from '../assets/K-4.jpg';
import nadirImg        from '../assets/NADIR ASSY FIX 4.4 METER.jpg';
import vsscImg         from '../assets/VSSC-GAGANYAAN.jpg';
import pic4Img         from '../assets/Picture4.jpg';

export const products = [
  {
    id: 1,
    name: 'Fore End Ring Ø 2840',
    shortName: 'Fore End Ring',
    category: 'aerospace',
    tag: 'ISRO',
    material: 'Aluminium Alloy (ALU)',
    diameter: '2840 mm',
    image: tBulkRingImg,
    description: 'CNC-machined aluminium fore end ring for ISRO launch vehicle payload fairing. Manufactured to tight aerospace tolerances on our large-capacity BERTHIEZ CNC VTL.',
    specs: { Diameter: 'Ø 2840 mm', Material: 'Aluminium Alloy', Process: 'CNC VTL Turning', Tolerance: '±0.05 mm', Surface: 'As Machined / Anodised', Client: 'ISRO' },
  },
  {
    id: 2,
    name: 'AFT Shield Assembly Fix',
    shortName: 'AFT Shield',
    category: 'aerospace',
    tag: 'ISRO',
    material: 'Structural Steel',
    diameter: '—',
    image: aftShieldImg,
    description: 'Robust aft shield assembly fixture used during integration of ISRO launch vehicle stages. Fabricated and machined for zero-compromise structural integrity.',
    specs: { Type: 'Assembly Fixture', Material: 'Structural Steel', Process: 'Fabrication + CNC Machining', Finish: 'Zinc Primer', Client: 'ISRO' },
  },
  {
    id: 3,
    name: 'AE Ring Ø 2250',
    shortName: 'AE Ring',
    category: 'aerospace',
    tag: 'ISRO',
    material: 'Alloy Steel',
    diameter: '2250 mm',
    image: aeRingImg,
    description: 'Large-diameter aft end ring for rocket stage integration, machined to micron-level accuracy using the BERTHIEZ 8.2m CNC VTL.',
    specs: { Diameter: 'Ø 2250 mm', Material: 'Alloy Steel', Process: 'CNC VTL Turning', Tolerance: '±0.02 mm', Client: 'ISRO' },
  },
  {
    id: 4,
    name: 'T Bulk Ring Ø 2840',
    shortName: 'T Bulk Ring',
    category: 'aerospace',
    tag: 'ISRO',
    material: 'Aluminium Alloy',
    diameter: '2840 mm',
    image: tBulkRingImg,
    description: 'Thrust bulkhead ring machined from aircraft-grade aluminium. Load-bearing interface between propellant stage and payload bay on ISRO launch vehicles.',
    specs: { Diameter: 'Ø 2840 mm', Material: 'Aluminium Alloy', Process: 'CNC VTL Turning', Client: 'ISRO PSLV' },
  },
  {
    id: 5,
    name: 'Canister Ø 2250',
    shortName: 'Canister',
    category: 'aerospace',
    tag: 'ISRO / VSSC',
    material: 'High-Strength Steel',
    diameter: '2250 mm',
    image: canisterImg,
    description: 'Cylindrical canister assembly for housing avionics and telemetry systems aboard ISRO launch vehicles. Manufactured at VSSC specifications.',
    specs: { Diameter: 'Ø 2250 mm', Material: 'High Strength Steel', Process: 'CNC Turning + Milling', Client: 'ISRO / VSSC' },
  },
  {
    id: 6,
    name: 'Canister Ø 2500 HT-2250',
    shortName: 'Canister XL',
    category: 'aerospace',
    tag: 'ISRO / VSSC',
    material: 'High-Strength Steel',
    diameter: '2500 mm',
    image: canisterImg,
    description: 'Larger-diameter canister with extended height for additional payload accommodation on ISRO GSLV and PSLV-XL vehicles.',
    specs: { Diameter: 'Ø 2500 mm', Height: '2250 mm', Material: 'High Strength Steel', Client: 'ISRO GSLV / PSLV-XL' },
  },
  {
    id: 7,
    name: 'CEOS Adaptor Assembly',
    shortName: 'CEOS Adaptor',
    category: 'aerospace',
    tag: 'Gaganyaan · VSSC',
    material: 'Carbon Steel',
    diameter: 'Fixed Config',
    image: vsscImg,
    description: "Crew module adaptor for India's first crewed spaceflight mission — Gaganyaan. Manufactured, assembled, and painted by MILLTECH CNC under VSSC supervision.",
    specs: { Type: 'Crew Module Adaptor', Material: 'Carbon Steel', Process: 'CNC Machining + Assembly + Painting', Programme: 'Gaganyaan', Client: 'VSSC / ISRO' },
  },
  {
    id: 8,
    name: 'NADIR Assembly Fix',
    shortName: 'NADIR Assy',
    category: 'aerospace',
    tag: 'ISRO',
    material: 'Mild Steel',
    diameter: '4.4 Metre Span',
    image: nadirImg,
    description: 'Large nadir-pointing instrument mounting fixture with 4.4m span. Machined from structural steel for satellite integration at ISRO.',
    specs: { Span: '4.4 Metres', Material: 'Mild Steel', Process: 'Fabrication + CNC Machining', Client: 'ISRO' },
  },
  {
    id: 9,
    name: 'CSAT Assembly Fix',
    shortName: 'CSAT Assy',
    category: 'aerospace',
    tag: 'ISRO',
    material: 'Mild Steel',
    diameter: '4.2 Metre Span',
    image: csatImg,
    description: 'Communication satellite assembly fixture spanning 4.2m. Supports final integration operations for ISRO communication satellites.',
    specs: { Span: '4.2 Metres', Material: 'Mild Steel', Process: 'Fabrication + CNC Machining', Client: 'ISRO ComSat' },
  },
  {
    id: 10,
    name: 'K-4 Missile Component',
    shortName: 'K-4',
    category: 'defence',
    tag: 'BrahMos / DRDO',
    material: 'High-Grade Alloy Steel',
    diameter: '—',
    image: k4Img,
    description: 'Mission-critical multi-stage stacked component for ballistic missile systems, machined under stringent defence security protocols.',
    specs: { Programme: 'Defence — Restricted', Material: 'High-Grade Alloy Steel', Process: 'CNC Machining', Client: 'BrahMos / DRDO' },
  },
];

export const getProductById  = (id)  => products.find(p => p.id === parseInt(id));
export const getProductsByCategory = (cat) => cat === 'all' ? products : products.filter(p => p.category === cat);