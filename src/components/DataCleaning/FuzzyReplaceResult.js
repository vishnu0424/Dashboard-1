import {
  Box,
  Grid,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  Typography,
} from "@mui/material";
import { useRef, useState } from "react";
import LockVisibleCustomAgGrid from "../AgGrid/LockVisibleCustomAgGrid";
import { tableStyles } from "../Styles";
import ExpandableTableRow from "../Tables/ExpandableTableRow";

export default function FuzzyReplaceResult({ Result }) {
  const [rows] = useState(Result?.dataCleaning?.columns);
  const [connectiondetails] = useState(
    Result?.dataCleaning?.connectionDeatails
  );

  const gridRef = useRef();

  const classes = tableStyles();

  return (
    <Box sx={{ maxHeight: "70vh", overflow: "auto", pb: 1, width: "100%" }}>
      <Grid container sx={{ my: 0 }}>
        <Grid xs={12}>
          {rows &&
            rows.map((item, indx) => {
              return (
                <Box className={classes.tableCus} key={indx}>
                  <Grid container sx={{ mt: 1 }}>
                    <Grid xs={12}>
                      <Box>
                        <Grid
                          sm={12}
                          sx={{
                            "& .MuiFormControl-root": {
                              width: "300px",
                            },
                          }}
                        >
                          <TableContainer>
                            <Table
                              className={classes.table}
                              aria-label="simple table"
                            >
                              <TableBody sx={{ backgroundColor: "#e4f5fc" }}>
                                <ExpandableTableRow
                                  showData={
                                    <>
                                      <span style={{ color: "Green" }}>
                                        Cleaned Records:{" "}
                                        {item?.cleanedResponse.length}
                                      </span>
                                    </>
                                  }
                                  expandComponent={
                                    <TableCell
                                      className="expandableRow"
                                      sx={{ width: "20%" }}
                                      colSpan="6"
                                    >
                                      {item?.cleanedResponse?.length === 0 ? (
                                        <center>
                                          <Typography component={"h6"}>
                                            No Rows Modified by Cleaning
                                            Algorithm
                                          </Typography>
                                        </center>
                                      ) : (
                                        <Box>
                                          <LockVisibleCustomAgGrid
                                            gridRef={gridRef}
                                            data={item?.cleanedResponse}
                                            highLightColumn={{
                                              columns: Object.keys(
                                                item?.cleanedResponse[0]
                                              ).filter((col) =>
                                                col.includes("New Value")
                                              ),
                                              color: "Green",
                                            }}
                                            errorColumn={{
                                              columns: [item?.columnName],
                                              color: "#ef6c00",
                                            }}
                                          />
                                        </Box>
                                      )}
                                    </TableCell>
                                  }
                                >
                                  <TableCell
                                    sx={{
                                      width: item?.masterDatasetName
                                        ? "20%"
                                        : "35%",
                                    }}
                                  >
                                    {connectiondetails.ext ? (
                                      <b>File Name:</b>
                                    ) : (
                                      <b>Table:</b>
                                    )}{" "}
                                    {connectiondetails.ext
                                      ? connectiondetails?.fileName
                                      : item?.TableName}
                                  </TableCell>
                                  <TableCell
                                    sx={{
                                      width: item?.masterDatasetName
                                        ? "20%"
                                        : "35%",
                                    }}
                                  >
                                    <b>Column:</b> {item.columnName}
                                  </TableCell>
                                  {item?.masterDatasetName && (
                                    <TableCell sx={{ width: "20%" }}>
                                      <b>Master Dataset:</b>{" "}
                                      {item.masterDatasetName}
                                    </TableCell>
                                  )}
                                  {item?.masterDatasetName && (
                                    <TableCell sx={{ width: "20%" }}>
                                      <b>Min Similarity Percent:</b>{" "}
                                      {item?.minSimilarityPercentage}%
                                    </TableCell>
                                  )}
                                </ExpandableTableRow>
                              </TableBody>
                            </Table>
                          </TableContainer>
                        </Grid>
                      </Box>
                    </Grid>
                  </Grid>
                </Box>
              );
            })}
        </Grid>
      </Grid>
    </Box>
  );
}
