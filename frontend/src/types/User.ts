import { Movie, UpdateMovieDTO } from './Movie';

export interface User {
  email: string;
  password: string;
}

export interface UpdateUserDTO extends User {}

export interface UpdateUserActionProps {
  body: UpdateUserDTO;
}

export interface UserInitialState {
  email: string;
  password: string;
}

export interface UserMovies {
  movies: Movie[];
}

export type UserMovieDTO = number;

export interface UpdateUserMoviesDTO {
  movies: UserMovieDTO[];
}

export interface UpdateUserMoviesActionProps {
  body: UpdateUserMoviesDTO;
}

export interface GetSingleUserMovieDTO {
  DirectorId: number;
  UserMovie: {
    MovieId: number;
    UserId: number;
    createdAt: string;
    updatedAt: string;
    id: number;
  };
  description: string;
  id: number;
  name: string;
  rate: number;
  year: number;
}

export interface GetUserMoviesDTO {
  id: number;
  password: number;
  email: string;
  updatedAt: string;
  createdAt: string;
  Movies: GetSingleUserMovieDTO[];
}
