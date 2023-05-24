import { Box, Button, SwipeableDrawer, Typography } from "@mui/material";
import * as React from "react";
import { useState } from "react";
import FileHandle from "../Files/FileUpload";
import { useStyles } from "./Validationstyle";

export function NewFile({
  returnValue,
  toggleDrawer,
  state,
  setState,
  name,
  type_of,
}) {
  const classes = useStyles();

  //filehandle
  const [setRows] = useState([]);

  const list = () => (
    <Box
      className="drawerFile"
      sx={{
        width: "right" === "top" || "right" === "bottom" ? "auto" : 500,
      }}
      role="presentation"
    >
      <Typography sx={{ flex: "1 1 100%", mb: 1 }} variant="h6" component="div">
        New File:
      </Typography>
      <FileHandle
        rows={setRows}
        returnValue={(value) => {
          returnValue(value);
          setState({ right: false });
        }}
      />
      <Box sx={{ textAlign: "center", mt: 2 }}>
        <Button
          variant="contained"
          color="error"
          size="small"
          onClick={toggleDrawer("right", false)}
        >
          Cancel
        </Button>
      </Box>
    </Box>
  );
  return (
    <React.Fragment key={"right"}>
      {name && name}
      {type_of === "button" && (
        <Button
          size="small"
          sx={{ ml: 1 }}
          variant="contained"
          onClick={toggleDrawer("right", true)}
        >
          New
        </Button>
      )}
      <SwipeableDrawer
        anchor={"right"}
        open={state["right"]}
        onClose={toggleDrawer("right", false)}
        onOpen={toggleDrawer("right", true)}
        className={classes.createconnection}
      >
        {list("right")}
      </SwipeableDrawer>
    </React.Fragment>
  );
}
