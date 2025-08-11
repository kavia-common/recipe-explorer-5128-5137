import React, { createContext, useContext, useEffect, useMemo, useState, useCallback } from "react";

const FavoritesContext = createContext(null);

const STORAGE_KEY = "recipe_favorites_v1";

// PUBLIC_INTERFACE
export function FavoritesProvider({ children }) {
  /** Provider for managing favorite recipes (by ID), persisted in localStorage. */
  const [favoriteIds, setFavoriteIds] = useState(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      return raw ? JSON.parse(raw) : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(favoriteIds));
    } catch {
      // ignore storage errors
    }
  }, [favoriteIds]);

  // PUBLIC_INTERFACE
  const toggleFavorite = useCallback((recipeId) => {
    /** Toggle favorite state for a recipe by ID. Returns the new boolean state. */
    setFavoriteIds((prev) => {
      const exists = prev.includes(recipeId);
      if (exists) {
        return prev.filter((id) => id !== recipeId);
      }
      return [...prev, recipeId];
    });
  }, []);

  // PUBLIC_INTERFACE
  const isFavorite = useCallback((recipeId) => {
    /** Check whether a recipe ID is favorited. */
    return favoriteIds.includes(recipeId);
  }, [favoriteIds]);

  const value = useMemo(
    () => ({
      favoriteIds,
      toggleFavorite,
      isFavorite,
    }),
    [favoriteIds, toggleFavorite, isFavorite]
  );

  return <FavoritesContext.Provider value={value}>{children}</FavoritesContext.Provider>;
}

// PUBLIC_INTERFACE
export function useFavorites() {
  /** Hook to access favorites context. */
  const ctx = useContext(FavoritesContext);
  if (!ctx) throw new Error("useFavorites must be used within FavoritesProvider");
  return ctx;
}
