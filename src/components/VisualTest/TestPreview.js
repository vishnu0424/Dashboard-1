import CancelOutlinedIcon from "@mui/icons-material/CancelOutlined";
import ZoomOutMapOutlinedIcon from "@mui/icons-material/ZoomOutMapOutlined";
import { Box, Grid, IconButton, Paper, Typography } from "@mui/material";
import moment from "moment";
import { useState } from "react";
import { ImagePreview } from "./ImagePreview";

export default function TestPreview(props) {
  const { previewObj, ClosePreview, ScrollRef } = props;

  const [open, setOpen] = useState(false);

  return (
    <Paper sx={{ maxWidth: "100%" }} ref={ScrollRef}>
      <Box>
        <Box className="innerSubHead">
          <Grid container alignItems="center" justify="center">
            <Grid sm={2}>
              <Typography variant="h6">Preview: </Typography>
            </Grid>
            <Grid align="center" sm={8}></Grid>
            <Grid sm={2}>
              <IconButton
                onClick={() => {
                  ClosePreview();
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
        <Grid
          container
          alignItems={"center"}
          justifyContent={"center"}
          spacing={2}
        >
          {previewObj.BaseImage && (
            <Grid sm={4} item className="VT-Left">
              <Box>
                <Typography
                  onClick={() => {
                    setOpen(true);
                  }}
                >
                  <ZoomOutMapOutlinedIcon />
                </Typography>
                <img src={previewObj.BaseImage.location} />
              </Box>
            </Grid>
          )}
          <Grid sm={8} item className="VT-Right">
            <Grid container spacing={1}>
              <Grid sm={3} item>
                <Box>
                  <Typography variant="bold"> Test Name: </Typography>{" "}
                  <Typography>{previewObj.TestName}</Typography>
                </Box>
              </Grid>
              <Grid sm={3} item>
                <Box>
                  <Typography variant="bold"> Application Name: </Typography>{" "}
                  <Typography>{previewObj.ApplicationName}</Typography>
                </Box>
              </Grid>
              <Grid sm={3} item>
                <Box>
                  <Typography variant="bold"> Application Url: </Typography>{" "}
                  <Typography>{previewObj.ApplicationUrl}</Typography>
                </Box>
              </Grid>
              <Grid sm={3} item>
                <Box>
                  <Typography variant="bold"> Max Differences: </Typography>{" "}
                  <Typography>{previewObj.MaxDifferences}</Typography>
                </Box>
              </Grid>
              <Grid sm={3} item>
                <Box>
                  <Typography variant="bold"> Threshold: </Typography>{" "}
                  <Typography>{previewObj.Threshold}</Typography>
                </Box>
              </Grid>
              <Grid sm={3} item>
                <Box>
                  <Typography variant="bold"> Last Executed On: </Typography>{" "}
                  <Typography>N/A</Typography>
                </Box>
              </Grid>
              <Grid sm={3} item>
                <Box>
                  <Typography variant="bold"> Last Executed By: </Typography>{" "}
                  <Typography>Parthasarathi Bhattacharjee</Typography>
                </Box>
              </Grid>
              <Grid sm={3} item>
                <Box>
                  <Typography variant="bold"> Created Date : </Typography>{" "}
                  <Typography>
                    {moment(previewObj.CreatedDate).format("Do MMMM YYYY")}
                  </Typography>
                </Box>
              </Grid>
              <Grid sm={12} item>
                <Box>
                  <Typography variant="bold"> Ignored Areas: </Typography>{" "}
                  {previewObj.IgnoredAreas.length === 0 ? (
                    <Typography>0</Typography>
                  ) : (
                    previewObj.IgnoredAreas.map((obj) => {
                      return (
                        <Typography>
                          <span>X:{obj.x.toFixed(2)}</span>{" "}
                          <span> Y:{obj.y.toFixed(2)}</span>{" "}
                          <span> Width:{obj.width.toFixed(2)} </span>
                          <span> Height:{obj.height.toFixed(2)}</span>{" "}
                          <span> Unit:{obj.unit}</span>
                        </Typography>
                      );
                    })
                  )}
                </Box>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Box>
      {previewObj.BaseImage && (
        <ImagePreview
          open={open}
          setOpen={setOpen}
          url={previewObj.BaseImage.location}
        />
      )}
    </Paper>
  );
}
