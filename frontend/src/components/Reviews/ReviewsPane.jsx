// src/components/Reviews/ReviewsPane.jsx
import React, { useEffect, useRef, useState } from "react";
import "/src/components/Reviews/reviews-pane.css";


/* const sampleReviews = [
  { id: "r1", name: "John Staten M.", rating: 4, text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum lorem justo, aliquam at tristique a, rutrum at arcu. Vivamus gravida..." },
  { id: "r2", name: "Anna Berg", rating: 5, text: "Short review. Praesent et tincidunt odio. Fusce. Great book, loved the style and exercises." },
  { id: "r3", name: "Sam Patel", rating: 3, text: "An honest take on the topic. Interesting observations and some slower chapters." },
  { id: "r4", name: "L. Nguyen", rating: 4, text: "Enjoyed the exercises and the mindset perspective. Helpful and practical." },
  { id: "r5", name: "M. O'Connor", rating: 4, text: "Great book. Worth rereading, plenty of actionable ideas." },
  { id: "r6", name: "Rina C.", rating: 5, text: "Practical & actionable. Great for habit building and consistent improvement." },
]; */

function mod(n, m) {
  return ((n % m) + m) % m;
}

export default function ReviewsPane({ reviews = sampleReviews }) {
  const n = reviews.length;
  const [centerIndex, setCenterIndex] = useState(0); // index in reviews array that is center
  const animRef = useRef(false);

  // Advance to next centered review
  const next = () => {
    if (animRef.current) return;
    animRef.current = true;
    setCenterIndex((i) => mod(i + 1, n));
    // throttle animation lock
    setTimeout(() => (animRef.current = false), 320);
  };

  // Move to previous
  const prev = () => {
    if (animRef.current) return;
    animRef.current = true;
    setCenterIndex((i) => mod(i - 1, n));
    setTimeout(() => (animRef.current = false), 320);
  };

  // generate the 3 visible indices (top, center, bottom)
  const visibleIndices = [
    mod(centerIndex - 1, n),
    centerIndex,
    mod(centerIndex + 1, n),
  ];

  // handle wheel: up to prev, down to next (debounced)
  useEffect(() => {
    let wheelTimer = null;
    const onWheel = (e) => {
      if (wheelTimer) return;
      if (e.deltaY > 10) next();
      else if (e.deltaY < -10) prev();
      wheelTimer = setTimeout(() => {
        wheelTimer = null;
      }, 250);
    };

    // add listener to the pane container
    const el = containerRef.current;
    if (el) el.addEventListener("wheel", onWheel, { passive: true });

    return () => {
      if (el) el.removeEventListener("wheel", onWheel);
      if (wheelTimer) clearTimeout(wheelTimer);
    };
  }, [n]);

  // touch gestures (swipe)
  const touchStartY = useRef(null);
  const containerRef = useRef(null);
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const onTouchStart = (e) => {
      touchStartY.current = e.touches[0].clientY;
    };
    const onTouchEnd = (e) => {
      if (touchStartY.current == null) return;
      const endY = e.changedTouches[0].clientY;
      const diff = touchStartY.current - endY;
      if (Math.abs(diff) > 30) {
        if (diff > 0) next();
        else prev();
      }
      touchStartY.current = null;
    };
    el.addEventListener("touchstart", onTouchStart, { passive: true });
    el.addEventListener("touchend", onTouchEnd, { passive: true });
    return () => {
      el.removeEventListener("touchstart", onTouchStart);
      el.removeEventListener("touchend", onTouchEnd);
    };
  }, []);

  // Keyboard navigation (ArrowUp/ArrowDown)
  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "ArrowDown") next();
      else if (e.key === "ArrowUp") prev();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [n]);

  return (
    <div className="reviews-pane" ref={containerRef} tabIndex={0} aria-label="Reviews pane">

      {/* FADE TRANSITION WRAPPER */}
     <div className="reviews-fade-wrapper">
        <div className="reviews-visible">
          {visibleIndices.map((idx, pos) => {
            const r = reviews[idx];
            const state = pos === 1 ? "center" : pos === 0 ? "top" : "bottom";

            return (
              <article key={r.id} className={`review-card ${state}`} aria-hidden={pos !== 1}>
                <div className="review-avatar">
                  {r.name.split(" ").map(s=>s[0]).slice(0,2).join("")}
                </div>

                <div className="review-text-block">
                  <div className="reviewer-row">
                    <div className="reviewer-name">{r.name}</div>
                    <div className="review-stars">
                      {"★".repeat(r.rating) + "☆".repeat(5 - r.rating)}
                    </div>
                  </div>

                  <p className="review-text">{r.text}</p>
                </div>
              </article>
            );
          })}
        </div>
      </div>

      {/* Invisible controls */}
      <div className="reviews-controls">
        <button className="tiny-btn prev" onClick={prev}>‹</button>
        <button className="tiny-btn next" onClick={next}>›</button>
      </div>

    </div>
  );

}
