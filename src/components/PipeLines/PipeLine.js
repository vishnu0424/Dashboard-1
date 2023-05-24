import { Box, Button, Drawer, IconButton, Tooltip } from "@mui/material";
import React, { useState } from "react";
import PipeLineTestScheduler from "./PipeLineTestScheduler";

export default function PipeLinePopUpScheduler({
  dropDownData,
  selected,
  scheduledId,
  icon,
  fetchList,
  type,
}) {
  const [state, setState] = useState({
    top: false,
    left: false,
    bottom: false,
    right: false,
  });

  const [scheduleData] = useState({
    Title: "",
    Description: "",
    ExecuteParallel: false,
    Type: "Jenkins",
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
  const list = (anchor) => (
    <Box
      sx={{ width: anchor === "top" || anchor === "bottom" ? "auto" : 500 }}
      role="presentation"
    >
      <PipeLineTestScheduler
        dropDown={dropDownData}
        retVal={toggleDrawer("right", false)}
        selectedData={selected}
        toggleDrawer={toggleDrawer}
        scheduleData={scheduleData}
        scheduledId={scheduledId}
        fetchList={fetchList}
      />
    </Box>
  );

  return (
    <div>
      {["right"].map((anchor) => (
        <React.Fragment key={anchor}>
          <Tooltip title="CI/CD Pipeline">
            {type === "icon" ? (
              <IconButton
                onClick={toggleDrawer("right", true)}
                size="small"
                variant="outlined"
              >
                {icon}
              </IconButton>
            ) : (
              <Button
                onClick={toggleDrawer("right", true)}
                size="small"
                variant="outlined"
              >
                {icon}
              </Button>
            )}
          </Tooltip>
          <Drawer anchor={"right"} open={state["right"]}>
            {list(anchor)}
          </Drawer>
        </React.Fragment>
      ))}
    </div>
  );
}
