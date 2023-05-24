import { Box, Grid, Paper } from "@mui/material";
import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import ApiService from "../../services/app.service";
import DataSource from "./Datasource";
import { useStyles } from "./Validationstyle";

export default function Comparative({ setSource1, setSource2 }) {
  const classes = useStyles();
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);

  // files
  const [source1File, setsource1File] = useState({});
  const [source2File, setsource2File] = useState({});

  // database
  const [source1Database, setsource1Database] = useState({});
  const [source2Database, setsource2Database] = useState({});

  const [filesOptions, setFileOptions] = useState([]);
  const [databaseOptions, setDatabaseOptions] = useState([]);

  useEffect(() => {
    (async () => {
      try {
        let response = await ApiService.getConnectionsByType({
          type: "Database",
        });
        setDatabaseOptions(response?.data?.data);
      } catch (error) {
        console.log(error?.response);
      }
    })();
  }, [source1Database, source2Database]);

  useEffect(() => {
    (async () => {
      try {
        let response = await ApiService.getConnectionsByType({ type: "Files" });
        setFileOptions(response?.data?.data);
      } catch (error) {
        console.log(error?.response);
      }
    })();
  }, [source1File, source2File]);

  return (
    <Box className={classes.root}>
      <Paper sx={{ mb: 1 }}>
        <Grid container className="comMain">
          <DataSource
            heading="First Data Source"
            fileoptions={filesOptions.filter(
              (obj) => obj.id !== source1File?.id
            )}
            databaseoptions={databaseOptions.filter(
              (obj) => obj.id !== source1Database?.id
            )}
            loadfiles={(value) => {
              setsource2File(value);
              setSource1(value);
            }}
            loaddatabase={(value) => {
              setsource2Database(value);
              setSource1(value);
            }}
            obj={searchParams.get("source1")}
          />
          <DataSource
            heading="Second Data Source"
            fileoptions={filesOptions.filter(
              (obj) => obj.id !== source2File?.id
            )}
            databaseoptions={databaseOptions.filter(
              (obj) => obj.id !== source2Database?.id
            )}
            loadfiles={(value) => {
              setsource1File(value);
              setSource2(value);
            }}
            loaddatabase={(value) => {
              setsource1Database(value);
              setSource2(value);
            }}
            obj={searchParams.get("source2")}
          />
        </Grid>
      </Paper>
    </Box>
  );
}
