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
import { Director } from 'src/types/Director';
import {
  directorListSelector,
  deleteDirector,
  getDirectors,
  resetDirectorList,
} from 'src/redux/Directors/directorsSlice';
import { Nullable } from 'src/types/globalTypes';

const DirectorCard = ({
  director,
  directors,
}: {
  director: Director;
  directors: Nullable<Director[]>;
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
    navigate(`${Endpoints.DIRECTORS}/${director.id}`);
  };
  const deleteItem = async () => {
    await dispatch(deleteDirector(director.id));
    dispatch(resetDirectorList(directors));
  };

  return (
    <Card variant='outlined' key={director.id} sx={{ m: 2 }}>
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
        title={director.name}
      />
    </Card>
  );
};

export const Directors: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { data: directors, isLoading } = useSelector(directorListSelector);

  useEffect(() => {
    if (!directors && !isLoading) dispatch(getDirectors());
    return () => {
      dispatch(resetDirectorList(directors));
    };
  }, [directors, isLoading, dispatch]);

  if (isLoading) return <CircularProgress />;

  return (
    <Grid container>
      {directors?.map((director: Director) => (
        <DirectorCard director={director} directors={directors} />
      ))}
    </Grid>
  );
};
