import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import FactCheckOutlinedIcon from "@mui/icons-material/FactCheckOutlined";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import { Box, Drawer, IconButton, Tooltip, Typography } from "@mui/material";
import * as React from "react";
import { useMemo, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { customComparator } from "../../AgGrid/CustomSort";
import CreateConnection from "../Create";

export const headCellss = [
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
    cellRenderer: AgGridTitle,
    sortable: true,
    suppressColumnsToolPanel: true,
    filter: "agTextColumnFilter",
    comparator: customComparator,
  },
  {
    field: "connectionType",
    headerName: "Database Type",
    sortable: true,
    filter: "agTextColumnFilter",
    comparator: customComparator,
  },
  {
    field: "server",
    headerName: "Server",
    sortable: true,
    filter: "agTextColumnFilter",
    comparator: customComparator,
  },
  {
    field: "dataBase",
    headerName: "Database",
    sortable: true,
    filter: "agTextColumnFilter",
    comparator: customComparator,
  },
  {
    headerName: "Actions",
    sortable: false,
    cellRenderer: AgGridAction,
    lockPosition: "right",
    cellClass: "locked-col",
    suppressColumnsToolPanel: true,
    suppressMovable: true,
    filter: false,
  },
];

function AgGridAction(props) {
  return (
    <>
      <IconButton
        onClick={() => {
          props.context.previewCall(props.data);
        }}
        size="small"
        color="secondary"
        aria-label="add to shopping cart"
      >
        <Tooltip
          title="Preview"
          placement="top"
          arrow
        >
          <VisibilityOutlinedIcon fontSize="12px" />
        </Tooltip>
      </IconButton>
      <Link to={"/connection/data-validations/" + props.data.id}>
        <IconButton
          size="small"
          color="warning"
          aria-label="add to shopping cart"
        >
          <Tooltip
            title="Validate"
            placement="top"
            arrow
          >
            <FactCheckOutlinedIcon fontSize="12px" />
          </Tooltip>
        </IconButton>
      </Link>
      <PopUp
        key={props.data.id}
        type="Edit"
        name={
          <IconButton color="success" size="small">
            <Tooltip title="Edit" placement="top" arrow>
              <EditOutlinedIcon />
            </Tooltip>
          </IconButton>
        }
        connectionData={props.data}
        allRows={(val) => {
          props.context.setRows(val.rows.data);
          props.context.setType("All");
          props.context.setSelected([]);
        }}
      />
    </>
  );
}

function PopUp({ name, type, connectionData, allRows }) {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);

  const [state, setState] = useState({
    top: false,
    left: false,
    bottom: false,
    right: false,
  });
  const toggleDrawer = (anchor, open) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }

    setState({ ...state, [anchor]: open });
  };

  useMemo(() => {
    if (searchParams.get("new") && type === "Add") {
      let a = { ...state };
      a["right"] = true;
      setState(a);
    }
  }, [searchParams.get("new")]);

  const list = (anchor) => (
    <Box
      sx={{ width: anchor === "top" || anchor === "bottom" ? "auto" : 500 }}
      role="presentation"
    >
      <CreateConnection
        type={type}
        connectionType={connectionData.connectionType}
        formData={connectionData}
        selected={(answer) => {
          setState({ ...state, [anchor]: false });
        }}
        EffectedRow={(rowsAll) => {
          allRows(rowsAll);
        }}
        returnValue={() => {}}
      />
    </Box>
  );

  return (
    <>
      {["right"].map((anchor) => (
        <React.Fragment key={anchor}>
          <Typography variant="outlined" onClick={toggleDrawer(anchor, true)}>
            {name}
          </Typography>
          <Drawer anchor={anchor} open={state[anchor]}>
            {list(anchor)}
          </Drawer>
        </React.Fragment>
      ))}
    </>
  );
}

function AgGridTitle(props) {
  return (
    <PopUp
      key={props.data.id}
      type="View"
      name={
        <Box sx={{ color: "#0e71b7", cursor: "pointer" }}>
          {props.data.connectionName}
        </Box>
      }
      connectionData={props.data}
      allRows={(val) => {
        props.context.setRows(val.rows.data);
        props.context.setType("All");
        props.context.setSelected([]);
      }}
    />
  );
}
