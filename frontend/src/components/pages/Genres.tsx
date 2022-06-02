import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch } from 'src/redux/storeTypes';

import {
  Grid,
  Card,
  CircularProgress,
  CardHeader,
  Menu,
  MenuItem,
} from '@mui/material';

import IconButton from '@mui/material/IconButton';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { useNavigate } from 'react-router';
import { Endpoints } from 'src/constants';
import { Genre } from 'src/types/Genre';
import {
  genreListSelector,
  deleteGenre,
  getGenres,
  resetGenreList,
} from 'src/redux/Genres/genresSlice';
import { Nullable } from 'src/types/globalTypes';

const GenreCard = ({
  genre,
  genres,
}: {
  genre: Genre;
  genres: Nullable<Genre[]>;
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
    navigate(`${Endpoints.GENRES}/${genre.id}`);
  };
  const deleteItem = async () => {
    await dispatch(deleteGenre(genre.id));
    dispatch(resetGenreList(genres));
  };

  return (
    <Card variant='outlined' key={genre.id} sx={{ m: 2 }}>
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
        title={genre.name}
      />
    </Card>
  );
};

export const Genres: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { data: genres, isLoading } = useSelector(genreListSelector);

  useEffect(() => {
    if (!genres && !isLoading) dispatch(getGenres());
    return () => {
      dispatch(resetGenreList(genres));
    };
  }, [genres, isLoading, dispatch]);

  if (isLoading) return <CircularProgress />;

  return (
    <Grid container>
      {genres?.map((genre: Genre) => (
        <GenreCard genre={genre} genres={genres} />
      ))}
    </Grid>
  );
};
