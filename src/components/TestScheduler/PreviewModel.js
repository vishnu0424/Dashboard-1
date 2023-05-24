import moment from "moment";
import { customComparator } from "../AgGrid/CustomSort";

export const headCellss = [
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
    headerName: "DQ Source Type",
    sortable: true,
    filter: "agTextColumnFilter",
  },
  {
    field: "NoOfValidations",
    headerName: "Data Quality Checks",
    sortable: true,
    filter: "agTextColumnFilter",
  },
  {
    headerName: "Database",
    sortable: false,
    filter: false,
    cellRenderer: Database,
  },
  {
    field: "LastExecution",
    headerName: "Last Executed On",
    sortable: true,
    filter: false,
  },
  {
    field: "createdDate",
    headerName: "Created Date",
    sortable: true,
    filter: false,
    cellRenderer: createdDate,
  },
];

function Database(props) {
  const row = props.data;
  return (
    <>
      {row.ConnectionDetails &&
        row.TestType === "Single Database" &&
        row.ConnectionDetails.dataBase}
      {row.ConnectionDetails &&
        row.TestType === "Comparison" &&
        row.ConnectionDetails.FirstDatasourceDetails.dataBase +
          " - " +
          row.ConnectionDetails.SecondDatasourceDetails.dataBase}
    </>
  );
}

function createdDate(props) {
  return <>{moment(props.data.CreatedDate).format("Do MMMM YYYY")}</>;
}
