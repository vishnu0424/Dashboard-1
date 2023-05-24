import AnalyticsIcon from "@mui/icons-material/Analytics";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import NotStartedSharpIcon from "@mui/icons-material/NotStartedSharp";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import { Box, Button, IconButton, Tooltip } from "@mui/material";
import { useContext, useEffect, useMemo, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { SnackbarContext } from "../../App";
import ApiService from "../../services/app.service";
import { CustomAgGrid } from "../AgGrid";
import InnerHeader from "../InnerHeader";
import SkeletonLoader from "../SkeletonLoader";
import { tableStyles } from "../Styles";
import SelectDeleted from "../Tables/SelectDeleted";
import { headCellss } from "./Model";
import PreviewResult from "./PreviewResult";
import PreviewAPIsList from "./PreviewTests";

export default function ApiAutomation() {
  const gridRef = useRef();
  const [responseData, setresponseData] = useState();
  const [openDialog, setOpenDialog] = useState(false);
  const [previewData, setPreviewData] = useState();
  const [previewResult, setPreviewResult] = useState();
  const [selectedObj, setSelectedObj] = useState({});
  const [selected, setSelected] = useState([]);
  const { setSnack } = useContext(SnackbarContext);
  const classes = tableStyles();
  const ScrollRef = useRef();
  const [loading, setLoading] = useState(false);
  const [resultType, setResultType] = useState("");
  const navigate = useNavigate();

  const ClosePreview = () => {
    setPreviewData({});
    setPreviewResult([]);
    setSelectedObj();
  };

  const autoScroll = () => {
    setTimeout(() => {
      ScrollRef.current.scrollIntoView({
        behavior: "smooth",
        block: "end",
        inline: "nearest",
      });
    }, 600);
  };

  useEffect(() => {
    setPreviewData({});
    fetchList();
  }, []);

  const editColllection = (row) => {
    navigate("/api-automation/edit/" + row._id);
  };

  async function executeAutomation(obj) {
    setPreviewData({});
    setPreviewResult([]);
    setLoading(true);
    try {
      let resp = await ApiService.testApiAutomation(obj._id);
      let rData = resp?.data?.ResponseObject;
      setPreviewResult([rData]);
      setResultType("execute");
      setSnack({
        message: "Successfully executed!",
        open: true,
        colour: "success",
      });
    } catch (e) {
      setSnack({
        message: "Oops..",
        open: true,
        colour: "error",
      });
    }
    setLoading(false);
  }

  async function fetchList() {
    try {
      let response = await ApiService.getApiAutomation();
      setSelected([]);
      setresponseData(response.data);
    } catch (error) {
      setSnack({ message: error.message, open: true, colour: "error" });
    }
  }

  const deleteScheduled = async () => {
    try {
      await ApiService.DeleteApiAutomation({ ids: selected });
      setOpenDialog(false);
      setSnack({
        message: "Successfully deleted",
        open: true,
        colour: "success",
      });
      fetchList();
    } catch (error) {
      setSnack({ message: error.message, open: true, colour: "error" });
    }
  };

  const previewTests = async (obj) => {
    gridRef.current.api.deselectAll();
    setPreviewData({});
    setSelectedObj(obj);
    setPreviewResult([]);
    setLoading(true);
    try {
      let response = await ApiService.getApiAutomationByid(obj._id);
      setPreviewData(response.data);
      autoScroll();
    } catch (error) {
      setSnack({ message: error.message, open: true, colour: "error" });
    }
    setLoading(false);
  };

  const executeResult = async (obj) => {
    gridRef.current.api.deselectAll();
    setPreviewData({});
    setPreviewResult([]);
    setSelectedObj();
    setLoading(true);
    try {
      let resp = await ApiService.ApiExecutionResultsByid(obj._id);
      setPreviewResult(resp.data);
      setResultType("result");
      setSnack({
        message: "Success",
        open: true,
        colour: "success",
      });
      autoScroll();
    } catch (e) {
      setSnack({
        message: "Oops..",
        open: true,
        colour: "error",
      });
    }
    setLoading(false);
  };

  const action = {
    headerName: "Actions",
    sortable: false,
    cellRenderer: ActionsCell,
    executeAutomation: executeAutomation,
    previewTests: previewTests,
    editColllection: editColllection,
    executeResult: executeResult,
    cellClass: "locked-col",
    suppressColumnsToolPanel: true,
    filter: false,
    width: 300,
  };

  useMemo(() => {
    headCellss[headCellss.length - 1] = action;
  }, []);

  function ActionsCell(props) {
    const row = props.data;
    return (
      <>
        <Tooltip title="Edit" placement="top-end" arrow>
          <IconButton
            onClick={() => props.colDef.editColllection(row)}
            size="small"
            color="secondary"
          >
            <EditOutlinedIcon fontSize="12px" />
          </IconButton>
        </Tooltip>

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
        <Tooltip title="Results" placement="top-end" arrow>
          <IconButton
            onClick={() => props.colDef.executeResult(row)}
            size="small"
            color="secondary"
          >
            <AnalyticsIcon fontSize="12px" />
          </IconButton>
        </Tooltip>
      </>
    );
  }

  return (
    <>
      <Box sx={{ width: "100%" }} className={classes.tableCus}>
        <InnerHeader name={"API Automation"} />
        <Box sx={{ width: "100%", mb: 2 }}>
          <Box component="form" noValidate autoComplete="off">
            <Box className="createBtn">
              {selected.length !== 0 && (
                <SelectDeleted
                  numSelected={selected.length}
                  deleteFun={deleteScheduled}
                  openDialog={openDialog}
                  setOpenDialog={setOpenDialog}
                />
              )}
              {selected.length === 0 && (
                <>
                  <Link to="/api-automation/create">
                    <Button size="small" variant="outlined">
                      Add
                    </Button>
                  </Link>
                </>
              )}
            </Box>
            <CustomAgGrid
              gridRef={gridRef}
              ClosePreview={ClosePreview}
              previewId={selectedObj?._id}
              headCells={headCellss}
              setSelected={setSelected}
              rows={responseData?.data}
            />
          </Box>
        </Box>
        {previewData && Object.values(previewData).length !== 0 && (
          <Box ref={ScrollRef}>
            <PreviewAPIsList
              ClosePreview={ClosePreview}
              data={previewData}
              obj={selectedObj}
              ScrollRef={ScrollRef}
              AutoScroll={autoScroll}
            />
          </Box>
        )}

        {previewResult && Object.values(previewResult).length !== 0 && (
          <Box ref={ScrollRef}>
            <PreviewResult
              ClosePreview={ClosePreview}
              data={previewResult}
              showResultType={resultType}
            />
          </Box>
        )}
        {loading && <SkeletonLoader />}
      </Box>
    </>
  );
}
