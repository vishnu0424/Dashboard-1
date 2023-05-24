import CheckBoxIcon from "@mui/icons-material/CheckBox";
import CheckBoxOutlineBlankIcon from "@mui/icons-material/CheckBoxOutlineBlank";
import {
  Autocomplete,
  Box,
  Checkbox,
  ClickAwayListener,
  createFilterOptions,
  FormHelperText,
  TextField,
} from "@mui/material";
import { useEffect, useState } from "react";

const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
const checkedIcon = <CheckBoxIcon fontSize="small" />;

export default function CheckboxesAutoComplete({
  lable,
  placeholder,
  optionsList,
  returnBack,
}) {
  const [value, setValue] = useState([]);
  const [checkAll, setCheckAll] = useState(false);
  const [open, setOpen] = useState(false);
  const [options, setOptions] = useState([]);

  let values = optionsList.map((option) => {
    const firstLetter = option.table_name;
    return {
      firstLetter: /[0-9]/.test(firstLetter) ? "0-9" : firstLetter,
      ...option,
    };
  });
  
  useEffect(() => {
    setValue([]);
    setCheckAll(false);
    setOptions(values);
  }, [optionsList]);

  const checkAllChange = () => {
    setCheckAll(!checkAll);
    if (!checkAll) {
      setValue(options);
    } else {
      setValue([]);
    }
  };

  const handleClickAway = (e) => {
    setOpen(false);
    returnBack(value.map((item) => item.table_name));
  };

  const filter = createFilterOptions();

  const filterOptions = (options, params) => {
    const filtered = filter(options, params);
    if (filtered.length === options.length) {
      let a = {
        table_name: "Select All",
      };
      return [a, ...filtered];
    }
    return [...filtered];
  };

  return (
    <ClickAwayListener onClickAway={handleClickAway}>
      <Box>
        <Autocomplete
          multiple
          disableCloseOnSelect
          limitTags={1}
          id="checkboxes-tags-demo"
          options={options.sort(
            (a, b) => -b.firstLetter.localeCompare(a.table_type)
          )}
          value={value}
          open={open}
          size="small"
          fullWidth
          groupBy={(option) => option.table_type}
          onChange={(event, newValue, reason) => {
            if (reason === "selectOption") {
              if (
                newValue.find((option) => option.table_name === "Select All")
              ) {
                checkAllChange();
              } else {
                setValue(newValue);
              }
            } else if (reason === "removeOption") {
              setCheckAll(false);
              setValue(newValue);
              returnBack([]);
            } else if (reason === "clear") {
              setValue([]);
              setCheckAll(false);
              returnBack([]);
            }
          }}
          onClose={(e, reason) => {
            if (reason === "blur") {
              setOpen(true);
            } else {
              setOpen(!open);
            }
          }}
          onOpen={() => {
            setOpen(true);
          }}
          filterOptions={filterOptions}
          getOptionLabel={(option) => option.table_name}
          renderOption={(props, option, { selected }) => (
            <li {...props} sx={{ px: "10px" }}>
              <Checkbox
                icon={icon}
                checkedIcon={checkedIcon}
                sx={{ mr: 1, p: 0 }}
                checked={selected || checkAll}
              />
              {option.table_name}
            </li>
          )}
          style={{ width: "100%" }}
          renderInput={(params) => (
            <TextField
              {...params}
              label={lable}
              placeholder={placeholder}
              sx={{
                "& .MuiChip-root": {
                  my: "1px",
                  fontSize: "10px",
                  height: "18px",
                  "& .MuiChip-deleteIcon": {
                    fontSize: "12px",
                  },
                },
              }}
            />
          )}
        />
        <FormHelperText>
          {value.length} Selected of {optionsList.length} Tables
        </FormHelperText>
      </Box>
    </ClickAwayListener>
  );
}
