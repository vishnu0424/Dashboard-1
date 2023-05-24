import EditOutlined from "@mui/icons-material/EditOutlined";
import { Box, Drawer, IconButton, Tooltip } from "@mui/material";
import React, { useEffect, useState } from "react";
import TestScheduler from "./TestScheduler";

export default function EditPopUpScheduler({ obj, fetchList }) {
  const [scheduleData, setscheduleData] = useState({
    Title: "",
    RepeatType: false,
    Description: "",
    FromDate: new Date(),
    ExecuteParallel: false,
    TestType: "",
    Frequency: 12,
    NoOfTimes: 1,
  });

  const [scheduledId, setScheduledId] = useState();
  const [selected] = useState(
    obj.TestType === "Visual Test" ? obj.VisuvalTestIds : obj.TestIds
  );
  const [state, setState] = useState({
    top: false,
    left: false,
    bottom: false,
    right: false,
  });

  useEffect(() => {
    setScheduledId(obj._id);
    let a = {
      Title: obj.Title,
      RepeatType: obj.RepeatType,
      Description: obj.Description,
      FromDate: obj.FromDate,
      ExecuteParallel: obj.ExecuteParallel,
      TestType: obj.TestType,
      Frequency: obj.Frequency,
      NoOfTimes: obj.NoOfTimes,
    };
    setscheduleData(a);
  }, [obj]);

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
        selectedData={selected}
        retVal={toggleDrawer("right", false)}
        scheduleData={scheduleData}
        setscheduleData={setscheduleData}
        scheduledId={scheduledId}
        fetchList={fetchList}
      />
    </Box>
  );

  return (
    <>
      {["right"].map((anchor) => (
        <React.Fragment key={anchor}>
          <Tooltip title="Edit" placement="top-end" arrow>
            <IconButton
              color="success"
              onClick={toggleDrawer("right", true)}
              size="small"
            >
              <EditOutlined />
            </IconButton>
          </Tooltip>
          <Drawer anchor={"right"} open={state["right"]}>
            {list(anchor)}
          </Drawer>
        </React.Fragment>
      ))}
    </>
  );
}
