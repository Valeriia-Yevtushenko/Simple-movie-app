import { MouseEvent, useState } from 'react';

import { Visibility, VisibilityOff } from '@mui/icons-material';
import {
  Button,
  FormControl,
  Grid,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  Typography,
} from '@mui/material';
import { useNavigate } from 'react-router';
import { useDispatch } from 'react-redux';
import { signin, signup } from 'src/redux/Auth/authSlice';
import { AppDispatch } from 'src/redux/storeTypes';
import { Endpoints } from 'src/constants';
import { getToken } from 'src/utils/getUserData';

interface State {
  email: string;
  password: string;
  showPassword: boolean;
  isSignUp: boolean;
}
const initialState: State = {
  email: '',
  password: '',
  showPassword: false,
  isSignUp: false,
};

export const Auth: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();

  const [values, setValues] = useState<State>({
    email: '',
    password: '',
    showPassword: false,
    isSignUp: false,
  });

  const handleChange =
    (prop: keyof State) => (event: React.ChangeEvent<HTMLInputElement>) => {
      setValues({ ...values, [prop]: event.target.value });
    };

  const handleClickShowPassword = () => {
    setValues({
      ...values,
      showPassword: !values.showPassword,
    });
  };

  const handleMouseDownPassword = (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
  };

  const onSubmit = async (event: any) => {
    event.preventDefault();
    const creds = { password: values.password, email: values.email };
    await dispatch(!values.isSignUp ? signin(creds) : signup(creds));
    if (getToken()) {
      navigate(Endpoints.MOVIES, { replace: true });
    }
  };

  return (
    <Grid
      container
      spacing={0}
      direction='column'
      alignItems='center'
      justifyContent='center'
      style={{ minHeight: '100vh' }}
    >
      <form onSubmit={onSubmit}>
        <Grid item xs={3}>
          <FormControl sx={{ m: 1, width: 300 }} variant='outlined'>
            <InputLabel htmlFor='outlined-ademail'>Email</InputLabel>

            <OutlinedInput
              id='outlined-email'
              type='text'
              value={values.email}
              onChange={handleChange('email')}
              label='Email'
            />
          </FormControl>
        </Grid>{' '}
        <Grid item xs={3}>
          <FormControl sx={{ m: 1, width: 300 }} variant='outlined'>
            <InputLabel htmlFor='outlined-adornment-password'>
              Password
            </InputLabel>

            <OutlinedInput
              id='outlined-adornment-password'
              type={values.showPassword ? 'text' : 'password'}
              value={values.password}
              onChange={handleChange('password')}
              endAdornment={
                <InputAdornment position='end'>
                  <IconButton
                    aria-label='toggle password visibility'
                    onClick={handleClickShowPassword}
                    onMouseDown={handleMouseDownPassword}
                    edge='end'
                  >
                    {values.showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              }
              label='Password'
            />
          </FormControl>
        </Grid>{' '}
        <Grid item xs={3}>
          <Button
            style={{
              maxWidth: '300px',
              minWidth: '300px',
            }}
            type='submit'
          >
            {values.isSignUp ? 'Sign Up' : 'Login'}
          </Button>
          {!values.isSignUp && (
            <Typography
              sx={{ m: 1 }}
              width={300}
              variant='body2'
              color='text.secondary'
            >
              Not Registered Yet?{' '}
              <Button
                style={{
                  width: '160px',
                }}
                onClick={() => setValues({ ...initialState, isSignUp: true })}
              >
                SignUp
              </Button>
            </Typography>
          )}
        </Grid>{' '}
      </form>
    </Grid>
  );
};
