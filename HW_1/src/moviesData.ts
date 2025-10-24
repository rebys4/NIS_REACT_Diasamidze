import { type Movie } from "./types/types";

export const initialMovies: Movie[] = [
    {
        id: 1,
        title: "The Matrix",
        year: 1999,
        posterUrl: "https://m.media-amazon.com/images/I/51vpnbwFHrL._AC_.jpg",
        isFavorite: false,
    },
    {
        id: 2,
        title: "Interstellar",
        year: 2014,
        posterUrl: "https://m.media-amazon.com/images/I/91kFYg4fX3L._AC_SL1500_.jpg",
        isFavorite: true,
    },
    {
        id: 3,
        title: "Inception",
        year: 2010,
        posterUrl: "https://m.media-amazon.com/images/I/81p+xe8cbnL._AC_SL1500_.jpg",
        isFavorite: false,
    },
    {
        id: 4,
        title: "The Godfather",
        year: 1972,
        posterUrl: "https://m.media-amazon.com/images/I/51rggtPgmRL._AC_.jpg",
        isFavorite: false,
    },
    {
        id: 5,
        title: "Pulp Fiction",
        year: 1994,
        posterUrl: "https://m.media-amazon.com/images/I/71c05lTE03L._AC_SL1181_.jpg",
        isFavorite: false,
    },
    {
        id: 6,
        title: "The Shawshank Redemption",
        year: 1994,
        posterUrl: "https://m.media-amazon.com/images/I/51NiGlapXlL._AC_.jpg",
        isFavorite: true,
    },
];