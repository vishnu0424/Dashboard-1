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
import moment from "moment";
import * as React from "react";

import { tableStyles } from "../Styles";
import ExpandableTableRow from "../Tables/ExpandableTableRow";
import APIExecuteResult from "./executionAPIslist";

function CreatedDate(props) {
  return <>{moment(props.data ? props.data : new Date()).format("LLL")}</>;
}
export default function APIExecutionResults({
  AutoScroll,
  result,
  showResultType,
}) {
  const classes = tableStyles();
  return (
    <Box className={classes.tableCus}>
      <Grid container sx={{ mt: 2 }}>
        <Grid xs={12}>
          <Card>
            <Box className="innerSubHead">
              <Grid container alignItems="center">
                <Grid sm={8}>
                  <Typography variant="h6">
                    {showResultType === "execution"
                      ? "Execution Results"
                      : "Collection Result"}
                  </Typography>
                </Grid>
                <Grid sm={4} className="innerSubRight"></Grid>
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
                <Grid sm>
                  <Typography>
                    <b>Name: </b>
                    {Array.isArray(result) && result[0]?.CollectionName}
                  </Typography>
                </Grid>

                {showResultType === "result" && (
                  <Grid sm={4}>
                    <Typography>
                      <b>Number of Executions:</b>
                      {result.length}
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
                          <TableCell>S. No</TableCell>
                          <TableCell>Executed Date</TableCell>
                          <TableCell>Action</TableCell>
                        </TableRow>
                      </TableHead>{" "}
                      <TableBody>
                        {result &&
                          result.map((itemResult, i) => {
                            let itemVal = itemResult;
                            return (
                              <>
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
                                        <APIExecuteResult
                                          AutoScroll={AutoScroll}
                                          items={itemVal && itemVal.ApiRequests}
                                        />
                                      </TableCell>
                                    }
                                  >
                                    <TableCell>{i + 1}</TableCell>
                                    <TableCell>
                                      <CreatedDate data={itemVal?.createdAt} />
                                    </TableCell>
                                  </ExpandableTableRow>
                                }
                              </>
                            );
                          })}
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
