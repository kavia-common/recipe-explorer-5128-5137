import React from "react";
import { Link, useLocation } from "react-router-dom";

// PUBLIC_INTERFACE
export default function Header({ query, onQueryChange }) {
  /** Top header with brand, search bar, and navigation links. */
  const loc = useLocation();
  const showSearch = loc.pathname === "/" || loc.pathname.startsWith("/recipe/");

  return (
    <header className="rx-header">
      <div className="rx-header-inner">
        <Link to="/" className="rx-brand" aria-label="Recipe Explorer Home">
          <span className="rx-brand-icon">🥗</span>
          <span className="rx-brand-name">{process.env.REACT_APP_SITE_NAME || "Recipe Explorer"}</span>
        </Link>

        {showSearch && (
          <div className="rx-search">
            <input
              type="text"
              value={query}
              onChange={(e) => onQueryChange?.(e.target.value)}
              placeholder="Search recipes or ingredients..."
              aria-label="Search recipes"
            />
          </div>
        )}

        <nav className="rx-nav">
          <Link to="/" className="rx-nav-link">
            Home
          </Link>
          <Link to="/favorites" className="rx-nav-link">
            Favorites
          </Link>
        </nav>
      </div>
    </header>
  );
}
