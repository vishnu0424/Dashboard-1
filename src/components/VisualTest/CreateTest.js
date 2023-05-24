import { Box, Button, SwipeableDrawer } from "@mui/material";
import * as React from "react";
import { useState } from "react";
import { useStyles } from "../Validations/Validationstyle";
import VisualTestForm from "./VisualTestForm";

export function CreateTest({ returnValue, ClosePreview }) {
  const classes = useStyles();

  //filehandle
  const [state, setState] = useState(false);

  const toggleDrawer = (open) => (event) => {
    ClosePreview();
    setState(open);
  };

  const list = () => (
    <Box
      className="drawerFile"
      sx={{
        width: "right" === "top" || "right" === "bottom" ? "auto" : 500,
      }}
      role="presentation"
    >
      <VisualTestForm
        setState={setState}
        type="add"
        returnValue={(val) => {
          setState(false);
          returnValue(false);
        }}
      />
    </Box>
  );
  return (
    <React.Fragment key={"right"}>
      <Box className="createBtn">
        <Button size="small" variant="outlined" onClick={toggleDrawer(true)}>
          Create New test
        </Button>
      </Box>
      <SwipeableDrawer
        anchor={"right"}
        open={state}
        onClose={toggleDrawer(false)}
        onOpen={toggleDrawer(true)}
        className={classes.createconnection}
      >
        {list("right")}
      </SwipeableDrawer>
    </React.Fragment>
  );
}
