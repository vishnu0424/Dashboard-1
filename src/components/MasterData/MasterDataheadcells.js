import moment from "moment";
import { customComparator } from "../AgGrid/CustomSort";

export const masterdataheadCells = [
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
    field: "name",
    headerName: "Name",
    sortable: true,
    suppressColumnsToolPanel: true,
    filter: "agTextColumnFilter",
    comparator: customComparator,
  },
  {
    field: "description",
    headerName: "Description",
    sortable: true,
    suppressColumnsToolPanel: true,
    filter: "agTextColumnFilter",
    comparator: customComparator,
  },
  {
    field: "CreatedDate",
    headerName: "Created Date",
    sortable: true,
    filter: false,
    cellRenderer: createdDate,
  },
  {},
];

function createdDate(props) {
  return <>{moment(props.data.CreatedDate).format("Do MMMM YYYY")}</>;
}
