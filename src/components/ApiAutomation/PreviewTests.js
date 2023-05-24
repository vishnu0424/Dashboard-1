import CancelOutlinedIcon from "@mui/icons-material/CancelOutlined";
import NotStartedSharpIcon from "@mui/icons-material/NotStartedSharp";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import {
  Box,
  Grid,
  IconButton,
  Paper,
  Tooltip,
  Typography,
} from "@mui/material";
import * as React from "react";
import { useContext, useMemo, useRef, useState, useEffect } from "react";
import { JSONTree } from "react-json-tree";
import { SnackbarContext } from "../../App";
import ApiService from "../../services/app.service";
import { CustomAgGrid } from "../AgGrid";
import SkeletonLoader from "../SkeletonLoader";
import { APIPreviewheadCells } from "./PreviewModel";
import PreviewResult from "./PreviewResult";

export default function PreviewAPIsList({
  ClosePreview,
  data,
  obj,
  ScrollRef,
  AutoScroll,
}) {
  const { setSnack } = useContext(SnackbarContext);
  const [loading, setLoader] = useState(false);
  const gridRef = useRef();
  const [previewData, setPreviewData] = useState([]);
  const [previewResult, setPreviewResult] = useState([]);
  const [rowData, setRowData] = useState(data);
  const rawData = obj?.ApiRequests;
  const theme = {};

  useEffect(() => {
    setPreviewResult([]);
    setPreviewData();
    setRowData(rowData);
  }, [data]);

  const executeAutomation = async (row) => {
    setLoader(true);
    setPreviewData();
    let objBody = {};
    objBody["rowId"] = row._id;
    objBody["connectionId"] = rowData?._id;
    try {
      let resp = await ApiService.SingleAutomationExection(objBody);
      let rData = resp?.data?.ResponseObject;
      setPreviewResult([rData]);
      setSnack({
        message: "Successfully executed..!",
        open: true,
        colour: "success",
      });
      AutoScroll();
    } catch (e) {
      setSnack({
        message: "Oops somthing went wrong",
        open: true,
        colour: "error",
      });
    }
    setLoader(false);
  };
  const previewTests = (row) => {
    console.log(row, 105);
    setPreviewResult([]);
    setPreviewData(row);
  };

  const action = {
    headerName: "Actions",
    sortable: false,
    cellRenderer: ActionsCell,
    executeAutomation: executeAutomation,
    previewTests: previewTests,
    cellClass: "locked-col",
    suppressColumnsToolPanel: true,
    filter: false,
    width: 300,
  };

  useMemo(() => {
    APIPreviewheadCells[APIPreviewheadCells.length - 1] = action;
  }, []);

  function ActionsCell(props) {
    const row = props.data;
    return (
      <>
        <Tooltip title="Preview" placement="top-end" arrow>
          <IconButton
            onClick={() => props.colDef.previewTests(row)}
            size="small"
            color="secondary"
          >
            <VisibilityOutlinedIcon fontSize="12px" />
          </IconButton>
        </Tooltip>
        <Tooltip title="Execute" placement="top-end" arrow>
          <IconButton
            onClick={() => props.colDef.executeAutomation(row)}
            size="small"
            color="secondary"
          >
            <NotStartedSharpIcon fontSize="12px" />{" "}
          </IconButton>
        </Tooltip>
      </>
    );
  }

  return (
    <Box className="pvTestSch">
      <Paper>
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
                    <Typography> {" " + obj.CollectionName} </Typography>
                  </Box>
                </Grid>
                <Grid item xs>
                  <Box>
                    <Typography variant="bold"> Create Date: </Typography>{" "}
                    <Typography> {" " + obj.createdAt} </Typography>
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
        <CustomAgGrid
          gridRef={gridRef}
          headCells={APIPreviewheadCells}
          rows={rawData}
        />
      </Paper>
      <Paper sx={{ p: 2, marginTop: 2 }}>
        {loading && <SkeletonLoader />}
        {previewData && (
          <JSONTree
            sx={{ p: 2 }}
            data={previewData}
            theme={theme}
            invertTheme
          />
        )}
        {previewResult.length !== 0 && (
          <Paper ref={ScrollRef}>
            <PreviewResult
              ClosePreview={ClosePreview}
              data={previewResult}
              showResultType={"execute"}
            />
          </Paper>
        )}
      </Paper>
    </Box>
  );
}
