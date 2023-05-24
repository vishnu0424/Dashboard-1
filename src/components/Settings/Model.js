import { Box, Tooltip } from "@mui/material";
import * as React from "react";
import {
  customCellRenderNumberComparator,
  customComparator,
} from "../AgGrid/CustomSort";

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
    field: "Name",
    headerName: "Name",
    sortable: true,
    suppressColumnsToolPanel: true,
    filter: "agTextColumnFilter",
    comparator: customComparator,
  },

  {
    field: "Email",
    headerName: "Email",
    sortable: true,
    suppressColumnsToolPanel: true,
    filter: "agTextColumnFilter",
    comparator: customComparator,
  },
  {
    field: "ValidatoinDetails",
    headerName: "No. of  DQ rules",
    sortable: true,
    suppressColumnsToolPanel: true,
    filter: false,
    cellRenderer: totalTests,
    comparator: customCellRenderNumberComparator,
  },
  {},
];

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
      <Box>{props.data.TestValidationIds.length}</Box>
    </Tooltip>
  );
}
