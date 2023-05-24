import { AgGridReact } from "ag-grid-react";
import { useCallback, useRef, useState } from "react";

// import 'ag-grid-enterprise';
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
  Tooltip
} from "@mui/material";
import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-balham.css";

export function CustomHeaderAgGrid(props) {
  const gridRef = useRef();
  const { data, highLightColumn, errorColumn, Pagecount } = props;

  const [pageSize, setpageSize] = useState(Pagecount ? Pagecount : 10);
  const [resetStatus, setresetStatus] = useState([]);

  const headCells = [];

  const gridOptions = {
    defaultColDef: {
      sortable: true,
      filter: "agTextColumnFilter",
      resizable: true,
    },
    columnDefs: headCells,
    suppressCellSelection: true,
  };

  // on clear filter
  const clearFilters = useCallback((e) => {
    gridRef.current.api.setFilterModel(null);
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

  const onFirstDataRendered = useCallback((params) => {
    gridRef.current.api.sizeColumnsToFit();
  }, []);

  const onPageSizeChanged = useCallback((e) => {
    var value = e.target.value;
    setpageSize(value);
    gridRef.current.api.paginationSetPageSize(Number(value));
  }, []);

  const onPaginationChanged = useCallback((e) => {
    e.api.deselectAll();
  }, []);

  const onGridSizeChanged = (params) => {
    params.api.sizeColumnsToFit();
  };

  const onGridReady = () => {
    dynamicallyConfigureColumnsFromObject();
  };

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
          width: 500,
          headerComponent: (params) => (
            <span style={{ color: color }}>
              <b>{params.displayName}</b>
            </span>
          ),
        });
      } else if (errorColumn?.columns.includes(key)) {
        let color = errorColumn?.color;
        colDefs.push({
          field: key,
          cellStyle: { color },
          width: 500,
          headerComponent: (params) => (
            <span style={{ color: color }}>
              <b>{params.displayName}</b>
            </span>
          ),
        });
      } else {
        colDefs.push({ field: key });
      }
    });
    gridOptions.api.setColumnDefs(colDefs);
  }

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
                  rowData={data}
                  columnDefs={headCells}
                  animateRows={true}
                  onFilterChanged={onFilterChanged}
                  rowSelection="multiple"
                  suppressRowClickSelection={true}
                  gridOptions={gridOptions}
                  paginationPageSize={Pagecount ? Pagecount : 10}
                  pagination={true}
                  onFirstDataRendered={onFirstDataRendered}
                  onPaginationChanged={onPaginationChanged}
                  onGridSizeChanged={onGridSizeChanged}
                  onGridReady={onGridReady}
                ></AgGridReact>
                <FormControl className="rowsDisplay" fullWidth size="small">
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={pageSize}
                    onChange={onPageSizeChanged}
                  >
                    <MenuItem value={Pagecount}>{Pagecount}</MenuItem>
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
