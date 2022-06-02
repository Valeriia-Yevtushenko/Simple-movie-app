import { AxiosResponse } from 'axios';
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { DirectorApi } from 'src/api';
import {
  isFulfilledAction,
  isPendingAction,
  isRejectedAction,
} from 'src/utils/rtk.helpers';
import {
  Director,
  CreateDirectorDTO,
  UpdateDirectorActionProps,
} from '../../types/Director';
import { Nullable } from '../../types/globalTypes';
import { RootState } from '../storeTypes';

export interface InitialDirectorsState {
  data: Nullable<Director[]>;
  isLoading: boolean;
  error: string;
}

export interface InitialDirectorState {
  data: Nullable<Director>;
  isLoadingDirector: boolean;
  directorError: string;
}

export interface InitialState {
  directors: InitialDirectorsState;
  singleDirector: InitialDirectorState;
}

export const directorListInitialState: InitialDirectorsState = {
  data: null,
  isLoading: false,
  error: '',
};
export const directorInitialState: InitialDirectorState = {
  data: null,
  isLoadingDirector: false,
  directorError: '',
};

export const initialState: InitialState = {
  directors: directorListInitialState,

  singleDirector: directorInitialState,
};
export const getDirectors = createAsyncThunk<AxiosResponse<Director[]>, void>(
  'directors/getDirectors',
  async () => await DirectorApi.getList(),
);

export const getDirector = createAsyncThunk(
  'directors/getDirector',
  async (id: number) => {
    return await DirectorApi.getSingle(id);
  },
);

export const createDirector = createAsyncThunk(
  'directors/create',
  async (director: CreateDirectorDTO) => await DirectorApi.create(director),
);

export const editDirector = createAsyncThunk<
  AxiosResponse<Director>,
  UpdateDirectorActionProps
>('genres/edit', async ({ body, id }) => await DirectorApi.edit(body, id));

export const deleteDirector = createAsyncThunk(
  'directors/delete',
  async (directorId: number) => await DirectorApi.delete(directorId),
);

export const directorSlice = createSlice({
  name: 'directors',
  initialState,
  reducers: {
    setSingleDirector(state, { payload }: PayloadAction<Nullable<Director>>) {
      state.singleDirector.data = payload;
    },
    resetSingleDirector(state, { payload }: PayloadAction<Nullable<Director>>) {
      if (payload !== null) {
        state.singleDirector = directorInitialState;
      }
    },
    resetDirectorList(state, { payload }: PayloadAction<Nullable<Director[]>>) {
      if (payload !== null) {
        state.directors = directorListInitialState;
      }
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getDirectors.pending, (state) => {
      state.directors.error = '';
      state.directors.isLoading = true;
    });
    builder.addCase(getDirectors.fulfilled, (state, action) => {
      state.directors.data = action.payload.data;
      state.directors.error = '';
      state.directors.isLoading = false;
    });

    builder.addMatcher(isPendingAction('directors/'), (state) => {
      state.singleDirector.isLoadingDirector = true;
    });
    builder.addMatcher(isRejectedAction('directors/'), (state, action) => {
      state.singleDirector.directorError = action.error.message ?? '';
      state.singleDirector.isLoadingDirector = false;
    });
    builder.addMatcher(isFulfilledAction('directors/'), (state, action) => {
      state.singleDirector.data = action.payload.data as Director;
      state.singleDirector.directorError = '';
      state.singleDirector.isLoadingDirector = false;
    });
  },
});

export const DirectorsReducer = directorSlice.reducer;
export const { resetSingleDirector, setSingleDirector, resetDirectorList } =
  directorSlice.actions;
export const directorSelector = ({ directors }: RootState) =>
  directors.singleDirector;
export const directorListSelector = ({ directors }: RootState) =>
  directors.directors;
