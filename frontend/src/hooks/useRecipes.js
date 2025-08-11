import { useEffect, useState } from "react";
import { getRecipes } from "../services/api";

// PUBLIC_INTERFACE
export function useRecipes() {
  /** Load recipes from API or local sample data.
   * Returns: { recipes, loading, error, reload }
   */
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const load = async () => {
    setLoading(true);
    setError("");
    try {
      const data = await getRecipes();
      setRecipes(Array.isArray(data) ? data : []);
    } catch (e) {
      setError("Failed to load recipes");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return { recipes, loading, error, reload: load };
}
