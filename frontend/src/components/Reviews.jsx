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
      { id: "a1", name: "John Staten M.", rating: 4.1, text: "“A beautifully imaginative journey that reminds us how small choices can shape an entire life.” The Midnight Library" },
      { id: "a2", name: "Bill Cosby.", rating: 3.3, text: "“Despite its clever premise, the book feels repetitive and overly sentimental.” The Midnight Library" },
      { id: "a3", name: "Anna Berg", rating: 4.2, text: "“A reflective, easy-to-read story that explores the what-ifs of life through a magical library.” The Midnight Library" }
    ],
    [
      { id: "b1", name: "bebo", rating: 5, text: "A brilliantly practical guide that shows how tiny daily improvements can create life-changing results." },
      { id: "b2", name: "Ben Dover", rating: 3.9, text: "Clear’s habit framework is useful and easy to follow, though many ideas will feel familiar to self-help readers." },
      { id: "b3", name: "Jeffery Epstein", rating: 1, text: "While popular, the book repeats the same concepts and often feels more motivational than scientifically deep." }
    ],
    [
      { id: "c1", name: "Faris Ahmed ", rating: 5, text: "The Subtle Art of Not Giving a Fu*k argues that individuals should seek to find meaning through what they find to be important and only engage in values that they can control." },
      { id: "c2", name: "Lina Hamza", rating: 3.5, text: "Entertaining and straightforward, though its tough-love advice feels repetitive at times." },
      { id: "c3", name: "Aiman Izzat", rating: 2, text: "Despite its bold attitude, the book oversimplifies complex problems and relies too heavily on shock value." }
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
                The Midnight Library <span className="by">by <div className="author">Matt Haig</div></span>
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
                  Atomic Habits <span className="by">by <div className="author">James Clear</div></span>
              </div>
                <div className="static-review">Review <div className="book-stars">☆☆☆☆☆</div></div>
                <button
                    className="see-book-btn"
                    onClick={() =>
                        openBookDetails({
                            title: "Atomic Habits",
                            author: "James Clear",
                            rating: 4.3,
                            publishedDate: "October 16, 2018",
                            description:
                                "When Nora Seed finds herself in the Midnight Library, she has a chance to make things right. Up until now, her life has been full of misery and regret. She feels she has let everyone down, including herself. But things are about to change.  The books in the Midnight Library enable Nora to live as if she had done things differently. With the help of an old friend, she can now undo every one of her regrets as she tries to work out her perfect life. But things aren't always what she imagined they'd be, and soon her choices place the library and herself in extreme danger.",
                            genres: ["Self-help book"],
                            format: "Hardcover",
                            pages: 250,
                            coverUrl: "/src/assets/cover2.jpg",
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
                  The Subtle Art of Not Giving a F*ck <span className="by">by <div className="author">Mark Manson</div></span>
              </div>
              <div className="book-stars">☆☆☆☆☆</div>
              <button
                className="see-book-btn"
                onClick={() =>
                  openBookDetails({
                    title: "The Subtle Art of Not Giving a F*ck",
                    author: "Mark Manson",
                    rating: 3.9,
                    publishedDate: "September 13, 2016",
                    description:
                      "The Subtle Art of Not Giving a F*ck argues that individuals should seek to find meaning through what they find to be important and only engage in values that they can control",
                    genres: ["Self-half book"],
                    format: "Hardcover",
                    pages: 272,
                    coverUrl: "/src/assets/tsaongaf.jpg",
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
