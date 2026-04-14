import React from "react";

export default function Login({ setUser }) {
  return (
    <div style={{ textAlign: "center", marginTop: "100px" }}>
      <h2>Netflix UI Clone</h2>

      <button onClick={() => setUser("guest")}>
        Continue as Guest
      </button>
    </div>
  );
}