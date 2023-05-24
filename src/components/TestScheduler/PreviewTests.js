import CancelOutlinedIcon from "@mui/icons-material/CancelOutlined";
import {
  Box,
  Button,
  FormControl,
  Grid,
  IconButton,
  Typography,
} from "@mui/material";
import React, { useEffect, useRef, useState } from "react";
import ApiService from "../../services/app.service";
import { CustomAgGrid } from "../AgGrid";
import ComparativeTestResult from "../Validations/ComparativeTestResult";
import DatabaseFileValidationList from "../Validations/DatabaseOrFileValidationTestResult";
import { headCellss } from "./PreviewModel";

export default function PreviewSchedulerData({
  ClosePreview,
  data,
  obj,
  ScrollRef,
  AutoScroll,
}) {
  const [resultsData, setResultsData] = useState([]);
  const gridRef = useRef();

  useEffect(() => {
    setResultsData([]);
  }, [data]);

  const getTestResults = async () => {
    var testIds = data.map((obj) => {
      return obj._id;
    });
    let response = await ApiService.getTestResultsWithIds({ testIds });
    setResultsData(response?.data);
    AutoScroll();
  };

  return (
    <Box className="pvTestSch">
      <Box className="innerSubHead">
        <Grid container alignItems="center" justify="center">
          <Grid sm={1}>
            <Typography variant="h6">Preview: </Typography>
          </Grid>
          <Grid align="center" sm={10}>
            <Grid container>
              <Grid item xs>
                <Box>
                  <Typography variant="bold"> Name: </Typography>{" "}
                  <Typography> {" " + obj.Title} </Typography>
                </Box>
              </Grid>
              <Grid item xs>
                <Box>
                  <Typography variant="bold"> Total Tests: </Typography>{" "}
                  <Typography> {" " + obj.TestIds.length} </Typography>
                </Box>
              </Grid>
            </Grid>
          </Grid>
          <Grid sm={1}>
            <IconButton
              onClick={ClosePreview}
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
      <Box className="createBtn">
        <FormControl size="small">
          <Button size="small" variant="outlined" onClick={getTestResults}>
            View Results
          </Button>
        </FormControl>
      </Box>
      <CustomAgGrid
        previewId={obj?.id}
        gridRef={gridRef}
        ClosePreview={() => {
          setResultsData([]);
        }}
        headCells={headCellss}
        rows={data}
      />
      <Box ref={ScrollRef}>
        {resultsData.length > 0 &&
          resultsData.map((obj) => {
            return (
              <React.Fragment>
                {obj.validationDetails.TestType === "Single Database" && (
                  <DatabaseFileValidationList
                    resultValidation={obj}
                    showResultType={"result"}
                    AutoScroll={AutoScroll}
                  />
                )}
                {obj.validationDetails.TestType === "Comparison" && (
                  <ComparativeTestResult
                    AutoScroll={AutoScroll}
                    resultValidation={obj}
                  />
                )}
                {obj.validationDetails.TestType === "Single File" && (
                  <DatabaseFileValidationList
                    AutoScroll={AutoScroll}
                    resultValidation={obj}
                  />
                )}
              </React.Fragment>
            );
          })}
      </Box>
    </Box>
  );
}
