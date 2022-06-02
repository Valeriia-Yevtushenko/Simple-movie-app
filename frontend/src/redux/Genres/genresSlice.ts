import { AxiosResponse } from 'axios';
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { GenreApi } from 'src/api';
import {
  isFulfilledAction,
  isPendingAction,
  isRejectedAction,
} from 'src/utils/rtk.helpers';
import {
  Genre,
  CreateGenreDTO,
  UpdateGenreActionProps,
} from '../../types/Genre';
import { Nullable } from '../../types/globalTypes';
import { RootState } from '../storeTypes';

export interface InitialGenresState {
  data: Nullable<Genre[]>;
  isLoading: boolean;
  error: string;
}

export interface InitialGenreState {
  data: Nullable<Genre>;
  isLoadingGenre: boolean;
  genreError: string;
}

export interface InitialState {
  genres: InitialGenresState;
  singleGenre: InitialGenreState;
}

export const genreListInitialState: InitialGenresState = {
  data: null,
  isLoading: false,
  error: '',
};
export const genreInitialState: InitialGenreState = {
  data: null,
  isLoadingGenre: false,
  genreError: '',
};

export const initialState: InitialState = {
  genres: genreListInitialState,

  singleGenre: genreInitialState,
};
export const getGenres = createAsyncThunk<AxiosResponse<Genre[]>, void>(
  'genres/getGenres',
  async () => await GenreApi.getList(),
);

export const getGenre = createAsyncThunk(
  'genres/getGenre',
  async (id: number) => {
    return await GenreApi.getSingle(id);
  },
);

export const createGenre = createAsyncThunk(
  'genres/create',
  async (genre: CreateGenreDTO) => await GenreApi.create(genre),
);

export const editGenre = createAsyncThunk<
  AxiosResponse<Genre>,
  UpdateGenreActionProps
>('genres/edit', async ({ body, id }) => await GenreApi.edit(body, id));

export const deleteGenre = createAsyncThunk(
  'genres/delete',
  async (genreId: number) => await GenreApi.delete(genreId),
);

export const genreSlice = createSlice({
  name: 'genres',
  initialState,
  reducers: {
    setSingleGenre(state, { payload }: PayloadAction<Nullable<Genre>>) {
      state.singleGenre.data = payload;
    },
    resetSingleGenre(state, { payload }: PayloadAction<Nullable<Genre>>) {
      if (payload !== null) {
        state.singleGenre = genreInitialState;
      }
    },
    resetGenreList(state, { payload }: PayloadAction<Nullable<Genre[]>>) {
      if (payload !== null) {
        state.genres = genreListInitialState;
      }
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getGenres.pending, (state) => {
      state.genres.error = '';
      state.genres.isLoading = true;
    });
    builder.addCase(getGenres.fulfilled, (state, action) => {
      state.genres.data = action.payload.data;
      state.genres.error = '';
      state.genres.isLoading = false;
    });

    builder.addMatcher(isPendingAction('genres/'), (state) => {
      state.singleGenre.isLoadingGenre = true;
    });
    builder.addMatcher(isRejectedAction('genres/'), (state, action) => {
      state.singleGenre.genreError = action.error.message ?? '';
      state.singleGenre.isLoadingGenre = false;
    });
    builder.addMatcher(isFulfilledAction('genres/'), (state, action) => {
      state.singleGenre.data = action.payload.data as Genre;
      state.singleGenre.genreError = '';
      state.singleGenre.isLoadingGenre = false;
    });
  },
});

export const GenresReducer = genreSlice.reducer;
export const { resetSingleGenre, setSingleGenre, resetGenreList } =
  genreSlice.actions;
export const genreSelector = ({ genres }: RootState) => genres.singleGenre;
export const genreListSelector = ({ genres }: RootState) => genres.genres;
