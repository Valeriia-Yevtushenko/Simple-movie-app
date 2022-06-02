import { Dispatch, SetStateAction } from 'react';

export type Nullable<T> = T | null;
export interface SelectorValues {
  id: number;
  name: string;
}
export interface ComboboxMultipleProps<T> {
  options: T[];
  setValues: Dispatch<SetStateAction<T[]>>;
  values: T[];
  tag?: string;
}
export interface ComboboxSingleProps<T> {
  options: T[];
  setValue: Dispatch<SetStateAction<Nullable<SelectorValues>>>;
  value: Nullable<T>;
  tag?: string;
}
