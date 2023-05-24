import { Box, Button, SwipeableDrawer, Typography } from "@mui/material";
import * as React from "react";
import { useStyles } from "../Validations/Validationstyle";
import MasterdataUploadForm from "./MasterdataUploadForm";

export default function MasterdataUpload({
  returnValue,
  toggleDrawer,
  state,
  setState,
  name,
  fetchList,
}) {
  const classes = useStyles();

  const list = () => (
    <Box
      className="drawerFile"
      sx={{
        width: "right" === "top" || "right" === "bottom" ? "auto" : 500,
      }}
      role="presentation"
    >
      <Typography sx={{ flex: "1 1 100%", mb: 1 }} variant="h6" component="div">
        New Master Data:
      </Typography>
      <MasterdataUploadForm
        fetchList={fetchList}
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
