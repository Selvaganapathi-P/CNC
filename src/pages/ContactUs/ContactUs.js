import React, { useState } from 'react';
import useScrollReveal from '../../hooks/useScrollReveal';
import './ContactUs.css';

const CONTACT_INFO = [
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 10.81a19.79 19.79 0 01-3.07-8.72A2 2 0 012 0h3a2 2 0 012 1.72 12.84 12.84 0 00.7 2.81 2 2 0 01-.45 2.11L6.09 7.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45 12.84 12.84 0 002.81.7A2 2 0 0122 14.92z"/>
      </svg>
    ),
    title: 'Phone',
    lines: ['+91 9444058659', '+91 8072515869'],
    link: 'tel:+919444058659',
    color: '#0F7254',
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/>
      </svg>
    ),
    title: 'Email',
    lines: ['btharan76@gmail.com', 'baranee_i@rediffmail.com'],
    link: 'mailto:btharan76@gmail.com',
    color: '#1E3A5F',
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/><circle cx="12" cy="10" r="3"/>
      </svg>
    ),
    title: 'Address',
    lines: [
      'Unit 1: Plot No. 28, MKB Industrial Estate, Thirumudivakkam, Chennai – 600132',
      'Unit 2: 14th Main Road, Thirumudivakkam, Tamil Nadu – 600132',
    ],
    link: null,
    color: '#C8102E',
  },
];

const WA_ICON = (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
  </svg>
);

const waNumber = '919444058659';

const ContactUs = () => {
  const formRef = useScrollReveal();
  const infoRef = useScrollReveal();

  const [form,   setForm]   = useState({ name: '', company: '', phone: '', email: '', service: '', message: '' });
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState('idle');
  const [shake,  setShake]  = useState(false);

  const validate = () => {
    const e = {};
    if (!form.name.trim())    e.name    = 'Name is required';
    if (!form.phone.trim())   e.phone   = 'Phone is required';
    else if (!/^\+?[\d\s\-(]{7,}$/.test(form.phone)) e.phone = 'Enter a valid phone number';
    if (!form.email.trim())   e.email   = 'Email is required';
    else if (!/\S+@\S+\.\S+/.test(form.email)) e.email = 'Enter a valid email';
    if (!form.message.trim()) e.message = 'Please describe your requirement';
    else if (form.message.trim().length < 10) e.message = 'At least 10 characters required';
    return e;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm(p => ({ ...p, [name]: value }));
    if (errors[name]) setErrors(p => ({ ...p, [name]: '' }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      setShake(true);
      setTimeout(() => setShake(false), 600);
      return;
    }
    setStatus('loading');
    setTimeout(() => {
      setStatus('success');
      setForm({ name: '', company: '', phone: '', email: '', service: '', message: '' });
    }, 1500);
  };

  const waText = encodeURIComponent(
    `Hello MILLTECH CNC,\n\nI am interested in your CNC machining services.\n\nName: ${form.name || '[Your Name]'}\nPhone: ${form.phone || '[Your Phone]'}\nRequirement: ${form.message || '[Describe requirement]'}`
  );
  const waLink = `https://wa.me/${waNumber}?text=${waText}`;

  return (
    <main className="contact-page">

      {/* ── HERO ── */}
      <section className="contact-hero">
        <div className="contact-hero__bg"/>
        <div className="container contact-hero__content">
          <p className="section-eyebrow" style={{color:'rgba(255,255,255,0.5)'}}>Get In Touch</p>
          <h1 className="contact-hero__title">Let's Build<br/><span>Together</span></h1>
          <p className="contact-hero__sub">
            Ready to discuss your machining requirements? Our engineering team responds within 24 hours.
          </p>
          <div className="contact-hero__pills">
            <a href="tel:+919444058659" className="contact-hero__pill">
              <span className="contact-hero__pill-icon">📞</span>
              +91 9444058659
            </a>
            <a href={`https://wa.me/${waNumber}`} target="_blank" rel="noopener noreferrer" className="contact-hero__pill contact-hero__pill--wa">
              {WA_ICON}
              WhatsApp Us
            </a>
          </div>
        </div>
      </section>

      {/* ── MAIN CONTENT ── */}
      <section className="contact-section section">
        <div className="container contact-grid">

          {/* FORM */}
          <div className="contact-form-col" ref={formRef}>
            <div className="reveal from-left">
              <p className="section-eyebrow">Send a Message</p>
              <h2 className="contact-form-col__heading">Tell Us Your<br/><span>Requirements</span></h2>
              <div className="red-line"/>
            </div>

            {status === 'success' ? (
              <div className="contact-success reveal">
                <div className="contact-success__check">✓</div>
                <h3>Message Received!</h3>
                <p>We'll get back to you within 24 hours. Thank you for reaching out to MILLTECH CNC.</p>
                <div className="contact-success__actions">
                  <button className="btn btn-outline" onClick={() => setStatus('idle')}>Send Another</button>
                  <a href={`https://wa.me/${waNumber}`} target="_blank" rel="noopener noreferrer" className="btn btn-wa">
                    {WA_ICON} Chat on WhatsApp
                  </a>
                </div>
              </div>
            ) : (
              <form
                className={`contact-form reveal delay-2 ${shake ? 'contact-form--shake' : ''}`}
                onSubmit={handleSubmit}
                noValidate
              >
                <div className="form-row">
                  <div className="form-group">
                    <label className="form-label" htmlFor="name">Full Name *</label>
                    <input
                      id="name" name="name" type="text"
                      className={`form-input ${errors.name ? 'form-input--error' : ''}`}
                      placeholder="Your full name"
                      value={form.name} onChange={handleChange}
                    />
                    {errors.name && <span className="form-error">{errors.name}</span>}
                  </div>
                  <div className="form-group">
                    <label className="form-label" htmlFor="company">Company / Organisation</label>
                    <input
                      id="company" name="company" type="text"
                      className="form-input"
                      placeholder="Optional"
                      value={form.company} onChange={handleChange}
                    />
                  </div>
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label className="form-label" htmlFor="phone">Phone Number *</label>
                    <input
                      id="phone" name="phone" type="tel"
                      className={`form-input ${errors.phone ? 'form-input--error' : ''}`}
                      placeholder="+91 9XXXXXXXXX"
                      value={form.phone} onChange={handleChange}
                    />
                    {errors.phone && <span className="form-error">{errors.phone}</span>}
                  </div>
                  <div className="form-group">
                    <label className="form-label" htmlFor="email">Email Address *</label>
                    <input
                      id="email" name="email" type="email"
                      className={`form-input ${errors.email ? 'form-input--error' : ''}`}
                      placeholder="your@email.com"
                      value={form.email} onChange={handleChange}
                    />
                    {errors.email && <span className="form-error">{errors.email}</span>}
                  </div>
                </div>

                <div className="form-group">
                  <label className="form-label" htmlFor="service">Service Required</label>
                  <select
                    id="service" name="service"
                    className="form-input form-select"
                    value={form.service} onChange={handleChange}
                  >
                    <option value="">Select a service...</option>
                    <option value="aerospace">Aerospace CNC Components</option>
                    <option value="vtl">VTL / CNC Turning (Large Diameter)</option>
                    <option value="fabrication">Heavy Fabrication</option>
                    <option value="windmill">Windmill Components</option>
                    <option value="defence">Defence / Missile Components</option>
                    <option value="other">Other / General Enquiry</option>
                  </select>
                </div>

                <div className="form-group">
                  <label className="form-label" htmlFor="message">Requirement Details *</label>
                  <textarea
                    id="message" name="message" rows={5}
                    className={`form-input form-textarea ${errors.message ? 'form-input--error' : ''}`}
                    placeholder="Describe your machining requirement — component name, dimensions, material, tolerance, quantity..."
                    value={form.message} onChange={handleChange}
                  />
                  {errors.message && <span className="form-error">{errors.message}</span>}
                </div>

                <div className="contact-form__actions">
                  <button type="submit" className="btn btn-primary contact-submit" disabled={status === 'loading'}>
                    {status === 'loading' ? (
                      <><span className="contact-spinner"/>Sending...</>
                    ) : 'Send Message →'}
                  </button>
                  <a href={waLink} target="_blank" rel="noopener noreferrer" className="btn btn-wa">
                    {WA_ICON} WhatsApp
                  </a>
                </div>
              </form>
            )}
          </div>

          {/* INFO */}
          <div className="contact-info-col" ref={infoRef}>
            <div className="reveal from-right delay-1">
              <p className="section-eyebrow">Contact Details</p>
              <h2 className="contact-info-col__heading">Reach<br/><span>Our Team</span></h2>
              <div className="red-line"/>
            </div>

            <div className="contact-cards-list">
              {CONTACT_INFO.map((info, i) => (
                <div key={info.title} className={`contact-card reveal delay-${i+2}`} style={{'--cc': info.color}}>
                  <div className="contact-card__icon">{info.icon}</div>
                  <div className="contact-card__body">
                    <h4 className="contact-card__title">{info.title}</h4>
                    {info.lines.map((line, j) => (
                      info.link && j === 0 ? (
                        <a key={j} href={info.link} className="contact-card__line contact-card__line--link">{line}</a>
                      ) : (
                        <p key={j} className="contact-card__line">{line}</p>
                      )
                    ))}
                  </div>
                </div>
              ))}
            </div>

            {/* WhatsApp block */}
            <div className="contact-wa reveal delay-6">
              <div className="contact-wa__icon">{WA_ICON}</div>
              <div className="contact-wa__text">
                <strong>Prefer WhatsApp?</strong>
                <p>Get instant replies from our engineering team</p>
              </div>
              <a href={`https://wa.me/${waNumber}`} target="_blank" rel="noopener noreferrer" className="contact-wa__btn">
                Open Chat →
              </a>
            </div>

            {/* Quick info */}
            <div className="contact-quick reveal delay-5">
              <div className="contact-quick__item">
                <span className="contact-quick__label">Response Time</span>
                <span className="contact-quick__val">Within 24 Hours</span>
              </div>
              <div className="contact-quick__divider"/>
              <div className="contact-quick__item">
                <span className="contact-quick__label">Working Hours</span>
                <span className="contact-quick__val">Mon – Sat, 9am – 6pm</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── MAP ── */}
      <section className="map-section">
        <div className="container map-header-row">
          <p className="section-eyebrow">Our Location</p>
          <h2 className="section-title">Find Us in Thirumudivakkam</h2>
        </div>
        <div className="map-embed-wrap">
          <iframe
            className="map-iframe"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3887.9!2d80.0715!3d12.9874!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a525de4b5f8d18f%3A0x3d0e8b79e4e38600!2sSIDCO%20Industrial%20Estate%2C%20Thirumudivakkam%2C%20Chennai%2C%20Tamil%20Nadu%20600132!5e0!3m2!1sen!2sin!4v1686000000000!5m2!1sen!2sin"
            allowFullScreen=""
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title="MILLTECH CNC Location"
          />
        </div>
      </section>
    </main>
  );
};

export default ContactUs;