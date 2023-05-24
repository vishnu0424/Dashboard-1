import { Box, Button, Drawer, TextField } from "@mui/material";
import * as React from "react";
import { useMemo, useState } from "react";
import { useLocation } from "react-router-dom";
import ValidationsResultPDF from "./ValidationsResultPDF";

export default function PopUp({ name, resultValidation }) {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);

  const [count, setCount] = useState(1);

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

  useMemo(() => {
    if (searchParams.get("new")) {
      let a = { ...state };
      a["right"] = true;
      setState(a);
    }
  }, [searchParams.get("new")]);

  const list = (anchor) => (
    <Box
      sx={{ width: anchor === "top" || anchor === "bottom" ? "auto" : 1000 }}
      role="presentation"
    >
      <ValidationsResultPDF
        resultValidation={resultValidation}
        count={count}
        close={() => {
          setState({ ...state, [anchor]: false });
        }}
      />
    </Box>
  );

  return (
    <>
      {["right"].map((anchor) => (
        <React.Fragment key={anchor}>
          <Button
            sx={{ mr: 1 }}
            size="small"
            variant="outlined"
            onClick={toggleDrawer(anchor, true)}
            disabled={count.length === 0}
          >
            {name}
          </Button>
          <TextField
            className="inputNumber"
            size="small"
            variant="outlined"
            type="number"
            value={count}
            onChange={(e) => {
              if (
                parseInt(e.target.value) >
                resultValidation.validationResult.length
              ) {
                e.preventDefault();
                return;
              }
              setCount(e.target.value);
            }}
            InputProps={{
              inputProps: {
                min: "1",
                step: "1",
                max: resultValidation.validationResult.length,
              },
            }}
            onKeyPress={(e) => {
              if (e.code === "Minus") {
                e.preventDefault();
              } else if (e.code === "Digit0" && e.target.value.length === 0) {
                e.preventDefault();
              }
            }}
          />
          <Drawer anchor={anchor} open={state[anchor]}>
            {list(anchor)}
          </Drawer>
        </React.Fragment>
      ))}
    </>
  );
}
