import React, { useState, useEffect, useRef } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import './Navbar.css';

const NAV_LINKS = [
  { label: 'Home', to: '/' },
  { label: 'About Us', to: '/about' },
  { label: 'Products', to: '/products' },
  { label: 'Machines', to: '/machines' },
  {
    label: 'Services',
    to: '/services',
    dropdown: [
      { label: 'Aerospace & Defence', to: '/services/aerospace', icon: '🚀', desc: 'ISRO · BrahMos · Gaganyaan' },
      { label: 'Windmill Components', to: '/services', icon: '🌬️', desc: 'Renewable energy parts', disabled: true },
      { label: 'Cement Machinery', to: '/services', icon: '⚙️', desc: 'Heavy industrial components', disabled: true },
    ],
  },
  { label: 'Contact Us', to: '/contact' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mobileExpanded, setMobileExpanded] = useState(null);
  const [activeDropdown, setActiveDropdown] = useState(null);
  const dropdownTimer = useRef(null);
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
    setActiveDropdown(null);
  }, [location]);

  const handleMouseEnter = (label) => {
    clearTimeout(dropdownTimer.current);
    setActiveDropdown(label);
  };

  const handleMouseLeave = () => {
    dropdownTimer.current = setTimeout(() => setActiveDropdown(null), 180);
  };

  return (
    <>
      <nav className={`navbar ${scrolled ? 'navbar--scrolled' : ''}`}>
        <div className="container navbar__inner">
          {/* Logo */}
          <Link to="/" className="navbar__logo">
            <div className="navbar__logo-icon">
              <svg viewBox="0 0 44 44" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect width="44" height="44" rx="8" fill="#C8102E"/>
                <path d="M8 32V12h6l8 13 8-13h6v20h-5V20l-9 14.5L13 20v12H8z" fill="white"/>
              </svg>
            </div>
            <div className="navbar__logo-text">
              <span className="navbar__logo-brand">MILLTECH</span>
              <span className="navbar__logo-sub">CNC · Heavy Engineering</span>
            </div>
          </Link>

          {/* Desktop links */}
          <ul className="navbar__links">
            {NAV_LINKS.map((link) => (
              <li
                key={link.label}
                className={`navbar__item ${link.dropdown ? 'navbar__item--dropdown' : ''}`}
                onMouseEnter={() => link.dropdown && handleMouseEnter(link.label)}
                onMouseLeave={() => link.dropdown && handleMouseLeave()}
              >
                <NavLink
                  to={link.to}
                  end={link.to === '/'}
                  className={({ isActive }) => `navbar__link ${isActive ? 'navbar__link--active' : ''}`}
                >
                  {link.label}
                  {link.dropdown && (
                    <svg className={`navbar__chevron ${activeDropdown === link.label ? 'open' : ''}`} viewBox="0 0 12 12" fill="none">
                      <path d="M2 4l4 4 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  )}
                </NavLink>

                {link.dropdown && (
                  <div className={`navbar__dropdown ${activeDropdown === link.label ? 'navbar__dropdown--open' : ''}`}>
                    <div className="navbar__dropdown-inner">
                      <p className="navbar__dropdown-label">Our Services</p>
                      {link.dropdown.map((item) => (
                        item.disabled ? (
                          <div key={item.label} className="navbar__dropdown-item navbar__dropdown-item--disabled">
                            <span className="navbar__dropdown-icon">{item.icon}</span>
                            <span>
                              <span className="navbar__dropdown-name">{item.label}</span>
                              <span className="navbar__dropdown-desc">{item.desc} · Soon</span>
                            </span>
                          </div>
                        ) : (
                          <Link key={item.label} to={item.to} className="navbar__dropdown-item">
                            <span className="navbar__dropdown-icon">{item.icon}</span>
                            <span>
                              <span className="navbar__dropdown-name">{item.label}</span>
                              <span className="navbar__dropdown-desc">{item.desc}</span>
                            </span>
                          </Link>
                        )
                      ))}
                    </div>
                  </div>
                )}
              </li>
            ))}
          </ul>

          <Link to="/contact" className="btn btn-primary navbar__cta">Get Quote</Link>

          <button className={`navbar__hamburger ${mobileOpen ? 'navbar__hamburger--open' : ''}`} onClick={() => setMobileOpen(!mobileOpen)} aria-label="Menu">
            <span/><span/><span/>
          </button>
        </div>
      </nav>

      {/* Mobile drawer */}
      {mobileOpen && <div className="mobile-overlay" onClick={() => setMobileOpen(false)}/>}
      <div className={`mobile-drawer ${mobileOpen ? 'mobile-drawer--open' : ''}`}>
        <div className="mobile-drawer__inner">
          <ul className="mobile-drawer__links">
            {NAV_LINKS.map((link) => (
              <li key={link.label} className="mobile-drawer__item">
                {link.dropdown ? (
                  <>
                    <button className="mobile-drawer__link" onClick={() => setMobileExpanded(mobileExpanded === link.label ? null : link.label)}>
                      {link.label}
                      <svg className={`mobile-drawer__chevron ${mobileExpanded === link.label ? 'open' : ''}`} viewBox="0 0 12 12" fill="none">
                        <path d="M2 4l4 4 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </button>
                    {mobileExpanded === link.label && (
                      <ul className="mobile-drawer__sub">
                        {link.dropdown.map((sub) => (
                          <li key={sub.label}>
                            {sub.disabled ? (
                              <span className="mobile-drawer__sub-link mobile-drawer__sub-link--disabled">{sub.icon} {sub.label}</span>
                            ) : (
                              <Link to={sub.to} className="mobile-drawer__sub-link">{sub.icon} {sub.label}</Link>
                            )}
                          </li>
                        ))}
                      </ul>
                    )}
                  </>
                ) : (
                  <NavLink to={link.to} end={link.to === '/'} className="mobile-drawer__link">{link.label}</NavLink>
                )}
              </li>
            ))}
          </ul>
          <div className="mobile-drawer__footer">
            <Link to="/contact" className="btn btn-primary" style={{width:'100%',justifyContent:'center'}}>Get a Quote</Link>
            <p className="mobile-drawer__contact">📞 9444058659 · btharan76@gmail.com</p>
          </div>
        </div>
      </div>
    </>
  );
}