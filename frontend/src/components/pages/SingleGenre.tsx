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
  genreSelector,
  createGenre,
  editGenre,
  getGenre,
  resetSingleGenre,
} from 'src/redux/Genres/genresSlice';
import {
  GenreInitialState,
  CreateGenreDTO,
  UpdateGenreDTO,
} from 'src/types/Genre';

const initialState = {
  name: '',
};

export const SingleGenre: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();

  const { data: genre, isLoadingGenre } = useSelector(genreSelector);
  const params = useParams();
  const genreId = params?.id ?? null;
  const [values, setValues] = useState<GenreInitialState>(initialState);

  useEffect(() => {
    if (!!genreId && !genre) dispatch(getGenre(+genreId));
    if (!!genreId && genre) setValues(genre);
    if (!genreId && genre) {
      dispatch(resetSingleGenre(genre));
      setValues(initialState);
    }
    return () => {
      dispatch(resetSingleGenre(genre));
    };
  }, [genreId, genre, dispatch]);

  const handleChange =
    (prop: keyof GenreInitialState) =>
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setValues({ ...values, [prop]: event.target.value });
    };

  const onSubmit = async (event: any) => {
    event.preventDefault();
    if (!genreId) {
      dispatch(createGenre(values as CreateGenreDTO));
    } else {
      dispatch(
        editGenre({
          body: values as UpdateGenreDTO,
          id: +genreId,
        }),
      );
    }
  };

  if (isLoadingGenre) return <CircularProgress />;

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
        Genre
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
          <Button type='submit'>{genreId ? 'Update' : 'Save'}</Button>
        </Grid>
      </form>
    </Grid>
  );
};
