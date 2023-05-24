import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import {
  Box,
  IconButton,
  MenuItem,
  Paper,
  Tab,
  Tabs,
  TextField,
} from "@mui/material";
import Grid from "@mui/material/Grid";
import {useState} from "react";
import FileHandle from "./FileUpload";

export const InputRow = ({
  index,
  item,
  handleChange,
  handleRemove,
  handleAdd,
  AddHeader,
  RemoveHeader,
  AddRequest,
  RemoveRequest,
  handleChangeHeader,
  handleChangeRequest,
  handleChangeResponse,
  RemoveResponse,
  AddResponse,
  handleResponseKeyMap,
  RequestQueryParams,
  RemoveRequestQueryParams,
  AddRequestQueryParams,
  RequestFileHandle,
  ResponseFileHandle,
}) => {
  const [tabvalue, setTabValue] = useState(0);
  const [reqTabvalue, setReqTabValue] = useState(0);
  const [respTabvalue, setRespTabValue] = useState(0);

  const handleChangeTabs = (event, newValue) => {
    setTabValue(newValue);
  };

  const handleChangeReqTab = (
    event,
    newValue
  ) => {
    setReqTabValue(newValue);
  };
  const handleChangeRespTab = (
    event,
    newValue
  ) => {
    setRespTabValue(newValue);
  };

  return (
    <Grid container alignItems="center">
      <Grid sm={12} style={{ border: "1px solid #ccc" }} sx={{ p: 1 }}>
        <h4>API Details - {index + 1}</h4>
        <Grid container>
          <Grid sm={12} sx={{ p: 0.5 }}>
            <TextField
              required
              name="APIName"
              fullWidth
              variant="outlined"
              size="small"
              label="API Name"
              onChange={(event) => handleChange(event, index)}
              value={item.APIName}
              inputProps={{ minLength: 4 }}
            />
          </Grid>
          <Grid sm={2} sx={{ p: 0.5 }}>
            <TextField
              required
              name="Method"
              fullWidth
              variant="outlined"
              size="small"
              label="Method"
              select
              onChange={(event) => handleChange(event, index)}
              value={item.Method}
            >
              <MenuItem value="GET">GET</MenuItem>
              <MenuItem value="POST">POST</MenuItem>
              <MenuItem value="PUT">PUT</MenuItem>
              <MenuItem value="DELETE">DELETE</MenuItem>
            </TextField>
          </Grid>
          <Grid sm={10} sx={{ p: 0.5 }}>
            <TextField
              required
              name="APIUrl"
              fullWidth
              variant="outlined"
              size="small"
              label="API Url"
              onChange={(event) => handleChange(event, index)}
              value={item.APIUrl}
            />
          </Grid>
        </Grid>
        <Box className="innerSubHead">
          <Tabs
            value={tabvalue}
            onChange={handleChangeTabs}
            aria-label="basic tabs example"
          >
            <Tab label="Headers" value={0} />
            <Tab label="Request" value={1} />
            <Tab label="Response" value={2} />
          </Tabs>
        </Box>

        {tabvalue === 0 && (
          <Paper sx={{ p: 1 }}>
            {item.Headers.map((e, i) => {
              return (
                <>
                  <Grid container alignItems="center">
                    <Grid sm sx={{ p: 0.5 }}>
                      <TextField
                        name="Name"
                        fullWidth
                        size="small"
                        label="Name"
                        onChange={(event) =>
                          handleChangeHeader(event, i, index)
                        }
                        value={e.Name}
                      />
                    </Grid>
                    <Grid sm sx={{ p: 0.5 }}>
                      <TextField
                        name="Value"
                        size="small"
                        fullWidth
                        label="Value"
                        onChange={(event) =>
                          handleChangeHeader(event, i, index)
                        }
                        value={e.Value}
                      />
                    </Grid>
                    <Grid sm={1}>
                      <IconButton>
                        <RemoveIcon onClick={() => RemoveHeader(index, i)} />
                      </IconButton>
                      <IconButton>
                        <AddIcon onClick={() => AddHeader(index, i)} />
                      </IconButton>
                    </Grid>
                  </Grid>
                </>
              );
            })}
          </Paper>
        )}
        {tabvalue === 1 && (
          <Paper sx={{ p: 1 }}>
            <Box className="innerSubHead">
              <Tabs
                value={reqTabvalue}
                onChange={handleChangeReqTab}
                aria-label="basic tabs example"
              >
                <Tab label="Params" value={0} />
                <Tab label="Query Params"  value={1}/>
                <Tab label="File" value={2} />
              </Tabs>
            </Box>

            {reqTabvalue === 0 && (
              <Box sx={{ p: 1 }}>
                <Grid>
                  {item.Request.Params &&
                    item.Request.Params.map((e, r) => {
                      return (
                        <>
                          <Grid container alignItems="center">
                            <Grid sm sx={{ p: 0.5 }}>
                              <TextField
                                name="Key"
                                fullWidth
                                size="small"
                                label="Key"
                                onChange={(event) =>
                                  handleChangeRequest(event, r, index)
                                }
                                value={e.Key}
                              />
                            </Grid>
                            <Grid sm sx={{ p: 0.5 }}>
                              <TextField
                                name="Value"
                                fullWidth
                                label="Value"
                                size="small"
                                onChange={(event) =>
                                  handleChangeRequest(event, r, index)
                                }
                                value={e.Value}
                              />
                            </Grid>
                            <Grid sm sx={{ p: 0.5 }}>
                              <TextField
                                name="MappingKey"
                                fullWidth
                                label="Mapping Key"
                                size="small"
                                onChange={(event) =>
                                  handleChangeRequest(event, r, index)
                                }
                                value={e.MappingKey}
                              />
                            </Grid>
                            <Grid sm sx={{ p: 0.5 }}>
                              <TextField
                                name="ApiSequenseNumber"
                                fullWidth
                                size="small"
                                label="API Sequense Number"
                                onChange={(event) =>
                                  handleChangeRequest(event, r, index)
                                }
                                value={e.ApiSequenseNumber}
                              />
                            </Grid>
                            <Grid sm={1}>
                              <IconButton>
                                <RemoveIcon
                                  onClick={() => RemoveRequest(index, r)}
                                />
                              </IconButton>
                              <IconButton>
                                <AddIcon onClick={() => AddRequest(index, r)} />
                              </IconButton>
                            </Grid>
                          </Grid>
                        </>
                      );
                    })}
                </Grid>
              </Box>
            )}
            {reqTabvalue === 1 && (
              <Box sx={{ p: 1 }}>
                <Grid>
                  {item.Request.QueryParams &&
                    item.Request.QueryParams.map((e, r) => {
                      return (
                        <>
                          <Grid container alignItems="center">
                            <Grid sm sx={{ p: 0.5 }}>
                              <TextField
                                name="Key"
                                fullWidth
                                size="small"
                                label="Key"
                                onChange={(event) =>
                                  RequestQueryParams(event, r, index)
                                }
                                value={e.Key}
                              />
                            </Grid>
                            <Grid sm sx={{ p: 0.5 }}>
                              <TextField
                                name="Value"
                                fullWidth
                                label="Value"
                                size="small"
                                onChange={(event) =>
                                  RequestQueryParams(event, r, index)
                                }
                                value={e.Value}
                              />
                            </Grid>
                            <Grid sm sx={{ p: 0.5 }}>
                              <TextField
                                name="MappingKey"
                                fullWidth
                                label="Mapping Key"
                                size="small"
                                onChange={(event) =>
                                  RequestQueryParams(event, r, index)
                                }
                                value={e.MappingKey}
                              />
                            </Grid>
                            <Grid sm sx={{ p: 0.5 }}>
                              <TextField
                                name="ApiSequenseNumber"
                                fullWidth
                                size="small"
                                label="API Sequense Number"
                                onChange={(event) =>
                                  RequestQueryParams(event, r, index)
                                }
                                value={e.ApiSequenseNumber}
                              />
                            </Grid>
                            <Grid sm={1}>
                              <IconButton>
                                <RemoveIcon
                                  onClick={() =>
                                    RemoveRequestQueryParams(index, r)
                                  }
                                />
                              </IconButton>
                              <IconButton>
                                <AddIcon
                                  onClick={() =>
                                    AddRequestQueryParams(index, r)
                                  }
                                />
                              </IconButton>
                            </Grid>
                          </Grid>
                        </>
                      );
                    })}
                </Grid>
              </Box>
            )}
            {reqTabvalue === 2 && (
              <Box sx={{ p: 1 }}>
                <FileHandle
                  FileInfo={(e) => RequestFileHandle(index, e)}
                  fileUrl={item?.Request?.RequestFilePath}
                  validationPage={true}
                />
              </Box>
            )}
          </Paper>
        )}
        {tabvalue === 2 && (
          <Paper sx={{ p: 0.5 }}>
            <Box className="innerSubHead">
              <Tabs
                value={respTabvalue}
                onChange={handleChangeRespTab}
                aria-label="basic tabs example"
                size="small"
              >
                <Tab size="small" label="Params" value={0} />
                <Tab size="small" label="File" value={1} />
              </Tabs>
            </Box>
            {respTabvalue === 0 ? (
              <Box sx={{ p: 1 }}>
                <Grid>
                  {item.Response?.ColumnsCompare &&
                    item.Response?.ColumnsCompare.map((resp, re) => {
                      return (
                        <>
                          <Grid container alignItems="center">
                            <Grid sm={11} sx={{ p: 0.5 }}>
                              <TextField
                                name="Name"
                                fullWidth
                                size="small"
                                label="Name"
                                onChange={(event) =>
                                  handleChangeResponse(event, re, index)
                                }
                                value={resp.Name}
                              />
                            </Grid>

                            <Grid sm={1}>
                              <IconButton>
                                <RemoveIcon
                                  onClick={() => RemoveResponse(index, re)}
                                />
                              </IconButton>
                              <IconButton>
                                <AddIcon
                                  onClick={() => AddResponse(index, re)}
                                />
                              </IconButton>
                            </Grid>
                          </Grid>
                        </>
                      );
                    })}
                </Grid>
              </Box>
            ) : (
              <Box sx={{ p: 1 }}>
                <FileHandle
                  FileInfo={(e) => {
                    ResponseFileHandle(index, e);
                  }}
                  fileUrl={item?.Response?.ResponseFilePath}
                  validationPage={true}
                />
              </Box>
            )}
            <Grid container sx={{ p: 1.5 }}>
              <Grid sm={12}>
                <TextField
                  name="ResponseColumnPath"
                  fullWidth
                  variant="outlined"
                  size="small"
                  label="Response Column Path"
                  onChange={(event) => handleResponseKeyMap(event, index)}
                  value={item?.Response?.ResponseColumnPath}
                />
              </Grid>
            </Grid>
          </Paper>
        )}
      </Grid>
      <Grid sm={12} style={{ textAlign: "right" }}>
        <IconButton onClick={handleRemove}>
          <RemoveIcon />
        </IconButton>
        <IconButton onClick={handleAdd}>
          <AddIcon />
        </IconButton>
      </Grid>
    </Grid>
  );
};
