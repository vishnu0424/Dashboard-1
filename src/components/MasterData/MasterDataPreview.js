import CancelOutlinedIcon from "@mui/icons-material/CancelOutlined";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import { useEffect, useState } from "react";
import ApiService from "../../services/app.service";
import SkeletonLoader from "../SkeletonLoader";

export default function MasterDataPreview({ connection, returnVal }) {
  const [tables, setTables] = useState([]);
  const [file, setFile] = useState({});
  const [loader, setLoader] = useState(false);

  useEffect(() => {
    (async () => {
      setLoader(true);
      try {
        let response = await ApiService.getmasterdatabyId({
          id: connection,
          numberOfRows: 1000,
        });
        setTables(response?.data?.result?.rows);
        setFile(response?.data?.fileDetails);
      } catch (error) {
        console.log(error);
      }
      setLoader(false);
    })();
  }, [connection]);

  const firstcolumn = tables?.map((subArray) => subArray[0]);

  return (
    <Box sx={{ maxWidth: "100%" }}>
      <Box>
        <Box className="innerSubHead">
          <Grid container alignItems="center" justify="center">
            <Grid sm={2}>
              <Typography variant="h6">Preview: </Typography>
            </Grid>
            <Grid align="center" sm={8}>
              <Grid container>
                <Grid item xs>
                  <Box>
                    <Typography variant="bold"> Data Source Name: </Typography>{" "}
                    <Typography>
                      {" "}
                      {file?.connectionName
                        ? file?.connectionName
                        : file?.name}{" "}
                    </Typography>
                  </Box>
                </Grid>
                <Grid item xs>
                  <Box>
                    <Typography variant="bold"> Total Records: </Typography>{" "}
                    <Typography> {firstcolumn.length} </Typography>
                  </Box>
                </Grid>
              </Grid>
            </Grid>
            <Grid sm={2}>
              <IconButton
                onClick={() => {
                  returnVal(false);
                }}
                size="small"
                color="error"
                sx={{ ml: "auto", display: "flex" }}
                aria-label="add to shopping cart"
              >
                <CancelOutlinedIcon />
              </IconButton>
            </Grid>
          </Grid>
        </Box>
        <Box p="16px">
          <Grid container>
            <Grid xs={12} sx={{ p: 0, display: "grid" }} md={12} item>
              {tables.length > 0 && (
                <Grid container item>
                  {firstcolumn.flat(1).map((item, key) => {
                    const labelId = `filesrow-${key}`;
                    return (
                      <Grid
                        xs={2}
                        item
                        key={labelId}
                        sx={{ border: "1px solid #eeeeee", p: 0.5 }}
                      >
                        {item}
                      </Grid>
                    );
                  })}
                </Grid>
              )}
            </Grid>
          </Grid>
        </Box>
      </Box>
      {loader && <SkeletonLoader />}
    </Box>
  );
}
