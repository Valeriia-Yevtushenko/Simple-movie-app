import { AnyAction } from 'redux';
import { ThunkDispatch } from 'redux-thunk';
import { store } from './setupStore';

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = ThunkDispatch<RootState, void, AnyAction>;
