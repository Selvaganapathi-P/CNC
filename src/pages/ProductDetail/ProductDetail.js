import React, { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { getProductById } from '../../data/products';
import './ProductDetail.css';

const ProductDetail = () => {
  const { id }     = useParams();
  const navigate   = useNavigate();
  const product    = getProductById(id);
  const [selected, setSelected] = useState(0);
  const [lightbox, setLightbox] = useState(null);

  if (!product) {
    return (
      <div className="product-not-found">
        <div className="container">
          <h2>Product not found</h2>
          <Link to="/products" className="btn btn-primary">← Back to Products</Link>
        </div>
      </div>
    );
  }

  const { name, tag, material, image, description, specs } = product;

  // Build gallery — real image first, then any extras
  const gallery = [image].filter(Boolean);

  return (
    <main className="product-detail">

      {/* ── HERO ── */}
      <div className="pd-hero">
        <div className="pd-hero__bg"/>
        <div className="container pd-hero__content">
          <button className="pd-hero__back" onClick={() => navigate(-1)}>
            ← Back to Products
          </button>
          <div className="pd-hero__meta">
            {tag && <span className="pd-hero__tag">{tag}</span>}
            <h1 className="pd-hero__title">{name}</h1>
          </div>
        </div>
      </div>

      {/* ── BODY ── */}
      <div className="container pd-body">
        <div className="pd-grid">

          {/* Left — Info */}
          <div className="pd-info">
            <div className="pd-section">
              <h2 className="pd-section__title">Overview</h2>
              <div className="red-line"/>
              <p className="pd-description">{description}</p>
            </div>

            <div className="pd-section">
              <h2 className="pd-section__title">Specifications</h2>
              <div className="red-line"/>
              <table className="pd-specs-table">
                <tbody>
                  {Object.entries(specs).map(([key, val], i) => (
                    <tr key={key} className="pd-specs-row" style={{animationDelay:`${i*0.07}s`}}>
                      <td className="pd-specs-key">{key}</td>
                      <td className="pd-specs-val">{val}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="pd-cta">
              <Link to="/contact" className="btn btn-primary">Request a Quote →</Link>
              <Link to="/products" className="btn btn-outline">← All Products</Link>
            </div>
          </div>

          {/* Right — Gallery (real images) */}
          <div className="pd-gallery">
            <h2 className="pd-section__title">Product Image</h2>
            <div className="red-line"/>

            {/* Main image */}
            <div className="pd-gallery__main" onClick={() => gallery[selected] && setLightbox(gallery[selected])}>
              {gallery[selected] ? (
                <img
                  src={gallery[selected]}
                  alt={name}
                  className="pd-gallery__main-img"
                />
              ) : (
                <div className="pd-gallery__placeholder">
                  <svg viewBox="0 0 100 100" fill="none">
                    <circle cx="50" cy="50" r="36" stroke="#1E3A5F" strokeWidth="2" strokeDasharray="6 3" fill="none"/>
                    <circle cx="50" cy="50" r="20" stroke="#C8102E" strokeWidth="2" fill="none"/>
                    <circle cx="50" cy="50" r="6" fill="#1E3A5F"/>
                  </svg>
                </div>
              )}
              {gallery[selected] && (
                <div className="pd-gallery__zoom-hint">
                  <span>🔍 Click to enlarge</span>
                </div>
              )}
            </div>

            {/* Thumbnails row if multiple */}
            {gallery.length > 1 && (
              <div className="pd-gallery__thumbs">
                {gallery.map((img, i) => (
                  <button
                    key={i}
                    className={`pd-gallery__thumb ${i === selected ? 'pd-gallery__thumb--active' : ''}`}
                    onClick={() => setSelected(i)}
                  >
                    <img src={img} alt={`${name} ${i+1}`}/>
                  </button>
                ))}
              </div>
            )}

            {/* Material card */}
            <div className="pd-material-card">
              <div className="pd-material-card__icon">⚙️</div>
              <div>
                <span className="pd-material-card__label">Primary Material</span>
                <span className="pd-material-card__value">{material}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Lightbox */}
      {lightbox && (
        <div className="lightbox" onClick={() => setLightbox(null)}>
          <button className="lightbox__close" onClick={() => setLightbox(null)}>✕</button>
          <img src={lightbox} alt={name} onClick={e => e.stopPropagation()}/>
        </div>
      )}
    </main>
  );
};

export default ProductDetail;