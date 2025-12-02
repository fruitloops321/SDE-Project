// src/pages/Profile.jsx
import React, { useRef, useState } from "react";
import "/src/styles/profile.css";

// same hooks you already use in Saved.jsx and ReviewPage.jsx
import { useSavedBooks } from "/src/components/Saved/SavedBooksContext.jsx";
import { useBookDetails } from "../book-details/BookDetailsContext.jsx";

export default function Profile() {
    const { savedBooks = [] } = useSavedBooks() || {};
    const { openBookDetails } = useBookDetails();
    const stripRef = useRef(null);

    const storedUsername = localStorage.getItem("username") || "Reader";
    const defaultBio =
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam luctus orci id ullamcorper suscipit. Proin tincidunt purus arcu, id pulvinar ante imperdiet at. Fusce rhoncus sit amet urna ut eleifend. Aliquam quis magna a odio ultrices congue. Proin volutpat commodo.";

    const storedBio = localStorage.getItem("profile_bio") || defaultBio;

    // --- local editable profile state ---
// The display name = the username the user inserted
    const [displayName, setDisplayName] = useState(storedUsername);

// The username (below the name) is also exactly what the user inserted
    const [username, setUsername] = useState(storedUsername);
    const [bio, setBio] = useState(storedBio);

    const [editingUsername, setEditingUsername] = useState(false);
    const [usernameDraft, setUsernameDraft] = useState(username);

    const [editingBio, setEditingBio] = useState(false);
    const [bioDraft, setBioDraft] = useState(bio);

    const handleScrollRight = () => {
        const strip = stripRef.current;
        if (!strip || !strip.firstElementChild) return;

        const cardWidth =
            strip.firstElementChild.getBoundingClientRect().width || 200;

        strip.scrollBy({
            left: cardWidth + 24,
            behavior: "smooth",
        });
    };

    const handleCardClick = (book) => {
        // book object here is already the same shape as in Saved.jsx
        openBookDetails(book);
    };

    const hasSavedBooks = savedBooks && savedBooks.length > 0;

    // --- username handlers ---
    const startEditUsername = () => {
        setUsernameDraft(username);
        setEditingUsername(true);
    };

    const saveUsername = () => {
        setUsername(usernameDraft.trim() || username);
        setEditingUsername(false);
    };

    const cancelUsername = () => {
        setUsernameDraft(username);
        setEditingUsername(false);
    };

    // --- bio handlers ---
    const startEditBio = () => {
        setBioDraft(bio);
        setEditingBio(true);
    };

    const saveBio = () => {
        const trimmed = bioDraft.trim() || defaultBio;
        setBio(trimmed);
        setEditingBio(false);

        // save to localStorage so it stays after refresh
        localStorage.setItem("profile_bio", trimmed);
    };

    const cancelBio = () => {
        setBioDraft(bio);
        setEditingBio(false);
    };

    return (
        <div className="profile-page">
            <div className="panel profile-panel">
                {/* ===== TOP: PROFILE CARD ===== */}
                <section className="profile-card">
                    <div className="profile-card-left">
                        <div className="profile-avatar">
                            {/* swap this src for your real avatar later */}
                            <img src="/src/assets/DSC06135.jpg" alt="Profile avatar" />
                        </div>
                    </div>

                    <div className="profile-card-main">
                        <header className="profile-card-header">
                            <div className="profile-name-block">
                                <h2 className="profile-name">{displayName}</h2>

                                {/* username row under the name */}
                                <div className="profile-username-row">
                                    {editingUsername ? (
                                        <>
                                            <input
                                                className="profile-username-input"
                                                value={usernameDraft}
                                                onChange={(e) => setUsernameDraft(e.target.value)}
                                            />
                                            <div className="profile-inline-actions">
                                                <button
                                                    type="button"
                                                    className="profile-inline-btn"
                                                    onClick={saveUsername}
                                                >
                                                    Save
                                                </button>
                                                <button
                                                    type="button"
                                                    className="profile-inline-btn profile-inline-cancel"
                                                    onClick={cancelUsername}
                                                >
                                                    Cancel
                                                </button>
                                            </div>
                                        </>
                                    ) : (
                                        <>
                                            <span className="profile-username">{username}</span>
                                            <button
                                                type="button"
                                                className="profile-username-edit-btn"
                                                onClick={startEditUsername}
                                            >
                                                Edit
                                            </button>
                                        </>
                                    )}
                                </div>

                                <p className="profile-follow">
                                    1 Follower · 1 Following
                                </p>
                            </div>

                            <button className="profile-connect-btn">
                                Connect with me?
                                <span className="profile-connect-plus">+</span>
                            </button>
                        </header>

                        <section className="profile-bio">
                            <div className="profile-bio-header">
                                <h3 className="profile-bio-title">Bio</h3>
                                {!editingBio && (
                                    <button
                                        type="button"
                                        className="profile-bio-edit-btn"
                                        onClick={startEditBio}
                                    >
                                        Edit
                                    </button>
                                )}
                            </div>

                            {editingBio ? (
                                <>
                  <textarea
                      className="profile-bio-textarea"
                      value={bioDraft}
                      onChange={(e) => setBioDraft(e.target.value)}
                  />
                                    <div className="profile-inline-actions">
                                        <button
                                            type="button"
                                            className="profile-inline-btn"
                                            onClick={saveBio}
                                        >
                                            Save
                                        </button>
                                        <button
                                            type="button"
                                            className="profile-inline-btn profile-inline-cancel"
                                            onClick={cancelBio}
                                        >
                                            Cancel
                                        </button>
                                    </div>
                                </>
                            ) : (
                                <p className="profile-bio-text">{bio}</p>
                            )}
                        </section>
                    </div>
                </section>

                {/* ===== BOTTOM: SAVED BOOKS CAROUSEL ===== */}
                <section className="profile-saved-section">
                    <div className="profile-saved-header-row">
                        <h3 className="profile-saved-title">Saved books</h3>

                        {/* little circle on the left + arrow on the right like in Figma */}
                        <div className="profile-saved-header-icons">
                            <span className="profile-saved-dot" />
                            <button
                                type="button"
                                className="profile-saved-arrow"
                                onClick={handleScrollRight}
                                aria-label="Scroll saved books"
                            >
                                ❯
                            </button>
                        </div>
                    </div>

                    {hasSavedBooks ? (
                        <div className="profile-saved-strip-wrapper">
                            <div className="profile-saved-strip" ref={stripRef}>
                                {savedBooks.map((book) => (
                                    <button
                                        key={book.id || book.title}
                                        type="button"
                                        className="profile-saved-card"
                                        onClick={() => handleCardClick(book)}
                                    >
                                        <div className="profile-saved-cover">
                                            <img src={book.coverUrl} alt={book.title} />
                                        </div>
                                        <p className="profile-saved-book-title">{book.title}</p>
                                    </button>
                                ))}
                            </div>
                        </div>
                    ) : (
                        <p className="profile-saved-empty">
                            You haven&apos;t saved any books yet. Start exploring and save a
                            few to see them here.
                        </p>
                    )}
                </section>
            </div>
        </div>
    );
}
