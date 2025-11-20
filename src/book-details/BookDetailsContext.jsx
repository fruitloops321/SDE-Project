import React, {createContext, useState, useContext, useCallback,} from "react";
import "./book-details.css";
import { useSavedBooks } from "/src/components/Saved/SavedBooksContext"; // HAVE TO BE CHANGED USING GET
const BookDetailsContext = createContext(null);


export function BookDetailsProvider({ children }) {
  const [book, setBook] = useState(null);

  const openBookDetails = useCallback((bookData) => {
    setBook(bookData);
  }, []);

  const closeBookDetails = useCallback(() => {
    setBook(null);
  }, []);

  return (
    <BookDetailsContext.Provider
      value={{ book, openBookDetails, closeBookDetails }}
    >
      {children}
      <BookDetailsOverlay />
    </BookDetailsContext.Provider>
  );
}

export function useBookDetails() {
  const ctx = useContext(BookDetailsContext);
  if (!ctx) throw new Error("useBookDetails must be inside BookDetailsProvider");
  return ctx;
}


// Book details overlay
function BookDetailsOverlay() {
  const { book, closeBookDetails } = useBookDetails();

  // Get the function
  const { saveBook, removeBook, isSaved } = useSavedBooks();

  if (!book) return null;

  // Determine whether this book is saved
  const saved = isSaved(book.id);

  // Toggle logic
  const handleToggleSave = () => {
    if (saved) {
      removeBook(book.id);
    } else {
      saveBook({
        id: book.id,
        title: book.title,
        author: book.author,
        rating: book.rating,
        publishedDate: book.publishedDate,
        description: book.description,
        genres: book.genres,
        format: book.format,
        pages: book.pages,
        coverUrl: book.coverUrl,
        addedAt: new Date().toISOString(), // helps sorting
      });
    }
  };

  return (
    <div className="bd-backdrop" onClick={closeBookDetails}>
      <div
        className="panel bd-modal"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close button */}
        <button className="bd-back-btn" onClick={closeBookDetails}>
          ←
        </button>

        {/* LEFT side */}
        <div className="bd-left">
          <div className="bd-cover-wrap">
            <img
              src={book.coverUrl}
              alt={book.title}
              className="bd-cover"
              onError={(e) => {
                e.target.onerror = null;
                e.target.src =
                  "https://via.placeholder.com/260x380?text=Cover";
              }}
            />
          </div>

          <div className="bd-left-bottom">
            <div className="bd-rating-row">
              <span className="stars">
                {"★".repeat(Math.round(book.rating || 0)) +
                  "☆".repeat(5 - Math.round(book.rating || 0))}
              </span>
              {book.rating && (
                <span className="rating-number">
                  {book.rating.toFixed(2)}/5
                </span>
              )}
            </div>

            <div className="bd-actions">
              <button
                className="btn-ghost"
                onClick={handleToggleSave}
              >
                {saved ? "Saved" : "Save book"}
              </button>

              <button className="btn-primary">Review this book</button>
            </div>

          </div>
        </div>

        {/* RIGHT side */}
        <div className="bd-right">
          <header className="bd-header">
            <div className="bd-title-block">
              <h2 className="bd-title">{book.title}</h2>
              <p className="bd-author">
                by <span>{book.author}</span>
              </p>
            </div>

            {book.publishedDate && (
              <div className="bd-published">
                <span className="bd-published-label">Published</span>
                <span className="bd-published-value">
                  {book.publishedDate}
                </span>
              </div>
            )}
          </header>

          {/* main body on the right */}
          <div className="bd-main">
            <section className="bd-section bd-desc">
              <h3>Description</h3>
              <p className="bd-desc-text">{book.description}</p>
            </section>

            {book.genres && (
              <section className="bd-section">
                <h3>Genre</h3>
                <p className="bd-chips">{book.genres.join(" | ")}</p>
              </section>
            )}

            <section className="bd-section">
              <h3>Details</h3>
              <p>
                {book.format} · {book.pages} pages
              </p>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}

