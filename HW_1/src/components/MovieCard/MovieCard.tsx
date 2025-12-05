import { type Movie, type ViewMode } from "../../types/types";
import "./MovieCard.css";

type MovieCardProps = {
    movie: Movie;
    onToggleFavorite: (id: number) => void;
    viewMode: ViewMode;
};

export function MovieCard({ movie, onToggleFavorite, viewMode }: MovieCardProps) {
    return (
        <div className={`movie-card ${viewMode}`}>
            <div className="movie-card__poster">
                <img src={movie.posterUrl} alt={movie.title} />
            </div>

            <div className="movie-card__info">
                <div className="movie-card__header">
                    <h3 className="movie-card__title">
                        {movie.title} <span className="movie-card__year">({movie.year})</span>
                    </h3>

                    <button
                        className={`fav-btn ${movie.isFavorite ? "fav-btn--active" : ""}`}
                        onClick={() => onToggleFavorite(movie.id)}
                        aria-label="Добавить в избранное"
                    >
                        {movie.isFavorite ? "⭐" : "☆"}
                    </button>
                </div>
            </div>
        </div>
    );
}