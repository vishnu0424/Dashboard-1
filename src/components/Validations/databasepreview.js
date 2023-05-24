import {
  Box,
  Button,
  CircularProgress,
  Grid,
  Paper,
  SwipeableDrawer,
  Table,
  TableBody,
  TableContainer,
  TableHead,
  TableRow,
  Typography
} from "@mui/material";
import React, { useState } from "react";
import ApiService from "../../services/app.service";
import { StyledTableCell, StyledTableRow, useStyles } from "./Validationstyle";

export function DatabasePreview({ selectedOption, heading }) {
  const classes = useStyles();

  const [databasePreviewData, setdatabasePreviewData] = useState();
  const [state, setState] = useState({ right: false });
  const [loader, Setloader] = useState(false);

  const toggleDrawer = (anchor, open) => async (event) => {
    if (open === true) {
      Setloader(true);
      try {
        let response = await ApiService.ConnectionDetails(
          selectedOption.id,
          "Comparative"
        );
        setdatabasePreviewData(response?.data);
        setState({ ...state, [anchor]: open });
        Setloader();
      } catch (error) {
        console.log(error?.message);
      }
    }
    if (
      (event &&
        event.type === "keydown" &&
        (event.key === "Tab" || event.key === "Shift")) ||
      open === false
    ) {
      setState({ ...state, [anchor]: open });
    }
  };

  const list = () => (
    <Box
      sx={{ width: "right" === "top" || "right" === "bottom" ? "auto" : 500 }}
      role="presentation"
    >
      <Typography sx={{ flex: "1 1 100%", mb: 1 }} variant="h6" component="div">
        {heading} Preview:
      </Typography>
      <Box className="previewDrawHead" sx={{}}>
        <Grid container>
          <Grid sm={6}>
            <Typography
              sx={{ flex: "1 1 100%" }}
              id="tableTitle"
              component="div"
            >
              <b>Source:</b> Database
            </Typography>
          </Grid>
          <Grid sm={6}>
            <Typography
              sx={{ flex: "1 1 100%" }}
              id="tableTitle"
              component="div"
            >
              <b>Server:</b> {databasePreviewData?.ConnectionDetails?.server}
            </Typography>
          </Grid>
          <Grid sm={6}>
            <Typography
              sx={{ flex: "1 1 100%" }}
              id="tableTitle"
              component="div"
            >
              <b>Type:</b>{" "}
              {databasePreviewData?.ConnectionDetails.connectionType}
            </Typography>
          </Grid>
          <Grid sm={6}>
            <Typography
              sx={{ flex: "1 1 100%" }}
              id="tableTitle"
              component="div"
            >
              <b>Database:</b> {databasePreviewData?.ConnectionDetails.dataBase}
            </Typography>
          </Grid>
          <Grid sm={12}>
            <Typography
              sx={{ flex: "1 1 100%" }}
              id="tableTitle"
              component="div"
            >
              <b>Data Source Name:</b>{" "}
              {databasePreviewData?.ConnectionDetails.connectionName}
            </Typography>
          </Grid>
        </Grid>
      </Box>
      <TableContainer component={Paper}>
        <Table aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell>Tables</StyledTableCell>
              <StyledTableCell align="right">Count</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {databasePreviewData?.tablesData?.map((obj, index) => {
              let TableName = Object.keys(obj);
              let TableRowsColumns = Object.values(obj);
              return (
                <StyledTableRow key={index}>
                  <StyledTableCell width="65%" component="th" scope="row">
                    {TableName[0]}
                  </StyledTableCell>
                  <StyledTableCell align="right">
                    [rows : {TableRowsColumns[0]?.rowsCount} | cols:{" "}
                    {TableRowsColumns[0].columnCount}]
                  </StyledTableCell>
                </StyledTableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
      <Box className="previewDrawHead" mt="8px">
        <Grid container>
          <Grid sm={6}>
            <Typography
              sx={{ flex: "1 1 100%" }}
              id="tableTitle"
              component="div"
            >
              <b>Tables:</b> {databasePreviewData?.tables.length}
            </Typography>
          </Grid>
          <Grid sm={6}>
            <Typography
              sx={{ flex: "1 1 100%" }}
              id="tableTitle"
              component="div"
            >
              <b>Views:</b> {databasePreviewData?.views.length}
            </Typography>
          </Grid>
          <Grid sm={6}>
            <Typography
              sx={{ flex: "1 1 100%" }}
              id="tableTitle"
              component="div"
            >
              <b>Procedures:</b> {databasePreviewData?.procedures}
            </Typography>
          </Grid>
          <Grid sm={6}>
            <Typography
              sx={{ flex: "1 1 100%" }}
              id="tableTitle"
              component="div"
            >
              <b>Functions:</b> {databasePreviewData?.functions}
            </Typography>
          </Grid>
          <Grid sm={12}>
            <Typography
              sx={{ flex: "1 1 100%" }}
              id="tableTitle"
              component="div"
            >
              <b>Index:</b>{" "}
              {databasePreviewData &&
                databasePreviewData.databaseDetails &&
                databasePreviewData.databaseDetails.index}
            </Typography>
          </Grid>
        </Grid>
      </Box>
      <Box sx={{ textAlign: "center" }}>
        <Button
          variant="outlined"
          size="small"
          onClick={toggleDrawer("right", false)}
        >
          ok{" "}
        </Button>
      </Box>
    </Box>
  );
  return (
    <React.Fragment key={"right"}>
      <Button
        size="small"
        sx={{ ml: 1 }}
        variant="contained"
        onClick={toggleDrawer("right", true)}
        disabled={!selectedOption}
      >
        {!loader ? (
          "Preview"
        ) : (
          <CircularProgress
            style={{
              width: "20px",
              height: "20px",
              color: "#ffffff",
            }}
          />
        )}
      </Button>
      <SwipeableDrawer
        anchor={"right"}
        open={state["right"]}
        onClose={toggleDrawer("right", false)}
        onOpen={toggleDrawer("right", true)}
        className={classes.createconnection}
      >
        {list("right")}
      </SwipeableDrawer>
    </React.Fragment>
  );
}
