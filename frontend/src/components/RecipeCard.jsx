import React from "react";
import { Link } from "react-router-dom";
import { useFavorites } from "../context/FavoritesContext";

// PUBLIC_INTERFACE
export default function RecipeCard({ recipe, onOpen }) {
  /** Card showing recipe summary with favorite action and link to details. */
  const { isFavorite, toggleFavorite } = useFavorites();
  const fav = isFavorite(recipe.id);

  return (
    <div className="rx-card" role="article">
      <button className="rx-card-fav" aria-label="Toggle favorite" onClick={() => toggleFavorite(recipe.id)}>
        {fav ? "★" : "☆"}
      </button>
      <div className="rx-card-img-wrapper" onClick={() => onOpen?.(recipe)} role="button" tabIndex={0}>
        <img className="rx-card-img" src={recipe.image} alt={recipe.name} />
      </div>
      <div className="rx-card-body">
        <h4 className="rx-card-title">{recipe.name}</h4>
        <div className="rx-card-meta">
          <span className="rx-badge">{recipe.time} mins</span>
          <span className="rx-rating">⭐ {recipe.rating.toFixed(1)}</span>
          {recipe.category ? <span className="rx-chip">{recipe.category}</span> : null}
        </div>
        <div className="rx-card-actions">
          <button className="rx-btn rx-btn-secondary" onClick={() => onOpen?.(recipe)}>
            Quick View
          </button>
          <Link to={`/recipe/${recipe.id}`} className="rx-btn rx-btn-primary">
            View Details
          </Link>
        </div>
      </div>
    </div>
  );
}
