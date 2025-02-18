import { useEffect, useRef, useState } from "react";
import StarRating from "./StarRating";
import { useMovies } from "./useMovies";

const average = (arr) =>
  arr.reduce((acc, cur, i, arr) => acc + cur / arr.length, 0);

const KEY = "6e45ebdb";

export default function App() {
  const [watched, setWatched] = useState([]);
  const [query, setQuery] = useState("friends");
  const [select, setSelect] = useState(null);
  const { movies, isLoading, error } = useMovies(query, handleCloseMovie);

  function handleSearch(name) {
    // console.log(name);
    setQuery(() => name);
  }
  function handleSelect(selecMovie) {
    // const selectMovie = movies.find((item) => item.imdbID === id);
    // console.log(selecMovie);
    setSelect(() => selecMovie);
  }
  function handleCloseMovie() {
    setSelect(() => null);
  }
  function handleAddWatched(movieObj) {
    // console.log(movieObj);
    setWatched((watched) => [...watched, movieObj]);
    setSelect(null);
  }

  useEffect(() => {
    document.title = select?.Title ? select.Title : "PopMovie";
    return function () {
      document.title = "PopMovie";
    };
  }, [select]);

  return (
    <>
      <NavBar>
        <Search onSearch={handleSearch} />
        <NumResults movies={movies} />
      </NavBar>

      <Main>
        <Box>
          {isLoading && <Loader />}
          {!isLoading && !error && (
            <MovieList
              movies={movies}
              onSelect={handleSelect}
              select={select}
            />
          )}
          {error && <ErrorMsg>{error}</ErrorMsg>}
        </Box>

        <Box>
          {select ? (
            <SelectedMovie
              selectMovie={select}
              onCloseMovie={handleCloseMovie}
              onAddWatchedMovie={handleAddWatched}
              watched={watched}
            />
          ) : (
            <>
              <WatchedSummary watched={watched} />
              <WatchedMoviesList watched={watched} />
            </>
          )}
        </Box>
      </Main>
    </>
  );
}

function Loader() {
  return <p className="loader">Loading...</p>;
}
function ErrorMsg({ children }) {
  return (
    <p className="error">
      <span>🛑</span>
      {children}
    </p>
  );
}
function NavBar({ children }) {
  return (
    <nav className="nav-bar">
      <Logo />
      {children}
    </nav>
  );
}
function Logo() {
  return (
    <div className="logo">
      <span role="img">🍿</span>
      <h1>usePopcorn</h1>
    </div>
  );
}
function Search({ onSearch }) {
  const [query, setQuery] = useState("");
  function handleSub(e) {
    // e.preventDefault();
    if (e.key === "Enter") {
      // console.log(query);
      onSearch(query);
    }
  }
  return (
    <input
      className="search"
      type="text"
      placeholder="Search movies..."
      value={query}
      onChange={(e) => setQuery(e.target.value)}
      onKeyDown={handleSub}
    />
  );
}
function NumResults({ movies }) {
  return (
    <p className="num-results">
      Found <strong>{movies?.length}</strong> results
    </p>
  );
}

function Main({ children }) {
  return <main className="main">{children}</main>;
}

function Box({ children }) {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <div className="box">
      <button className="btn-toggle" onClick={() => setIsOpen((open) => !open)}>
        {isOpen ? "–" : "+"}
      </button>

      {isOpen && children}
    </div>
  );
}

function MovieList({ movies, onSelect, select }) {
  return (
    <ul className="list list-movies">
      {movies?.map((movie) => (
        <Movie
          key={movie.imdbID}
          movie={movie}
          onSelect={onSelect}
          select={select}
        />
      ))}
    </ul>
  );
}

function Movie({ movie, onSelect, select }) {
  return (
    <li
      onClick={() => onSelect(movie)}
      className={movie?.imdbID === select?.imdbID ? "selected" : ""}
    >
      <img src={movie.Poster} alt={`${movie.Title} poster`} />
      <h3>{movie.Title}</h3>
      <div>
        <p>
          <span>🗓</span>
          <span>{movie.Year}</span>
        </p>
      </div>
    </li>
  );
}

function SelectedMovie({
  selectMovie,
  onCloseMovie,
  onAddWatchedMovie,
  watched,
}) {
  const [movieData, setMovieData] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [rate, setRate] = useState(null);
  let numsOfRate = useRef(0);
  const isWatched = watched.some((item) => item.imdbID === selectMovie.imdbID);
  // console.log(isWatched);
  const {
    Title: title,
    Year: year,
    Poster: poster,
    Runtime: runtime,
    imdbRating,
    Plot: plot,
    Released: released,
    Actors: actors,
    Director: director,
    Genre: genre,
  } = movieData;

  function handleRating(value) {
    setRate(() => value);
    numsOfRate.current += 1;
  }
  function handleAdd() {
    const obj = {
      imdbID: movieData.imdbID,
      Title: title,
      Year: year,
      Poster: poster,
      runtime: Number(runtime.split(" ").at(0)),
      imdbRating: Number(imdbRating),
      userRating: rate,
    };
    !rate
      ? alert("You need to rate the movie before adding")
      : onAddWatchedMovie(obj);
    console.log(`you have rated this movie for  ${numsOfRate.current}`);
  }

  useEffect(
    function () {
      async function getMovieDetails() {
        setIsLoading(() => true);
        const res = await fetch(
          `http://www.omdbapi.com/?apikey=${KEY}&i=${selectMovie.imdbID}`
        );
        const data = await res.json();
        // console.log(data);
        setMovieData(() => data);
        setIsLoading(() => false);
      }
      getMovieDetails();
    },
    [selectMovie]
  );

  return isLoading ? (
    <Loader />
  ) : (
    <div className="details">
      <header>
        <button className="btn-back" onClick={() => onCloseMovie()}>
          &larr;
        </button>
        <img src={poster} alt={`Poster of ${title}`} />
        <div className="details-overview">
          <h2>{title}</h2>
          <p>
            {released} &bull; {runtime}
          </p>
          <p>{genre}</p>
          <p>
            <span>⭐</span>
            {imdbRating} IMDB rating
          </p>
        </div>
      </header>
      <section>
        <div className="rating">
          {isWatched ? (
            <p>
              Your Rated this movie{" "}
              {
                watched.find((item) => item.imdbID === selectMovie.imdbID)
                  .userRating
              }
            </p>
          ) : (
            <>
              <StarRating maxRating={10} onSetRating={handleRating} />
              <button className="btn-add" onClick={handleAdd}>
                + Add to list
              </button>
            </>
          )}
        </div>
        <p>
          <em>{plot}</em>
        </p>
        <p>Starring {actors}</p>
        <p>Directed by {director}</p>
      </section>
    </div>
  );
}

function WatchedSummary({ watched }) {
  const avgImdbRating = average(watched.map((movie) => movie.imdbRating));
  const avgUserRating = average(watched.map((movie) => movie.userRating));
  const avgRuntime = average(watched.map((movie) => movie.runtime));

  return (
    <div className="summary">
      <h2>Movies you watched</h2>
      <div>
        <p>
          <span>#️⃣</span>
          <span>{watched.length} movies</span>
        </p>
        <p>
          <span>⭐️</span>
          <span>{avgImdbRating}</span>
        </p>
        <p>
          <span>🌟</span>
          <span>{avgUserRating}</span>
        </p>
        <p>
          <span>⏳</span>
          <span>{avgRuntime} min</span>
        </p>
      </div>
    </div>
  );
}

function WatchedMoviesList({ watched }) {
  return (
    <ul className="list">
      {watched.map((movie) => (
        <WatchedMovie movie={movie} key={movie.imdbID} />
      ))}
    </ul>
  );
}

function WatchedMovie({ movie }) {
  return (
    <li>
      <img src={movie.Poster} alt={`${movie.Title} poster`} />
      <h3>{movie.Title}</h3>
      <div>
        <p>
          <span>⭐️</span>
          <span>{movie.imdbRating}</span>
        </p>
        <p>
          <span>🌟</span>
          <span>{movie.userRating}</span>
        </p>
        <p>
          <span>⏳</span>
          <span>{movie.runtime} min</span>
        </p>
      </div>
    </li>
  );
}
