import { useRef, useState } from "react";
import { initialMovies } from "./moviesData";
import { type Movie, type FilterMode, type ViewMode } from "./types/types";
import { Toolbar } from "./components/ToolBar/ToolBar";
import { MoviesList } from "./components/MoviesList/MoviesList";
import "./App.css";

function App() {
  const [movies, setMovies] = useState<Movie[]>(initialMovies);
  const [filterMode, setFilterMode] = useState<FilterMode>("all");
  const [viewMode, setViewMode] = useState<ViewMode>("grid");
  const searchRef = useRef<HTMLInputElement | null>(null);
  const [, setSearchTick] = useState(0);

  const handleToggleFavorite = (id: number) => {
    setMovies((prev) =>
      prev.map((m) =>
        m.id === id ? { ...m, isFavorite: !m.isFavorite } : m
      )
    );
  };

  const handleChangeFilter = (mode: FilterMode) => {
    setFilterMode(mode);
  };

  const handleToggleViewMode = () => {
    setViewMode((prev) => (prev === "grid" ? "list" : "grid"));
  };

  const handleSearchChange = () => {
    setSearchTick((prev) => prev + 1);
  };

  const filteredMovies = movies.filter((movie) => {
    if (filterMode === "favorites" && !movie.isFavorite) {
      return false;
    }

    const searchValue =
      searchRef.current?.value?.trim().toLowerCase() ?? "";

    if (searchValue !== "") {
      const titleLower = movie.title.toLowerCase();
      if (!titleLower.includes(searchValue)) {
        return false;
      }
    }

    return true;
  });

  return (
    <div className="app">
      <h1 className="app__title">Мои фильмы</h1>
      <Toolbar
        filterMode={filterMode}
        onChangeFilter={handleChangeFilter}
        onSearch={handleSearchChange}
        searchInputRef={searchRef}
        viewMode={viewMode}
        onToggleViewMode={handleToggleViewMode}
      />

      <MoviesList
        movies={filteredMovies}
        onToggleFavorite={handleToggleFavorite}
        viewMode={viewMode}
      />
    </div>
  );
}

export default App;