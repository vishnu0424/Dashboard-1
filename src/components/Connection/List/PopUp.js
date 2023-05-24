import { Box, Button, Drawer, Typography } from "@mui/material";
import { Fragment, useMemo, useState } from "react";
import { useLocation } from "react-router-dom";
import CreateConnection from "../Create";

export function PopUp({
  name,
  type,
  connectionData,
  allRows,
  connectionType,
  setPreview,
  type_of,
}) {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);

  const [state, setState] = useState({
    top: false,
    left: false,
    bottom: false,
    right: false,
  });
  const toggleDrawer = (anchor, open) => (event) => {
    if (setPreview) {
      setPreview(false);
    }
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }

    setState({ ...state, [anchor]: open });
  };

  useMemo(() => {
    if (searchParams.get("new") && type === "Add") {
      let a = { ...state };
      a["right"] = true;
      setState(a);
    }
  }, [searchParams.get("new")]);

  const list = (anchor) => (
    <Box
      sx={{ width: anchor === "top" || anchor === "bottom" ? "auto" : 500 }}
      role="presentation"
    >
      <CreateConnection
        type={type}
        formData={connectionData}
        connectionType={connectionType}
        selected={() => {
          setState({ ...state, [anchor]: false });
        }}
        EffectedRow={(rowsAll) => {
          allRows(rowsAll);
        }}
        returnValue={() => {}}
      />
    </Box>
  );

  return (
    <>
      {["right"].map((anchor) => (
        <Fragment key={anchor}>
          {type_of === "button" ? (
            <Button
              size="small"
              sx={{ ml: 1 }}
              variant="contained"
              onClick={toggleDrawer(anchor, true)}
            >
              New
            </Button>
          ) : (
            <Typography variant="outlined" onClick={toggleDrawer(anchor, true)}>
              {name}
            </Typography>
          )}
          <Drawer anchor={anchor} open={state[anchor]}>
            {list(anchor)}
          </Drawer>
        </Fragment>
      ))}
    </>
  );
}
