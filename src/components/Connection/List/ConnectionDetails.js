import { Grid, Box, Typography } from "@mui/material";

export default function ConnectionDetails({ connectionDetails }) {
  return (
    <Box className="conValHead">
      <Grid container alignItems="center" justify="center">
        <Grid align="center" sm={12}>
          <Grid container>
            <Grid item xs>
              <Box>
                <Typography variant="bold"> Data Source Name: </Typography>{" "}
                <Typography>
                  {" "}
                  {connectionDetails && connectionDetails.connectionName}{" "}
                </Typography>
              </Box>
            </Grid>
            <Grid item xs>
              <Box>
                <Typography variant="bold"> Database Type: </Typography>{" "}
                <Typography>
                  {" "}
                  {connectionDetails && connectionDetails.connectionType}{" "}
                </Typography>
              </Box>
            </Grid>
            <Grid item xs>
              <Box>
                <Typography variant="bold"> Server: </Typography>{" "}
                <Typography>
                  {" "}
                  {connectionDetails && connectionDetails.server}
                </Typography>
              </Box>
            </Grid>
            <Grid item xs>
              <Box>
                <Typography variant="bold"> Database: </Typography>{" "}
                <Typography>
                  {" "}
                  {connectionDetails && connectionDetails.dataBase}{" "}
                </Typography>
              </Box>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Box>
  );
}
