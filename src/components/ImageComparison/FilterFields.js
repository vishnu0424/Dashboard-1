import { Box, Grid, MenuItem, TextField } from "@mui/material";

export default function FilterFields({ data, setData }) {
    
  const handleChange = (e) => {
    let data1 = { ...data };
    data1[e.target.name] = e.target.value;
    setData(data1);
  };

  return (
    <Box className="filterFields" component="form">
      <Grid container spacing={1}>
        <Grid md item>
          <TextField
            size="small"
            select
            fullWidth
            label="Threshold"
            value={data.threshold}
            name="threshold"
            onChange={handleChange}
          >
            <MenuItem value="50"> 50 </MenuItem>
            <MenuItem value="100"> 100 </MenuItem>
            <MenuItem value="150"> 150 </MenuItem>
            <MenuItem value="200"> 200 </MenuItem>
            <MenuItem value="250"> 250 </MenuItem>
          </TextField>
        </Grid>
        <Grid md item>
          <TextField
            size="small"
            select
            label="Highlight differences"
            fullWidth
            value={data.Highlight_Differences}
            name="Highlight_Differences"
            onChange={handleChange}
          >
            <MenuItem value="true"> Masked </MenuItem>
            <MenuItem value="false"> Outlined </MenuItem>
          </TextField>
        </Grid>
        <Grid md item>
          <TextField
            size="small"
            type="number"
            fullWidth
            label="No. of differences"
            value={data.count_to_get}
            name="count_to_get"
            onChange={handleChange}
            InputProps={{ inputProps: { min: "1", step: "1" } }}
            onKeyPress={(e) => {
              if (e.code === "Minus") {
                e.preventDefault();
              } else if (e.code === "Digit0" && e.target.value.length === 0) {
                e.preventDefault();
              }
            }}
          ></TextField>
        </Grid>
        <Grid md item>
          <TextField
            size="small"
            select
            fullWidth
            label="Comparison type"
            value={data.Comparison}
            name="Comparison"
            onChange={handleChange}
          >
            <MenuItem value="Strict"> Strict </MenuItem>
            <MenuItem value="Layout"> Layout </MenuItem>
          </TextField>
        </Grid>
        <Grid md item>
          <TextField
            size="small"
            select
            fullWidth
            label="Highlight color"
            name="color"
            value={data.color}
            onChange={handleChange}
          >
            <MenuItem value="rgb(255 0 0 / 52%)"> Red </MenuItem>
            <MenuItem value="rgb(0 128 0 / 52%)"> Green </MenuItem>
            <MenuItem value="rgb(255 255 255 / 52%)"> White </MenuItem>
          </TextField>
        </Grid>
      </Grid>
    </Box>
  );
}
