import CancelOutlinedIcon from "@mui/icons-material/CancelOutlined";
import { Box, Grid, IconButton, Paper, Typography } from "@mui/material";
import {useState, useEffect} from "react";
import APIExecutionResults from "./executionResults";

export default function PreviewResult({ ClosePreview, data, showResultType }) {
  const [resultsData, setResultsData] = useState([]);
  
  useEffect(() => {
    setResultsData(data);
  }, [data]);

  return (
    <Box className="pvTestSch">
      <Box className="innerSubHead">
        <Grid container alignItems="center" justify="center">
          <Grid sm={1}>
            <Typography variant="h6">Result: </Typography>
          </Grid>
          <Grid sm={10}></Grid>
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
      <Paper sx={{ p: 2 }}>
        {resultsData && (
          <APIExecutionResults
            result={resultsData}
            showResultType={showResultType}
          />
        )}
      </Paper>
    </Box>
  );
}
