//
// API service for fetching recipes.
// Supports optional REST API via REACT_APP_API_BASE_URL; falls back to local sample data on failure.
//

import sampleRecipes from "../data/sampleRecipes";

// PUBLIC_INTERFACE
export async function getRecipes() {
  /** Fetch all recipes. If REACT_APP_API_BASE_URL is defined, tries the REST API GET /recipes.
   * Falls back to local sample data on failure or if not configured.
   * Returns: Promise<Array<Recipe>>
   */
  const base = process.env.REACT_APP_API_BASE_URL;
  if (base) {
    try {
      const res = await fetch(`${base.replace(/\/+$/, "")}/recipes`);
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const data = await res.json();
      return Array.isArray(data) ? data : sampleRecipes;
    } catch (err) {
      console.warn("Recipe API unavailable, falling back to local data:", err);
      return sampleRecipes;
    }
  }
  return sampleRecipes;
}

// PUBLIC_INTERFACE
export async function getRecipeById(id) {
  /** Fetch single recipe by ID. If REACT_APP_API_BASE_URL is defined, tries GET /recipes/:id.
   * Falls back to the local sample dataset on failure or if not configured.
   * Returns: Promise<Recipe | null>
   */
  const base = process.env.REACT_APP_API_BASE_URL;
  if (base) {
    try {
      const res = await fetch(`${base.replace(/\/+$/, "")}/recipes/${encodeURIComponent(id)}`);
      if (res.ok) {
        const data = await res.json();
        if (data && data.id !== undefined) return data;
      }
      throw new Error(`HTTP ${res.status}`);
    } catch (err) {
      console.warn("Recipe API by id unavailable, using local data:", err);
    }
  }
  const all = await getRecipes();
  return all.find((r) => String(r.id) === String(id)) || null;
}
