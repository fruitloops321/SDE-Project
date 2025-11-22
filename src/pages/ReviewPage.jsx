// src/pages/ReviewPage.jsx
import React, { useState, useEffect } from "react";
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
        text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum lorem justo, aliquam at tristique a, rutrum at arcu, rutrum at arcu.",
    },
    {
        id: "welcome-hyunam",
        title: "Welcome to the Hyunam-Dong Bookshop",
        username: "@enviroReads",
        rating: "★★★★☆",
        coverUrl: "/src/assets/cover8.jpg",
        text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum lorem justo, aliquam at tristique a, rutrum at arcu. Vivamus gravida...",
    },
    // add more rows here later if you like
];

function ReviewRow({ slot, review }) {
    return (
        <div className={`review-row review-row-${slot}`}>
            {/* LEFT: cover + title + rating */}
            <div className="review-row-left">
                <div className="review-cover">
                    <img src={review.coverUrl} alt={review.title} />
                </div>
                <div className="review-book-meta">
                    <div className="review-book-title">{review.title}</div>
                    <div className="review-book-rating">{review.rating}</div>
                </div>
            </div>

            {/* MIDDLE: text */}
            <div className="review-row-middle">
                <p className="review-row-text">{review.text}</p>
            </div>

            {/* RIGHT: username + icon */}
            <div className="review-row-right">
                <span className="review-row-username">{review.username}</span>
                <span className="review-row-icon">◎</span>
            </div>
        </div>
    );
}

export default function ReviewPage() {
    const [activeIndex, setActiveIndex] = useState(0);

    // Auto-advance the wheel every 4 seconds
    useEffect(() => {
        const id = setInterval(() => {
            setActiveIndex((prev) => (prev + 1) % REVIEW_ROWS.length);
        }, 4000);

        return () => clearInterval(id);
    }, []);

    const total = REVIEW_ROWS.length;

    // Build 4 slots: above, center, below, ghost (bottom)
    const slots = [];
    const offsets = [-1, 0, 1, 2]; // relative to activeIndex

    offsets.forEach((offset) => {
        const idx = (activeIndex + offset + total) % total;
        const review = REVIEW_ROWS[idx];

        let slotName;
        if (offset === -1) slotName = "above";
        else if (offset === 0) slotName = "center";
        else if (offset === 1) slotName = "below";
        else slotName = "ghost";

        slots.push(
            <ReviewRow key={`${review.id}-${slotName}`} slot={slotName} review={review} />
        );
    });

    return (
        <div className="review-page">
            <div className="panel review-panel">
                {/* header row: title + filter */}
                <div className="review-header">
                    <h2 className="review-title">Reviews</h2>
                    <div className="review-filter">All ▾</div>
                </div>

                <div className="review-main">
                    {/* LEFT: trending list, vertically centered */}
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

                    {/* RIGHT: vertical review wheel */}
                    <section className="review-right">
                        <div className="review-wheel">{slots}</div>
                    </section>
                </div>
            </div>
        </div>
    );
}
