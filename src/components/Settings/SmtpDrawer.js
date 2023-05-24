import { Button } from "@mui/material";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import React, { useState } from "react";
import SmptValidations from "./Smpt";

export default function SmtpDrawer({ smptData }) {
  const [state, setState] = useState({ right: false });

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
    <>
      {Object.keys(smptData).length > 0 && (
        <SmptValidations
          smptData={smptData}
          anchor={anchor}
          toggleDrawer={toggleDrawer}
        />
      )}
    </>
  );

  return (
    <Box>
      {["right"].map((anchor) => (
        <React.Fragment key={anchor}>
          <Button
            sx={{ mr: 1 }}
            onClick={toggleDrawer(anchor, true)}
            variant="outlined"
            size="small"
          >
            SMTP
          </Button>
          <Drawer anchor={anchor} open={state[anchor]}>
            {list(anchor)}
          </Drawer>
        </React.Fragment>
      ))}
    </Box>
  );
}
