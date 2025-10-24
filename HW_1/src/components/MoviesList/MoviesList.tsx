import { type Movie, type ViewMode } from "../../types/types";
import { MovieCard } from "../MovieCard/MovieCard";
import "./MoviesList.css";

type MoviesListProps = {
    movies: Movie[];
    onToggleFavorite: (id: number) => void;
    viewMode: ViewMode;
};

export function MoviesList({ movies, onToggleFavorite, viewMode }: MoviesListProps) {
    if (movies.length === 0) {
        return <p className="empty">Фильмов нет.</p>;
    }

    return (
        <div className={`movies-list movies-list--${viewMode}`}>
            {movies.map((movie) => (
                <MovieCard
                    key={movie.id}
                    movie={movie}
                    onToggleFavorite={onToggleFavorite}
                    viewMode={viewMode}
                />
            ))}
        </div>
    );
}