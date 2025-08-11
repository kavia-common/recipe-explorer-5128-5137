# Recipe Explorer Frontend

A modern, minimalistic React app to browse, search, and manage recipes. Supports:
- View all recipes
- Search by name or ingredients
- View detailed ingredients and instructions
- Favorite/save recipes (persisted in localStorage)
- Optional REST API via `.env`, falls back to local sample data

## Run locally

- Copy `.env.example` to `.env` and set variables if you have a backend:
  - `REACT_APP_API_BASE_URL=https://api.example.com`
  - `REACT_APP_SITE_NAME=Recipe Explorer`
- Install deps and start:
  - `npm install`
  - `npm start`

## Project layout

- `src/services/api.js` — API layer using REACT_APP_API_BASE_URL or local fallback
- `src/data/sampleRecipes.js` — sample data for offline use
- `src/context/FavoritesContext.jsx` — favorites store with localStorage
- `src/pages/*` — Home, Favorites, Details pages
- `src/components/*` — UI building blocks

## Colors

The theme uses:
- Primary: `#4CAF50`
- Secondary: `#FF9800`
- Accent: `#FFC107`

These are defined in `src/App.css` and applied across components.
