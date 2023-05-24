import { customComparator } from "../AgGrid/CustomSort";

export const APIPreviewheadCells = [
  {
    field: "APIName",
    headerName: "API Name",
    sortable: true,
    suppressColumnsToolPanel: true,
    filter: true,
    comparator: customComparator,
  },
  {
    field: "APIUrl",
    headerName: "Url",
    sortable: true,
    suppressColumnsToolPanel: true,
    filter: true,
    comparator: customComparator,
  },
  {
    field: "Method",
    headerName: "Method",
    sortable: true,
    suppressColumnsToolPanel: true,
    filter: true,
    comparator: customComparator,
  },

  {},
];
