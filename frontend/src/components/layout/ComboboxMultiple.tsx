import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import ListItemText from '@mui/material/ListItemText';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import Checkbox from '@mui/material/Checkbox';
import { ComboboxMultipleProps, SelectorValues } from 'src/types/globalTypes';

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

const selectChoosenValues = <T extends SelectorValues>(
  options: T[],
  value: string | number[],
) =>
  options.filter((option) =>
    (typeof value === 'string' ? [+value] : value).find(
      (selected) => selected === option.id,
    ),
  );

export const ComboboxMultiple = <T extends SelectorValues>({
  options,
  tag = 'names',
  setValues,
  values,
}: ComboboxMultipleProps<T>) => {
  const handleChange = (event: SelectChangeEvent<number[]>) => {
    const {
      target: { value },
    } = event;
    setValues(selectChoosenValues(options, value));
  };

  return (
    <div>
      <FormControl sx={{ width: 300 }}>
        <InputLabel id='multiple-checkbox-label'>{tag}</InputLabel>
        <Select
          labelId='multiple-checkbox-label'
          id='multiple-checkbox'
          multiple
          value={values.map((p) => p.id)}
          onChange={handleChange}
          input={<OutlinedInput label={`${tag}`} />}
          renderValue={(selected) =>
            selectChoosenValues(options, selected)
              .map((value) => value.name)
              .join(', ')
          }
          MenuProps={MenuProps}
        >
          {options.map((name) => (
            <MenuItem key={name.id} value={name.id}>
              <Checkbox
                checked={values.map((p) => p.id).indexOf(name.id) > -1}
              />
              <ListItemText primary={name.name} />
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
  );
};
