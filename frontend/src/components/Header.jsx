import React from 'react';

export default function Header() {
    const storedUsername = localStorage.getItem('username') || 'Reader';
    return (
    <div className="header">
      <div className="greeting">
        <h1>Hello, {storedUsername}!</h1>
        <p>Let's see what tickles your mind today</p>
      </div>

      <div className="search">
        <input type="text" placeholder="Search for books" />
      </div>
    </div>
  );
}
