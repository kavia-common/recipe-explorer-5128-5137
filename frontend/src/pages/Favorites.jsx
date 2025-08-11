import React, { useMemo, useState } from "react";
import { useFavorites } from "../context/FavoritesContext";
import { useRecipes } from "../hooks/useRecipes";
import RecipeList from "../components/RecipeList";
import RecipeDetailModal from "../components/RecipeDetailModal";

// PUBLIC_INTERFACE
export default function Favorites() {
  /** Favorites page: displays favorited recipes and allows quick view. */
  const { favoriteIds } = useFavorites();
  const { recipes, loading } = useRecipes();
  const [opened, setOpened] = useState(null);

  const favRecipes = useMemo(() => {
    const set = new Set(favoriteIds);
    return recipes.filter((r) => set.has(r.id));
  }, [favoriteIds, recipes]);

  return (
    <div className="rx-page">
      <div className="rx-page-header">
        <h2>Your Favorites</h2>
        <p className="rx-muted">Saved recipes you love.</p>
      </div>
      {loading ? <div className="rx-state">Loading...</div> : <RecipeList recipes={favRecipes} onOpen={setOpened} />}
      <RecipeDetailModal recipe={opened} onClose={() => setOpened(null)} />
    </div>
  );
}
