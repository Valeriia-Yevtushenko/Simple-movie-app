import { useEffect, useState } from 'react';

import {
  Button,
  FormControl,
  Grid,
  InputLabel,
  OutlinedInput,
  CircularProgress,
  Typography,
} from '@mui/material';
import { useParams } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch } from 'src/redux/storeTypes';
import {
  movieSelector,
  createMovie,
  editMovie,
  getMovie,
  resetSingleMovie,
} from 'src/redux/Movies/moviesSlice';
import {
  MovieInitialState,
  CreateMovieDTO,
  UpdateMovieDTO,
} from 'src/types/Movie';
import { genreListSelector, getGenres } from 'src/redux/Genres/genresSlice';
import {
  directorListSelector,
  getDirectors,
} from 'src/redux/Directors/directorsSlice';
import { transformMovieValuesForSubmit } from 'src/utils/transformValuesForSubmit';
import { transformMovieValuesForForm } from 'src/utils/transformValuesForForm';
import { Nullable, SelectorValues } from 'src/types/globalTypes';
import {
  transformToSelectOption,
  transformToSelectOptions,
} from 'src/utils/transformToSelectOption';

import { ComboboxMultiple } from 'src/components/layout/ComboboxMultiple';
import { ComboboxSingle } from 'src/components/layout/ComboboxSingle';

const initialState = {
  name: '',
  directorid: '',
  rate: '',
  year: '',
  description: '',
  genres: [],
};

export const SingleMovie: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();

  const { data: movie, isLoadingMovie } = useSelector(movieSelector);
  const { data: directors, isLoading: isLoadingDirectors } =
    useSelector(directorListSelector);
  const { data: genres, isLoading: isLoadingGenres } =
    useSelector(genreListSelector);
  const params = useParams();
  const movieId = params?.id ?? null;
  const [values, setValues] = useState<MovieInitialState>(initialState);
  const [selectedGenres, setSelectedGenres] = useState<SelectorValues[]>([]);
  const [selectedDirector, setSelectedDirector] =
    useState<Nullable<SelectorValues>>(null);

  const clearState = () => {
    setValues(initialState);
    setSelectedGenres([]);
    setSelectedDirector(null);
  };

  useEffect(() => {
    if (!!movieId && !movie) dispatch(getMovie(+movieId));
    if (!!movieId && movie) setValues(transformMovieValuesForForm(movie));
    if (!movieId && movie) {
      dispatch(resetSingleMovie(movie));
      clearState();
    }
    return () => {
      dispatch(resetSingleMovie(movie));
    };
  }, [movieId, movie, dispatch]);

  const handleChange =
    (prop: keyof MovieInitialState) =>
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setValues({ ...values, [prop]: event.target.value });
    };

  useEffect(() => {
    if (!directors && !isLoadingDirectors) dispatch(getDirectors());
  }, [directors, isLoadingDirectors, dispatch]);

  useEffect(() => {
    if (directors && movie?.DirectorId && movieId) {
      const currentMovieDirector = directors.find(
        (director) => director.id === movie.DirectorId,
      );
      if (currentMovieDirector)
        setSelectedDirector(transformToSelectOption(currentMovieDirector));
    }
  }, [directors, movie, movieId]);
  useEffect(() => {
    if (movie?.Genres && movieId) {
      if (movie?.Genres?.length > 0)
        setSelectedGenres(transformToSelectOptions(movie.Genres));
    }
  }, [movie, movieId]);

  useEffect(() => {
    if (!genres && !isLoadingGenres) dispatch(getGenres());
  }, [genres, isLoadingGenres, dispatch]);

  const onSubmit = async (event: any) => {
    event.preventDefault();
    const { rate, year } = values;
    if (rate !== '' && year !== '') {
      const transformedValues = transformMovieValuesForSubmit(
        values,
        selectedGenres,
        selectedDirector,
      );
      if (!movieId) {
        dispatch(createMovie(transformedValues as CreateMovieDTO));
      } else {
        dispatch(
          editMovie({
            body: transformedValues as UpdateMovieDTO,
            id: +movieId,
          }),
        );
      }
    }
  };

  if (isLoadingMovie) return <CircularProgress />;

  return (
    <Grid
      container
      spacing={0}
      direction='column'
      alignItems='center'
      justifyContent='flex-start'
      style={{ minHeight: '100vh' }}
    >
      <Typography variant='body1' color='text.primary' margin={2}>
        Movie
      </Typography>
      <form onSubmit={onSubmit}>
        <Grid item xs={3}>
          <FormControl sx={{ m: 1, width: 300 }} variant='outlined'>
            <InputLabel htmlFor='name'>Name</InputLabel>

            <OutlinedInput
              id='name'
              type='text'
              value={values.name}
              onChange={handleChange('name')}
              label='Name'
            />
          </FormControl>
        </Grid>
        <Grid item xs={3}>
          <FormControl sx={{ m: 1, width: 300 }} variant='outlined'>
            <InputLabel htmlFor='description'>Description</InputLabel>

            <OutlinedInput
              id='description'
              type='text'
              value={values.description}
              onChange={handleChange('description')}
              label='Description'
            />
          </FormControl>
        </Grid>
        <Grid item xs={3}>
          <FormControl sx={{ m: 1, width: 300 }} variant='outlined'>
            <InputLabel htmlFor='year'>Year</InputLabel>

            <OutlinedInput
              id='year'
              type='text'
              value={values.year}
              onChange={handleChange('year')}
              label='year'
            />
          </FormControl>
        </Grid>
        <Grid item xs={3}>
          <FormControl sx={{ m: 1, width: 300 }} variant='outlined'>
            <InputLabel htmlFor='rate'>Rate</InputLabel>

            <OutlinedInput
              id='rate'
              type='number'
              value={values.rate}
              onChange={handleChange('rate')}
              label='Rate'
            />
          </FormControl>
        </Grid>
        {genres && (
          <Grid item xs={3}>
            <FormControl sx={{ m: 1, width: 300 }} variant='outlined'>
              <ComboboxMultiple
                options={genres}
                tag='genres'
                setValues={setSelectedGenres}
                values={transformToSelectOptions(selectedGenres)}
              />
            </FormControl>
          </Grid>
        )}
        {directors && (
          <Grid item xs={3}>
            <FormControl sx={{ m: 1, width: 300 }} variant='outlined'>
              <ComboboxSingle
                options={directors}
                tag='directors'
                setValue={setSelectedDirector}
                value={
                  selectedDirector
                    ? transformToSelectOption(selectedDirector)
                    : null
                }
              />
            </FormControl>
          </Grid>
        )}
        <Grid item xs={3}>
          <Button onClick={clearState}>Clear</Button>
          <Button type='submit'>{movieId ? 'Update' : 'Save'}</Button>
        </Grid>
      </form>
    </Grid>
  );
};
