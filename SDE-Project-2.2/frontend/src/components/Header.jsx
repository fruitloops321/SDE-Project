import React, { useState } from 'react';

export default function Header() {

    const storedUsername = localStorage.getItem('username') || 'Reader';

    const [keyword, setKeyword] = useState("");
    const [results, setResults] = useState([]);

    const handleSearch = async (value) => {
        setKeyword(value);

        if (value.trim() === "") {
            setResults([]);
            return;
        }

        try {
            const res = await fetch(`http://localhost:8081/api/books/search?keyword=${value}`);
            const data = await res.json();
            setResults(data);
        } catch (e) {
            console.error("Search error:", e);
        }
    };

    return (
        <div className="header" style={{ position: "relative" }}>
            <div className="greeting">
                <h1>Hello, {storedUsername}!</h1>
                <p>Let's see what tickles your mind today</p>
            </div>

            <div className="search" style={{ position: "relative" }}>
                <input
                    type="text"
                    placeholder="Search for books"
                    value={keyword}
                    onChange={(e) => handleSearch(e.target.value)}
                />

                {/* 🔽 SEARCH RESULTS DROPDOWN */}
                {results.length > 0 && (
                    <div
                        style={{
                            position: "absolute",
                            top: "45px",
                            left: 0,
                            width: "100%",
                            background: "white",
                            color: "black",
                            borderRadius: "6px",
                            boxShadow: "0 4px 10px rgba(0,0,0,0.15)",
                            maxHeight: "220px",
                            overflowY: "auto",
                            zIndex: 1000,
                        }}
                    >
                        {results.map((book) => (
                            <div
                                key={book.id}
                                style={{
                                    padding: "10px",
                                    borderBottom: "1px solid #eee",
                                    cursor: "pointer",
                                }}
                            >
                                {book.title}
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}
