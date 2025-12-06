import React, {
    createContext,
    useContext,
    useState,
    useEffect,
} from "react";

// -----------------------------------------
// CONTEXT + HOOK
// -----------------------------------------
const SavedBooksContext = createContext(null);

export const useSavedBooks = () => {
    const ctx = useContext(SavedBooksContext);
    if (!ctx) {
        throw new Error("useSavedBooks must be used inside SavedBooksProvider");
    }
    return ctx;
};

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
            // ensure the book has a stable id
            const normalizedId =
                book.id ||
                `${book.title || "unknown"}-${book.author || "unknown"}`.replace(
                    /\s+/g,
                    "-"
                );

            const normalizedBook = {
                ...book,
                id: normalizedId,
            };

            // prevent duplicates by id
            if (prev.some((b) => b.id === normalizedBook.id)) return prev;

            return [...prev, normalizedBook];
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
