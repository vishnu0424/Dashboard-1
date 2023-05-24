import { Box, Grid, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import ApiService from "../../services/app.service";
import InnerHeader from "../InnerHeader";
import { tableStyles } from "../Styles";
import UsersList from "./UsersList";

export default function Settings() {
  const classes = tableStyles();

  const [dropDown, setdropDown] = useState([]);
  const [smptData, setSmptData] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      let response = await ApiService.getValidationList();
      setdropDown(response?.data?.validationTests);
      try {
        let res = await ApiService.getSmtp();
        setSmptData(res?.data);
      } catch {
        setSmptData({ host: "", username: "", password: "" });
      }
      setLoading(false);
    })();
  }, []);

  return (
    <Box sx={{ width: "100%" }} className={classes.tableCus}>
      <InnerHeader name={"Settings"} />

      <Box>
        <Typography variant="h6">Send Notification mails to:</Typography>
        <Grid container md={12} item>
          {!loading && <UsersList dropDown={dropDown} smptData={smptData} />}
        </Grid>
      </Box>
    </Box>
  );
}
