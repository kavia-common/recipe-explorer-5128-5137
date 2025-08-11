import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getRecipeById } from "../services/api";
import { useFavorites } from "../context/FavoritesContext";

// PUBLIC_INTERFACE
export default function RecipeDetails() {
  /** Dedicated page to render a single recipe's ingredients and instructions. */
  const { id } = useParams();
  const [recipe, setRecipe] = useState(null);
  const [loading, setLoading] = useState(true);
  const { isFavorite, toggleFavorite } = useFavorites();

  useEffect(() => {
    let mounted = true;
    (async () => {
      setLoading(true);
      const r = await getRecipeById(id);
      if (mounted) {
        setRecipe(r);
        setLoading(false);
        if (r?.name) {
          document.title = `${r.name} • ${process.env.REACT_APP_SITE_NAME || "Recipe Explorer"}`;
        }
      }
    })();
    return () => {
      mounted = false;
    };
  }, [id]);

  if (loading) return <div className="rx-state">Loading...</div>;
  if (!recipe) return <div className="rx-state error">Recipe not found.</div>;

  const fav = isFavorite(recipe.id);

  return (
    <div className="rx-details-page">
      <div className="rx-details-hero">
        <img src={recipe.image} alt={recipe.name} />
        <div className="rx-details-hero-info">
          <h1>{recipe.name}</h1>
          <div className="rx-modal-meta">
            <span className="rx-badge">{recipe.time} mins</span>
            <span className="rx-rating">⭐ {recipe.rating.toFixed(1)}</span>
            {recipe.category ? <span className="rx-chip">{recipe.category}</span> : null}
          </div>
          <button className="rx-btn rx-btn-primary" onClick={() => toggleFavorite(recipe.id)}>
            {fav ? "★ Remove Favorite" : "☆ Save to Favorites"}
          </button>
        </div>
      </div>

      <div className="rx-details-content">
        <section>
          <h2>Ingredients</h2>
          <ul className="rx-list">
            {recipe.ingredients?.map((ing, i) => (
              <li key={i}>{ing}</li>
            ))}
          </ul>
        </section>
        <section>
          <h2>Instructions</h2>
          <ol className="rx-list">
            {recipe.instructions?.map((step, i) => (
              <li key={i}>{step}</li>
            ))}
          </ol>
        </section>
      </div>
    </div>
  );
}
