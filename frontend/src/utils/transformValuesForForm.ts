import { Movie, MovieInitialState } from 'src/types/Movie';

export const transformMovieValuesForForm = (
  movie: Movie,
): MovieInitialState => {
  return {
    name: movie.name,
    rate: movie.rate,
    year: movie.year,
    description: movie.description,
    directorid: movie.DirectorId ? `${movie.DirectorId}` : '',
    genres: movie.Genres.map((genre) => genre.id),
  };
};
