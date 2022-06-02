import { useNavigate } from 'react-router';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { Endpoints } from 'src/constants';
import { useDispatch, useSelector } from 'react-redux';
import { authSelector, logout, renewIsAuth } from 'src/redux/Auth/authSlice';
import { AppDispatch } from 'src/redux/storeTypes';
import { useEffect } from 'react';
import { getToken } from 'src/utils/getUserData';

export const Header: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();

  const { isAuthinticated } = useSelector(authSelector);

  useEffect(() => {
    if (!isAuthinticated && !getToken()) navigate(Endpoints.AUTH);
    if (getToken() && !isAuthinticated) dispatch(renewIsAuth());
  }, [isAuthinticated, navigate, dispatch]);

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position='static'>
        <Toolbar>
          <Typography variant='h6' component='div' sx={{ flexGrow: 1 }}>
            Movie Library
          </Typography>
          {isAuthinticated || getToken() ? (
            <Button color='inherit' onClick={() => dispatch(logout())}>
              Logout
            </Button>
          ) : (
            <Button color='inherit' onClick={() => navigate(Endpoints.AUTH)}>
              Login
            </Button>
          )}
        </Toolbar>
      </AppBar>
    </Box>
  );
};
