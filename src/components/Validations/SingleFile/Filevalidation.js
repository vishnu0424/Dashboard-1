import DeleteIcon from "@mui/icons-material/Delete";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import { Grid, IconButton, Tooltip } from "@mui/material";
import Button from "@mui/material/Button";
import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";
import MenuItem from "@mui/material/MenuItem";
import Paper from "@mui/material/Paper";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableRow from "@mui/material/TableRow";
import TextField from "@mui/material/TextField";
import { tooltipClasses } from "@mui/material/Tooltip";
import Typography from "@mui/material/Typography";
import { Box } from "@mui/system";
import { useEffect, useState } from "react";
import ApiService from "../../../services/app.service";
import ApiCustomValidate from "../../API/ApiCustomValidateForm";
import FilePreview from "../../Files/FileDetails";
import SelectColumns from "../../Files/SelectColumns";
import SelectFileColumns from "../../Files/SelectColumnsFiles";
import CustomJsonTree from "../../JsonFile/CustomJsonTree";

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
        {fromInput.ControlProperties.Values.map((item) => {
          return (
            <MenuItem key={item} value={item}>
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

export default function FileValidations({
  fileId,
  setfinalValidation,
  finalValidation,
  inputParams,
  setinputParams,
  requestBody,
  setrequestBody,
  setfile,
  AutoScroll,
}) {
  const [response, setResponse] = useState([]);
  const [columnOption, setColumnOption] = useState([]);
  const [rows, setRows] = useState(5);
  const [tables, setTables] = useState([]);
  const [file, setFile] = useState({});
  const [selected, setSelected] = useState([]);
  const [fileType, setfileType] = useState();
  const [loader, setLoader] = useState(false);
  const [validationsForm, setValidationsForm] = useState([]);
  const [validationData, setvalidationData] = useState([]);
  const [JSON_SCHEMA, setJsonSchema] = useState([]);
  const [totalRows, setRotalRows] = useState(0);
  const [totalColumns, setTotalColumns] = useState(0);

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
            setvalidationData(prev_validation);
          } else {
            obj["ControlProperties"]["IsChecked"] = e.target.checked;
            setvalidationData(prev_validation);
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
      setvalidationData(prev_validation);
    }
  };

  const inputsHandler = (e, keyname) => {
    let prev_validation = [...validationData];
    prev_validation.forEach((obj) => {
      if (obj.StateName === keyname) {
        obj["NestedControls"].forEach((obj1) => {
          if (obj1.StateName === e.target.name) {
            obj1["SelectedValue"] = e.target.value;
            setvalidationData(prev_validation);
          }
        });
      }
    });
  };

  useEffect(() => {
    (async () => {
      setColumnOption([]);
      setfileType();
      setTables([]);
      if (fileId) {
        setLoader(true);
        try {
          let response = await ApiService.GetFilesData({
            id: fileId,
            numberOfRows: rows,
          });
          setLoader(false);
          setfileType(response?.data?.result?.ext);
          if (response?.data?.result?.ext === "txt") {
            if (response.data.result.rows[0].length > 20) {
              var abc = response.data.result.rows[0].slice(0, 20);
              response.data.result.rows[0] = abc;
            }
          }
          setResponse(response);
          if (
            response.data.result.ext === "json" ||
            response.data.result.ext === "xml"
          ) {
            let filterData = response.data.result.nodes.filter(
              (obj) => (obj.Type !== "complex") & (obj.Type !== "array")
            );
            let __d = filterData.map((obj) => obj.Path);
            setTables(__d);
          } else {
            setTables(response.data.result.rows);
          }
          setFile(response.data.fileDetails);
          setRotalRows(response.data.result.totalRows);
          setTotalColumns(response.data.result.totalColumns);
          setValidationsForm(response.data.ValidationsForm);
          setvalidationData(response.data.ValidationsForm);
          setJsonSchema(
            JSON.parse(JSON.stringify(response.data.ValidationsForm))
          );
        } catch (error) {
          setLoader(false);
          console.log(error);
        }
      }
    })();
  }, [fileId, rows]);

  const refresh = () => {
    let a = JSON.parse(JSON.stringify(JSON_SCHEMA));
    setValidationsForm(a);
    setvalidationData(a);
  };

  const handleChange = (event) => {
    const {
      target: { value },
    } = event;
    setColumnOption(typeof value === "string" ? value.split(",") : value);
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
    let res = [...finalValidation];
    res = res.filter(function (value, index) {
      return selected.indexOf(index) === -1;
    });
    setfinalValidation(res);
    setSelected([]);
  };

  const addValidation = () => {
    setValidationsForm([]);
    setvalidationData([]);
    let prev_columns = [...columnOption];
    var merge_col_validation = prev_columns.map((column) => {
      let inital_validation = {
        ColumnName: column,
        validation: [],
      };
      validationData.forEach((obj) => {
        if (obj["ControlProperties"]["IsChecked"] === true) {
          inital_validation.validation.push(obj);
        }
      });
      return inital_validation;
    });

    let checkColumn = (column, v) => {
      let found = column.filter((el, i) => {
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

    if (finalValidation.length === 0) {
      setfinalValidation(merge_col_validation);
    } else {
      merge_col_validation.forEach((val, key) => {
        let found = checkColumn(finalValidation, val.ColumnName);
        const indexColumn = finalValidation.findIndex(
          (item) => item.ColumnName === val.ColumnName
        );
        if (found.length > 0) {
          val.validation.forEach((validate, ki) => {
            let founValidate = valiadtionCheck(
              found[0].validation,
              validate.Id
            );
            if (founValidate.length > 0) {
              const indexVal = finalValidation[
                indexColumn
              ].validation.findIndex((item) => item.Id === founValidate[0].Id);
              finalValidation[indexColumn].validation.splice(indexVal, 1);
              finalValidation[indexColumn].validation.push(validate);
            } else {
              finalValidation[indexColumn].validation.push(val.validation[ki]);
            }
          });
        } else {
          finalValidation.push(merge_col_validation[key]);
        }
      });
      setfinalValidation(finalValidation);
    }
    setColumnOption([]);
    setTimeout(() => {
      refresh();
    }, 1);

    AutoScroll();
  };

  const resetPage = () => {
    setValidationsForm([]);
    setvalidationData([]);
    setColumnOption([]);
    setTimeout(() => {
      refresh();
    }, 1);
  };

  const isDisabledbutton = () => {
    let list = validationData.filter(
      (obj) => obj.ControlProperties.IsChecked === true
    );
    if (columnOption.length > 0 && list.length > 0) {
      return false;
    } else {
      return true;
    }
  };

  return (
    <Box sx={{ width: "100%" }}>
      <Box>
        {fileType === "json" || fileType === "xml" ? (
          <Paper>
            <CustomJsonTree
              loader={loader}
              response={response.data}
              showCross={false}
            />
          </Paper>
        ) : (
          <FilePreview
            loader={loader}
            file={file}
            tables={tables}
            rows={rows}
            totalRows={totalRows}
            totalColumns={totalColumns}
            setRows={setRows}
          />
        )}
      </Box>
      {response?.data?.fileDetails?.connectionType === "Web App" && (
        <ApiCustomValidate
          inputParams={inputParams}
          setinputParams={setinputParams}
          requestBody={requestBody}
          setrequestBody={setrequestBody}
          setfile={setfile}
        />
      )}
      <Box className="selectVal">
        <Paper>
          <Box className="innerSubHead">
            <Grid container alignItems="center" justify="center">
              <Grid sm={6}>
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
              <Grid sm={6}>
                {tables.length > 0 && (
                  <Box>
                    {fileType === "json" || fileType === "xml" ? (
                      <SelectFileColumns
                        columnOption={columnOption}
                        handleChange={handleChange}
                        tables={tables}
                      />
                    ) : (
                      <SelectColumns
                        columnOption={columnOption}
                        handleChange={handleChange}
                        tables={tables}
                        file={file}
                      />
                    )}
                  </Box>
                )}
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
                              className={fromInput.Class ? fromInput.Class : ""}
                              key={index}
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
                        .filter((e) => e.Category && e.Category === "Data Type")
                        .map((fromInput, index) => {
                          return (
                            <Box
                              className={fromInput.Class ? fromInput.Class : ""}
                              key={index}
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
          onClick={resetPage}
          color="error"
          sx={{ mr: 1 }}
          variant="contained"
          disabled={isDisabledbutton()}
        >
          Reset
        </Button>
        <Button
          size="small"
          onClick={addValidation}
          variant="contained"
          disabled={isDisabledbutton()}
        >
          Add Data Quality Checks
        </Button>
      </Box>
      {finalValidation.length > 0 && (
        <>
          <Box className="validations" sx={{ mt: 2 }} component={Paper}>
            <Box className="innerSubHead">
              <Grid container alignItems="center" justify="center">
                <Grid sm={8}>
                  <Typography variant="h6">Data Quality Checks: </Typography>
                </Grid>
                <Grid sm={4} className="innerSubRight">
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
                  {finalValidation.map((row, irow) => {
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
                          />
                        </TableCell>
                        <TableCell>
                          <Typography>
                            <strong>
                              {response?.data?.fileDetails?.connectionType ===
                              "Web App"
                                ? "Property"
                                : "Column"}{" "}
                              Name:
                            </strong>{" "}
                            {row.ColumnName === "" ? "NA" : row.ColumnName}{" "}
                          </Typography>
                        </TableCell>
                        {row.ColumnName === "" && (
                          <TableCell>
                            <strong>1.</strong>{" "}
                            {row.validation[0].NestedControls[0].DisplayName} -{" "}
                            {row.validation[0].NestedControls[0].SelectedValue}
                          </TableCell>
                        )}
                        {row.ColumnName !== "" && (
                          <TableCell>
                            {row.validation.map((data, index) => {
                              return (
                                <>
                                  <strong>{index + 1}.</strong>{" "}
                                  {data.DisplayName}
                                  {data["NestedControls"] &&
                                    data["NestedControls"].map((obj1) => {
                                      return (
                                        <>
                                          (
                                          {obj1.ControlType === "CheckBox" && (
                                            <>
                                              {obj1.Name} -{" "}
                                              {obj1[
                                                "ControlProperties"
                                              ].IsChecked.toString()}
                                            </>
                                          )}
                                          {obj1.ControlType === "Integer" && (
                                            <>{obj1.SelectedValue}</>
                                          )}
                                          {obj1.ControlType === "Dropdown" && (
                                            <>
                                              {obj1.SelectedValue
                                                ? obj1.SelectedValue
                                                : obj1["ControlProperties"]
                                                    .SelectedValue}
                                              {""}
                                            </>
                                          )}
                                          {obj1.ControlType === "Text" && (
                                            <>{obj1.SelectedValue}</>
                                          )}
                                          )
                                        </>
                                      );
                                    })}
                                  <br />
                                </>
                              );
                            })}
                          </TableCell>
                        )}
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
