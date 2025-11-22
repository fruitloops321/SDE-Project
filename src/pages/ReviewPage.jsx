// src/pages/ReviewPage.jsx
import React, { useState, useCallback, useMemo } from "react";
import "/src/styles/reviewPage.css";

const TRENDING_TITLES = [
    "You Are Here",
    "The Wild Robot",
    "Strangers House",
    "Save me an orange",
    "Norwegian Wood",
    "Before the Coffee Gets Cold",
    "James",
    "Flowers for Algernon",
    "Conversations with Friends",
    "The Midnight Library",
];

const REVIEW_ROWS = [
    {
        id: "you-are-here",
        title: "You Are Here",
        username: "@instantNoodles1",
        rating: "★★★★★",
        coverUrl: "/src/assets/yah.jpg",
        text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum lorem justo, aliquam at tristique a, rutrum at arcu. Vivamus gravida...",
    },
    {
        id: "strange-houses",
        title: "Strange Houses",
        username: "@instantNoodles5",
        rating: "★★★★☆",
        coverUrl: "/src/assets/cover6.jpg",
        text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum lorem justo, aliquam at tristique a, rutrum at arcu.",
    },
    {
        id: "year-of-living-curiously",
        title: "A Year of Living Curiously",
        username: "@instantNoodles9",
        rating: "★★★★★",
        coverUrl: "/src/assets/cover4.jpg",
        text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum lorem justo, aliquam at tristique a, rutrum at arcu.",
    },
    {
        id: "welcome-hyunam",
        title: "Welcome to the Hyunam-Dong Bookshop",
        username: "@enviroReads",
        rating: "★★★★☆",
        coverUrl: "/src/assets/cover8.jpg",
        text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum lorem justo, aliquam at tristique a, rutrum at arcu.",
    },
];

export default function ReviewPage() {
    const VISIBLE_SLOTS = 4;

    const [cursor, setCursor] = useState(0);
    const total = REVIEW_ROWS.length;

    // scroll step logic
    const step = useCallback(
        (direction) => {
            setCursor((prev) => {
                const next = (prev + direction + total) % total;
                return next;
            });
        },
        [total]
    );

    // prepare the 4 visible items
    const visibleReviews = useMemo(
        () =>
            Array.from({ length: VISIBLE_SLOTS }, (_, i) => {
                const index = (cursor + i) % total;
                return { item: REVIEW_ROWS[index], slotIndex: i, key: index };
            }),
        [cursor, total]
    );

    // mouse wheel scrolling
    const handleWheel = useCallback(
        (e) => {
            if (e.deltaY > 0) step(1);
            else if (e.deltaY < 0) step(-1);
        },
        [step]
    );

    return (
        <div className="review-page">
            <div className="panel review-panel">

                {/* HEADER */}
                <div className="review-header">
                    <h2 className="review-title">Reviews</h2>
                    <div className="review-filter">All ▾</div>
                </div>

                <div className="review-main">

                    {/* LEFT COLUMN */}
                    <aside className="review-left">
                        <div className="review-left-inner">
                            <p className="review-left-heading">Trending book this week</p>
                            <ol className="review-trending-list">
                                {TRENDING_TITLES.map((title, index) => (
                                    <li key={title} className="review-trending-item">
                                        <span className="review-trending-index">{index + 1}.</span>
                                        <span className="review-trending-title">{title}</span>
                                    </li>
                                ))}
                            </ol>
                        </div>
                    </aside>

                    {/* RIGHT COLUMN — review wheel */}
                    <div className="review-right">

                        <div className="reviews-right-list" onWheel={handleWheel}>
                            {visibleReviews.map(({ item, slotIndex, key }) => (
                                <div className={`review-row slot-${slotIndex}`} key={key}>

                                    {/* LEFT — cover + meta */}
                                    <div className="review-row-left">
                                        <div className="review-cover">
                                            <img src={item.coverUrl} alt={item.title} />
                                        </div>

                                        <div className="review-book-meta">
                                            <div className="review-book-title">{item.title}</div>
                                            <div className="review-book-rating">{item.rating}</div>
                                        </div>
                                    </div>

                                    {/* MIDDLE — review text */}
                                    <div className="review-row-middle">
                                        <p className="review-row-text">{item.text}</p>
                                    </div>

                                    {/* RIGHT — user */}
                                    <div className="review-row-right">
                                        <span className="review-row-username">{item.username}</span>
                                        <span className="review-row-icon">◎</span>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* arrow buttons */}
                        <div className="reviews-nav-buttons">
                            <button
                                type="button"
                                className="nav-arrow nav-arrow-up"
                                onClick={() => step(-1)}
                            >
                                ↑
                            </button>
                            <button
                                type="button"
                                className="nav-arrow nav-arrow-down"
                                onClick={() => step(1)}
                            >
                                ↓
                            </button>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    );
}
