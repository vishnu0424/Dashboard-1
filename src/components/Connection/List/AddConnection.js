import { Box, Button, SwipeableDrawer } from "@mui/material";
import React, { useState } from "react";
import { useStyles } from "../../Styles";
import CreateConnection from "../Create";

export default function AddConnection({ returnValue }) {
  const [state, setState] = useState({
    top: false,
    left: false,
    bottom: false,
    right: false,
  });
  const [type] = useState("Add");

  const toggleDrawer = (anchor, open) => (event) => {
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
      <CreateConnection
        type={type}
        formData={{}}
        selected={() => {
          setState({ ...state, ["right"]: false });
        }}
        returnValue={(value) => {
          returnValue(value);
          setState({ right: false });
        }}
      />
    </Box>
  );

  const classes = useStyles();
  return (
      <React.Fragment key={"right"}>
        <Button
          size="small"
          sx={{ ml: 1 }}
          variant="contained"
          onClick={toggleDrawer("right", true)}
        >
          New
        </Button>
        <SwipeableDrawer
          anchor={"right"}
          open={state["right"]}
          onOpen={toggleDrawer("right", true)}
          onClose={toggleDrawer("right", false)}
          className={classes.createconnection}
        >
          {list("right")}
        </SwipeableDrawer>
      </React.Fragment>
  );
}
