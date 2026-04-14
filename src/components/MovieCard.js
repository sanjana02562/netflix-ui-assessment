import React from "react";

export default function MovieCard({ movie, onClick }) {
  return (
    <div
      onClick={() => onClick(movie)}
      style={{
        width: "150px",
        margin: "10px",
        transition: "transform 0.3s"
      }}
      onMouseEnter={(e) => e.currentTarget.style.transform = "scale(1.1)"}
      onMouseLeave={(e) => e.currentTarget.style.transform = "scale(1)"}
    >
      <img
        src={movie.poster}
        alt={movie.title}
        style={{
          width: "100%",
          borderRadius: "8px"
        }}
      />
      <p style={{ fontSize: "14px", marginTop: "5px" }}>
        {movie.title}
      </p>
    </div>
  );
}