"use client";

import { useState } from "react";

export default function Counter() {
  const [count, setCount] = useState(0);

  return (
    <section style={{ textAlign: "center", margin: "2rem 0" }}>
      <h2>Counter</h2>
      <p
        data-testid="counter-value"
        style={{ fontSize: "2rem", margin: "1rem 0" }}
      >
        {count}
      </p>
      <div style={{ display: "flex", gap: "1rem", justifyContent: "center" }}>
        <button
          onClick={() => setCount((c) => Math.max(0, c - 1))}
          style={{ fontSize: "1.5rem", padding: "0.5rem 1.5rem" }}
        >
          -
        </button>
        <button
          onClick={() => setCount((c) => c + 1)}
          style={{ fontSize: "1.5rem", padding: "0.5rem 1.5rem" }}
        >
          +
        </button>
        <button
          onClick={() => setCount((c) => c + 10)}
          style={{ fontSize: "1.5rem", padding: "0.5rem 1.5rem" }}
        >
          +10
        </button>
      </div>
    </section>
  );
}
