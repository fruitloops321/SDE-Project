import React, { useEffect, useRef, useState } from 'react';
import ReviewsPane from '/src/components/Reviews/ReviewsPane';
import "/src/styles/review.css";
import { useBookDetails } from "/src/book-details/BookDetailsContext.jsx";




export default function Review() {
  const bookColRef = useRef(null);
  const [currentBookIndex, setCurrentBookIndex] = useState(0);
  const { openBookDetails } = useBookDetails();

  // dummy book for now
  const reviewsByBook = [
    [
      { id: "a1", name: "John Staten M.", rating: 4, text: "Review for book 1..." },
      { id: "a2", name: "Rina C.", rating: 5, text: "Another review for book 1..." },
      { id: "a3", name: "Anna Berg", rating: 4, text: "Nice thoughts about book 1." }
    ],
    [
      { id: "b1", name: "Sam Patel", rating: 3, text: "Book 2 review..." },
      { id: "b2", name: "L. Nguyen", rating: 4, text: "More thoughts for book 2..." },
      { id: "b3", name: "M. O'Connor", rating: 4, text: "Solid analysis on book 2." }
    ],
    [
      { id: "c1", name: "Reviewer One", rating: 5, text: "Book 3 is excellent." },
      { id: "c2", name: "Reviewer Two", rating: 4, text: "Another detailed review." },
      { id: "c3", name: "Reviewer Three", rating: 4, text: "Good reading experience." }
    ]
  ];

  const covers = [
    '/src/assets/cover1.jpg',
    '/src/assets/cover2.jpg',
    '/src/assets/cover3.jpg',
    '/src/assets/cover4.jpg',
    '/src/assets/cover5.jpg',
    '/src/assets/cover6.jpg',

  ];

  // Snap detection
  useEffect(() => {
    const col = bookColRef.current;
    if (!col) return;

    let timer = null;
    const onScroll = () => {
      if (timer) clearTimeout(timer);
      timer = setTimeout(() => {
        const itemHeight = col.scrollHeight / col.children.length;
        const index = Math.round(col.scrollTop / itemHeight);
        setCurrentBookIndex(index);
      }, 120);
    };

    col.addEventListener("scroll", onScroll);
    return () => col.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div className="panel reviews">
      {/* Header */}
      <div className="reviews-card-header">
        <div className="reviews-title-main">Reviews</div>
        <div className="reviews-trending">Trending ▾</div>
      </div>

      <div className="reviews-content">

        <div className="book-column" ref={bookColRef} role="list">


          <div className="book-item">
            <div className="book-cover" >
                <img
                   src="/src/assets/tml.jpg"
                   alt="Book cover"
                   className="book-cover-img"
                   onError={(e) => {
                     e.target.onerror = null;
                     e.target.src = "https://via.placeholder.com/160x210?text=Book";
                   }}
                 />
                 </div>
            <div className="book-info">
              <div className="book-title">
                Book Title <span className="by">by <div className="author">Author Name</div></span>
              </div>
              <div className="static-review">Review <div className="book-stars">☆☆☆☆☆</div></div>
              <button
                  className="see-book-btn"
                  onClick={() =>
                    openBookDetails({
                      title: "The Midnight Library",
                      author: "Matt Haig",
                      rating: 4.0,
                      publishedDate: "August 13, 2020",
                      description:
                        "When Nora Seed finds herself in the Midnight Library, she has a chance to make things right. Up until now, her life has been full of misery and regret. She feels she has let everyone down, including herself. But things are about to change.  The books in the Midnight Library enable Nora to live as if she had done things differently. With the help of an old friend, she can now undo every one of her regrets as she tries to work out her perfect life. But things aren't always what she imagined they'd be, and soon her choices place the library and herself in extreme danger.",
                      genres: ["Fiction", "Fantasy", "Contemporary"],
                      format: "Hardcover",
                      pages: 288,
                      coverUrl: "/src/assets/tml.jpg",
                    })
                  }
                >
                  See Book
                </button>
            </div>
          </div>


          <div className="book-item">
            <div className="book-cover"><div className="cover-placeholder"></div></div>
            <div className="book-info">
              <div className="book-title">
                Book Title <span className="by">by <div className="author">Author Name</div></span>
              </div>
              <div className="book-stars">☆☆☆☆☆</div>
              <button
                  className="see-book-btn"
                  onClick={() =>
                    openBookDetails({
                      title: "The Midnight Library",
                      author: "Matt Haig",
                      rating: 4.0,
                      publishedDate: "August 13, 2020",
                      description:
                        "When Nora Seed finds herself in the Midnight Library...",
                      genres: ["Fiction", "Fantasy", "Contemporary"],
                      format: "Hardcover",
                      pages: 288,
                      coverUrl: "/src/assets/midnight.jpg",
                    })
                  }
                >
                  See Book
                </button>
            </div>
          </div>


          <div className="book-item">
            <div className="book-cover"><div className="cover-placeholder"></div></div>
            <div className="book-info">
              <div className="book-title">
                Book Title <span className="by">by <div className="author">Author Name</div></span>
              </div>
              <div className="book-stars">☆☆☆☆☆</div>
              <button
                className="see-book-btn"
                onClick={() =>
                  openBookDetails({
                    title: "The Midnight Library",
                    author: "Matt Haig",
                    rating: 4.0,
                    publishedDate: "August 13, 2020",
                    description:
                      "When Nora Seed finds herself in the Midnight Library...",
                    genres: ["Fiction", "Fantasy", "Contemporary"],
                    format: "Hardcover",
                    pages: 288,
                    coverUrl: "/src/assets/midnight.jpg",
                  })
                }
              >
                See Book
              </button>
            </div>
          </div>

        </div>


        <div className="review-column">
          <ReviewsPane key={currentBookIndex} reviews={reviewsByBook[currentBookIndex]} />
        </div>


      </div>
    </div>
  );
}
