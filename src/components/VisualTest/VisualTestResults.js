import CancelOutlinedIcon from "@mui/icons-material/CancelOutlined";
import {
  Box,
  Divider,
  Grid,
  IconButton,
  Paper,
  Typography,
} from "@mui/material";
import moment from "moment";
import { useState } from "react";
import { ImagePreview } from "./ImagePreview";
import Output from "./Output";

export default function VisualTestResults(props) {
  const { Result, outPut, setOutPut, CloseResults, setselectedId, ScrollRef } =
    props;

  const [open, setOpen] = useState();

  const showDifference = (obj) => {
    setOutPut(obj);
  };

  return (
    <>
      {Result && Result.length > 0 && (
        <Paper sx={{ maxWidth: "100%" }} ref={ScrollRef}>
          <Box>
            <Box className="innerSubHead">
              <Grid container alignItems="center" justify="center">
                <Grid sm={2}>
                  <Typography variant="h6">View Results: </Typography>
                </Grid>
                <Grid align="center" sm={8}></Grid>
                <Grid sm={2}>
                  <IconButton
                    onClick={() => {
                      CloseResults();
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
          </Box>
          <Box className="VTPreview">
            <Grid container>
              <Grid sm={10} item></Grid>
              <Grid sm={2} item></Grid>
              <Grid sm={12} item>
                <Box
                  className="DBListMain"
                  sx={{
                    display: "grid",
                    gridTemplateColumns: "repeat(6, 1fr)",
                  }}
                >
                  <Box className="DSListItem" key="0">
                    <Box
                      className="DBList"
                      onClick={() => {
                        setOpen(true);
                      }}
                    >
                      <Box textAlign="center">
                        <img src={Result[0].BaseImage} alt="" />
                      </Box>
                      <Divider />
                      <Grid container alignItems="center" item>
                        <Grid md={12} item>
                          <Box>
                            <Typography variant="h6"> Base Image </Typography>
                          </Box>
                        </Grid>
                      </Grid>
                    </Box>
                  </Box>
                  {Result.map((obj, index) => {
                    return (
                      <Box
                        className={
                          outPut?._id === obj?._id
                            ? "DSListItem item-selected"
                            : "DSListItem"
                        }
                        key={index + 1}
                        onClick={() => {
                          showDifference(obj);
                        }}
                        sx={{
                          "&:hover": {
                            cursor: "pointer",
                          },
                        }}
                      >
                        <Box className="DBList">
                          <Box textAlign="center">
                            <img src={obj.ScreenshotImage} alt="" />
                          </Box>
                          <Divider />
                          <Grid container alignItems="center" item>
                            <Grid md={12} item>
                              <Box>
                                <Typography>
                                  Executed Date :{" "}
                                  {moment(obj.CreatedDate).format(
                                    "Do MMM YYYY HH:mm:ss"
                                  )}
                                </Typography>
                                <Typography>
                                  No of differences : {obj.Differences.length}
                                </Typography>
                              </Box>
                            </Grid>
                          </Grid>
                        </Box>
                      </Box>
                    );
                  })}
                </Box>
              </Grid>
            </Grid>
          </Box>
          <ImagePreview
            open={open}
            setOpen={setOpen}
            url={Result[0].BaseImage}
          />
        </Paper>
      )}
      {outPut && (
        <Output
          outPut={outPut}
          setOutPut={setOutPut}
          setselectedId={setselectedId}
        />
      )}
    </>
  );
}
