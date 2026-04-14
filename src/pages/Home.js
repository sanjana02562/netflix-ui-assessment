import React, { useEffect, useState } from "react";
import { fetchMovies } from "../services/api";
import Navbar from "../components/Navbar";
import MovieCard from "../components/MovieCard";
import SearchBar from "../components/SearchBar";
import InfiniteScroll from "react-infinite-scroll-component";

<h2 style={{ paddingLeft: "20px" }}>Trending Now</h2>

export default function Home() {
  const [movies, setMovies] = useState([]);
  const [query, setQuery] = useState("");
  const [debounced, setDebounced] = useState("");
  const [visible, setVisible] = useState(20);
  const [selected, setSelected] = useState(null);
  const [online, setOnline] = useState(navigator.onLine);


  useEffect(() => {
    let mounted = true;

    fetchMovies().then(data => {
        if (mounted) {
            if (data && data.length > 0) {
            setMovies(data);
            } else {
            
            setMovies([
                {
                id: 1,
                title: "Sample Movie",
                year: "2024",
                poster: "https://via.placeholder.com/150"
                }
            ]);
            }
        }
});

    return () => mounted = false;
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebounced(query);
    }, 500);

    return () => clearTimeout(timer);
  }, [query]);

  useEffect(() => {
    const goOnline = () => setOnline(true);
    const goOffline = () => setOnline(false);

    window.addEventListener("online", goOnline);
    window.addEventListener("offline", goOffline);

    return () => {
      window.removeEventListener("online", goOnline);
      window.removeEventListener("offline", goOffline);
    };
  }, []);

  const filtered = movies.filter(m => {
  return (
    m.title?.toLowerCase().includes(debounced.toLowerCase()) ||
    m.year?.includes(debounced) ||
    String(m.id).includes(debounced)
  );
}
  );


  const loadMore = () => {
    setVisible(prev => prev + 20);
  };

  const addToWatchlist = (movie) => {
    const list = JSON.parse(localStorage.getItem("watchlist")) || [];
    localStorage.setItem("watchlist", JSON.stringify([...list, movie]));
  };

  const addToHistory = (movie) => {
    const list = JSON.parse(localStorage.getItem("history")) || [];
    localStorage.setItem("history", JSON.stringify([...list, movie]));
  };
  return (
    <div>
      {!online && <p style={{ color: "red" }}>You are offline</p>}

      <Navbar />
      <SearchBar setQuery={setQuery} />

      <InfiniteScroll
        dataLength={visible}
        next={loadMore}
        hasMore={visible < filtered.length}
      >
        <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(150px, 1fr))",
            gap: "15px",
            padding: "20px"
     }}>
          {filtered.slice(0, visible).map(movie => (
            <MovieCard
              key={movie.id}
              movie={movie}
              onClick={(m) => {
                setSelected(m);
                addToHistory(m);
              }}
            />
          ))}
        </div>
      </InfiniteScroll>

      {/* MODAL */}
      {selected && (
        <div style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          background: "rgba(0,0,0,0.9)",
          color: "white",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          padding: "50px"
        }}>

            
          <h2>{selected.title}</h2>
          <p>{selected.year}</p>

          <button onClick={() => addToWatchlist(selected)}>
            Add to Watchlist
          </button>

          <button onClick={() => setSelected(null)}>
            Close
          </button>
        </div>
      )}
    </div>
  );
}