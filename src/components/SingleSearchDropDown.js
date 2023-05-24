import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";

export default function SingleSelect({
  options,
  metaData,
  selectedValue,
  value,
  setValue,
}) {
  const handleChange = (e, value) => {
    selectedValue(value);
    setValue(value);
  };

  return (
    <Autocomplete
      disablePortal
      disableClearable={!value}
      id="combo-box-demo"
      options={options}
      value={value}
      getOptionLabel={(option) => {
        if (option.connectionName) {
          return (
            option.connectionName + " -- ( " + option.connectionType + " )"
          );
        } else if (option.fileName) {
          return option.fileName;
        } else if (option.tableName) {
          return option.tableName;
        } else if (option.COLUMN_NAME) {
          return option.COLUMN_NAME;
        } else {
          return option;
        }
      }}
      onChange={(e, value) => {
        handleChange(e, value);
      }}
      renderInput={(params) => (
        <TextField
          {...params}
          fullWidth
          size="small"
          placeholder={metaData.placeholder}
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
