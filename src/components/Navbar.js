import React from "react";

export default function Navbar() {
  return (
    <div style={{
      display: "flex",
      justifyContent: "space-between",
      padding: "15px 30px",
      backgroundColor: "#111",
      alignItems: "center"
    }}>
      <h2 style={{ color: "#e50914" }}>NETFLIX</h2>

      <div style={{ display: "flex", gap: "20px" }}>
        <button>Home</button>
        <button>TV Shows</button>
        <button>Movies</button>
        <button>Video Games</button>
      </div>
    </div>
  );
}