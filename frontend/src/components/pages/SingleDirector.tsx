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
import { useParams } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch } from 'src/redux/storeTypes';
import {
  directorSelector,
  createDirector,
  editDirector,
  getDirector,
  resetSingleDirector,
} from 'src/redux/Directors/directorsSlice';
import {
  DirectorInitialState,
  CreateDirectorDTO,
  UpdateDirectorDTO,
} from 'src/types/Director';

const initialState = {
  name: '',
};

export const SingleDirector: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();

  const { data: director, isLoadingDirector } = useSelector(directorSelector);
  const params = useParams();
  const directorId = params?.id ?? null;
  const [values, setValues] = useState<DirectorInitialState>(initialState);

  useEffect(() => {
    if (!!directorId && !director) dispatch(getDirector(+directorId));
    if (!!directorId && director) setValues(director);
    if (!directorId && director) {
      dispatch(resetSingleDirector(director));
      setValues(initialState);
    }
    return () => {
      dispatch(resetSingleDirector(director));
    };
  }, [directorId, director, dispatch]);

  const handleChange =
    (prop: keyof DirectorInitialState) =>
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setValues({ ...values, [prop]: event.target.value });
    };

  const onSubmit = async (event: any) => {
    event.preventDefault();
    if (!directorId) {
      dispatch(createDirector(values as CreateDirectorDTO));
    } else {
      dispatch(
        editDirector({
          body: values as UpdateDirectorDTO,
          id: +directorId,
        }),
      );
    }
  };

  if (isLoadingDirector) return <CircularProgress />;

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
        Director
      </Typography>
      <form onSubmit={onSubmit}>
        <Grid item xs={3}>
          <FormControl sx={{ m: 1, width: 300 }} variant='outlined'>
            <InputLabel htmlFor='name'>Name</InputLabel>

            <OutlinedInput
              id='name'
              type='text'
              value={values.name}
              onChange={handleChange('name')}
              label='Name'
            />
          </FormControl>
        </Grid>

        <Grid item xs={3}>
          <Button
            onClick={() => {
              setValues(initialState);
            }}
          >
            Clear
          </Button>
          <Button type='submit'>{directorId ? 'Update' : 'Save'}</Button>
        </Grid>
      </form>
    </Grid>
  );
};
