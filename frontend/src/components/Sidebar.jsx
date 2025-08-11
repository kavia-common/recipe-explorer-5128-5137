import React from "react";

// PUBLIC_INTERFACE
export default function Sidebar({ categories, selected, onSelect }) {
  /** Left sidebar listing categories with selection highlighting. */
  const allCats = ["All", ...categories];

  return (
    <aside className="rx-sidebar" aria-label="Categories">
      <h3 className="rx-sidebar-title">Categories</h3>
      <ul className="rx-category-list">
        {allCats.map((cat) => (
          <li key={cat}>
            <button
              className={`rx-category ${selected === cat ? "active" : ""}`}
              onClick={() => onSelect?.(cat)}
              aria-current={selected === cat ? "true" : "false"}
            >
              {cat}
            </button>
          </li>
        ))}
      </ul>
    </aside>
  );
}
