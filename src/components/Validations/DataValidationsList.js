import AccessTimeIcon from "@mui/icons-material/AccessTime";
import AllInclusiveOutlinedIcon from "@mui/icons-material/AllInclusiveOutlined";
import AnalyticsIcon from "@mui/icons-material/Analytics";
import CancelOutlinedIcon from "@mui/icons-material/CancelOutlined";
import DeleteIcon from "@mui/icons-material/Delete";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import NotStartedSharpIcon from "@mui/icons-material/NotStartedSharp";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogTitle,
  FormControl,
  Grid,
  IconButton,
  Menu,
  MenuItem,
  Paper,
  Toolbar,
  Tooltip,
  Typography,
} from "@mui/material";
import { alpha } from "@mui/material/styles";
import PropTypes from "prop-types";
import { useContext, useEffect, useMemo, useRef, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { SnackbarContext } from "../../App";
import ApiService from "../../services/app.service";
import { CustomAgGrid } from "../AgGrid";
import InnerHeader from "../InnerHeader";
import PipeLinePopUpScheduler from "../PipeLines/PipeLine";
import SkeletonLoader from "../SkeletonLoader";
import { sideUseStyles, tableStyles } from "../Styles";
import PopUpScheduler from "../TestScheduler/PopUpScheduler";
import ComparativeTestResult from "./ComparativeTestResult";
import DatabaseFileValidationList from "./DatabaseOrFileValidationTestResult";
import PreviewValidationData from "./PreviewValidationData";
import { headCellss, testHubCells } from "./TestHubModels";

const EnhancedTableToolbar = (props) => {
  const { numSelected, selectedRows, returnVal, rows } = props;

  const classes = tableStyles();
  const { setSnack } = useContext(SnackbarContext);

  const [openDialog, setOpenDialog] = useState(false);

  const handleClickOpenDialog = () => {
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  const deleteFiles = async () => {
    if (Array.isArray(selectedRows) && selectedRows.length > 0) {
      try {
        let response = await ApiService.ValidationTestDelete({
          ids: selectedRows,
        });
        setOpenDialog(false);
        returnVal(response.data);
        setSnack({
          message: "Successfully deleted",
          open: true,
          colour: "success",
        });
      } catch (error) {
        setSnack({ message: error?.message, open: true, colour: "error" });
      }
    } else {
      setSnack({
        message: "Somthing went wrong!!",
        open: true,
        colour: "error",
      });
      setOpenDialog(false);
    }
  };

  return (
    <Toolbar
      sx={{
        minHeight: { xs: 35 },
        pl: { sm: 2 },
        pr: { xs: 1, sm: 1 },
        py: { xs: 0 },
        ...(numSelected > 0 && {
          bgcolor: (theme) =>
            alpha(
              theme.palette.primary.main,
              theme.palette.action.activatedOpacity
            ),
        }),
      }}
    >
      {numSelected > 0 ? (
        <Typography
          sx={{ flex: "1 1 100%" }}
          color="inherit"
          variant="subtitle1"
          component="div"
        >
          {numSelected} selected
        </Typography>
      ) : (
        ""
      )}

      {numSelected > 0 && (
        <>
          <Tooltip title="Delete">
            <IconButton size="small" onClick={handleClickOpenDialog}>
              <DeleteIcon />
            </IconButton>
          </Tooltip>
          <PopUpScheduler
            dropDownData={rows}
            selected={selectedRows}
            icon={<AccessTimeIcon />}
            type={"icon"}
          />
          <PipeLinePopUpScheduler
            dropDownData={rows}
            icon={<AllInclusiveOutlinedIcon />}
            selected={selectedRows}
            type={"icon"}
          />
        </>
      )}
      <Dialog
        className={classes.dialogCus}
        open={openDialog}
        onClose={handleCloseDialog}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle variant="h6" id="alert-dialog-title">
          {"Are you sure want to delete?"}
        </DialogTitle>

        <DialogActions>
          <Button
            variant="outlined"
            color="error"
            size="small"
            onClick={handleCloseDialog}
          >
            No
          </Button>
          <Button
            variant="outlined"
            size="small"
            onClick={() => {
              deleteFiles();
            }}
            autoFocus
          >
            Yes
          </Button>
        </DialogActions>
      </Dialog>
    </Toolbar>
  );
};

EnhancedTableToolbar.propTypes = {
  numSelected: PropTypes.number.isRequired,
};

function ActionsCell(props) {
  const row = props.data;
  return (
    <>
      {row.TestType === "Comparison" && (
        <Link title="Edit" to={{ pathname: `/edit/validation/${row._id}` }}>
          <IconButton color="success" size="small">
            <EditOutlinedIcon />
          </IconButton>
        </Link>
      )}

      {(row.TestType === "Single File" || row.TestType === "Single API") && (
        <Link
          title="Edit"
          to={{
            pathname: `/edit/files/validations/${row?.ConnectionId}/${row._id}`,
          }}
        >
          <IconButton color="success" size="small">
            <EditOutlinedIcon />
          </IconButton>
        </Link>
      )}

      {row.TestType === "Single Database" && (
        <Link
          title="Edit"
          to={{
            pathname: `/edit/connection/data-validation/${row?.ConnectionId}/${row._id}`,
          }}
        >
          <IconButton color="success" size="small">
            <EditOutlinedIcon />
          </IconButton>
        </Link>
      )}

      <IconButton
        title="Preview"
        onClick={() => props.colDef.previewCall(row)}
        size="small"
        color="secondary"
      >
        <VisibilityOutlinedIcon fontSize="12px" />
      </IconButton>
      <IconButton
        title="Execute"
        onClick={() => {
          props.colDef.excuteTest(row._id, props.node);
        }}
        size="small"
        color="primary"
      >
        <NotStartedSharpIcon fontSize="12px" />
      </IconButton>
      <IconButton
        title="Results"
        onClick={() => {
          props.colDef.showResultsPreview(row._id);
        }}
        size="small"
        color="warning"
      >
        <AnalyticsIcon fontSize="12px" />
      </IconButton>
    </>
  );
}
export default function DataValidationsList() {
  const gridRef = useRef();
  const connectionsGridRef = useRef();
  const { setSnack } = useContext(SnackbarContext);
  const ScrollRef = useRef();
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);

  const classes = tableStyles();
  const sideMenu = sideUseStyles();

  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const [selected, setSelected] = useState([]);
  const [page, setPage] = useState(0);

  const [dataSources, setdataSources] = useState([]);
  const [rows, setRows] = useState([]);

  const [rowsPerPage, setRowsPerPage] = useState(5);

  const [connectionPreviewId, setconnectionPreviewId] = useState();

  const [preview, setPreview] = useState(false);
  const [previewId, setPreviewId] = useState();
  const [previewData, setpreviewData] = useState();

  const [showResult, setShowResult] = useState(false);
  const [showResultType, setShowResultType] = useState(null);
  const [type, setType] = useState("All");

  const [resultValidation, setResultValidation] = useState({});
  const [loader, setLoader] = useState(false);

  const handleClick1 = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const AutoScroll = () => {
    setTimeout(() => {
      ScrollRef.current.scrollIntoView({
        behavior: "smooth",
        block: "end",
        inline: "nearest",
      });
    }, 600);
  };

  useMemo(() => {
    if (searchParams.get("type")) {
      setType(searchParams.get("type"));
    }
  }, []);

  useEffect(() => {
    (async () => {
      setSelected([]);
      try {
        let response = await ApiService.testHubDataSources();
        setdataSources(response?.data?.data);
      } catch (error) {
        setSnack({ message: error?.message, open: true, colour: "error" });
      }
    })();
  }, [type, rowsPerPage, page]);

  const getTestsLists = async (data) => {
    setSelected([]);
    setPreviewId();
    setPreview(false);
    setShowResult(false);
    if (data.UsedInTests.length === 0) {
      setRows([]);
      setconnectionPreviewId();
      return;
    }
    setpreviewData(data);
    try {
      let response = await ApiService.GetDataValidations({
        ConnectionId: data.id,
      });
      setRows(response?.data?.data);
      setconnectionPreviewId(data.id);
      AutoScroll();
    } catch (error) {
      setSnack({ message: error?.message, open: true, colour: "error" });
    }
  };

  const excuteTest = async (row, rowNode) => {
    gridRef.current.api.deselectAll();
    setLoader(true);
    setPreview(false);
    setShowResult(false);
    setShowResultType(null);

    try {
      let response = await ApiService.ExcuteTestValidation(row);
      setLoader(false);
      if (response.data.error) {
        setSnack({
          message: "DQ Rule not executed",
          open: true,
          colour: "error",
        });
      } else {
        rowNode.setDataValue(
          "LastExecution",
          response.data.validationResult[0].DateTime
        );
        setResultValidation(response.data);
        setShowResult(true);
        setShowResultType("execution");
        setSnack({
          message: "DQ Rule Executed Successfully",
          open: true,
          colour: "success",
        });
        AutoScroll();
      }
    } catch (error) {
      setLoader(false);
      setSnack({ message: error?.message, open: true, colour: "error" });
    }
  };

  const ClosePreview = () => {
    setRows([]);
    setPreview(false);
    setPreviewId();
    setShowResult(false);
    setconnectionPreviewId();
  };

  const ClickPreviewConnection = (row) => {
    gridRef.current.api.deselectAll();
    setSelected([]);
    setPreview(true);
    setPreviewId(row._id);
    setShowResult(false);
    AutoScroll();
  };

  const showResultsPreview = async (row) => {
    setLoader(true);
    setShowResult(false);
    setPreview(false);
    setShowResultType(null);
    try {
      let response = await ApiService.getTestResultsWithIds({ testIds: [row] });
      setResultValidation(response.data[0]);
      setShowResult(true);
      setShowResultType("result");
      setLoader(false);
      gridRef.current.api.deselectAll();
      AutoScroll();
    } catch (error) {
      setSnack({ message: error?.message, open: true, colour: "error" });
      setLoader(false);
    }
  };

  useMemo(() => {
    if (searchParams.get("viewResultId")) {
      showResultsPreview(searchParams.get("viewResultId"));
    }
  }, [searchParams.get("viewResultId")]);

  const action = {
    headerName: "Actions",
    sortable: false,
    cellRenderer: ActionsCell,
    previewCall: ClickPreviewConnection,
    showResultsPreview: showResultsPreview,
    excuteTest: excuteTest,
    lockPosition: "right",
    cellClass: "locked-col",
    suppressColumnsToolPanel: true,
    filter: false,
  };

  useMemo(() => {
    headCellss[headCellss.length - 1] = action;
  }, []);

  return (
    <Box sx={{ width: "100%" }} className={classes.tableCus} ref={ScrollRef}>
      <InnerHeader name={"Data Quality Rules - Data Sources"} />
      <Box sx={{ width: "100%", mb: 2 }}>
        <Box component="form" noValidate autoComplete="off">
          <Box className="createBtn">
            <FormControl size="small">
              <Button size="small" variant="outlined" onClick={handleClick1}>
                Create DQ Rule
              </Button>
            </FormControl>
            <Menu
              className={sideMenu.sidemenuUI}
              id="basic-menu"
              anchorEl={anchorEl}
              open={open}
              onClose={handleClose}
              MenuListProps={{
                "aria-labelledby": "basic-button",
              }}
              sx={{
                "& .MuiMenuItem-root": {
                  p: 0,
                  "& a": {
                    padding: "4px 10px",
                    width: "100%",
                  },
                },
              }}
            >
              <MenuItem onClick={handleClose}>
                <Link to="/singleapi">Single API</Link>
              </MenuItem>
              <MenuItem onClick={handleClose}>
                <Link to="/singlefile">Single File</Link>
              </MenuItem>
              <MenuItem onClick={handleClose}>
                <Link to="/singledatabase">Single Database</Link>
              </MenuItem>
              <MenuItem onClick={handleClose}>
                <Link to="/validations">Comparison</Link>
              </MenuItem>
            </Menu>
          </Box>
          <CustomAgGrid
            gridRef={connectionsGridRef}
            ClosePreview={ClosePreview}
            previewId={connectionPreviewId}
            setSelected={setSelected}
            headCells={testHubCells}
            rows={dataSources}
            context={{
              getTestsLists: getTestsLists,
            }}
          />
        </Box>
        {rows.length > 0 && (
          <Paper className="noTestsDetails">
            <Box className="innerSubHead">
              <Grid container alignItems="center" justify="center">
                <Grid sm={2} item>
                  <Typography variant="h6">
                    No. of Tests: [{previewData.UsedInTests.length}]{" "}
                  </Typography>
                </Grid>
                <Grid align="center" sm={8} item>
                  <Grid container>
                    <Grid item xs>
                      <Box>
                        <Typography variant="bold">
                          {" "}
                          Data Source Name:{" "}
                        </Typography>
                        <Typography>{previewData.connectionName} </Typography>
                      </Box>
                    </Grid>
                    <Grid item xs>
                      <Box>
                        <Typography variant="bold">
                          {" "}
                          Data Source Group:{" "}
                        </Typography>
                        <Typography>
                          {previewData.DataSourceCategory}
                        </Typography>
                      </Box>
                    </Grid>
                    <Grid item xs>
                      <Box>
                        <Typography variant="bold">
                          {" "}
                          Data Source Type:{" "}
                        </Typography>
                        <Typography> {previewData.connectionType}</Typography>
                      </Box>
                    </Grid>
                  </Grid>
                </Grid>
                <Grid sm={2} textAlign="right" item>
                  <IconButton onClick={ClosePreview} size="small" color="error">
                    <CancelOutlinedIcon />
                  </IconButton>
                </Grid>
              </Grid>
            </Box>

            <Box sx={{ padding: "0px 10px 10px" }}>
              <Box className="createBtn">
                {selected.length !== 0 && (
                  <EnhancedTableToolbar
                    selectedRows={selected}
                    numSelected={selected.length}
                    rows={rows}
                    returnVal={(val) => {
                      setPage(val.rows.page);
                      setRows(val.rows.data);
                      setRowsPerPage(val.rows.rowsPerPage);
                      setSelected([]);
                    }}
                  />
                )}
              </Box>
              <CustomAgGrid
                gridRef={gridRef}
                ClosePreview={() => {
                  setPreview(false);
                  setPreviewId();
                  setShowResult(false);
                }}
                previewId={previewId}
                headCells={headCellss}
                setSelected={setSelected}
                rows={rows}
              />
            </Box>
          </Paper>
        )}
      </Box>
      {loader && <SkeletonLoader />}
      {preview && (
        <Paper>
          <PreviewValidationData
            AutoScroll={AutoScroll}
            connection={previewId}
            returnVal={(res) => {
              setPreview(false);
              setPreviewId();
            }}
          />
        </Paper>
      )}
      <Box>
        {showResult &&
          resultValidation.validationDetails &&
          (resultValidation.validationDetails.TestType === "Single File" ||
            resultValidation.validationDetails.TestType === "Single API") && (
            <DatabaseFileValidationList
              AutoScroll={AutoScroll}
              resultValidation={resultValidation}
              showResultType={showResultType}
            />
          )}
        {showResult &&
          resultValidation.validationDetails &&
          resultValidation.validationDetails.TestType === "Single Database" && (
            <DatabaseFileValidationList
              AutoScroll={AutoScroll}
              resultValidation={resultValidation}
              showResultType={showResultType}
            />
          )}
        {showResult &&
          resultValidation.validationDetails &&
          resultValidation.validationDetails.TestType === "Comparison" && (
            <ComparativeTestResult
              AutoScroll={AutoScroll}
              resultValidation={resultValidation}
              showResultType={showResultType}
              returnVal={(res) => {
                setPreview(false);
                setShowResult(res);
              }}
            />
          )}
      </Box>
    </Box>
  );
}
