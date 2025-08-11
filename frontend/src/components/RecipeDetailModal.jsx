import React, { useEffect } from "react";
import { useFavorites } from "../context/FavoritesContext";

// PUBLIC_INTERFACE
export default function RecipeDetailModal({ recipe, onClose }) {
  /** Modal overlay showing recipe details (ingredients and instructions). */
  const { isFavorite, toggleFavorite } = useFavorites();

  useEffect(() => {
    const onEsc = (e) => e.key === "Escape" && onClose?.();
    document.addEventListener("keydown", onEsc);
    return () => document.removeEventListener("keydown", onEsc);
  }, [onClose]);

  if (!recipe) return null;

  const fav = isFavorite(recipe.id);

  return (
    <div className="rx-modal-backdrop" onClick={onClose} role="dialog" aria-modal="true">
      <div className="rx-modal" onClick={(e) => e.stopPropagation()}>
        <div className="rx-modal-header">
          <h3>{recipe.name}</h3>
          <div className="rx-modal-actions">
            <button className="rx-btn rx-btn-ghost" onClick={() => toggleFavorite(recipe.id)} aria-label="Toggle favorite">
              {fav ? "★ Favorited" : "☆ Favorite"}
            </button>
            <button className="rx-btn rx-btn-ghost" onClick={onClose} aria-label="Close">
              ✕
            </button>
          </div>
        </div>
        <div className="rx-modal-body">
          <img className="rx-modal-img" src={recipe.image} alt={recipe.name} />
          <div className="rx-modal-meta">
            <span className="rx-badge">{recipe.time} mins</span>
            <span className="rx-rating">⭐ {recipe.rating.toFixed(1)}</span>
            {recipe.category ? <span className="rx-chip">{recipe.category}</span> : null}
          </div>

          <section>
            <h4>Ingredients</h4>
            <ul className="rx-list">
              {recipe.ingredients?.map((ing, idx) => (
                <li key={idx}>{ing}</li>
              ))}
            </ul>
          </section>

          <section>
            <h4>Instructions</h4>
            <ol className="rx-list">
              {recipe.instructions?.map((step, idx) => (
                <li key={idx}>{step}</li>
              ))}
            </ol>
          </section>
        </div>
      </div>
    </div>
  );
}
