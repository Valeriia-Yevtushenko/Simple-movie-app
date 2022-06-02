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
import { Nullable } from 'src/types/globalTypes';

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

export const Movies: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { data: movies, isLoading } = useSelector(movieListSelector);
  const { data: directors, isLoading: isLoadingDirectors } =
    useSelector(directorListSelector);

  useEffect(() => {
    if (!movies && !isLoading) dispatch(getMovies());
    return () => {
      dispatch(resetMovieList(movies));
    };
  }, [movies, isLoading, dispatch]);

  useEffect(() => {
    if (!directors && !isLoadingDirectors) dispatch(getDirectors());
  }, [directors, isLoadingDirectors, dispatch]);

  if (isLoading || isLoadingDirectors) return <CircularProgress />;

  return (
    <Grid container>
      {movies?.map((movie: Movie) => {
        const directorName = directors?.find(
          (director: Director) => movie.DirectorId === director.id,
        )?.name;

        return (
          <MovieCard
            directorName={directorName}
            movie={movie}
            movies={movies}
          />
        );
      })}
    </Grid>
  );
};
