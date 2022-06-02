import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { ComboboxSingleProps, SelectorValues } from 'src/types/globalTypes';
import { ListItemText } from '@mui/material';

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 300,
    },
  },
};

const selectChoosenValues = (
  options: SelectorValues[],
  value: string | number,
) =>
  options.find(
    (option) => (typeof value === 'string' ? +value : value) === option.id,
  )!;

export const ComboboxSingle = <T extends SelectorValues>({
  options,
  tag = 'age',
  setValue,
  value,
}: ComboboxSingleProps<T>) => {
  const handleChange = (event: SelectChangeEvent<number | string>) => {
    setValue(selectChoosenValues(options, event.target.value));
  };

  return (
    <div>
      <FormControl sx={{ width: 300 }}>
        <InputLabel id='select-label'>{tag}</InputLabel>
        <Select
          labelId='select-label'
          id='select'
          value={value ? value.id : ''}
          onChange={handleChange}
          autoWidth
          label={`${tag}`}
          renderValue={(selected) =>
            selectChoosenValues(options, selected).name
          }
          MenuProps={MenuProps}
        >
          <MenuItem value=''>
            <em>None</em>
          </MenuItem>
          {options.map((name) => (
            <MenuItem key={name.id} value={name.id}>
              <ListItemText primary={name.name} />
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
  );
};
