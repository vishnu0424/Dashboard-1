import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import { Box, IconButton, Paper } from "@mui/material";
import React, { useContext, useEffect, useMemo, useRef, useState } from "react";
import { SnackbarContext } from "../../App";
import ApiService from "../../services/app.service";
import { CustomAgGrid } from "../AgGrid";
import InnerHeader from "../InnerHeader";
import { tableStyles } from "../Styles";
import SelectDeleted from "../Tables/SelectDeleted";
import PreviewSchedulerData from "../TestScheduler/PreviewTests";
import { headCellss } from "./Model";
import PipeLinePopUpScheduler from "./PipeLine";
import EditPopUpPipeLine from "./PipeLineEdit";

export default function PipeLineList() {
  const gridRef = useRef();
  const [responseData, setresponseData] = useState();
  const [openDialog, setOpenDialog] = useState(false);
  const [previewData, setPreviewData] = useState([]);
  const [previewId, setPreviewId] = useState();
  const [selectedObj, setSelectedObj] = useState({});
  const [selected, setSelected] = useState([]);
  const ScrollRef = useRef();

  const { setSnack } = useContext(SnackbarContext);

  const classes = tableStyles();

  const ClosePreview = () => {
    setPreviewData([]);
    setPreviewId();
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

  async function fetchList() {
    setPreviewData([]);
    setPreviewId();
    try {
      let response = await ApiService.getPipeLinesList();
      setSelected([]);
      setresponseData(response?.data);
    } catch (error) {
      setSnack({ message: error?.message, open: true, colour: "error" });
    }
  }

  useEffect(() => {
    fetchList();
  }, []);

  const deleteScheduled = async () => {
    try {
      await ApiService.deletePipeLine({ ids: selected });
      setOpenDialog(false);
      fetchList();
      setSnack({
        message: "Successfully deleted",
        open: true,
        colour: "success",
      });
    } catch (error) {
      setSnack({ message: error?.message, open: true, colour: "error" });
    }
  };

  const previewTests = async (obj) => {
    gridRef.current.api.deselectAll();
    setPreviewId(obj._id);
    setSelectedObj(obj);
    try {
      let response = await ApiService.GetDataValidations({
        pipelineId: obj._id,
      });
      setPreviewData(response?.data?.data);
      autoScroll();
    } catch (error) {
      setSnack({ message: error?.message, open: true, colour: "error" });
    }
  };

  const action = {
    headerName: "Actions",
    sortable: false,
    cellRenderer: ActionsCell,
    fetchList: fetchList,
    previewTests: previewTests,
    lockPosition: "right",
    cellClass: "locked-col",
    suppressColumnsToolPanel: true,
    filter: false,
  };

  useMemo(() => {
    headCellss[headCellss.length - 1] = action;
  }, []);

  function ActionsCell(props) {
    const row = props.data;
    return (
      <React.Fragment>
        <EditPopUpPipeLine obj={row} fetchList={props.colDef.fetchList} />

        <IconButton
          title="Preview"
          onClick={() => props.colDef.previewTests(row)}
          size="small"
          color="secondary"
        >
          <VisibilityOutlinedIcon />
        </IconButton>
      </React.Fragment>
    );
  }

  return (
    <Box sx={{ width: "100%" }} className={classes.tableCus}>
      <InnerHeader name={"CI/CD Pipelines"} />
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
              <PipeLinePopUpScheduler
                icon={
                  <Box size="small" variant="outlined">
                    Create New DevOps Connection for DQ Rules
                  </Box>
                }
                fetchList={fetchList}
              />
            )}
          </Box>
          <CustomAgGrid
            previewId={previewId}
            ClosePreview={ClosePreview}
            gridRef={gridRef}
            headCells={headCellss}
            setSelected={setSelected}
            rows={responseData?.data}
          />
        </Box>
      </Box>
      {previewData.length !== 0 && (
        <Paper>
          <PreviewSchedulerData
            data={previewData}
            setPreviewData={setPreviewData}
            setPreviewId={setPreviewId}
            ClosePreview={ClosePreview}
            ScrollRef={ScrollRef}
            autoScroll={autoScroll}
            obj={selectedObj}
          />
        </Paper>
      )}
    </Box>
  );
}
