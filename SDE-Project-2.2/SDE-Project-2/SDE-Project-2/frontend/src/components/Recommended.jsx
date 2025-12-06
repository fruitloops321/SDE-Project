/* // Recommended.jsx / RecommendedCarousel.jsx */
import React, { useEffect, useRef, useState } from "react";
import "/src/styles/recommended.css";
import { useBookDetails } from "/src/book-details/BookDetailsContext.jsx";

/* Cover images */
const covers = [
    "/src/assets/cover1.jpg",
    "/src/assets/cover2.jpg",
    "/src/assets/cover3.jpg",
    "/src/assets/cover4.jpg",
    "/src/assets/cover5.jpg",
    "/src/assets/cover6.jpg",
];

/**
 * meta now includes a stable id for each book.
 * That id will be used by the BookDetails modal to save/unsave correctly.
 */
const meta = [
    {
        id: "kite-runner",
        title: "The Kite Runner",
        desc: "Story about friendship, betrayal, and redemption as Amir seeks to make peace with a painful childhood mistake.",
    },
    {
        id: "atomic-habits",
        title: "Atomic Habits",
        desc: "A guide to building better habits through small, consistent changes.",
    },
    {
        id: "power",
        title: "Power",
        desc: "An exploration of strategies for gaining, using, and defending power.",
    },
    {
        id: "year-living-curiously",
        title: "A Year Of Living Curiously",
        desc: "A journey of trying new experiences to break routine and discover personal growth.",
    },
    {
        id: "crime-and-punishment",
        title: "Crime And Punishment",
        desc: "A psychological drama about guilt and morality as a man faces the consequences of a murder.",
    },
    {
        id: "strange-houses",
        title: "Strange Houses",
        desc: "A collection of unusual, mysterious homes and the stories hidden within their walls.",
    },
];

export default function Recommended() {
    const [centerIndex, setCenterIndex] = useState(2); // start with third item in center
    const listRef = useRef(null);
    const itemRef = useRef(null);
    const [itemWidth, setItemWidth] = useState(0);
    const gap = 50; // must match your .book-row gap in CSS
    const { openBookDetails } = useBookDetails();

    // Measure one item so we can compute transforms
    useEffect(() => {
        const el = itemRef.current;
        if (el) {
            setItemWidth(el.getBoundingClientRect().width);
        } else {
            setItemWidth(140);
        }

        const onResize = () => {
            const el2 = itemRef.current;
            if (el2) setItemWidth(el2.getBoundingClientRect().width);
        };

        window.addEventListener("resize", onResize);
        return () => window.removeEventListener("resize", onResize);
    }, []);

    // Indices of 5 visible items around centerIndex
    const getVisibleIndices = () => {
        const n = covers.length;
        const indices = [];
        for (let i = -2; i <= 2; i++) {
            indices.push((centerIndex + i + n) % n);
        }
        return indices;
    };

    const visible = getVisibleIndices();

    const computeTranslate = () => {
        if (!itemWidth) return 0;
        // In your current layout we don't need an extra shift,
        // but you can tweak this if you later change the design.
        const shift = (itemWidth + gap) * 0;
        return -shift;
    };

    const next = () => setCenterIndex((prev) => (prev + 1) % covers.length);
    const prev = () => setCenterIndex((prev) => (prev - 1 + covers.length) % covers.length);

    const info = meta[centerIndex % meta.length] || { title: "", desc: "" };

    return (
        <div className="panel recommended" style={{ overflow: "hidden" }}>
            <div className="title">Recommended</div>

            <div className="book-row" style={{ position: "relative", alignItems: "center" }}>
                {/* LEFT ARROW */}
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

                {/* BOOK LIST */}
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
                        padding: "0 60px",
                    }}
                >
                    {visible.map((idx, pos) => {
                        const isCenter = pos === 2;

                        // Build a single consistent book object that will be passed to the details modal
                        const bookData = {
                            id: meta[idx].id,              // ✅ stable ID
                            title: meta[idx].title,
                            author: "Author Name",
                            rating: 4.0,
                            publishedDate: "2020",
                            description: meta[idx].desc,
                            genres: ["Fantasy", "Drama"],
                            format: "Hardcover",
                            pages: 300,
                            coverUrl: covers[idx],
                        };

                        return (
                            <div
                                key={meta[idx].id}
                                className={`book ${isCenter ? "active" : ""}`}
                                ref={pos === 0 ? itemRef : null} // measure first visible item
                                style={{
                                    transform: isCenter ? "scale(1.1)" : "scale(0.8)",
                                    transition: "transform 350ms ease, opacity 300ms ease",
                                    opacity: isCenter ? 1 : 0.5,
                                    zIndex: isCenter ? 3 : 1,
                                }}
                            >
                                <img
                                    src={covers[idx]}
                                    alt={`cover-${idx}`}
                                    onClick={() => openBookDetails(bookData)}  // ✅ only opens modal
                                    style={{
                                        width: "100%",
                                        height: "100%",
                                        objectFit: "cover",
                                        borderRadius: 12,
                                        cursor: "pointer",
                                    }}
                                    onError={(e) => {
                                        e.target.onerror = null;
                                        e.target.src =
                                            "https://via.placeholder.com/140x200?text=Book";
                                    }}
                                />
                            </div>
                        );
                    })}
                </div>

                {/* RIGHT ARROW */}
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

            {/* DESCRIPTION (under carousel) */}
            <div className="desc" style={{ marginTop: 12 }}>
                <strong style={{ display: "block", marginBottom: 6 }}>{info.title}</strong>
                <span style={{ color: "rgba(255,255,255,0.85)" }}>{info.desc}</span>
            </div>
        </div>
    );
}
