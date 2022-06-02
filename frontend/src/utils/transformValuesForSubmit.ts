import {
  MovieInitialState,
  UpdateMovieDTO,
  CreateMovieDTO,
  Movie,
} from 'src/types/Movie';
import { Nullable, SelectorValues } from 'src/types/globalTypes';
import { UserMovieDTO } from 'src/types/User';

export const transformMovieValuesForSubmit = (
  values: MovieInitialState,
  selectedGenres: SelectorValues[],
  selectedDirector: Nullable<SelectorValues>,
): UpdateMovieDTO | CreateMovieDTO => {
  return {
    name: values.name,
    directorid: selectedDirector
      ? selectedDirector.id
      : values.directorid === ''
      ? null
      : +values.directorid,
    rate: +values.rate,
    year: `${values.year}`,
    description: values.description,
    genres:
      selectedGenres.length > 0
        ? selectedGenres.map((genre) => genre.id)
        : values.genres,
  };
};
export const transformUserMoviesValuesForSubmit = (
  values: Movie,
): UserMovieDTO => {
  return values.id;
};
