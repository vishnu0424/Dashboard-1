import {
  Box,
  Card,
  Grid,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import * as React from "react";
import { tableStyles } from "../Styles";
import ExpandableTableRow from "../Tables/ExpandableTableRow";
import FailedResult from "./FailedResult";
import PopUp from "./PopUP";

export default function DatabaseFileValidationList({
  AutoScroll,
  resultValidation,
  showResultType
}) {
  const classes = tableStyles();
  
  return (
    <Box className={classes.tableCus}>
      <Grid container sx={{ mt: 2 }}>
        <Grid item xs={12}>
          <Card>
            <Box className="innerSubHead">
              <Grid container alignItems="center">
                <Grid sm={8}>
                  <Typography variant="h6">
                    {showResultType === "execution"
                      ? "Execution Results"
                      : "Data Quality Rule Execution Result"}
                  </Typography>
                </Grid>
                <Grid sm={4} className="innerSubRight">
                  <PopUp
                    name={"Download Result"}
                    resultValidation={resultValidation}
                  />
                </Grid>
              </Grid>
            </Box>
            <Box
              sx={{
                p: "2px 16px",
                backgroundColor: "#1976d2",
                textAlign: "center",
                color: "#fff",
              }}
            >
              <Grid container>
                <Grid sm={showResultType === "result" ? 4 : 6}>
                  <Typography>
                    <b>DQ Rule Name:</b>{" "}
                    {resultValidation &&
                      resultValidation.validationDetails &&
                      resultValidation.validationDetails.TestName}
                  </Typography>
                </Grid>
                <Grid sm={showResultType === "result" ? 4 : 6}>
                  <Typography>
                    <b>DQ Source Type:</b>{" "}
                    {resultValidation &&
                      resultValidation.validationDetails &&
                      resultValidation.validationDetails.TestType}
                  </Typography>
                </Grid>
                {showResultType === "result" && (
                  <Grid sm={4}>
                    <Typography>
                      <b>Number of Executions:</b>{" "}
                      {resultValidation &&
                        resultValidation.validationResult &&
                        resultValidation.validationResult.length}
                    </Typography>
                  </Grid>
                )}
              </Grid>
            </Box>{" "}
            <Box>
              <Grid
                sm={12}
                sx={{
                  "& .MuiFormControl-root": {
                    width: "300px",
                  },
                }}
              >
                <Box>
                  <TableContainer>
                    <Table className={classes.table} aria-label="simple table">
                      <TableHead>
                        <TableRow>
                          <TableCell>Executed By</TableCell>
                          <TableCell>DQ Rule Start Time</TableCell>
                          <TableCell>DQ Rule Finish Time</TableCell>
                          <TableCell>No. of DQ Checks</TableCell>
                          <TableCell>Passed | Failed</TableCell>
                        </TableRow>
                      </TableHead>{" "}
                      <TableBody>
                        {resultValidation &&
                          resultValidation.validationResult &&
                          resultValidation.validationResult.map(
                            (itemResult, i) => {
                              let itemVal = itemResult;
                              return (
                                <React.Fragment key={i}>
                                  {
                                    <ExpandableTableRow
                                      AutoScroll={AutoScroll}
                                      showData={<span>View Results</span>}
                                      expandComponent={
                                        <TableCell
                                          sx={{
                                            padding: "0 20px",
                                            width: "10%",
                                          }}
                                          colSpan="6"
                                        >
                                          {" "}
                                          <FailedResult
                                            AutoScroll={AutoScroll}
                                            validations={
                                              itemVal && itemVal.Validations
                                            }
                                          />
                                        </TableCell>
                                      }
                                    >
                                      <TableCell sx={{ width: "20%" }}>
                                        {itemResult && itemResult.ExecutedBy}
                                      </TableCell>
                                      <TableCell sx={{ width: "20%" }}>
                                        {itemResult && itemResult.DateTime}
                                      </TableCell>
                                      <TableCell sx={{ width: "20%" }}>
                                        {itemResult && itemResult.DateTime}
                                      </TableCell>
                                      <TableCell sx={{ width: "20%" }}>
                                        {itemResult?.Validations?.length}
                                      </TableCell>
                                    </ExpandableTableRow>
                                  }
                                </React.Fragment>
                              );
                            }
                          )}
                      </TableBody>
                    </Table>
                  </TableContainer>
                </Box>
              </Grid>
            </Box>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
}
