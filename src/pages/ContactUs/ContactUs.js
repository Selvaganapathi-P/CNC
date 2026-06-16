import React, { useState, useRef } from 'react';
import useScrollReveal from '../../hooks/useScrollReveal';
import './ContactUs.css';

const CONTACT_INFO = [
  {
    icon: '📞',
    title: 'Phone',
    lines: ['+91 9444058659', '+91 8072515869'],
    link: 'tel:+919444058659',
  },
  {
    icon: '✉️',
    title: 'Email',
    lines: ['btharan76@gmail.com', 'baranee_i@rediffmail.com'],
    link: 'mailto:btharan76@gmail.com',
  },
  {
    icon: '📍',
    title: 'Address',
    lines: [
      'Unit 1: No. 101/1, 14th Main Road, SIDCO Industrial Estate, Thirumudivakkam, Chennai – 600132',
      'Unit 2: Plot No. 28, Arul Murugan Nagar, MKB Industrial Estate, Thirumudivakkam, Chennai – 600132',
    ],
    link: null,
  },
];

const ContactUs = () => {
  const formRef = useScrollReveal();
  const infoRef = useScrollReveal();

  const [form, setForm] = useState({ name: '', phone: '', email: '', message: '' });
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState('idle'); // idle | loading | success | error
  const [shake, setShake] = useState(false);

  const validate = () => {
    const e = {};
    if (!form.name.trim()) e.name = 'Name is required';
    if (!form.phone.trim()) e.phone = 'Phone is required';
    else if (!/^\+?[\d\s\-()]{7,}$/.test(form.phone)) e.phone = 'Enter a valid phone number';
    if (!form.email.trim()) e.email = 'Email is required';
    else if (!/\S+@\S+\.\S+/.test(form.email)) e.email = 'Enter a valid email';
    if (!form.message.trim()) e.message = 'Message is required';
    else if (form.message.trim().length < 10) e.message = 'Message must be at least 10 characters';
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
    // Simulate EmailJS send (replace with real EmailJS SDK in production)
    // emailjs.send('SERVICE_ID', 'TEMPLATE_ID', form, 'PUBLIC_KEY')
    setTimeout(() => {
      setStatus('success');
      setForm({ name: '', phone: '', email: '', message: '' });
    }, 1500);
  };

  return (
    <main className="contact-page">
      {/* HERO */}
      <section className="page-hero">
        <div className="page-hero__bg" />
        <div className="container page-hero__content">
          <p className="section-eyebrow" style={{color:'rgba(255,255,255,0.5)'}}>Get In Touch</p>
          <h1 className="page-hero__title display-title">Contact Us</h1>
          <p className="page-hero__subtitle">
            Ready to discuss your machining requirements? We'd love to hear from you.
          </p>
        </div>
      </section>

      {/* MAIN CONTENT */}
      <section className="section contact-section">
        <div className="container contact-grid">
          {/* FORM */}
          <div className="contact-form-wrap" ref={formRef}>
            <div className="reveal from-left">
              <p className="section-eyebrow">Send Us a Message</p>
              <h2 className="section-title" style={{marginBottom:'0.5rem'}}>Let's Talk</h2>
              <div className="red-line" />
            </div>

            {status === 'success' ? (
              <div className="contact-success reveal">
                <div className="contact-success__check">✓</div>
                <h3>Message Sent!</h3>
                <p>We'll get back to you within 24 hours. Thank you for reaching out to MILLTECH CNC.</p>
                <button className="btn btn-outline" onClick={() => setStatus('idle')}>Send Another</button>
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
                      id="name"
                      name="name"
                      type="text"
                      className={`form-input ${errors.name ? 'form-input--error' : ''}`}
                      placeholder="Your full name"
                      value={form.name}
                      onChange={handleChange}
                    />
                    {errors.name && <span className="form-error">{errors.name}</span>}
                  </div>
                  <div className="form-group">
                    <label className="form-label" htmlFor="phone">Phone Number *</label>
                    <input
                      id="phone"
                      name="phone"
                      type="tel"
                      className={`form-input ${errors.phone ? 'form-input--error' : ''}`}
                      placeholder="+91 9XXXXXXXXX"
                      value={form.phone}
                      onChange={handleChange}
                    />
                    {errors.phone && <span className="form-error">{errors.phone}</span>}
                  </div>
                </div>

                <div className="form-group">
                  <label className="form-label" htmlFor="email">Email Address *</label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    className={`form-input ${errors.email ? 'form-input--error' : ''}`}
                    placeholder="your@email.com"
                    value={form.email}
                    onChange={handleChange}
                  />
                  {errors.email && <span className="form-error">{errors.email}</span>}
                </div>

                <div className="form-group">
                  <label className="form-label" htmlFor="message">Message *</label>
                  <textarea
                    id="message"
                    name="message"
                    rows={5}
                    className={`form-input form-textarea ${errors.message ? 'form-input--error' : ''}`}
                    placeholder="Describe your machining requirements, component sizes, materials..."
                    value={form.message}
                    onChange={handleChange}
                  />
                  {errors.message && <span className="form-error">{errors.message}</span>}
                </div>

                <button
                  type="submit"
                  className="btn btn-primary contact-submit"
                  disabled={status === 'loading'}
                >
                  {status === 'loading' ? (
                    <>
                      <span className="contact-spinner" />
                      Sending...
                    </>
                  ) : (
                    'Send Message →'
                  )}
                </button>
              </form>
            )}
          </div>

          {/* INFO CARDS */}
          <div className="contact-info-col" ref={infoRef}>
            <div className="reveal from-right delay-1">
              <p className="section-eyebrow">Contact Details</p>
              <h2 className="section-title" style={{marginBottom:'0.5rem'}}>Reach Us</h2>
              <div className="red-line" />
            </div>

            <div className="contact-info-cards stagger-children">
              {CONTACT_INFO.map((info, i) => (
                <div key={info.title} className={`contact-info-card reveal delay-${i + 2}`}>
                  <div className="contact-info-card__icon">{info.icon}</div>
                  <div className="contact-info-card__content">
                    <h4 className="contact-info-card__title">{info.title}</h4>
                    {info.lines.map((line, j) => (
                      info.link && j === 0 ? (
                        <a key={j} href={info.link} className="contact-info-card__line contact-info-card__line--link">
                          {line}
                        </a>
                      ) : (
                        <p key={j} className="contact-info-card__line">{line}</p>
                      )
                    ))}
                  </div>
                </div>
              ))}
            </div>

            {/* Quick contact */}
            <div className="contact-quick reveal delay-5">
              <p className="contact-quick__label">For urgent enquiries, call directly:</p>
              <a href="tel:+919444058659" className="contact-quick__number">
                +91 9444058659
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* MAP */}
      <section className="map-section">
        <div className="map-label">
          <span className="map-label__pin">📍</span>
          Thirumudivakkam, Chennai – 600132
        </div>
        <iframe
          className="map-iframe"
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3887.9!2d80.0715!3d12.9874!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a525de4b5f8d18f%3A0x3d0e8b79e4e38600!2sSIDCO%20Industrial%20Estate%2C%20Thirumudivakkam%2C%20Chennai%2C%20Tamil%20Nadu%20600132!5e0!3m2!1sen!2sin!4v1686000000000!5m2!1sen!2sin"
          allowFullScreen=""
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          title="MILLTECH CNC Location"
        />
      </section>
    </main>
  );
};

export default ContactUs;