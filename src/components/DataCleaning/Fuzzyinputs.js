import ClearIcon from "@mui/icons-material/Clear";
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Grid,
  IconButton,
  MenuItem,
  TextField,
  Tooltip,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import ApiService from "../../services/app.service";

export default function Fuzzyinputs({
  heading,
  inputParams,
  setinputParams,
  inputs,
  Columns,
  returnval,
}) {
  const [masterdatalist, setMasterdatalist] = useState([]);
  const [disable, setdisable] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    (async () => {
      let response = await ApiService.Masterdatalist();
      setMasterdatalist(response.data?.data);
    })();
  }, []);

  const handleFormChange = (index, event, value) => {
    let data = [...inputParams];
    data[index][event.target.name] = value;
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
    if (inputParams.length !== 0) {
      inputParams.map((inp) => {
        if (
          inp.Columnvalue.length !== 0 &&
          inp.masterData.length !== 0 &&
          inp.Similarity
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
    <Grid item container rowSpacing={2}>
      <Grid item xs={12}>
        <FormControl>
          <FormLabel>{heading}:</FormLabel>
        </FormControl>
      </Grid>
      {inputParams.map((input, index) => {
        return (
          <Grid item container spacing={1} key={index}>
            <Grid xs item>
              <TextField
                select
                fullWidth
                size="small"
                name="Columnvalue"
                label="Select Column*"
                value={input.Columnvalue}
                onChange={(event) =>
                  handleFormChange(index, event, event.target.value)
                }
              >
                {Columns?.map((col, indx) => {
                  return (
                    <MenuItem key={indx} value={col}>
                      {col}
                    </MenuItem>
                  );
                })}
              </TextField>
            </Grid>
            <Grid xs item>
              <TextField
                select
                fullWidth
                size="small"
                name="masterData"
                label="Select Master Dataset*"
                value={input.masterData}
                onChange={(event) =>
                  handleFormChange(index, event, event.target.value)
                }
              >
                {masterdatalist?.map((col, indx) => {
                  return (
                    <MenuItem key={indx} value={col._id}>
                      {col.name}
                    </MenuItem>
                  );
                })}
              </TextField>
            </Grid>
            <Grid xs item>
              <TextField
                fullWidth
                type="number"
                InputProps={{
                  inputProps: {
                    min: 1,
                    max: 100,
                    step: 1,
                  },
                }}
                onClick={(e) => {
                  e.stopPropagation();
                }}
                onKeyPress={(e) => {
                  e.stopPropagation();
                  if (
                    e.code === "Minus" ||
                    e.code === "Equal" ||
                    e.code === "KeyE"
                  ) {
                    e.preventDefault();
                  }
                }}
                size="small"
                name="Similarity"
                label="Degree of Similarity*"
                value={input.Similarity}
                onChange={(event) =>
                  handleFormChange(
                    index,
                    event,
                    event.target.value.trim().length === 0
                      ? event.target.value
                      : Number(event.target.value)
                  )
                }
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
                        size="small"
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
      <Grid xs={12}>
        <FormControl>
          <FormLabel>
            Note: Only Master Datasets Uploaded in{" "}
            <Button
              sx={{ p: 0 }}
              onClick={() => {
                navigate("/masterdata", { replace: true });
              }}
            >
              Masterdata
            </Button>{" "}
            can be accessed here.
          </FormLabel>
        </FormControl>
      </Grid>
      <Grid xs={12} item>
        <Button disabled={disable} onClick={addFields}>
          Add more...
        </Button>
      </Grid>
    </Grid>
  );
}
