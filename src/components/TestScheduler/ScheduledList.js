import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import { Box, IconButton, Paper, Tooltip } from "@mui/material";
import { useContext, useEffect, useMemo, useRef, useState } from "react";
import { SnackbarContext } from "../../App";
import ApiService from "../../services/app.service";
import { CustomAgGrid } from "../AgGrid";
import InnerHeader from "../InnerHeader";
import { tableStyles } from "../Styles";
import SelectDeleted from "../Tables/SelectDeleted";
import PopUpScheduler from "./PopUpScheduler";
import EditPopUpScheduler from "./PopUpSchedulerEdit";
import PreviewSchedulerData from "./PreviewTests";
import { headCellss } from "./TestSchedulerModel";

export default function ScheduledList() {
  const { setSnack } = useContext(SnackbarContext);
  const gridRef = useRef();
  const classes = tableStyles();
  const ScrollRef = useRef();
  const [responseData, setresponseData] = useState();
  const [openDialog, setOpenDialog] = useState(false);
  const [previewData, setPreviewData] = useState([]);
  const [selectedObj, setSelectedObj] = useState({});
  const [selected, setSelected] = useState([]);

  const ClosePreview = () => {
    setPreviewData([]);
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

    async function fetchList() {
    setPreviewData([]);
    try {
      let response = await ApiService.getScheduledList();
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
      await ApiService.deleteScheduledTest({ ids: selected });
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
    setSelectedObj(obj);
    try {
      let response = await ApiService.GetDataValidations({
        schedulerId: obj._id,
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
        <EditPopUpScheduler obj={row} fetchList={props.colDef.fetchList} />

        <Tooltip title="Preview" placement="top-end" arrow>
          <IconButton
            onClick={() => props.colDef.previewTests(row)}
            size="small"
            color="secondary"
          >
            <VisibilityOutlinedIcon fontSize="12px" />
          </IconButton>
        </Tooltip>
      </>
    );
  }

  return (
    <Box sx={{ width: "100%" }} className={classes.tableCus}>
      <InnerHeader name={"Schedule DQ Rules"} />
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
              <PopUpScheduler
                icon={"Create New Execution Schedule for DQ Rules"}
                fetchList={fetchList}
              />
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
      {previewData.length !== 0 && (
        <Paper ref={ScrollRef}>
          <PreviewSchedulerData
            ClosePreview={ClosePreview}
            data={previewData}
            obj={selectedObj}
            ScrollRef={ScrollRef}
            AutoScroll={autoScroll}
          />
        </Paper>
      )}
    </Box>
  );
}
