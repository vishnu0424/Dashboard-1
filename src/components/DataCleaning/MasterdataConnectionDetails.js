import { Box, Grid, Typography } from "@mui/material";

export default function ConnectionDetails({ connectionDetails }) {
  return (
    <Box className="conValHead">
      <Grid container alignItems="center" justify="center">
        <Grid align="center" sm={12}>
          <Grid container>
            <Grid item xs>
              <Box>
                <Typography variant="bold" sx={{ color: "#096eb6" }}>
                  {" "}
                  Data Source Name:{" "}
                </Typography>{" "}
                <Typography>
                  {" "}
                  {connectionDetails && connectionDetails.connectionName}{" "}
                </Typography>
              </Box>
            </Grid>
            <Grid item xs>
              <Box>
                <Typography variant="bold" sx={{ color: "#096eb6" }}>
                  {" "}
                  Data Source Type:{" "}
                </Typography>{" "}
                <Typography>
                  {" "}
                  {connectionDetails.ext ? "File" : "DataBase"}{" "}
                </Typography>
              </Box>
            </Grid>
            <Grid item xs>
              <Box>
                <Typography variant="bold" sx={{ color: "#096eb6" }}>
                  {" "}
                  Connection Type:{" "}
                </Typography>{" "}
                <Typography>
                  {" "}
                  {connectionDetails && connectionDetails.connectionType}
                </Typography>
              </Box>
            </Grid>
            <Grid item xs>
              <Box>
                <Typography variant="bold" sx={{ color: "#096eb6" }}>
                  {connectionDetails.ext ? "File Name:" : "Database Name:"}
                </Typography>{" "}
                <Typography>
                  {" "}
                  {connectionDetails && connectionDetails.ext
                    ? connectionDetails.fileName
                    : connectionDetails.dataBase}{" "}
                </Typography>
              </Box>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Box>
  );
}
