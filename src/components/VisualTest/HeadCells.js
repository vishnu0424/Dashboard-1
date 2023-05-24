import AnalyticsIcon from "@mui/icons-material/Analytics";
import NotStartedSharpIcon from "@mui/icons-material/NotStartedSharp";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import { IconButton } from "@mui/material";
import moment from "moment";
import { EditTest } from "./EditTest";

export const headCells = [
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
    headerName: "Test Name",
    sortable: true,
    suppressColumnsToolPanel: true,
    filter: "agTextColumnFilter",
  },
  {
    field: "ApplicationName",
    headerName: "App Name",
    sortable: true,
    filter: "agTextColumnFilter",
  },
  {
    field: "ApplicationUrl",
    headerName: "App Url",
    sortable: true,
    filter: false,
  },
  {
    field: "Threshold",
    headerName: "Threashold",
    sortable: true,
    filter: false,
  },
  {
    field: "MaxDifferences",
    headerName: "Max Differences",
    sortable: true,
    filter: false,
  },
  {
    field: "UpdatedDate",
    headerName: "Created Date",
    cellRenderer: CreatedDate,
    sortable: true,
    filter: false,
  },
  {
    headerName: "Actions",
    sortable: false,
    cellRenderer: ActionsCell,
    lockPosition: "right",
    cellClass: "locked-col",
    suppressColumnsToolPanel: true,
    filter: false,
  },
];

function CreatedDate(props) {
  return <>{moment(props.data?.CreatedDate).format("Do MMMM YYYY")}</>;
}

function ActionsCell(props) {
  const row = props.data;
  return (
    <>
      <EditTest row={row} returnValue={props.context.fetchList} />
      <IconButton
        title="Preview"
        onClick={() => {
          props.context.ShowPreview(row);
        }}
        size="small"
        color="primary"
      >
        <VisibilityOutlinedIcon fontSize="12px" />
      </IconButton>
      <IconButton
        title="Execute"
        onClick={() => {
          props.context.excuteTest(row._id);
        }}
        size="small"
        color="primary"
      >
        <NotStartedSharpIcon fontSize="12px" />
      </IconButton>
      <IconButton
        title="Results"
        onClick={() => {
          props.context.viewResults(row._id);
        }}
        size="small"
        color="warning"
      >
        <AnalyticsIcon fontSize="12px" />
      </IconButton>
    </>
  );
}
