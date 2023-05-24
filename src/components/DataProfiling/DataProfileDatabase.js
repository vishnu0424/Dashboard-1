import { Box } from "@mui/material";
import SingleSelect from "../SingleSearchDropDown";
import { DropDownData } from "./DropDown";
import {
  Button,
  FormControl,
  FormControlLabel,
  FormLabel,
  Grid,
  MenuItem,
  Radio,
  RadioGroup,
  TextField,
  Typography,
} from "@mui/material";
import { useEffect, useMemo, useState } from "react";
import ReportTypeOptions from "./ReportTypes";
import MultipleDropDownData from "./SelectMultipleDropDown";

export default function DataSource({
  heading,
  fileoptions,
  databaseoptions,
  loadfiles,
  loaddatabase,
  obj,
  tables,
  tableName,
  settableName,
  getPieChartData,
  reportType,
  setReportType,
  CompCols,
  setCompCols,
  selectedColumn,
  setSelectedColumn,
  columns,
  attributes,
  setAttributes,
  min,
  setMin,
  max,
  setMax,
}) {
  const [type, setType] = useState("database");
  const [options, setOptions] = useState([]);
  const [value, setValue] = useState(null);
  const [selectMetaData, setSelectMetaData] = useState({});
  const [selectedOption, setselectedOption] = useState();
  const [state, setState] = useState({ right: false });

  //connection meta data
  const databaseMetaData = {
    label: "Select Connection",
    placeholder: "Filter connection list",
  };

  //files meta data
  const fileMetaData = {
    label: "Select File",
    placeholder: "Filter file list",
  };

  const attributeHelperText = {
    Piechart: "Select 2 Columns 1.Numerical and 2.Catrgory",
    Movablebarplot: "Select 4 Columns",
    Barplot: "Select either 2 or 3 Columns",
    scatterplot: "Select either 2 or 3 Columns",
    boxplot: "Select 2 Columns",
    LUX: "Select atleast 2 Column",
  };

  useMemo(() => {
    if (obj === "File") {
      setType("file");
    } else {
      setType("database");
    }
  }, [obj]);

  useEffect(() => {
    if (type === "database") {
      setSelectMetaData(databaseMetaData);
      setOptions(databaseoptions);
    } else {
      setSelectMetaData(fileMetaData);
      setOptions(fileoptions);
    }
  }, [fileoptions, databaseoptions]);

  useEffect(() => {
    setselectedOption("");
    setSelectedColumn("");
    setCompCols([]);
    setAttributes([]);
    setSelectedColumn("");
  }, [type, reportType]);

  // use this while changing checkbox
  const setDataSource = (e) => {
    setType(e.target.value);
    if (e.target.value === "file") {
      setValue(null);
      loadfiles(null);
      setSelectMetaData(fileMetaData);
      setOptions(fileoptions);
    } else {
      setValue(null);
      loaddatabase(null);
      setSelectMetaData(databaseMetaData);
      setOptions(databaseoptions);
    }
  };

  return (
    <Grid item xs={12}>
      <Grid container spacing={2} mb={2}>
        <Grid xs={3} item>
          <FormControl>
            <FormLabel>{heading}:</FormLabel>
            <RadioGroup
              row
              name="First data source"
              value={type}
              onChange={(e) => setDataSource(e)}
              onClick={() => {
                setselectedOption();
                setSelectedColumn("");
              }}
            >
              <FormControlLabel
                value="database"
                control={<Radio />}
                label="Database"
              />
              <FormControlLabel value="file" control={<Radio />} label="File" />
            </RadioGroup>
          </FormControl>
        </Grid>
        <Grid xs={5} item>
          <FormLabel>Report Type: </FormLabel>
          <TextField
            select
            fullWidth
            size="small"
            defaultValue="DQG"
            onChange={(e) => {
              setReportType(e.target.value);
            }}
            sx={{
              "& .MuiChip-root": {
                my: "1px",
                fontSize: "10px",
                height: "18px",
              },
            }}
          >
            {ReportTypeOptions.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </TextField>
        </Grid>
      </Grid>
      <Grid item className="selectConnection" xs={12}>
        <Grid container spacing={2}>
          <Grid item xs>
            <FormLabel>{selectMetaData.label}: </FormLabel>
            <SingleSelect
              options={options}
              metaData={selectMetaData}
              value={value}
              setValue={setValue}
              selectedValue={(val) => {
                if (type === "database") {
                  loaddatabase(val);
                } else {
                  loadfiles(val);
                }
                setselectedOption(val);
              }}
            />
            <Grid container sx={{ mt: 1 }}>
              <Grid item xs={12}>
                {selectedOption && (
                  <>
                    {type === "database" ? (
                      <Typography>
                        <b>Database type:</b> {selectedOption.connectionType} |{" "}
                        <b>Server:</b> {selectedOption.server} |{" "}
                        <b>Database:</b> {selectedOption.dataBase}
                      </Typography>
                    ) : (
                      <Typography>
                        <b>Type:</b> {selectedOption.ext} | <b>Size :</b>{" "}
                        {(selectedOption.size * 0.001).toFixed(1)}KB{" "}
                      </Typography>
                    )}
                  </>
                )}
              </Grid>
            </Grid>
          </Grid>

          {type !== "file" && (
            <Grid xs item>
              <Box>
                <DropDownData
                  placeholder={"Select Table"}
                  heading={"Table Name"}
                  options={tables}
                  value={tableName}
                  setValue={settableName}
                />
              </Box>
            </Grid>
          )}
          {(reportType === "Movablebarplot" ||
            reportType === "Barplot" ||
            reportType === "scatterplot" ||
            reportType === "boxplot" ||
            reportType === "Piechart") && (
            <Grid xs item>
              <Box>
                <MultipleDropDownData
                  heading={"Columns"}
                  placeholder={"Select Columns"}
                  name={"Columns"}
                  optionsList={columns}
                  Cols={attributes}
                  setCols={setAttributes}
                />
              </Box>
              <Grid container sx={{ mt: 1 }}>
                <Grid item xs={12}>
                  <Typography>
                    {reportType === "Piechart" && attributeHelperText.Piechart}
                    {reportType === "boxplot" && attributeHelperText.boxplot}
                    {reportType === "scatterplot" &&
                      attributeHelperText.scatterplot}
                    {reportType === "Barplot" && attributeHelperText.Barplot}
                    {reportType === "Movablebarplot" &&
                      attributeHelperText.Movablebarplot}
                    {reportType === "LUX" && attributeHelperText.LUX}
                  </Typography>
                </Grid>
              </Grid>
            </Grid>
          )}
          {reportType === "Movablebarplot" && (
            <Grid xs item>
              <Box>
                <Grid container>
                  <Grid item xs={12}>
                    <FormControl>
                      <FormLabel>Range: </FormLabel>
                    </FormControl>
                  </Grid>
                  <Grid item xs>
                    <TextField
                      fullWidth
                      type="number"
                      size="small"
                      placeholder="Min"
                      value={min}
                      onChange={(e) => {
                        setMin(e.target.value);
                      }}
                    />
                  </Grid>
                  <Grid item xs sx={{ marginLeft: 2 }}>
                    <TextField
                      fullWidth
                      type="number"
                      size="small"
                      placeholder="Max"
                      value={max}
                      onChange={(e) => {
                        setMax(e.target.value);
                      }}
                    />
                  </Grid>
                </Grid>
              </Box>
            </Grid>
          )}
          {reportType === "LUX" && (
            <>
              <Grid xs item>
                <Box>
                  <DropDownData
                    heading={"Base Column"}
                    name={"BaseColumn"}
                    placeholder={"Select Column"}
                    options={columns.filter((obj) => !CompCols.includes(obj))}
                    value={selectedColumn}
                    setValue={setSelectedColumn}
                  />
                </Box>
              </Grid>
              <Grid xs item>
                <Box>
                  <MultipleDropDownData
                    heading={"Compare Columns"}
                    placeholder={"Select Columns"}
                    name={"CompareColumns"}
                    optionsList={columns.filter(
                      (obj) => obj !== selectedColumn
                    )}
                    Cols={CompCols}
                    setCols={setCompCols}
                  />
                </Box>
                <Grid container sx={{ mt: 1 }}>
                  <Grid item xs={12}>
                    <Typography>{attributeHelperText.LUX}</Typography>
                  </Grid>
                </Grid>
              </Grid>
            </>
          )}
          {(reportType === "Pairplot" || reportType === "Histogram") && (
            <Grid xs item>
              <Box>
                <DropDownData
                  heading={"Column"}
                  placeholder={"Select Column"}
                  options={columns}
                  value={selectedColumn}
                  setValue={setSelectedColumn}
                />
              </Box>
            </Grid>
          )}
          <Grid xs={12} item>
            <Box sx={{ textAlign: "center" }}>
              <Button
                size="small"
                variant="contained"
                onClick={getPieChartData}
              >
                Submit
              </Button>
            </Box>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
}
