import moment from "moment";
import { customComparator, customNumberComparator } from "../AgGrid/CustomSort";

export const headCells = [
  {
    sortable: false,
    headerCheckboxSelection: true,
    checkboxSelection: function (params) {
      return params.data.UsedInTests.length === 0;
    },
    lockPosition: "left",
    cellClass: "locked-col",
    suppressColumnsToolPanel: true,
    filter: false,
  },
  {
    field: "connectionName",
    headerName: "Data Source Name",
    sortable: true,
    filter: "agTextColumnFilter",
    comparator: customComparator,
  },
  {
    field: "size",
    headerName: "Size(KB)",
    sortable: true,
    filter: false,
    cellRenderer: fileSize,
    comparator: customNumberComparator,
  },
  {
    field: "createdDate",
    headerName: "Uploaded date",
    sortable: true,
    cellRenderer: createdDate,
  },
  {},
];

function createdDate(props) {
  return <>{moment(props.data.createdDate).format("Do MMMM YYYY")}</>;
}

function fileSize(props) {
  return <>{(props.data.size * 0.001).toFixed(1)}</>;
}

export const webAppHeadCells = [
  {
    sortable: false,
    headerCheckboxSelection: true,
    checkboxSelection: function (params) {
      return params.data.UsedInTests.length === 0;
    },
    lockPosition: "left",
    cellClass: "locked-col",
    suppressColumnsToolPanel: true,
    filter: false,
  },
  {
    field: "connectionName",
    headerName: "Data Source Name",
    sortable: true,
    filter: "agTextColumnFilter",
    comparator: customComparator,
  },
  {
    field: "APIUrl",
    headerName: "API Url",
    sortable: true,
    filter: false,
  },
  {
    field: "HTTPMethod",
    headerName: "HTTP Method",
    sortable: true,
    filter: false,
  },
  {
    field: "RequestPayload",
    headerName: "Request Pay load",
    sortable: true,
    filter: false,
  },
  {
    field: "authenticationType",
    headerName: "Authentication Type",
    sortable: true,
    filter: false,
  },
  {
    field: "createdDate",
    headerName: "Created date",
    sortable: true,
    cellRenderer: createdDate,
  },
  {},
];
