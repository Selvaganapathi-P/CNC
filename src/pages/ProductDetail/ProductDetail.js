import React, { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import ProductImage from "../../components/ProductImage/ProductImage";
import { getProductById } from '../../data/products';
import './ProductDetail.css';

const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const product = getProductById(id);
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

  const { name, tag, material, image, description, specs, images } = product;

  return (
    <main className="product-detail">
      {/* Hero */}
      <div className="pd-hero">
        <div className="pd-hero__svg-bg">
          <ProductImage productId={product.id} />
        </div>
        <div className="pd-hero__overlay" />
        <div className="container pd-hero__content">
          <button className="pd-hero__back" onClick={() => navigate(-1)}>
            ← Back to Products
          </button>
          <div className="pd-hero__meta">
            {tag && <span className="badge badge-red">{tag}</span>}
            <h1 className="pd-hero__title display-title">{name}</h1>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="container pd-body">
        <div className="pd-grid">
          {/* Left — Info */}
          <div className="pd-info">
            <div className="pd-section">
              <h2 className="pd-section__title">Overview</h2>
              <div className="red-line" />
              <p className="pd-description">{description}</p>
            </div>

            {/* Specs Table */}
            <div className="pd-section">
              <h2 className="pd-section__title">Specifications</h2>
              <div className="red-line" />
              <table className="pd-specs-table">
                <tbody>
                  {Object.entries(specs).map(([key, val], i) => (
                    <tr key={key} className="pd-specs-row" style={{animationDelay:`${i*0.08}s`}}>
                      <td className="pd-specs-key">{key}</td>
                      <td className="pd-specs-val">{val}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="pd-cta">
              <Link to="/contact" className="btn btn-primary">
                Request a Quote →
              </Link>
              <Link to="/products" className="btn btn-outline">
                ← All Products
              </Link>
            </div>
          </div>

          {/* Right — Gallery */}
          <div className="pd-gallery">
            <h2 className="pd-section__title">Product Illustration</h2>
            <div className="red-line" />
            <div className="pd-gallery__main">
              <ProductImage productId={product.id} />
            </div>

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
          <img src={lightbox} alt="Product view" onClick={e => e.stopPropagation()} />
        </div>
      )}
    </main>
  );
};

export default ProductDetail;