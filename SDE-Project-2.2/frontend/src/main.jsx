import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import { BookDetailsProvider } from "./book-details/BookDetailsContext.jsx";
import { SavedBooksProvider } from "/src/components/Saved/SavedBooksContext.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
      <SavedBooksProvider>
        <BookDetailsProvider>
          <App />
        </BookDetailsProvider>
      </SavedBooksProvider>
    </React.StrictMode>
  );
