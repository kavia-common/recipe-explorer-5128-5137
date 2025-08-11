import React from "react";
import RecipeCard from "./RecipeCard";

// PUBLIC_INTERFACE
export default function RecipeList({ recipes, onOpen }) {
  /** Grid of RecipeCard components. */
  if (!recipes?.length) {
    return <div className="rx-empty">No recipes found.</div>;
  }
  return (
    <div className="rx-grid">
      {recipes.map((r) => (
        <RecipeCard key={r.id} recipe={r} onOpen={onOpen} />
      ))}
    </div>
  );
}
