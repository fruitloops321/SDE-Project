import React, { createContext, useContext, useState, useEffect } from "react";

// -----------------------------------------
// CONTEXT + HOOK
// -----------------------------------------
const SavedBooksContext = createContext();
export const useSavedBooks = () => useContext(SavedBooksContext);

// -----------------------------------------
// PROVIDER
// -----------------------------------------
export function SavedBooksProvider({ children }) {
  // Load from localStorage on first mount
  const [savedBooks, setSavedBooks] = useState(() => {
    const stored = localStorage.getItem("savedBooks");
    return stored ? JSON.parse(stored) : [];
  });

  // Sync to localStorage whenever savedBooks changes
  useEffect(() => {
    localStorage.setItem("savedBooks", JSON.stringify(savedBooks));
  }, [savedBooks]);

  // -----------------------------------------
  // ACTIONS
  // -----------------------------------------

  const saveBook = (book) => {
    setSavedBooks((prev) => {
      // prevent duplicates
      if (prev.some((b) => b.id === book.id)) return prev;
      return [...prev, book];
    });
  };

  const removeBook = (id) => {
    setSavedBooks((prev) => prev.filter((b) => b.id !== id));
  };

  const isSaved = (id) => {
    return savedBooks.some((b) => b.id === id);
  };

  return (
    <SavedBooksContext.Provider
      value={{ savedBooks, saveBook, removeBook, isSaved }}
    >
      {children}
    </SavedBooksContext.Provider>
  );
}
