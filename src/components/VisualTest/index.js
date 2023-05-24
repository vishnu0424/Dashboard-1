import { Box } from "@mui/material";
import { useContext, useEffect, useRef, useState } from "react";
import { SnackbarContext } from "../../App";
import appService from "../../services/app.service";
import { CustomAgGrid } from "../AgGrid";
import InnerHeader from "../InnerHeader";
import SkeletonLoader from "../SkeletonLoader";
import { tableStyles } from "../Styles";
import SelectDeleted from "../Tables/SelectDeleted";
import { CreateTest } from "./CreateTest";
import { headCells } from "./HeadCells";
import TestPreview from "./TestPreview";
import VisualTestResults from "./VisualTestResults";

export default function VisualTest() {
  const classes = tableStyles();
  const gridRef = useRef();
  const ScrollRef = useRef();
  const { setSnack } = useContext(SnackbarContext);
  const [selected, setSelected] = useState([]);
  const [openDialog, setOpenDialog] = useState(false);
  const [TableData, setTableData] = useState([]);
  const [previewObj, setPreviewObj] = useState();
  const [selectedId, setselectedId] = useState();
  const [outPut, setOutPut] = useState();
  const [Loader, setLoader] = useState(false);
  const [Result, setResult] = useState([]);

  const AutoScroll = () => {
    setTimeout(() => {
      ScrollRef.current.scrollIntoView({
        behavior: "smooth",
        block: "end",
        inline: "nearest",
      });
    }, 600);
  };

  useEffect(() => {
    fetchList();
  }, []);

  const ClosePreview = () => {
    setselectedId();
    setPreviewObj();
    CloseResults();
  };

  const CloseResults = () => {
    setResult([]);
    setOutPut();
    setselectedId();
  };

  const ShowPreview = (obj) => {
    CloseResults();
    setPreviewObj(obj);
    setselectedId(obj._id);
    AutoScroll();
  };

  const fetchList = async () => {
    try {
      let response = await appService.getVisualTestList();
      setSelected([]);
      setTableData(response?.data?.data);
    } catch (error) {
      setSnack({ message: error?.message, open: true, colour: "error" });
    }
  };

  const deleteTest = async () => {
    ClosePreview();
    try {
      await appService.deleteVisualTest({ ids: selected });
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

  const excuteTest = async (id) => {
    ClosePreview();
    setLoader(true);
    setselectedId(id);
    try {
      let res = await appService.executeTest(id);
      setLoader(false);
      setOutPut(res?.data);
    } catch (err) {
      setLoader(false);
      console.log(err);
    }
  };

  const viewResults = async (id) => {
    ClosePreview();
    setselectedId(id);
    try {
      let res = await appService.viewVisualTestResults(id);
      setResult(res?.data);
      setLoader(false);
      AutoScroll();
    } catch (error) {
      setLoader(false);
    }
  };
  return (
    <Box sx={{ width: "100%" }} className={classes.tableCus}>
      <InnerHeader name={"Visual Test"} />
      <Box sx={{ width: "100%", mb: 2 }}>
        <Box component="form" noValidate autoComplete="off">
          <Box className="createBtn">
            {selected.length !== 0 && (
              <SelectDeleted
                numSelected={selected.length}
                deleteFun={deleteTest}
                openDialog={openDialog}
                setOpenDialog={setOpenDialog}
              />
            )}
            {selected.length === 0 && (
              <CreateTest returnValue={fetchList} ClosePreview={ClosePreview} />
            )}
          </Box>
          <CustomAgGrid
            previewId={selectedId}
            gridRef={gridRef}
            ClosePreview={ClosePreview}
            setSelected={setSelected}
            headCells={headCells}
            rows={TableData}
            context={{
              excuteTest: excuteTest,
              viewResults: viewResults,
              ShowPreview: ShowPreview,
              fetchList: fetchList,
            }}
          />
        </Box>
      </Box>
      {previewObj && (
        <TestPreview
          previewObj={previewObj}
          ClosePreview={ClosePreview}
          setOutPut={setOutPut}
          setResult={setResult}
          ScrollRef={ScrollRef}
        />
      )}
      {Loader && <SkeletonLoader />}

      {!Loader && (
        <VisualTestResults
          Result={Result}
          outPut={outPut}
          setOutPut={setOutPut}
          CloseResults={CloseResults}
          setselectedId={setselectedId}
          ScrollRef={ScrollRef}
        />
      )}
    </Box>
  );
}
