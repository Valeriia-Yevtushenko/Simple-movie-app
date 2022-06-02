import {
  isPendingAction,
  isFulfilledAction,
  isRejectedAction,
} from 'src/utils/rtk.helpers';
import { AxiosResponse } from 'axios';
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { MovieApi } from '../../api';
import {
  Movie,
  CreateMovieDTO,
  UpdateMovieActionProps,
} from '../../types/Movie';
import { Nullable } from '../../types/globalTypes';
import { RootState } from '../storeTypes';

export interface InitialMoviesState {
  data: Nullable<Movie[]>;
  isLoading: boolean;
  error: string;
}

export interface InitialMovieState {
  data: Nullable<Movie>;
  isLoadingMovie: boolean;
  movieError: string;
}

export interface InitialState {
  movies: InitialMoviesState;
  singleMovie: InitialMovieState;
}

export const movieListInitialState: InitialMoviesState = {
  data: null,
  isLoading: false,
  error: '',
};
export const movieInitialState: InitialMovieState = {
  data: null,
  isLoadingMovie: false,
  movieError: '',
};

export const initialState: InitialState = {
  movies: movieListInitialState,

  singleMovie: movieInitialState,
};
export const getMovies = createAsyncThunk<AxiosResponse<Movie[]>, void>(
  'movies/getMovies',
  async () => await MovieApi.getList(),
);

export const getMovie = createAsyncThunk(
  'movies/getMovie',
  async (id: number) => {
    return await MovieApi.getSingle(id);
  },
);

export const createMovie = createAsyncThunk(
  'movies/create',
  async (movie: CreateMovieDTO) => await MovieApi.create(movie),
);

export const editMovie = createAsyncThunk<
  AxiosResponse<Movie>,
  UpdateMovieActionProps
>('movies/edit', async ({ body, id }) => {
  return await MovieApi.edit(body, id);
});

export const deleteMovie = createAsyncThunk(
  'movies/delete',
  async (movieId: number) => await MovieApi.delete(movieId),
);

export const movieSlice = createSlice({
  name: 'movies',
  initialState,
  reducers: {
    setSingleMovie(state, { payload }: PayloadAction<Nullable<Movie>>) {
      state.singleMovie.data = payload;
    },
    resetSingleMovie(state, { payload }: PayloadAction<Nullable<Movie>>) {
      if (payload !== null) {
        state.singleMovie = movieInitialState;
      }
    },
    resetMovieList(state, { payload }: PayloadAction<Nullable<Movie[]>>) {
      if (payload !== null) {
        state.movies = movieListInitialState;
      }
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getMovies.pending, (state) => {
      state.movies.error = '';
      state.movies.isLoading = true;
    });
    builder.addCase(getMovies.fulfilled, (state, action) => {
      state.movies.data = action.payload.data;
      state.movies.error = '';
      state.movies.isLoading = false;
    });

    builder.addMatcher(isPendingAction('movies/'), (state) => {
      state.singleMovie.isLoadingMovie = true;
    });
    builder.addMatcher(isRejectedAction('movies/'), (state, action) => {
      state.singleMovie.movieError = action.error.message ?? '';
      state.singleMovie.isLoadingMovie = false;
    });
    builder.addMatcher(isFulfilledAction('movies/'), (state, action) => {
      const isMovieGet = Array.isArray(action.payload.data);
      state.singleMovie.data = isMovieGet
        ? (action.payload as AxiosResponse<Movie[]>).data[0]
        : (action.payload as AxiosResponse<Movie>).data;
      state.singleMovie.movieError = '';
      state.singleMovie.isLoadingMovie = false;
    });
  },
});

export const MoviesReducer = movieSlice.reducer;
export const { resetSingleMovie, setSingleMovie, resetMovieList } =
  movieSlice.actions;
export const movieSelector = ({ movies }: RootState) => movies.singleMovie;
export const movieListSelector = ({ movies }: RootState) => movies.movies;
