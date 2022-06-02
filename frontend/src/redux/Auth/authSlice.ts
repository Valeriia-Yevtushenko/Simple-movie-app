import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import { SignInDTO, SignUpDTO } from 'src/types/Auth';
import { AuthApi } from 'src/api';
import {
  isFulfilledAction,
  isPendingAction,
  isRejectedAction,
} from 'src/utils/rtk.helpers';

import { RootState } from '../storeTypes';

export interface AuthResponse {
  email: string;
  accesstoken: string;
}

interface InitialState {
  isLoading: boolean;
  error: string;
  isAuthinticated: boolean;
}

export const initialState: InitialState = {
  isLoading: false,
  error: '',
  isAuthinticated: false,
};

export const signin = createAsyncThunk<AuthResponse, SignInDTO>(
  'auth/signin',
  async (creds) => {
    const {
      data: { accesstoken },
    } = await AuthApi.signin(creds);
    return { accesstoken, email: creds.email };
  },
);

export const signup = createAsyncThunk<AuthResponse, SignUpDTO>(
  'auth/signup',
  async (creds) => {
    const {
      data: { accesstoken },
    } = await AuthApi.signup(creds);
    return { accesstoken, email: creds.email };
  },
);

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout: (state) => {
      state.isAuthinticated = initialState.isAuthinticated;
      state.isLoading = initialState.isLoading;
      state.error = initialState.error;
      localStorage.removeItem('accesstoken');
      localStorage.removeItem('email');
    },
    renewIsAuth: (state) => {
      state.isAuthinticated = true;
    },
  },
  extraReducers: (builder) => {
    builder.addMatcher(isPendingAction('auth/'), (state) => {
      state.isLoading = true;
    });
    builder.addMatcher(isRejectedAction('auth/'), (state, action) => {
      state.error = action.error.message ?? '';
      state.isLoading = false;
    });
    builder.addMatcher(isFulfilledAction('auth/'), (state, action) => {
      if ('accesstoken' in (action.payload as AuthResponse)) {
        localStorage.setItem(
          'accesstoken',
          JSON.stringify((action.payload as AuthResponse)!.accesstoken),
        );
        localStorage.setItem(
          'email',
          JSON.stringify((action.payload as AuthResponse)!.email),
        );
      }
      state.isAuthinticated = true;
      state.error = '';
      state.isLoading = false;
    });
  },
});

export const AuthReducer = authSlice.reducer;
export const { logout, renewIsAuth } = authSlice.actions;
export const authSelector = ({ auth }: RootState) => auth;
