import { configureStore } from '@reduxjs/toolkit';
import { combineReducers } from 'redux';
import { MoviesReducer } from 'src/redux/Movies/moviesSlice';
import thunkMiddleware from 'redux-thunk';
import { AuthReducer } from './Auth/authSlice';
import { DirectorsReducer } from './Directors/directorsSlice';
import { GenresReducer } from './Genres/genresSlice';
import { UserReducer } from './User/userSlice';

export const persistor = null;

const rootReducer = combineReducers({
  movies: MoviesReducer,
  auth: AuthReducer,
  directors: DirectorsReducer,
  genres: GenresReducer,
  user: UserReducer,
});

export const store = configureStore({
  reducer: rootReducer,
  middleware: [thunkMiddleware],
});
