import DeleteIcon from "@mui/icons-material/Delete";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import {
  Grid,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  Tooltip,
} from "@mui/material";
import Button from "@mui/material/Button";
import Checkbox from "@mui/material/Checkbox";
import CircularProgress from "@mui/material/CircularProgress";
import FormControlLabel from "@mui/material/FormControlLabel";
import MenuItem from "@mui/material/MenuItem";
import Paper from "@mui/material/Paper";
import { styled } from "@mui/material/styles";
import TextField from "@mui/material/TextField";
import { tooltipClasses } from "@mui/material/Tooltip";
import Typography from "@mui/material/Typography";
import { makeStyles } from "@mui/styles";
import { Box } from "@mui/system";
import { useContext, useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { SnackbarContext } from "../../App";
import ApiService from "../../services/app.service";
import ApiCustomValidate from "../API/ApiCustomValidateForm";
import InnerHeader from "../InnerHeader";
import CustomJsonTree from "../JsonFile/CustomJsonTree";
import ValidateResultModal from "../Validations/ValidateResultModal";
import FilePreview from "./FileDetails";
import SelectColumns from "./SelectColumns";
import SelectFileColumns from "./SelectColumnsFiles";

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
const tableStyles = makeStyles({});

export default function FileValidations({ file, setFile }) {
  const { setSnack } = useContext(SnackbarContext);

  const classes = tableStyles();
  const [response, setResponse] = useState([]);
  const [columnOption, setColumnOption] = useState([]);
  const navigate = useNavigate();
  const [validationsResult, setValidationsResult] = useState([]);
  const [validationsResultShow, setValidationsResultShow] = useState(false);

  const [finalValidations, setFinalValidations] = useState([]);
  const [inputParams, setinputParams] = useState([{ Name: "", Value: "" }]);
  const [requestBody, setrequestBody] = useState();
  const [valfile, setvalfile] = useState();
  const params = useParams();
  const [selected, setSelected] = useState([]);

  const [createloading, setCreateLoading] = useState(false);
  const [validateloading, setValidateLoading] = useState(false);

  const [loader, setLoader] = useState(false);

  const ScrollRef = useRef();

  const CustomWidthTooltip = styled(({ className, ...props }) => (
    <Tooltip {...props} classes={{ popper: className }} />
  ))({
    [`& .${tooltipClasses.tooltip}`]: {
      maxWidth: 800,
    },
  });

  const AutoScroll = () => {
    setTimeout(() => {
      ScrollRef.current.scrollIntoView({
        behavior: "smooth",
        block: "end",
        inline: "nearest",
      });
    }, 600);
  };

  const deleteSelected = () => {
    let res = [...finalValidations];
    res = res.filter(function (value, index) {
      return selected.indexOf(index) === -1;
    });
    setFinalValidations(res);
    setSelected([]);
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

  const FormatRequestData = () => {
    let d1 = new Date();
    var data = {
      TestName: "Single API -" + d1.getTime(),
      TestType: "Single File",
      ConnectionType: "Single API",
      requestBody: valfile ? undefined : requestBody,
      file: valfile,
      Params: valfile
        ? undefined
        : Object.values(inputParams[0]).toString().trim().length === 1
        ? undefined
        : inputParams,
      Tables: [
        {
          TableName: file.fileName,
          columns: finalValidations,
        },
      ],
      ConnectionId: params.fileId,
    };
    let formData = new FormData();
    Object.keys(data).forEach((key2) => {
      let value = key2 === "file" ? data[key2] : JSON.stringify(data[key2]);
      formData.append(key2, value);
    });
    return formData;
  };

  const createValidation = async () => {
    setCreateLoading(true);
    const d1 = new Date();
    var data;
    if (response.data.fileDetails.connectionType === "Web App") {
      data = FormatRequestData();
    } else {
      data = {
        TestName: "Single File -" + d1.getTime(),
        TestType: "Single File",
        requestBody: requestBody,
        File: valfile,
        Params:
          Object.values(inputParams[0]).toString().length === 1
            ? undefined
            : inputParams,
        Tables: [
          {
            TableName: file.fileName,
            columns: finalValidations,
          },
        ],
        ConnectionId: params.fileId,
      };
    }
    try {
      await ApiService.createValidation(data);
      setSnack({ message: "DQ Rule created", open: true, colour: "success" });
      navigate("/test-hub");
    } catch (error) {
      setSnack({
        message: "somthing went wrong",
        open: true,
        colour: "error",
      });
    }
    setCreateLoading(false);
  };

  const ValidationCheck = async () => {
    setValidateLoading(true);
    const d1 = new Date();
    var data;
    if (response.data.fileDetails.connectionType === "Web App") {
      data = FormatRequestData();
    } else {
      data = {
        TestName: "Single File -" + d1.getTime(),
        TestType: "Single File",
        requestBody: requestBody,
        File: valfile,
        Params:
          Object.values(inputParams[0]).toString().length === 1
            ? undefined
            : inputParams,
        Tables: [
          {
            TableName: file.fileName,
            columns: finalValidations,
          },
        ],
        ConnectionId: params.fileId,
      };
    }
    try {
      let response = await ApiService.checkValidation(data);
      setValidationsResult(
        response?.data?.response?.ResponseObject?.Validations
      );
      setValidationsResultShow(true);
    } catch (error) {
      setSnack({
        message: "somthing went wrong",
        open: true,
        colour: "error",
      });
    }
    setValidateLoading(false);
  };

  const [fileId] = useState(params.fileId);
  const [rows, setRows] = useState(5);
  const [tables, setTables] = useState([]);
  const [totalRows, setRotalRows] = useState(0);
  const [totalColumns, setTotalColumns] = useState(0);
  const [validationsForm, setValidationsForm] = useState([]);
  const [validationData, setvalidationData] = useState([]);
  const [JSON_SCHEMA, setJsonSchema] = useState([]);

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
      setLoader(true);
      try {
        let response = await ApiService.GetFilesData({
          id: fileId,
          numberOfRows: rows,
        });
        if (response?.data?.result?.ext === "txt") {
          if (response?.data?.result?.rows[0].length > 20) {
            let abc = response.data.result.rows[0].slice(0, 20);
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
        setFile(response?.data?.fileDetails);
        setRotalRows(response?.data?.result?.totalRows);
        setTotalColumns(response?.data?.result?.totalColumns);
        setValidationsForm(response?.data?.ValidationsForm);
        setvalidationData(response?.data?.ValidationsForm);
        setJsonSchema(
          JSON.parse(JSON.stringify(response?.data?.ValidationsForm))
        );
      } catch (error) {
        console.log(error);
      }
      setLoader(false);
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

    if (finalValidations.length === 0) {
      setFinalValidations(merge_col_validation);
    } else {
      merge_col_validation.forEach((val, key) => {
        let found = checkColumn(finalValidations, val.ColumnName);
        const indexColumn = finalValidations.findIndex(
          (item) => item.ColumnName === val.ColumnName
        );
        if (found.length > 0) {
          val.validation.forEach((validate, ki) => {
            let founValidate = valiadtionCheck(
              found[0].validation,
              validate.Id
            );
            if (founValidate.length > 0) {
              const indexVal = finalValidations[
                indexColumn
              ].validation.findIndex((item) => item.Id === founValidate[0].Id);
              finalValidations[indexColumn].validation.splice(indexVal, 1);
              finalValidations[indexColumn].validation.push(validate);
            } else {
              finalValidations[indexColumn].validation.push(val.validation[ki]);
            }
          });
        } else {
          finalValidations.push(merge_col_validation[key]);
        }
      });
      setFinalValidations(finalValidations);
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
    <Box sx={{ width: "100%" }} className={classes.tableCus} ref={ScrollRef}>
      <InnerHeader
        name={
          params.testId
            ? "Edit Data Quality Rule - Data Source"
            : "Create Data Quality Rule - Data Source"
        }
      />
      <Box>
        {response?.data?.result.ext === "json" ||
        response?.data?.result.ext === "xml" ? (
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
            totalRows={totalRows}
            totalColumns={totalColumns}
            finalValidations={finalValidations}
            setFinalValidations={setFinalValidations}
            tables={tables}
            rows={rows}
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
          setfile={setvalfile}
        />
      )}
      <Box className="selectVal">
        <Paper>
          <Box className="innerSubHead">
            <Grid container alignItems="center" justify="center">
              <Grid sm={6} item>
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
              <Grid sm={6} item>
                {response?.data?.result.ext === "json" ||
                response?.data?.result.ext === "xml" ? (
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
                              Key={index}
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
      {finalValidations.length > 0 && (
        <>
          <Box className="validations" sx={{ mt: 2 }} component={Paper}>
            <Box className="innerSubHead">
              <Grid container alignItems="center" justify="center">
                <Grid sm={8} item>
                  <Typography variant="h6">DQ RUles: </Typography>
                </Grid>
                <Grid sm={4} item className="innerSubRight">
                  <Box className="createBtn">
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
                      <TableRow key={irow}>
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
                            <strong>Column Name:</strong>{" "}
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
          <Box sx={{ mt: 1 }}>
            <Grid container item>
              <Grid sm={6} sx={{ mt: 1 }} item>
                <Button
                  color="error"
                  size="small"
                  variant="contained"
                  onClick={() => {
                    navigate("/");
                  }}
                >
                  Cancel
                </Button>
              </Grid>
              <Grid sm={6} sx={{ textAlign: "right", mt: 1 }} item>
                {validationsResultShow ? (
                  <ValidateResultModal
                    Validations={validationsResult}
                    model={true}
                    returnValue={(value) => {
                      setValidationsResultShow(value);
                      setValidationsResult([]);
                    }}
                  />
                ) : (
                  <></>
                )}
                <Button
                  onClick={() => {
                    ValidationCheck();
                  }}
                  sx={{ mr: 1 }}
                  size="small"
                  color="success"
                  variant="contained"
                  disabled={validateloading || createloading}
                >
                  {validateloading ? (
                    <>
                      <CircularProgress
                        style={{
                          width: "20px",
                          height: "20px",
                          color: "#ffffff",
                          marginRight: "8px",
                        }}
                      />
                      Validate
                    </>
                  ) : (
                    <>Validate</>
                  )}
                </Button>
                <Button
                  onClick={() => {
                    createValidation();
                  }}
                  size="small"
                  variant="contained"
                  disabled={validateloading || createloading}
                >
                  {createloading ? (
                    <>
                      <CircularProgress
                        style={{
                          width: "20px",
                          height: "20px",
                          color: "#ffffff",
                          marginRight: "8px",
                        }}
                      />
                      Create DQ Rule
                    </>
                  ) : (
                    <>Create DQ Rule</>
                  )}
                </Button>
              </Grid>
            </Grid>
          </Box>
        </>
      )}
    </Box>
  );
}
