import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './ProductCard.css';

export default function ProductCard({ product }) {
  const { id, name, tag, material, diameter, description, image } = product;
  const [imgError, setImgError] = useState(false);

  return (
    <Link to={`/products/${id}`} className="product-card">
      <div className="product-card__img-wrap">
        {image && !imgError ? (
          <img
            src={image}
            alt={name}
            className="product-card__img"
            onError={() => setImgError(true)}
          />
        ) : (
          <div className="product-card__img-placeholder">
            <svg viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
              <circle cx="40" cy="40" r="28" stroke="#1E3A5F" strokeWidth="2" strokeDasharray="6 3" fill="none"/>
              <circle cx="40" cy="40" r="16" stroke="#C8102E" strokeWidth="2" fill="none"/>
              <circle cx="40" cy="40" r="5" fill="#1E3A5F"/>
            </svg>
          </div>
        )}
        <div className="product-card__overlay">
          <span className="product-card__cta-pill">View Details →</span>
        </div>
        {tag && <span className="product-card__tag">{tag}</span>}
      </div>

      <div className="product-card__body">
        <div className="product-card__accent-bar"/>
        <h3 className="product-card__name">{name}</h3>
        <p className="product-card__desc">{description}</p>
        <div className="product-card__meta">
          {material && (
            <span className="product-card__meta-item">
              <span className="product-card__meta-label">Material</span>
              {material}
            </span>
          )}
          {diameter && diameter !== '—' && (
            <span className="product-card__meta-item">
              <span className="product-card__meta-label">Size</span>
              {diameter}
            </span>
          )}
        </div>
      </div>
    </Link>
  );
}