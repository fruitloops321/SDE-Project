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
        author: "Khaled Hosseini",
        publishedDate: "2003",
        desc: "A powerful and emotional story about friendship, betrayal, and the lifelong search for redemption. Amir’s journey—from a guilt-filled childhood mistake to an adult seeking forgiveness—unfolds across a backdrop of war-torn Kabul and immigrant life in America, exploring loyalty, family, and the heavy weight of regret.",
    },
    {
        id: "atomic-habits",
        title: "Atomic Habits",
        author: "James Clear",
        publishedDate: "2018",
        desc: "“Atomic Habits” offers a practical and powerful framework for building good habits and breaking bad ones by focusing on small, consistent improvements. James Clear explains how tiny daily changes compound into remarkable long-term results, using simple psychology, real-world examples, and actionable strategies. The book teaches you how to redesign your environment, shift your identity, and create systems that make success inevitable.",
    },
    {
        id: "power",
        title: "Power",
        author: "Robert Greene",
        publishedDate: "1998",
        desc: "A deep and strategic exploration of how influence and authority function in human relationships. Greene breaks down historical examples, psychological insights, and timeless principles that reveal how people gain, protect, and lose power in both subtle and dramatic ways.",
    },
    {
        id: "year-living-curiously",
        title: "A Year Of Living Curiously",
        author: "Jeffrey Brown",
        publishedDate: "2021",
        desc: "A reflective and motivational journey that encourages stepping outside routine, embracing curiosity, and rediscovering personal passion. Through small experiments and thoughtful challenges, the book explores how cultivating curiosity can lead to meaningful growth and a deeper appreciation of everyday life.",
    },
    {
        id: "crime-and-punishment",
        title: "Crime And Punishment",
        author: "Fyodor Dostoevsky",
        publishedDate: "1866",
        desc: "A haunting psychological masterpiece that follows Raskolnikov, a tormented student who commits murder believing he can transcend moral boundaries. As guilt consumes him, the novel delves into questions of conscience, justice, suffering, and the possibility of spiritual redemption.",
    },
    {
        id: "strange-houses",
        title: "Strange Houses",
        author: "Uketsu",
        publishedDate: "2020",
        desc: "A chilling and imaginative tour through mysterious, eerie, and architecturally bizarre homes—each holding secrets that blur the line between the supernatural and the psychological. The book explores unsettling folklore, hidden histories, and the strange stories trapped within the walls.",
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
