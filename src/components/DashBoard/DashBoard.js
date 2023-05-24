import AccessTimeOutlinedIcon from "@mui/icons-material/AccessTimeOutlined";
import AdjustIcon from "@mui/icons-material/Adjust";
import ArticleOutlinedIcon from "@mui/icons-material/ArticleOutlined";
import CancelRoundedIcon from "@mui/icons-material/CancelRounded";
import CheckCircleRoundedIcon from "@mui/icons-material/CheckCircleRounded";
import ShareOutlinedIcon from "@mui/icons-material/ShareOutlined";
import StorageOutlinedIcon from "@mui/icons-material/StorageOutlined";
import {
  Box,
  Divider,
  Grid,
  TextField,
  Tooltip,
  Typography,
} from "@mui/material";
import Paper from "@mui/material/Paper";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import moment from "moment";
import React, {useState, useMemo, useEffect} from "react";
import { Link } from "react-router-dom";
import ApiService from "../../services/app.service";
import Demo from "../Charts/TestsChart";
import InnerHeader from "../InnerHeader";
import { useStyles } from "../Styles";

export default function DashBoard() {
  const [FromDate, setFromDate] = useState(null);
  const [ToDate, setToDate] = useState(null);
  const [tests, setTests] = useState([]);
  const classes = useStyles();

  useMemo(() => {
    var d = new Date();
    var x = 7;
    setFromDate(d.setDate(d.getDate() - x));
    setToDate(new Date());
  }, []);

  useEffect(() => {
    (async () => {
      if (FromDate && ToDate) {
        try {
          let response = await ApiService.getDashboardData({
            days: 5,
            ToDate: moment(ToDate).format("YYYY-MM-DD"),
            FromDate: moment(FromDate).format("YYYY-MM-DD"),
          });
          response?.data?.graphData.forEach((obj) => {
            obj["Date"] = moment(obj.Date).format("DD/MM");
          });
          setTests(response?.data);
        } catch (e) {
          console.log(e);
        }
      }
    })();
  }, [FromDate, ToDate]);

  return (
    <React.Fragment>
      <Box className={classes.upcomingTests}>
        <InnerHeader name={"Dashboard"} />
        <Paper className={classes.PaperCus}>
          <Grid container className="overallDQ">
            <Grid item md={12}>
              <Box className="DQhead">
                <Typography variant="h6">Overall Data Quality</Typography>
              </Box>
            </Grid>
            <Grid item md={2}>
              <Box className="DQ">
                <Grid container alignItems="center">
                  <Grid md={12} item>
                    <Box>
                      <Typography variant="h6">Data Sources</Typography>
                      <Typography>
                        No of Data Sources:{" "}
                        {tests?.OverallDataQuality?.dataSource}
                      </Typography>
                    </Box>
                  </Grid>
                </Grid>
              </Box>
            </Grid>
            <Grid item md={3}>
              <Box className="DQ">
                <Grid container alignItems="center">
                  <Grid md={12} item>
                    <Box>
                      <Box className={classes.progress}>
                        {tests?.OverallDataQuality?.dataSource === 0 ? (
                          <Box className="noData">No Data Source</Box>
                        ) : (
                          <>
                            {tests?.OverallDataQuality?.graph.good.no !== 0 && (
                              <Tooltip
                                title={
                                  tests?.OverallDataQuality?.graph?.good
                                    ?.SourceDatabaseCount +
                                  " DB | " +
                                  tests?.OverallDataQuality?.graph?.good
                                    ?.SourceFileCount +
                                  " Files"
                                }
                                placement="top"
                                arrow
                              >
                                <Box
                                  backgroundColor="#0074ef"
                                  width={
                                    tests?.OverallDataQuality?.graph.good
                                      .percentage + "%"
                                  }
                                >
                                  {tests?.OverallDataQuality?.graph.good.no}
                                </Box>
                              </Tooltip>
                            )}
                            {tests?.OverallDataQuality?.graph.average.no !==
                              0 && (
                              <Tooltip
                                title={
                                  tests?.OverallDataQuality?.graph.average
                                    .SourceDatabaseCount +
                                  " DB | " +
                                  tests?.OverallDataQuality?.graph?.average
                                    ?.SourceFileCount +
                                  " Files"
                                }
                                placement="top"
                                arrow
                              >
                                <Box
                                  backgroundColor="#ffc107"
                                  width={
                                    tests?.OverallDataQuality?.graph.average
                                      .percentage + "%"
                                  }
                                >
                                  {tests?.OverallDataQuality?.graph.average.no}
                                </Box>
                              </Tooltip>
                            )}
                            {tests?.OverallDataQuality?.graph.poor.no !== 0 && (
                              <Tooltip
                                title={
                                  tests?.OverallDataQuality?.graph.poor
                                    .SourceDatabaseCount +
                                  " DB | " +
                                  tests?.OverallDataQuality?.graph?.poor
                                    ?.SourceFileCount +
                                  " Files"
                                }
                                placement="top"
                                arrow
                              >
                                <Box
                                  backgroundColor="#ff0c00"
                                  width={
                                    tests?.OverallDataQuality?.graph.poor
                                      .percentage + "%"
                                  }
                                >
                                  {tests?.OverallDataQuality?.graph.poor.no}
                                </Box>
                              </Tooltip>
                            )}
                          </>
                        )}
                      </Box>
                      <Box className="colorInfo">
                        <Box>
                          <Typography>
                            <AdjustIcon /> Good
                          </Typography>
                          <Typography>
                            <AdjustIcon /> Average
                          </Typography>
                          <Typography>
                            <AdjustIcon /> Poor
                          </Typography>
                        </Box>
                      </Box>
                    </Box>
                  </Grid>
                </Grid>
              </Box>
            </Grid>
            <Grid item md={2}>
              <Box className="DQ">
                <Grid container>
                  <Grid md={12} item>
                    <Box>
                      <Typography variant="h6">Tests</Typography>
                      <Typography>
                        No of Tests:{" "}
                        {tests?.OverallDataQuality?.ValidatedRecords?.Tests}
                      </Typography>
                    </Box>
                  </Grid>
                </Grid>
              </Box>
            </Grid>
            <Grid item md={2}>
              <Box className="DQ">
                <Grid container>
                  <Grid md={12} item>
                    <Box>
                      <Typography variant="h6">DQ Checks</Typography>
                      <Typography>
                        Data Quality Checks:{" "}
                        {
                          tests?.OverallDataQuality?.ValidatedRecords
                            ?.TotalValidations
                        }
                      </Typography>
                    </Box>
                  </Grid>
                </Grid>
              </Box>
            </Grid>
            <Grid item md={3}>
              <Box className="DQ">
                <Grid container>
                  <Grid md={12} item>
                    <Box>
                      <Typography variant="h6">
                        No of Records Validated:{" "}
                        {
                          tests?.OverallDataQuality?.ValidatedRecords
                            .ValidatedRecords
                        }
                      </Typography>
                      <Box>
                        <Grid container className="PassFail" mt="0!important">
                          <Grid item sm={6}>
                            <Box className="passed" sx={{ ml: "-5px" }}>
                              <CheckCircleRoundedIcon />
                              <Typography>
                                {" "}
                                {
                                  tests?.OverallDataQuality?.ValidatedRecords
                                    ?.Passed
                                }{" "}
                                Passed
                              </Typography>
                            </Box>
                          </Grid>
                          <Grid item sm={6}>
                            <Box className="failed">
                              <CancelRoundedIcon />
                              <Typography>
                                {" "}
                                {
                                  tests?.OverallDataQuality?.ValidatedRecords
                                    ?.Failed
                                }{" "}
                                Failed
                              </Typography>
                            </Box>
                          </Grid>
                        </Grid>
                      </Box>
                    </Box>
                  </Grid>
                </Grid>
              </Box>
            </Grid>
          </Grid>
        </Paper>

        <Paper className={classes.PaperCus} sx={{ mt: 2 }}>
          <Box>
            <Box className="DQhead">
              <Typography variant="h6">Data Quality</Typography>
            </Box>

            <Box className="compSec">
              <Grid container spacing={2} mb="8px">
                <Grid item sm={12} md={5}>
                  <Box className="compLeft">
                    <Typography color="#1162bb" mb="8px" variant="h6">
                      Single Data Source
                    </Typography>
                  </Box>
                  <Grid container spacing={2}>
                    <Grid item sm={6}>
                      <Box className="DBsec">
                        <Grid container spacing={1} alignItems="center">
                          <Grid item sm={12} md={8}>
                            <Link
                              className={classes.TimeCir}
                              to={"/test-hub/" + "?type=Single Database"}
                            >
                              <StorageOutlinedIcon />{" "}
                              <Typography>DB</Typography>
                            </Link>
                          </Grid>
                          <Grid item sm={12} md={4} textAlign="right">
                            <Link to={"/singledatabase"} className="linkCus">
                              + New
                            </Link>
                          </Grid>
                        </Grid>
                        <Box className="wBox">
                          <Link to={"/test-hub/" + "?type=Single Database"}>
                            <Typography>
                              Tests{" "}
                              <b>
                                {" "}
                                {tests?.singleDatabase?.ValidatedRecords?.Tests}
                              </b>
                            </Typography>
                          </Link>
                          <Link to={"/test-hub/" + "?type=Single Database"}>
                            <Typography>
                              DQ Checks{" "}
                              <b>
                                {" "}
                                {
                                  tests?.singleDatabase?.ValidatedRecords
                                    ?.TotalValidations
                                }
                              </b>
                            </Typography>
                          </Link>
                          <Link to={"/test-hub/" + "?type=Single Database"}>
                            <Typography>
                              Records Validated{" "}
                              <b>
                                {
                                  tests?.singleDatabase?.ValidatedRecords
                                    .ValidatedRecords
                                }
                              </b>
                            </Typography>
                          </Link>
                          <Link to={"/test-hub/" + "?type=Single Database"}>
                            <Typography>
                              Data Sources{" "}
                              <b> {tests.singleDatabase?.dataSource} </b>
                            </Typography>
                          </Link>
                        </Box>

                        <Box>
                          <Grid container className="PassFail" mt="0!important">
                            <Grid item sm={6}>
                              <Box className="passed">
                                <CheckCircleRoundedIcon />
                                <Typography>
                                  {
                                    tests?.singleDatabase?.ValidatedRecords
                                      .Passed
                                  }
                                  {" Passed"}
                                </Typography>
                              </Box>
                            </Grid>
                            <Grid item sm={6}>
                              <Box className="failed">
                                <CancelRoundedIcon />
                                <Typography>
                                  {
                                    tests?.singleDatabase?.ValidatedRecords
                                      .Failed
                                  }
                                  {" Failed"}
                                </Typography>
                              </Box>
                            </Grid>
                          </Grid>
                        </Box>
                      </Box>
                    </Grid>
                    <Grid item sm={6}>
                      <Box className="DBsec">
                        <Grid container spacing={1} alignItems="center">
                          <Grid item sm={12} md={8}>
                            <Link
                              className={classes.TimeCir}
                              to={"/test-hub/" + "?type=Single File"}
                            >
                              <ArticleOutlinedIcon />{" "}
                              <Typography>File</Typography>
                            </Link>
                          </Grid>
                          <Grid item sm={12} md={4} textAlign="right">
                            <Link to={"/singlefile"} className="linkCus">
                              + New
                            </Link>
                          </Grid>
                        </Grid>
                        <Box className="wBox">
                          <Link to={"/test-hub/" + "?type=Single File"}>
                            <Typography>
                              Tests{" "}
                              <b>
                                {" "}
                                {
                                  tests?.singleFile?.ValidatedRecords?.Tests
                                }{" "}
                              </b>
                            </Typography>
                          </Link>
                          <Link to={"/test-hub/" + "?type=Single File"}>
                            <Typography>
                              DQ Checks{" "}
                              <b>
                                {" "}
                                {
                                  tests?.singleFile?.ValidatedRecords
                                    ?.TotalValidations
                                }
                              </b>
                            </Typography>
                          </Link>
                          <Link to={"/test-hub/" + "?type=Single File"}>
                            <Typography>
                              Records Validated{" "}
                              <b>
                                {" "}
                                {
                                  tests?.singleFile?.ValidatedRecords
                                    ?.ValidatedRecords
                                }
                              </b>
                            </Typography>
                          </Link>
                          <Link to={"/" + "?type=Single File"}>
                            <Typography>
                              Data Sources{" "}
                              <b> {tests?.singleFile?.dataSource}</b>
                            </Typography>
                          </Link>
                        </Box>

                        <Box>
                          <Grid container className="PassFail" mt="0!important">
                            <Grid item sm={6}>
                              <Box className="passed">
                                <CheckCircleRoundedIcon />
                                <Typography>
                                  {" "}
                                  {
                                    tests?.singleFile?.ValidatedRecords?.Passed
                                  }{" "}
                                  Passed
                                </Typography>
                              </Box>
                            </Grid>
                            <Grid item sm={6}>
                              <Box className="failed">
                                <CancelRoundedIcon />
                                <Typography>
                                  {" "}
                                  {
                                    tests?.singleFile?.ValidatedRecords?.Failed
                                  }{" "}
                                  Failed
                                </Typography>
                              </Box>
                            </Grid>
                          </Grid>
                        </Box>
                      </Box>
                    </Grid>
                  </Grid>
                </Grid>
                <Grid item sm={12} md={7}>
                  <Box className="compRight">
                    <Box>
                      <Typography color="#1162bb" mb="8px" variant="h6">
                        Comparative
                      </Typography>
                    </Box>
                    <Grid container spacing={2}>
                      <Grid item sm={4}>
                        <Box className="DBsec">
                          <Grid container spacing={1} alignItems="center">
                            <Grid item sm={12} md={8}>
                              <Link
                                className={classes.TimeCir}
                                to={"/test-hub/" + "?type=Comparison"}
                              >
                                <StorageOutlinedIcon />{" "}
                                <Typography>DB - DB</Typography>
                              </Link>
                            </Grid>
                            <Grid item sm={12} md={4} textAlign="right">
                              <Link to={"/validations"} className="linkCus">
                                + New
                              </Link>
                            </Grid>
                          </Grid>
                          <Box className="wBox">
                            <Link to={"/test-hub/" + "?type=Comparison"}>
                              <Typography>
                                Matched <b>0 </b>
                              </Typography>
                            </Link>
                            <Link to={"/test-hub/" + "?type=Comparison"}>
                              <Typography>
                                Unique in A <b>0</b>
                              </Typography>
                            </Link>
                            <Link to={"/test-hub/" + "?type=Comparison"}>
                              <Typography>
                                {" "}
                                Unique in B <b> 0 </b>
                              </Typography>
                            </Link>
                            <Link to={"/test-hub/" + "?type=Comparison"}>
                              <Typography>
                                Duplicate in A <b> 0 </b>
                              </Typography>
                            </Link>
                            <Link to={"/test-hub/" + "?type=Comparison"}>
                              <Typography>
                                Duplicate in B <b> 0 </b>
                              </Typography>
                            </Link>
                          </Box>
                        </Box>
                      </Grid>
                      <Grid item sm={4}>
                        <Box className="DBsec">
                          <Grid container spacing={1} alignItems="center">
                            <Grid item sm={12} md={8}>
                              <Link
                                className={classes.TimeCir}
                                to={"/test-hub/" + "?type=Comparison"}
                              >
                                <ArticleOutlinedIcon />{" "}
                                <Typography>File - File</Typography>
                              </Link>
                            </Grid>
                            <Grid item sm={12} md={4} textAlign="right">
                              <Link
                                to={"/validations?source1=File&source2=File"}
                                className="linkCus"
                              >
                                + New
                              </Link>
                            </Grid>
                          </Grid>
                          <Box className="wBox">
                            <Link to={"/" + "?type=Comparison"}>
                              <Typography>
                                Matched <b>0 </b>
                              </Typography>
                            </Link>
                            <Link to={"/" + "?type=Comparison"}>
                              <Typography>
                                Unique in A <b>0</b>
                              </Typography>
                            </Link>
                            <Link to={"/" + "?type=Comparison"}>
                              <Typography>
                                {" "}
                                Unique in B <b> 0 </b>
                              </Typography>
                            </Link>
                            <Link to={"/" + "?type=Comparison"}>
                              <Typography>
                                Duplicate in A <b> 0 </b>
                              </Typography>
                            </Link>
                            <Link to={"/" + "?type=Comparison"}>
                              <Typography>
                                Duplicate in B <b> 0 </b>
                              </Typography>
                            </Link>
                          </Box>
                        </Box>
                      </Grid>
                      <Grid item sm={4}>
                        <Box className="DBsec">
                          <Grid container spacing={1} alignItems="center">
                            <Grid item sm={12} md={8}>
                              <Link
                                className={classes.TimeCir}
                                to={"/" + "?type=Comparison"}
                              >
                                <ArticleOutlinedIcon />{" "}
                                <Typography>DB - File</Typography>
                              </Link>
                            </Grid>
                            <Grid item sm={12} md={4} textAlign="right">
                              <Link
                                to={
                                  "/validations?source1=Database&source2=File"
                                }
                                className="linkCus"
                              >
                                + New
                              </Link>
                            </Grid>
                          </Grid>
                          <Box className="wBox">
                            <Link to={"/" + "?type=Comparison"}>
                              <Typography>
                                Matched <b>0 </b>
                              </Typography>
                            </Link>
                            <Link to={"/" + "?type=Comparison"}>
                              <Typography>
                                Unique in A <b>0</b>
                              </Typography>
                            </Link>
                            <Link to={"/" + "?type=Comparison"}>
                              <Typography>
                                {" "}
                                Unique in B <b> 0 </b>
                              </Typography>
                            </Link>
                            <Link to={"/" + "?type=Comparison"}>
                              <Typography>
                                Duplicate in A <b> 0 </b>
                              </Typography>
                            </Link>
                            <Link to={"/" + "?type=Comparison"}>
                              <Typography>
                                Duplicate in B <b> 0 </b>
                              </Typography>
                            </Link>
                          </Box>
                        </Box>
                      </Grid>
                    </Grid>
                  </Box>
                </Grid>
              </Grid>
            </Box>
          </Box>
        </Paper>
        <Box mt="16px">
          <Grid container spacing={2}>
            <Grid item sm={12} md={12}>
              <Grid container spacing={2}>
                <Grid item md={4}>
                  <Paper className={classes.PaperCus}>
                    <Box className="DQhead">
                      <Typography variant="h6">Scheduled Test Sets</Typography>
                    </Box>
                    <Box className={classes.STresult}>
                      <Grid container alignItems="center">
                        <Grid md={7} item>
                          <Box className="rBox">
                            {tests?.scheduledTestSets &&
                              tests?.scheduledTestSets.map((item) => {
                                return (
                                  <Typography>
                                    {item.Title} -{" "}
                                    <Link to={"/"}>
                                      {" "}
                                      {moment(item.FromDate).format(
                                        "Do MMMM YYYY"
                                      )}
                                    </Link>
                                  </Typography>
                                );
                              })}
                          </Box>
                        </Grid>
                        <Grid md={5} item textAlign="center">
                          <Box sx={{ py: 1, px: 2 }}>
                            <Box className="Rsec">
                              <Link to={"/scheduled/list"}>
                                <Typography variant="h5">
                                  <AccessTimeOutlinedIcon />
                                  <b>
                                    {tests?.scheduledTestSets &&
                                      tests?.scheduledTestSets.length}
                                  </b>
                                </Typography>
                              </Link>
                            </Box>
                            <Box textAlign="right">
                              <Link to={"/scheduled/list"} className="linkCus">
                                + New
                              </Link>
                            </Box>
                          </Box>
                        </Grid>
                      </Grid>
                    </Box>
                  </Paper>
                </Grid>
                <Grid item md={8}>
                  <Paper className={classes.PaperCus}>
                    <Box className="DQhead">
                      <Typography variant="h6">Data Sources</Typography>
                    </Box>
                    <Grid container>
                      <Grid item md={6}>
                        <Paper elevation={0} className="DS">
                          <Box className={classes.STresult}>
                            <Grid container alignItems="center">
                              <Grid md={12} item textAlign="center">
                                <Box className="Rsec" mt="16px">
                                  <Link to={"/connections"}>
                                    <Typography variant="h5">
                                      <ShareOutlinedIcon /> Connections{" "}
                                      <b>
                                        {" "}
                                        {tests?.connections?.totalConnections}
                                      </b>
                                    </Typography>
                                  </Link>
                                </Box>
                              </Grid>
                              <Grid md={12} item>
                                <Box className="bBox">
                                  <Typography>
                                    SQL{" "}
                                    <Link to={"/connections?db_type=SQL"}>
                                      {tests?.connections?.sql}
                                    </Link>
                                  </Typography>
                                  <Typography>
                                    Snowflake{" "}
                                    <Link to={"/connections?db_type=snowflake"}>
                                      {tests?.connections?.snowflake}
                                    </Link>
                                  </Typography>
                                  <Typography>
                                    My SQL{" "}
                                    <Link to={"/connections?db_type=My SQL"}>
                                      {tests?.connections?.mysql}
                                    </Link>
                                  </Typography>
                                  <Typography>
                                    Oracle{" "}
                                    <Link to={"/connections?db_type=Oracle"}>
                                      {tests?.connections?.oracle}
                                    </Link>
                                  </Typography>
                                  <Typography>
                                    <Link
                                      to={"/singledatabase"}
                                      className="linkCus"
                                    >
                                      + New
                                    </Link>
                                  </Typography>
                                </Box>
                              </Grid>
                            </Grid>
                          </Box>
                        </Paper>
                      </Grid>
                      <Grid item md={6}>
                        <Paper elevation={0}>
                          <Box className={classes.STresult}>
                            <Grid container mb="16px" alignItems="center">
                              <Grid item sm={12} md={6}></Grid>
                              <Grid
                                item
                                sm={12}
                                md={6}
                                textAlign="right"
                              ></Grid>
                            </Grid>

                            <Grid container alignItems="center">
                              <Grid md={12} item textAlign="center">
                                <Box className="Rsec">
                                  <Link to={"/files"}>
                                    <Typography variant="h5">
                                      <ArticleOutlinedIcon />
                                      Files <b>{tests?.files?.totalFiles}</b>
                                    </Typography>
                                  </Link>
                                </Box>
                              </Grid>
                              <Grid md={12} item>
                                <Box className="bBox">
                                  <Typography>
                                    CSV{" "}
                                    <Link to={"/files/?type=csv"}>
                                      {" "}
                                      {tests?.files?.csv}
                                    </Link>
                                  </Typography>
                                  <Typography>
                                    XLS{" "}
                                    <Link to={"/files/?type=xls"}>
                                      {" "}
                                      {tests?.files?.xls}
                                    </Link>
                                  </Typography>
                                  <Typography>
                                    XLSX{" "}
                                    <Link to={"/files/?type=xlsx"}>
                                      {" "}
                                      {tests?.files?.xlsx}
                                    </Link>
                                  </Typography>
                                  <Typography>
                                    TXT{" "}
                                    <Link to={"/files/?type=txt"}>
                                      {" "}
                                      {tests?.files?.txt}
                                    </Link>
                                  </Typography>
                                  <Typography>
                                    <Link to={"/files"} className="linkCus">
                                      + New
                                    </Link>
                                  </Typography>
                                </Box>
                              </Grid>
                            </Grid>
                          </Box>
                        </Paper>
                      </Grid>
                    </Grid>
                  </Paper>
                </Grid>
              </Grid>
            </Grid>
            <Grid item sm={12} md={12}>
              <Paper className={classes.PaperCus} sx={{}}>
                <Box className="graphSec">
                  <Grid container mb="8px">
                    <Grid item sm={6} md={8}>
                      <Typography className={classes.title} variant="h6">
                        Tests executed in this given date range:
                      </Typography>
                    </Grid>
                    <Grid item sm={6} md={4}>
                      <Grid container alignItems="center" spacing={1}>
                        <Grid item sm={6}>
                          <LocalizationProvider dateAdapter={AdapterDateFns}>
                            <DatePicker
                              label="From Date"
                              inputFormat="dd-MM-yyyy"
                              value={FromDate}
                              maxDate={ToDate}
                              onChange={(newValue) => {
                                setFromDate(newValue);
                              }}
                              renderInput={(params) => (
                                <TextField size="small" {...params} fullWidth />
                              )}
                            />
                          </LocalizationProvider>
                        </Grid>
                        <Grid item sm={6}>
                          <LocalizationProvider dateAdapter={AdapterDateFns}>
                            <DatePicker
                              label="To Date"
                              inputFormat="dd-MM-yyy"
                              minDate={FromDate}
                              value={ToDate}
                              maxDate={new Date()}
                              onChange={(newValue) => {
                                setToDate(newValue);
                              }}
                              renderInput={(params) => (
                                <TextField size="small" {...params} fullWidth />
                              )}
                            />
                          </LocalizationProvider>
                        </Grid>
                      </Grid>
                    </Grid>
                  </Grid>
                  <Divider />
                  <Grid container alignItems="center">
                    <Grid item sm={6} md={8}>
                      <Box className="graphHead">
                        <Paper elevation={0}>
                          <Typography>
                            Tests <b>{tests?.excecutedRecently?.tests}</b>
                          </Typography>
                        </Paper>
                        <Paper elevation={0}>
                          <Typography>
                            DQ Checks{" "}
                            <b>{tests?.excecutedRecently?.validations}</b>
                          </Typography>
                        </Paper>
                      </Box>
                    </Grid>
                    <Grid item sm={6} md={4}>
                      <Grid
                        container
                        className="PassFail"
                        spacing={1}
                        alignItems="center"
                      >
                        <Grid item sm={6}>
                          <Box className="graphHead">
                            <Paper elevation={0}>
                              <Typography>
                                Records Validated{" "}
                                <b>
                                  {tests?.excecutedRecently?.passed +
                                    tests?.excecutedRecently?.failed}
                                </b>
                              </Typography>
                            </Paper>
                          </Box>
                        </Grid>
                        <Grid item sm={3}>
                          <Box className="passed">
                            <CheckCircleRoundedIcon />
                            <Typography>
                              {" "}
                              {tests?.excecutedRecently?.passed} Passed
                            </Typography>
                          </Box>
                        </Grid>
                        <Grid item sm={3}>
                          <Box className="failed">
                            <CancelRoundedIcon />
                            <Typography>
                              {" "}
                              {tests?.excecutedRecently?.failed} Failed
                            </Typography>
                          </Box>
                        </Grid>
                      </Grid>
                    </Grid>
                  </Grid>
                  <Box>
                    <Demo dataSource={tests?.graphData} />
                  </Box>
                </Box>
              </Paper>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </React.Fragment>
  );
}
