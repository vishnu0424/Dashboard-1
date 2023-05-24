import { Autocomplete, TextField } from "@mui/material";

export default function TableViewsSearch({
  placeholder,
  optionsList,
  value,
  setValue,
}) {
  const handleChange = (e, value) => {
    setValue(value);
  };

  return (
    <Autocomplete
      disablePortal
      disableClearable={!value}
      id="combo-box-demo"
      options={optionsList}
      value={value}
      getOptionLabel={(option) => (option ? option : "")}
      onChange={(e, value) => {
        handleChange(e, value);
      }}
      groupBy={(option) => option.table_type}
      renderInput={(params) => (
        <TextField
          {...params}
          fullWidth
          size="small"
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
  );
}
