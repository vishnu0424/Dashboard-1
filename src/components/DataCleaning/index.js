import { Box, Button, SwipeableDrawer } from "@mui/material";
import React, { useEffect, useState } from "react";
import ApiService from "../../services/app.service";
import { useStyles } from "../Styles";
import DataCleaningForm from "./DataCleaningForm";
import DataCleaningTab from "./DataCleaningTab";

export default function DataCleaning({
  type,
  ValidationData,
  Connectiondetails,
  Table,
  Columns,
  fuzzyreplace,
}) {
  const [state, setState] = useState({
    top: false,
    left: false,
    bottom: false,
    right: false,
  });

  const [tableColumns, setTablesColumns] = useState([]);

  useEffect(() => {
    (async () => {
      setTablesColumns([]);
      if (type === "database") {
        let response = await ApiService.ConnectionTablesColumns(
          Connectiondetails.id
        );
        setTablesColumns(response?.data?.tablesColumns[Table]);
      }
    })();
  }, [Table]);

  const toggleDrawer = (anchor, open) => (event) => {
    event.stopPropagation();
    if (
      event &&
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }
    setState({ ...state, [anchor]: open });
  };

  const list = () => (
    <Box
      sx={{
        width: "right" === "top" || "right" === "bottom" ? "auto" : 500,
        "& .MuiGrid-container": {
          "& .MuiGrid-grid-md-8": {
            flexBasis: "100%",
            maxWidth: "100%",
          },
          "& .MuiGrid-grid-md-2": {
            flexBasis: "50%",
            maxWidth: "50%",
          },
          "& .MuiGrid-container": {
            "& .MuiGrid-grid-xs-8": {
              flexBasis: "50%",
              maxWidth: "50%",
            },
            "& .MuiGrid-grid-xs-2": {
              flexBasis: "25%",
              maxWidth: "25%",
            },
          },
        },
      }}
      role="presentation"
    >
      {fuzzyreplace ? (
        <DataCleaningTab
          Connectiondetails={Connectiondetails}
          ValidationData={ValidationData}
          toggleDrawer={toggleDrawer}
          Table={Table}
          Columns={type === "file" ? Columns : tableColumns}
        />
      ) : (
        <DataCleaningForm
          ValidationData={ValidationData}
          toggleDrawer={toggleDrawer}
        />
      )}
    </Box>
  );

  const classes = useStyles();
  return (
    <React.Fragment key={"right"}>
      <Button
        size="small"
        variant="outlined"
        sx={{ float: "right", pointerEvents: "auto" }}
        onClick={toggleDrawer("right", true)}
      >
        Clean Data
      </Button>
      <SwipeableDrawer
        anchor={"right"}
        open={state["right"]}
        onOpen={toggleDrawer("right", true)}
        onClose={toggleDrawer("right", false)}
        onClick={(e) => e.stopPropagation()}
        className={classes.createconnection}
      >
        {list("right")}
      </SwipeableDrawer>
    </React.Fragment>
  );
}
