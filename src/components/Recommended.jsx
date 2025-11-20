/* // RecommendedCarousel.jsx */
import React, { useEffect, useRef, useState } from "react";
import "/src/styles/recommended.css";
import { useBookDetails } from "/src/book-details/BookDetailsContext.jsx";
import Saved from "/src/pages/Saved.jsx";


/* If you have images in src/assets, import them:
   import cover1 from '/src/assets/cover1.jpg';
   import cover2 from '/src/assets/cover2.jpg';
   ...
   Then set covers = [cover1, cover2, ...]
*/
const covers = [
  '/src/assets/cover1.jpg',
  '/src/assets/cover2.jpg',
  '/src/assets/cover3.jpg',
  '/src/assets/cover4.jpg',
  '/src/assets/cover5.jpg',
  '/src/assets/cover6.jpg',
  // add as many as you want
];

const meta = [
  { title: "Book A", desc: "Description A" },
  { title: "Book B", desc: "Description B" },
  { title: "Book C", desc: "Description C" },
  { title: "Book D", desc: "Description D" },
  { title: "Book E", desc: "Description E" },
  { title: "Book F", desc: "Description F" },
];

export default function Recommended() {
  // index refers to index in covers/meta arrays (0..n-1)
  const [centerIndex, setCenterIndex] = useState(2); // start with third item as center
  const listRef = useRef(null);
  const itemRef = useRef(null);
  const [itemWidth, setItemWidth] = useState(0);
  const gap = 50; // must match your .book-row gap in px
  const { openBookDetails } = useBookDetails();

  useEffect(() => {
    // measure item width once mounted (works if items already have CSS width)
    const el = itemRef.current;
    if (el) {
      const rect = el.getBoundingClientRect();
      setItemWidth(rect.width);
    } else {
      // fallback to approximate width if not measured
      setItemWidth(140);
    }

    // Re-measure on window resize
    const onResize = () => {
      const el2 = itemRef.current;
      if (el2) setItemWidth(el2.getBoundingClientRect().width);
    };
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  // helper to compute the visible window (5 items) centered at centerIndex
  const getVisibleIndices = () => {
    const n = covers.length;
    const indices = [];
    for (let i = -2; i <= 2; i++) {
      indices.push((centerIndex + i + n) % n);
    }
    return indices;
  };

  const visible = getVisibleIndices();

  // compute translateX so center item is visually centered in the container:
  // we position .book-list such that the center visible element is in the center
  // The container visible width depends on 5 items -> 5 * itemWidth + 4 * gap
  // We want translateX so the first visible item is at 0, and then shift left by some offset
  const computeTranslate = () => {
    if (!itemWidth) return 0;               // When we render visible[] in order, the center element is at position 2 (0-based)
    const shift = (itemWidth + gap) * 0;    // So we want to shift the whole row left by ( (itemWidth + gap) * 2 )
    return -shift;                          // pixels to move left
  };

  const next = () => {
    setCenterIndex((prev) => (prev + 1) % covers.length);
  };

  const prev = () => {
    setCenterIndex((prev) => (prev - 1 + covers.length) % covers.length);
  };

  // description tied to centerIndex (meta length may differ; guard it)
  const info = meta[centerIndex % meta.length] || { title: "", desc: "" };

  return (
    <div className="panel recommended" style={{ overflow: "hidden" }}>
      <div className="title">Recommended</div>

      <div className="book-row" style={{ position: "relative", alignItems: "center" }}>

        {/* left arrow inside card */}
        <button
          aria-label="previous"
          onClick={prev}
          style={{
            position: "absolute",
            left: 10,
            zIndex: 20,
            background: "transparent",
            border: "none",
            color: "#fbfbf6",
            fontSize: 40,
            cursor: "pointer",
          }}
        >
          ‹
        </button>

        <div
          className="book-list"
          ref={listRef}
          style={{
            display: "flex",
            gap: `${gap}px`,
            transition: "transform 450ms cubic-bezier(.2,.8,.2,1)",
            transform: `translateX(${computeTranslate()}px)`,
            justifyContent: "center",
            width: "100%",
            padding: "0 60px", /* keep space for arrows */
          }}
        >

          {visible.map((idx, pos) => {
            const isCenter = pos === 2;
            return (
              <div
                key={idx}
                className={`book ${isCenter ? "active" : ""}`}
                ref={pos === 0 ? itemRef : null} /* measure first item */
                style={{
                  transform: isCenter ? "scale(1.1)" : "scale(0.8)",        /* Responsible for the size of book */
                  transition: "transform 350ms ease, opacity 300ms ease",
                  opacity: isCenter ?1 : 0.5,                               /* Responsible for the opacity of the books */
                  zIndex: isCenter ? 3 : 1,
                }}
              >

                <img
                  src={covers[idx]}
                  alt={`cover-${idx}`}
                  onClick={() =>
                    openBookDetails({
                      title: meta[idx].title,
                      author: "Author Name",
                      rating: 4.0,
                      publishedDate: "2020",
                      description: meta[idx].desc,
                      genres: ["Fantasy", "Drama"],
                      format: "Hardcover",
                      pages: 300,
                      coverUrl: covers[idx],
                    })
                  }
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                    borderRadius: 12,
                  }}
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = "https://via.placeholder.com/140x200?text=Book";
                  }}
                />
              </div>
            );
          })}
        </div>

        {/* right arrow inside card */}
        <button
          aria-label="next"
          onClick={next}
          style={{
            position: "absolute",
            right: 10,
            zIndex: 20,
            background: "transparent",
            border: "none",
            color: "#fbfbf6",
            fontSize: 40,
            cursor: "pointer",
          }}
        >
          ›
        </button>
      </div>

      <div className="desc" style={{ marginTop: 12 }}>
        <strong style={{ display: "block", marginBottom: 6}}>{info.title}</strong>

        <span style={{ color: "rgba(255,255,255,0.85)" }}>{info.desc}</span>
      </div>
    </div>
  );
}
