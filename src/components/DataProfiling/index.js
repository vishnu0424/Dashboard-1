import CancelOutlinedIcon from "@mui/icons-material/CancelOutlined";
import ErrorOutlineOutlinedIcon from "@mui/icons-material/ErrorOutlineOutlined";
import {
  Box,
  Grid,
  IconButton,
  Paper,
  Tooltip,
  Typography,
} from "@mui/material";
import { useContext, useEffect, useRef, useState } from "react";
import { SnackbarContext } from "../../App";
import ApiService from "../../services/app.service";
import PieChartComponent from "../Charts/PieChart";
import InnerHeader from "../InnerHeader";
import SkeletonLoader from "../SkeletonLoader";
import DataProfileDatabase from "./DataProfileDatabase";

export default function DataProfiling() {
  const { setSnack } = useContext(SnackbarContext);
  const [source1, setSource1] = useState();
  const [showPieChart, setshowPieChart] = useState(false);
  const [loader, setLoader] = useState(false);
  const [type, setType] = useState("db");
  const [fileData, setFileData] = useState(false);
  const [iframeUrl, setIframeUrl] = useState(null);

  // tables
  const [tables, setTables] = useState([]);
  const [tableName, settableName] = useState("");

  // columns
  const [columns, setColumns] = useState([]);
  const [columnData, setColumnsData] = useState([]);
  const [responseData, setResponseData] = useState({});
  const [filesOptions, setFileOptions] = useState([]);
  const [databaseOptions, setDatabaseOptions] = useState([]);
  const [reportType, setReportType] = useState("DQG");
  const [tablesColumns, setTablesColumns] = useState([]);
  const [selectedColumn, setSelectedColumn] = useState([]);
  const [CompCols, setCompCols] = useState([]);
  const [attributes, setAttributes] = useState([]);
  const [min, setMin] = useState();
  const [max, setMax] = useState();
  const ScrollRef = useRef();

  const AutoScroll = () => {
    setTimeout(() => {
      ScrollRef.current.scrollIntoView({
        behavior: "smooth",
        block: "end",
        inline: "nearest",
      });
    }, 600);
  };

  useEffect(() => {
    setColumns([]);
    setSelectedColumn("");
    setAttributes([]);
    setCompCols([]);

    if (type !== "file") {
      setColumns(tablesColumns[tableName]);
    }
  }, [tableName]);

  useEffect(() => {
    (async () => {
      try {
        let response = await ApiService.ConnectionsList();
        let someData = response?.data?.data.filter((e) =>
          ["SAP HANA", "My SQL", "SQL"].includes(e.connectionType)
        );
        setDatabaseOptions(someData);
      } catch (error) {
        console.log(error?.response);
      }
    })();
  }, []);

  useEffect(() => {
    (async () => {
      try {
        let response = await ApiService.getFilesList();
        setFileOptions(response?.data?.data);
      } catch (error) {
        console.log(error?.response);
      }
    })();
  }, []);

  useEffect(() => {
    setshowPieChart(false);
    setFileData(false);
    setIframeUrl(null);
    setMin();
    setMax();
  }, [type, reportType]);

  useEffect(() => {
    setshowPieChart(false);
    setFileData(false);
    setIframeUrl(null);
    setSelectedColumn("");
    setCompCols([]);
    settableName("");
    (async () => {
      if (source1) {
        if (type === "file") {
          try {
            let response = await ApiService.GetFilesData({ id: source1.id });
            setColumns(response?.data?.result?.rows[0]);
          } catch (error) {
            console.log(error);
          }
        } else {
          try {
            let response = await ApiService.ConnectionTablesColumns(source1.id);
            setColumns([]);
            settableName("");
            setTables(response?.data?.tables);
            setTablesColumns(response?.data?.tablesColumns);
          } catch (error) {
            console.log(error);
          }
        }
      } else {
        setTables([]);
        setColumns([]);
      }
    })();
  }, [source1]);

  function getPieChartData() {
    if (
      (type === "file" && !source1) ||
      (type === "db" && (!source1 || !tableName)) ||
      (reportType === "LUX" && (!selectedColumn || CompCols.length < 1)) ||
      ((reportType === "scatterplot" || reportType === "boxplot") &&
        attributes.length < 2)
    ) {
      if (
        reportType === "LUX" &&
        selectedColumn &&
        CompCols.length < 2 &&
        CompCols.length !== 0
      ) {
        setSnack({
          message: "Atleast Two Compare Columns must be selected",
          open: true,
          colour: "error",
        });
      } else {
        setSnack({
          message: "Fill in all details",
          open: true,
          colour: "error",
        });
      }
    } else {
      setColumnsData([]);
      setIframeUrl(null);
      if (type === "file") {
        fileChartData();
      } else {
        databaseChartData();
      }
    }
  }

  async function fileChartData() {
    setFileData(false);
    setLoader(true);
    var data = {
      Id: source1.id,
      Type: "File",
      Name: source1.fileName,
      Table: "",
      reportType: reportType,
      baseColumn: selectedColumn ? selectedColumn : columns[0],
      compareColumns: CompCols,
      column1: selectedColumn ? selectedColumn : "",
      possibleAttributes: min && max ? [...attributes, min, max] : attributes,
    };
    try {
      let response = await ApiService.dataProfiling(data);
      if (reportType === "DQG") {
        setResponseData(response?.data?.ResponseObject);
        setColumnsData(response?.data?.ResponseObject?.Columns);
        setshowPieChart(true);
      } else {
        setFileData(true);
        setIframeUrl(response?.data?.path);
      }
      AutoScroll();
    } catch (error) {
      console.log(error);
    }
    setLoader(false);
  }

  async function databaseChartData() {
    setFileData(false);
    setLoader(true);
    var data = {
      Id: source1.id,
      Table: tableName,
      Type: source1.connectionType,
      reportType: reportType,
      baseColumn: selectedColumn ? selectedColumn : columns[0],
      compareColumns: CompCols,
      column1: selectedColumn ? selectedColumn : "",
      possibleAttributes: min && max ? [...attributes, min, max] : attributes,
    };
    try {
      let response = await ApiService.dataProfiling(data);
      if (reportType === "DQG") {
        setResponseData(response?.data?.ResponseObject);
        if (response?.data?.ResponseObject?.Columns?.length > 0) {
          setColumnsData(response?.data?.ResponseObject?.Columns);
          setshowPieChart(true);
        } else {
          setSnack({
            message: "Columns data is empty",
            open: true,
            colour: "warning",
          });
        }
      } else {
        setFileData(true);
        setIframeUrl(response?.data?.path);
      }
      AutoScroll();
    } catch (error) {
      console.log(error);
    }
    setLoader(false);
  }

  return (
    <Box sx={{ width: "100%" }}>
      {/* Heading */}
      <InnerHeader name={"Data Profiling"} />
      <Box className="DPMain">
        <Box mt="16px">
          <Grid container spacing={2}>
            <Grid xs={12} item>
              <Box className="DPDropDown">
                <DataProfileDatabase
                  heading="Data Sources"
                  fileoptions={filesOptions}
                  databaseoptions={databaseOptions}
                  loadfiles={(value) => {
                    setSource1(value);
                    setType("file");
                  }}
                  loaddatabase={(value) => {
                    setSource1(value);
                    setType("db");
                  }}
                  getPieChartData={getPieChartData}
                  tables={tables}
                  tableName={tableName}
                  settableName={settableName}
                  reportType={reportType}
                  setReportType={setReportType}
                  setSelectedColumn={setSelectedColumn}
                  CompCols={CompCols}
                  setCompCols={setCompCols}
                  selectedColumn={selectedColumn}
                  columns={columns ? columns : []}
                  attributes={attributes}
                  setAttributes={setAttributes}
                  min={min}
                  setMin={setMin}
                  max={max}
                  setMax={setMax}
                />
              </Box>
            </Grid>
            <Grid xs={12} item>
              {loader && <SkeletonLoader />}
              {!loader && showPieChart && (
                <>
                  <Paper>
                    <Box className="DPGraphHead">
                      {type === "db" && (
                        <Grid container spacing={1}>
                          <Grid md item>
                            <Box>
                              <Typography variant="h6">Connection</Typography>
                              <Typography>
                                {source1?.connectionName
                                  ? source1?.connectionName
                                  : "File"}
                              </Typography>
                            </Box>
                          </Grid>
                          <Grid md item>
                            <Box>
                              <Typography variant="h6">Database</Typography>
                              <Typography>
                                {source1?.connectionType
                                  ? source1?.connectionType
                                  : "File"}
                              </Typography>
                            </Box>
                          </Grid>
                          <Grid md item>
                            <Box>
                              <Typography variant="h6">Table Name</Typography>
                              <Typography>
                                {responseData?.DataSource?.Table
                                  ? responseData?.DataSource?.Table
                                  : "NA"}
                              </Typography>
                            </Box>
                          </Grid>
                          <Grid md item>
                            <Box>
                              <Typography variant="h6">Column Count</Typography>
                              <Typography>
                                {responseData?.DataSource?.ColumnsCount}
                              </Typography>
                            </Box>
                          </Grid>
                          <Grid md item>
                            <Box>
                              <Typography variant="h6">RowsCount</Typography>
                              <Typography>
                                {responseData?.DataSource?.RowsCount}
                              </Typography>
                            </Box>
                            <IconButton
                              onClick={() => {
                                setshowPieChart(false);
                              }}
                              color="error"
                              size="small"
                            >
                              <CancelOutlinedIcon />
                            </IconButton>
                          </Grid>
                        </Grid>
                      )}
                      {type === "file" && (
                        <Grid container spacing={1}>
                          <Grid md item>
                            <Box>
                              <Typography variant="h6">File Name</Typography>
                              <Typography>
                                {responseData?.DataSource.Name
                                  ? responseData?.DataSource.Name
                                  : "NA"}
                              </Typography>
                            </Box>
                          </Grid>
                          <Grid md item>
                            <Box>
                              <Typography variant="h6">Column Count</Typography>
                              <Typography>
                                {responseData?.DataSource.ColumnsCount}
                              </Typography>
                            </Box>
                          </Grid>
                          <Grid md item>
                            <Box>
                              <Typography variant="h6">RowsCount</Typography>
                              <Typography>
                                {responseData?.DataSource.RowsCount}
                              </Typography>
                            </Box>
                          </Grid>
                        </Grid>
                      )}
                    </Box>
                    <Box ref={ScrollRef}>
                      <Box className="DPOuptlabel">
                        <Grid container alignItems="center">
                          <Grid md={2} item>
                            <Box>
                              <Typography variant="h6">Column Name</Typography>
                            </Box>
                          </Grid>
                          <Grid md={10} item>
                            <Box>
                              <Grid container spacing={0.5} alignItems="center">
                                <Grid md={7} item>
                                  <Box>
                                    <Typography variant="h6">
                                      Data Profile
                                    </Typography>
                                  </Box>
                                </Grid>
                                <Grid md={5} item>
                                  <Box className="DPToolTip">
                                    <Typography variant="h6">
                                      Duplicates | Distinct | Null
                                    </Typography>

                                    <Tooltip
                                      title="You can click on the charts below to see the duplicate, distinct values."
                                      placement="top"
                                      arrow
                                    >
                                      <IconButton size="small">
                                        <ErrorOutlineOutlinedIcon />
                                      </IconButton>
                                    </Tooltip>
                                  </Box>
                                </Grid>
                              </Grid>
                            </Box>
                          </Grid>
                        </Grid>
                      </Box>
                      <PieChartComponent columnData={columnData} />
                    </Box>
                  </Paper>
                </>
              )}
            </Grid>
          </Grid>
        </Box>
      </Box>
      {fileData && iframeUrl && (
        <iframe
          src={iframeUrl}
          height="100%"
          width="100%"
          frameBorder="0"
          ref={ScrollRef}
        />
      )}
    </Box>
  );
}
