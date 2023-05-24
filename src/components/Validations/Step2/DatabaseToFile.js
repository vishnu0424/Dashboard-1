import DeleteIcon from "@mui/icons-material/Delete";
import {
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  Checkbox,
  CircularProgress,
  FormControl,
  FormControlLabel,
  FormLabel,
  Grid,
  IconButton,
  Paper,
  Radio,
  RadioGroup,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Tooltip,
  Typography,
} from "@mui/material";
import TextareaAutosize from "@mui/material/TextareaAutosize";
import { useContext, useEffect, useState } from "react";
import { SnackbarContext } from "../../../App";
import ApiService from "../../../services/app.service";
import CheckboxesAutoComplete from "../../SelectDropdown";
import { tableStyles } from "../../Styles";
import CompareFinalValidation from "./Validation";

export default function DatabaseToFile({
  source1,
  source2,
  finalValidation,
  setfinalValidation,
  source1Sql,
  setsource1Sql,
  sqlQuery,
  AutoScroll,
}) {
  let initialize = {
    file: false,
    filedata: [],
    database: false,
    databasedata: [],
  };

  const classes = tableStyles();
  const { setSnack } = useContext(SnackbarContext);

  const [souce1Options, setsouce1Options] = useState([]);
  const [souce2Options, setsouce2Options] = useState([]);

  const [dragItem, setdragItem] = useState({});

  const [source1Dragitems, setsource1Dragitems] = useState([]);
  const [source2Dragitems, setsource2Dragitems] = useState([]);

  const [source1SqlData, setsource1SqlData] = useState("");
  const [source2SqlData, setsource2SqlData] = useState("");

  const [source1SqlQueryData, setsource1SqlQueryData] = useState([]);
  const [source2SqlQueryData, setsource2SqlQueryData] = useState([]);

  const [source1Data, setSource1] = useState(initialize);
  const [source2Data, setSource2] = useState(initialize);

  const [source1DB, setsource1DB] = useState([]);
  const [source2DB, setsource2DB] = useState([]);

  const [selected, setSelected] = useState([]);
  const [finalSelected, setfinalSelected] = useState([]);

  const [loader1, Setloader1] = useState(false);
  const [loader2, Setloader2] = useState(false);

  const [validation, setValidation] = useState({
    row_count_matching: false,
    row_data_matching: true,
  });

  useEffect(() => {
    let source = { ...source1Data };
    setsource1Sql("No");
    setsource1SqlData("");
    setsource2SqlData("");
    setsource1Dragitems([]);
    setsource2Dragitems([]);
    setfinalValidation([]);
    async function getData() {
      if (source1?.connectionName) {
        source["file"] = false;
        source["database"] = true;
        source["databasedata"] = [];
        setSource1(source);
        try {
          let response = await ApiService.ConnectionDetails(source1.id);
          setsouce1Options(response?.data?.tables);
        } catch (error) {
          console.log(error);
        }
      }
      if (source1?.fileName) {
        source["file"] = true;
        source["database"] = false;
        setSource1(source);
        try {
          let response = await ApiService.GetFilesData({ id: source1.id });
          if (response?.data?.result?.ext === "txt") {
            if (response?.data?.result?.rows[0].length > 20) {
              let abc = response.data.result.rows[0].slice(0, 20);
              response.data.result.rows[0] = abc;
            }
          }
          source["databasedata"] = [];
          source["filedata"] = response?.data;
          setSource1(source);
        } catch (error) {
          console.log(error);
        }
      }
    }
    getData();
  }, [source1]);

  useEffect(() => {
    let source = { ...source2Data };
    setsource1Sql("No");
    setsource1SqlData("");
    setsource2SqlData("");
    setsource1Dragitems([]);
    setfinalValidation([]);
    setsource2Dragitems([]);
    async function getData() {
      if (source2?.connectionName) {
        source["file"] = false;
        source["database"] = true;
        source["databasedata"] = [];
        setSource2(source);
        try {
          let response = await ApiService.ConnectionDetails(source2.id);
          setsouce2Options(response?.data?.tables);
        } catch (error) {
          console.log(error);
        }
      }

      if (source2?.fileName) {
        source["file"] = true;
        source["database"] = false;
        setSource2(source);
        try {
          let response = await ApiService.GetFilesData({ id: source2.id });
          if (response?.data?.result?.ext === "txt") {
            if (response?.data?.result?.rows[0].length > 20) {
              let abc = response.data.result.rows[0].slice(0, 20);
              response.data.result.rows[0] = abc;
            }
          }
          source["filedata"] = response?.data;
          source["databasedata"] = [];
          setSource2(source);
        } catch (error) {
          console.log(error);
        }
      }
    }
    getData();
  }, [source2]);

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelecteds = [...Array(range)].map((obj, index) => {
        return index;
      });
      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
  };

  const handleClick = (event, name) => {
    const selectedIndex = selected.indexOf(name);
    let newSelected = [];
    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, name);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1)
      );
    }
    setSelected(newSelected);
  };

  const deleteSelected = () => {
    let res = [...selected];
    let source1 = [...source1Dragitems];
    let source2 = [...source2Dragitems];

    res.forEach((index) => {
      delete source1[index];
      delete source2[index];
    });
    var source_1 = source1.filter(function (element) {
      return element !== undefined;
    });
    var source_2 = source2.filter(function (element) {
      return element !== undefined;
    });
    setsource1Dragitems(source_1);
    setsource2Dragitems(source_2);
    setSelected([]);
  };

  const getConnections1TableData = async (obj) => {
    Setloader1(true);
    let source = { ...source1Data };
    try {
      let response = await ApiService.ConnectionDetailsDataValidation({
        connectionId: source1.id,
        tableName: obj,
      });
      source["databasedata"] = response?.data?.tablesData;
      setSource1(source);
      Setloader1();
    } catch (error) {
      console.log(error);
    }
  };

  const getConnections2TableData = async (obj) => {
    Setloader2(true);
    let source = { ...source2Data };
    try {
      let response = await ApiService.ConnectionDetailsDataValidation({
        connectionId: source2.id,
        tableName: obj,
      });
      source["databasedata"] = response?.data?.tablesData;
      setSource2(source);
      Setloader2();
    } catch (error) {
      console.log(error);
    }
  };

  const dragStart = (obj) => {
    setdragItem(obj);
  };

  const onDragOver = (event) => {
    event.preventDefault();
  };

  const onDrop = () => {
    if (dragItem.source === "source1") {
      let source1_ = [...source1Dragitems];
      if (source2Dragitems.length > source1_.length) {
        var source_2 = source2Dragitems[source1_.length];
        var index_ = [];
        source1_.forEach((obj, index) => {
          if (JSON.stringify(obj) === JSON.stringify(dragItem)) {
            if (
              JSON.stringify(source2Dragitems[index]) ===
              JSON.stringify(source_2)
            ) {
              index_.push(index);
            }
          }
        });
        if (index_.length > 0) {
          setSnack({
            message: "This Column Mapping Already Exist.",
            open: true,
            colour: "warning",
          });
        } else {
          source1_.push(dragItem);
        }
      } else {
        source1_.push(dragItem);
      }
      setsource1Dragitems(source1_);
    } else if (dragItem.source === "source2") {
      let source2 = [...source2Dragitems];
      if (source1Dragitems.length > source2.length) {
        var source_1 = source1Dragitems[source2.length];
        var index_1 = [];

        source2.forEach((obj, index) => {
          if (JSON.stringify(obj) === JSON.stringify(dragItem)) {
            if (
              JSON.stringify(source1Dragitems[index]) ===
              JSON.stringify(source_1)
            ) {
              index_1.push(index);
            }
          }
        });

        if (index_1.length > 0) {
          setSnack({
            message: "This Column Mapping Already Exist.",
            open: true,
            colour: "warning",
          });
        } else {
          source2.push(dragItem);
        }
      } else {
        source2.push(dragItem);
      }
      setsource2Dragitems(source2);
    }
    setdragItem();
  };

  const range =
    source1Dragitems.length > source2Dragitems.length
      ? source1Dragitems.length
      : source2Dragitems.length;

  const isSelected = (name) => selected.indexOf(name) !== -1;

  const addValidation = () => {
    if (source1Dragitems.length !== source2Dragitems.length) {
      setSnack({
        message:
          "Column mapping has unmapped columns. Please fix to create validation.",
        open: true,
        colour: "warning",
      });
    } else {
      let final_validation = [...finalValidation];
      final_validation.forEach((obj, index1) => {
        obj.source1.forEach((obj1, index) => {
          delete obj1["_id"];
          delete obj1["source"];

          delete obj.source2[index]["_id"];
          delete obj.source2[index]["source"];
          source1Dragitems.forEach((obj2, index2) => {
            delete obj2["source"];
            delete source2Dragitems[index2]["source"];
            if (JSON.stringify(obj1) === JSON.stringify(obj2)) {
              if (
                JSON.stringify(source2Dragitems[index2]) ===
                JSON.stringify(obj.source2[index])
              ) {
                delete obj.source1[index];
                delete obj.source2[index];
              }
            }
          });
          var s1 = obj.source1.filter(function (element) {
            return element !== undefined;
          });
          var s2 = obj.source2.filter(function (element) {
            return element !== undefined;
          });
          if (s1.length === 0 && s2.length === 0) {
            delete final_validation[index1];
          }
          setfinalValidation(final_validation);
        });
      });
      var final = {
        validation: validation,
        source1: source1Dragitems,
        source2: source2Dragitems,
      };
      final_validation.push(final);
      var final_res = final_validation.filter(function (element) {
        return element !== undefined;
      });
      setfinalValidation(final_res);
      setSelected([]);
      resetValidation();
    }
    AutoScroll();
  };

  const checkValidationSelected = () => {
    if (source1Dragitems.length !== 0 && source2Dragitems.length !== 0) {
      if (
        validation.row_count_matching === false &&
        validation.row_data_matching === false
      ) {
        return true;
      } else {
        return false;
      }
    } else {
      return true;
    }
  };

  const resetValidation = () => {
    setsource1Dragitems([]);
    setsource2Dragitems([]);
    setValidation({
      row_count_matching: false,
      row_data_matching: true,
    });
    setsource1SqlQueryData([]);
    setsource2SqlQueryData([]);
    setsource1SqlData("");
    setsource2SqlData("");
  };

  const handleIsKey = (e, index, source) => {
    if (source === "source1") {
      source1Dragitems[index].IsKey = e.target.checked;
      setsource1Dragitems(source1Dragitems);
    } else if (source === "source2") {
      source2Dragitems[index].IsKey = e.target.checked;
      setsource2Dragitems(source2Dragitems);
    }
  };

  const getsourceSql1Preview = async (data) => {
    Setloader1(true);
    try {
      let response = await ApiService.sqlPreviewData(data);
      if (response?.data?.error) {
        setSnack({
          message: response.data.message,
          open: true,
          colour: "error",
        });
      } else {
        if (response?.data?.result.length === 0) {
          setSnack({
            message: "No rows to show",
            open: true,
            colour: "warning",
          });
        } else {
          if (response?.data?.result.length > 10) {
            response["data"]["result"] = response.data.result.splice(0, 10);
          }
          setsource1SqlQueryData(response?.data);
        }
      }
      Setloader1();
    } catch (error) {
      setSnack({ message: error?.message, open: true, colour: "error" });
    }
  };

  const getsourceSql2Preview = async (data) => {
    Setloader2(true);
    try {
      let response = await ApiService.sqlPreviewData(data);
      if (response?.data?.error) {
        setSnack({
          message: response.data?.message,
          open: true,
          colour: "error",
        });
      } else {
        if (response?.data?.result.length === 0) {
          setSnack({
            message: "No rows to show",
            open: true,
            colour: "warning",
          });
        } else {
          if (response?.data?.result?.length > 10) {
            response["data"]["result"] = response.data.result.splice(0, 10);
          }
          setsource2SqlQueryData(response?.data);
        }
      }
      Setloader2();
    } catch (error) {
      setSnack({ message: error?.message, open: true, colour: "error" });
    }
  };

  const finalSqlValidation = () => {
    let final_validation = [...finalValidation];
    final_validation.forEach((obj, index1) => {
      if (obj.source1 === source1SqlData && obj.source2 === source2SqlData) {
        final_validation.splice(index1, 1);
      }
    });
    var final = {
      validation: validation,
      source1: source1SqlData,
      source2: source2SqlData,
    };
    final_validation.push(final);
    setfinalValidation(final_validation);
    resetValidation();
    setsource1SqlQueryData([]);
    setsource2SqlQueryData([]);
    setsource1SqlData("");
    setsource2SqlData("");

    AutoScroll();
  };

  const checkValidationSqlSelected = () => {
    if (source1SqlQueryData.length !== 0 && source2SqlQueryData.length !== 0) {
      if (
        validation.row_count_matching === false &&
        validation.row_data_matching === false
      ) {
        return true;
      } else {
        return false;
      }
    } else {
      return true;
    }
  };

  return (
    <Box
      component={Paper}
      sx={{ width: "100%", p: 2 }}
      className={classes.tableCus}
    >
      <Grid
        container
        rowSpacing={1}
        sx={{ mb: 1 }}
        columnSpacing={{ xs: 1, sm: 2, md: 3 }}
        item
      >
        {sqlQuery && (
          <Grid item xs={12}>
            <Box className="comSql">
              <FormControl
                sx={{
                  "& .MuiFormGroup-root": {
                    alignItems: "center",

                    "& .MuiFormLabel-root": {
                      pr: 2,
                    },
                  },
                }}
              >
                <RadioGroup
                  row
                  name="radio-buttons-group"
                  value={source1Sql}
                  onChange={(e) => {
                    setsource1Sql(e.target.value);
                    if (e.target.value === "Yes") {
                      setfinalValidation([]);
                      setsource1SqlData("");
                      setsource1SqlQueryData([]);
                      setsource2SqlData("");
                      setsource2SqlQueryData([]);
                      resetValidation();
                    } else {
                      setfinalValidation([]);
                      setsource1SqlData("");
                      setsource1SqlQueryData([]);
                      setsource2SqlData("");
                      setsource2SqlQueryData([]);
                      resetValidation();
                    }
                  }}
                >
                  <FormLabel id="demo-radio-buttons-group-label">
                    Do you wish to enter raw SQL query?
                  </FormLabel>
                  <FormControlLabel
                    value="Yes"
                    control={<Radio size="small" />}
                    label="Yes"
                  />
                  <FormControlLabel
                    value="No"
                    control={<Radio size="small" />}
                    label="NO"
                  />
                </RadioGroup>
              </FormControl>
            </Box>
          </Grid>
        )}
      </Grid>

      <Grid
        container
        rowSpacing={1}
        sx={{
          mb: 1,
          "& .MuiTypography-root": {
            textAlign: "center",
            borderBottom: "1px dashed #ccc",
            pb: 0.5,
          },
        }}
        columnSpacing={{ xs: 1, sm: 2, md: 3 }}
      >
        <Grid item xs={6}>
          <Typography variant="h6">
            First Data Source
            {!source1?.fileName ? " [Database]" : " [File]"}
          </Typography>
        </Grid>
        <Grid item xs={6}>
          <Typography variant="h6">
            Second Data Source
            {!source2?.fileName ? " [Database]" : " [File]"}
          </Typography>
        </Grid>
      </Grid>
      <Grid
        container
        rowSpacing={1}
        sx={{
          mb: 1,
          "& .MuiTypography-root": {
            textAlign: "center",
            pb: 1,
          },
        }}
        columnSpacing={{ xs: 1, sm: 2, md: 3 }}
      >
        <Grid item xs={6}>
          {" "}
          {!source1?.fileName ? (
            <Typography>
              <b>Database type:</b> {source1?.connectionType} | <b>Server:</b>{" "}
              {source1?.server} | <b>Database:</b> {source1?.dataBase}
            </Typography>
          ) : (
            <Typography>
              <b>File Name:</b> {source1?.fileName} | <b>Type:</b>{" "}
              {source1?.ext} | <b>Size :</b>{" "}
              {(source1?.size * 0.001).toFixed(1)}KB{" "}
            </Typography>
          )}
        </Grid>
        <Grid item xs={6}>
          {!source2?.fileName ? (
            <Typography>
              <b>Database type:</b> {source2?.connectionType} | <b>Server:</b>{" "}
              {source2?.server} | <b>Database:</b> {source2?.dataBase}
            </Typography>
          ) : (
            <Typography>
              <b>File Name:</b> {source2?.fileName} | <b>Type:</b>{" "}
              {source2?.ext} | <b>Size :</b>{" "}
              {(source2?.size * 0.001).toFixed(1)}KB{" "}
            </Typography>
          )}
        </Grid>
      </Grid>
      {source1 && source2 && (
        <Grid
          container
          sx={{
            "& .MuiCardContent-root": {
              py: 1,
            },
          }}
        >
          {!source1.fileName && source2.fileName && (
            <>
              {source1Sql === "No" && (
                <Grid
                  container
                  rowSpacing={1}
                  sx={{ mb: 1 }}
                  columnSpacing={{ xs: 1, sm: 2, md: 3 }}
                >
                  <Grid item xs={6}>
                    <Grid container>
                      <Grid item xs={10}>
                        {souce1Options?.length > 0 && (
                          <CheckboxesAutoComplete
                            lable="Select Tables"
                            placeholder="Select Tables"
                            optionsList={souce1Options}
                            returnBack={(val) => {
                              setsource1DB(val);
                            }}
                          />
                        )}
                      </Grid>
                      <Grid item xs={2} sx={{ textAlign: "right", pl: 1 }}>
                        {source1DB.length !== 0 && (
                          <Box>
                            <Button
                              onClick={() => {
                                getConnections1TableData(source1DB);
                              }}
                              variant="contained"
                              color="success"
                            >
                              {!loader1 ? (
                                "GO"
                              ) : (
                                <CircularProgress
                                  style={{
                                    width: "20px",
                                    height: "20px",
                                    color: "#ffffff",
                                  }}
                                />
                              )}
                            </Button>
                          </Box>
                        )}
                      </Grid>
                    </Grid>
                  </Grid>
                </Grid>
              )}
              <Grid
                container
                rowSpacing={1}
                columnSpacing={{ xs: 1, sm: 2, md: 3 }}
              >
                <Grid item xs={6}>
                  {source1Sql === "No" && (
                    <Card
                      sx={{
                        minWidth: 275,
                        "& .MuiCardHeader-root": {
                          "& .MuiTypography-root": {
                            fontSize: "14px",
                          },
                        },
                      }}
                    >
                      <CardHeader
                        title="Selected Table columns"
                        sx={{ backgroundColor: "#e5f6fd", p: "5px 16px" }}
                      ></CardHeader>
                      <CardContent
                        sx={{
                          maxHeight: "300px",
                          height: "300px",
                          overflowY: "auto",
                        }}
                      >
                        {
                          <Box>
                            {source1Data?.databasedata.length === 0 && (
                              <Typography
                                sx={{
                                  textAlign: "center",
                                  fontSize: "16px",
                                  opacity: 0.5,
                                  border: "1px solid #ccc",
                                  padding: "10px",
                                }}
                              >
                                Please select tables
                              </Typography>
                            )}
                            {source1Data?.databasedata &&
                              source1Data?.databasedata.map((obj) => {
                                return (
                                  <>
                                    {Object.entries(obj).map((value, key) => {
                                      return (
                                        <>
                                          <Typography
                                            className="selTabHead"
                                            component="div"
                                          >
                                            <b>{value[0]}</b>
                                          </Typography>
                                          <Box className="selTabCol">
                                            {value[1]?.Columns?.map(
                                              (obj, indx) => {
                                                return (
                                                  <Typography
                                                    key={indx}
                                                    draggable="true"
                                                    onDragStart={(event) => {
                                                      dragStart({
                                                        Table: value[0],
                                                        Column: obj.COLUMN_NAME,
                                                        source: "source1",
                                                        IsKey: false,
                                                      });
                                                    }}
                                                  >
                                                    {obj.COLUMN_NAME}
                                                  </Typography>
                                                );
                                              }
                                            )}
                                          </Box>
                                        </>
                                      );
                                    })}
                                  </>
                                );
                              })}
                          </Box>
                        }
                      </CardContent>
                    </Card>
                  )}
                  {source1Sql === "Yes" && (
                    <>
                      <Box>
                        <Card
                          sx={{
                            minWidth: 275,
                            "& .MuiCardHeader-root": {
                              "& .MuiTypography-root": {
                                fontSize: "14px",
                              },
                            },
                          }}
                        >
                          <CardHeader
                            title="Enter SQL Query for First Data Source"
                            sx={{ backgroundColor: "#e5f6fd", p: "2px 16px" }}
                          ></CardHeader>
                          <CardContent
                            sx={{
                              maxHeight: "300px",
                              overflowY: "auto",
                              pb: "16px!important",
                            }}
                          >
                            <TextareaAutosize
                              aria-label="minimum height"
                              minRows={10}
                              onChange={(e) => {
                                setsource1SqlData(e.target.value);
                              }}
                              value={source1SqlData}
                              style={{ width: "100%" }}
                            />
                          </CardContent>
                        </Card>
                      </Box>
                      <Box>
                        <Grid container>
                          <Grid sm={6} sx={{ mt: 1 }}>
                            <Button
                              color="error"
                              size="small"
                              variant="contained"
                              disabled={source1SqlData?.trim().length === 0}
                              onClick={() => {
                                setsource1SqlData("");
                                setsource1SqlQueryData([]);
                              }}
                            >
                              Reset
                            </Button>
                          </Grid>
                          <Grid sm={6} sx={{ textAlign: "right", mt: 1 }}>
                            <Button
                              size="small"
                              variant="contained"
                              onClick={() => {
                                getsourceSql1Preview({
                                  ConnectionId: source1.id,
                                  sqlQuery: source1SqlData,
                                });
                              }}
                              disabled={source1SqlData?.trim().length === 0}
                            >
                              {!loader1 ? (
                                "Preview"
                              ) : (
                                <CircularProgress
                                  style={{
                                    width: "20px",
                                    height: "20px",
                                    color: "#ffffff",
                                  }}
                                />
                              )}
                            </Button>
                          </Grid>
                        </Grid>
                      </Box>
                      {source1SqlQueryData?.result && (
                        <Box sx={{ mt: 1, maxWidth: "554px" }}>
                          <TableContainer component={Paper}>
                            <Table aria-label="simple table">
                              <TableHead>
                                <TableRow>
                                  {source1SqlQueryData?.result &&
                                    Object.keys(
                                      source1SqlQueryData?.result[0]
                                    ).map((obj, ind) => {
                                      return (
                                        <TableCell key={ind}>{obj}</TableCell>
                                      );
                                    })}
                                </TableRow>
                              </TableHead>
                              <TableBody>
                                {source1SqlQueryData?.result.map((obj, ind) => {
                                  return (
                                    <TableRow key={ind}>
                                      {Object.values(obj).map((obj1, indx) => {
                                        return (
                                          <TableCell scope="row" key={indx}>
                                            {obj1}
                                          </TableCell>
                                        );
                                      })}
                                    </TableRow>
                                  );
                                })}
                              </TableBody>
                            </Table>
                          </TableContainer>
                        </Box>
                      )}
                    </>
                  )}
                </Grid>
                <Grid item xs={6}>
                  {source1Sql === "No" && (
                    <Card
                      sx={{
                        minWidth: 275,
                        "& .MuiCardHeader-root": {
                          "& .MuiTypography-root": {
                            fontSize: "14px",
                          },
                        },
                      }}
                    >
                      <CardHeader
                        title="File Columns"
                        sx={{ backgroundColor: "#e5f6fd", p: "2px 16px" }}
                      />
                      <CardContent
                        sx={{
                          maxHeight: "300px",
                          height: "300px",
                          overflowY: "auto",
                        }}
                      >
                        <Box>
                          <Typography
                            component="div"
                            sx={{
                              p: "0px 8px",
                              background: "#eee",
                              borderRadius: "4px",
                            }}
                          >
                            <b>{source2Data?.filedata.fileDetails?.fileName}</b>
                          </Typography>
                          <Box
                            sx={{
                              p: "5px 8px",
                              "& .MuiTypography-root": {
                                "&:hover": {
                                  background: "#eee",
                                  cursor: "pointer",
                                  pl: "8px",
                                  borderRadius: "4px",
                                },
                              },
                            }}
                          >
                            {source2Data?.filedata.fileDetails
                              ?.firstRowisHeader === true &&
                              source2Data?.filedata.result?.rows[0].map(
                                (obj, indx) => {
                                  return (
                                    <Typography
                                      key={indx}
                                      onDragStart={(event) => {
                                        dragStart({
                                          Table:
                                            source2Data?.filedata.fileDetails
                                              ?.fileName,
                                          Column: obj,
                                          source: "source2",
                                          IsKey: false,
                                        });
                                      }}
                                      draggable="true"
                                    >
                                      {obj}
                                    </Typography>
                                  );
                                }
                              )}
                            {source2Data?.filedata.fileDetails
                              ?.firstRowisHeader === false && (
                              <>
                                {Object.keys(
                                  source2Data?.filedata.result?.rows[0]
                                ).map((obj, index) => {
                                  return (
                                    <Typography
                                      key={index}
                                      onDragStart={(event) => {
                                        dragStart({
                                          Table:
                                            source2Data?.filedata.fileDetails
                                              ?.fileName,
                                          Column:
                                            "Column" + (parseInt(obj) + 1),
                                          source: "source2",
                                          IsKey: false,
                                        });
                                      }}
                                      draggable="true"
                                    >
                                      Column {index + 1}
                                    </Typography>
                                  );
                                })}
                              </>
                            )}
                          </Box>
                        </Box>
                      </CardContent>
                    </Card>
                  )}
                  {source1Sql === "Yes" && (
                    <>
                      <Box>
                        <Card
                          sx={{
                            minWidth: 275,
                            "& .MuiCardHeader-root": {
                              "& .MuiTypography-root": {
                                fontSize: "14px",
                              },
                            },
                          }}
                        >
                          <CardHeader
                            title="Enter SQL Query for Second Data Source"
                            sx={{ backgroundColor: "#e5f6fd", p: "2px 16px" }}
                          />
                          <CardContent
                            sx={{
                              maxHeight: "300px",
                              overflowY: "auto",
                              pb: "16px!important",
                            }}
                          >
                            <TextareaAutosize
                              aria-label="minimum height"
                              minRows={10}
                              onChange={(e) => {
                                setsource2SqlData(e.target.value);
                              }}
                              value={source2SqlData}
                              style={{ width: "100%" }}
                            />
                          </CardContent>
                        </Card>
                      </Box>
                      <Box>
                        <Grid container>
                          <Grid sm={6} sx={{ mt: 1 }}>
                            <Button
                              color="error"
                              size="small"
                              variant="contained"
                              disabled={source2SqlData?.trim().length === 0}
                              onClick={() => {
                                setsource2SqlData("");
                                setsource2SqlQueryData([]);
                              }}
                            >
                              Reset
                            </Button>
                          </Grid>
                          <Grid sm={6} sx={{ textAlign: "right", mt: 1 }}>
                            <Button
                              size="small"
                              variant="contained"
                              onClick={() => {
                                getsourceSql2Preview({
                                  ConnectionId: source2.id,
                                  sqlQuery: source2SqlData,
                                });
                              }}
                              disabled={source2SqlData?.trim().length === 0}
                            >
                              {!loader2 ? (
                                "Preview"
                              ) : (
                                <CircularProgress
                                  style={{
                                    width: "20px",
                                    height: "20px",
                                    color: "#ffffff",
                                  }}
                                />
                              )}
                            </Button>
                          </Grid>
                        </Grid>
                      </Box>
                      {source2SqlQueryData?.result && (
                        <Box sx={{ mt: 1, maxWidth: "554px" }}>
                          <TableContainer component={Paper}>
                            <Table aria-label="simple table">
                              <TableHead>
                                <TableRow>
                                  {source2SqlQueryData?.result &&
                                    Object.keys(
                                      source2SqlQueryData?.result[0]
                                    ).map((obj, ind) => {
                                      return (
                                        <TableCell key={ind}>{obj}</TableCell>
                                      );
                                    })}
                                </TableRow>
                              </TableHead>
                              <TableBody>
                                {source2SqlQueryData?.result.map(
                                  (obj, indx) => {
                                    return (
                                      <TableRow key={indx}>
                                        {Object.values(obj).map((obj1, ind) => {
                                          return (
                                            <TableCell scope="row" key={ind}>
                                              {obj1}
                                            </TableCell>
                                          );
                                        })}
                                      </TableRow>
                                    );
                                  }
                                )}
                              </TableBody>
                            </Table>
                          </TableContainer>
                        </Box>
                      )}
                    </>
                  )}
                </Grid>
              </Grid>
            </>
          )}
          {!source2.fileName && source1.fileName && (
            <>
              {source1Sql === "No" && (
                <Grid
                  container
                  rowSpacing={1}
                  sx={{ mb: 1 }}
                  columnSpacing={{ xs: 1, sm: 2, md: 3 }}
                >
                  <Grid item xs={6}></Grid>
                  <Grid item xs={6}>
                    <Grid container>
                      <Grid item xs={10}>
                        {souce2Options?.length > 0 && (
                          <CheckboxesAutoComplete
                            lable="Select Tables"
                            placeholder="Select Tables"
                            optionsList={souce2Options}
                            returnBack={(val) => {
                              setsource2DB(val);
                            }}
                          />
                        )}
                      </Grid>
                      <Grid item xs={2} sx={{ textAlign: "right", pl: 1 }}>
                        {source2DB.length !== 0 && (
                          <Box>
                            <Button
                              onClick={() => {
                                getConnections2TableData(source2DB);
                              }}
                              variant="contained"
                              color="success"
                            >
                              {!loader2 ? (
                                "GO"
                              ) : (
                                <CircularProgress
                                  style={{
                                    width: "20px",
                                    height: "20px",
                                    color: "#ffffff",
                                  }}
                                />
                              )}
                            </Button>
                          </Box>
                        )}
                      </Grid>
                    </Grid>
                  </Grid>
                </Grid>
              )}
              <Grid
                container
                rowSpacing={1}
                columnSpacing={{ xs: 1, sm: 2, md: 3 }}
              >
                <Grid item xs={6}>
                  {source1Sql === "No" && (
                    <Card
                      sx={{
                        minWidth: 275,
                        "& .MuiCardHeader-root": {
                          "& .MuiTypography-root": {
                            fontSize: "14px",
                          },
                        },
                      }}
                    >
                      <CardHeader
                        title="File Columns"
                        sx={{ backgroundColor: "#e5f6fd", p: "2px 16px" }}
                      />
                      <CardContent
                        sx={{
                          maxHeight: "300px",
                          height: "300px",
                          overflowY: "auto",
                        }}
                      >
                        <Box>
                          <Typography
                            component="div"
                            sx={{
                              p: "0px 8px",
                              background: "#eee",
                              borderRadius: "4px",
                            }}
                          >
                            <b>{source1Data?.filedata.fileDetails?.fileName}</b>
                          </Typography>
                          <Box
                            sx={{
                              p: "5px 8px",
                              "& .MuiTypography-root": {
                                "&:hover": {
                                  background: "#eee",

                                  cursor: "pointer",

                                  pl: "8px",

                                  borderRadius: "4px",
                                },
                              },
                            }}
                          >
                            {source1Data?.filedata.fileDetails
                              ?.firstRowisHeader === true &&
                              source1Data?.filedata.result?.rows[0].map(
                                (obj, index) => {
                                  return (
                                    <Typography
                                      key={index}
                                      onDragStart={(event) => {
                                        dragStart({
                                          Table:
                                            source1Data?.filedata.fileDetails
                                              ?.fileName,
                                          Column: obj,
                                          source: "source1",
                                          IsKey: false,
                                        });
                                      }}
                                      draggable="true"
                                    >
                                      {obj}
                                    </Typography>
                                  );
                                }
                              )}
                            {source1Data?.filedata.fileDetails
                              ?.firstRowisHeader === false && (
                              <>
                                {Object.keys(
                                  source1Data?.filedata.result?.rows[0]
                                ).map((obj, index) => {
                                  return (
                                    <Typography
                                      onDragStart={(event) => {
                                        dragStart({
                                          Table:
                                            source1Data?.filedata.fileDetails
                                              ?.fileName,
                                          Column:
                                            "Column" + (parseInt(obj) + 1),
                                          source: "source1",
                                          IsKey: false,
                                        });
                                      }}
                                      draggable="true"
                                    >
                                      Column {index + 1}
                                    </Typography>
                                  );
                                })}
                              </>
                            )}
                          </Box>
                        </Box>
                      </CardContent>
                    </Card>
                  )}

                  {source1Sql === "Yes" && (
                    <>
                      <Box>
                        <Card
                          sx={{
                            minWidth: 275,
                            "& .MuiCardHeader-root": {
                              "& .MuiTypography-root": {
                                fontSize: "14px",
                              },
                            },
                          }}
                        >
                          <CardHeader
                            title="Enter SQL Query for First Data Source"
                            sx={{ backgroundColor: "#e5f6fd", p: "2px 16px" }}
                          />
                          <CardContent
                            sx={{
                              maxHeight: "300px",
                              overflowY: "auto",
                              pb: "16px!important",
                            }}
                          >
                            <TextareaAutosize
                              aria-label="minimum height"
                              minRows={10}
                              onChange={(e) => {
                                setsource1SqlData(e.target.value);
                              }}
                              value={source1SqlData}
                              style={{ width: "100%" }}
                            />
                          </CardContent>
                        </Card>
                      </Box>
                      <Box>
                        <Grid container>
                          <Grid sm={6} sx={{ mt: 1 }}>
                            <Button
                              color="error"
                              size="small"
                              variant="contained"
                              disabled={source1SqlData?.trim().length === 0}
                              onClick={() => {
                                setsource1SqlData("");
                                setsource1SqlQueryData([]);
                              }}
                            >
                              Reset
                            </Button>
                          </Grid>
                          <Grid sm={6} sx={{ textAlign: "right", mt: 1 }}>
                            <Button
                              size="small"
                              variant="contained"
                              onClick={() => {
                                getsourceSql1Preview({
                                  ConnectionId: source1.id,
                                  sqlQuery: source1SqlData,
                                });
                              }}
                              disabled={source1SqlData?.trim().length === 0}
                            >
                              {!loader1 ? (
                                "Preview"
                              ) : (
                                <CircularProgress
                                  style={{
                                    width: "20px",
                                    height: "20px",
                                    color: "#ffffff",
                                  }}
                                />
                              )}
                            </Button>
                          </Grid>
                        </Grid>
                      </Box>
                      {source1SqlQueryData?.result && (
                        <Box sx={{ mt: 1, maxWidth: "554px" }}>
                          <TableContainer component={Paper}>
                            <Table aria-label="simple table">
                              <TableHead>
                                <TableRow>
                                  {source1SqlQueryData?.result &&
                                    Object.keys(
                                      source1SqlQueryData?.result[0]
                                    ).map((obj, ind) => {
                                      return (
                                        <TableCell key={ind}>{obj}</TableCell>
                                      );
                                    })}
                                </TableRow>
                              </TableHead>
                              <TableBody>
                                {source1SqlQueryData?.result.map(
                                  (obj, index) => {
                                    return (
                                      <TableRow key={index}>
                                        {Object.values(obj).map(
                                          (obj1, indx) => {
                                            return (
                                              <TableCell scope="row" key={indx}>
                                                {obj1}
                                              </TableCell>
                                            );
                                          }
                                        )}
                                      </TableRow>
                                    );
                                  }
                                )}
                              </TableBody>
                            </Table>
                          </TableContainer>
                        </Box>
                      )}
                    </>
                  )}
                </Grid>

                <Grid item xs={6}>
                  {source1Sql === "No" && (
                    <Card
                      sx={{
                        minWidth: 275,
                        "& .MuiCardHeader-root": {
                          "& .MuiTypography-root": {
                            fontSize: "14px",
                          },
                        },
                      }}
                    >
                      <CardHeader
                        title="Selected Table columns"
                        sx={{ backgroundColor: "#e5f6fd", p: "2px 16px" }}
                      />
                      <CardContent
                        sx={{
                          maxHeight: "300px",
                          height: "300px",
                          overflowY: "auto",
                        }}
                      >
                        <Box>
                          {source2Data?.databasedata.length === 0 && (
                            <Typography
                              sx={{
                                textAlign: "center",
                                fontSize: "16px",
                                opacity: 0.5,
                                border: "1px solid #ccc",
                                padding: "10px",
                              }}
                            >
                              Please select tables
                            </Typography>
                          )}
                          {source2Data?.databasedata &&
                            source2Data?.databasedata.map((obj) => {
                              return (
                                <>
                                  {Object.entries(obj).map((value) => {
                                    return (
                                      <>
                                        <Typography
                                          className="selTabHead"
                                          component="div"
                                        >
                                          <b>{value[0]}</b>
                                        </Typography>
                                        <Box className="selTabCol">
                                          {value[1]?.Columns?.map(
                                            (obj, indx) => {
                                              return (
                                                <Typography
                                                  key={indx}
                                                  draggable="true"
                                                  onDragStart={(event) => {
                                                    dragStart({
                                                      Table: value[0],
                                                      Column: obj.COLUMN_NAME,
                                                      source: "source2",
                                                      IsKey: false,
                                                    });
                                                  }}
                                                >
                                                  {obj.COLUMN_NAME}
                                                </Typography>
                                              );
                                            }
                                          )}
                                        </Box>
                                      </>
                                    );
                                  })}
                                </>
                              );
                            })}
                        </Box>
                      </CardContent>
                    </Card>
                  )}
                  {source1Sql === "Yes" && (
                    <>
                      <Box>
                        <Card
                          sx={{
                            minWidth: 275,
                            "& .MuiCardHeader-root": {
                              "& .MuiTypography-root": {
                                fontSize: "14px",
                              },
                            },
                          }}
                        >
                          <CardHeader
                            title="Enter SQL Query for Second Data Source"
                            sx={{ backgroundColor: "#e5f6fd", p: "2px 16px" }}
                          ></CardHeader>
                          <CardContent
                            sx={{
                              maxHeight: "300px",
                              overflowY: "auto",
                              pb: "16px!important",
                            }}
                          >
                            <TextareaAutosize
                              aria-label="minimum height"
                              minRows={10}
                              onChange={(e) => {
                                setsource2SqlData(e.target.value);
                              }}
                              value={source2SqlData}
                              style={{ width: "100%" }}
                            />
                          </CardContent>
                        </Card>
                      </Box>
                      <Box>
                        <Grid container>
                          <Grid sm={6} sx={{ mt: 1 }}>
                            <Button
                              color="error"
                              size="small"
                              variant="contained"
                              disabled={source2SqlData?.trim().length === 0}
                              onClick={() => {
                                setsource2SqlData("");
                                setsource2SqlQueryData([]);
                              }}
                            >
                              Reset
                            </Button>
                          </Grid>
                          <Grid sm={6} sx={{ textAlign: "right", mt: 1 }}>
                            <Button
                              size="small"
                              variant="contained"
                              onClick={() => {
                                getsourceSql2Preview({
                                  ConnectionId: source2.id,
                                  sqlQuery: source2SqlData,
                                });
                              }}
                              disabled={source2SqlData?.trim().length === 0}
                            >
                              {!loader2 ? (
                                "Preview"
                              ) : (
                                <CircularProgress
                                  style={{
                                    width: "20px",
                                    height: "20px",
                                    color: "#ffffff",
                                  }}
                                />
                              )}
                            </Button>
                          </Grid>
                        </Grid>
                      </Box>
                      {source2SqlQueryData?.result && (
                        <Box sx={{ mt: 1, maxWidth: "554px" }}>
                          <TableContainer component={Paper}>
                            <Table aria-label="simple table">
                              <TableHead>
                                <TableRow>
                                  {source2SqlQueryData?.result &&
                                    Object.keys(
                                      source2SqlQueryData?.result[0]
                                    ).map((obj, ind) => {
                                      return (
                                        <TableCell key={ind}>{obj}</TableCell>
                                      );
                                    })}
                                </TableRow>
                              </TableHead>

                              <TableBody>
                                {source2SqlQueryData?.result.map(
                                  (obj, indx) => {
                                    return (
                                      <TableRow key={indx}>
                                        {Object.values(obj).map((obj1, ind) => {
                                          return (
                                            <TableCell scope="row" key={ind}>
                                              {obj1}
                                            </TableCell>
                                          );
                                        })}
                                      </TableRow>
                                    );
                                  }
                                )}
                              </TableBody>
                            </Table>
                          </TableContainer>
                        </Box>
                      )}
                    </>
                  )}
                </Grid>
              </Grid>
            </>
          )}
          {!source2.fileName && !source1.fileName && (
            <>
              <Grid
                container
                rowSpacing={1}
                sx={{ mb: 1 }}
                columnSpacing={{ xs: 1, sm: 2, md: 3 }}
              >
                <Grid item xs={6}>
                  {source1Sql === "No" && (
                    <Grid container>
                      <Grid item xs={10}>
                        {souce1Options?.length > 0 && (
                          <CheckboxesAutoComplete
                            lable="Select Tables"
                            placeholder="Select Tables"
                            optionsList={souce1Options}
                            returnBack={(val) => {
                              setsource1DB(val);
                            }}
                          />
                        )}
                      </Grid>
                      <Grid item xs={2} sx={{ textAlign: "right", pl: 1 }}>
                        {source1DB.length !== 0 && (
                          <Box>
                            <Button
                              onClick={() => {
                                getConnections1TableData(source1DB);
                              }}
                              variant="contained"
                              color="success"
                            >
                              {!loader1 ? (
                                "GO"
                              ) : (
                                <CircularProgress
                                  style={{
                                    width: "20px",
                                    height: "20px",
                                    color: "#ffffff",
                                  }}
                                />
                              )}
                            </Button>
                          </Box>
                        )}
                      </Grid>
                    </Grid>
                  )}
                </Grid>
                <Grid item xs={6}>
                  {source1Sql === "No" && (
                    <Grid container>
                      <Grid item xs={10}>
                        {souce2Options?.length > 0 && (
                          <CheckboxesAutoComplete
                            lable="Select Tables"
                            placeholder="Select Tables"
                            optionsList={souce2Options}
                            returnBack={(val) => {
                              setsource2DB(val);
                            }}
                          />
                        )}
                      </Grid>
                      <Grid item xs={2} sx={{ textAlign: "right", pl: 1 }}>
                        {source2DB.length !== 0 && (
                          <Box>
                            <Button
                              onClick={() => {
                                getConnections2TableData(source2DB);
                              }}
                              variant="contained"
                              color="success"
                            >
                              {!loader2 ? (
                                "GO"
                              ) : (
                                <CircularProgress
                                  style={{
                                    width: "20px",
                                    height: "20px",
                                    color: "#ffffff",
                                  }}
                                />
                              )}
                            </Button>
                          </Box>
                        )}
                      </Grid>
                    </Grid>
                  )}
                </Grid>
              </Grid>

              <Grid
                container
                rowSpacing={1}
                columnSpacing={{ xs: 1, sm: 2, md: 3 }}
              >
                <Grid item xs={6}>
                  {source1Sql === "No" && (
                    <Card
                      sx={{
                        minWidth: 275,
                        "& .MuiCardHeader-root": {
                          "& .MuiTypography-root": {
                            fontSize: "14px",
                          },
                        },
                      }}
                    >
                      <CardHeader
                        title="Selected Table columns"
                        sx={{ backgroundColor: "#e5f6fd", p: "2px 16px" }}
                      />
                      <CardContent
                        sx={{
                          maxHeight: "300px",
                          height: "300px",
                          overflowY: "auto",
                        }}
                      >
                        <Box>
                          {source1Data?.databasedata?.length === 0 && (
                            <Typography
                              sx={{
                                textAlign: "center",
                                fontSize: "16px",
                                opacity: 0.5,
                                border: "1px solid #ccc",
                                padding: "10px",
                              }}
                            >
                              Please select tables
                            </Typography>
                          )}
                          {source1Data?.databasedata &&
                            source1Data?.databasedata.map((obj) => {
                              return (
                                <>
                                  {Object.entries(obj).map((value, key) => {
                                    return (
                                      <>
                                        <Typography
                                          className="selTabHead"
                                          component="div"
                                        >
                                          <b>{value[0]}</b>
                                        </Typography>
                                        <Box className="selTabCol">
                                          {value[1]?.Columns.map(
                                            (obj, indx) => {
                                              return (
                                                <Typography
                                                  key={indx}
                                                  draggable="true"
                                                  onDragStart={(event) => {
                                                    dragStart({
                                                      Table: value[0],
                                                      Column: obj.COLUMN_NAME,
                                                      source: "source1",
                                                      IsKey: false,
                                                    });
                                                  }}
                                                >
                                                  {obj.COLUMN_NAME}
                                                </Typography>
                                              );
                                            }
                                          )}
                                        </Box>
                                      </>
                                    );
                                  })}
                                </>
                              );
                            })}
                        </Box>
                      </CardContent>
                    </Card>
                  )}
                  {source1Sql === "Yes" && (
                    <>
                      <Box>
                        <Card
                          sx={{
                            minWidth: 275,
                            "& .MuiCardHeader-root": {
                              "& .MuiTypography-root": {
                                fontSize: "14px",
                              },
                            },
                          }}
                        >
                          <CardHeader
                            title="Enter SQL Query for First Data Source"
                            sx={{ backgroundColor: "#e5f6fd", p: "2px 16px" }}
                          />
                          <CardContent
                            sx={{
                              maxHeight: "300px",
                              overflowY: "auto",
                              pb: "16px!important",
                            }}
                          >
                            <TextareaAutosize
                              aria-label="minimum height"
                              minRows={10}
                              onChange={(e) => {
                                setsource1SqlData(e.target.value);
                              }}
                              value={source1SqlData}
                              style={{ width: "100%" }}
                            />
                          </CardContent>
                        </Card>
                      </Box>
                      <Box>
                        <Grid container>
                          <Grid sm={6} sx={{ mt: 1 }}>
                            <Button
                              color="error"
                              size="small"
                              variant="contained"
                              disabled={source1SqlData?.trim().length === 0}
                              onClick={() => {
                                setsource1SqlData("");
                                setsource1SqlQueryData([]);
                              }}
                            >
                              Reset
                            </Button>
                          </Grid>
                          <Grid sm={6} sx={{ textAlign: "right", mt: 1 }}>
                            <Button
                              size="small"
                              variant="contained"
                              onClick={() => {
                                getsourceSql1Preview({
                                  ConnectionId: source1.id,
                                  sqlQuery: source1SqlData,
                                });
                              }}
                              disabled={source1SqlData?.trim().length === 0}
                            >
                              {!loader1 ? (
                                "Preview"
                              ) : (
                                <CircularProgress
                                  style={{
                                    width: "20px",
                                    height: "20px",
                                    color: "#ffffff",
                                  }}
                                />
                              )}
                            </Button>
                          </Grid>
                        </Grid>
                      </Box>
                      {source1SqlQueryData?.result && (
                        <Box sx={{ mt: 1, maxWidth: "554px" }}>
                          <TableContainer component={Paper}>
                            <Table aria-label="simple table">
                              <TableHead>
                                <TableRow>
                                  {source1SqlQueryData?.result.length > 0 &&
                                    Object.keys(
                                      source1SqlQueryData?.result[0]
                                    ).map((obj, ind) => {
                                      return (
                                        <TableCell key={ind}>{obj}</TableCell>
                                      );
                                    })}
                                </TableRow>
                              </TableHead>
                              <TableBody>
                                {source1SqlQueryData?.result.map(
                                  (obj, indx) => {
                                    return (
                                      <TableRow key={indx}>
                                        {Object.values(obj).map((obj1, ind) => {
                                          return (
                                            <TableCell scope="row" key={ind}>
                                              {obj1}
                                            </TableCell>
                                          );
                                        })}
                                      </TableRow>
                                    );
                                  }
                                )}
                              </TableBody>
                            </Table>
                          </TableContainer>
                        </Box>
                      )}
                    </>
                  )}
                </Grid>
                <Grid item xs={6}>
                  {source1Sql === "No" && (
                    <Card
                      sx={{
                        minWidth: 275,
                        "& .MuiCardHeader-root": {
                          "& .MuiTypography-root": {
                            fontSize: "14px",
                          },
                        },
                      }}
                    >
                      <CardHeader
                        title="Selected Table columns"
                        sx={{ backgroundColor: "#e5f6fd", p: "2px 16px" }}
                      />
                      <CardContent
                        sx={{
                          maxHeight: "300px",
                          height: "300px",
                          overflowY: "auto",
                        }}
                      >
                        <Box>
                          {source2Data?.databasedata.length === 0 && (
                            <Typography
                              sx={{
                                textAlign: "center",
                                fontSize: "16px",
                                opacity: 0.5,
                                border: "1px solid #ccc",
                                padding: "10px",
                              }}
                            >
                              Please select tables
                            </Typography>
                          )}
                          {source2Data?.databasedata &&
                            source2Data?.databasedata.map((obj) => {
                              return (
                                <>
                                  {Object.entries(obj).map((value, key) => {
                                    return (
                                      <>
                                        <Typography
                                          className="selTabHead"
                                          component="div"
                                        >
                                          <b>{value[0]}</b>
                                        </Typography>
                                        <Box className="selTabCol">
                                          {value[1]?.Columns.map(
                                            (obj, indx) => {
                                              return (
                                                <Typography
                                                  key={indx}
                                                  draggable="true"
                                                  onDragStart={(event) => {
                                                    dragStart({
                                                      Table: value[0],
                                                      Column: obj.COLUMN_NAME,
                                                      source: "source2",
                                                      IsKey: false,
                                                    });
                                                  }}
                                                >
                                                  {obj.COLUMN_NAME}
                                                </Typography>
                                              );
                                            }
                                          )}
                                        </Box>
                                      </>
                                    );
                                  })}
                                </>
                              );
                            })}
                        </Box>
                      </CardContent>
                    </Card>
                  )}
                  {source1Sql === "Yes" && (
                    <>
                      <Box>
                        <Card
                          sx={{
                            minWidth: 275,
                            "& .MuiCardHeader-root": {
                              "& .MuiTypography-root": {
                                fontSize: "14px",
                              },
                            },
                          }}
                        >
                          <CardHeader
                            title="Enter SQL Query for Second Data Source"
                            sx={{ backgroundColor: "#e5f6fd", p: "2px 16px" }}
                          />
                          <CardContent
                            sx={{
                              maxHeight: "300px",
                              overflowY: "auto",
                              pb: "16px!important",
                            }}
                          >
                            <TextareaAutosize
                              aria-label="minimum height"
                              minRows={10}
                              onChange={(e) => {
                                setsource2SqlData(e.target.value);
                              }}
                              value={source2SqlData}
                              style={{ width: "100%" }}
                            />
                          </CardContent>
                        </Card>
                      </Box>
                      <Box>
                        <Grid container>
                          <Grid sm={6} sx={{ mt: 1 }}>
                            <Button
                              color="error"
                              size="small"
                              variant="contained"
                              disabled={source2SqlData?.trim().length === 0}
                              onClick={() => {
                                setsource2SqlData("");
                                setsource2SqlQueryData([]);
                              }}
                            >
                              Reset
                            </Button>
                          </Grid>
                          <Grid sm={6} sx={{ textAlign: "right", mt: 1 }}>
                            <Button
                              size="small"
                              variant="contained"
                              onClick={() => {
                                getsourceSql2Preview({
                                  ConnectionId: source2.id,
                                  sqlQuery: source2SqlData,
                                });
                              }}
                              disabled={source2SqlData?.trim().length === 0}
                            >
                              {!loader2 ? (
                                "Preview"
                              ) : (
                                <CircularProgress
                                  style={{
                                    width: "20px",
                                    height: "20px",
                                    color: "#ffffff",
                                  }}
                                />
                              )}
                            </Button>
                          </Grid>
                        </Grid>
                      </Box>
                      {source2SqlQueryData?.result && (
                        <Box sx={{ mt: 1, maxWidth: "554px" }}>
                          <TableContainer component={Paper}>
                            <Table aria-label="simple table">
                              <TableHead>
                                <TableRow>
                                  {source2SqlQueryData?.result &&
                                    Object.keys(
                                      source2SqlQueryData?.result[0]
                                    ).map((obj, ind) => {
                                      return (
                                        <TableCell key={ind}>{obj}</TableCell>
                                      );
                                    })}
                                </TableRow>
                              </TableHead>

                              <TableBody>
                                {source2SqlQueryData?.result.map(
                                  (obj, index) => {
                                    return (
                                      <TableRow key={index}>
                                        {Object.values(obj).map((obj1, ind) => {
                                          return (
                                            <TableCell scope="row" key={ind}>
                                              {obj1}
                                            </TableCell>
                                          );
                                        })}
                                      </TableRow>
                                    );
                                  }
                                )}
                              </TableBody>
                            </Table>
                          </TableContainer>
                        </Box>
                      )}
                    </>
                  )}
                </Grid>
              </Grid>
            </>
          )}
          {source2.fileName && source1.fileName && (
            <>
              <Grid
                container
                rowSpacing={1}
                columnSpacing={{ xs: 1, sm: 2, md: 3 }}
              >
                <Grid item xs={6}>
                  <Card
                    sx={{
                      minWidth: 275,
                      "& .MuiCardHeader-root": {
                        "& .MuiTypography-root": {
                          fontSize: "14px",
                        },
                      },
                    }}
                  >
                    <CardHeader
                      title="File Columns"
                      sx={{ backgroundColor: "#e5f6fd", p: "2px 16px" }}
                    ></CardHeader>
                    <CardContent
                      sx={{
                        maxHeight: "300px",
                        height: "300px",
                        overflowY: "auto",
                      }}
                    >
                      <Box>
                        <Typography
                          component="div"
                          sx={{
                            p: "0px 8px",
                            background: "#eee",
                            borderRadius: "4px",
                          }}
                        >
                          <b>{source1Data?.filedata?.fileDetails?.fileName}</b>
                        </Typography>
                        <Box
                          sx={{
                            p: "5px 8px",
                            "& .MuiTypography-root": {
                              "&:hover": {
                                background: "#eee",
                                cursor: "pointer",
                                pl: "8px",
                                borderRadius: "4px",
                              },
                            },
                          }}
                        >
                          {source1Data?.filedata.fileDetails
                            ?.firstRowisHeader === true &&
                            source1Data?.filedata.result?.rows[0].map(
                              (obj, indx) => {
                                return (
                                  <Typography
                                    key={indx}
                                    onDragStart={(event) => {
                                      dragStart({
                                        Table:
                                          source1Data?.filedata.fileDetails
                                            ?.fileName,
                                        Column: obj,
                                        source: "source1",
                                        IsKey: false,
                                      });
                                    }}
                                    draggable="true"
                                  >
                                    {obj}
                                  </Typography>
                                );
                              }
                            )}
                          {source1Data?.filedata.fileDetails
                            ?.firstRowisHeader === false && (
                            <>
                              {Object.keys(
                                source1Data?.filedata.result?.rows[0]
                              ).map((obj, index) => {
                                return (
                                  <Typography
                                    key={index}
                                    onDragStart={(event) => {
                                      dragStart({
                                        Table:
                                          source1Data?.filedata.fileDetails
                                            ?.fileName,
                                        Column: "Column" + (parseInt(obj) + 1),
                                        source: "source1",
                                        IsKey: false,
                                      });
                                    }}
                                    draggable="true"
                                  >
                                    Column {index + 1}
                                  </Typography>
                                );
                              })}
                            </>
                          )}
                        </Box>
                      </Box>
                    </CardContent>
                  </Card>
                </Grid>
                <Grid item xs={6}>
                  <Card
                    sx={{
                      minWidth: 275,
                      "& .MuiCardHeader-root": {
                        "& .MuiTypography-root": {
                          fontSize: "14px",
                        },
                      },
                    }}
                  >
                    <CardHeader
                      title="File Columns"
                      sx={{ backgroundColor: "#e5f6fd", p: "2px 16px" }}
                    />
                    <CardContent
                      sx={{
                        maxHeight: "300px",
                        height: "300px",
                        overflowY: "auto",
                      }}
                    >
                      <Box>
                        <Typography
                          component="div"
                          sx={{ p: "0px 8px", background: "#eee" }}
                        >
                          <b>{source2Data?.filedata.fileDetails?.fileName}</b>
                        </Typography>
                        <Box
                          sx={{
                            p: "5px 8px",
                            "& .MuiTypography-root": {
                              "&:hover": {
                                background: "#eee",
                                cursor: "pointer",
                                pl: "8px",
                              },
                            },
                          }}
                        >
                          {source2Data?.filedata.fileDetails
                            ?.firstRowisHeader === true &&
                            source2Data?.filedata.result?.rows[0].map(
                              (obj, index) => {
                                return (
                                  <Typography
                                    key={index}
                                    onDragStart={(event) => {
                                      dragStart({
                                        Table:
                                          source2Data?.filedata.fileDetails
                                            ?.fileName,
                                        Column: obj,
                                        source: "source2",
                                        IsKey: false,
                                      });
                                    }}
                                    draggable="true"
                                  >
                                    {obj}
                                  </Typography>
                                );
                              }
                            )}
                          {source2Data?.filedata.fileDetails
                            ?.firstRowisHeader === false && (
                            <>
                              {Object.keys(
                                source2Data?.filedata?.result?.rows[0]
                              ).map((obj, index) => {
                                return (
                                  <Typography
                                    key={index}
                                    onDragStart={(event) => {
                                      dragStart({
                                        Table:
                                          source2Data?.filedata.fileDetails
                                            ?.fileName,
                                        Column: "Column" + (parseInt(obj) + 1),
                                        source: "source2",
                                        IsKey: false,
                                      });
                                    }}
                                    draggable="true"
                                  >
                                    Column {index + 1}
                                  </Typography>
                                );
                              })}
                            </>
                          )}
                        </Box>
                      </Box>
                    </CardContent>
                  </Card>
                </Grid>
              </Grid>
            </>
          )}
        </Grid>
      )}

      {source1Sql === "No" && (
        <Grid container sx={{ mt: 2 }}>
          <Grid xs={12}>
            <Card
              onDrop={(event) => {
                onDrop();
              }}
              onDragOver={(event) => {
                onDragOver(event);
              }}
            >
              <Box className="innerSubHead">
                <Grid container alignItems="center">
                  <Grid sm={4}>
                    <Typography variant="h6">Column Mapping:</Typography>
                  </Grid>
                  <Grid sm={8} className="innersubRight">
                    <Box className="createBtn">
                      {selected.length > 0 ? (
                        <Typography
                          sx={{ flex: "1 1 100%" }}
                          color="inherit"
                          variant="subtitle1"
                          component="div"
                        >
                          {selected.length} selected
                          <Tooltip title="Delete">
                            <IconButton size="small" onClick={deleteSelected}>
                              <DeleteIcon />
                            </IconButton>
                          </Tooltip>
                        </Typography>
                      ) : (
                        ""
                      )}
                    </Box>
                  </Grid>
                </Grid>
              </Box>
              <TableContainer component={Paper}>
                <Table>
                  <TableHead>
                    <TableRow
                      sx={{
                        "& th.MuiTableCell-root": {
                          backgroundColor: "#1976d2",
                          color: "#fff",
                        },
                      }}
                    >
                      <TableCell colSpan={3} align="center">
                        <Typography>
                          First Data Source{" "}
                          {source1?.connectionName ? " [Database]" : " [File]"}
                        </Typography>
                      </TableCell>
                      <TableCell colSpan={2} align="center">
                        <Typography>
                          Second Data Source{" "}
                          {source2?.connectionName ? " [Database]" : " [File]"}
                        </Typography>
                      </TableCell>
                    </TableRow>
                    <TableRow
                      sx={{
                        "& .MuiTableCell-root:nth-of-type(1)": {
                          width: "5%",
                        },
                        "& .MuiTableCell-root:nth-of-type(2)": {
                          width: "30%",
                        },
                        "& .MuiTableCell-root:nth-of-type(3)": {
                          width: "15%",
                        },
                        "& .MuiTableCell-root:nth-of-type(4)": {
                          width: "30%",
                        },
                      }}
                    >
                      <TableCell width="5%">
                        <Checkbox
                          size="small"
                          onClick={(e) => {
                            handleSelectAllClick(e);
                          }}
                          checked={
                            selected.length > 0 && selected.length === range
                          }
                        />
                      </TableCell>
                      {source1?.connectionName ? (
                        <>
                          <TableCell> Table name - Column name </TableCell>
                          <TableCell>Is Key Column?</TableCell>
                        </>
                      ) : (
                        <>
                          <TableCell>File </TableCell>
                          <TableCell>Is Key Column?</TableCell>
                        </>
                      )}

                      {source2?.connectionName ? (
                        <>
                          <TableCell> Table name - Column name </TableCell>
                          <TableCell>Is Key Column?</TableCell>
                        </>
                      ) : (
                        <>
                          <TableCell>File </TableCell>
                          <TableCell>Is Key Column?</TableCell>
                        </>
                      )}
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {[...Array(range)].map((obj, index) => {
                      const isItemSelected = isSelected(index);
                      return (
                        <TableRow key={index}>
                          <TableCell>
                            <Checkbox
                              size="small"
                              onClick={(e) => {
                                handleClick(e, index);
                              }}
                              checked={isItemSelected}
                            />
                          </TableCell>
                          <TableCell>
                            {source1Dragitems[index]?.Table} -{" "}
                            {source1Dragitems[index]?.Column}
                          </TableCell>
                          <TableCell>
                            <Checkbox
                              size="small"
                              onClick={(e) => {
                                handleIsKey(e, index, "source1");
                              }}
                            />
                          </TableCell>
                          <TableCell>
                            {source2Dragitems[index]?.Table} -{" "}
                            {source2Dragitems[index]?.Column}
                          </TableCell>
                          <TableCell>
                            <Checkbox
                              size="small"
                              onClick={(e) => {
                                handleIsKey(e, index, "source2");
                              }}
                            />
                          </TableCell>
                        </TableRow>
                      );
                    })}
                    <TableRow sx={{ alignItems: "center" }}>
                      <TableCell colSpan={5} align="center">
                        <Typography
                          sx={{ p: 1, fontSize: "14px", opacity: "0.5" }}
                        >
                          {" "}
                          Drop here{" "}
                        </Typography>
                      </TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </TableContainer>
            </Card>
          </Grid>
        </Grid>
      )}

      {source1Sql === "No" && (
        <Grid container>
          <Grid xs={12} sx={{ textAlign: "right", mt: 2 }}>
            <Button
              variant="contained"
              color="error"
              disabled={checkValidationSelected()}
              onClick={() => {
                resetValidation();
              }}
              size="small"
              sx={{ mr: 1 }}
            >
              Reset
            </Button>
            <Button
              variant="contained"
              size="small"
              disabled={checkValidationSelected()}
              onClick={() => {
                addValidation();
              }}
            >
              Add Data Quality Checks
            </Button>
          </Grid>
        </Grid>
      )}

      {source1Sql === "Yes" && (
        <Grid container>
          <Grid xs={12} sx={{ textAlign: "right", mt: 2 }}>
            <Button
              variant="contained"
              color="error"
              disabled={checkValidationSqlSelected()}
              onClick={() => {
                resetValidation();
              }}
              size="small"
              sx={{ mr: 1 }}
            >
              Reset
            </Button>
            <Button
              variant="contained"
              size="small"
              disabled={checkValidationSqlSelected()}
              onClick={() => {
                finalSqlValidation();
              }}
            >
              Add Data Quality Checks
            </Button>
          </Grid>
        </Grid>
      )}

      {finalValidation.length > 0 && (
        <CompareFinalValidation
          finalValidation={finalValidation}
          setfinalValidation={setfinalValidation}
          setfinalSelected={setfinalSelected}
          finalSelected={finalSelected}
          source1={source1}
          source2={source2}
          source1Sql={source1Sql}
        />
      )}
    </Box>
  );
}
