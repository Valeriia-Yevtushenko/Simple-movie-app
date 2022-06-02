import { Genre } from './Genre';
import { Nullable } from './globalTypes';

export interface Movie {
  id: number;
  name: string;
  rate: number;
  year: string;
  description: string;
  DirectorId: Nullable<number>;
  Genres: Genre[];
}
export interface CreateMovieDTO {
  name: string;
  rate: number;
  year: string;
  description: string;
  directorid: Nullable<number>;
  genres: number[];
}

export interface UpdateMovieDTO extends CreateMovieDTO {}
export interface GetMovieDTO extends Movie {}

export interface UpdateMovieActionProps {
  body: UpdateMovieDTO;
  id: number;
}

export interface MovieInitialState {
  name: string;
  directorid: number | string;
  rate: number | string;
  year: number | string;
  description: string;
  genres: number[];
}
