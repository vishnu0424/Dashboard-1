import {
  Box,
  Button,
  Drawer,
  FormControl,
  IconButton,
  Tooltip,
} from "@mui/material";
import React, { useState } from "react";
import TestScheduler from "./TestScheduler";

export default function PopUpScheduler({
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
  const [scheduleData, setscheduleData] = useState({
    Title: "",
    RepeatType: false,
    Description: "",
    FromDate: new Date(),
    ExecuteParallel: false,
    Frequency: 12,
    NoOfTimes: 1,
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
      <TestScheduler
        dropDown={dropDownData}
        retVal={toggleDrawer("right", false)}
        selectedData={selected}
        toggleDrawer={toggleDrawer}
        scheduleData={scheduleData}
        setscheduleData={setscheduleData}
        scheduledId={scheduledId}
        fetchList={fetchList}
      />
    </Box>
  );

  return (
    <div>
      {["right"].map((anchor) => (
        <React.Fragment key={anchor}>
          <Tooltip title="Schedule">
            <FormControl size="small">
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
            </FormControl>
          </Tooltip>
          <Drawer anchor={"right"} open={state["right"]}>
            {list(anchor)}
          </Drawer>
        </React.Fragment>
      ))}
    </div>
  );
}
