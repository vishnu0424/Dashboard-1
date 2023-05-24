import {
  Checkbox,
  ListItemText,
  MenuItem,
  OutlinedInput,
  Select,
} from "@mui/material";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";

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

export default function SelectFileColumns(props) {
  const { columnOption, handleChange, tables } = props;

  return (
    <FormControl size="small" fullWidth>
      <InputLabel id="demo-multiple-checkbox-label">
        Select Properties
      </InputLabel>
      <Select
        labelId="demo-multiple-checkbox-label"
        multiple
        value={columnOption ? columnOption : ""}
        onChange={handleChange}
        input={<OutlinedInput label="Select Columns" />}
        renderValue={(selected) => selected.join(", ")}
        MenuProps={MenuProps}
      >
        {tables.map((name, i) => {
          let optionVal = name;
          return (
            <MenuItem key={i} value={optionVal} sx={{ px: 1 }} size="small">
              <Checkbox
                size="small"
                sx={{ px: 1, py: 0 }}
                checked={columnOption.indexOf(optionVal) > -1}
              />
              <ListItemText primary={optionVal} />
            </MenuItem>
          );
        })}
      </Select>
    </FormControl>
  );
}
