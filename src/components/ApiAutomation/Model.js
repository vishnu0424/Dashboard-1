import moment from "moment";
import * as React from "react";
import { customComparator } from "../AgGrid/CustomSort";

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
    field: "CollectionName",
    headerName: "Title",
    sortable: true,
    suppressColumnsToolPanel: true,
    filter: "agTextColumnFilter",
    comparator: customComparator,
  },
  {
    field: "BaseUrl",
    headerName: "BaseUrl",
    sortable: true,
    suppressColumnsToolPanel: true,
    filter: "agTextColumnFilter",
    comparator: customComparator,
  },

  {
    field: "createdAt",
    headerName: "Created Date",
    sortable: true,
    filter: false,
    cellRenderer: createdDate,
  },
  {},
];

function createdDate(props) {
  return <>{moment(props.data.createdAt).format("Do MMMM YYYY")}</>;
}
