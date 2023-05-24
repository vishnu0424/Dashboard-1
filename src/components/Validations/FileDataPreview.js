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
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import ApiService from "../../services/app.service";
import CustomJsonTree from "../JsonFile/CustomJsonTree";
import { StyledTableCell, StyledTableRow, useStyles } from "./Validationstyle";

export function FilePreview({ selectedOption, heading }) {
  const classes = useStyles();

  const [filePreviewData, setfilePreviewData] = useState();
  const [state, setState] = useState({ right: false });
  const [loader, Setloader] = useState(false);

  const toggleDrawer = (anchor, open) => async (event) => {
    if (open === true) {
      Setloader(true);
      try {
        let response = await ApiService.GetFilesData({ id: selectedOption.id });
        if (response?.data?.result?.ext === "txt") {
          if (response?.data?.result?.rows[0].length > 20) {
            var abc = response.data.result.rows[0].slice(0, 20);
            response.data.result.rows[0] = abc;
          }
        }
        setfilePreviewData(response.data);
        setState({ ...state, [anchor]: open });
        Setloader();
      } catch (error) {
        console.log(error);
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
      {filePreviewData?.result?.ext === "json" ||
      filePreviewData?.result?.ext === "xml" ? (
        <CustomJsonTree response={filePreviewData} />
      ) : (
        <>
          <Typography
            sx={{ flex: "1 1 100%", mb: 2 }}
            variant="h6"
            component="div"
          >
            {heading} Preview:
          </Typography>
          <Box className="previewDrawHead">
            <Grid container>
              <Grid sm={6}>
                <Typography
                  sx={{ flex: "1 1 100%" }}
                  id="tableTitle"
                  component="div"
                >
                  <b>Source:</b> File
                </Typography>
              </Grid>
              <Grid sm={6}>
                <Typography
                  sx={{ flex: "1 1 100%" }}
                  id="tableTitle"
                  component="div"
                >
                  <b>Name:</b> {filePreviewData?.fileDetails.fileName}
                </Typography>
              </Grid>
              <Grid sm={6}>
                <Typography
                  sx={{ flex: "1 1 100%" }}
                  id="tableTitle"
                  component="div"
                >
                  <b>Type:</b> {filePreviewData?.fileDetails.ext}
                </Typography>
              </Grid>
              <Grid sm={6}>
                <Typography
                  sx={{ flex: "1 1 100%" }}
                  id="tableTitle"
                  component="div"
                >
                  <b>Size:</b>{" "}
                  {(filePreviewData?.fileDetails.size * 0.001).toFixed(1)}KB
                </Typography>
              </Grid>
            </Grid>
          </Box>

          <TableContainer component={Paper}>
            <Table aria-label="customized table">
              <TableHead>
                <TableRow>
                  {filePreviewData?.fileDetails.firstRowisHeader &&
                    filePreviewData?.result?.rows[0]?.length > 0 &&
                    filePreviewData?.result.rows[0].map((obj) => (
                      <StyledTableCell>{obj}</StyledTableCell>
                    ))}

                  {!filePreviewData?.fileDetails.firstRowisHeader &&
                    filePreviewData?.result.rows[0].map((obj, index) => (
                      <StyledTableCell>Column{index + 1}</StyledTableCell>
                    ))}
                </TableRow>
              </TableHead>
              <TableBody sx={{ "& tr": { verticalAlign: "top" } }}>
                {filePreviewData?.fileDetails.firstRowisHeader &&
                  filePreviewData?.result.rows.map((obj, index) => {
                    return (
                      <StyledTableRow key={index}>
                        {index > 0 &&
                          obj.map((data) => {
                            return (
                              <StyledTableCell component="th" scope="row">
                                {data}
                              </StyledTableCell>
                            );
                          })}
                      </StyledTableRow>
                    );
                  })}

                {!filePreviewData?.fileDetails.firstRowisHeader &&
                  filePreviewData?.result.rows.map((obj, index) => {
                    return (
                      <StyledTableRow key={index}>
                        {obj.map((data, ind) => (
                          <StyledTableCell component="th" scope="row" key={ind}>
                            {data}
                          </StyledTableCell>
                        ))}
                      </StyledTableRow>
                    );
                  })}
              </TableBody>
            </Table>
          </TableContainer>

          <Box sx={{ my: "10px" }}>
            <Grid container>
              <Grid item xs={4}>
                <Typography
                  sx={{ flex: "1 1 100%", mb: 1 }}
                  id="tableTitle"
                  component="div"
                >
                  <b>Displayed Rows:</b>{" "}
                  {filePreviewData?.result?.rows?.length - 1}
                </Typography>
              </Grid>
              <Grid item xs={4} textAlign="right">
                <Typography
                  sx={{ flex: "1 1 100%", mb: 1 }}
                  id="tableTitle"
                  component="div"
                >
                  <b>Total Rows:</b> {filePreviewData?.result.totalRows}
                </Typography>
              </Grid>
              <Grid item xs={4} textAlign="right">
                <Typography
                  sx={{ flex: "1 1 100%", mb: 1 }}
                  id="tableTitle"
                  component="div"
                >
                  <b>Total Columns:</b> {filePreviewData?.result.totalColumns}
                </Typography>
              </Grid>
            </Grid>
          </Box>
        </>
      )}
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
