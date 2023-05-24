import { Box } from "@mui/material";
import { customComparator, customNumberComparator } from "../AgGrid/CustomSort";

export const headCellss = [
  {
    sortable: false,
    headerCheckboxSelection: true,
    checkboxSelection: true,
    lockPosition: "left",
    cellClass: "locked-col",
    suppressColumnsToolPanel: true,
    suppressMovable: true,
    filter: false,
  },
  {
    field: "TestName",
    headerName: "Data Quality Rules",
    sortable: true,
    suppressColumnsToolPanel: true,
    filter: "agTextColumnFilter",
    comparator: customComparator,
  },
  {
    field: "TestType",
    headerName: "Rule Type",
    sortable: true,
    filter: "agTextColumnFilter",
    comparator: customComparator,
  },
  {
    field: "NoOfValidations",
    headerName: "Data Quality Checks",
    sortable: true,
    filter: "agTextColumnFilter",
    suppressColumnsToolPanel: true,
    suppressMovable: true,
  },
  {
    field: "LastExecution",
    headerName: "Last Executed On",
    sortable: true,
    filter: false,
    suppressMovable: true,
    comparator: customComparator,
  },
  {},
];

export const testHubCells = [
  {
    headerName: "S.No",
    valueGetter: "node.rowIndex + 1",
  },
  {
    field: "connectionName",
    headerName: "Data Source Name",
    sortable: true,
    suppressColumnsToolPanel: true,
    filter: "agTextColumnFilter",
  },
  {
    field: "DataSourceCategory",
    headerName: "Data Source Group",
    sortable: true,
    suppressColumnsToolPanel: true,
    filter: "agTextColumnFilter",
  },
  {
    field: "connectionType",
    headerName: "Data Source Type",
    sortable: true,
    suppressColumnsToolPanel: true,
    filter: "agTextColumnFilter",
  },
  {
    field: "DataSourceOrigin",
    headerName: "Data Source Origin",
    sortable: true,
    suppressColumnsToolPanel: true,
    filter: "agTextColumnFilter",
  },
  {
    headerName: "Number of DQ Rules",
    sortable: true,
    suppressColumnsToolPanel: true,
    filter: "agTextColumnFilter",
    cellRenderer: totalTests,
    comparator: customNumberComparator,
  },
];

function totalTests(props) {
  return (
    <Box
      className={props.data.UsedInTests.length > 0 ? "noTests" : ""}
      onClick={() => {
        props.context.getTestsLists(props.data);
      }}
    >
      {props.data.UsedInTests.length}
    </Box>
  );
}
