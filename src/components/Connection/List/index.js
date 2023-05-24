import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogTitle,
  FormHelperText,
  Grid,
  IconButton,
  InputBase,
  Paper,
  ToggleButton,
  ToggleButtonGroup,
  Toolbar,
  Tooltip,
  Typography,
} from "@mui/material";
import { alpha } from "@mui/material/styles";
import PropTypes from "prop-types";
import DeleteIcon from "@mui/icons-material/Delete";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import FactCheckOutlinedIcon from "@mui/icons-material/FactCheckOutlined";
import FilterListOutlinedIcon from "@mui/icons-material/FilterListOutlined";
import SearchIcon from "@mui/icons-material/Search";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import { useEffect, useMemo, useRef, useState } from "react";
import { Link } from "react-router-dom";
import ApiService from "../../../services/app.service";
import { CustomAgGrid } from "../../AgGrid";
import PreviewConnection from "./Preview";
import { FilesDataList } from "../../Files/GridDisplay";
import InnerHeader from "../../InnerHeader";
import SkeletonLoader from "../../SkeletonLoader";
import ConnectionDBList from "./connectionDBList";
import { headCellss } from "./ConnectionModel";
import { PopUp } from "./PopUp";

const EnhancedTableToolbar = (props) => {
  const { numSelected, selectedRows, returnVal, setPreview } = props;
  const [openDialog, setOpenDialog] = useState(false);
  const handleClickOpenDialog = () => {
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  const DeleteConections = async () => {
    if (Array.isArray(selectedRows) && selectedRows.length > 0) {
      try {
        let response = await ApiService.ConnectionDelete({ ids: selectedRows });
        setPreview(false);
        returnVal(response?.data);
        setOpenDialog(false);
      } catch (error) {
        alert("Failed to connect to the database");
      }
    } else {
      alert("Somthing went wrong!!");
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
        <Typography
          sx={{ flex: "1 1 100%" }}
          variant="h6"
          id="tableTitle"
          component="div"
        ></Typography>
      )}
      {numSelected > 0 ? (
        <Tooltip title="Delete">
          <IconButton size="small" onClick={handleClickOpenDialog}>
            <DeleteIcon />
          </IconButton>
        </Tooltip>
      ) : (
        ""
      )}
      <Dialog
        className="dialogCus"
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
            size="small"
            onClick={() => {
              DeleteConections();
            }}
            autoFocus
          >
            Yes
          </Button>
          <Button
            variant="outlined"
            color="error"
            size="small"
            onClick={handleCloseDialog}
          >
            No
          </Button>
        </DialogActions>
      </Dialog>
    </Toolbar>
  );
};
EnhancedTableToolbar.propTypes = {
  numSelected: PropTypes.number.isRequired,
};

export default function Connectionlist() {
  const [selected, setSelected] = useState([]);
  const [rows, setRows] = useState([]);
  const [preview, setPreview] = useState(false);
  const [previewId, setPreviewId] = useState(0);
  const [dataType, setdataType] = useState("");

  const [loader, setLoader] = useState(false);

  const [filterSource, setfilterSource] = useState();

  const [sourceType, setSourceType] = useState([]);
  const [sources, setSources] = useState([]);
  const [search, setSearch] = useState("");
  const [dataName, setdataName] = useState();

  const gridRef = useRef();
  const FilegridRef = useRef();
  const ScrollRef = useRef();

  const AutoScroll = () => {
    setTimeout(() => {
      ScrollRef.current.scrollIntoView({
        behavior: "smooth",
        block: "end",
        inline: "nearest",
      });
    }, 600);
  };

  const handleChange = (event, newSource) => {
    if (!newSource) {
      getDataSources("");
    }
    setfilterSource(newSource);
  };

  function AgGridCheckbox(props) {
    return (
      <>
        <PopUp
          key={props.data.id}
          setPreview={setPreview}
          connectionType={props.data.connectionType}
          type="Edit"
          name={
            <IconButton color="success" size="small">
              <Tooltip
                title="Edit"
                placement="top"
                arrow
              >
                <EditOutlinedIcon />
              </Tooltip>
            </IconButton>
          }
          connectionData={props.data}
          allRows={(val) => {
            props.context.setRows(val.rows.data);
            props.context.setSelected([]);
          }}
        />
        <IconButton
          onClick={() => {
            props.context.previewCall(props.data);
          }}
          size="small"
          color="secondary"
          aria-label="add to shopping cart"
        >
          <Tooltip
            title="Preview"
            placement="top"
            arrow
          >
            <VisibilityOutlinedIcon fontSize="12px" />
          </Tooltip>
        </IconButton>
        <Link to={"/connection/data-validations/" + props.data.id}>
          <IconButton
            size="small"
            color="warning"
            aria-label="add to shopping cart"
          >
            <Tooltip
              title="Validate"
              placement="top"
              arrow
            >
              <FactCheckOutlinedIcon fontSize="12px" />
            </Tooltip>
          </IconButton>
        </Link>
      </>
    );
  }

  function loadFiles() {
    getData({ name: dataName, type: dataType });
  }

  const getData = async (obj) => {
    setPreview(false);
    setLoader(true);
    try {
      let response = await ApiService.getDataSourceByType(obj);
      let val = response?.data;
      setRows(val.data);
      AutoScroll();
    } catch (error) {
      console.log(error);
    }
    setLoader(false);
  };

  useEffect(() => {
    getDataSources("");
  }, []);

  const getDataSources = async (key) => {
    var data = { key: key };
    setSearch(key);
    setRows([]);
    try {
      let response = await ApiService.dataSources(data);
      setSources(response?.data?.sources);
      setSourceType(response?.data?.types);
    } catch (error) {
      console.log(error);
    }
  };

  const ClickPreviewConnection = (row) => {
    gridRef.current.api.deselectAll();
    setSelected([]);
    setPreview(true);
    setPreviewId(row);
    AutoScroll();
  };

  const action = {
    headerName: "Actions",
    sortable: false,
    cellRenderer: AgGridCheckbox,
    lockPosition: "right",
    cellClass: "locked-col",
    suppressColumnsToolPanel: true,
    suppressMovable: true,
    filter: false,
  };
  useMemo(() => {
    headCellss[headCellss.length - 1] = action;
  }, []);

  const handleSearch = (e) => {
    setRows([]);
    setfilterSource();
    if (e.key === "Enter") {
      e.preventDefault();
      getDataSources(e.target.value);
      setfilterSource(e.target.value);
    } else {
      if (e.target.value.length === 0) {
        getDataSources(e.target.value);
      }
      setSearch(e.target.value);
    }
  };

  const ClosePreview = () => {
    setPreview(false);
    setPreviewId();
  };

  return (
    <Box sx={{ width: "100%" }}>
      <InnerHeader name={"Data Sources"} />
      <Box>
        <Box>
          <Grid container item>
            <Grid md item></Grid>
            <Grid md={6} item>
              <Paper
                component="form"
                sx={{ p: "2px 4px", display: "flex", alignItems: "center" }}
              >
                <IconButton size="small" aria-label="menu">
                  <FilterListOutlinedIcon />
                </IconButton>
                <InputBase
                  size="small"
                  sx={{ ml: 1, flex: 1 }}
                  placeholder="search datasources here"
                  value={search}
                  onChange={handleSearch}
                  onKeyPress={handleSearch}
                  inputProps={{ "aria-label": "search datasources here" }}
                />
                <IconButton
                  type="submit"
                  size="small"
                  aria-label="search"
                  onClick={(e) => {
                    e.preventDefault();
                    getDataSources(search);
                  }}
                >
                  <SearchIcon />
                </IconButton>
              </Paper>
            </Grid>
            <Grid md item></Grid>
          </Grid>
        </Box>
        <Box className="filterBtns">
          <ToggleButtonGroup
            color="primary"
            value={filterSource}
            exclusive
            onChange={handleChange}
          >
            {sourceType.map((obj, index) => (
              <ToggleButton
                key={index}
                value={obj}
                size="small"
                onClick={() => getDataSources(obj)}
              >
                {obj}
              </ToggleButton>
            ))}
          </ToggleButtonGroup>
        </Box>
        <ConnectionDBList
          sources={sources}
          getData={getData}
          setSearch={setSearch}
          getDataSources={getDataSources}
          search={search}
          setRows={setRows}
          setSelected={setSelected}
          setdataType={setdataType}
          setdataName={setdataName}
          dataName={dataName}
          loadFiles={loadFiles}
          setPreview={setPreview}
          setPreviewId={setPreviewId}
        />
      </Box>

      {!loader && (
        <Box ref={ScrollRef}>
          {dataType !== "Files" && dataType !== "API" && rows.length > 0 && (
            <Box>
              <Box sx={{ width: "100%", mb: 2 }}>
                <Box
                  component="form"
                  sx={{ "& .MuiTextField-root": { m: 1 } }}
                  noValidate
                  autoComplete="off"
                >
                  <Box className="createBtn">
                    {selected.length > 0 && (
                      <EnhancedTableToolbar
                        selectedRows={selected}
                        numSelected={selected.length}
                        returnVal={(val) => {
                          setRows([]);
                          getDataSources(search);
                          loadFiles();
                          setSelected([]);
                        }}
                        setPreview={setPreview}
                      />
                    )}
                  </Box>
                  <CustomAgGrid
                    previewId={previewId?.id}
                    ClosePreview={ClosePreview}
                    gridRef={gridRef}
                    headCells={headCellss}
                    setSelected={setSelected}
                    rows={rows}
                    context={{
                      setRows: setRows,
                      setSelected: setSelected,
                      previewCall: ClickPreviewConnection,
                    }}
                  />
                </Box>
              </Box>
            </Box>
          )}

          {(dataType === "Files" || dataType === "API") && rows.length > 0 && (
            <FilesDataList
              ScrollRef={ScrollRef}
              selected={selected}
              setRows={setRows}
              dataName={dataName}
              setSelected={setSelected}
              getDataSources={getDataSources}
              search={search}
              loadFiles={loadFiles}
              gridRef={FilegridRef}
              rows={rows}
            />
          )}
          {preview && (
            <Paper>
              <PreviewConnection
                ScrollRef={ScrollRef}
                AutoScroll={AutoScroll}
                connection={previewId}
                returnVal={(res) => {
                  setPreview(false);
                  setPreviewId();
                }}
              />
            </Paper>
          )}
          {dataType && (
            <FormHelperText>
              Note: Data Sources that are used in existing Data Quality Rule
              cannot be deleted. For such Data Sources the selection checkbox is
              not available.
            </FormHelperText>
          )}
        </Box>
      )}
      {loader && <SkeletonLoader />}
    </Box>
  );
}
