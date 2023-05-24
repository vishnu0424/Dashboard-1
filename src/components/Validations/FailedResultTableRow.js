import {
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
} from "@mui/material";
import { CustomHeaderAgGrid } from "../AgGrid/CustomAgGrid";
import DataCleaning from "../DataCleaning";
import { tableStyles } from "../Styles";
import ExpandableTableRow from "../Tables/ExpandableTableRow";

export default function FailedTabResult({ validatemodal, AutoScroll, item }) {
  const classes = tableStyles();

  const Results = item?.ApiMultiResult ? item?.ApiMultiResult : [item?.Result];

  return (
    <>
      {Results.map((Result, indx) => {
        return (
          <Box key={indx}>
            <TableContainer>
              <Table className={classes.table} aria-label="simple table">
                <TableBody sx={{ backgroundColor: "#e4f5fc" }}>
                  <ExpandableTableRow
                    AutoScroll={AutoScroll}
                    showData={
                      <span style={{ color: "red" }}>
                        Failed [{Result?.TotalFailed}]
                      </span>
                    }
                    expandComponent={
                      <TableCell
                        className="expandableRow"
                        sx={{ width: "12%" }}
                        colSpan="6"
                      >
                        <Box>
                          {!validatemodal && (
                            <DataCleaning ValidationData={item} />
                          )}
                          {Result?.FailedRecordsWithPath ? (
                            <CustomHeaderAgGrid
                              data={Result?.FailedRecordsWithPath}
                              errorColumn={{
                                columns: "FailedValue",
                                color: "red",
                              }}
                            />
                          ) : (
                            <CustomHeaderAgGrid
                              data={Result?.FailedRecords}
                              errorColumn={{
                                columns: item.ColumnName,
                                color: "red",
                              }}
                            />
                          )}
                        </Box>
                      </TableCell>
                    }
                  >
                    <TableCell sx={{ width: "20%" }}>
                      <b>Table:</b> {item.TableName}
                    </TableCell>
                    <TableCell sx={{ width: "20%" }}>
                      <b>Column:</b> {item.ColumnName}
                    </TableCell>
                    <TableCell sx={{ width: "20%" }}>
                      <b>DQ Check:</b>
                      {item.ValidationProperties &&
                        item.ValidationProperties.length > 0 &&
                        item.ValidationProperties[0].Key}{" "}
                      {item.ValidationProperties &&
                        item.ValidationProperties.length > 0 &&
                        "--"}{" "}
                      {item.ValidationProperties &&
                        item.ValidationProperties.length > 0 &&
                        item.ValidationProperties[0].Value}
                      {item.ValidationProperties &&
                        item.ValidationProperties.length > 1 &&
                        " -- " + item.ValidationProperties[0].Key}{" "}
                      {item.ValidationProperties &&
                        item.ValidationProperties.length > 1 &&
                        " -- "}
                      {item.ValidationProperties &&
                        item.ValidationProperties.length > 1 &&
                        item.ValidationProperties[0].Value}
                    </TableCell>
                    <TableCell sx={{ width: "16%" }}>
                      <b>Validated Records:</b>{" "}
                      {Result?.TotalPassed + Result?.TotalFailed}
                    </TableCell>
                    <TableCell sx={{ width: "12%", color: "green" }}>
                      <span>Passed [{Result?.TotalPassed}] </span>
                    </TableCell>
                  </ExpandableTableRow>
                </TableBody>
              </Table>
            </TableContainer>
          </Box>
        );
      })}
    </>
  );
}
