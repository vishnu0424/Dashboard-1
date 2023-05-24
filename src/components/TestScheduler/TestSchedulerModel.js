import { Box, Tooltip } from "@mui/material";
import moment from "moment";
import * as React from "react";
import {
  customCellRenderNumberComparator,
  customComparator,
} from "../AgGrid/CustomSort";

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
    field: "Title",
    headerName: "Title",
    sortable: true,
    suppressColumnsToolPanel: true,
    filter: "agTextColumnFilter",
    comparator: customComparator,
  },
  {
    field: "Description",
    headerName: "Description",
    sortable: true,
    suppressColumnsToolPanel: true,
    filter: "agTextColumnFilter",
    comparator: customComparator,
  },
  {
    field: "TestType",
    headerName: "Test Type",
    sortable: true,
    suppressColumnsToolPanel: true,
    filter: "agTextColumnFilter",
    comparator: customComparator,
  },
  {
    field: "RepeatType",
    headerName: "Repeat Type",
    sortable: false,
    filter: false,
    suppressColumnsToolPanel: true,
    cellRenderer: RepeatType,
    comparator: customComparator,
  },
  {
    field: "ExecuteParallel",
    headerName: "Execute In Parallel",
    sortable: false,
    filter: false,
    cellRenderer: ExecuteParallel,
  },
  {
    field: "FromDate",
    headerName: "Schedule Date & Time",
    sortable: false,
    filter: false,
    cellRenderer: FromDate,
  },
  {
    field: "NoOfTimes",
    headerName: "No of Times",
    sortable: true,
    filter: false,
  },
  {
    field: "Frequency",
    headerName: "Frequency",
    sortable: true,
    filter: "agTextColumnFilter",
    cellRenderer: Frequency,
  },
  {
    headerName: "Total Tests",
    field: "TestNames",
    sortable: true,
    filter: false,
    cellRenderer: totalTests,
    comparator: customCellRenderNumberComparator,
  },
  {
    field: "Active",
    headerName: "Active",
    sortable: false,
    filter: false,
    cellRenderer: Active,
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

function RepeatType(props) {
  return <>{props.data.RepeatType === false ? "Do not repeat" : "Repeat"}</>;
}

function ExecuteParallel(props) {
  return <>{props.data.ExecuteParallel.toString()}</>;
}

function FromDate(props) {
  return <>{moment(props.data.FromDate).format("Do MMMM YYYY hh:mm A")}</>;
}

function createdDate(props) {
  return <>{moment(props.data.CreatedDate).format("Do MMMM YYYY")}</>;
}

function Frequency(props) {
  return (
    <>
      {props.data.Frequency && props.data.Frequency === "12" && "Every 12 hrs"}
      {props.data.Frequency && props.data.Frequency === "24" && "Every 24 hrs"}
    </>
  );
}

function totalTests(props) {
  return (
    <Tooltip
      title={
        <React.Fragment>
          {props.data.TestNames.map((obj, index) => {
            return (
              <div key={index}>
                {index + 1}.{obj.TestName}
              </div>
            );
          })}
        </React.Fragment>
      }
      placement="top-end"
      arrow
    >
      <Box>
        {props.data.TestType === "Visual Test"
          ? props.data.VisuvalTestIds.length
          : props.data.TestIds.length}
      </Box>
    </Tooltip>
  );
}

function Active(props) {
  return <>{props.data.Active.toString()}</>;
}
