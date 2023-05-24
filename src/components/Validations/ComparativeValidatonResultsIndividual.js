import ArticleOutlinedIcon from "@mui/icons-material/ArticleOutlined";
import ChevronRightOutlinedIcon from "@mui/icons-material/ChevronRightOutlined";
import ContentCopyOutlinedIcon from "@mui/icons-material/ContentCopyOutlined";
import JoinInnerOutlinedIcon from "@mui/icons-material/JoinInnerOutlined";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import IconButton from "@mui/material/IconButton";
import Paper from "@mui/material/Paper";
import TableCell from "@mui/material/TableCell";
import Typography from "@mui/material/Typography";

export default function ComparativeValidatonResultsIndividual({
  resultValidation,
  RowComparisonResults,
  getTableData,
  validationDetailsRowComparison,
}) {
  return (
    <TableCell
      colSpan="5"
      sx={{
        backgroundColor: "#fff!important",
      }}
    >
      <Grid className="compTiles" container spacing={1}>
        <Grid sm={12} item>
          <Box>
            <Grid container>
              <Grid md={6}>
                <Box className="compDSHead">
                  <Box>
                    <Typography variant="h6">First Data Source</Typography>
                  </Box>
                  <Box>
                    <Grid container>
                      <Grid item xs>
                        <Box>
                          <Typography variant="bold">Type: </Typography>{" "}
                          <Typography>
                            {" "}
                            {
                              resultValidation?.validationDetails
                                ?.FirstDatasourceType
                            }
                          </Typography>
                        </Box>
                      </Grid>
                      <Grid item xs>
                        <Box>
                          <Typography variant="bold">Name: </Typography>
                          <Typography>
                            {" "}
                            {
                              resultValidation?.validationDetails
                                ?.FirstDatasourceName
                            }
                          </Typography>
                        </Box>
                      </Grid>
                    </Grid>
                  </Box>
                </Box>
              </Grid>

              <Grid md={6}>
                <Box className="compDSHead">
                  <Box>
                    <Typography variant="h6">Second Data Source</Typography>
                  </Box>
                  <Box>
                    <Grid container>
                      <Grid item xs>
                        <Box>
                          <Typography variant="bold">Type: </Typography>
                          <Typography>
                            {
                              resultValidation?.validationDetails
                                ?.SecondDatasourceType
                            }
                          </Typography>
                        </Box>
                      </Grid>
                      <Grid item xs>
                        <Box>
                          <Typography variant="bold">Name: </Typography>{" "}
                          <Typography>
                            {" "}
                            {
                              resultValidation?.validationDetails
                                ?.SecondDatasourceName
                            }
                          </Typography>
                        </Box>
                      </Grid>
                    </Grid>
                  </Box>
                </Box>
              </Grid>
            </Grid>
          </Box>
          {RowComparisonResults?.map((itemVal, index) => {
            var arr = itemVal.RowComparisonResult.Matched.map((obj) => {
              return (
                obj.EntitiesInSource1.length + obj.EntitiesInSource2.length
              );
            });
            var sumMatched = arr.reduce((a, b) => a + b, 0);
            var first =
              itemVal.RowComparisonResult.DuplicatesInFirstDatasource.map(
                (obj) => {
                  return obj.DuplicateCount;
                }
              );
            let duplicateFirst = first.reduce((a, b) => a + b, 0);
            var second =
              itemVal.RowComparisonResult.DuplicatesInSecondDatasource.map(
                (obj) => {
                  return obj.DuplicateCount;
                }
              );
            let duplicateSecond = second.reduce((a, b) => a + b, 0);

            return (
              <Box className="compValBody">
                <Box>
                  <Grid container>
                    <Grid md={6}>
                      <Box className="compDSHead">
                        <Box>
                          {validationDetailsRowComparison[index].SqlQuery ? (
                            <Typography>
                              Query :{" "}
                              {
                                validationDetailsRowComparison[index].SqlQuery
                                  .FirstDataSource
                              }{" "}
                            </Typography>
                          ) : (
                            <Typography>
                              <b>Table:</b>
                              {
                                validationDetailsRowComparison[index]
                                  ?.FirstDataSource[0]?.Table
                              }
                              | <b>Column:</b>
                              {
                                validationDetailsRowComparison[index]
                                  ?.FirstDataSource[0]?.Column
                              }
                              | <b>Row Count : </b>
                              {
                                itemVal.RowComparisonResult
                                  ?.FirstDataSourceRowCount
                              }
                            </Typography>
                          )}
                        </Box>
                      </Box>
                    </Grid>

                    <Grid md={6}>
                      <Box className="compDSHead">
                        <Box>
                          {validationDetailsRowComparison[0].SqlQuery ? (
                            <Typography>
                              Query :{" "}
                              {
                                validationDetailsRowComparison[index].SqlQuery
                                  .SecondDataSource
                              }{" "}
                            </Typography>
                          ) : (
                            <Typography>
                              <b>Table:</b>
                              {
                                validationDetailsRowComparison[index]
                                  ?.SecondDataSource[0]?.Table
                              }{" "}
                              | <b>Column:</b>
                              {
                                validationDetailsRowComparison[index]
                                  ?.SecondDataSource[0]?.Column
                              }
                              | <b>Row Count : </b>
                              {
                                itemVal.RowComparisonResult
                                  .SecondDataSourceRowCount
                              }
                            </Typography>
                          )}
                        </Box>
                      </Box>
                    </Grid>
                  </Grid>
                </Box>

                <Box sx={{ p: 1 }}>
                  <Grid container spacing={1}>
                    <Grid
                      item
                      sm
                      onClick={() => {
                        getTableData(
                          itemVal.RowComparisonResult.Matched,
                          {
                            type: "Matched",
                            name: "Matched",
                          },
                          {
                            columnOne:
                              validationDetailsRowComparison[index]
                                ?.FirstDataSource[0]?.Column,
                            columnTwo:
                              validationDetailsRowComparison[index]
                                ?.SecondDataSource[0]?.Column,
                          }
                        );
                      }}
                    >
                      <Paper className="tile">
                        <JoinInnerOutlinedIcon />
                        <Typography>
                          Matched <br />
                          <span>{sumMatched}</span>
                        </Typography>
                        <IconButton aria-label="delete" size="small">
                          <ChevronRightOutlinedIcon />
                        </IconButton>
                      </Paper>
                    </Grid>
                    <Grid
                      item
                      sm
                      onClick={() => {
                        getTableData(
                          itemVal.RowComparisonResult.OnlyInFirstDatasource,
                          {
                            type: "OnlyInFirstDatasource",
                            name:
                              "Unique in" +
                              resultValidation?.validationDetails
                                ?.FirstDatasourceName,
                          },
                          validationDetailsRowComparison[index]
                            ?.FirstDataSource[0]?.Column
                        );
                      }}
                    >
                      <Paper className="TableOne tile">
                        <ArticleOutlinedIcon />
                        <Typography>
                          Unique in{" "}
                          <b>
                            {
                              resultValidation?.validationDetails
                                ?.FirstDatasourceName
                            }
                          </b>
                          <br />
                          <span>
                            {
                              itemVal.RowComparisonResult?.OnlyInFirstDatasource
                                ?.length
                            }
                          </span>
                        </Typography>
                        <IconButton aria-label="delete" size="small">
                          <ChevronRightOutlinedIcon />
                        </IconButton>
                      </Paper>
                    </Grid>
                    <Grid
                      item
                      sm
                      onClick={() => {
                        getTableData(
                          itemVal.RowComparisonResult.OnlyInSecondDatasource,
                          {
                            type: "OnlyInSecondDatasource",
                            name:
                              "Unique in " +
                              resultValidation?.validationDetails
                                ?.SecondDatasourceName,
                          },
                          validationDetailsRowComparison[index]
                            ?.SecondDataSource[0]?.Column
                        );
                      }}
                    >
                      <Paper className="TableTwo tile" elevation={2}>
                        <ArticleOutlinedIcon />
                        <Typography>
                          {" "}
                          Unique in{" "}
                          <b>
                            {
                              resultValidation?.validationDetails
                                ?.SecondDatasourceName
                            }
                          </b>
                          <br />
                          <span>
                            {
                              itemVal?.RowComparisonResult
                                ?.OnlyInSecondDatasource?.length
                            }
                          </span>
                        </Typography>
                        <IconButton aria-label="delete" size="small">
                          <ChevronRightOutlinedIcon />
                        </IconButton>
                      </Paper>
                    </Grid>
                    <Grid
                      item
                      sm
                      onClick={() => {
                        getTableData(
                          itemVal.RowComparisonResult
                            .DuplicatesInFirstDatasource,
                          {
                            type: "DuplicatesInFirstDatasource",
                            name:
                              "Duplicate in " +
                              resultValidation?.validationDetails
                                ?.FirstDatasourceName,
                          },
                          validationDetailsRowComparison[index]
                            ?.FirstDataSource[0]?.Column
                        );
                      }}
                    >
                      <Paper className="TableOne tile">
                        <ContentCopyOutlinedIcon />
                        <Typography>
                          {" "}
                          Duplicate in{" "}
                          <b>
                            {
                              resultValidation?.validationDetails
                                ?.FirstDatasourceName
                            }
                          </b>{" "}
                          <br />
                          <span>{duplicateFirst}</span>
                        </Typography>
                        <IconButton aria-label="delete" size="small">
                          <ChevronRightOutlinedIcon />
                        </IconButton>
                      </Paper>
                    </Grid>
                    <Grid
                      item
                      sm
                      onClick={() => {
                        getTableData(
                          itemVal.RowComparisonResult
                            .DuplicatesInSecondDatasource,
                          {
                            type: "DuplicatesInSecondDatasource",
                            name:
                              "Duplicate in " +
                              resultValidation?.validationDetails
                                ?.SecondDatasourceName,
                          },
                          validationDetailsRowComparison[index]
                            ?.SecondDataSource[0]?.Column
                        );
                      }}
                    >
                      <Paper className="TableTwo tile">
                        <ContentCopyOutlinedIcon />
                        <Typography>
                          Duplicate in{" "}
                          <b>
                            {
                              resultValidation?.validationDetails
                                ?.SecondDatasourceName
                            }
                          </b>{" "}
                          <br />
                          <span>{duplicateSecond}</span>
                        </Typography>
                        <IconButton aria-label="delete" size="small">
                          <ChevronRightOutlinedIcon />
                        </IconButton>
                      </Paper>
                    </Grid>
                  </Grid>
                </Box>
              </Box>
            );
          })}
        </Grid>
      </Grid>
    </TableCell>
  );
}
