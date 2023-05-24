import { AgGridReact } from "ag-grid-react";
import { useCallback, useEffect, useMemo, useState } from "react";
import { mdiFilterRemove } from "@mdi/js";
import Icon from "@mdi/react";
import {
  Box,
  FormControl,
  Grid,
  IconButton,
  MenuItem,
  Paper,
  Select,
  Tooltip,
} from "@mui/material";
import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-balham.css";

export function CustomAgGrid(props) {
  const {
    gridRef,
    ClosePreview,
    setSelected,
    rows,
    headCells,
    context,
    previewId,
  } = props;
  const [pageSize, setpageSize] = useState(10);
  const [resetStatus, setresetStatus] = useState([]);

  const defaultColDef = useMemo(() => {
    return {
      resizable: true,
    };
  }, []);

  const gridOptions = {
    context: context,
    suppressCellSelection: true,
    isRowSelectable: (rowNode) => {
      return rowNode.data?.UsedInTests?.length > 0 ? false : true;
    },
  };

  const rowClassRules = useMemo(() => {
    return {
      // row style function
      "preview-highlight": (params) => {
        return params.data.preview ? params.data.preview : false;
      },
    };
  }, []);

  useEffect(() => {
    if (previewId) {
      let itemsToUpdate = [];
      gridRef.current.api.forEachNode(function (rowNode) {
        let data = rowNode.data;
        if (data.id === previewId || data._id === previewId) {
          data["preview"] = true;
        } else {
          data["preview"] = false;
        }
        itemsToUpdate.push(data);
      });
      gridRef.current.api.applyTransaction({ update: itemsToUpdate });
    } else if (gridRef && gridRef.current && gridRef.current.api) {
      let itemsToUpdate = [];
      gridRef.current.api.forEachNode(function (rowNode) {
        let data = rowNode.data;
        data["preview"] = false;
        itemsToUpdate.push(data);
      });
      gridRef.current.api.applyTransaction({ update: itemsToUpdate });
    }
  }, [previewId]);

  //on selection change
  const onSelectionChanged = useCallback((e) => {
    let currentPage = gridRef.current.api.paginationGetCurrentPage();
    let pageSize = gridRef.current.api.paginationGetPageSize();
    let selectedRows = gridRef.current.api.rowModel.rowsToDisplay
      .slice(currentPage * pageSize, pageSize * (currentPage + 1))
      .filter((node) => node.isSelected())
      .map((node) => node.data);
    let selected = selectedRows.map((obj) => (obj._id ? obj._id : obj.id));
    setSelected(selected);
  }, []);

   // on clear filter
   const clearFilters = useCallback((e) => {
    gridRef.current.api.setFilterModel(null);
  }, []);

  // on filter change
  const onFilterChanged = useCallback((e) => {
    let data = Object.keys(gridRef.current.api.getFilterModel());
    setresetStatus(data);
    ClosePreview();
    gridRef.current.api.hideOverlay();
    gridRef.current.api.deselectAll();
    if (gridRef.current.api.rowModel.rowsToDisplay.length === 0) {
      gridRef.current.api.showNoRowsOverlay();
    }
  }, []);

  const onFirstDataRendered = useCallback((params) => {
    gridRef.current.api.sizeColumnsToFit();
  }, []);

  const onPageSizeChanged = useCallback((e) => {
    let value = e.target.value;
    setpageSize(value);
    gridRef.current.api.paginationSetPageSize(Number(value));
  }, []);

  const onPaginationChanged = useCallback((e) => {
    e.api.deselectAll();
  }, []);

  const onGridSizeChanged = (params) => {
    params.api.sizeColumnsToFit();
  };

  return (
    <>
      <Box className="refreshBtn">
        <IconButton
          color="error"
          size="small"
          variant="oulined"
          onClick={clearFilters}
          disabled={resetStatus.length === 0}
        >
          <Tooltip title="Clear Filters" placement="right">
            <Icon path={mdiFilterRemove} size={0.5} />
          </Tooltip>
        </IconButton>
      </Box>
      <Grid container>
        <Grid sm={12} item>
          <Box className="ag-theme-balham">
            <Box position="relative">
              <Paper>
                <AgGridReact
                  ref={gridRef}
                  rowData={rows}
                  onSelectionChanged={onSelectionChanged}
                  columnDefs={headCells}
                  animateRows={true}
                  rowClassRules={rowClassRules}
                  defaultColDef={defaultColDef}
                  onFilterChanged={onFilterChanged}
                  onSortChanged={ClosePreview}
                  rowSelection="multiple"
                  suppressRowClickSelection={true}
                  gridOptions={gridOptions}
                  paginationPageSize={10}
                  pagination={true}
                  onFirstDataRendered={onFirstDataRendered}
                  onPaginationChanged={onPaginationChanged}
                  onGridSizeChanged={onGridSizeChanged}
                ></AgGridReact>
                <FormControl className="rowsDisplay" fullWidth size="small">
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={pageSize}
                    onChange={onPageSizeChanged}
                  >
                    <MenuItem value={10}>10</MenuItem>
                    <MenuItem value={25}>25</MenuItem>
                    <MenuItem value={50}>50</MenuItem>
                    <MenuItem value={100}>100</MenuItem>
                  </Select>
                </FormControl>
              </Paper>
            </Box>
          </Box>
        </Grid>
      </Grid>
    </>
  );
}
