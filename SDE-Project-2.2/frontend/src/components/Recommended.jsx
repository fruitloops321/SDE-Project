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

/* Meta data */
const meta = [
    {
        id: "kite-runner",
        title: "The Kite Runner",
        author: "Khaled Hosseini",
        publishedDate: "2003",
        desc: "A powerful and emotional story about friendship, betrayal...",
    },
    {
        id: "atomic-habits",
        title: "Atomic Habits",
        author: "James Clear",
        publishedDate: "2018",
        desc: "Atomic Habits offers a practical and powerful framework...",
    },
    {
        id: "power",
        title: "Power",
        author: "Robert Greene",
        publishedDate: "1998",
        desc: "A deep and strategic exploration of influence and authority...",
    },
    {
        id: "year-living-curiously",
        title: "A Year Of Living Curiously",
        author: "Jeffrey Brown",
        publishedDate: "2021",
        desc: "A reflective and motivational journey exploring curiosity...",
    },
    {
        id: "crime-and-punishment",
        title: "Crime And Punishment",
        author: "Fyodor Dostoevsky",
        publishedDate: "1866",
        desc: "A psychological masterpiece about guilt, justice, and morality...",
    },
    {
        id: "strange-houses",
        title: "Strange Houses",
        author: "Uketsu",
        publishedDate: "2020",
        desc: "A chilling exploration of eerie and mysterious homes...",
    },
];

/* ------------------------------------------------------------- */
/* 🔥 ADDED: function now accepts searched books from Dashboard  */
/* ------------------------------------------------------------- */
export default function Recommended({ books }) {
    const { openBookDetails } = useBookDetails();

    /* -------------------------------------------- */
    /* 🔍 SEARCH MODE — if books is provided         */
    /* -------------------------------------------- */
    if (Array.isArray(books)) {
        // No results
        if (books.length === 0) {
            return (
                <div className="panel recommended">
                    <div className="title">Recommended</div>
                    <p style={{ color: "white", marginTop: 20 }}>No books found.</p>
                </div>
            );
        }

        // Show search results in a grid
        return (
            <div className="panel recommended">
                <div className="title">Search Results</div>

                <div style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(auto-fill, minmax(140px, 1fr))",
                    gap: "20px",
                    padding: "20px 0"
                }}>
                    {books.map((book) => (
                        <div key={book.id} className="book">
                            <img
                                src={book.coverurl}
                                alt={book.title}
                                style={{ width: "100%", borderRadius: 12, cursor: "pointer" }}
                                onClick={() => openBookDetails(book)}
                                onError={(e) => {
                                    e.target.onerror = null;
                                    e.target.src = "https://via.placeholder.com/140x200?text=Book";
                                }}
                            />
                            <div style={{ marginTop: 6, color: "white" }}>
                                <strong>{book.title}</strong>
                                <p style={{ opacity: 0.7 }}>{book.author}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        );
    }

    /* ------------------------------------------------------------- */
    /* 🔄 ORIGINAL CAROUSEL — UNCHANGED (runs when NOT searching)    */
    /* ------------------------------------------------------------- */

    const [centerIndex, setCenterIndex] = useState(2);
    const listRef = useRef(null);
    const itemRef = useRef(null);
    const [itemWidth, setItemWidth] = useState(0);
    const gap = 50;

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
        return 0;
    };

    const next = () => setCenterIndex((prev) => (prev + 1) % covers.length);
    const prev = () => setCenterIndex((prev) => (prev - 1 + covers.length) % covers.length);

    const info = meta[centerIndex % meta.length] || { title: "", desc: "" };

    return (
        <div className="panel recommended" style={{ overflow: "hidden" }}>
            <div className="title">Recommended</div>

            <div className="book-row" style={{ position: "relative", alignItems: "center" }}>
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
                        padding: "0 60px",
                    }}
                >
                    {visible.map((idx, pos) => {
                        const isCenter = pos === 2;

                        const bookData = {
                            id: meta[idx].id,
                            title: meta[idx].title,
                            author: meta[idx].author,
                            rating: 4.0,
                            publishedDate: meta[idx].publishedDate,
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
                                ref={pos === 0 ? itemRef : null}
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
                                    onClick={() => openBookDetails(bookData)}
                                    style={{
                                        width: "100%",
                                        height: "100%",
                                        objectFit: "cover",
                                        borderRadius: 12,
                                        cursor: "pointer",
                                    }}
                                />
                            </div>
                        );
                    })}
                </div>

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
                <strong style={{ display: "block", marginBottom: 6 }}>{info.title}</strong>
                <span style={{ color: "rgba(255,255,255,0.85)" }}>{info.desc}</span>
            </div>
        </div>
    );
}
