import { useState, useEffect } from "react";
const KEY = "6e45ebdb";

export function useMovies(query, callback) {
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(
    function () {
      callback?.();
      async function fetchMovies() {
        try {
          setIsLoading(() => true);
          setError(() => "");
          const res = await fetch(
            `http://www.omdbapi.com/?apikey=${KEY}&s=${query}`
          );
          if (!res.ok) {
            // response is not ok (404, 500)
            throw new Error(`HTTP error! Status: ${res.status}`);
          }
          const data = await res.json();
          if (data.Response === "False") {
            throw new Error(`API Error: ${data.Error}`);
          }
          setMovies(() => data.Search);
          setIsLoading(() => false);
        } catch (err) {
          console.error(`hahahahahahah~~~~~~${err.message}`);
          setError(() => err.message);
        } finally {
          setIsLoading(() => false);
        }
      }
      fetchMovies();
    },
    [query]
  );
  return { movies, isLoading, error };
}
