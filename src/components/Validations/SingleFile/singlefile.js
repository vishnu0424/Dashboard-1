import { Box, Grid, Paper } from "@mui/material";
import { useEffect, useState } from "react";
import ApiService from "../../../services/app.service";
import { useStyles } from "../Validationstyle";
import DataSource from "./Datasource";

export default function SingleDataSource({
  activeStep,
  setSource1,
  type,
  sourceType,
}) {
  const classes = useStyles();
  // files
  const [source1File] = useState({});
  // database
  const [source1Database] = useState({});
  const [filesOptions, setFileOptions] = useState([]);
  const [databaseOptions, setDatabaseOptions] = useState([]);

  useEffect(() => {
    (async () => {
      try {
        let response = await ApiService.getConnectionsByType(sourceType);
        setDatabaseOptions(response?.data?.data);
      } catch (error) {
        console.log(error?.response);
      }
    })();
  }, [source1Database]);

  useEffect(() => {
    (async () => {
      try {
        let response = await ApiService.getConnectionsByType(sourceType);
        setFileOptions(response?.data?.data);
      } catch (error) {
        console.log(error.response);
      }
    })();
  }, [source1File]);

  return (
    <Box className={classes.root}>
      <Paper sx={{ mb: 1 }}>
        <Grid container>
          <DataSource
            backgroundColor="#e5f6fd"
            heading=""
            activeStep={activeStep}
            fileoptions={filesOptions.filter(
              (obj) => obj.id !== source1File?.id
            )}
            databaseoptions={databaseOptions.filter(
              (obj) => obj.id !== source1Database?.id
            )}
            loadfiles={(value, bool_) => {
              setSource1(value);
              if (bool_) {
                let data = [...filesOptions];
                data.push(value);
                setFileOptions(data);
              }
            }}
            loaddatabase={(value, bool_) => {
              setSource1(value);
              if (bool_) {
                let data = [...databaseOptions];
                data.push(value);
                setDatabaseOptions(data);
              }
            }}
            type={type}
          />
        </Grid>
      </Paper>
    </Box>
  );
}
