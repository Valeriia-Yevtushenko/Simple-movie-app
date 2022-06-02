import React from 'react';
import CssBaseline from '@mui/material/CssBaseline';

import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';
import { RestrictedRoute } from './components/common/RestrictedRoute';
import { Header } from './components/layout/Header';
import { Endpoints } from './constants';
import { Movies } from './components/pages/Movies';
import { Genres } from './components/pages/Genres';
import { Directors } from './components/pages/Directors';
import { Body } from './components/layout/Body';
import { Auth } from './components/pages/Auth';
import { SingleMovie } from './components/pages/SingleMovie';
import { SingleGenre } from './components/pages/SingleGenre';
import { SingleDirector } from './components/pages/SingleDirector';
import { UserMovies } from './components/pages/UserMovies';
import { SingleUser } from './components/pages/User';

function App() {
  return (
    <BrowserRouter>
      <CssBaseline />
      <Header />
      <Body>
        <Routes>
          <Route
            path={Endpoints.USER_HIMSELF}
            element={<RestrictedRoute component={SingleUser} />}
          />
          <Route
            path={Endpoints.USER_MOVIES}
            element={<RestrictedRoute component={UserMovies} />}
          />
          <Route
            path={Endpoints.SINGLE_DIRECTOR_CREATE}
            element={<RestrictedRoute component={SingleDirector} />}
          />
          <Route
            path={Endpoints.SINGLE_DIRECTOR}
            element={<RestrictedRoute component={SingleDirector} />}
          />
          <Route
            path={Endpoints.DIRECTORS}
            element={<RestrictedRoute component={Directors} />}
          />

          <Route
            path={Endpoints.SINGLE_GENRE_CREATE}
            element={<RestrictedRoute component={SingleGenre} />}
          />
          <Route
            path={Endpoints.SINGLE_GENRE}
            element={<RestrictedRoute component={SingleGenre} />}
          />
          <Route
            path={Endpoints.GENRES}
            element={<RestrictedRoute component={Genres} />}
          />
          <Route
            path={Endpoints.SINGLE_MOVIE_CREATE}
            element={<RestrictedRoute component={SingleMovie} />}
          />
          <Route
            path={Endpoints.SINGLE_MOVIE}
            element={<RestrictedRoute component={SingleMovie} />}
          />
          <Route
            path={Endpoints.MOVIES}
            element={<RestrictedRoute component={Movies} />}
          />
          <Route path={Endpoints.AUTH} element={<Auth />} />
          <Route
            path={Endpoints.MAIN}
            element={<RestrictedRoute component={SingleUser} />}
          />
        </Routes>
      </Body>
    </BrowserRouter>
  );
}

export default App;
