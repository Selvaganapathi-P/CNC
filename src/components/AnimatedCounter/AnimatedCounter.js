import React, { useState, useEffect, useRef } from 'react';
import './AnimatedCounter.css';

const AnimatedCounter = ({ value, end, suffix = '', prefix = '', duration = 1800, label, sublabel }) => {
  const target = value ?? end ?? 0;
  const [count, setCount] = useState(0);
  const [started, setStarted] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started) {
          setStarted(true);
        }
      },
      { threshold: 0.5 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [started]);

  useEffect(() => {
    if (!started) return;
    let startTime = null;

    const step = (timestamp) => {
      if (!startTime) startTime = timestamp;
      const elapsed = timestamp - startTime;
      const progress = Math.min(elapsed / duration, 1);
      // Ease out cubic
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(eased * target));
      if (progress < 1) requestAnimationFrame(step);
      else setCount(target);
    };

    requestAnimationFrame(step);
  }, [started, target, duration]);

  return (
    <div className="counter" ref={ref}>
      <div className="counter__value">
        {prefix}<span className="counter__num">{count}</span>{suffix}
      </div>
      <div className="counter__label">{label}</div>
      {sublabel && <div className="counter__sublabel">{sublabel}</div>}
    </div>
  );
};

export default AnimatedCounter;