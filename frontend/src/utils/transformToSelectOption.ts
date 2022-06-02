import { SelectorValues } from 'src/types/globalTypes';

export const transformToSelectOption = <T extends SelectorValues>(
  value: T,
) => ({ name: value.name, id: value.id });
export const transformToSelectOptions = <T extends SelectorValues[]>(
  values: T,
) => values.map((value) => transformToSelectOption(value));
