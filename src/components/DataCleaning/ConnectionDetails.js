import { Grid, Typography } from "@mui/material";

export default function ConnectionDetails({
  Connectiondetails,
  datasourcetype,
  Table,
}) {
  return (
    <Grid item container rowSpacing={1.5}>
      <Grid item xs={12}>
        <Typography sx={{ flex: "1 1 100%" }}>
          <b style={{ color: "#096eb6" }}>Data Source Name:</b>{" "}
          {Connectiondetails?.connectionName}
        </Typography>
      </Grid>
      <Grid item xs={12}>
        <Typography sx={{ flex: "1 1 100%" }}>
          <b style={{ color: "#096eb6" }}>Type:</b> {datasourcetype} [
          {Connectiondetails?.connectionType}]
        </Typography>
      </Grid>
      <Grid item xs={12}>
        <Typography sx={{ flex: "1 1 100%" }}>
          <b style={{ color: "#096eb6" }}>
            {datasourcetype === "Database" ? "Database:" : "File:"}
          </b>{" "}
          {datasourcetype === "Database"
            ? Connectiondetails?.dataBase
            : Connectiondetails?.fileName}
        </Typography>
      </Grid>
      {datasourcetype === "Database" && (
        <Grid item xs={12}>
          <Typography sx={{ flex: "1 1 100%" }}>
            <b style={{ color: "#096eb6" }}>Table:</b> {Table}
          </Typography>
        </Grid>
      )}
    </Grid>
  );
}
