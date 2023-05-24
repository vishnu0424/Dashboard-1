import ClearIcon from "@mui/icons-material/Clear";
import {
  Box,
  Button,
  Grid,
  IconButton,
  MenuItem,
  TextField,
  Tooltip,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";

export default function CustomInputs({
  inputParams,
  setinputParams,
  inputs,
  operand,
  columns,
  returnval,
}) {

  const [disable, setdisable] = useState(false);
  
  useEffect(() => {
    if (operand) {
      let newinputs = [...inputParams];
      newinputs[0]["ColumnName"] = operand;
      newinputs[0]["ExistingValue"] = "";
      newinputs[0]["ReplacingValue"] = "";
      setinputParams(newinputs);
    }
  }, [operand]);

  const handleFormChange = (index, event) => {
    let data = [...inputParams];
    data[index][event.target.name] = event.target.value;
    setinputParams(data);
  };

  const addFields = () => {
    let newfield = inputs;
    setinputParams([...inputParams, newfield]);
  };

  const removeFields = (index) => {
    let data = [...inputParams];
    data.splice(index, 1);
    setinputParams(data);
  };

  useEffect(() => {
    let count = 0;
    if (inputParams?.length !== 0) {
      inputParams?.map((inp) => {
        if (
          inp.ColumnName.length !== 0 &&
          inp.ExistingValue.length !== 0 &&
          inp.ReplacingValue.length !== 0
        )
          count++;
      });
      if (count === inputParams.length) setdisable(false);
      else setdisable(true);
    } else setdisable(false);
  }, [inputParams]);

  useEffect(() => {
    returnval(disable);
  }, [disable]);

  return (
    <Grid item container>
      <Grid item container spacing={2}>
        {inputParams.map((input, index) => {
          return (
            <Grid item container columnGap={1} key={index}>
              <Grid xs item>
                <TextField
                  size="small"
                  name="ColumnName"
                  fullWidth
                  select
                  label="Select Column*"
                  value={input["ColumnName"]}
                  onChange={(event) => handleFormChange(index, event)}
                >
                  {columns.map((opr) => {
                    return <MenuItem value={opr}>{opr}</MenuItem>;
                  })}
                </TextField>
              </Grid>
              <Grid xs item>
                <TextField
                  fullWidth
                  size="small"
                  name="ExistingValue"
                  label="Existing Value*"
                  value={input["ExistingValue"]}
                  onChange={(event) => handleFormChange(index, event)}
                />
              </Grid>
              <Grid xs item>
                <TextField
                  fullWidth
                  size="small"
                  name="ReplacingValue"
                  label="Replacing Value*"
                  value={input["ReplacingValue"]}
                  onChange={(event) => handleFormChange(index, event)}
                />
              </Grid>
              {Object.keys(inputParams).length > 1 && (
                <Grid xs={1} item>
                  <Box sx={{ p: "0 !important" }}>
                    <Typography
                      color="inherit"
                      variant="subtitle1"
                      component="div"
                    >
                      <Tooltip title="Delete">
                        <IconButton
                          size="medium"
                          onClick={() => removeFields(index)}
                        >
                          <ClearIcon />
                        </IconButton>
                      </Tooltip>
                    </Typography>
                  </Box>
                </Grid>
              )}
            </Grid>
          );
        })}
      </Grid>
      <Grid>
        <Button disabled={disable} onClick={addFields}>
          Add more...
        </Button>
      </Grid>
    </Grid>
  );
}
