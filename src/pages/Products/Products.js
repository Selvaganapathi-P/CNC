import React, { useState } from 'react';
import ProductCard from '../../components/ProductCard/ProductCard';
import ReviewSlider from '../../components/ReviewSlider/ReviewSlider';
import useScrollReveal from '../../hooks/useScrollReveal';
import { products } from '../../data/products';
import { reviews } from '../../data/reviews';
import './Products.css';

export default function Products() {
  const [activeCategory, setActiveCategory] = useState('all');
  const gridRef = useScrollReveal();

  const categories = [
    { label: 'All Products', value: 'all',       count: products.length },
    { label: 'Aerospace',    value: 'aerospace',  count: products.filter(p => p.category === 'aerospace').length },
    { label: 'Defence',      value: 'defence',    count: products.filter(p => p.category === 'defence').length },
  ];

  const filtered = activeCategory === 'all' ? products : products.filter(p => p.category === activeCategory);

  return (
    <main className="products-page">
      <section className="page-hero">
        <div className="page-hero__bg"/>
        <div className="container page-hero__content">
          <p className="page-hero__tag">Manufacturing Excellence</p>
          <h1 className="page-hero__title display">Our Products</h1>
          <p className="page-hero__sub">Precision-engineered components for ISRO, BrahMos, L&amp;T and India's most demanding aerospace programmes.</p>
        </div>
      </section>

      <div className="page-hero__filter-bar">
        <div className="container">
          <div className="filter-bar">
            {categories.map(c => (
              <button
                key={c.value}
                className={`filter-btn ${activeCategory === c.value ? 'filter-btn--active' : ''}`}
                onClick={() => setActiveCategory(c.value)}
              >
                {c.label}
                <span className="filter-btn__count">{c.count}</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      <section className="section" ref={gridRef}>
        <div className="container">
          {filtered.length > 0 ? (
            <div className="products-grid stagger">
              {filtered.map((p) => (
                <div key={p.id} className="reveal">
                  <ProductCard product={p}/>
                </div>
              ))}
            </div>
          ) : (
            <p className="products-empty">No products found.</p>
          )}
        </div>
      </section>

      <section className="section bg-indigo-lt">
        <div className="container">
          <p className="eyebrow" style={{ justifyContent: 'center' }}>Client Testimonials</p>
          <h2 className="section-title" style={{ textAlign: 'center', marginBottom: '3rem' }}>What Our Clients Say</h2>
          <ReviewSlider reviews={reviews}/>
        </div>
      </section>
    </main>
  );
}