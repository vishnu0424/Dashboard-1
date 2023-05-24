import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Button,
  Divider,
  Grid,
  Typography,
} from "@mui/material";
import Box from "@mui/material/Box";
import { useEffect, useState } from "react";
import { NewFile } from "../../Validations/newfile";
import { PopUp } from "./PopUp";

export default function ConnectionDBList({
  setdataType,
  sources,
  getData,
  getDataSources,
  search,
  loadFiles,
  setSelected,
  setRows,
  setdataName,
  dataName,
  setPreview,
  setPreviewId,
}) {
  const [state, setState] = useState({ right: false });
  const [preView, setpreView] = useState();
  const [expanded, setExpanded] = useState(true);

  const toggleDrawer = (anchor, open) => (event) => {
    if (
      event &&
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }
    setState({ ...state, [anchor]: open });
  };

  useEffect(() => {
    setRows([]);
  }, [state]);

  return (
    <div style={{ width: "100%" }}>
      {sources.length > 0 && (
        <Box textAlign="center" mb="8px">
          <Typography variant="h6">Available Connectors</Typography>
        </Box>
      )}

      <Accordion className="DS-Acc" expanded={expanded}>
        {preView && (
          <AccordionSummary
            expandIcon={
              <Typography
                onClick={() => {
                  setExpanded(!expanded);
                }}
              >
                View All
              </Typography>
            }
            aria-controls="panel1a-content"
          >
            {preView && (
              <Box className="active-ds">
                <img src={"http://localhost:4000" + preView.imageUrl} />
                <Typography>
                  {preView.name} - <b>{preView.count}</b>
                </Typography>
                {[
                  "API",
                  "Relational Database",
                  "Cloud Database",
                  "Cloud Storage",
                  "NoSql Database",
                ].includes(preView.type) && (
                  <PopUp
                    type="Add"
                    setPreview={setPreview}
                    connectionType={preView.name}
                    connectionData={{}}
                    name={
                      <Button
                        size="small"
                        variant="outlined"
                        onClick={() => {
                          setState({ anchor: true });
                          setPreviewId();
                          setdataType(preView.type);
                          setdataName(preView.name);
                        }}
                      >
                        Add new
                      </Button>
                    }
                    allRows={() => {
                      setRows([]);
                      getDataSources(search);
                      loadFiles();
                      getData({ name: preView.name, type: preView.type });
                      setSelected([]);
                    }}
                  />
                )}
                {preView.type === "Files" && (
                  <NewFile
                    toggleDrawer={toggleDrawer}
                    state={state}
                    setState={setState}
                    returnValue={(val) => {
                      getDataSources(search);
                      loadFiles();
                      setSelected([]);
                    }}
                    name={
                      <Button
                        size="small"
                        variant="outlined"
                        onClick={() => {
                          setState({ right: true });
                          setPreview(false);
                          setdataType(preView.type);
                          setdataName(preView.name);
                        }}
                      >
                        Add new
                      </Button>
                    }
                  />
                )}
              </Box>
            )}
          </AccordionSummary>
        )}
        <AccordionDetails>
          <Box
            className="DBListMain"
            sx={{ display: "grid", gridTemplateColumns: "repeat(6, 1fr)" }}
          >
            {sources.map((obj, index) => (
              <Box
                key={index}
                className={
                  obj.name === dataName
                    ? "DSListItem item-selected"
                    : "DSListItem"
                }
              >
                <Box
                  className="DBList"
                  onClick={() => {
                    setExpanded(false);
                    setPreviewId();
                    getData({ name: obj.name, type: obj.type });
                    setdataType(obj.type);
                    setdataName(obj.name);
                    setpreView(obj);
                  }}
                >
                  <Box textAlign="center">
                    <img src={"http://localhost:4000" + obj.imageUrl} />
                  </Box>
                  <Divider />
                  <Grid container alignItems="center" item>
                    <Grid md={7} item>
                      <Box
                        className="DBLeft"
                        sx={{
                          "&:hover": {
                            cursor: "pointer",
                          },
                        }}
                      >
                        <Typography>{obj.name}</Typography>
                        <Typography variant="h6">{obj.count}</Typography>
                      </Box>
                    </Grid>
                  </Grid>
                </Box>
                <Box textAlign="right">
                  {[
                    "API",
                    "Relational Database",
                    "Cloud Database",
                    "NoSql Database",
                    "Cloud Storage",
                  ].includes(obj.type) && (
                    <PopUp
                      type="Add"
                      setPreview={setPreview}
                      connectionType={obj.name}
                      connectionData={{}}
                      name={
                        <Box
                          className="DBAdd"
                          sx={{
                            "&:hover": {
                              cursor: "pointer",
                            },
                          }}
                          onClick={() => {
                            setState({ anchor: true });
                            setPreviewId();
                            setdataType(obj.type);
                            setdataName(obj.name);
                          }}
                        >
                          Add new
                        </Box>
                      }
                      allRows={() => {
                        setRows([]);
                        getDataSources(search);
                        loadFiles();
                        getData({ name: obj.name, type: obj.type });
                        setSelected([]);
                      }}
                    />
                  )}
                  {obj.type === "Files" && (
                    <NewFile
                      toggleDrawer={toggleDrawer}
                      state={state}
                      setState={setState}
                      returnValue={(val) => {
                        getDataSources(search);
                        loadFiles();
                        setSelected([]);
                      }}
                      name={
                        <Box
                          className="DBAdd"
                          sx={{
                            "&:hover": {
                              cursor: "pointer",
                            },
                          }}
                          onClick={() => {
                            setState({ right: true });
                            setPreview(false);
                            setdataType(obj.type);
                            setdataName(obj.name);
                          }}
                        >
                          Add new
                        </Box>
                      }
                    />
                  )}
                </Box>
              </Box>
            ))}
            <Box key={"111112321"} className="DSListItem">
              <Box className="DBList">
                <Box textAlign="center">
                  <img src={"http://localhost:4000/uploads/custom.png"} />
                </Box>
                <Divider />
                <Grid container alignItems="center" item>
                  <Grid md={7} item>
                    <Box
                      className="DBLeft"
                      sx={{
                        "&:hover": {
                          cursor: "pointer",
                        },
                      }}
                    >
                      <Typography>{"Custom"}</Typography>
                      <Typography variant="h6"></Typography>
                    </Box>
                  </Grid>
                  <Grid md={5} textAlign="right" item></Grid>
                </Grid>
              </Box>
            </Box>
          </Box>
        </AccordionDetails>
      </Accordion>
    </div>
  );
}
