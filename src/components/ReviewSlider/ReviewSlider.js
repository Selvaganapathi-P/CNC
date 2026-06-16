import React, { useState, useEffect, useCallback } from 'react';
import './ReviewSlider.css';

const ReviewSlider = ({ reviews }) => {
  const [active, setActive] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  const next = useCallback(() => {
    setActive(p => (p + 1) % reviews.length);
  }, [reviews.length]);

  const prev = () => {
    setActive(p => (p - 1 + reviews.length) % reviews.length);
  };

  useEffect(() => {
    if (isHovered) return;
    const t = setInterval(next, 4500);
    return () => clearInterval(t);
  }, [next, isHovered]);

  const r = reviews[active];

  const renderStars = (rating) =>
    Array.from({ length: 5 }, (_, i) => (
      <span key={i} className={i < rating ? 'star star--filled' : 'star'}>★</span>
    ));

  return (
    <div
      className="review-slider"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="review-slider__track">
        <div className="review-slider__card">
          <div className="review-slider__quote">"</div>
          <p className="review-slider__text">{r.review}</p>
          <div className="review-slider__stars">{renderStars(r.rating)}</div>
          <div className="review-slider__author">
            <div className="review-slider__avatar">
              <img
                src={r.avatar}
                alt={r.name}
                onError={e => {
                  e.target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(r.name)}&background=C0161C&color=fff&size=80`;
                }}
              />
            </div>
            <div>
              <strong className="review-slider__name">{r.name}</strong>
              <span className="review-slider__designation">{r.designation}</span>
              <span className="review-slider__company">{r.company}</span>
            </div>
          </div>
        </div>
      </div>

      <div className="review-slider__controls">
        <button className="review-slider__btn" onClick={prev} aria-label="Previous review">
          <svg viewBox="0 0 20 20" fill="none"><path d="M12 15l-5-5 5-5" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/></svg>
        </button>
        <div className="review-slider__dots">
          {reviews.map((_, i) => (
            <button
              key={i}
              className={`review-slider__dot ${i === active ? 'review-slider__dot--active' : ''}`}
              onClick={() => setActive(i)}
              aria-label={`Review ${i + 1}`}
            />
          ))}
        </div>
        <button className="review-slider__btn" onClick={next} aria-label="Next review">
          <svg viewBox="0 0 20 20" fill="none"><path d="M8 5l5 5-5 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/></svg>
        </button>
      </div>
    </div>
  );
};

export default ReviewSlider;