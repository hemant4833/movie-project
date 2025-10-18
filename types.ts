
export interface Movie {
  id: string;
  title: string;
  posterUrl: string;
  year: string;
}

export interface MovieDetails extends Movie {
  synopsis: string;
  genres: string[];
  rating: number;
  trailerUrl?: string; // e.g., a YouTube embed link
}
