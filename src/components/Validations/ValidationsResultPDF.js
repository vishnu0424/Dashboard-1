import { TableHead, TableRow } from "@mui/material";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import { blue, green, red } from "@mui/material/colors";
import Grid from "@mui/material/Grid";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import Typography from "@mui/material/Typography";
import JsPDF from "jspdf";
import { useRef, useState } from "react";

export default function ValidationsResultPDF({
  resultValidation,
  close,
  count,
}) {
  const [showLoader, setLoader] = useState(false);
  const inputRef = useRef(null);
  const printDocument = () => {
    setLoader(true);
    var doc = new JsPDF("p", "mm", [1250, 1210]);
    doc.html(inputRef.current, {
      callback: function (pdf) {
        let totalPages = pdf.internal.pages.length - 1;
        for (let i = 1; i <= totalPages; i++) {
          pdf.setPage(i);
          pdf.text(
            "Page " + i + " of " + totalPages,
            pdf.internal.pageSize.getWidth() - 100,
            pdf.internal.pageSize.getHeight() - 30
          );
        }
        pdf.save(`delivery.pdf`);
        setLoader(false);
      },
      margin: [50, 50, 55, 50],
      autoPaging: "text",
    });
  };

  return (
    <Box sx={{ width: "100%" }} className="PDF">
      <Grid
        container
        sx={{ m: 1 }}
        rowSpacing={1}
        columnSpacing={{ xs: 1, sm: 2, md: 3 }}
      >
        <Grid item xs={4} textAlign="left">
          <Button
            onClick={() => {
              close(true);
            }}
            variant="contained"
            color="error"
            size="medium"
          >
            Cancel
          </Button>
        </Grid>
        <Grid item xs={4} textAlign="center">
          {showLoader && <Typography>Loading...!</Typography>}
        </Grid>
        <Grid item xs={4} textAlign="right">
          <Button
            onClick={printDocument}
            variant="outlined"
            color="primary"
            size="medium"
          >
            Download As PDF
          </Button>
        </Grid>
      </Grid>
      <Grid container sx={{ mt: 2 }} id="divToPrint" ref={inputRef}>
        <Grid xs={12}>
          <Card>
            <Box sx={{ p: "2px 16px", backgroundColor: blue[300] }}>
              <Grid container>
                <Grid sm={4}>
                  <Typography variant="h6">
                    Data Quality Rule Execution Result
                  </Typography>
                </Grid>
                <Grid sm={8}></Grid>
              </Grid>
            </Box>
            <Box
              sx={{
                p: "2px 16px",
                backgroundColor: blue[200],
                textAlign: "center",
              }}
            >
              <Grid container>
                <Grid sm={4}>
                  <Typography>
                    <b>DQ Rule Name:</b>{" "}
                    {resultValidation &&
                      resultValidation.validationDetails &&
                      resultValidation.validationDetails.TestName}
                  </Typography>
                </Grid>
                <Grid sm={4}>
                  <Typography>
                    <b>DQ Source Type:</b>{" "}
                    {resultValidation &&
                      resultValidation.validationDetails &&
                      resultValidation.validationDetails.TestType}
                  </Typography>
                </Grid>
                <Grid sm={4}>
                  <Typography>
                    <b>Number of Executions:</b>{" "}
                    {resultValidation &&
                      resultValidation.validationResult &&
                      resultValidation.validationResult.length}
                  </Typography>
                </Grid>
              </Grid>
            </Box>

            <Box>
              <Grid
                sm={12}
                sx={{
                  "& .MuiFormControl-root": {
                    width: "300px",
                  },
                }}
              >
                <Box
                  sx={{
                    display: "grid",
                    "& .MuiTableContainer-root": {
                      display: "table-column",
                    },
                  }}
                >
                  <TableContainer>
                    {resultValidation &&
                      resultValidation.validationResult
                        .slice(0, count)
                        .map((itemResult, i) => {
                          let itemVal = itemResult;
                          return (
                            <Table
                              aria-label="simple table"
                              sx={{ mb: 1 }}
                              key={i}
                            >
                              <TableHead
                                sx={{
                                  "& th.MuiTableCell-root": {
                                    backgroundColor: "#1976d2",
                                    color: "#fff",
                                  },
                                }}
                              >
                                <TableRow>
                                  <TableCell width="" align="center">
                                    Executed By :{" "}
                                    {itemResult && itemResult.ExecutedBy}
                                  </TableCell>
                                  <TableCell width="" align="center">
                                    DQ Rule Start Time :{" "}
                                    {itemResult && itemResult.DateTime}
                                  </TableCell>
                                  <TableCell width="" align="center">
                                    DQ Rule Finish Time :{" "}
                                    {itemResult && itemResult.DateTime}
                                  </TableCell>
                                  <TableCell width="" align="center">
                                    No. of DQ Checks :{" "}
                                    {itemVal &&
                                      itemVal.Validations &&
                                      itemVal.Validations.length}
                                  </TableCell>
                                </TableRow>
                              </TableHead>
                              <TableBody>
                                <TableRow>
                                  <TableCell
                                    colSpan="4"
                                    sx={{
                                      py: "8px!important",
                                      "& .MuiCard-root": {
                                        mb: 1,
                                      },
                                    }}
                                  >
                                    {itemVal.Validations.map((item, i) => {
                                      var Result = [];
                                      if (
                                        item.Result.FailedRecords.length > 0
                                      ) {
                                        Result = Object.keys(
                                          item.Result.FailedRecords[0]
                                        );
                                      }
                                      return (
                                        <Box>
                                          <Box
                                            sx={{
                                              backgroundColor: "#bbdefb",
                                              textAlign: "center",
                                            }}
                                          >
                                            <Grid container alignItems="center">
                                              <Grid sm={3}>
                                                <Typography>
                                                  <b>Table :</b>{" "}
                                                  {item.TableName}
                                                </Typography>
                                              </Grid>
                                              <Grid sm={3}>
                                                <Typography>
                                                  <b>Column:</b>{" "}
                                                  {item.ColumnName}{" "}
                                                </Typography>
                                              </Grid>
                                              <Grid sm={3}>
                                                <Typography>
                                                  <b>DQ Check:</b>{" "}
                                                  {item.ValidationDisplayName}{" "}
                                                  {item.ValidationProperties &&
                                                    item.ValidationProperties
                                                      .length > 0 &&
                                                    "--"}{" "}
                                                  {item.ValidationProperties &&
                                                    item.ValidationProperties
                                                      .length > 0 &&
                                                    item.ValidationProperties[0]
                                                      .Key}{" "}
                                                  {item.ValidationProperties &&
                                                    item.ValidationProperties
                                                      .length > 0 &&
                                                    "--"}{" "}
                                                  {item.ValidationProperties &&
                                                    item.ValidationProperties
                                                      .length > 0 &&
                                                    item.ValidationProperties[0]
                                                      .Value}
                                                  {item.ValidationProperties &&
                                                    item.ValidationProperties
                                                      .length > 1 &&
                                                    " -- " +
                                                      item
                                                        .ValidationProperties[1]
                                                        .Key}{" "}
                                                  {item.ValidationProperties &&
                                                    item.ValidationProperties
                                                      .length > 1 &&
                                                    " -- "}
                                                  {item.ValidationProperties &&
                                                    item.ValidationProperties
                                                      .length > 1 &&
                                                    item.ValidationProperties[1]
                                                      .Value}{" "}
                                                </Typography>
                                              </Grid>
                                              <Grid sm={3}>
                                                <Typography>
                                                  <b>Validated Records:</b>{" "}
                                                  {item.Result?.TotalPassed +
                                                    item.Result?.TotalFailed}
                                                </Typography>
                                              </Grid>
                                            </Grid>
                                          </Box>
                                          <Box sx={{ p: 1 }}>
                                            <Box>
                                              <Box
                                                sx={{
                                                  p: "2px 16px",
                                                  backgroundColor: red[50],
                                                  textAlign: "center",
                                                }}
                                              >
                                                <Grid container>
                                                  <Grid sm={12}>
                                                    <Typography
                                                      variant="h6"
                                                      color="error"
                                                    >
                                                      Failed Result{" "}
                                                    </Typography>
                                                  </Grid>
                                                </Grid>
                                              </Box>
                                              <Card>
                                                <Box>
                                                  <Grid
                                                    sm={12}
                                                    sx={{
                                                      "& .MuiBox-root": {
                                                        display: "grid",
                                                      },
                                                      "& .MuiTableContainer-root":
                                                        {
                                                          display:
                                                            "table-column",
                                                        },
                                                      "& .MuiFormControl-root":
                                                        {
                                                          width: "300px",
                                                        },
                                                    }}
                                                  >
                                                    <Box>
                                                      <TableContainer>
                                                        <Table>
                                                          <TableHead>
                                                            <TableRow>
                                                              {Result &&
                                                                Result.map(
                                                                  (key, k) => {
                                                                    return (
                                                                      <TableCell>
                                                                        {key}
                                                                      </TableCell>
                                                                    );
                                                                  }
                                                                )}
                                                            </TableRow>
                                                          </TableHead>
                                                          <TableBody>
                                                            {item.Result &&
                                                              item.Result.FailedRecords.map(
                                                                (row, i) => {
                                                                  return (
                                                                    <TableRow
                                                                      key={i}
                                                                    >
                                                                      {Result &&
                                                                        Result.map(
                                                                          (
                                                                            key,
                                                                            k
                                                                          ) => {
                                                                            return (
                                                                              <TableCell
                                                                                key={
                                                                                  k
                                                                                }
                                                                                sx={
                                                                                  item.ColumnName ===
                                                                                    key && {
                                                                                    color:
                                                                                      "red",
                                                                                  }
                                                                                }
                                                                              >
                                                                                {
                                                                                  row[
                                                                                    key
                                                                                  ]
                                                                                }
                                                                              </TableCell>
                                                                            );
                                                                          }
                                                                        )}
                                                                    </TableRow>
                                                                  );
                                                                }
                                                              )}
                                                          </TableBody>
                                                        </Table>
                                                      </TableContainer>
                                                    </Box>
                                                  </Grid>
                                                </Box>

                                                {item.Result &&
                                                  item.Result.FailedRecords
                                                    .length === 0 && (
                                                    <Box>
                                                      <Grid
                                                        sm={12}
                                                        sx={{
                                                          "& .MuiBox-root": {
                                                            display: "grid",
                                                          },
                                                          "& .MuiTableContainer-root":
                                                            {
                                                              display:
                                                                "table-column",
                                                            },
                                                          "& .MuiFormControl-root":
                                                            {
                                                              width: "300px",
                                                            },
                                                        }}
                                                      >
                                                        <Box>
                                                          <TableContainer>
                                                            <Table>
                                                              <TableBody>
                                                                <TableRow>
                                                                  <TableCell align="center">
                                                                    <Typography
                                                                      sx={{
                                                                        p: 0.5,
                                                                      }}
                                                                    >
                                                                      Failed
                                                                      Total
                                                                      Records:{" "}
                                                                      <b>
                                                                        {
                                                                          item
                                                                            .Result
                                                                            ?.TotalFailed
                                                                        }
                                                                      </b>
                                                                    </Typography>
                                                                  </TableCell>
                                                                </TableRow>
                                                              </TableBody>
                                                            </Table>
                                                          </TableContainer>
                                                        </Box>
                                                      </Grid>
                                                    </Box>
                                                  )}
                                              </Card>
                                            </Box>
                                            <Box>
                                              <Box
                                                sx={{
                                                  p: "2px 16px",
                                                  backgroundColor: green[100],
                                                  textAlign: "center",
                                                }}
                                              >
                                                <Grid container>
                                                  <Grid sm={12}>
                                                    <Typography
                                                      variant="h6"
                                                      color="success"
                                                    >
                                                      Passed Result{" "}
                                                    </Typography>
                                                  </Grid>
                                                </Grid>
                                              </Box>
                                              <Card>
                                                <Box>
                                                  <Grid
                                                    sm={12}
                                                    sx={{
                                                      "& .MuiBox-root": {
                                                        display: "grid",
                                                      },
                                                      "& .MuiTableContainer-root":
                                                        {
                                                          display:
                                                            "table-column",
                                                        },
                                                      "& .MuiFormControl-root":
                                                        {
                                                          width: "300px",
                                                        },
                                                    }}
                                                  >
                                                    <Box>
                                                      <TableContainer>
                                                        <Table>
                                                          <TableBody>
                                                            <TableRow>
                                                              <TableCell align="center">
                                                                <Typography
                                                                  sx={{
                                                                    p: 0.5,
                                                                  }}
                                                                >
                                                                  Passed Total
                                                                  Records:{" "}
                                                                  <b>
                                                                    {
                                                                      item
                                                                        .Result
                                                                        ?.TotalPassed
                                                                    }
                                                                  </b>
                                                                </Typography>
                                                              </TableCell>
                                                            </TableRow>
                                                          </TableBody>
                                                        </Table>
                                                      </TableContainer>
                                                    </Box>
                                                  </Grid>
                                                </Box>
                                              </Card>
                                            </Box>
                                          </Box>
                                        </Box>
                                      );
                                    })}
                                  </TableCell>
                                </TableRow>
                              </TableBody>
                            </Table>
                          );
                        })}
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
