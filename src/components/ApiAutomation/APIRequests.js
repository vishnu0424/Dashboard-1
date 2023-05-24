import ArticleOutlinedIcon from "@mui/icons-material/ArticleOutlined";
import ChevronRightOutlinedIcon from "@mui/icons-material/ChevronRightOutlined";
import JoinInnerOutlinedIcon from "@mui/icons-material/JoinInnerOutlined";
import { Box, Grid, Paper, TableCell } from "@mui/material";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import { useState } from "react";
import ExpandableTableRow from "../Tables/ExpandableTableRow";
import CustomModal from "./customModel";

export default function ApiRequests({ AutoScroll, row }) {
  const [model, setModel] = useState(false);
  const [modelData, setModelData] = useState([]);
  const modelOpen = (resp) => {
    setModel(true);
    setModelData(resp);
  };
  const modelClose = () => {
    setModel(false);
    setModelData([]);
  };

  return (
    <>
      <ExpandableTableRow
        AutoScroll={AutoScroll}
        showData={<span>View Results</span>}
        expandComponent={
          <TableCell
            sx={{
              padding: "0 20px",
            }}
            colSpan="3"
          >
            {row?.APIMultiResponse?.multiResponseList &&
              row?.APIMultiResponse?.multiResponseList.map((el) => {
                return (
                  <Grid container spacing={1} className="compTiles">
                    {el?.StatusCode && (
                      <Grid sm item>
                        <Paper className="tile">
                          <JoinInnerOutlinedIcon />
                          <Typography>
                            <Box component="b">Status Code</Box> <br />
                            <span>
                              {
                                row?.APIMultiResponse?.multiResponseList[0]
                                  ?.StatusCode
                              }
                            </span>
                          </Typography>
                          <IconButton aria-label="delete" size="small">
                            <ChevronRightOutlinedIcon />
                          </IconButton>
                        </Paper>
                      </Grid>
                    )}

                    <Grid sm item>
                      <Paper
                        className="tile"
                        onClick={(e) => {
                          modelOpen(el?.DuplicateRows);
                        }}
                      >
                        <ArticleOutlinedIcon />
                        <Typography>
                          <Box component="b">Duplicate Rows</Box> <br />
                          <span>{el?.DuplicateRows?.length}</span>
                        </Typography>
                        <IconButton aria-label="delete" size="small">
                          <ChevronRightOutlinedIcon />
                        </IconButton>
                      </Paper>
                    </Grid>
                    <Grid sm item>
                      <Paper
                        className="tile"
                        onClick={(e) => {
                          modelOpen(el?.UniqueRows);
                        }}
                      >
                        <ArticleOutlinedIcon />
                        <Typography>
                          <Box component="b"> Unique Rows</Box> <br />
                          <span>{el?.UniqueRows?.length}</span>
                        </Typography>
                        <IconButton aria-label="delete" size="small">
                          <ChevronRightOutlinedIcon />
                        </IconButton>
                      </Paper>
                    </Grid>
                    <Grid sm item>
                      <Paper
                        className="tile"
                        onClick={(e) => {
                          modelOpen(JSON.parse(el?.Response));
                        }}
                      >
                        <ArticleOutlinedIcon />
                        <Typography>
                          <Box component="b">API Response</Box>
                          <br /> <Box component="span">-</Box>
                        </Typography>
                        <IconButton aria-label="delete" size="small">
                          <ChevronRightOutlinedIcon />
                        </IconButton>
                      </Paper>
                    </Grid>
                    {el?.ResponseFilePath && el?.isSchemaMatched ? (
                      <>
                        <Grid sm item>
                          <Paper
                            className="tile"
                            onClick={(e) => {
                              modelOpen(el?.MatchedRows);
                            }}
                          >
                            <JoinInnerOutlinedIcon />
                            <Typography>
                              <Box component="b">Matched</Box> <br />
                              <Box component="span">
                                {el?.MatchedRows?.length}
                              </Box>
                            </Typography>
                            <IconButton aria-label="delete" size="small">
                              <ChevronRightOutlinedIcon />
                            </IconButton>
                          </Paper>
                        </Grid>
                        <Grid sm item>
                          <Paper
                            className="tile"
                            onClick={(e) => {
                              modelOpen(el?.UnMatchedRows);
                            }}
                          >
                            <ArticleOutlinedIcon />
                            <Typography>
                              <Box component="b"> UnMatched</Box> <br />
                              <Box component="span">
                                {el?.UnMatchedRows?.length}
                              </Box>
                            </Typography>
                            <IconButton aria-label="delete" size="small">
                              <ChevronRightOutlinedIcon />
                            </IconButton>
                          </Paper>
                        </Grid>
                      </>
                    ) : el?.ResponseFilePath && !el?.isSchemaMatched ? (
                      <>
                        <Grid sm item>
                          <Paper className="tile">
                            <ArticleOutlinedIcon />
                            <Typography>
                              <Box component="b">Matched</Box> <br />
                              <Box component="span"> Schema Mismatch</Box>
                            </Typography>
                            <IconButton aria-label="delete" size="small">
                              <ChevronRightOutlinedIcon />
                            </IconButton>
                          </Paper>
                        </Grid>
                        <Grid sm item>
                          <Paper className="tile">
                            <ArticleOutlinedIcon />
                            <Typography>
                              <Box component="b">Un Matched</Box> <br />
                              <Box component="span">Schema Mismatch</Box>
                            </Typography>
                          </Paper>
                        </Grid>
                      </>
                    ) : (
                      <>
                        <Grid sm item>
                          <Paper className="tile">
                            <ArticleOutlinedIcon />
                            <Typography>
                              <Box component="b">Matched</Box>
                              <br />
                              No schema
                            </Typography>
                          </Paper>
                        </Grid>
                        <Grid sm item>
                          <Paper className="tile">
                            <ArticleOutlinedIcon />
                            <Typography>
                              <Box component="b">Un Matched</Box>
                              <br />
                              No schema
                            </Typography>
                            <IconButton
                              aria-label="delete"
                              size="small"
                            ></IconButton>
                          </Paper>
                        </Grid>
                      </>
                    )}
                  </Grid>
                );
              })}
          </TableCell>
        }
      >
        <TableCell>{row?.ApiUrl}</TableCell>
        <TableCell>{row?.Method}</TableCell>
      </ExpandableTableRow>

      {model && (
        <CustomModal data={modelData} model={model} returnValue={modelClose} />
      )}
    </>
  );
}
