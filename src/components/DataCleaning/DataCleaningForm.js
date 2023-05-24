import {
  Box,
  Button,
  Checkbox,
  FormControl,
  FormControlLabel,
  FormLabel,
  Grid,
  MenuItem,
  TextField,
  Typography,
} from "@mui/material";
import CircularProgress from "@mui/material/CircularProgress";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import moment from "moment";
import { useContext, useEffect, useState } from "react";
import { SnackbarContext } from "../../App";
import ApiService from "../../services/app.service";
import MultipleDropDownData from "../DataProfiling/SelectMultipleDropDown";
import {
  CategoricalAlgoritms,
  CleaningAlgorithms,
  DateFormats,
} from "./CleaningAlgorithms";
import CleaningResultModal from "./CleaningResultModal";
import ConnectionDetails from "./ConnectionDetails";
import CustomInputs from "./CustomInputs";

const DataCleaningForm = ({
  Connectiondetails,
  Table,
  Columns,
  ValidationData,
  toggleDrawer,
}) => {
  const [sourceData, setSourceData] = useState(Connectiondetails);
  const [datasourcetype, setDataSourceType] = useState();
  const [table, setTable] = useState(
    ValidationData?.TableName ? ValidationData?.TableName : Table
  );
  const [columns, setColumns] = useState([]);
  const [columnTypes, setColumnTypes] = useState();
  const [operation, setOperation] = useState("replaceColumnValue");
  const [operands, setOperands] = useState([ValidationData?.ColumnName]);
  const [operand] = useState(ValidationData?.ColumnName);
  const [showResult, setShowResult] = useState(false);
  const [result, setResult] = useState();
  const [replacedate, setreplacedate] = useState(false);
  const [desireddate, setDesiredDate] = useState(new Date());
  const [dateformat, setDateformat] = useState(DateFormats[0]);
  const [loading, setLoading] = useState(false);
  const [disableclean, setdisableclean] = useState(false);
  const [inpreplace, setInpreplace] = useState(false);
  const [altcols, setAltcols] = useState([]);
  const [intColumns, setInstColumns] = useState([]);
  const [cleanMethods, setCleanMethods] = useState(CleaningAlgorithms);

  const { setSnack } = useContext(SnackbarContext);
  const inputs = {
    ColumnName: "",
    ExistingValue: "",
    ReplacingValue: "",
  };

  const [inputParams, setinputParams] = useState([inputs]);

  const PayloadOperand = {
    fillWithMode: "ModeVariable",
    fillWithMean: "MeanVariable",
    fillWithMedian: "MedianVariable",
    fillWithInterpolation: "InterpolationVariable",
  };

  useEffect(() => {
    if (
      (operation === "replaceColumnValue" && !inpreplace) ||
      (operation !== "replaceColumnValue" && operands.length >= 1)
    )
      setdisableclean(false);
    else setdisableclean(true);
  }, [operation, inpreplace, operands]);

  useEffect(() => {
    setCleanMethods(CleaningAlgorithms);
    if (operand) {
      columnTypes?.map((col) => {
        if (col.ColumnName === operand && col.DataTypeAfter === "object") {
          setCleanMethods(CategoricalAlgoritms);
          return;
        }
      });
    }
  }, [operand, columnTypes]);

  useEffect(() => {
    (async () => {
      if (ValidationData) {
        try {
          let response = await ApiService.ConnectionDetails(
            ValidationData?.ConnectionId
          );
          setSourceData(response?.data?.ConnectionDetails);
          if (response?.data?.ConnectionDetails.ext) setDataSourceType("File");
          else setDataSourceType("Database");
        } catch (error) {
          console.log(error.message);
        }
      } else {
        if (Connectiondetails?.ext) setDataSourceType("File");
        else setDataSourceType("Database");
      }
    })();
  }, []);

  useEffect(() => {
    setColumns([]);
    setOperands([]);
    setAltcols([]);
    (async () => {
      if (ValidationData) {
        if (datasourcetype === "File") {
          try {
            let response = await ApiService.GetFilesData({
              id: ValidationData.ConnectionId,
            });
            setColumns(response?.data?.result?.rows[0]);
            setAltcols(response?.data?.result?.rows[0]);
          } catch (error) {
            console.log(error);
          }
        } else if (datasourcetype === "Database") {
          try {
            let response = await ApiService.ConnectionDetailsDataValidation({
              connectionId: ValidationData.ConnectionId,
              tableName: [ValidationData.TableName],
            });
            let cols = [];
            Object.values(response.data.tablesData[0])[0].Columns.map((col) => {
              cols.push(col.COLUMN_NAME);
            });
            setColumns(cols);
            setAltcols(cols);
          } catch (error) {
            console.log(error);
          }
        }
      } else {
        setColumns(Columns);
        setAltcols(Columns);
        setTable(Table);
      }
    })();
  }, [datasourcetype]);

  useEffect(() => {
    (async () => {
      let data = {
        connectiondId: sourceData?.id,
        TableName: table,
        OperationName: "dtype",
      };
      try {
        let res = await ApiService.dataCleaningdtype(data);
        setColumnTypes(res?.data?.dtype?.Data);
      } catch (error) {
        console.log(error);
      }
    })();
  }, [sourceData]);

  useEffect(() => {
    let IntCols = [];
    columnTypes?.map((col) => {
      if (
        col.DataTypeAfter.includes("int") ||
        col.DataTypeAfter.includes("float")
      ) {
        IntCols.push(col.ColumnName);
      }
      setInstColumns(IntCols);
    });
  }, [columnTypes]);

  useEffect(() => {
    let oprs = operands;
    if (
      operation === "fillWithMean" ||
      operation === "fillWithMedian" ||
      operation === "fillWithInterpolation"
    ) {
      setOperands(oprs.filter((val) => intColumns?.includes(val)));
      setColumns(intColumns);
    } else {
      setColumns(altcols);
    }
  }, [operation]);

  const SetOperands = (operation) => {
    if (operation === "replaceColumnValue") return inputParams;
    else if (operation === "dateFormatting") {
      let details = [];
      operands.map((col) => {
        details.push({
          DateColumn: col,
          DateFormat: dateformat.value,
          ReplaceDate: replacedate ? desireddate : undefined,
        });
      });
      return details;
    } else {
      let key = PayloadOperand[operation];
      return [{ [key]: [...operands] }];
    }
  };

  const CleanData = async (formdata) => {
    setLoading(true);
    let data = {
      connectiondId: sourceData?.id,
      TableName: table,
      Operand: [
        {
          OperationName: operation,
          Details: SetOperands(operation, formdata),
        },
      ],
    };
    try {
      let res = await ApiService.dataCleaning(data);
      setResult(res?.data?.result);
      setShowResult(true);
    } catch (error) {
      setSnack({
        message: error?.response?.data?.message,
        open: true,
        colour: "error",
      });
    }
    setLoading(false);
  };

  return (
    <Box component="form" noValidate autoComplete="off">
      <Box className="drawerHead">
        <Typography variant="h6">Data Cleaning:</Typography>
      </Box>

      <Grid container rowSpacing={1.5}>
        <ConnectionDetails
          Connectiondetails={sourceData}
          datasourcetype={datasourcetype}
          Table={Table}
        />
        {ValidationData && (
          <>
            <Grid item xs={5}>
              <Typography sx={{ flex: "1 1 100%" }}>
                <b style={{ color: "#096eb6" }}>Column:</b>{" "}
                {ValidationData ? ValidationData?.ColumnName : operand}
              </Typography>
            </Grid>
            <Grid item xs={7}>
              <Typography sx={{ flex: "1 1 100%" }}>
                <b style={{ color: "#096eb6" }}>Column Type:</b>{" "}
                {columnTypes?.map((col) => {
                  if (col.ColumnName === operand) return col.DataTypeAfter;
                })}
              </Typography>
            </Grid>
            <Grid container rowSpacing={1} mt={1.5}>
              <Typography sx={{ flex: "1 1 100%" }}>
                <b>Data Quality Rule:</b>
              </Typography>
              <Grid item sm={5}>
                <Typography sx={{ flex: "1 1 100%" }}>
                  <b style={{ color: "#096eb6" }}>DQ Check:</b>{" "}
                  {ValidationData?.ValidationDisplayName}
                </Typography>
              </Grid>
              <Grid item sm={3}>
                <Typography sx={{ flex: "1 1 100%" }}>
                  <b style={{ color: "#096eb6" }}>Value:</b>{" "}
                  {ValidationData?.ValidationProperties[0].Value}
                </Typography>
              </Grid>
              <Grid item sm={4}>
                <Typography sx={{ flex: "1 1 100%" }}>
                  <b style={{ color: "#096eb6" }}>Match:</b>{" "}
                  {ValidationData?.ValidationProperties[0].IsCaseSensitive
                    ? "Exact(case-sensitive)"
                    : "case-insensitive"}
                </Typography>
              </Grid>
            </Grid>
          </>
        )}
        <Grid container rowSpacing={2.5}>
          <Grid item sm={12} mt={2}>
            <Grid item xs={12}>
              <FormControl>
                <FormLabel>{"Cleaning Algorithm:"}</FormLabel>
              </FormControl>
            </Grid>
            <TextField
              size="small"
              value={operation}
              fullWidth
              select
              placeholder="Select Cleaning Algorithm to Apply"
              onChange={(e) => {
                setOperation(e.target.value);
              }}
            >
              {cleanMethods.map((algo, I) => {
                return (
                  <MenuItem value={algo.value} key={I}>
                    {algo.label}
                  </MenuItem>
                );
              })}
            </TextField>
          </Grid>
          {operation !== "replaceColumnValue" && (
            <Grid item xs={12} lg={12}>
              <Grid item xs={12}>
                <MultipleDropDownData
                  heading={"Columns:"}
                  placeholder={"Select Columns"}
                  name={"Columns"}
                  optionsList={operand ? [operand] : columns}
                  Cols={operands}
                  setCols={setOperands}
                />
              </Grid>
            </Grid>
          )}
          {operation === "replaceColumnValue" && (
            <CustomInputs
              inputParams={inputParams}
              setinputParams={setinputParams}
              inputs={inputs}
              columns={operand ? [operand] : columns}
              operand={operand}
              returnval={(val) => {
                setInpreplace(val);
              }}
            />
          )}
          {operation === "dateFormatting" && (
            <Grid container item rowSpacing={2}>
              <Grid item sm={12}>
                <TextField
                  size="small"
                  label="Select Date Format"
                  name={"DateFormat"}
                  fullWidth
                  select
                  value={dateformat}
                  onChange={(e) => {
                    setDateformat(e.target.value);
                  }}
                >
                  {DateFormats.map((val, ind) => {
                    return (
                      <MenuItem value={val} key={ind}>
                        {val.label} (Ex:{" "}
                        {moment(desireddate).format(val.label.toUpperCase())})
                      </MenuItem>
                    );
                  })}
                </TextField>
                <FormControlLabel
                  control={<Checkbox />}
                  label="Provide date to fill into Null/Invalid dates"
                  value={replacedate}
                  onChange={(e) => {
                    setreplacedate(!replacedate);
                  }}
                />
              </Grid>
              {replacedate && (
                <Grid item sm={12}>
                  <LocalizationProvider dateAdapter={AdapterDateFns}>
                    <DatePicker
                      label="Desired Date"
                      inputFormat={dateformat.label}
                      value={desireddate}
                      onChange={(newValue) => {
                        setDesiredDate(newValue);
                      }}
                      renderInput={(params) => (
                        <TextField size="small" {...params} fullWidth />
                      )}
                    />
                  </LocalizationProvider>
                </Grid>
              )}
            </Grid>
          )}
        </Grid>
      </Grid>
      <Box
        sx={{
          mt: 2,
          textAlign: "center",
          "& .MuiButton-root": {
            "&:nth-of-type(1)": {
              mr: 1,
            },
          },
        }}
      >
        <Grid
          container
          sx={{ m: 1 }}
          rowSpacing={1}
          columnSpacing={{ xs: 1, sm: 2, md: 3 }}
        >
          <Grid item xs={6} textAlign="left">
            <Button
              variant="contained"
              color="error"
              size="small"
              onClick={toggleDrawer("right", false)}
            >
              Close
            </Button>
          </Grid>
          <Grid item xs={6} textAlign="right">
            <Button
              disabled={loading || disableclean}
              variant="contained"
              type="submit"
              color="success"
              size="small"
              sx={{ mr: 1 }}
              onClick={CleanData}
            >
              {loading ? (
                <>
                  <CircularProgress
                    style={{
                      width: "20px",
                      height: "20px",
                      color: "#ffffff",
                      marginRight: "8px",
                    }}
                  />
                  Clean Data
                </>
              ) : (
                <>Clean Data</>
              )}
            </Button>
          </Grid>
        </Grid>
      </Box>
      {showResult && (
        <CleaningResultModal
          Result={result}
          model={true}
          returnValue={() => {
            setShowResult(false);
          }}
        />
      )}
    </Box>
  );
};

export default DataCleaningForm;
