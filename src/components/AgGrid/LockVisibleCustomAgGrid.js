import { mdiFilterRemove } from "@mdi/js";
import Icon from "@mdi/react";
import {
  Box,
  Button,
  FormControl,
  Grid,
  IconButton,
  MenuItem,
  Paper,
  Select,
  Tooltip,
} from "@mui/material";
import "ag-grid-enterprise";
import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-balham.css";
import "../Styles";
import { AgGridReact } from "ag-grid-react";
import React, { useCallback, useMemo, useState } from "react";
import "../Styles";

const LockVisibleCustomAgGrid = (props) => {
  const { gridRef, data, highLightColumn, errorColumn } = props;

  const [pageSize, setpageSize] = useState(10);
  const [resetStatus, setresetStatus] = useState([]);

  const headCells = [];
  const sideBar = useMemo(() => {
    return {
      toolPanels: [
        {
          id: "columns",
          labelDefault: "Columns",
          labelKey: "columns",
          iconKey: "columns",
          toolPanel: "agColumnsToolPanel",
          toolPanelParams: {
            suppressRowGroups: true,
            suppressValues: true,
            suppressPivots: true,
            suppressPivotMode: true,
          },
        },
      ],
    };
  }, []);

  const gridOptions = useMemo(() => {
    return {
      defaultColDef: {
        sortable: true,
        filter: "agTextColumnFilter",
        resizable: true,
        minWidth: 100,
      },
      columnDefs: headCells,
    };
  }, []);

  const ExportCSV = useCallback(() => {
    gridRef.current.api.exportDataAsCsv({ onlySelected: true });
  }, []);

  // on filter change
  const onFilterChanged = useCallback((e) => {
    var data = Object.keys(gridRef.current.api.getFilterModel());
    setresetStatus(data);
    gridRef.current.api.hideOverlay();
    gridRef.current.api.deselectAll();
    if (gridRef.current.api.rowModel.rowsToDisplay.length === 0) {
      gridRef.current.api.showNoRowsOverlay();
    }
  }, []);

  // on clear filter
  const clearFilters = useCallback((e) => {
    gridRef.current.api.setFilterModel(null);
  }, []);

  const onPageSizeChanged = useCallback((e) => {
    var value = e.target.value;
    setpageSize(value);
    gridRef.current.api.paginationSetPageSize(Number(value));
  }, []);

  const onGridSizeChanged = (params) => {
    params.api.sizeColumnsToFit();
  };

  const onPaginationChanged = useCallback((e) => {
    e.api.deselectAll();
  }, []);

  const onFirstDataRendered = useCallback((params) => {
    gridRef.current.api.sizeColumnsToFit();
  }, []);

  const onGridReady = useCallback((params) => {
    dynamicallyConfigureColumnsFromObject();
  }, []);

  function dynamicallyConfigureColumnsFromObject(anObject) {
    const colDefs = gridOptions.api.getColumnDefs();
    colDefs.length = 0;
    const keys = Object.keys(data[0]);
    keys.forEach((key) => {
      if (highLightColumn?.columns.includes(key)) {
        let color = highLightColumn.color;
        colDefs.push({
          field: key,
          cellStyle: { color },
          headerClass: "highlight-header",
        });
      } else if (errorColumn?.columns.includes(key)) {
        let color = errorColumn?.color;
        colDefs.push({
          field: key,
          cellStyle: { color },
          headerClass: "error-header",
          lockVisible: true,
        });
      } else {
        colDefs.push({ field: key });
      }
    });
    colDefs.push({
      sortable: false,
      headerCheckboxSelection: true,
      checkboxSelection: true,
      maxWidth: 50,
      lockPosition: "right",
      cellClass: "locked-col",
      suppressColumnsToolPanel: true,
      suppressMovable: true,
      filter: false,
    });
    gridOptions.api.setColumnDefs(colDefs);
  }

  return (
    <React.Fragment>
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
      <Button
        sx={{ float: "right" }}
        onClick={ExportCSV}
        variant="outlined"
        size="small"
      >
        Export to CSV
      </Button>

      <Grid container>
        <Grid sm={12} item>
          <Box className="ag-theme-balham">
            <Box position="relative">
              <Paper>
                <AgGridReact
                  ref={gridRef}
                  rowData={data}
                  onFilterChanged={onFilterChanged}
                  animateRows={true}
                  gridOptions={gridOptions}
                  columnDefs={headCells}
                  sideBar={sideBar}
                  paginationPageSize={10}
                  pagination={true}
                  rowSelection="multiple"
                  onGridReady={onGridReady}
                  onFirstDataRendered={onFirstDataRendered}
                  onPaginationChanged={onPaginationChanged}
                  onGridSizeChanged={onGridSizeChanged}
                  onDisplayedColumnsChanged={onGridSizeChanged}
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
    </React.Fragment>
  );
};

export default LockVisibleCustomAgGrid;
