import React, { useMemo, useState } from "react";
import Sidebar from "../components/Sidebar";
import RecipeList from "../components/RecipeList";
import RecipeDetailModal from "../components/RecipeDetailModal";
import { useRecipes } from "../hooks/useRecipes";

// PUBLIC_INTERFACE
export default function Home({ query, onQueryChange }) {
  /** Home page: contains sidebar categories, search, and the recipes grid. */
  const { recipes, loading, error } = useRecipes();
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [opened, setOpened] = useState(null);

  const categories = useMemo(() => {
    const set = new Set();
    recipes.forEach((r) => r.category && set.add(r.category));
    return Array.from(set).sort();
  }, [recipes]);

  const filtered = useMemo(() => {
    const q = (query || "").trim().toLowerCase();
    return recipes.filter((r) => {
      const matchesCategory = selectedCategory === "All" || r.category === selectedCategory;
      if (!q) return matchesCategory;
      const inName = r.name.toLowerCase().includes(q);
      const inIngredients = (r.ingredients || []).some((ing) => String(ing).toLowerCase().includes(q));
      return matchesCategory && (inName || inIngredients);
    });
  }, [recipes, query, selectedCategory]);

  return (
    <div className="rx-shell">
      <Sidebar categories={categories} selected={selectedCategory} onSelect={setSelectedCategory} />
      <main className="rx-main">
        <div className="rx-toolbar">
          <h2>New Recipes</h2>
          <div className="rx-toolbar-actions">
            <label htmlFor="rx-search-proxy" className="sr-only">
              Search
            </label>
            <input
              id="rx-search-proxy"
              className="rx-search-inline"
              type="text"
              placeholder="Search recipes..."
              value={query}
              onChange={(e) => onQueryChange?.(e.target.value)}
            />
          </div>
        </div>
        {loading && <div className="rx-state">Loading recipes...</div>}
        {error && <div className="rx-state error">{error}</div>}
        {!loading && !error && <RecipeList recipes={filtered} onOpen={setOpened} />}
      </main>
      <RecipeDetailModal recipe={opened} onClose={() => setOpened(null)} />
    </div>
  );
}
