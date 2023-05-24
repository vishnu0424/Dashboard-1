import CheckBoxIcon from "@mui/icons-material/CheckBox";
import CheckBoxOutlineBlankIcon from "@mui/icons-material/CheckBoxOutlineBlank";
import {
  Autocomplete,
  Checkbox,
  FormControl,
  FormLabel,
  Grid,
  TextField,
} from "@mui/material";

const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
const checkedIcon = <CheckBoxIcon fontSize="small" />;

export default function MultipleDropDownData({
  disabled,
  heading,
  placeholder,
  optionsList,
  Cols,
  setCols,
}) {
  return (
    <Grid item xs={12} lg={12}>
      <Grid item xs={12}>
        <FormControl>
          <FormLabel>{heading}</FormLabel>
        </FormControl>
      </Grid>
      <Grid item xs={12}>
        <Autocomplete
          disabled={disabled}
          multiple
          disablePortal
          id="combo-box-demo"
          options={optionsList}
          disableClearable={!Cols}
          disableCloseOnSelect
          value={Cols}
          getOptionLabel={(option) => {
            if (option?.label) {
              return option?.label;
            } else {
              return option;
            }
          }}
          onChange={(event, newValue, reason) => {
            if (reason === "selectOption") {
              setCols(newValue);
            } else if (reason === "removeOption") {
              setCols(newValue);
            } else if (reason === "clear") {
              setCols([]);
            }
          }}
          groupBy={(option) => option.table_type}
          renderOption={(props, option, { selected }) => (
            <li {...props}>
              <Checkbox
                icon={icon}
                checkedIcon={checkedIcon}
                style={{ marginRight: 8 }}
                checked={selected}
              />
              {option?.label ? (
                <span>
                  <b style={{ fontSize: "15px" }}>{option.label}:</b>{" "}
                  {option.Note}
                </span>
              ) : (
                option
              )}
            </li>
          )}
          renderInput={(params) => (
            <TextField
              {...params}
              fullWidth
              size="small"
              placeholder={placeholder}
              sx={{
                "& .MuiChip-root": {
                  my: "1px",
                  fontSize: "15px",
                  height: "20px",
                  "& .MuiChip-deleteIcon": {
                    fontSize: "12px",
                  },
                },
              }}
            />
          )}
        />
      </Grid>
    </Grid>
  );
}
