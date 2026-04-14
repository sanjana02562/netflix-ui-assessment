import React from "react";

export default function SearchBar({ setQuery }) {
  return (
    <input
      type="text"
      placeholder="Search movies..."
      onChange={(e) => setQuery(e.target.value)}
      style={{ padding: "10px", width: "300px", margin: "10px" }}
    />
  );
}