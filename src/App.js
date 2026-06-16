import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';

import Navbar from './components/Navbar/Navbar';
import Footer from './components/Footer/Footer';

import Home from './pages/Home/Home';
import AboutUs from './pages/AboutUs/AboutUs';
import Products from './pages/Products/Products';
import ProductDetail from './pages/ProductDetail/ProductDetail';
import Machines from './pages/Machines/Machines';
import Services from './pages/Services/Services';
import Aerospace from './pages/Services/Aerospace/Aerospace';
import ContactUs from './pages/ContactUs/ContactUs';

import './styles/variables.css';
import './styles/animations.css';
import './styles/global.css';

// Scroll to top on route change
function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

// Page transition wrapper
function PageWrapper({ children }) {
  const { pathname } = useLocation();
  const [key, setKey] = React.useState(pathname);
  const [display, setDisplay] = React.useState(children);
  const [fading, setFading] = React.useState(false);

  useEffect(() => {
    if (pathname !== key) {
      setFading(true);
      const t = setTimeout(() => {
        setDisplay(children);
        setKey(pathname);
        setFading(false);
      }, 250);
      return () => clearTimeout(t);
    } else {
      setDisplay(children);
    }
  }, [pathname, children, key]);

  return (
    <div
      className="page-transition"
      style={{
        opacity: fading ? 0 : 1,
        transform: fading ? 'translateY(8px)' : 'translateY(0)',
        transition: 'opacity 0.25s ease, transform 0.25s ease',
      }}
    >
      {display}
    </div>
  );
}

function AppLayout() {
  return (
    <>
      <Navbar />
      <main>
        <PageWrapper>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<AboutUs />} />
            <Route path="/products" element={<Products />} />
            <Route path="/products/:id" element={<ProductDetail />} />
            <Route path="/machines" element={<Machines />} />
            <Route path="/services" element={<Services />} />
            <Route path="/services/aerospace" element={<Aerospace />} />
            <Route path="/contact" element={<ContactUs />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </PageWrapper>
      </main>
      <Footer />
    </>
  );
}

function NotFound() {
  return (
    <div
      style={{
        minHeight: '80vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '20px',
        paddingTop: '80px',
        textAlign: 'center',
      }}
    >
      <span style={{ fontSize: '5rem', fontFamily: 'var(--f-display)', color: 'var(--red)' }}>
        404
      </span>
      <h2 style={{ color: 'var(--txt)', fontFamily: 'var(--f-display)' }}>
        Page Not Found
      </h2>
      <p style={{ color: 'var(--txt-3)' }}>
        The page you're looking for doesn't exist.
      </p>
      <a
        href="/"
        style={{
          display: 'inline-block',
          padding: '12px 28px',
          background: 'var(--red)',
          color: '#fff',
          textDecoration: 'none',
          borderRadius: '8px',
          fontFamily: 'var(--f-head)',
          letterSpacing: '1px',
        }}
      >
        Back to Home
      </a>
    </div>
  );
}

export default function App() {
  return (
    <Router future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
      <ScrollToTop />
      <AppLayout />
    </Router>
  );
}