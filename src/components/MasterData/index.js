import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import {
  Box,
  Button,
  FormHelperText,
  IconButton,
  Paper,
  Typography,
} from "@mui/material";
import { useContext, useEffect, useMemo, useRef, useState } from "react";
import { SnackbarContext } from "../../App";
import ApiService from "../../services/app.service";
import { CustomAgGrid } from "../AgGrid";
import InnerHeader from "../InnerHeader";
import { tableStyles } from "../Styles";
import SelectDeleted from "../Tables/SelectDeleted";
import { masterdataheadCells } from "./MasterDataheadcells";
import MasterDataPreview from "./MasterDataPreview";
import MasterdataUpload from "./MasterDataUpload";

export default function MasterData() {

  const gridRef = useRef();
  const ScrollRef = useRef();
  const classes = tableStyles();
  const { setSnack } = useContext(SnackbarContext);

  const [responseData, setresponseData] = useState();
  const [openDialog, setOpenDialog] = useState(false);
  const [selected, setSelected] = useState([]);
  const [previewId, setPreviewId] = useState();
  const [state, setState] = useState({ right: false });

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
    setPreviewId();
    try {
      let response = await ApiService.Masterdatalist();
      setSelected([]);
      setresponseData(response.data);
    } catch (error) {
      setSnack({ message: error.message, open: true, colour: "error" });
    }
  }

  async function deleteMasterdata() {
    await ApiService.deleteMasterdata({ ids: selected });
    setOpenDialog(false);
    fetchList();
    setSnack({
      message: "Successfully deleted",
      open: true,
      colour: "success",
    });
  }

  const previewMasterdata = (obj) => {
    gridRef.current.api.deselectAll();
    setPreviewId(obj._id);
    autoScroll();
  };

  useEffect(() => {
    fetchList();
  }, []);

  const action = {
    headerName: "Actions",
    sortable: false,
    cellRenderer: ActionsCell,
    fetchList: fetchList,
    previewMasterdata: previewMasterdata,
    lockPosition: "right",
    cellClass: "locked-col",
    suppressColumnsToolPanel: true,
    filter: false,
  };

  useMemo(() => {
    masterdataheadCells[masterdataheadCells.length - 1] = action;
  }, []);

  function ActionsCell(props) {
    const row = props.data;
    return (
      <>
        <IconButton
          title="Preview"
          onClick={() => props.colDef.previewMasterdata(row)}
          size="small"
          color="secondary"
        >
          <VisibilityOutlinedIcon />
        </IconButton>
      </>
    );
  }

  const toggleDrawer = (anchor, open) => (event) => {
    if (
      event &&
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }
    setState({ ...state, [anchor]: open });
  };

  const ClosePreview = () => {
    setPreviewId();
  };

  return (
    <>
      <Box sx={{ width: "100%" }} className={classes.tableCus}>
        <InnerHeader name={"Master Data"} />
        <Box sx={{ width: "100%", mb: 2 }}>
          <Box component="form" noValidate autoComplete="off">
            <Box className="createBtn">
              {selected.length !== 0 && (
                <SelectDeleted
                  numSelected={selected.length}
                  deleteFun={deleteMasterdata}
                  openDialog={openDialog}
                  setOpenDialog={setOpenDialog}
                />
              )}
              {selected.length === 0 && (
                <MasterdataUpload
                  toggleDrawer={toggleDrawer}
                  state={state}
                  setState={setState}
                  returnValue={(val) => {}}
                  name={
                    <Button
                      size="small"
                      variant="outlined"
                      onClick={() => {
                        setState({ right: true });
                      }}
                    >
                      Upload MasterData
                    </Button>
                  }
                  fetchList={fetchList}
                />
              )}
            </Box>
            {responseData?.data.length === 0 ? (
              <Typography component={"h6"}>No Master Data Uploaded</Typography>
            ) : (
              <CustomAgGrid
                previewId={previewId}
                ClosePreview={ClosePreview}
                gridRef={gridRef}
                headCells={masterdataheadCells}
                setSelected={setSelected}
                rows={responseData?.data}
              />
            )}
          </Box>
          {responseData?.data && (
            <FormHelperText>
              Note: Master Datasets Uploaded here are used in Data Cleaning of
              Data Sources, Only Single column is accepted as Master data.
            </FormHelperText>
          )}
        </Box>
        {previewId && (
          <Paper ref={ScrollRef}>
            <MasterDataPreview
              connection={previewId}
              returnVal={ClosePreview}
            />
          </Paper>
        )}
      </Box>
    </>
  );
}
