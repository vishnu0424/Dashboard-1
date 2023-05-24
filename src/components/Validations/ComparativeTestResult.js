import CancelOutlinedIcon from "@mui/icons-material/CancelOutlined";
import { TableHead } from "@mui/material";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import { blue } from "@mui/material/colors";
import Grid from "@mui/material/Grid";
import IconButton from "@mui/material/IconButton";
import Table from "@mui/material/Table";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import Typography from "@mui/material/Typography";
import { useState, } from "react";
import { tableStyles } from "../Styles";
import DuplicatesInDataSource from "../Tables/DuplicatesTable";
import ExpandableTableRow from "../Tables/ExpandableTableRow";
import MatchedComponent from "../Tables/MatchedTable";
import UniqueTableView from "../Tables/UniqueTable";
import ComparativeValidatonResultsIndividual from "./ComparativeValidatonResultsIndividual";

export default function ComparativeTestResult({
  AutoScroll,
  resultValidation,
  showResultType,
  returnVal,
}) {
  const classes = tableStyles();

  const [tableData, setTableData] = useState([]);
  const [typedata, setTypeData] = useState();
  const [validateColumnName, setValidateColumnName] = useState("");
  const [display, setDisplay] = useState(false);
  
  const validationDetailsRowComparison =
    resultValidation?.validationDetails?.comparissonValidations?.filter(
      (rowCount) => rowCount.ValidationName === "RowComparison"
    );

  const getTableData = (data, type, columm) => {
    setDisplay(true);
    setTableData([]);
    setTimeout(() => {
      setTableData(data);
    }, 100);
    setTypeData(type);
    setValidateColumnName(columm);
  };

  return (
    <Box sx={{ width: "100%" }} className={classes.tableCus}>
      <Grid container sx={{ mt: 2 }}>
        <Grid xs={12}>
          <Card>
            <Box className="innerSubHead">
              <Grid container>
                <Grid sm={4}>
                  <Typography variant="h6">Comparative Test Result</Typography>
                </Grid>
                <Grid sm={6}></Grid>
                <Grid sm={2}>
                  <IconButton
                    onClick={() => {
                      returnVal(false);
                    }}
                    size="small"
                    color="error"
                    sx={{ ml: "auto", display: "flex" }}
                    aria-label="add to shopping cart"
                  >
                    <CancelOutlinedIcon />
                  </IconButton>
                </Grid>
              </Grid>
            </Box>
            <Box className="compHead1">
              <Grid container>
                <Grid sm={showResultType === "result" ? 4 : 6}>
                  <Typography>
                    <b>Test Name:</b>{" "}
                    {resultValidation &&
                      resultValidation.validationDetails.TestName}{" "}
                  </Typography>
                </Grid>
                <Grid sm={showResultType === "result" ? 4 : 6}>
                  <Typography>
                    <b>Test Type:</b>{" "}
                    {resultValidation &&
                      resultValidation.validationDetails.TestType}
                  </Typography>
                </Grid>
                {showResultType === "result" && (
                  <Grid sm={4}>
                    <Typography>
                      <b>Number of Executions:</b>{" "}
                      {resultValidation?.validationResult.length}
                    </Typography>
                  </Grid>
                )}
              </Grid>
            </Box>

            {resultValidation?.validationResult.map((item) => {
              let RowComparisonResults = item?.Validations.filter(
                (item) => item.ValidationName === "RowComparison"
              );
              return (
                <Box>
                  <Grid sm={12}>
                    <Box>
                      <TableContainer>
                        <Table
                          className={classes.table}
                          aria-label="simple table"
                        >
                          <TableHead>
                            {
                              <ExpandableTableRow
                                AutoScroll={AutoScroll}
                                showData={<span>View Results</span>}
                                expandComponent={
                                  <ComparativeValidatonResultsIndividual
                                    resultValidation={resultValidation}
                                    RowComparisonResults={RowComparisonResults}
                                    validationDetailsRowComparison={
                                      validationDetailsRowComparison
                                    }
                                    getTableData={getTableData}
                                  />
                                }
                              >
                                <TableCell align="center">
                                  Executed By : {item.ExecutedBy}
                                </TableCell>
                                <TableCell align="center">
                                  DQ Rule Start Time : {item?.DateTime}
                                </TableCell>
                                <TableCell align="center">
                                  No. of DQ Checks :{item?.Validations.length}
                                </TableCell>
                              </ExpandableTableRow>
                            }
                          </TableHead>
                        </Table>
                      </TableContainer>
                    </Box>
                  </Grid>
                </Box>
              );
            })}
            {display && (
              <>
                <Box sx={{ p: "2px 16px", backgroundColor: blue[300] }}>
                  <Grid container>
                    <Grid sm={4}>
                      <Typography variant="h6">{typedata?.name}</Typography>
                    </Grid>
                    <Grid sm={6}></Grid>
                    <Grid sm={2}>
                      <IconButton
                        onClick={() => {
                          setDisplay(false);
                        }}
                        size="small"
                        color="error"
                        sx={{ ml: "auto", display: "flex" }}
                        aria-label="add to shopping cart"
                      >
                        <CancelOutlinedIcon />
                      </IconButton>
                    </Grid>
                  </Grid>
                </Box>

                <Table sx={{ minWidth: 750 }} aria-labelledby="tableTitle">
                  {tableData.length !== 0 ? (
                    <>
                      {typedata.type === "OnlyInFirstDatasource" && (
                        <UniqueTableView
                          highLightColumn={[validateColumnName]}
                          bodyData={tableData}
                        />
                      )}
                      {typedata.type === "OnlyInSecondDatasource" && (
                        <UniqueTableView
                          highLightColumn={[validateColumnName]}
                          bodyData={tableData}
                        />
                      )}
                      {typedata.type === "DuplicatesInFirstDatasource" && (
                        <DuplicatesInDataSource
                          highLightColumn={[validateColumnName]}
                          headCells={tableData}
                        />
                      )}
                      {typedata.type === "DuplicatesInSecondDatasource" && (
                        <DuplicatesInDataSource
                          highLightColumn={[validateColumnName]}
                          headCells={tableData}
                        />
                      )}
                      {typedata.type === "Matched" && (
                        <MatchedComponent
                          headCells={tableData}
                          highLightColumn={validateColumnName}
                        />
                      )}
                    </>
                  ) : (
                    <>No Records Found</>
                  )}
                </Table>
              </>
            )}
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
}
