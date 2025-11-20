import React, { useState } from 'react';
import Sidebar from '../components/Sidebar';
import Header from '../components/Header';
import Recommended from '../components/Recommended';
import CalendarWidget from '../components/CalendarWidget';
import Reviews from '../components/Reviews';
import Saved from "/src/pages/Saved.jsx";
import '../styles/dashboard.css';
import { useSavedBooks } from "/src/components/Saved/SavedBooksContext.jsx";
import RecommendedPage from "/src/pages/RecommendPage.jsx";



export default function Dashboard() {

  const [page, setPage] = useState("home");                     // "home" | "saved" | etc.
  const { saveBook, removeBook, isSaved } = useSavedBooks();

  return (
    <div className="dashboard">

      <Sidebar activePage={page} onNavigate={setPage} />        {/* Pass page + setter to Sidebar */}

      <div className="main">
        <Header />

                                                                {/* PAGE SWITCHING */}
        {page === "home" && (
          <>
            <div className="top-grid">
              <Recommended />
              <CalendarWidget />
            </div>
            <Reviews />
          </>
        )}

        {page === "saved" && (
          <Saved />
        )}

        {page == "recommended" && <RecommendedPage />}

        {/* Later you can add: */}
        {/* {page === "reviews" && <ReviewsPage />} */}
        {/* {page === "recommended" && <RecommendedPage />} */}
      </div>
    </div>
  );
}
