import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch } from 'src/redux/storeTypes';

import {
  Grid,
  Card,
  CircularProgress,
  CardHeader,
  Typography,
  CardContent,
  Menu,
  MenuItem,
  Link,
  FormControl,
  Button,
} from '@mui/material';
import { NavLink } from 'react-router-dom';
import { Director } from 'src/types/Director';

import IconButton from '@mui/material/IconButton';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { useNavigate } from 'react-router';
import { Endpoints } from 'src/constants';
import {
  directorListSelector,
  getDirectors,
} from 'src/redux/Directors/directorsSlice';
import { Movie } from 'src/types/Movie';
import {
  movieListSelector,
  deleteMovie,
  getMovies,
  resetMovieList,
} from 'src/redux/Movies/moviesSlice';
import {
  editUserMovies,
  getUserMovies,
  resetUserMovies,
  userMoviesSelector,
} from 'src/redux/User/userSlice';
import { Nullable } from 'src/types/globalTypes';
import { UpdateUserMoviesDTO } from 'src/types/User';
import { transformUserMoviesValuesForSubmit } from 'src/utils/transformValuesForSubmit';

import { ComboboxMultiple } from '../layout/ComboboxMultiple';

const MovieCard = ({
  movie,
  movies,
  directorName,
}: {
  movie: Movie;
  movies: Nullable<Movie[]>;
  directorName?: string;
}) => {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();

  const [anchorEl, setAnchorEl] = useState(null);

  const handleClick = (event: any) => {
    setAnchorEl(event.currentTarget);
  };

  const open = Boolean(anchorEl);

  const handleClose = () => {
    setAnchorEl(null);
  };

  const editItem = () => {
    navigate(`${Endpoints.MOVIES}/${movie.id}`);
  };
  const deleteItem = async () => {
    await dispatch(deleteMovie(movie.id));
    dispatch(resetMovieList(movies));
  };

  return (
    <Card variant='outlined' key={movie.id} sx={{ m: 2 }}>
      <CardHeader
        action={
          <>
            <IconButton aria-label='settings' onClick={handleClick}>
              <MoreVertIcon />
            </IconButton>
            <Menu
              anchorEl={anchorEl}
              keepMounted
              onClose={handleClose}
              open={open}
            >
              <MenuItem onClick={editItem}>Edit</MenuItem>
              <MenuItem onClick={deleteItem}>Delete</MenuItem>
            </Menu>
          </>
        }
        title={movie.name}
        subheader={movie.year}
      />
      <CardContent>
        <Typography variant='body2' color='text.secondary'>
          Description: {movie.description}
        </Typography>
        <Typography variant='body2' color='text.secondary'>
          Rate: {movie.rate}
        </Typography>
        {directorName && (
          <Typography variant='body2' color='text.secondary'>
            Director:{' '}
            <Link
              component={NavLink}
              to={`${Endpoints.DIRECTORS}/${movie.DirectorId}`}
              color='primary'
            >
              {directorName}
            </Link>
          </Typography>
        )}
        {movie.Genres && (
          <Typography variant='body2' color='text.secondary'>
            Genres:{' '}
            {movie.Genres.map((movieGenre, index) => (
              <>
                <Link
                  key={movieGenre.id}
                  component={NavLink}
                  to={`${Endpoints.GENRES}/${movieGenre.id}`}
                  color='primary'
                >
                  {movieGenre.name}
                </Link>
                {movie.Genres.length - 1 !== index && <i>, </i>}
              </>
            ))}
          </Typography>
        )}
      </CardContent>
    </Card>
  );
};

export const UserMovies: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { data: movies, isLoading } = useSelector(movieListSelector);
  const { data: myMovies, isLoading: isMyMoviesLoading } =
    useSelector(userMoviesSelector);
  const { data: directors, isLoading: isLoadingDirectors } =
    useSelector(directorListSelector);

  const [selectedUserMovies, setSelectedUserMovies] = useState<Movie[]>([]);

  useEffect(() => {
    if (!movies && !isLoading) dispatch(getMovies());
    return () => {
      dispatch(resetMovieList(movies));
    };
  }, [movies, isLoading, dispatch]);

  useEffect(() => {
    if (!myMovies && !isMyMoviesLoading) dispatch(getUserMovies());
    if (myMovies && movies)
      setSelectedUserMovies(
        movies.filter((movie) =>
          myMovies.some((myMovie) => myMovie === movie.id),
        ),
      );
  }, [myMovies, isMyMoviesLoading, dispatch, movies]);

  useEffect(() => {
    if (!directors && !isLoadingDirectors) dispatch(getDirectors());
  }, [directors, isLoadingDirectors, dispatch]);

  const onSubmit = async (event: any) => {
    event.preventDefault();
    const transformedUserMovies = selectedUserMovies.map((selectedUserMovie) =>
      transformUserMoviesValuesForSubmit(selectedUserMovie),
    );
    dispatch(
      editUserMovies({
        body: { movies: transformedUserMovies } as UpdateUserMoviesDTO,
      }),
    );
  };

  if (isLoading || isLoadingDirectors || isMyMoviesLoading)
    return <CircularProgress />;

  return (
    <Grid
      container
      spacing={0}
      direction='column'
      alignItems='center'
      justifyContent='flex-start'
      style={{ minHeight: '100vh' }}
    >
      <Grid item xs={3}>
        <Typography variant='body1' color='text.primary' margin={2}>
          Select My Movies
        </Typography>
        <form onSubmit={onSubmit}>
          <Grid item xs={3}>
            <FormControl sx={{ m: 1, width: 300 }} variant='outlined'>
              <ComboboxMultiple
                options={movies ?? []}
                tag='movies'
                setValues={setSelectedUserMovies}
                values={selectedUserMovies}
              />
            </FormControl>
          </Grid>
          <Grid item xs={3}>
            <Button onClick={() => setSelectedUserMovies([])}>Clear</Button>
            <Button type='submit'>Update</Button>
          </Grid>
        </form>
      </Grid>
      <Grid container direction='row'>
        {selectedUserMovies?.map((movie: Movie) => {
          const directorName = directors?.find(
            (director: Director) => movie.DirectorId === director.id,
          )?.name;

          return (
            <MovieCard
              directorName={directorName}
              movie={movie}
              movies={selectedUserMovies}
            />
          );
        })}{' '}
      </Grid>
    </Grid>
  );
};
