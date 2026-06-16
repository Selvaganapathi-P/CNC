import React from 'react';
import { Link } from 'react-router-dom';
import './Footer.css';

const Footer = () => {
  const year = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="footer__top">
        <div className="container footer__grid">
          {/* Brand */}
          <div className="footer__brand">
            <Link to="/" className="footer__logo">
              <svg viewBox="0 0 40 40" fill="none" width="36" height="36">
                <rect width="40" height="40" rx="4" fill="#C0161C"/>
                <path d="M8 32V8l8 12 8-12v24M28 8h4v24h-4" stroke="white" strokeWidth="2.5" strokeLinejoin="round"/>
              </svg>
              <div>
                <span className="footer__logo-brand">MILLTECH</span>
                <span className="footer__logo-sub"> CNC</span>
              </div>
            </Link>
            <p className="footer__tagline">
              Manufacturer of Heavy Engineering Components, Heavy Machining and Fabrication.
            </p>
            <div className="footer__iso">
              <span className="footer__iso-badge">ISO 9001:2015</span>
              <span className="footer__iso-label">Certified — Unit 1</span>
            </div>
          </div>

          {/* Quick Links */}
          <div className="footer__col">
            <h4 className="footer__col-title">Quick Links</h4>
            <ul className="footer__links">
              {[
                { label: 'Home', to: '/' },
                { label: 'About Us', to: '/about' },
                { label: 'Products', to: '/products' },
                { label: 'Machines', to: '/machines' },
                { label: 'Contact Us', to: '/contact' },
              ].map(l => (
                <li key={l.label}><Link to={l.to} className="footer__link">{l.label}</Link></li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div className="footer__col">
            <h4 className="footer__col-title">Services</h4>
            <ul className="footer__links">
              <li><Link to="/services/aerospace" className="footer__link">Aerospace Machining</Link></li>
              <li><span className="footer__link footer__link--muted">Windmill Components <span className="badge badge-coming" style={{fontSize:'0.55rem'}}>Soon</span></span></li>
              <li><span className="footer__link footer__link--muted">Cement Machine Parts <span className="badge badge-coming" style={{fontSize:'0.55rem'}}>Soon</span></span></li>
            </ul>
            <h4 className="footer__col-title" style={{marginTop:'1.5rem'}}>Our Clients</h4>
            <ul className="footer__links">
              {['ISRO (VSSC · LPSC)', 'BrahMos Aerospace', 'L&T Defence', 'IGCAR', 'FLSmidth'].map(c => (
                <li key={c}><span className="footer__link footer__link--muted">{c}</span></li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div className="footer__col">
            <h4 className="footer__col-title">Contact Us</h4>
            <ul className="footer__contact-list">
              <li className="footer__contact-item">
                <span className="footer__contact-icon">📞</span>
                <div>
                  <a href="tel:+919444058659" className="footer__link">+91 9444058659</a>
                  <br/>
                  <a href="tel:+918072515869" className="footer__link">+91 8072515869</a>
                </div>
              </li>
              <li className="footer__contact-item">
                <span className="footer__contact-icon">✉️</span>
                <div>
                  <a href="mailto:btharan76@gmail.com" className="footer__link">btharan76@gmail.com</a>
                  <br/>
                  <a href="mailto:baranee_i@rediffmail.com" className="footer__link" style={{fontSize:'0.78rem'}}>baranee_i@rediffmail.com</a>
                </div>
              </li>
              <li className="footer__contact-item">
                <span className="footer__contact-icon">📍</span>
                <div>
                  <p className="footer__address">
                    No. 101/1, 14th Main Road,<br/>
                    SIDCO Industrial Estate,<br/>
                    Thirumudivakkam, Chennai – 600132
                  </p>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <div className="footer__bottom">
        <div className="container footer__bottom-inner">
          <p className="footer__copy">
            © {year} MILLTECH CNC. All rights reserved.
          </p>
          <p className="footer__motto">We value <strong>TIME</strong> × <strong>QUALITY</strong> + <strong>METHOD</strong></p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;