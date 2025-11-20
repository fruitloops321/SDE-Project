// src/pages/RecommendedPage.jsx
import React, { useEffect, useMemo, useState } from "react";
import "/src/styles/recommendedPage.css";
import { useBookDetails } from "/src/book-details/BookDetailsContext.jsx";

// Dummy data – later you’ll replace with API data
const TRENDING_BOOKS = [
  {
    id: "t1",
    title: "You Are Here",
    author: "David Nicholls",
    coverUrl: "/src/assets/yah.jpg",
    rating: 4.2,
  },
  {
    id: "t2",
    title: "James",
    author: "Percival Everett",
    coverUrl: "/src/assets/James.jpg",
    rating: 4.6,
  },
  {
    id: "t3",
    title: "The Wild Robot",
    author: "Peter Brown",
    coverUrl: "/src/assets/thewildrobot.webp",
    rating: 4.1,
  },
  {
    id: "t4",
    title: "Save Me an Orange",
    author: "Hayley Grace",
    coverUrl: "/src/assets/cover7.jpg",
    rating: 3.9,
  },
  {
    id: "t5",
    title: "A Year of Living Curiously",
    author: "Jeffrey Brown",
    coverUrl: "/src/assets/cover4.jpg",
    rating: 4.0,
  },
  {
    id: "t6",
    title: "Strange Houses",
    author: "Author Name",
    coverUrl: "/src/assets/cover6.jpg",
    rating: 4.4,
  },
];

const LATEST_BOOKS = [
  {
    id: "l1",
    title: "Save Me an Orange",
    author: "Hayley Grace",
    coverUrl: "/src/assets/cover7.jpg",
    rating: 3.9,
  },
  {
    id: "l2",
    title: "A Year of Living Curiously",
    author: "Jeffrey Brown",
    coverUrl: "/src/assets/cover4.jpg",
    rating: 4.0,
  },
  {
    id: "l3",
    title: "IT",
    author: "Stephen King",
    coverUrl: "/src/assets/it.jpg",
    rating: 4.5,
  },
  {
    id: "l4",
    title: "Welcome to the Bookshop",
    author: "Hwang Bo-reum",
    coverUrl: "/src/assets/cover8.jpg",
    rating: 4.3,
  },
  {
    id: "l5",
    title: "Strange Houses",
    author: "Author Name",
    coverUrl: "/src/assets/cover6.jpg",
    rating: 4.4,
  },
];

function starString(rating) {
  const full = Math.round(rating || 0);
  return "★".repeat(full) + "☆".repeat(5 - full);
}

function getVisible(list, startIndex, count = 3) {
  const n = list.length;
  return Array.from({ length: count }, (_, i) => list[(startIndex + i) % n]);
}

export default function RecommendedPage() {
  const { openBookDetails } = useBookDetails();

  const [highlight, setHighlight] = useState(TRENDING_BOOKS[0]);
  const [trendIndex, setTrendIndex] = useState(0);
  const [latestIndex, setLatestIndex] = useState(0);

  // auto-scroll every 6s
  useEffect(() => {
    const interval = setInterval(() => {
      setTrendIndex((i) => (i + 1) % TRENDING_BOOKS.length);
      setLatestIndex((i) => (i + 1) % LATEST_BOOKS.length);
    }, 6000);
    return () => clearInterval(interval);
  }, []);

  // when auto-scroll moves, update highlight from trending (unless user is hovering,
  // but hover will just override this)
  useEffect(() => {
    setHighlight((prev) => prev || TRENDING_BOOKS[0]);
  }, []);

  const visibleTrending = useMemo(
    () => getVisible(TRENDING_BOOKS, trendIndex, 3),
    [trendIndex]
  );
  const visibleLatest = useMemo(
    () => getVisible(LATEST_BOOKS, latestIndex, 3),
    [latestIndex]
  );

  const handleCardHover = (book) => {
    setHighlight(book);
  };

  const handleNextTrending = () => {
    setTrendIndex((i) => (i + 1) % TRENDING_BOOKS.length);
  };
  const handlePrevTrending = () => {
    setTrendIndex((i) => (i - 1 + TRENDING_BOOKS.length) % TRENDING_BOOKS.length);
  };
  const handleNextLatest = () => {
    setLatestIndex((i) => (i + 1) % LATEST_BOOKS.length);
  };
  const handlePrevLatest = () => {
    setLatestIndex((i) => (i - 1 + LATEST_BOOKS.length) % LATEST_BOOKS.length);
  };

  const openDetails = (book) => {
    openBookDetails({
      title: book.title,
      author: book.author,
      rating: book.rating ?? 0,
      publishedDate: book.publishedDate ?? "2020",
      description:
        book.description ??
        "Description will come from the API later. For now this is placeholder text.",
      genres: book.genres ?? [],
      format: book.format ?? "Hardcover",
      pages: book.pages ?? 300,
      coverUrl: book.coverUrl,
    });
  };

  if (!highlight) return null;

  return (
    <div className="panel recommended-page-panel">
      {/* <div className="recommendAsTitle"> Recommended</div> */}
      <div className="rec-left"><h1>Recommended</h1>
        <div
          className="rec-main-cover-wrap"
          onClick={() => openDetails(highlight)}
        >
          <img
            src={highlight.coverUrl}
            alt={highlight.title}
            className="rec-main-cover"
            onError={(e) => {
              e.target.onerror = null;
              e.target.src =
                "https://via.placeholder.com/260x360?text=Cover";
            }}
          />
        </div>

        <div className="rec-main-meta">
          <div className="rec-main-title">{highlight.title}</div>
          <div className="rec-main-author">by {highlight.author}</div>
          <div className="rec-main-rating">
            <span className="rec-main-stars">
              {starString(highlight.rating)}
            </span>
            <span className="rec-main-rating-number">
              {highlight.rating.toFixed(2)}/5
            </span>
          </div>
        </div>
      </div>

      {/* RIGHT – Trending + Latest carousels */}
      <div className="rec-right">
        {/* Trending */}
        <section className="rec-section">
          <header className="rec-section-header">
            <h3>Trending</h3>
            <div className="rec-arrows">
              <button onClick={handlePrevTrending}>‹</button>
              <button onClick={handleNextTrending}>›</button>
            </div>
          </header>

          <div className="rec-strip">
            {visibleTrending.map((book) => (
              <div
                key={book.id}
                className="rec-card"
                onMouseEnter={() => handleCardHover(book)}
                onClick={() => openDetails(book)}
              >
                <div className="rec-card-cover-wrap">
                  <img
                    src={book.coverUrl}
                    alt={book.title}
                    className="rec-card-cover"
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src =
                        "https://via.placeholder.com/120x180?text=Book";
                    }}
                  />
                </div>
                <div className="rec-card-stars">
                  {starString(book.rating)}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Latest */}
        <section className="rec-section">
          <header className="rec-section-header">
            <h3>Latest</h3>
            <div className="rec-arrows">
              <button onClick={handlePrevLatest}>‹</button>
              <button onClick={handleNextLatest}>›</button>
            </div>
          </header>

          <div className="rec-strip">
            {visibleLatest.map((book) => (
              <div
                key={book.id}
                className="rec-card"
                onMouseEnter={() => handleCardHover(book)}
                onClick={() => openDetails(book)}
              >
                <div className="rec-card-cover-wrap">
                  <img
                    src={book.coverUrl}
                    alt={book.title}
                    className="rec-card-cover"
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src =
                        "https://via.placeholder.com/120x180?text=Book";
                    }}
                  />
                </div>
                <div className="rec-card-stars">
                  {starString(book.rating)}
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
