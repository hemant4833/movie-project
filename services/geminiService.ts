import { GoogleGenAI, Type } from "@google/genai";
import type { Movie, MovieDetails } from '../types';

const API_KEY = process.env.API_KEY;

if (!API_KEY) {
  throw new Error("API_KEY environment variable not set");
}

const ai = new GoogleGenAI({ apiKey: API_KEY });

const movieListSchema = {
  type: Type.ARRAY,
  items: {
    type: Type.OBJECT,
    properties: {
      id: { type: Type.STRING, description: "A unique ID for the movie, e.g., 'tt0111161'" },
      title: { type: Type.STRING, description: "The title of the movie." },
      year: { type: Type.STRING, description: "The release year of the movie." },
      posterUrl: { type: Type.STRING, description: "A URL to a high-quality movie poster. Use picsum.photos for placeholders if needed." },
    },
    required: ["id", "title", "year", "posterUrl"],
  },
};

const movieDetailsSchema = {
  type: Type.OBJECT,
  properties: {
    id: { type: Type.STRING, description: "A unique ID for the movie, e.g., 'tt0111161'" },
    title: { type: Type.STRING, description: "The title of the movie." },
    year: { type: Type.STRING, description: "The release year of the movie." },
    posterUrl: { type: Type.STRING, description: "A URL to a high-quality movie poster. Use picsum.photos for placeholders if needed." },
    synopsis: { type: Type.STRING, description: "A detailed synopsis of the movie, around 150-200 words." },
    genres: { type: Type.ARRAY, items: { type: Type.STRING }, description: "A list of genres associated with the movie." },
    rating: { type: Type.NUMBER, description: "The movie's rating out of 10 (e.g., 8.7)." },
    trailerUrl: { type: Type.STRING, description: "A URL to a YouTube trailer for the movie. Should be an embeddable link." },
  },
  required: ["id", "title", "year", "posterUrl", "synopsis", "genres", "rating"],
};


const generateContentWithSchema = async <T,>(prompt: string, schema: any): Promise<T> => {
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
      config: {
        responseMimeType: 'application/json',
        responseSchema: schema,
      },
    });
    const text = response.text.trim();
    return JSON.parse(text) as T;
  } catch (error) {
    console.error("Error generating content with schema:", error);
    throw new Error("Failed to fetch data from the AI model.");
  }
};


export const getPopularMovies = async (): Promise<Movie[]> => {
  const prompt = `
    Generate a list of 20 popular and critically acclaimed Bollywood movies from different eras and genres.
    Ensure diverse representation within Bollywood cinema. Provide poster URLs for each. The posterUrl must be a valid image URL. For placeholder, use a URL like 'https://picsum.photos/seed/random_movie_title/500/750'.
  `;
  return generateContentWithSchema<Movie[]>(prompt, movieListSchema);
};

export const searchMovies = async (query: string): Promise<Movie[]> => {
  const prompt = `
    Find 20 Bollywood movies that match the search query: "${query}".
    Return them as a list. Provide poster URLs for each. The posterUrl must be a valid image URL. For placeholder, use a URL like 'https://picsum.photos/seed/random_movie_title/500/750'.
  `;
  return generateContentWithSchema<Movie[]>(prompt, movieListSchema);
};

export const getMovieDetails = async (movieTitle: string): Promise<MovieDetails> => {
  const prompt = `
    Provide detailed information for the Bollywood movie titled "${movieTitle}".
    Include a full synopsis, genres, a rating out of 10, and a YouTube embed URL for the trailer. The posterUrl must be a valid image URL. For placeholder, use a URL like 'https://picsum.photos/seed/random_movie_title/500/750'.
  `;
  return generateContentWithSchema<MovieDetails>(prompt, movieDetailsSchema);
};