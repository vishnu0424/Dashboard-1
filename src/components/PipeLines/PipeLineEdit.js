import EditOutlined from "@mui/icons-material/EditOutlined";
import { Box, Drawer, IconButton, Tooltip } from "@mui/material";
import React, { useEffect, useState } from "react";
import PipeLineTestScheduler from "./PipeLineTestScheduler";

export default function EditPopUpPipeLine({ obj, fetchList }) {
  const [scheduleData, setscheduleData] = useState({
    Title: "",
    Description: "",
    ExecuteParallel: false,
    Type: "Jenkins",
  });
  const [selected] = useState(obj.TestIds);
  const [scheduledId, setScheduledId] = useState();

  useEffect(() => {
    setScheduledId(obj._id);
    var a = {
      Title: obj.Title,
      Description: obj.Description,
      ExecuteParallel: obj.ExecuteParallel,
      Type: obj.Type,
    };
    setscheduleData(a);
  }, [obj]);
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
  const list = (anchor) => (
    <Box
      sx={{ width: anchor === "top" || anchor === "bottom" ? "auto" : 500 }}
      role="presentation"
    >
      <PipeLineTestScheduler
        selectedData={selected}
        retVal={toggleDrawer("right", false)}
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
    </div>
  );
}
