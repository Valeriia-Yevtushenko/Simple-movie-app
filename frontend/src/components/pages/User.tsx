import { useEffect, useState } from 'react';

import {
  Button,
  FormControl,
  Grid,
  InputLabel,
  OutlinedInput,
  CircularProgress,
  Typography,
} from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch } from 'src/redux/storeTypes';
import {
  getUser,
  editUser,
  resetUser,
  userSelector,
} from 'src/redux/User/userSlice';
import { UserInitialState, UpdateUserDTO } from 'src/types/User';

const initialState: UserInitialState = {
  password: '',
  email: '',
};

export const SingleUser: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();

  const { data: user, isLoading } = useSelector(userSelector);
  const [values, setValues] = useState<UserInitialState>(initialState);

  useEffect(() => {
    if (!user) dispatch(getUser());
    if (user) setValues(user);
    return () => {
      dispatch(resetUser(user));
    };
  }, [user, dispatch]);

  const handleChange =
    (prop: keyof UserInitialState) =>
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setValues({ ...values, [prop]: event.target.value });
    };

  const onSubmit = async (event: any) => {
    event.preventDefault();
    dispatch(
      editUser({
        body: values as UpdateUserDTO,
      }),
    );
  };

  if (isLoading) return <CircularProgress />;

  return (
    <Grid
      container
      spacing={0}
      direction='column'
      alignItems='center'
      justifyContent='flex-start'
      style={{ minHeight: '100vh' }}
    >
      <Typography variant='body1' color='text.primary' margin={2}>
        User
      </Typography>
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
              type='text'
              value={values.password}
              onChange={handleChange('password')}
              label='Password'
            />
          </FormControl>
        </Grid>{' '}
        <Grid item xs={3}>
          <Button
            onClick={() => {
              setValues(initialState);
            }}
          >
            Clear
          </Button>
          <Button type='submit'>Update</Button>
        </Grid>
      </form>
    </Grid>
  );
};
