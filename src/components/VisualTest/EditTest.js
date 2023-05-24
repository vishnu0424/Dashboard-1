import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import { Box, IconButton, SwipeableDrawer } from "@mui/material";
import * as React from "react";
import { useState } from "react";
import { useStyles } from "../Validations/Validationstyle";
import VisualTestForm from "./VisualTestForm";

export function EditTest(props) {
  const classes = useStyles();
  const { row, returnValue } = props;
  //filehandle
  const [state, setState] = useState(false);

  const toggleDrawer = (open) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }
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
        type="edit"
        defaultValues={row}
        returnValue={(val) => {
          setState(false);
          returnValue(false);
        }}
      />
    </Box>
  );
  return (
    <React.Fragment key={"right"}>
      <IconButton title="Edit" color="success" size="small">
        <EditOutlinedIcon onClick={toggleDrawer(true)} />
      </IconButton>
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
