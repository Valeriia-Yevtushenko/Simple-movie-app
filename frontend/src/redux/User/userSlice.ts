import { AxiosResponse } from 'axios';
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';

import {
  GetUserMoviesDTO,
  UpdateUserActionProps,
  UpdateUserMoviesActionProps,
  User,
} from 'src/types/User';
import { UserApi } from 'src/api';

import { Nullable } from '../../types/globalTypes';
import { RootState } from '../storeTypes';

export interface InitialUserState {
  data: Nullable<User>;
  isLoading: boolean;
  error: string;
}

export interface InitialUserMoviesState {
  data: Nullable<number[]>;
  isLoading: boolean;
  error: string;
}

export interface InitialState {
  user: InitialUserState;
  userMovies: InitialUserMoviesState;
}

export const userInitialState: InitialUserState = {
  data: null,
  isLoading: false,
  error: '',
};
export const userMoviesInitialState: InitialUserMoviesState = {
  data: null,
  isLoading: false,
  error: '',
};

export const initialState: InitialState = {
  user: userInitialState,

  userMovies: userMoviesInitialState,
};
export const getUser = createAsyncThunk<AxiosResponse<User>, void>(
  'user/get',
  async () => await UserApi.getSelf(),
);
export const editUser = createAsyncThunk<
  AxiosResponse<User>,
  UpdateUserActionProps
>('user/edit', async ({ body }) => await UserApi.editSelf(body));

export const getUserMovies = createAsyncThunk<
  AxiosResponse<GetUserMoviesDTO>,
  void
>('user/getMovies', async () => await UserApi.getMyMovies());
export const editUserMovies = createAsyncThunk<
  AxiosResponse<GetUserMoviesDTO>,
  UpdateUserMoviesActionProps
>('user/editMovies', async ({ body }) => await UserApi.editMyMovies(body));

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    resetUser(state, { payload }: PayloadAction<Nullable<User>>) {
      if (payload !== null) {
        state.user = userInitialState;
      }
    },
    resetUserMovies(state, { payload }: PayloadAction<Nullable<number[]>>) {
      if (payload !== null) {
        state.userMovies = userMoviesInitialState;
      }
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getUser.pending, (state) => {
      state.user.error = '';
      state.user.isLoading = true;
    });
    builder.addCase(getUser.fulfilled, (state, action) => {
      state.user.data = action.payload.data;
      state.user.error = '';
      state.user.isLoading = false;
    });
    builder.addCase(editUser.pending, (state) => {
      state.user.error = '';
      state.user.isLoading = true;
    });
    builder.addCase(editUser.fulfilled, (state, action) => {
      state.user.data = action.payload.data;
      state.user.error = '';
      state.user.isLoading = false;
    });
    builder.addCase(getUserMovies.pending, (state) => {
      state.userMovies.error = '';
      state.userMovies.isLoading = true;
    });
    builder.addCase(getUserMovies.fulfilled, (state, action) => {
      state.userMovies.data = action.payload.data.Movies.map(
        (movie) => movie.UserMovie.MovieId,
      );
      state.userMovies.error = '';
      state.userMovies.isLoading = false;
    });
    builder.addCase(editUserMovies.pending, (state) => {
      state.userMovies.error = '';
      state.userMovies.isLoading = true;
    });
    builder.addCase(editUserMovies.fulfilled, (state, action) => {
      state.userMovies.data = action.payload.data.Movies.map(
        (movie) => movie.UserMovie.MovieId,
      );
      state.userMovies.error = '';
      state.userMovies.isLoading = false;
    });
  },
});

export const UserReducer = userSlice.reducer;
export const { resetUser, resetUserMovies } = userSlice.actions;
export const userSelector = ({ user }: RootState) => user.user;
export const userMoviesSelector = ({ user }: RootState) => user.userMovies;
