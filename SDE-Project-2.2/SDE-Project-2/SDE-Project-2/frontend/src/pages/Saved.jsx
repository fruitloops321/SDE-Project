// src/pages/Saved.jsx
import React, { useMemo, useState } from "react";
import "/src/styles/saved.css";
import { useBookDetails } from "/src/book-details/BookDetailsContext";

// ✅ FIXED: Correct import path for SavedBooks context
import { useSavedBooks } from "/src/components/Saved/SavedBooksContext";

export default function Saved() {
  const { openBookDetails } = useBookDetails();
  const { savedBooks } = useSavedBooks();
  const [sortMode, setSortMode] = useState("recent");
  const [isMenuOpen, setIsMenuOpen] = useState(false);



  const books = savedBooks;                                                 // 1. Use real book instead of dummy

  const sortedBooks = useMemo(() => {
    const copy = [...books];

    if (sortMode === "alpha") {
      copy.sort((a, b) => a.title.localeCompare(b.title));
    } else {
      copy.sort(
        (a, b) => new Date(b.addedAt).getTime() - new Date(a.addedAt).getTime()
      );
    }

    return copy;
  }, [books, sortMode]);

  const label = sortMode === "recent" ? "Recent" : "A–Z";

// 3
  const rows = useMemo(() => {
    const out = [];
    const perRow = 5;

    for (let i = 0; i < sortedBooks.length; i += perRow) {
      out.push(sortedBooks.slice(i, i + perRow));
    }

    return out;
  }, [sortedBooks]);

// 4
  const handleCardClick = (book) => {
    openBookDetails({
      title: book.title,
      author: book.author,
      rating: book.rating ?? 0,
      publishedDate: book.publishedDate ?? "Unknown",
      description:
        book.description ??
        "No description provided yet. This will come from the API later.",
      genres: book.genres ?? [],
      format: book.format ?? "Unknown format",
      pages: book.pages ?? 0,
      coverUrl: book.coverUrl,
    });
  };


  return (
    <div className="panel saved-panel">
      <header className="saved-header">
        <div className="saved-title">Saved</div>

        <div className="saved-sort-wrapper">
          <button
            className="saved-sort-button"
            onClick={() => setIsMenuOpen((o) => !o)}
          >
            {label}
            <span className="saved-sort-caret">▾</span>
          </button>

          {isMenuOpen && (
            <div className="saved-sort-menu">
              <button
                className={`saved-sort-option ${
                  sortMode === "recent" ? "active" : ""
                }`}
                onClick={() => {
                  setSortMode("recent");
                  setIsMenuOpen(false);
                }}
              >
                Recent
              </button>

              <button
                className={`saved-sort-option ${
                  sortMode === "alpha" ? "active" : ""
                }`}
                onClick={() => {
                  setSortMode("alpha");
                  setIsMenuOpen(false);
                }}
              >
                Alphabetical (A–Z)
              </button>
            </div>
          )}
        </div>
      </header>


      {/* no saved book ==>> give back no saved book yet */}
      {rows.length === 0 ? (
        <div className="saved-empty">
          <p className="saved-empty-title">No saved books yet</p>
          <p className="saved-empty-sub">
            When you save books, they’ll appear here.
          </p>
        </div>
      ) : (
        <div className="saved-scroll">
          {rows.map((row, rowIndex) => (
            <div className="saved-row" key={rowIndex}>

              {/* Books in this row */}
              {row.map((book) => (
                <button
                  key={book.id}
                  className="saved-card"
                  onClick={() => handleCardClick(book)}
                >
                  <div className="saved-cover-wrap">
                    <img
                      src={book.coverUrl}
                      alt={book.title}
                      className="saved-cover"
                      onError={(e) => {
                        e.target.onerror = null;
                        e.target.src =
                          "https://via.placeholder.com/140x210?text=Book";
                      }}
                    />
                  </div>
                </button>
              ))}

              {/* Fillers to keep spacing */}
              {row.length < 5 &&
                Array.from({ length: 5 - row.length }).map((_, i) => (
                  <div
                    key={`filler-${rowIndex}-${i}`}
                    className="saved-card saved-card--filler"
                  />
                ))}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
