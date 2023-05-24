import ArticleOutlinedIcon from "@mui/icons-material/ArticleOutlined";
import ChevronRightOutlinedIcon from "@mui/icons-material/ChevronRightOutlined";
import ContentCopyOutlinedIcon from "@mui/icons-material/ContentCopyOutlined";
import JoinInnerOutlinedIcon from "@mui/icons-material/JoinInnerOutlined";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import IconButton from "@mui/material/IconButton";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";

export default function ComparativeValidatePreview({
  resultValidation,
  validationDetailsRowComparison,
}) {
  let RowComparisonResults = resultValidation;
  
  return (
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
                          {validationDetailsRowComparison?.FirstDatasourceType}
                        </Typography>
                      </Box>
                    </Grid>
                    <Grid item xs>
                      <Box>
                        <Typography variant="bold">Name: </Typography>
                        <Typography>
                          {" "}
                          {validationDetailsRowComparison?.FirstDatasourceName}
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
                          {validationDetailsRowComparison?.SecondDatasourceType}
                        </Typography>
                      </Box>
                    </Grid>
                    <Grid item xs>
                      <Box>
                        <Typography variant="bold">Name: </Typography>{" "}
                        <Typography>
                          {" "}
                          {validationDetailsRowComparison?.SecondDatasourceName}
                        </Typography>
                      </Box>
                    </Grid>
                  </Grid>
                </Box>
              </Box>
            </Grid>
          </Grid>
        </Box>
        <Box className="comValMain">
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
                          <Typography>
                            <b>Table:</b>
                            {validationDetailsRowComparison?.comparissonValidations &&
                              validationDetailsRowComparison
                                ?.comparissonValidations[index]
                                ?.FirstDataSource[0].Table}
                            | <b>Column:</b>
                            {validationDetailsRowComparison?.comparissonValidations &&
                              validationDetailsRowComparison
                                ?.comparissonValidations[index]
                                ?.FirstDataSource[0].Column}
                            | <b>Row Count:</b>
                            {"0"}
                          </Typography>
                        </Box>
                      </Box>
                    </Grid>

                    <Grid md={6}>
                      <Box className="compDSHead">
                        <Box>
                          <Typography>
                            <b>Table:</b>
                            {validationDetailsRowComparison?.comparissonValidations &&
                              validationDetailsRowComparison
                                ?.comparissonValidations[index]
                                ?.SecondDataSource[0]?.Table}{" "}
                            | <b>Column:</b>
                            {validationDetailsRowComparison?.comparissonValidations &&
                              validationDetailsRowComparison
                                ?.comparissonValidations[index]
                                ?.SecondDataSource[0]?.Column}
                            | <b>Row Count : </b>
                            {" 0"}
                          </Typography>
                        </Box>
                      </Box>
                    </Grid>
                  </Grid>
                </Box>

                <Box sx={{ p: 1 }}>
                  <Grid container spacing={1}>
                    <Grid item sm>
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
                    <Grid item sm>
                      <Paper className="TableOne tile">
                        <ArticleOutlinedIcon />
                        <Typography>
                          Unique in A <br />
                          <span>
                            {
                              itemVal.RowComparisonResult.OnlyInFirstDatasource
                                .length
                            }
                          </span>
                        </Typography>
                        <IconButton aria-label="delete" size="small">
                          <ChevronRightOutlinedIcon />
                        </IconButton>
                      </Paper>
                    </Grid>
                    <Grid item sm>
                      <Paper className="TableTwo tile" elevation={2}>
                        <ArticleOutlinedIcon />
                        <Typography>
                          {" "}
                          Unique in B <br />
                          <span>
                            {
                              itemVal.RowComparisonResult.OnlyInSecondDatasource
                                .length
                            }
                          </span>
                        </Typography>
                        <IconButton aria-label="delete" size="small">
                          <ChevronRightOutlinedIcon />
                        </IconButton>
                      </Paper>
                    </Grid>
                    <Grid item sm>
                      <Paper className="TableOne tile">
                        <ContentCopyOutlinedIcon />
                        <Typography>
                          {" "}
                          Duplicate in A <br />
                          <span>{duplicateFirst}</span>
                        </Typography>
                        <IconButton aria-label="delete" size="small">
                          <ChevronRightOutlinedIcon />
                        </IconButton>
                      </Paper>
                    </Grid>
                    <Grid item sm>
                      <Paper className="TableTwo tile">
                        <ContentCopyOutlinedIcon />
                        <Typography>
                          Duplicate in B <br />
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
        </Box>
      </Grid>
    </Grid>
  );
}
