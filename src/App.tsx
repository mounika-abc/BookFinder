import React, { useState, useEffect } from "react";

interface Book {
  key: string;
  title: string;
  author_name?: string[];
  first_publish_year?: number;
  cover_i?: number;
  subject?: string[];
}

interface OpenLibraryResponse {
  docs: Book[];
}

const App: React.FC = () => {
  const [query, setQuery] = useState<string>("");
  const [books, setBooks] = useState<Book[]>([]);
  const [favorites, setFavorites] = useState<Book[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");
  const [page, setPage] = useState<"search" | "results">("search");

  useEffect(() => {
    const storedFavorites = localStorage.getItem("favorites");
    if (storedFavorites) setFavorites(JSON.parse(storedFavorites));
  }, []);

  useEffect(() => {
    localStorage.setItem("favorites", JSON.stringify(favorites));
  }, [favorites]);

  const searchBooks = async () => {
    if (!query) return;
    setLoading(true);
    setError("");
    try {
      const res = await fetch(
        `https://openlibrary.org/search.json?title=${query}`
      );
      const data: OpenLibraryResponse = await res.json();
      if (data.docs.length === 0) {
        setError("No books found");
        setBooks([]);
      } else {
        setBooks(data.docs.slice(0, 12));
      }
      setPage("results");
    } catch (err) {
      setError("Something went wrong!");
    }
    setLoading(false);
  };

  const toggleFavorite = (book: Book) => {
    if (favorites.some((b) => b.key === book.key)) {
      setFavorites(favorites.filter((b) => b.key !== book.key));
    } else {
      setFavorites([...favorites, book]);
    }
  };

  const isFavorite = (book: Book) => favorites.some((b) => b.key === book.key);

  const shareBook = (book: Book) => {
    if (navigator.share) {
      navigator
        .share({
          title: book.title,
          text: `Check out this book: ${book.title} by ${
            book.author_name?.join(", ") || "Unknown Author"
          }`,
          url: window.location.href,
        })
        .then(() => console.log("Shared successfully"))
        .catch((error) => console.error("Error sharing", error));
    } else {
      alert("Your browser does not support the Web Share API");
    }
  };

  // ---------- SEARCH PAGE ----------
  if (page === "search") {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center">
        <h1 className="title">📚 Book Finder</h1>
        <p className="subtitle">Discover books you love</p>
        <div className="search-container">
          <input
            type="text"
            placeholder="Search for books..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="search-input"
          />
          <button onClick={searchBooks} className="search-button">
            Search
          </button>
        </div>
      </div>
    );
  }

  // ---------- RESULTS PAGE ----------
  return (
    <div className="min-h-screen p-6">
      {/* Header with Back Button */}
      <header className="header">
        <h1 className="text-4xl font-bold text-gray-800">📚 Search Results</h1>
        <button onClick={() => setPage("search")} className="back-button">
          ← Back to Search
        </button>
      </header>

      {/* Loading / Error */}
      {loading && (
        <p className="text-center text-gray-500 text-lg animate-pulse">
          Loading...
        </p>
      )}
      {error && <p className="text-center text-red-500 text-lg">{error}</p>}

      {/* Favorites Section */}
      {favorites.length > 0 && (
        <section className="max-w-6xl mx-auto mb-10">
          <h2 className="text-2xl font-bold mb-4 text-yellow-600 flex items-center">
            ⭐ Favorites ({favorites.length})
          </h2>
          <div className="results-grid">
            {favorites.map((book) => (
              <div key={book.key} className="favorites-card">
                {book.cover_i ? (
                  <img
                    src={`https://covers.openlibrary.org/b/id/${book.cover_i}-L.jpg`}
                    alt={book.title}
                    className="book-image"
                  />
                ) : (
                  <div className="w-full h-60 bg-gray-200 mb-3 flex items-center justify-center rounded-lg text-gray-500">
                    No Image
                  </div>
                )}
                <h3 className="text-lg font-semibold mb-1">{book.title}</h3>
                <p className="book-info">
                  {book.author_name?.join(", ") || "Unknown Author"}
                </p>
                <div className="flex justify-between items-center mt-2">
                  <button
                    onClick={() => toggleFavorite(book)}
                    className="favorite-button"
                  >
                    {isFavorite(book) ? "★" : "☆"}
                  </button>
                  <button
                    onClick={() => shareBook(book)}
                    className="share-button"
                  >
                    Share
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Search Results */}
      <section className="max-w-6xl mx-auto">
        <div className="results-grid">
          {books.map((book) => (
            <div key={book.key} className="book-card">
              {book.cover_i ? (
                <img
                  src={`https://covers.openlibrary.org/b/id/${book.cover_i}-L.jpg`}
                  alt={book.title}
                  className="book-image"
                />
              ) : (
                <div className="w-full h-64 bg-gray-200 mb-4 flex items-center justify-center rounded-lg text-gray-500">
                  No Image
                </div>
              )}
              <h2 className="text-lg font-bold mb-1">{book.title}</h2>
              <p className="book-info">
                Author: {book.author_name?.join(", ") || "Unknown"}
              </p>
              <p className="text-sm text-gray-500 mb-2">
                Published: {book.first_publish_year || "N/A"}
              </p>
              {book.subject && (
                <p className="text-xs text-gray-400 mb-2">
                  Subjects: {book.subject.slice(0, 3).join(", ")}
                </p>
              )}

              <div className="flex justify-between items-center mt-2">
                <button
                  onClick={() => toggleFavorite(book)}
                  className={`favorite-button ${
                    isFavorite(book) ? "text-yellow-500" : "text-gray-300"
                  }`}
                >
                  {isFavorite(book) ? "★" : "☆"}
                </button>
                <button
                  onClick={() => shareBook(book)}
                  className="share-button"
                >
                  Share
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default App;
