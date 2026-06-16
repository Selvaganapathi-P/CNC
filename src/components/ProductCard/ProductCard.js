import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import ProductImage from '../ProductImage/ProductImage';
import './ProductCard.css';

const ACCENTS = [
  { border: '#00C8E0', glow: 'rgba(0,200,224,0.2)', tag: '#00C8E0', tagBg: 'rgba(0,200,224,0.1)' },
  { border: '#D4AF37', glow: 'rgba(212,175,55,0.2)',  tag: '#D4AF37', tagBg: 'rgba(212,175,55,0.1)' },
  { border: '#10B981', glow: 'rgba(16,185,129,0.2)', tag: '#10B981', tagBg: 'rgba(16,185,129,0.1)' },
  { border: '#8B5CF6', glow: 'rgba(139,92,246,0.2)', tag: '#8B5CF6', tagBg: 'rgba(139,92,246,0.1)' },
  { border: '#F59E0B', glow: 'rgba(245,158,11,0.2)', tag: '#F59E0B', tagBg: 'rgba(245,158,11,0.1)' },
  { border: '#C8102E', glow: 'rgba(200,16,46,0.2)',  tag: '#FF6B6B', tagBg: 'rgba(200,16,46,0.1)' },
];

export default function ProductCard({ product }) {
  const { id, name, tag, material, diameter, description, image, credit } = product;
  const accent = ACCENTS[(id - 1) % ACCENTS.length];
  const [imgError, setImgError] = useState(false);

  return (
    <Link
      to={`/products/${id}`}
      className="product-card"
      style={{ '--accent': accent.border, '--accent-glow': accent.glow, '--tag-clr': accent.tag, '--tag-bg': accent.tagBg }}
    >
      <div className="product-card__img-wrap">
        {image && !imgError ? (
          <img
            src={image}
            alt={name}
            className="product-card__real-img"
            onError={() => setImgError(true)}
          />
        ) : (
          <ProductImage productId={id} />
        )}
        <div className="product-card__overlay">
          <span className="product-card__cta">View Details →</span>
        </div>
        {tag && <span className="product-card__tag">{tag}</span>}
        <div className="product-card__corner product-card__corner--tl"/>
        <div className="product-card__corner product-card__corner--br"/>
        {credit && <span className="product-card__credit">{credit}</span>}
      </div>

      <div className="product-card__body">
        <div className="product-card__accent-line"/>
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