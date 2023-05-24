import { Box, Grid, Typography } from "@mui/material";

export default function Output({ outPut }) {
  return (
    <Box>
      <Box className="innerSubHead">
        <Grid container alignItems="center">
          <Grid md={12} textAlign="center">
            <Typography variant="h6">Output</Typography>
          </Grid>
        </Grid>
      </Box>
      <Box>
        <Box className="chartOutput">
          <Grid container spacing={0.5}>
            {outPut &&
              outPut?.Data?.Segments?.map((obj, index) => {
                return (
                  <Grid item md={12}>
                    <Box
                      sx={{ borderLeftColor: obj.ColorCode + " !important" }}
                      key={index}
                      className="CDAOutputBox"
                    >
                      <Grid container alignItems="center">
                        <Grid md={12} item>
                          <Grid container>
                            <Grid md={6}>
                              <Typography>
                                Color Code: <b>{obj.ColorCode}</b>
                              </Typography>
                            </Grid>
                            <Grid md={6}>
                              <Box
                                className="colCode"
                                backgroundColor={obj.ColorCode}
                              >
                                <Typography>{index + 1}</Typography>
                              </Box>
                            </Grid>
                          </Grid>
                        </Grid>
                        <Grid md={12} item>
                          <Box className="colCodeR">
                            <Typography>
                              Name of color: <b>{obj.ColorName}</b>
                            </Typography>

                            <Typography>
                              Relative Size:{" "}
                              <b>
                                {obj.RelativeSizeInPercent[0] + "%"}
                                {" - "}
                                {obj.RelativeSizeInPercent[1] + "%"}
                              </b>
                            </Typography>
                          </Box>
                        </Grid>
                      </Grid>
                    </Box>
                  </Grid>
                );
              })}
          </Grid>
        </Box>
      </Box>
    </Box>
  );
}
