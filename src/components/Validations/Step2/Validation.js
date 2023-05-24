import DeleteIcon from "@mui/icons-material/Delete";
import {
  Box,
  Card,
  Checkbox,
  Chip,
  Grid,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Tooltip,
  Typography,
} from "@mui/material";
import * as React from "react";

export default function CompareFinalValidation({
  finalValidation,
  setfinalValidation,
  finalSelected,
  setfinalSelected,
  source1,
  source2,
  source1Sql,
  type,
  checkbox = true,
}) {
  const deleteSelectedFinal = () => {
    let res = [...finalSelected];
    let validation = [...finalValidation];

    res.forEach((index) => {
      delete validation[index];
    });
    var final_validations = validation.filter(function (element) {
      return element !== undefined;
    });
    setfinalValidation(final_validations);
    setfinalSelected([]);
  };

  const handleFinalSelectAll = (event) => {
    if (event.target.checked) {
      const newSelecteds = [...finalValidation].map((obj, index) => {
        return index;
      });
      setfinalSelected(newSelecteds);
      return;
    }
    setfinalSelected([]);
  };

  const handleFinalCheckbox = (event, name) => {
    let selected = [...finalSelected];
    const selectedIndex = selected.indexOf(name);
    let newSelected = [];
    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, name);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1)
      );
    }
    setfinalSelected(newSelected);
  };

  const isFinalSelected = (name) => finalSelected.indexOf(name) !== -1;

  return (
    <React.Fragment>
      {finalValidation.length > 0 && (
        <Grid container sx={{ mt: 2 }}>
          <Grid xs={12}>
            <Card>
              <Box className="innerSubHead">
                <Grid container alignItems="center">
                  <Grid sm={6}>
                    <Typography variant="h6">Data Quality Checks:</Typography>
                  </Grid>

                  <Grid sm={6} className="innerSubRight">
                    <Box className="createBtn">
                      {finalSelected.length > 0 ? (
                        <Typography
                          color="inherit"
                          variant="subtitle1"
                          component="div"
                        >
                          {finalSelected.length} selected
                          <Tooltip title="Delete">
                            <IconButton
                              size="small"
                              onClick={deleteSelectedFinal}
                            >
                              <DeleteIcon />
                            </IconButton>
                          </Tooltip>
                        </Typography>
                      ) : (
                        ""
                      )}
                    </Box>
                  </Grid>
                </Grid>
              </Box>
              <Box
                sx={{
                  p: 2,
                  pt: 1,
                }}
              >
                <Grid
                  sm={12}
                  sx={{
                    mb: 0.5,
                    "& .MuiFormControl-root": {
                      width: "300px",
                    },
                  }}
                >
                  <Box>
                    <TableContainer
                      sx={{
                        "& .MuiChip-root": {
                          height: "auto",
                          fontSize: "10px",
                          mx: "1px",
                        },
                        "& tr > td": {
                          p: "4px 4px !important",
                          "& .css-wjsjww-MuiChip-label": {
                            whiteSpace: "normal",
                          },
                          "& table > thead > tr > th.MuiTableCell-root": {
                            fontSize: "11px",
                            padding: "4px 4px",
                            color: "rgba(0, 0, 0, 0.87)",
                            "& p": {
                              fontSize: "11px",
                            },
                          },
                        },
                        "& th.MuiTableCell-root:nth-of-type(1)": {
                          width: "5%",
                        },
                        "& th.MuiTableCell-root:nth-of-type(2)": {
                          width: "15%",
                        },
                        "& th.MuiTableCell-root:nth-of-type(3)": {
                          width: "40%",
                        },
                        "& .MuiTableCell-root": {
                          "& .MuiTableCell-root:nth-of-type(1)": {
                            width: "20%",
                          },
                          "& .MuiTableCell-root:nth-of-type(2)": {
                            width: "40%",
                          },
                        },
                      }}
                    >
                      {!type && (
                        <Table sx={{ minWidth: 650 }} aria-label="simple table">
                          <TableHead>
                            <TableRow>
                              {checkbox && (
                                <TableCell>
                                  <Checkbox
                                    size="small"
                                    onClick={(e) => {
                                      handleFinalSelectAll(e);
                                    }}
                                    checked={
                                      finalSelected.length > 0 &&
                                      finalSelected.length ===
                                        finalValidation.length
                                    }
                                  />
                                </TableCell>
                              )}
                              <TableCell sx={{ width: "17% !important" }}>
                                Validations
                              </TableCell>
                              <TableCell sx={{ width: "39% !important" }}>
                                First Data Source
                              </TableCell>
                              <TableCell>Second Data Source</TableCell>
                            </TableRow>
                          </TableHead>
                          <TableBody>
                            {source1Sql === "No" && (
                              <TableRow>
                                {checkbox && (
                                  <TableCell colSpan={2}></TableCell>
                                )}
                                {!checkbox && (
                                  <TableCell colSpan={1}></TableCell>
                                )}
                                <TableCell>
                                  <Table>
                                    <TableHead>
                                      <TableRow>
                                        <TableCell
                                          sx={{ width: "35%!important" }}
                                          rowSpan={2}
                                        >
                                          {source1?.connectionName ? (
                                            <>Table</>
                                          ) : (
                                            <>File</>
                                          )}
                                        </TableCell>
                                        <TableCell
                                          sx={{ width: "35%!important" }}
                                        >
                                          <Typography>
                                            <b>Column:</b>
                                          </Typography>
                                        </TableCell>
                                        <TableCell>
                                          <Typography>
                                            <b>Is Key Column?</b>
                                          </Typography>
                                        </TableCell>
                                      </TableRow>
                                    </TableHead>
                                  </Table>
                                </TableCell>
                                <TableCell>
                                  <Table>
                                    <TableHead>
                                      <TableRow>
                                        <TableCell
                                          sx={{ width: "35%!important" }}
                                          rowSpan={2}
                                        >
                                          {source2?.connectionName ? (
                                            <>Table</>
                                          ) : (
                                            <>File</>
                                          )}
                                        </TableCell>
                                        <TableCell
                                          sx={{ width: "35%!important" }}
                                        >
                                          <Typography>
                                            <b>Column:</b>
                                          </Typography>
                                        </TableCell>
                                        <TableCell>
                                          <Typography>
                                            <b>Is Key Column?</b>
                                          </Typography>
                                        </TableCell>
                                      </TableRow>
                                    </TableHead>
                                  </Table>
                                </TableCell>
                              </TableRow>
                            )}
                            {source1Sql === "No" &&
                              finalValidation.map((obj, index) => {
                                const isItemSelected = isFinalSelected(index);
                                return (
                                  <>
                                    <TableRow>
                                      {checkbox && (
                                        <TableCell>
                                          <Checkbox
                                            size="small"
                                            onClick={(e) => {
                                              handleFinalCheckbox(e, index);
                                            }}
                                            checked={isItemSelected}
                                          />
                                        </TableCell>
                                      )}
                                      <TableCell>
                                        <Typography>
                                          {" "}
                                          {obj.validation
                                            .row_count_matching && (
                                            <>- Row Count Matching</>
                                          )}{" "}
                                        </Typography>
                                        <Typography>
                                          {" "}
                                          {obj.validation.row_data_matching && (
                                            <>
                                              <Typography>
                                                - Row Data Matching
                                              </Typography>
                                              <Typography>
                                                - Row Count Matching
                                              </Typography>
                                            </>
                                          )}{" "}
                                        </Typography>
                                      </TableCell>
                                      <TableCell>
                                        <TableContainer>
                                          <Table>
                                            <TableBody>
                                              {obj.source1.map((source1) => {
                                                return (
                                                  <>
                                                    <TableRow>
                                                      <TableCell
                                                        sx={{
                                                          width:
                                                            "35%!important",
                                                        }}
                                                      >
                                                        <Chip
                                                          label={
                                                            source1?.Table
                                                              ? source1?.Table
                                                              : source1?.filename
                                                          }
                                                          size="small"
                                                        />
                                                      </TableCell>
                                                      <TableCell
                                                        sx={{
                                                          width:
                                                            "35%!important",
                                                        }}
                                                      >
                                                        <Chip
                                                          label={
                                                            source1?.Column
                                                          }
                                                          size="small"
                                                        />
                                                      </TableCell>
                                                      <TableCell>
                                                        <Chip
                                                          label={source1?.IsKey.toString()}
                                                          size="small"
                                                        />
                                                      </TableCell>
                                                    </TableRow>
                                                  </>
                                                );
                                              })}
                                            </TableBody>
                                          </Table>
                                        </TableContainer>
                                      </TableCell>
                                      <TableCell>
                                        <TableContainer>
                                          <Table>
                                            <TableBody>
                                              {obj.source2?.map((source2) => {
                                                return (
                                                  <>
                                                    <TableRow>
                                                      <TableCell
                                                        sx={{
                                                          width:
                                                            "35%!important",
                                                        }}
                                                      >
                                                        <Chip
                                                          label={
                                                            source2?.Table
                                                              ? source2?.Table
                                                              : source2?.filename
                                                          }
                                                          size="small"
                                                        />
                                                      </TableCell>
                                                      <TableCell
                                                        sx={{
                                                          width:
                                                            "35%!important",
                                                        }}
                                                      >
                                                        <Chip
                                                          label={
                                                            source2?.Column
                                                          }
                                                          size="small"
                                                        />
                                                      </TableCell>
                                                      <TableCell>
                                                        <Typography>
                                                          <Chip
                                                            label={source2?.IsKey.toString()}
                                                            size="small"
                                                          />
                                                        </Typography>
                                                      </TableCell>
                                                    </TableRow>
                                                  </>
                                                );
                                              })}
                                            </TableBody>
                                          </Table>
                                        </TableContainer>
                                      </TableCell>
                                    </TableRow>
                                  </>
                                );
                              })}
                            {source1Sql === "Yes" &&
                              finalValidation.map((obj, index) => {
                                const isItemSelected = isFinalSelected(index);
                                return (
                                  <>
                                    <TableRow>
                                      {checkbox && (
                                        <TableCell>
                                          <Checkbox
                                            size="small"
                                            onClick={(e) => {
                                              handleFinalCheckbox(e, index);
                                            }}
                                            checked={isItemSelected}
                                          />
                                        </TableCell>
                                      )}
                                      <TableCell>
                                        <Typography>
                                          {" "}
                                          {obj.validation
                                            .row_count_matching && (
                                            <>- Row Count Matching</>
                                          )}{" "}
                                        </Typography>
                                        <Typography>
                                          {" "}
                                          {obj.validation.row_data_matching && (
                                            <>
                                              <Typography>
                                                - Row Data Matching
                                              </Typography>
                                              <Typography>
                                                - Row Count Matching
                                              </Typography>
                                            </>
                                          )}{" "}
                                        </Typography>
                                      </TableCell>
                                      <TableCell>{obj.source1}</TableCell>
                                      <TableCell>{obj.source2}</TableCell>
                                    </TableRow>
                                  </>
                                );
                              })}
                          </TableBody>
                        </Table>
                      )}

                      {type && (
                        <Table sx={{ minWidth: 650 }} aria-label="simple table">
                          <TableHead>
                            <TableRow>
                              {checkbox && (
                                <TableCell>
                                  <Checkbox
                                    size="small"
                                    onClick={(e) => {
                                      handleFinalSelectAll(e);
                                    }}
                                    checked={
                                      finalSelected.length > 0 &&
                                      finalSelected.length ===
                                        finalValidation.length
                                    }
                                  />
                                </TableCell>
                              )}
                              <TableCell>Validations</TableCell>
                              <TableCell>Data Source</TableCell>
                            </TableRow>
                          </TableHead>
                          <TableBody>
                            {source1Sql === "No" && (
                              <TableRow>
                                {checkbox && (
                                  <TableCell colSpan={2}></TableCell>
                                )}
                                {!checkbox && (
                                  <TableCell colSpan={1}></TableCell>
                                )}
                                <TableCell>
                                  <Table>
                                    <TableHead>
                                      <TableRow>
                                        <TableCell
                                          sx={{ width: "35%" }}
                                          rowSpan={2}
                                        >
                                          {source1?.connectionName ? (
                                            <>Table</>
                                          ) : (
                                            <>File</>
                                          )}
                                        </TableCell>
                                        <TableCell sx={{ width: "35%" }}>
                                          <Typography>
                                            <b>Columnref:</b>
                                          </Typography>
                                        </TableCell>
                                        <TableCell>
                                          <Typography>
                                            <b>Is Key Column?</b>
                                          </Typography>
                                        </TableCell>
                                      </TableRow>
                                    </TableHead>
                                  </Table>
                                </TableCell>
                              </TableRow>
                            )}

                            {source1Sql === "No" &&
                              finalValidation.map((obj, index) => {
                                const isItemSelected = isFinalSelected(index);
                                return (
                                  <>
                                    <TableRow>
                                      {checkbox && (
                                        <TableCell>
                                          <Checkbox
                                            size="small"
                                            onClick={(e) => {
                                              handleFinalCheckbox(e, index);
                                            }}
                                            checked={isItemSelected}
                                          />
                                        </TableCell>
                                      )}
                                      <TableCell>
                                        <Typography>
                                          {" "}
                                          {obj.validation
                                            .row_count_matching && (
                                            <>- Row Count Matching</>
                                          )}{" "}
                                        </Typography>
                                        <Typography>
                                          {" "}
                                          {obj.validation.row_data_matching && (
                                            <>
                                              <Typography>
                                                - Row Data Matching
                                              </Typography>
                                              <Typography>
                                                - Row Count Matching
                                              </Typography>
                                            </>
                                          )}{" "}
                                        </Typography>
                                      </TableCell>
                                      <TableCell>
                                        <TableContainer>
                                          <Table>
                                            <TableBody>
                                              {obj.source1.map((source1) => {
                                                return (
                                                  <>
                                                    <TableRow>
                                                      <TableCell>
                                                        <Chip
                                                          label={
                                                            source1?.Table
                                                              ? source1?.Table
                                                              : source1?.filename
                                                          }
                                                          size="small"
                                                        />
                                                      </TableCell>
                                                      <TableCell>
                                                        <Chip
                                                          label={
                                                            source1?.Column
                                                          }
                                                          size="small"
                                                        />
                                                      </TableCell>
                                                      <TableCell>
                                                        <Chip
                                                          label={source1?.IsKey.toString()}
                                                          size="small"
                                                        />
                                                      </TableCell>
                                                    </TableRow>
                                                  </>
                                                );
                                              })}
                                            </TableBody>
                                          </Table>
                                        </TableContainer>
                                      </TableCell>
                                      <TableCell>
                                        <TableContainer>
                                          <Table>
                                            <TableBody>
                                              {obj.source2?.map((source2) => {
                                                return (
                                                  <>
                                                    <TableRow>
                                                      <TableCell>
                                                        <Chip
                                                          label={
                                                            source2?.Table
                                                              ? source2?.Table
                                                              : source2?.filename
                                                          }
                                                          size="small"
                                                        />
                                                      </TableCell>
                                                      <TableCell>
                                                        <Chip
                                                          label={
                                                            source2?.Column
                                                          }
                                                          size="small"
                                                        />
                                                      </TableCell>
                                                      <TableCell>
                                                        <Typography>
                                                          <Chip
                                                            label={source2?.IsKey.toString()}
                                                            size="small"
                                                          />
                                                        </Typography>
                                                      </TableCell>
                                                    </TableRow>
                                                  </>
                                                );
                                              })}
                                            </TableBody>
                                          </Table>
                                        </TableContainer>
                                      </TableCell>
                                    </TableRow>
                                  </>
                                );
                              })}
                            {source1Sql === "Yes" &&
                              finalValidation.map((obj, index) => {
                                const isItemSelected = isFinalSelected(index);
                                return (
                                  <>
                                    <TableRow>
                                      {checkbox && (
                                        <TableCell>
                                          <Checkbox
                                            size="small"
                                            onClick={(e) => {
                                              handleFinalCheckbox(e, index);
                                            }}
                                            checked={isItemSelected}
                                          />
                                        </TableCell>
                                      )}
                                      <TableCell>
                                        <Typography>
                                          {" "}
                                          {obj.validation
                                            .row_count_matching && (
                                            <>- Row Count Matching</>
                                          )}{" "}
                                        </Typography>
                                        <Typography>
                                          {" "}
                                          {obj.validation.row_data_matching && (
                                            <>
                                              <Typography>
                                                - Row Data Matching
                                              </Typography>
                                              <Typography>
                                                - Row Count Matching
                                              </Typography>
                                            </>
                                          )}{" "}
                                        </Typography>
                                      </TableCell>
                                      <TableCell>{obj.source1}</TableCell>
                                      <TableCell>{obj.source2}</TableCell>
                                    </TableRow>
                                  </>
                                );
                              })}
                          </TableBody>
                        </Table>
                      )}
                    </TableContainer>
                  </Box>
                </Grid>
              </Box>
            </Card>
          </Grid>
        </Grid>
      )}
    </React.Fragment>
  );
}
