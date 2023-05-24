import { FormControl, FormLabel, Grid } from "@mui/material";
import TableViewsSearch from "../../components/TablesViewsSearch";

export function DropDownData(props) {
  const { placeholder, options, heading, value, setValue } = props;

  return (
    <Grid item xs={12} lg={12} sx={{ p: 2 }}>
      <Grid item xs={12}>
        <FormControl>
          <FormLabel>{heading}:</FormLabel>
        </FormControl>
      </Grid>
      <Grid item xs={12}>
        <TableViewsSearch
          placeholder={placeholder}
          optionsList={options}
          value={value}
          setValue={setValue}
        />
      </Grid>
    </Grid>
  );
}
