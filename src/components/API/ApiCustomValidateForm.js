import DeleteIcon from "@mui/icons-material/Delete";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import {
  Box,
  Button,
  Grid,
  IconButton,
  Paper,
  Tab,
  TextField,
  Tooltip,
  Typography,
} from "@mui/material";
import * as React from "react";
import { useState } from "react";
import FileHandle from "../Files/FileUpload";

export default function ApiCustomValidate({
  inputParams,
  setinputParams,
  requestBody,
  setrequestBody,
  setfile,
}) {
  const [Tabvalue, setTabValue] = useState(0);

  const handleRequestBody = () => {
    try {
      JSON.parse(requestBody);
      return true;
    } catch (e) {
      return "Invalid JSON Object";
    }
  };

  const handleChangeTab = (event, newValue) => {
    setTabValue(newValue);
  };

  const handleFormChange = (index, event) => {
    let data = [...inputParams];
    data[index][event.target.name] = event.target.value;
    setinputParams(data);
  };

  const addFields = () => {
    let newfield = { Name: "", Value: "" };
    setinputParams([...inputParams, newfield]);
  };

  const removeFields = (index) => {
    let data = [...inputParams];
    data.splice(index, 1);
    setinputParams(data);
  };

  return (
    <Box className="selectVal">
      <Paper>
        <TabContext value={Tabvalue}>
          <Box className="innerSubHead">
            <TabList
              onChange={handleChangeTab}
              aria-label="lab API tabs example"
            >
              <Tab label="Params" value={0} />
              <Tab label="Body" value={1} />
              <Tab label="Fle Upload" value={2} />
            </TabList>
          </Box>
          <TabPanel value={0}>
            <Grid item container spacing={2}>
              {inputParams.map((input, index) => {
                return (
                  <Grid item container spacing={2}>
                    <Grid xs item>
                      <TextField
                        fullWidth
                        size="small"
                        name="Name"
                        placeholder="Key"
                        value={input.Name}
                        onChange={(event) => handleFormChange(index, event)}
                      />
                    </Grid>
                    <Grid xs item>
                      <TextField
                        fullWidth
                        size="small"
                        name="Value"
                        placeholder="Value"
                        value={input.Value}
                        onChange={(event) => handleFormChange(index, event)}
                      />
                    </Grid>
                    {Object.keys(inputParams).length > 1 && (
                      <Grid xs={1} item>
                        <Box className="createBtn" sx={{ p: "0 !important" }}>
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
                                <DeleteIcon />
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
              <Button
                disabled={
                  inputParams[inputParams.length - 1].Name.length === 0 ||
                  inputParams[inputParams.length - 1].Value.length === 0
                }
                onClick={addFields}
              >
                Add more...
              </Button>
            </Grid>
          </TabPanel>
          <TabPanel value={1}>
            <TextField
              fullWidth
              value={requestBody}
              size="small"
              label={"Request Body"}
              onChange={(e) => {
                setrequestBody(e.target.value);
              }}
              rows={6}
              maxRows={6}
              multiline
            />
            {requestBody && (
              <span style={{ color: "red" }}>{handleRequestBody()}</span>
            )}
          </TabPanel>
          <TabPanel value={2}>
            <FileHandle setfile={setfile} validationPage={true} />
          </TabPanel>
        </TabContext>
      </Paper>
    </Box>
  );
}
