import CancelOutlinedIcon from "@mui/icons-material/CancelOutlined";
import DeleteIcon from "@mui/icons-material/Delete";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import RemoveRedEyeOutlinedIcon from "@mui/icons-material/RemoveRedEyeOutlined";
import {
  Autocomplete,
  Checkbox,
  CircularProgress,
  Grid,
  IconButton,
  Tooltip,
} from "@mui/material";
import Accordion from "@mui/material/Accordion";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";
import Button from "@mui/material/Button";
import FormControlLabel from "@mui/material/FormControlLabel";
import MenuItem from "@mui/material/MenuItem";
import Paper from "@mui/material/Paper";
import Popover from "@mui/material/Popover";
import { styled } from "@mui/material/styles";
import Switch from "@mui/material/Switch";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TextField from "@mui/material/TextField";
import { tooltipClasses } from "@mui/material/Tooltip";
import Typography from "@mui/material/Typography";
import { Box } from "@mui/system";
import * as React from "react";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import CheckboxesAutoComplete from "../../../components/SelectDropdown";
import ApiService from "../../../services/app.service";
import { ExpectedRowColumn } from "../../Files/ValidationsForm";
import InnerHeader from "../../InnerHeader";
import SkeletonLoader from "../../SkeletonLoader";
import { tableStyles } from "../../Styles";
import ConnectionDetails from "./ConnectionDetails";

function GetControlerFromInput({
  fromInput,
  inputsHandler,
  checkBoxHandler,
  keyName,
}) {
  if (fromInput.ControlType === "Dropdown") {
    return (
      <TextField
        name={fromInput.StateName}
        select
        sx={{ width: "150px" }}
        size="small"
        defaultValue={fromInput.ControlProperties.SelectedValue}
        onChange={(e) => inputsHandler(e, keyName)}
      >
        {fromInput.ControlProperties.Values.map((item, indx) => {
          return (
            <MenuItem key={indx} value={item}>
              {item}
            </MenuItem>
          );
        })}
      </TextField>
    );
  }

  if (fromInput.ControlType === "CheckBox") {
    return (
      <FormControlLabel
        name={fromInput.StateName}
        onChange={(e) => checkBoxHandler(e, keyName)}
        control={
          <Checkbox
            defaultChecked={fromInput.ControlProperties.IsChecked}
            size="small"
          />
        }
        label={fromInput.DisplayName}
      />
    );
  }
  if (fromInput.ControlType === "Text") {
    return (
      <TextField
        size="small"
        name={fromInput.StateName}
        onChange={(e) => inputsHandler(e, keyName)}
        sx={{ ml: 2 }}
        label={fromInput.DisplayName}
        variant="outlined"
      />
    );
  }
  if (fromInput.ControlType === "Integer") {
    return (
      <TextField
        type="number"
        defaultValue="1"
        InputProps={{ inputProps: { min: "1", step: "1" } }}
        name={fromInput.StateName}
        onKeyPress={(e) => {
          if (e.code === "Minus") {
            e.preventDefault();
          } else if (e.code === "Digit0" && e.target.value.length === 0) {
            e.preventDefault();
          }
        }}
        onChange={(e) => {
          inputsHandler(e, keyName);
        }}
        size="small"
        sx={{ ml: 2, mt: 0.4, width: "80px" }}
        label={fromInput.DisplayName}
        variant="outlined"
      />
    );
  }
  if (fromInput.ControlType === "Heading") {
    return (
      <Box>
        <h2>{fromInput.StateName}</h2>
      </Box>
    );
  }
}

export default function DataValidations({
  connectionId,
  finalValidations,
  setfinalValidations,
  header,
  AutoScroll,
}) {
  const [showHeader, setHeader] = useState(true);
  const params = useParams();
  const [connection, setConnection] = useState([]);
  const classes = tableStyles();
  const [anchorEl, setAnchorEl] = useState(null);
  const [validationsForm, setValidationsForm] = useState([]);
  const [tablesData, setTablesData] = useState([]);
  const [openedPopoverId, setOpenedPopoverId] = useState(null);
  const [tableColumns, setTableColumns] = useState([]);
  const [validationData, setValidationData] = useState([]);
  const [resetData, setResetData] = useState();
  const [selected, setSelected] = useState([]);
  const [collapse, setCollapse] = useState([]);
  const [rowsColumns, setrowsColumns] = useState([]);
  const [tables, setTables] = useState([]);
  const [tableName, setTableName] = useState([]);
  const [connectionDetails, setConnectionDetails] = useState({});
  const [JSON_SCHEMA, setJsonSchema] = useState([]);
  const [loader, setLoading] = useState(true);
  const [sobjects, setSobjects] = useState([]);
  const [customObjects, setCustomObjects] = useState(false);
  const [loadingTables, setLoadingTables] = useState(false);

  const CustomWidthTooltip = styled(({ className, ...props }) => (
    <Tooltip {...props} classes={{ popper: className }} />
  ))({
    [`& .${tooltipClasses.tooltip}`]: {
      maxWidth: 800,
    },
  });

  const checkBoxHandler = (e, keyname) => {
    let prev_validation = [...validationData];
    if (keyname === e.target.name) {
      prev_validation.forEach((obj) => {
        if (obj.StateName === keyname) {
          if (e.target.checked) {
            obj["ControlProperties"]["IsChecked"] = e.target.checked;
            setValidationData(prev_validation);
          } else {
            obj["ControlProperties"]["IsChecked"] = e.target.checked;
            setValidationData(prev_validation);
          }
        }
      });
    } else {
      prev_validation.forEach((obj) => {
        if (obj.StateName === keyname) {
          obj["NestedControls"].forEach((obj1) => {
            if (obj1.StateName === e.target.name) {
              obj1["ControlProperties"]["IsChecked"] = e.target.checked;
            }
          });
        }
      });
      setValidationData(prev_validation);
    }
  };

  const inputsHandler = (e, keyname) => {
    let prev_validation = [...validationData];
    prev_validation.forEach((obj) => {
      if (obj.StateName === keyname) {
        obj["NestedControls"].forEach((obj1) => {
          if (obj1.StateName === e.target.name) {
            obj1["SelectedValue"] = e.target.value;
            setValidationData(prev_validation);
          }
        });
      }
    });
  };

  const selectTableColumns = (event, tablename, column_name) => {
    let table_columns = [...tableColumns];
    if (event.target.checked) {
      if (table_columns.length === 0) {
        table_columns.push({
          tablename: tablename,
          columns: [
            {
              ColumnName: column_name,
              validation: [],
            },
          ],
        });
        setTableColumns(table_columns);
      } else {
        var table_index = table_columns.findIndex(
          (obj) => obj.tablename === tablename
        );
        if (table_index !== -1) {
          var column_index = table_columns[table_index].columns.findIndex(
            (obj) => obj.ColumnName === column_name
          );
          if (column_index === -1) {
            table_columns[table_index].columns.push({
              ColumnName: column_name,
              validation: [],
            });
            setTableColumns(table_columns);
          }
        } else {
          table_columns.push({
            tablename: tablename,
            columns: [
              {
                ColumnName: column_name,
                validation: [],
              },
            ],
          });
          setTableColumns(table_columns);
        }
      }
    } else {
      table_columns.forEach((obj, index) => {
        if (obj.tablename === tablename) {
          var col_index = obj.columns.findIndex(
            (obj1) => obj1.ColumnName === column_name
          );
          obj.columns.splice(col_index, 1);
        }
        if (obj.columns.length === 0) {
          table_columns.splice(index, 1);
        }
      });
      setTableColumns(table_columns);
    }
  };

  const addExpectedColRows = (e, type, tablename) => {
    let previous_validation = [...rowsColumns];
    var index = previous_validation.findIndex(
      (obj) => obj.tablename === tablename
    );
    if (previous_validation.length === 0 || index === -1) {
      var validation_obj = JSON.parse(JSON.stringify(ExpectedRowColumn[0]));
      validation_obj["NestedControls"][0]["SelectedValue"] = e.target.value;
      var validation = {
        tablename: tablename,
        columns: [
          {
            ColumnName: "",
            validation: [validation_obj],
          },
        ],
      };
      previous_validation.push(validation);
      setrowsColumns(previous_validation);
    } else {
      previous_validation[
        index
      ].columns[0].validation[0].NestedControls[0].SelectedValue =
        e.target.value.length > 0 ? e.target.value : 0;
      setrowsColumns(previous_validation);
    }
  };

  const addFinalRow = (tablename) => {
    setTablesData([]);
    let final_validation = [...finalValidations];
    var list1 = final_validation.filter((obj) => obj.tablename === tablename);
    var prev = rowsColumns.filter((obj2) => obj2.tablename === tablename);
    if (list1.length > 0) {
      var list2 = list1[0].columns.filter((obj1) => obj1.ColumnName === "");
      if (list2.length > 0) {
        var validation = list2[0].validation.filter(
          (obj3) => obj3.StateName === "expected_rows_columns"
        );
        validation[0].NestedControls[0].SelectedValue =
          prev[0].columns[0].validation[0].NestedControls[0].SelectedValue;
      } else {
        final_validation.push(prev[0]);
      }
    } else {
      final_validation.push(prev[0]);
    }
    setfinalValidations(final_validation);
    setrowsColumns([]);
  };

  const addValidationFun = () => {
    setValidationsForm([]);
    setValidationData([]);
    setTablesData([]);
    setTableColumns([]);
    setrowsColumns([]);
    let previous_col = [...tableColumns];
    let previous_validation = [...finalValidations];
    previous_col.forEach((obj) => {
      obj.columns.forEach((obj2) => {
        validationData.forEach((obj1) => {
          if (obj1["ControlProperties"]["IsChecked"] === true) {
            obj2.validation.push(obj1);
          }
        });
      });
    });

    if (previous_validation.length === 0) {
      rowsColumns.forEach((obj) => {
        var list = previous_col.filter(
          (obj1) => obj1.tablename === obj.table_name
        );
        if (list.length !== 0) {
          list[0].ValidationProperties[0].Value = obj.rows_columns.rows;
          list[0].ValidationProperties[1].Value = obj.rows_columns.columns;
        }
      });
      setfinalValidations(previous_col);
    } else {
      let checkTable = (newValidations, arrck) => {
        let found = arrck.filter((el, i) => {
          if (el.tablename === newValidations) {
            return el;
          }
          return null;
        });
        return found;
      };
      let checkColumn = (column, v) => {
        let found = column.columns.filter((el, i) => {
          return el.ColumnName === v;
        });
        return found;
      };
      let valiadtionCheck = (validation, id) => {
        let found = validation.filter((el, i) => {
          return el.Id === id;
        });
        return found;
      };
      previous_col.forEach((val, key) => {
        let found = checkTable(val.tablename, previous_validation);
        if (found.length > 0) {
          val.columns.forEach((v, k) => {
            const indexTable = previous_validation.findIndex(
              (item) => item.tablename === val.tablename
            );
            let res = checkColumn(found[0], v.ColumnName);
            if (res.length > 0) {
              v.validation.forEach((validate, ki) => {
                const indexColumn = previous_validation[
                  indexTable
                ].columns.findIndex((item) => item.ColumnName === v.ColumnName);
                let resp = valiadtionCheck(res[0].validation, validate.Id);
                if (resp.length > 0) {
                  const indexVal = previous_validation[indexTable].columns[
                    indexColumn
                  ].validation.findIndex((item) => item.Id === resp[0].Id);
                  previous_validation[indexTable].columns[
                    indexColumn
                  ].validation.splice(indexVal, 1);
                  previous_validation[indexTable].columns[
                    indexColumn
                  ].validation.push(validate);
                } else {
                  previous_validation[indexTable].columns[
                    indexColumn
                  ].validation.push(v.validation[ki]);
                }
              });
            } else {
              previous_validation[indexTable].columns.push(val.columns[k]);
            }
          });
        } else {
          previous_validation.push(previous_col[key]);
        }
      });
      rowsColumns.forEach((obj) => {
        var list = previous_validation.filter(
          (obj1) => obj1.tablename === obj.table_name
        );
        if (list.length !== 0) {
          list[0].ValidationProperties[0].Value = obj.rows_columns.rows;
          list[0].ValidationProperties[1].Value = obj.rows_columns.columns;
        }
      });
      setfinalValidations(previous_validation);
    }

    AutoScroll();
  };

  const onMouseEnter = (event, key) => {
    setOpenedPopoverId(key);
    setAnchorEl(event.currentTarget);
  };

  const onMouseLeave = (e, reason) => {
    setOpenedPopoverId(null);
    setAnchorEl(null);
  };

  useEffect(() => {
    (async () => {
      if (header === false) {
        setHeader(false);
      }
      setLoadingTables(true);
      try {
        let response = await ApiService.ConnectionDetails(connectionId);
        setTablesData([]);
        setConnection([]);
        if (response?.data) {
          response?.data?.ConnectionDetails?.connectionType === "Salesforce"
            ? setSobjects(response.data?.results)
            : setTables(response?.data?.tables);
          setConnectionDetails(response?.data?.ConnectionDetails);
          setLoadingTables(false);
        }
      } catch (error) {
        setLoadingTables(false);
        console.log(error);
      }
    })();
  }, [connectionId]);

  const initialSchema = () => {
    let a = JSON.parse(JSON.stringify(JSON_SCHEMA));
    setValidationsForm(a);
    setValidationData(a);
  };

  useEffect(() => {
    setTablesData(connection.tablesData);
  }, [finalValidations, resetData]);

  useEffect(() => {
    setTablesData(connection.tablesData);
    initialSchema();
  }, [rowsColumns]);

  const getTableData = async () => {
    setTablesData([]);
    setLoading(false);
    try {
      let response = await ApiService.ConnectionDetailsDataValidation({
        connectionId: connectionId,
        tableName: tableName,
      });
      setCollapse([]);
      setLoading(true);
      setValidationsForm(response?.data?.ValidationsForm);
      setConnection(response?.data);
      setJsonSchema(
        JSON.parse(JSON.stringify(response?.data?.ValidationsForm))
      );
      setValidationData(response?.data?.ValidationsForm);
      setTablesData(response?.data?.tablesData);
    } catch (error) {
      setLoading(true);
      console.log(error);
    }
  };

  const reset = () => {
    setValidationsForm([]);
    setValidationData([]);
    setTablesData([]);
    setTableColumns([]);
    setResetData(1);
    setrowsColumns([]);
  };

  const isSelected = (id) => selected.indexOf(id) !== -1;
  const deleteFinalvalidation = (e, id) => {
    const selectedIndex = selected.indexOf(id);
    let newSelected = [];
    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, id);
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
    let res = [...finalValidations];
    res = res.filter(function (value, index) {
      return selected.indexOf(index) === -1;
    });
    setfinalValidations(res);
    setSelected([]);
  };

  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;

  const isDisabled = (table_name, rowCount) => {
    var list = rowsColumns.filter((obj) => obj.tablename === table_name);
    if (list.length > 0) {
      if (
        list[0].columns[0].validation[0].NestedControls[0].SelectedValue
          .length > 0 &&
        parseInt(
          list[0].columns[0].validation[0].NestedControls[0].SelectedValue
        ) > 0
      ) {
        return false;
      } else {
        return true;
      }
    } else {
      return true;
    }
  };

  const isDisabledButton = () => {
    let list = validationData.filter(
      (obj) => obj.ControlProperties.IsChecked === true
    );
    if (tableColumns.length > 0 && list.length > 0) {
      return false;
    } else {
      return true;
    }
  };

  const addCollapse = () => {
    if (collapse.length === 0) {
      var a = tablesData.map((obj, index) => {
        return "panel" + index;
      });
      setCollapse(a);
    } else {
      setCollapse([]);
    }
  };

  const checkCollapse = (panel) => {
    let array = [...collapse];
    if (array.includes(panel)) {
      return true;
    } else {
      return false;
    }
  };

  const collapseExpand = (panel) => {
    let array = [...collapse];
    var index = array.findIndex((obj) => obj === panel);
    if (index !== -1) {
      array.splice(index, 1);
    } else {
      array.push(panel);
    }
    setCollapse(array);
  };

  return (
    <Box sx={{ width: "100%" }} className={classes.tableCus}>
      {showHeader && (
        <InnerHeader
          name={
            params.testId
              ? "Edit Data Quality Rule - Data Source"
              : "Create Data Quality Rule - Data Source"
          }
        />
      )}
      <Box
        sx={{
          "& .css-1elwnq4-MuiPaper-root-MuiAccordion-root.Mui-expanded": {
            m: 0,
          },
        }}
      >
        <ConnectionDetails connectionDetails={connectionDetails} />
        {loadingTables && <SkeletonLoader />}
        <Box className="conValSel">
          <Grid container>
            {tables?.length > 0 && (
              <Grid xs={12} md={5} item>
                <CheckboxesAutoComplete
                  lable="Select Tables"
                  placeholder="Select Tables"
                  optionsList={tables}
                  returnBack={(val) => {
                    setTableName(val);
                    if (val.length === 0) {
                      setConnection([]);
                    }
                  }}
                />
              </Grid>
            )}
            {sobjects?.length > 0 && (
              <Grid xs={12} md={4} item>
                <Autocomplete
                  disablePortal
                  onChange={(e, value) => {
                    setTableName([value]);
                  }}
                  size="small"
                  options={sobjects}
                  renderInput={(params) => (
                    <TextField {...params} label="Select objects" />
                  )}
                />
              </Grid>
            )}
            {["Salesforce"].includes(connectionDetails?.connectionType) && (
              <Grid
                xs={12}
                md={3}
                textAlign="center"
                item
                sx={{
                  "& .MuiSwitch-root": {
                    top: 0,
                  },
                }}
              >
                <FormControlLabel
                  size="small"
                  control={
                    <Switch
                      size="small"
                      checked={customObjects ? false : true}
                      onChange={() => {
                        setCustomObjects(!customObjects);
                      }}
                    />
                  }
                  label="Show Custom objects only"
                />
              </Grid>
            )}
            <Grid xs={12} md={2} item>
              {tableName.length > 0 && (
                <Button
                  onClick={() => {
                    getTableData();
                  }}
                  variant="contained"
                  color="success"
                  disabled={!loader}
                >
                  {loader ? (
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
              )}
            </Grid>
          </Grid>
        </Box>
        <Box>
          {tableName.length > 0 && connection?.tablesData && (
            <Paper defaultExpanded={true}>
              <Box>
                <Box className="innerSubHead">
                  <Grid alignItems="center" container>
                    <Grid xs={6} md={6} item>
                      <Typography variant="h6">
                        Select Table Columns:
                      </Typography>
                    </Grid>
                    <Grid xs={6} md={6} item>
                      <Box className="innerSubRight">
                        <Button
                          variant="outlined"
                          size="small"
                          sx={{ minWidth: "110px", textTransform: "none" }}
                          onClick={addCollapse}
                        >
                          {collapse.length === 0 ? (
                            <>
                              Expand all <ExpandMoreIcon />
                            </>
                          ) : (
                            <>
                              Collapse all <ExpandLessIcon />
                            </>
                          )}
                        </Button>
                      </Box>
                    </Grid>
                  </Grid>
                </Box>
                {tablesData &&
                  tablesData.map((item, key) => {
                    let TableNames = Object.keys(item);
                    let TableRowsColumns = Object.values(item);

                    let TableRowkeys = [];
                    if (TableRowsColumns[0]?.Columns.length > 0) {
                      TableRowkeys = TableRowsColumns[0]?.Columns?.map(
                        (item) => item.COLUMN_NAME
                      );
                    }
                    return (
                      <Accordion
                        expanded={checkCollapse("panel" + key)}
                        onChange={() => {
                          collapseExpand("panel" + key);
                        }}
                      >
                        <AccordionSummary
                          expandIcon={<ExpandMoreIcon />}
                          aria-controls="panel1a-content"
                          id="panel1a-header"
                        >
                          <Grid container alignItems="center">
                            <Grid sx={{ pl: 2, display: "flex" }} sm={4}>
                              <Typography>
                                <b>{TableNames[0]}</b> [ rows:
                                {TableRowsColumns[0].rowsCount} | cols:
                                {TableRowsColumns[0].columnCount} ]
                              </Typography>
                              <IconButton
                                aria-label="delete"
                                color="primary"
                                aria-describedby={id}
                                variant="contained"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  onMouseEnter(e, key);
                                }}
                                sx={{ padding: "2px", ml: 1 }}
                              >
                                <RemoveRedEyeOutlinedIcon />
                              </IconButton>
                              <Popover
                                id={id}
                                anchorEl={anchorEl}
                                onClose={onMouseLeave}
                                open={openedPopoverId === key}
                                anchorOrigin={{
                                  vertical: "center",
                                  horizontal: "right",
                                }}
                                transformOrigin={{
                                  vertical: "top",
                                  horizontal: "left",
                                }}
                              >
                                <Box sx={{ p: 1 }} className={classes.tableCus}>
                                  <IconButton
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      onMouseLeave();
                                    }}
                                    color="error"
                                    aria-label="close popover"
                                    sx={{
                                      position: "absolute",
                                      right: -1,
                                      top: -1,
                                      background: "#fff",
                                      p: "2px",
                                      ":hover": { background: "#fff" },
                                    }}
                                  >
                                    <CancelOutlinedIcon />
                                  </IconButton>
                                  <TableContainer
                                    sx={{ maxWidth: 650, maxHeight: 300 }}
                                  >
                                    <Table
                                      sx={{ minWidth: 650 }}
                                      aria-label="simple table"
                                      onClick={(e) => {
                                        e.stopPropagation();
                                      }}
                                    >
                                      <TableHead>
                                        <TableRow>
                                          {TableRowsColumns[0].Columns?.map(
                                            (v, i) => {
                                              return (
                                                <TableCell key={i}>
                                                  {v.COLUMN_NAME}
                                                </TableCell>
                                              );
                                            }
                                          )}
                                        </TableRow>
                                      </TableHead>
                                      <TableBody>
                                        {Array.isArray(
                                          TableRowsColumns[0].rows
                                        ) &&
                                          TableRowsColumns[0]?.rows.length >
                                            0 &&
                                          TableRowsColumns[0]?.rows.map(
                                            (itemRow, ki) => {
                                              return (
                                                <TableRow key={ki}>
                                                  {TableRowkeys.map((v, i) => {
                                                    return (
                                                      <TableCell key={i}>
                                                        {itemRow[v]}
                                                      </TableCell>
                                                    );
                                                  })}
                                                </TableRow>
                                              );
                                            }
                                          )}
                                        {TableRowsColumns[0]?.rows.length ===
                                          0 && (
                                          <TableRow>
                                            <TableCell
                                              sx={{ textAlign: "center" }}
                                              colSpan={
                                                TableRowsColumns[0].columnCount
                                              }
                                            >
                                              No records to display
                                            </TableCell>
                                          </TableRow>
                                        )}
                                      </TableBody>
                                    </Table>
                                  </TableContainer>
                                </Box>
                              </Popover>
                            </Grid>
                            <Grid sm={6}>
                              <TextField
                                type="number"
                                className="expRow"
                                InputProps={{
                                  inputProps: { min: "0", step: "1" },
                                }}
                                onClick={(e) => {
                                  e.stopPropagation();
                                }}
                                onKeyPress={(e) => {
                                  e.stopPropagation();
                                  if (e.code === "Minus") {
                                    e.preventDefault();
                                  }
                                }}
                                size="small"
                                sx={{ mr: 1 }}
                                onChange={(e) => {
                                  e.stopPropagation();
                                  addExpectedColRows(e, "rows", TableNames[0]);
                                }}
                                label="Expected rows"
                                variant="outlined"
                              />
                              <Button
                                className="expBtn"
                                variant="contained"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  addFinalRow(TableNames[0]);
                                }}
                                disabled={isDisabled(
                                  TableNames[0],
                                  TableRowsColumns[0].rowsCount
                                )}
                              >
                                {" "}
                                Add row count validation
                              </Button>
                            </Grid>
                            <Grid sm={2}></Grid>
                          </Grid>
                        </AccordionSummary>
                        <AccordionDetails sx={{ backgroundColor: "#ffffff" }}>
                          <Box>
                            <TableContainer>
                              <Table
                                sx={{ minWidth: 650 }}
                                aria-label="simple table"
                              >
                                <TableHead>
                                  <TableRow>
                                    <TableCell
                                      sx={{ width: "50px" }}
                                    ></TableCell>
                                    <TableCell>Column Name </TableCell>
                                    <TableCell>Data Type</TableCell>
                                  </TableRow>
                                </TableHead>
                                <TableBody>
                                  {TableRowsColumns[0].Columns.map((row, index) => {
                                    return (
                                      <TableRow key={row.COLUMN_NAME}>
                                        <TableCell>
                                          <Checkbox
                                            onClick={(event) =>
                                              selectTableColumns(
                                                event,
                                                TableNames[0],
                                                row.COLUMN_NAME
                                              )
                                            }
                                            sx={{ p: 0 }}
                                          />
                                        </TableCell>
                                        <TableCell>
                                          {" "}
                                          {row.COLUMN_NAME}{" "}
                                        </TableCell>
                                        <TableCell>{row.DATA_TYPE}</TableCell>
                                      </TableRow>
                                    );
                                  })}
                                </TableBody>
                              </Table>
                            </TableContainer>
                          </Box>
                        </AccordionDetails>
                      </Accordion>
                    );
                  })}
              </Box>
            </Paper>
          )}
        </Box>
      </Box>
      {tableName.length > 0 && connection?.tablesData && (
        <>
          <Box className="selectVal">
            <Paper>
              <Box className="innerSubHead">
                <Grid container alignItems="center" justify="center">
                  <Grid sm={8}>
                    <Typography variant="h6">
                      Select Data Quality Checks
                      <CustomWidthTooltip
                        title="Multiple Data Quality Checks can be applied to each column or
                      node. Several such Data Quality Checks can be combined to create new
                      Data Quality Rules. The Data Quality Rule can be executed interactively
                      and also saved for automated execution at scheduled intervals or from
                      DataOps pipelines."
                        placement="right"
                      >
                        <IconButton size="small">
                          <InfoOutlinedIcon fontSize="12px" />
                        </IconButton>
                      </CustomWidthTooltip>
                    </Typography>
                  </Grid>
                </Grid>
              </Box>
              <Box className="selValBody">
                <Grid container spacing={4}>
                  <Grid sm={12} item md={6} sx={{ mb: 0.5 }}>
                    <Box className="selColVal">
                      <Box>
                        <Typography
                          variant="h6"
                          sx={{
                            backgroundColor: "#f9cdc9",
                            padding: "4px 8px",
                            marginBottom: "16px",
                            textAlign: "center",
                          }}
                        >
                          Value
                        </Typography>
                        {validationsForm &&
                          validationsForm
                            .filter((e) => e.Category && e.Category === "Value")
                            .map((fromInput, index) => {
                              return (
                                <Box
                                key={index}
                                  className={
                                    fromInput.Class ? fromInput.Class : ""
                                  }
                                >
                                  <GetControlerFromInput
                                    key={fromInput.StateName + "1"}
                                    fromInput={fromInput}
                                    inputsHandler={inputsHandler}
                                    checkBoxHandler={checkBoxHandler}
                                    keyName={fromInput.StateName}
                                  />
                                  {fromInput.ControlProperties.IsChecked &&
                                    fromInput.NestedControls &&
                                    fromInput.NestedControls.map(
                                      (nestedInput, index) => {
                                        return (
                                          <GetControlerFromInput
                                            key={index + "2"}
                                            fromInput={nestedInput}
                                            inputsHandler={inputsHandler}
                                            checkBoxHandler={checkBoxHandler}
                                            keyName={fromInput.StateName}
                                          />
                                        );
                                      }
                                    )}
                                </Box>
                              );
                            })}
                      </Box>
                    </Box>
                  </Grid>
                  <Grid sm={12} item md={6} sx={{ mb: 0.5 }}>
                    <Box className="selColVal">
                      <Box>
                        <Typography
                          variant="h6"
                          sx={{
                            backgroundColor: "#b2d1ff",
                            padding: "4px 8px",
                            marginBottom: "16px",
                            textAlign: "center",
                          }}
                        >
                          Match Datatype
                        </Typography>
                        {validationsForm &&
                          validationsForm
                            .filter(
                              (e) => e.Category && e.Category === "Data Type"
                            )
                            .map((fromInput, index) => {
                              return (
                                <Box
                                key={index}
                                  className={
                                    fromInput.Class ? fromInput.Class : ""
                                  }
                                >
                                  <GetControlerFromInput
                                    key={fromInput.StateName + "1"}
                                    fromInput={fromInput}
                                    inputsHandler={inputsHandler}
                                    checkBoxHandler={checkBoxHandler}
                                    keyName={fromInput.StateName}
                                  />
                                  {fromInput.ControlProperties.IsChecked &&
                                    fromInput.NestedControls &&
                                    fromInput.NestedControls.map(
                                      (nestedInput, index) => {
                                        return (
                                          <GetControlerFromInput
                                            key={index + "2"}
                                            fromInput={nestedInput}
                                            inputsHandler={inputsHandler}
                                            checkBoxHandler={checkBoxHandler}
                                            keyName={fromInput.StateName}
                                          />
                                        );
                                      }
                                    )}
                                </Box>
                              );
                            })}
                      </Box>
                    </Box>
                  </Grid>
                </Grid>
              </Box>
            </Paper>
          </Box>
          <Box sx={{ textAlign: "right", mt: 1 }}>
            <Button
              size="small"
              fontSize="small"
              color="error"
              onClick={() => {
                reset();
              }}
              disabled={isDisabledButton()}
              variant="contained"
              sx={{ mr: 1 }}
            >
              Reset
            </Button>
            <Button
              size="small"
              onClick={() => {
                addValidationFun();
              }}
              variant="contained"
              disabled={isDisabledButton()}
            >
              Add Data Quality Checks
            </Button>
          </Box>
        </>
      )}
      {finalValidations.length > 0 && (
        <>
          <Box className="validations" sx={{ mt: 2 }} component={Paper}>
            <Box className="innerSubHead">
              <Grid container alignItems="center" justify="center">
                <Grid sm={8}>
                  <Typography variant="h6">Data Quality Checks: </Typography>
                </Grid>
                <Grid sm={4}>
                  <Box className="createBtn" sx={{ p: "0 !important" }}>
                    {selected.length > 0 ? (
                      <Typography
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

            <TableContainer>
              <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableBody>
                  {finalValidations.map((row, irow) => {
                    const isItemSelected = isSelected(irow);
                    const labelId = `validations-table-checkbox-${irow}`;
                    return (
                      <TableRow key={labelId}>
                        <TableCell width={"40px"} align="center">
                          <Checkbox
                            onClick={(e) => {
                              deleteFinalvalidation(e, irow);
                            }}
                            inputProps={{ "aria-labelledby": labelId }}
                            checked={isItemSelected}
                            sx={{ p: 0 }}
                          />{" "}
                        </TableCell>
                        <TableCell>
                          <Typography>
                            <strong>Table Name:</strong> {row.tablename}{" "}
                          </Typography>
                        </TableCell>
                        <TableCell>
                          {row.columns.map((data1, index) => {
                            return (
                              <div key={index}>
                                <Typography className="columnName">
                                  {" "}
                                  <strong>Column Name:</strong>{" "}
                                  {data1.ColumnName === ""
                                    ? "NA"
                                    : data1.ColumnName}
                                </Typography>
                                {data1.validation.map((data, index) => {
                                  return (
                                    <Typography pl="8px">
                                      {data1.ColumnName !== "" && (
                                        <>
                                          <strong>{index + 1}.</strong>{" "}
                                          {data.DisplayName}
                                        </>
                                      )}
                                      {data["NestedControls"] &&
                                        data["NestedControls"].map((obj1) => {
                                          return (
                                            <>
                                              {obj1.ControlType ===
                                                "CheckBox" && (
                                                <>
                                                  ({obj1.Name} -{" "}
                                                  {obj1[
                                                    "ControlProperties"
                                                  ].IsChecked.toString()}
                                                  )
                                                </>
                                              )}
                                              {obj1.ControlType ===
                                                "Integer" && (
                                                <>({obj1.SelectedValue})</>
                                              )}
                                              {obj1.ControlType ===
                                                "Dropdown" && (
                                                <>
                                                  (
                                                  {obj1.SelectedValue
                                                    ? obj1.SelectedValue
                                                    : obj1["ControlProperties"]
                                                        .SelectedValue}
                                                  {""})
                                                </>
                                              )}
                                              {obj1.ControlType === "Text" && (
                                                <>({obj1.SelectedValue})</>
                                              )}
                                            </>
                                          );
                                        })}
                                      {data1.ColumnName === "" && (
                                        <>
                                          <strong>{index + 1}.</strong>{" "}
                                          {data &
                                            data.NestedControls &
                                            data.NestedControls[0]
                                              .DisplayName}{" "}
                                          -{" "}
                                          {data &
                                            data.NestedControls &
                                            data.NestedControls[0]
                                              .SelectedValue}
                                        </>
                                      )}
                                    </Typography>
                                  );
                                })}
                              </div>
                            );
                          })}
                        </TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            </TableContainer>
          </Box>
        </>
      )}
    </Box>
  );
}
