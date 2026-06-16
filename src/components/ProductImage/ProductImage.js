import React from 'react';
import './ProductImage.css';

// Each product gets a unique, colourful SVG illustration
const illustrations = {
  1: ({ className }) => (
    <svg className={className} viewBox="0 0 400 300" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <radialGradient id="bg1" cx="50%" cy="50%" r="60%">
          <stop offset="0%" stopColor="#1a0a2e"/>
          <stop offset="100%" stopColor="#06080F"/>
        </radialGradient>
        <radialGradient id="ring1" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#00D4FF"/>
          <stop offset="60%" stopColor="#8B5CF6"/>
          <stop offset="100%" stopColor="#E8192C"/>
        </radialGradient>
        <filter id="glow1">
          <feGaussianBlur stdDeviation="4" result="blur"/>
          <feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge>
        </filter>
      </defs>
      <rect width="400" height="300" fill="url(#bg1)"/>
      {/* Grid lines */}
      {[...Array(8)].map((_, i) => (
        <line key={i} x1={i*57} y1="0" x2={i*57} y2="300" stroke="rgba(0,212,255,0.06)" strokeWidth="1"/>
      ))}
      {[...Array(6)].map((_, i) => (
        <line key={i} x1="0" y1={i*60} x2="400" y2={i*60} stroke="rgba(0,212,255,0.06)" strokeWidth="1"/>
      ))}
      {/* Outer glow ring */}
      <ellipse cx="200" cy="150" rx="140" ry="50" fill="none" stroke="rgba(0,212,255,0.15)" strokeWidth="30" filter="url(#glow1)"/>
      {/* Main ring body */}
      <ellipse cx="200" cy="150" rx="130" ry="46" fill="none" stroke="url(#ring1)" strokeWidth="22"/>
      {/* Inner ring highlight */}
      <ellipse cx="200" cy="148" rx="108" ry="36" fill="none" stroke="rgba(255,255,255,0.25)" strokeWidth="3"/>
      {/* Bolt details */}
      {[...Array(12)].map((_, i) => {
        const angle = (i * 30 * Math.PI) / 180;
        const x = 200 + 130 * Math.cos(angle);
        const y = 150 + 46 * Math.sin(angle);
        return <circle key={i} cx={x} cy={y} r="5" fill="#FFB800" opacity="0.9"/>;
      })}
      {/* Spec label */}
      <rect x="140" y="220" width="120" height="30" rx="15" fill="rgba(0,212,255,0.15)" stroke="rgba(0,212,255,0.4)" strokeWidth="1"/>
      <text x="200" y="240" textAnchor="middle" fill="#00D4FF" fontSize="13" fontFamily="'Oswald',sans-serif" letterSpacing="2">Ø 2840 mm</text>
      {/* Corner decoration */}
      <text x="20" y="30" fill="rgba(0,212,255,0.3)" fontSize="10" fontFamily="monospace">FORE END RING</text>
      <text x="20" y="45" fill="rgba(255,184,0,0.5)" fontSize="9" fontFamily="monospace">ALU ALLOY · ISRO</text>
    </svg>
  ),

  2: ({ className }) => (
    <svg className={className} viewBox="0 0 400 300" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="bg2" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#0a1628"/>
          <stop offset="100%" stopColor="#06080F"/>
        </linearGradient>
        <linearGradient id="shield2" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#FF6B35"/>
          <stop offset="50%" stopColor="#FFB800"/>
          <stop offset="100%" stopColor="#E8192C"/>
        </linearGradient>
      </defs>
      <rect width="400" height="300" fill="url(#bg2)"/>
      {/* Shield shape */}
      <path d="M200,40 L320,90 L320,190 Q320,240 200,270 Q80,240 80,190 L80,90 Z" fill="rgba(255,107,53,0.08)" stroke="url(#shield2)" strokeWidth="3"/>
      {/* Inner shield */}
      <path d="M200,70 L290,108 L290,185 Q290,225 200,248 Q110,225 110,185 L110,108 Z" fill="rgba(255,184,0,0.05)" stroke="rgba(255,184,0,0.4)" strokeWidth="1.5"/>
      {/* Center emblem */}
      <circle cx="200" cy="160" r="45" fill="rgba(255,107,53,0.1)" stroke="#FF6B35" strokeWidth="2"/>
      <circle cx="200" cy="160" r="30" fill="rgba(232,25,44,0.15)" stroke="#E8192C" strokeWidth="1.5"/>
      <text x="200" y="155" textAnchor="middle" fill="#FFB800" fontSize="22" fontFamily="'Rajdhani',sans-serif" fontWeight="700">AFT</text>
      <text x="200" y="172" textAnchor="middle" fill="#FF6B35" fontSize="11" fontFamily="monospace" letterSpacing="3">SHIELD</text>
      {/* Corner bolts */}
      {[[80,90],[320,90],[80,190],[320,190]].map(([x,y],i) => (
        <circle key={i} cx={x} cy={y} r="7" fill="#FFB800" opacity="0.8"/>
      ))}
      <text x="20" y="30" fill="rgba(255,107,53,0.4)" fontSize="10" fontFamily="monospace">AFT SHIELD ASSY</text>
      <text x="20" y="45" fill="rgba(255,184,0,0.4)" fontSize="9" fontFamily="monospace">STRUCTURAL STEEL · ISRO</text>
    </svg>
  ),

  3: ({ className }) => (
    <svg className={className} viewBox="0 0 400 300" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <radialGradient id="bg3" cx="30%" cy="30%" r="70%">
          <stop offset="0%" stopColor="#0d1f0d"/>
          <stop offset="100%" stopColor="#06080F"/>
        </radialGradient>
        <linearGradient id="ring3" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#10B981"/>
          <stop offset="50%" stopColor="#00D4FF"/>
          <stop offset="100%" stopColor="#8B5CF6"/>
        </linearGradient>
      </defs>
      <rect width="400" height="300" fill="url(#bg3)"/>
      {/* Rotating ring segments */}
      {[...Array(8)].map((_, i) => {
        const angle = (i * 45 * Math.PI) / 180;
        const x1 = 200 + 100 * Math.cos(angle);
        const y1 = 150 + 36 * Math.sin(angle);
        const x2 = 200 + 115 * Math.cos(angle);
        const y2 = 150 + 41 * Math.sin(angle);
        return <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} stroke="#10B981" strokeWidth="6" opacity="0.7"/>;
      })}
      <ellipse cx="200" cy="150" rx="110" ry="40" fill="none" stroke="url(#ring3)" strokeWidth="18"/>
      <ellipse cx="200" cy="149" rx="90" ry="30" fill="none" stroke="rgba(255,255,255,0.15)" strokeWidth="2"/>
      {/* Measurement lines */}
      <line x1="90" y1="150" x2="310" y2="150" stroke="rgba(16,185,129,0.3)" strokeWidth="1" strokeDasharray="4,4"/>
      <line x1="200" y1="50" x2="200" y2="250" stroke="rgba(16,185,129,0.3)" strokeWidth="1" strokeDasharray="4,4"/>
      <rect x="130" y="220" width="140" height="28" rx="14" fill="rgba(16,185,129,0.15)" stroke="rgba(16,185,129,0.5)" strokeWidth="1"/>
      <text x="200" y="239" textAnchor="middle" fill="#10B981" fontSize="13" fontFamily="'Oswald',sans-serif" letterSpacing="2">Ø 2250 mm</text>
      <text x="20" y="30" fill="rgba(16,185,129,0.4)" fontSize="10" fontFamily="monospace">AE RING</text>
      <text x="20" y="45" fill="rgba(0,212,255,0.4)" fontSize="9" fontFamily="monospace">ALLOY STEEL · ISRO</text>
    </svg>
  ),

  4: ({ className }) => (
    <svg className={className} viewBox="0 0 400 300" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="bg4" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#1a0a00"/>
          <stop offset="100%" stopColor="#06080F"/>
        </linearGradient>
        <linearGradient id="bulk4" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#FFB800"/>
          <stop offset="50%" stopColor="#FF6B35"/>
          <stop offset="100%" stopColor="#E8192C"/>
        </linearGradient>
      </defs>
      <rect width="400" height="300" fill="url(#bg4)"/>
      {/* Outer glow */}
      <ellipse cx="200" cy="150" rx="145" ry="52" fill="none" stroke="rgba(255,184,0,0.08)" strokeWidth="40"/>
      {/* Main bulk ring */}
      <ellipse cx="200" cy="150" rx="130" ry="46" fill="none" stroke="url(#bulk4)" strokeWidth="24"/>
      <ellipse cx="200" cy="148" rx="106" ry="34" fill="none" stroke="rgba(255,255,255,0.2)" strokeWidth="2"/>
      {/* Web stiffeners */}
      {[...Array(8)].map((_, i) => {
        const a = (i * 45 * Math.PI) / 180;
        return (
          <line key={i}
            x1={200 + 106 * Math.cos(a)} y1={150 + 34 * Math.sin(a)}
            x2={200 + 128 * Math.cos(a)} y2={150 + 44 * Math.sin(a)}
            stroke="#FFB800" strokeWidth="4" opacity="0.6"/>
        );
      })}
      <rect x="130" y="220" width="140" height="28" rx="14" fill="rgba(255,184,0,0.12)" stroke="rgba(255,184,0,0.5)" strokeWidth="1"/>
      <text x="200" y="239" textAnchor="middle" fill="#FFB800" fontSize="13" fontFamily="'Oswald',sans-serif" letterSpacing="2">Ø 2840 mm ALU</text>
      <text x="20" y="30" fill="rgba(255,184,0,0.4)" fontSize="10" fontFamily="monospace">T BULK RING</text>
      <text x="20" y="45" fill="rgba(255,107,53,0.4)" fontSize="9" fontFamily="monospace">ALUMINIUM ALLOY · ISRO</text>
    </svg>
  ),

  5: ({ className }) => (
    <svg className={className} viewBox="0 0 400 300" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="bg5" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#001a2e"/>
          <stop offset="100%" stopColor="#06080F"/>
        </linearGradient>
        <linearGradient id="can5" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#00D4FF"/>
          <stop offset="100%" stopColor="#0080CC"/>
        </linearGradient>
      </defs>
      <rect width="400" height="300" fill="url(#bg5)"/>
      {/* Cylinder body */}
      <rect x="130" y="60" width="140" height="180" rx="4" fill="rgba(0,212,255,0.05)" stroke="rgba(0,212,255,0.2)" strokeWidth="1"/>
      {/* Top ellipse */}
      <ellipse cx="200" cy="60" rx="70" ry="22" fill="rgba(0,212,255,0.08)" stroke="url(#can5)" strokeWidth="3"/>
      {/* Bottom ellipse */}
      <ellipse cx="200" cy="240" rx="70" ry="22" fill="rgba(0,212,255,0.05)" stroke="#0080CC" strokeWidth="2"/>
      {/* Side vertical lines */}
      <line x1="130" y1="60" x2="130" y2="240" stroke="rgba(0,212,255,0.4)" strokeWidth="2"/>
      <line x1="270" y1="60" x2="270" y2="240" stroke="rgba(0,212,255,0.4)" strokeWidth="2"/>
      {/* Horizontal bands */}
      {[100,140,180,220].map(y => (
        <line key={y} x1="130" y1={y} x2="270" y2={y} stroke="rgba(0,212,255,0.15)" strokeWidth="1"/>
      ))}
      {/* Rivet dots along top edge */}
      {[...Array(7)].map((_, i) => (
        <circle key={i} cx={200 + 65 * Math.cos((i*30-90)*Math.PI/180)} cy={60 + 20 * Math.sin((i*30-90)*Math.PI/180)} r="3.5" fill="#FFB800"/>
      ))}
      <rect x="135" y="265" width="130" height="24" rx="12" fill="rgba(0,212,255,0.12)" stroke="rgba(0,212,255,0.4)" strokeWidth="1"/>
      <text x="200" y="281" textAnchor="middle" fill="#00D4FF" fontSize="12" fontFamily="'Oswald',sans-serif" letterSpacing="2">Ø 2250 mm</text>
      <text x="20" y="30" fill="rgba(0,212,255,0.4)" fontSize="10" fontFamily="monospace">CANISTER</text>
      <text x="20" y="45" fill="rgba(255,184,0,0.4)" fontSize="9" fontFamily="monospace">HIGH-STR STEEL · ISRO</text>
    </svg>
  ),

  6: ({ className }) => (
    <svg className={className} viewBox="0 0 400 300" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="bg6" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#0a001a"/>
          <stop offset="100%" stopColor="#06080F"/>
        </linearGradient>
        <linearGradient id="can6" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#8B5CF6"/>
          <stop offset="100%" stopColor="#4C1D95"/>
        </linearGradient>
      </defs>
      <rect width="400" height="300" fill="url(#bg6)"/>
      <rect x="120" y="50" width="160" height="200" rx="4" fill="rgba(139,92,246,0.05)" stroke="rgba(139,92,246,0.2)" strokeWidth="1"/>
      <ellipse cx="200" cy="50" rx="80" ry="25" fill="rgba(139,92,246,0.1)" stroke="url(#can6)" strokeWidth="3"/>
      <ellipse cx="200" cy="250" rx="80" ry="25" fill="rgba(139,92,246,0.06)" stroke="#4C1D95" strokeWidth="2"/>
      <line x1="120" y1="50" x2="120" y2="250" stroke="rgba(139,92,246,0.4)" strokeWidth="2"/>
      <line x1="280" y1="50" x2="280" y2="250" stroke="rgba(139,92,246,0.4)" strokeWidth="2"/>
      {[90,130,170,210].map(y => (
        <line key={y} x1="120" y1={y} x2="280" y2={y} stroke="rgba(139,92,246,0.15)" strokeWidth="1"/>
      ))}
      {[...Array(8)].map((_, i) => (
        <circle key={i} cx={200 + 75 * Math.cos((i*45-90)*Math.PI/180)} cy={50 + 23 * Math.sin((i*45-90)*Math.PI/180)} r="3.5" fill="#FFB800"/>
      ))}
      {/* Height indicator */}
      <line x1="295" y1="50" x2="295" y2="250" stroke="rgba(255,184,0,0.3)" strokeWidth="1" strokeDasharray="4,3"/>
      <text x="310" y="155" fill="rgba(255,184,0,0.6)" fontSize="10" fontFamily="monospace" transform="rotate(90,310,155)">HT 2250mm</text>
      <rect x="125" y="265" width="150" height="24" rx="12" fill="rgba(139,92,246,0.12)" stroke="rgba(139,92,246,0.4)" strokeWidth="1"/>
      <text x="200" y="281" textAnchor="middle" fill="#8B5CF6" fontSize="12" fontFamily="'Oswald',sans-serif" letterSpacing="2">Ø 2500 mm</text>
      <text x="20" y="30" fill="rgba(139,92,246,0.4)" fontSize="10" fontFamily="monospace">CANISTER XL</text>
      <text x="20" y="45" fill="rgba(255,184,0,0.4)" fontSize="9" fontFamily="monospace">HIGH-STR STEEL · ISRO</text>
    </svg>
  ),

  7: ({ className }) => (
    <svg className={className} viewBox="0 0 400 300" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <radialGradient id="bg7" cx="50%" cy="40%" r="60%">
          <stop offset="0%" stopColor="#001a10"/>
          <stop offset="100%" stopColor="#06080F"/>
        </radialGradient>
        <linearGradient id="ceos7" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#10B981"/>
          <stop offset="50%" stopColor="#00D4FF"/>
          <stop offset="100%" stopColor="#FFB800"/>
        </linearGradient>
      </defs>
      <rect width="400" height="300" fill="url(#bg7)"/>
      {/* Gaganyaan capsule shape */}
      <path d="M200,40 Q240,40 260,80 L270,180 Q270,210 200,220 Q130,210 130,180 L140,80 Q160,40 200,40Z" fill="rgba(16,185,129,0.07)" stroke="url(#ceos7)" strokeWidth="2.5"/>
      {/* Adaptor ring at bottom */}
      <ellipse cx="200" cy="220" rx="70" ry="18" fill="rgba(16,185,129,0.08)" stroke="#10B981" strokeWidth="2"/>
      {/* Window */}
      <circle cx="200" cy="120" r="28" fill="rgba(0,212,255,0.08)" stroke="#00D4FF" strokeWidth="2"/>
      <circle cx="200" cy="120" r="18" fill="rgba(0,212,255,0.12)" stroke="rgba(0,212,255,0.4)" strokeWidth="1"/>
      {/* India flag tricolour stripe */}
      <rect x="172" y="108" width="56" height="6" rx="1" fill="#FF6B35" opacity="0.8"/>
      <rect x="172" y="116" width="56" height="6" rx="1" fill="white" opacity="0.5"/>
      <rect x="172" y="124" width="56" height="6" rx="1" fill="#10B981" opacity="0.8"/>
      {/* Badge */}
      <rect x="100" y="252" width="200" height="28" rx="14" fill="rgba(16,185,129,0.12)" stroke="rgba(16,185,129,0.5)" strokeWidth="1"/>
      <text x="200" y="270" textAnchor="middle" fill="#10B981" fontSize="11" fontFamily="'Oswald',sans-serif" letterSpacing="2">GAGANYAAN · VSSC</text>
      <text x="20" y="30" fill="rgba(16,185,129,0.4)" fontSize="10" fontFamily="monospace">CEOS ADAPTOR</text>
      <text x="20" y="45" fill="rgba(255,184,0,0.4)" fontSize="9" fontFamily="monospace">CARBON STEEL · HUMAN SPACEFLIGHT</text>
    </svg>
  ),

  8: ({ className }) => (
    <svg className={className} viewBox="0 0 400 300" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="bg8" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#0a0a1a"/>
          <stop offset="100%" stopColor="#06080F"/>
        </linearGradient>
      </defs>
      <rect width="400" height="300" fill="url(#bg8)"/>
      {/* NADIR fixture - large cross structure */}
      <line x1="60" y1="150" x2="340" y2="150" stroke="#8B5CF6" strokeWidth="12" strokeLinecap="round"/>
      <line x1="200" y1="60" x2="200" y2="240" stroke="#8B5CF6" strokeWidth="12" strokeLinecap="round"/>
      {/* End caps */}
      {[[60,150],[340,150],[200,60],[200,240]].map(([x,y],i) => (
        <circle key={i} cx={x} cy={y} r="16" fill="rgba(139,92,246,0.2)" stroke="#8B5CF6" strokeWidth="3"/>
      ))}
      {/* Center hub */}
      <circle cx="200" cy="150" r="28" fill="rgba(139,92,246,0.12)" stroke="#8B5CF6" strokeWidth="3"/>
      <circle cx="200" cy="150" r="14" fill="rgba(255,184,0,0.15)" stroke="#FFB800" strokeWidth="2"/>
      {/* Dimension arrows */}
      <line x1="60" y1="265" x2="340" y2="265" stroke="rgba(139,92,246,0.4)" strokeWidth="1"/>
      <text x="200" y="260" textAnchor="middle" fill="rgba(139,92,246,0.6)" fontSize="10" fontFamily="monospace">4.4 METRES</text>
      {/* Diagonal braces */}
      <line x1="140" y1="110" x2="170" y2="140" stroke="rgba(139,92,246,0.3)" strokeWidth="2"/>
      <line x1="260" y1="110" x2="230" y2="140" stroke="rgba(139,92,246,0.3)" strokeWidth="2"/>
      <line x1="140" y1="190" x2="170" y2="162" stroke="rgba(139,92,246,0.3)" strokeWidth="2"/>
      <line x1="260" y1="190" x2="230" y2="162" stroke="rgba(139,92,246,0.3)" strokeWidth="2"/>
      <text x="20" y="30" fill="rgba(139,92,246,0.4)" fontSize="10" fontFamily="monospace">NADIR ASSEMBLY FIX</text>
      <text x="20" y="45" fill="rgba(255,184,0,0.4)" fontSize="9" fontFamily="monospace">MILD STEEL · ISRO 4.4M SPAN</text>
    </svg>
  ),

  9: ({ className }) => (
    <svg className={className} viewBox="0 0 400 300" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="bg9" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#001020"/>
          <stop offset="100%" stopColor="#06080F"/>
        </linearGradient>
        <linearGradient id="csat9" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#00D4FF"/>
          <stop offset="100%" stopColor="#10B981"/>
        </linearGradient>
      </defs>
      <rect width="400" height="300" fill="url(#bg9)"/>
      {/* CSAT circular fixture */}
      <circle cx="200" cy="150" r="110" fill="none" stroke="rgba(0,212,255,0.08)" strokeWidth="20"/>
      <circle cx="200" cy="150" r="110" fill="none" stroke="url(#csat9)" strokeWidth="6"/>
      {/* Radial arms */}
      {[...Array(8)].map((_, i) => {
        const a = (i * 45 * Math.PI) / 180;
        return (
          <line key={i}
            x1={200 + 55 * Math.cos(a)} y1={150 + 55 * Math.sin(a)}
            x2={200 + 104 * Math.cos(a)} y2={150 + 104 * Math.sin(a)}
            stroke="rgba(0,212,255,0.5)" strokeWidth="3"/>
        );
      })}
      {/* Center hub */}
      <circle cx="200" cy="150" r="55" fill="rgba(0,212,255,0.05)" stroke="rgba(0,212,255,0.3)" strokeWidth="2"/>
      <circle cx="200" cy="150" r="30" fill="rgba(16,185,129,0.1)" stroke="#10B981" strokeWidth="2"/>
      <text x="200" y="154" textAnchor="middle" fill="#00D4FF" fontSize="11" fontFamily="'Rajdhani',sans-serif" fontWeight="700">CSAT</text>
      {/* Clamp stations */}
      {[...Array(8)].map((_, i) => {
        const a = (i * 45 * Math.PI) / 180;
        return <circle key={i} cx={200 + 110*Math.cos(a)} cy={150 + 110*Math.sin(a)} r="8" fill="#FFB800" opacity="0.8"/>;
      })}
      <rect x="130" y="272" width="140" height="22" rx="11" fill="rgba(0,212,255,0.1)" stroke="rgba(0,212,255,0.4)" strokeWidth="1"/>
      <text x="200" y="287" textAnchor="middle" fill="#00D4FF" fontSize="11" fontFamily="'Oswald',sans-serif" letterSpacing="2">4.2 METRE SPAN</text>
      <text x="20" y="30" fill="rgba(0,212,255,0.4)" fontSize="10" fontFamily="monospace">CSAT ASSEMBLY FIX</text>
    </svg>
  ),

  10: ({ className }) => (
    <svg className={className} viewBox="0 0 400 300" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="bg10" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#1a0005"/>
          <stop offset="100%" stopColor="#06080F"/>
        </linearGradient>
        <linearGradient id="k4" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#E8192C"/>
          <stop offset="50%" stopColor="#FF6B35"/>
          <stop offset="100%" stopColor="#E8192C"/>
        </linearGradient>
      </defs>
      <rect width="400" height="300" fill="url(#bg10)"/>
      {/* Missile silhouette */}
      <path d="M200,30 L215,50 L215,240 L200,255 L185,240 L185,50 Z" fill="rgba(232,25,44,0.08)" stroke="url(#k4)" strokeWidth="2"/>
      {/* Nose cone */}
      <path d="M200,20 L215,50 L185,50 Z" fill="rgba(232,25,44,0.2)" stroke="#E8192C" strokeWidth="1.5"/>
      {/* Stage rings */}
      {[80,130,180].map(y => (
        <ellipse key={y} cx="200" cy={y} rx="15" ry="4" fill="none" stroke="#FFB800" strokeWidth="2.5"/>
      ))}
      {/* Fins */}
      <path d="M185,220 L165,255 L185,248 Z" fill="rgba(232,25,44,0.3)" stroke="#E8192C" strokeWidth="1.5"/>
      <path d="M215,220 L235,255 L215,248 Z" fill="rgba(232,25,44,0.3)" stroke="#E8192C" strokeWidth="1.5"/>
      {/* CLASSIFIED overlay */}
      <rect x="80" y="120" width="240" height="30" rx="4" fill="rgba(232,25,44,0.1)" stroke="rgba(232,25,44,0.3)" strokeWidth="1" strokeDasharray="6,3"/>
      <text x="200" y="140" textAnchor="middle" fill="rgba(232,25,44,0.7)" fontSize="12" fontFamily="monospace" letterSpacing="4">CLASSIFIED</text>
      <rect x="100" y="265" width="200" height="22" rx="11" fill="rgba(232,25,44,0.12)" stroke="rgba(232,25,44,0.4)" strokeWidth="1"/>
      <text x="200" y="280" textAnchor="middle" fill="#E8192C" fontSize="11" fontFamily="'Oswald',sans-serif" letterSpacing="3">K-4 · BrahMos · DRDO</text>
      <text x="20" y="30" fill="rgba(232,25,44,0.4)" fontSize="10" fontFamily="monospace">K-4 MISSILE COMPONENT</text>
    </svg>
  ),
};

// Machine illustrations
export const machineIllustrations = {
  vmc: ({ className }) => (
    <svg className={className} viewBox="0 0 400 260" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="vmcbg" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#001428"/>
          <stop offset="100%" stopColor="#06080F"/>
        </linearGradient>
      </defs>
      <rect width="400" height="260" fill="url(#vmcbg)"/>
      {/* VMC body */}
      <rect x="100" y="40" width="200" height="160" rx="6" fill="rgba(0,212,255,0.06)" stroke="rgba(0,212,255,0.25)" strokeWidth="2"/>
      {/* Column */}
      <rect x="240" y="20" width="50" height="200" rx="4" fill="rgba(0,212,255,0.04)" stroke="rgba(0,212,255,0.2)" strokeWidth="1.5"/>
      {/* Spindle */}
      <rect x="252" y="60" width="26" height="60" rx="13" fill="rgba(0,212,255,0.1)" stroke="#00D4FF" strokeWidth="2"/>
      <circle cx="265" cy="130" r="12" fill="rgba(0,212,255,0.15)" stroke="#00D4FF" strokeWidth="2"/>
      {/* Table */}
      <rect x="110" y="170" width="180" height="20" rx="3" fill="rgba(255,184,0,0.1)" stroke="#FFB800" strokeWidth="2"/>
      {/* T-slots */}
      {[140,180,220,260].map(x => (
        <line key={x} x1={x} y1="170" x2={x} y2="190" stroke="rgba(255,184,0,0.4)" strokeWidth="2"/>
      ))}
      <text x="200" y="235" textAnchor="middle" fill="#00D4FF" fontSize="12" fontFamily="'Oswald',sans-serif" letterSpacing="2">VMC — CNC MACHINING</text>
    </svg>
  ),
  vtl: ({ className }) => (
    <svg className={className} viewBox="0 0 400 260" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <radialGradient id="vtlbg" cx="50%" cy="50%" r="60%">
          <stop offset="0%" stopColor="#0a0020"/>
          <stop offset="100%" stopColor="#06080F"/>
        </radialGradient>
      </defs>
      <rect width="400" height="260" fill="url(#vtlbg)"/>
      {/* VTL rotary table */}
      <ellipse cx="200" cy="170" rx="130" ry="42" fill="rgba(139,92,246,0.06)" stroke="rgba(139,92,246,0.3)" strokeWidth="2"/>
      <ellipse cx="200" cy="165" rx="100" ry="32" fill="rgba(139,92,246,0.04)" stroke="rgba(139,92,246,0.2)" strokeWidth="1.5"/>
      {/* T-slots on table */}
      {[...Array(6)].map((_, i) => {
        const a = (i * 60 * Math.PI) / 180;
        return <line key={i} x1={200+40*Math.cos(a)} y1={165+13*Math.sin(a)} x2={200+98*Math.cos(a)} y2={165+31*Math.sin(a)} stroke="rgba(139,92,246,0.4)" strokeWidth="2"/>;
      })}
      {/* Cross rail */}
      <rect x="60" y="80" width="280" height="16" rx="8" fill="rgba(255,184,0,0.08)" stroke="#FFB800" strokeWidth="2"/>
      {/* Tool head */}
      <rect x="175" y="70" width="50" height="110" rx="6" fill="rgba(139,92,246,0.08)" stroke="#8B5CF6" strokeWidth="2"/>
      <circle cx="200" cy="165" r="14" fill="rgba(255,184,0,0.15)" stroke="#FFB800" strokeWidth="2"/>
      <text x="200" y="235" textAnchor="middle" fill="#8B5CF6" fontSize="12" fontFamily="'Oswald',sans-serif" letterSpacing="2">VTL — VERTICAL TURNING</text>
    </svg>
  ),
  berthiez: ({ className }) => (
    <svg className={className} viewBox="0 0 400 260" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <radialGradient id="berbg" cx="50%" cy="60%" r="60%">
          <stop offset="0%" stopColor="#1a0a00"/>
          <stop offset="100%" stopColor="#06080F"/>
        </radialGradient>
        <linearGradient id="bertable" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#FF6B35"/>
          <stop offset="100%" stopColor="#FFB800"/>
        </linearGradient>
      </defs>
      <rect width="400" height="260" fill="url(#berbg)"/>
      {/* Massive BERTHIEZ table */}
      <ellipse cx="200" cy="180" rx="160" ry="55" fill="rgba(255,107,53,0.06)" stroke="url(#bertable)" strokeWidth="3"/>
      <ellipse cx="200" cy="174" rx="130" ry="44" fill="rgba(255,107,53,0.04)" stroke="rgba(255,184,0,0.3)" strokeWidth="1.5"/>
      {/* Columns */}
      <rect x="40" y="40" width="30" height="150" rx="4" fill="rgba(255,107,53,0.08)" stroke="#FF6B35" strokeWidth="2"/>
      <rect x="330" y="40" width="30" height="150" rx="4" fill="rgba(255,107,53,0.08)" stroke="#FF6B35" strokeWidth="2"/>
      {/* Cross rail */}
      <rect x="40" y="40" width="320" height="18" rx="9" fill="rgba(255,184,0,0.1)" stroke="#FFB800" strokeWidth="2"/>
      {/* Spindle head */}
      <rect x="178" y="40" width="44" height="140" rx="8" fill="rgba(255,107,53,0.1)" stroke="#FF6B35" strokeWidth="2"/>
      {/* 8.2m badge */}
      <rect x="110" y="215" width="180" height="28" rx="14" fill="rgba(255,107,53,0.12)" stroke="rgba(255,107,53,0.5)" strokeWidth="1"/>
      <text x="200" y="233" textAnchor="middle" fill="#FF6B35" fontSize="12" fontFamily="'Oswald',sans-serif" letterSpacing="2">BERTHIEZ 8.2M SWING</text>
    </svg>
  ),
  kolb: ({ className }) => (
    <svg className={className} viewBox="0 0 400 260" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="kolbbg" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#001010"/>
          <stop offset="100%" stopColor="#06080F"/>
        </linearGradient>
      </defs>
      <rect width="400" height="260" fill="url(#kolbbg)"/>
      {/* Gantry structure */}
      <rect x="30" y="130" width="340" height="70" rx="4" fill="rgba(16,185,129,0.05)" stroke="rgba(16,185,129,0.2)" strokeWidth="1.5"/>
      {/* Gantry legs */}
      <rect x="30" y="40" width="25" height="160" rx="4" fill="rgba(16,185,129,0.08)" stroke="#10B981" strokeWidth="2"/>
      <rect x="345" y="40" width="25" height="160" rx="4" fill="rgba(16,185,129,0.08)" stroke="#10B981" strokeWidth="2"/>
      {/* Top beam */}
      <rect x="30" y="40" width="340" height="22" rx="8" fill="rgba(16,185,129,0.1)" stroke="#10B981" strokeWidth="2.5"/>
      {/* Spindle carriage */}
      <rect x="160" y="40" width="80" height="130" rx="6" fill="rgba(16,185,129,0.08)" stroke="#10B981" strokeWidth="2"/>
      {/* Spindle */}
      <circle cx="200" cy="180" r="18" fill="rgba(16,185,129,0.12)" stroke="#10B981" strokeWidth="2.5"/>
      <circle cx="200" cy="180" r="8" fill="rgba(255,184,0,0.2)" stroke="#FFB800" strokeWidth="2"/>
      <rect x="95" y="215" width="210" height="28" rx="14" fill="rgba(16,185,129,0.1)" stroke="rgba(16,185,129,0.4)" strokeWidth="1"/>
      <text x="200" y="233" textAnchor="middle" fill="#10B981" fontSize="12" fontFamily="'Oswald',sans-serif" letterSpacing="2">KOLB GANTRY 12.5M</text>
    </svg>
  ),
  snk: ({ className }) => (
    <svg className={className} viewBox="0 0 400 260" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="snkbg" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#0a0020"/>
          <stop offset="100%" stopColor="#06080F"/>
        </linearGradient>
      </defs>
      <rect width="400" height="260" fill="url(#snkbg)"/>
      {/* SNK large bed */}
      <rect x="30" y="150" width="340" height="50" rx="4" fill="rgba(0,212,255,0.05)" stroke="rgba(0,212,255,0.2)" strokeWidth="1.5"/>
      {/* Column */}
      <rect x="300" y="30" width="60" height="170" rx="6" fill="rgba(0,212,255,0.06)" stroke="#00D4FF" strokeWidth="2"/>
      {/* Cross rail */}
      <rect x="30" y="80" width="330" height="16" rx="8" fill="rgba(0,212,255,0.08)" stroke="#00D4FF" strokeWidth="2"/>
      {/* Spindle */}
      <rect x="155" y="80" width="50" height="80" rx="6" fill="rgba(0,212,255,0.08)" stroke="#00D4FF" strokeWidth="2"/>
      <circle cx="180" cy="170" r="14" fill="rgba(255,184,0,0.15)" stroke="#FFB800" strokeWidth="2"/>
      <rect x="105" y="215" width="190" height="26" rx="13" fill="rgba(0,212,255,0.1)" stroke="rgba(0,212,255,0.3)" strokeWidth="1"/>
      <text x="200" y="232" textAnchor="middle" fill="#00D4FF" fontSize="11" fontFamily="'Oswald',sans-serif" letterSpacing="2">SNK RB-3V · 3350MM</text>
    </svg>
  ),
  crane: ({ className }) => (
    <svg className={className} viewBox="0 0 400 260" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="cranebg" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#0a1000"/>
          <stop offset="100%" stopColor="#06080F"/>
        </linearGradient>
      </defs>
      <rect width="400" height="260" fill="url(#cranebg)"/>
      {/* Rails */}
      <rect x="20" y="50" width="360" height="12" rx="6" fill="rgba(255,184,0,0.1)" stroke="#FFB800" strokeWidth="2"/>
      {/* Bridge beam */}
      <rect x="70" y="50" width="260" height="30" rx="4" fill="rgba(255,184,0,0.08)" stroke="#FFB800" strokeWidth="2"/>
      {/* Hoist */}
      <rect x="175" y="80" width="50" height="35" rx="4" fill="rgba(232,25,44,0.08)" stroke="#E8192C" strokeWidth="2"/>
      {/* Hook cable */}
      <line x1="200" y1="115" x2="200" y2="180" stroke="rgba(255,184,0,0.5)" strokeWidth="3"/>
      {/* Hook */}
      <path d="M193,178 Q193,195 200,195 Q207,195 207,185 Q207,178 200,178" fill="none" stroke="#FFB800" strokeWidth="3"/>
      {/* Wheel assemblies */}
      {[[70,62],[330,62]].map(([x,y],i) => (
        <circle key={i} cx={x} cy={y} r="10" fill="rgba(255,184,0,0.1)" stroke="#FFB800" strokeWidth="2"/>
      ))}
      <rect x="110" y="215" width="180" height="26" rx="13" fill="rgba(255,184,0,0.1)" stroke="rgba(255,184,0,0.4)" strokeWidth="1"/>
      <text x="200" y="232" textAnchor="middle" fill="#FFB800" fontSize="11" fontFamily="'Oswald',sans-serif" letterSpacing="2">EOT CRANE SYSTEM</text>
    </svg>
  ),
};

export default function ProductImage({ productId, className = '' }) {
  const Illustration = illustrations[productId];
  if (!Illustration) {
    return (
      <div className={`product-img-fallback ${className}`}>
        <span>{productId}</span>
      </div>
    );
  }
  return <Illustration className={`product-svg-img ${className}`} />;
}

export function MachineImage({ type = 'vmc', className = '' }) {
  const Illustration = machineIllustrations[type] || machineIllustrations.vmc;
  return <Illustration className={`product-svg-img ${className}`} />;
}

// Factory/facility illustration for Home page About section
export function FactoryImage({ className = '' }) {
  return (
    <svg className={`product-svg-img ${className}`} viewBox="0 0 600 700" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="factbg" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#1E3A8A"/>
          <stop offset="50%" stopColor="#312E81"/>
          <stop offset="100%" stopColor="#4C1D95"/>
        </linearGradient>
        <linearGradient id="floor" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#2D3748"/>
          <stop offset="100%" stopColor="#1A202C"/>
        </linearGradient>
        <linearGradient id="machine1" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#06B6D4"/>
          <stop offset="100%" stopColor="#0284C7"/>
        </linearGradient>
        <linearGradient id="machine2" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#F59E0B"/>
          <stop offset="100%" stopColor="#D97706"/>
        </linearGradient>
        <linearGradient id="machine3" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#10B981"/>
          <stop offset="100%" stopColor="#059669"/>
        </linearGradient>
        <filter id="factglow">
          <feGaussianBlur stdDeviation="6" result="blur"/>
          <feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge>
        </filter>
      </defs>

      {/* Background */}
      <rect width="600" height="700" fill="url(#factbg)"/>

      {/* Grid lines */}
      {[...Array(10)].map((_,i) => (
        <line key={`v${i}`} x1={i*67} y1="0" x2={i*67} y2="700" stroke="rgba(255,255,255,0.04)" strokeWidth="1"/>
      ))}
      {[...Array(12)].map((_,i) => (
        <line key={`h${i}`} x1="0" y1={i*60} x2="600" y2={i*60} stroke="rgba(255,255,255,0.04)" strokeWidth="1"/>
      ))}

      {/* Ceiling */}
      <rect x="0" y="0" width="600" height="60" fill="rgba(0,0,0,0.3)"/>
      {/* Ceiling trusses */}
      {[60,180,300,420,540].map(x => (
        <g key={x}>
          <line x1={x} y1="0" x2={x-40} y2="60" stroke="rgba(255,255,255,0.15)" strokeWidth="3"/>
          <line x1={x} y1="0" x2={x+40} y2="60" stroke="rgba(255,255,255,0.15)" strokeWidth="3"/>
        </g>
      ))}

      {/* Overhead crane rail */}
      <rect x="0" y="55" width="600" height="14" rx="7" fill="rgba(245,158,11,0.3)" stroke="#F59E0B" strokeWidth="2"/>
      {/* Crane trolley */}
      <rect x="200" y="50" width="80" height="24" rx="4" fill="rgba(245,158,11,0.2)" stroke="#F59E0B" strokeWidth="2"/>
      <line x1="240" y1="74" x2="240" y2="160" stroke="rgba(245,158,11,0.5)" strokeWidth="3"/>
      {/* Hook */}
      <circle cx="240" cy="165" r="10" fill="none" stroke="#F59E0B" strokeWidth="2.5"/>

      {/* Floor */}
      <rect x="0" y="580" width="600" height="120" fill="url(#floor)"/>
      {/* Floor tiles */}
      {[...Array(6)].map((_,i) => (
        <line key={i} x1={i*100} y1="580" x2={i*100} y2="700" stroke="rgba(255,255,255,0.06)" strokeWidth="1"/>
      ))}
      {[590,620,650,680].map(y => (
        <line key={y} x1="0" y1={y} x2="600" y2={y} stroke="rgba(255,255,255,0.05)" strokeWidth="1"/>
      ))}

      {/* === MACHINE 1: BERTHIEZ VTL (Left) === */}
      <g filter="url(#factglow)">
        {/* Base */}
        <rect x="30" y="500" width="160" height="80" rx="4" fill="rgba(6,182,212,0.15)" stroke="#06B6D4" strokeWidth="2"/>
        {/* Column */}
        <rect x="150" y="200" width="35" height="310" rx="4" fill="rgba(6,182,212,0.12)" stroke="#06B6D4" strokeWidth="2"/>
        {/* Cross rail */}
        <rect x="30" y="195" width="165" height="18" rx="6" fill="rgba(6,182,212,0.2)" stroke="#06B6D4" strokeWidth="2"/>
        {/* Rotary table */}
        <ellipse cx="95" cy="500" rx="65" ry="20" fill="rgba(6,182,212,0.1)" stroke="url(#machine1)" strokeWidth="3"/>
        <ellipse cx="95" cy="495" rx="48" ry="14" fill="rgba(6,182,212,0.05)" stroke="rgba(6,182,212,0.4)" strokeWidth="1.5"/>
        {/* Spindle head */}
        <rect x="68" y="215" width="50" height="100" rx="6" fill="rgba(6,182,212,0.15)" stroke="#06B6D4" strokeWidth="2"/>
        {/* Control panel */}
        <rect x="30" y="370" width="45" height="70" rx="4" fill="rgba(6,182,212,0.1)" stroke="rgba(6,182,212,0.3)" strokeWidth="1"/>
        <rect x="36" y="378" width="33" height="18" rx="2" fill="rgba(6,182,212,0.3)"/>
        {[390,408,422].map(y => (
          <line key={y} x1="36" y1={y} x2="69" y2={y} stroke="rgba(6,182,212,0.4)" strokeWidth="1"/>
        ))}
        {/* Label */}
        <rect x="35" y="534" width="120" height="22" rx="11" fill="rgba(6,182,212,0.15)" stroke="rgba(6,182,212,0.4)" strokeWidth="1"/>
        <text x="95" y="549" textAnchor="middle" fill="#06B6D4" fontSize="10" fontFamily="'Oswald',sans-serif" letterSpacing="1">BERTHIEZ 8.2M VTL</text>
      </g>

      {/* === MACHINE 2: KOLB GANTRY (Center) === */}
      <g filter="url(#factglow)">
        {/* Gantry legs */}
        <rect x="230" y="200" width="22" height="380" rx="4" fill="rgba(16,185,129,0.12)" stroke="#10B981" strokeWidth="2"/>
        <rect x="348" y="200" width="22" height="380" rx="4" fill="rgba(16,185,129,0.12)" stroke="#10B981" strokeWidth="2"/>
        {/* Cross beam */}
        <rect x="228" y="195" width="145" height="22" rx="8" fill="rgba(16,185,129,0.2)" stroke="#10B981" strokeWidth="2.5"/>
        {/* Spindle carriage */}
        <rect x="278" y="210" width="46" height="120" rx="6" fill="rgba(16,185,129,0.12)" stroke="#10B981" strokeWidth="2"/>
        {/* Worktable */}
        <rect x="228" y="500" width="145" height="60" rx="4" fill="rgba(16,185,129,0.08)" stroke="#10B981" strokeWidth="1.5"/>
        {/* T-slots */}
        {[248,278,308,338].map(x => (
          <line key={x} x1={x} y1="500" x2={x} y2="560" stroke="rgba(16,185,129,0.3)" strokeWidth="2"/>
        ))}
        {/* Spindle tip */}
        <circle cx="301" cy="340" r="16" fill="rgba(16,185,129,0.15)" stroke="#10B981" strokeWidth="2.5"/>
        <circle cx="301" cy="340" r="7" fill="rgba(245,158,11,0.2)" stroke="#F59E0B" strokeWidth="1.5"/>
        {/* Label */}
        <rect x="232" y="564" width="136" height="22" rx="11" fill="rgba(16,185,129,0.15)" stroke="rgba(16,185,129,0.4)" strokeWidth="1"/>
        <text x="300" y="579" textAnchor="middle" fill="#10B981" fontSize="10" fontFamily="'Oswald',sans-serif" letterSpacing="1">KOLB GANTRY 12.5M</text>
      </g>

      {/* === MACHINE 3: VMC (Right) === */}
      <g filter="url(#factglow)">
        {/* Base */}
        <rect x="400" y="430" width="165" height="150" rx="4" fill="rgba(245,158,11,0.08)" stroke="#F59E0B" strokeWidth="1.5"/>
        {/* Column */}
        <rect x="510" y="200" width="45" height="235" rx="4" fill="rgba(245,158,11,0.1)" stroke="#F59E0B" strokeWidth="2"/>
        {/* Cross rail */}
        <rect x="398" y="270" width="162" height="16" rx="6" fill="rgba(245,158,11,0.15)" stroke="#F59E0B" strokeWidth="2"/>
        {/* Spindle */}
        <rect x="468" y="286" width="38" height="80" rx="8" fill="rgba(245,158,11,0.12)" stroke="#F59E0B" strokeWidth="2"/>
        <circle cx="487" cy="374" r="12" fill="rgba(245,158,11,0.2)" stroke="#F59E0B" strokeWidth="2"/>
        {/* Table */}
        <rect x="408" y="430" width="145" height="22" rx="4" fill="rgba(245,158,11,0.12)" stroke="#F59E0B" strokeWidth="2"/>
        {/* T-slots */}
        {[430,460,490,520].map(x => (
          <line key={x} x1={x} y1="430" x2={x} y2="452" stroke="rgba(245,158,11,0.4)" strokeWidth="2"/>
        ))}
        {/* Screen */}
        <rect x="406" y="330" width="50" height="36" rx="4" fill="rgba(245,158,11,0.15)" stroke="rgba(245,158,11,0.4)" strokeWidth="1"/>
        <rect x="410" y="334" width="42" height="20" rx="2" fill="rgba(245,158,11,0.25)"/>
        {/* Label */}
        <rect x="404" y="462" width="155" height="22" rx="11" fill="rgba(245,158,11,0.12)" stroke="rgba(245,158,11,0.4)" strokeWidth="1"/>
        <text x="481" y="477" textAnchor="middle" fill="#F59E0B" fontSize="10" fontFamily="'Oswald',sans-serif" letterSpacing="1">VMC — OKK JAPAN</text>
      </g>

      {/* Ambient light effects */}
      <ellipse cx="95" cy="500" rx="80" ry="25" fill="rgba(6,182,212,0.08)" filter="url(#factglow)"/>
      <ellipse cx="301" cy="560" rx="80" ry="20" fill="rgba(16,185,129,0.08)" filter="url(#factglow)"/>
      <ellipse cx="487" cy="450" rx="70" ry="18" fill="rgba(245,158,11,0.08)" filter="url(#factglow)"/>

      {/* Top label */}
      <rect x="150" y="80" width="300" height="50" rx="8" fill="rgba(255,255,255,0.06)" stroke="rgba(255,255,255,0.12)" strokeWidth="1"/>
      <text x="300" y="102" textAnchor="middle" fill="rgba(255,255,255,0.9)" fontSize="14" fontFamily="'Rajdhani',sans-serif" fontWeight="700" letterSpacing="4">MILLTECH CNC</text>
      <text x="300" y="120" textAnchor="middle" fill="rgba(255,255,255,0.5)" fontSize="10" fontFamily="monospace" letterSpacing="3">UNIT 2 · THIRUMUDIVAKKAM · CHENNAI</text>
    </svg>
  );
}