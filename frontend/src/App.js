import React, { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import Header from "./components/Header";
import Home from "./pages/Home";
import Favorites from "./pages/Favorites";
import RecipeDetails from "./pages/RecipeDetails";
import { FavoritesProvider } from "./context/FavoritesContext";

// PUBLIC_INTERFACE
function App() {
  /** Root application component with routing and global providers. */
  const [query, setQuery] = useState("");

  useEffect(() => {
    document.title = process.env.REACT_APP_SITE_NAME || "Recipe Explorer";
  }, []);

  return (
    <FavoritesProvider>
      <BrowserRouter>
        <Header query={query} onQueryChange={setQuery} />
        <div className="rx-container">
          <Routes>
            <Route path="/" element={<Home query={query} onQueryChange={setQuery} />} />
            <Route path="/favorites" element={<Favorites />} />
            <Route path="/recipe/:id" element={<RecipeDetails />} />
          </Routes>
        </div>
        <footer className="rx-footer">
          <p>
            © {new Date().getFullYear()} {process.env.REACT_APP_SITE_NAME || "Recipe Explorer"}
          </p>
        </footer>
      </BrowserRouter>
    </FavoritesProvider>
  );
}

export default App;
