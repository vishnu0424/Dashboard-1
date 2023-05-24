import DeleteIcon from "@mui/icons-material/Delete";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import FactCheckOutlinedIcon from "@mui/icons-material/FactCheckOutlined";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogTitle,
  IconButton,
  Paper,
  Toolbar,
  Tooltip,
  Typography,
} from "@mui/material";
import { alpha } from "@mui/material/styles";
import PropTypes from "prop-types";
import { useContext, useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { SnackbarContext } from "../../App";
import ApiService from "../../services/app.service";
import { CustomAgGrid } from "../AgGrid";
import { PopUp } from "../Connection/List/PopUp";
import CustomizedTreeView from "../JsonFile";
import { tableStyles } from "../Styles";
import { headCells, webAppHeadCells } from "./Model";
import PreviewFiles from "./preview";

const EnhancedTableToolbar = (props) => {
  const { numSelected, selectedRows, dataName, returnVal } = props;
  const [openDialog, setOpenDialog] = useState(false);
  const { setSnack } = useContext(SnackbarContext);
  const handleClickOpenDialog = () => {
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };
  const deleteFiles = async () => {
    if (Array.isArray(selectedRows) && selectedRows.length > 0) {
      try {
        let response = await ApiService.deleteFiles({ ids: selectedRows });
        setOpenDialog(false);
        returnVal(response?.data);
        setSnack({
          message: "File deleted successfully",
          open: true,
          colour: "success",
        });
      } catch (error) {
        alert("Failed to connect to the database");
      }
    } else {
      alert("Somthing went wrong!!");
      setOpenDialog(false);
    }
  };

  const DeleteConections = async () => {
    if (Array.isArray(selectedRows) && selectedRows.length > 0) {
      try {
        let response = await ApiService.ConnectionDelete({ ids: selectedRows });
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

  const classes = tableStyles();

  return (
    <Toolbar
      sx={{
        minHeight: { xs: 35 },
        pl: { sm: 2 },
        pr: { xs: 1, sm: 1 },
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

      {numSelected > 0 ? (
        <Tooltip title="Delete">
          <IconButton size="small" onClick={handleClickOpenDialog}>
            <DeleteIcon />
          </IconButton>
        </Tooltip>
      ) : (
        <></>
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
            size="small"
            onClick={() => {
              if (dataName === "Web App") {
                DeleteConections();
              } else {
                deleteFiles();
              }
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

export function FilesDataList({
  ScrollRef,
  selected,
  setRows,
  setSelected,
  getDataSources,
  search,
  loadFiles,
  gridRef,
  rows,
  dataName,
}) {
  const [preview, setPreview] = useState(false);
  const [previewId, setPreviewId] = useState(0);

  // cell render for action
  function ActionsCell(props) {
    const row = props.data;
    return (
      <>
        {row.connectionType === "Web App" && (
          <PopUp
            key={row.id}
            setPreview={setPreview}
            connectionType={row.connectionType}
            type="Edit"
            name={
              <IconButton color="success" size="small">
                <Tooltip title="Edit" placement="top" arrow>
                  <EditOutlinedIcon />
                </Tooltip>
              </IconButton>
            }
            connectionData={props.data}
            allRows={(val) => {
              setRows(val.rows.data);
              setSelected([]);
            }}
          />
        )}
        <IconButton
          onClick={() => props.colDef.ClickPreviewConnection(row)}
          key={row.id}
          size="small"
          color="secondary"
        >
          <Tooltip
            className={classes.TooltipTop}
            title="Preview"
            placement="top"
            arrow
          >
            <VisibilityOutlinedIcon fontSize="12px" />
          </Tooltip>
        </IconButton>
        <Link to={"/files/validations/" + row.id}>
          <IconButton
            size="small"
            color="warning"
            aria-label="add to shopping cart"
          >
            <Tooltip
              className={classes.TooltipTop}
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

  // click preview
  const ClickPreviewConnection = (row) => {
    gridRef.current.api.deselectAll();
    setSelected([]);
    setPreview(true);
    setPreviewId(row.id);
    setTimeout(() => {
      ScrollRef.current.scrollIntoView({
        behavior: "smooth",
        block: "end",
        inline: "nearest",
      });
    }, 500);
  };

  const ClosePreview = () => {
    setPreview(false);
    setPreviewId();
  };

  // actions column
  const action = {
    headerName: "Actions",
    sortable: false,
    cellRenderer: ActionsCell,
    ClickPreviewConnection: ClickPreviewConnection,
    lockPosition: "right",
    cellClass: "locked-col",
    suppressColumnsToolPanel: true,
    filter: false,
  };

  useMemo(() => {
    headCells[headCells.length - 1] = action;
    webAppHeadCells[webAppHeadCells.length - 1] = action;
  }, []);

  useEffect(() => {
    setPreview(false);
  }, [rows]);

  const classes = tableStyles();

  return (
    <Box component="form" noValidate autoComplete="off">
      <Box className="createBtn">
        <EnhancedTableToolbar
          sx={{ minHeight: "30px" }}
          selectedRows={selected}
          numSelected={selected.length}
          dataName={dataName}
          returnVal={(val) => {
            setRows([]);
            getDataSources(search);
            loadFiles();
            setSelected([]);
          }}
        />
      </Box>
      <Box sx={{ width: "100%", mb: 2 }}>
        <CustomAgGrid
          gridRef={gridRef}
          ClosePreview={ClosePreview}
          headCells={dataName === "Web App" ? webAppHeadCells : headCells}
          setSelected={setSelected}
          rows={rows}
          previewId={previewId}
        />
      </Box>
      {preview && (
        <Paper>
          {dataName === "JSON" ||
          dataName === "XML" ||
          dataName === "Web App" ? (
            <CustomizedTreeView
              ScrollRef={ScrollRef}
              connection={previewId}
              returnVal={ClosePreview}
            />
          ) : (
            <PreviewFiles
              type={"datasource"}
              connection={previewId}
              returnVal={ClosePreview}
            />
          )}
        </Paper>
      )}
    </Box>
  );
}
