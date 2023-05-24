import CancelOutlinedIcon from "@mui/icons-material/CancelOutlined";
import { Box, Grid, IconButton, Typography } from "@mui/material";
import { JSONTree } from "react-json-tree";
import SkeletonLoader from "../SkeletonLoader";

export default function CustomJsonTree(props) {
  const { loader, response, returnVal, showCross } = props;
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
                      {response?.fileDetails?.connectionName}{" "}
                    </Typography>
                  </Box>
                </Grid>
                <Grid item xs>
                  <Box>
                    <Typography variant="bold"> Total nodes: </Typography>{" "}
                    <Typography> {response?.result?.totalRows} </Typography>
                  </Box>
                </Grid>
                <Grid item xs>
                  {response?.fileDetails?.connectionType === "Web App" ? (
                    <Box>
                      <Typography variant="bold"> HTTP Method: </Typography>{" "}
                      <Typography>
                        {" "}
                        {response?.fileDetails?.HTTPMethod}{" "}
                      </Typography>
                    </Box>
                  ) : (
                    <Box>
                      <Typography variant="bold"> Total columns: </Typography>{" "}
                      <Typography> pending </Typography>
                    </Box>
                  )}
                </Grid>
              </Grid>
            </Grid>
            {showCross && (
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
            )}
          </Grid>
        </Box>
        <Box p="16px">
          <Grid container>
            <Grid xs={12} sx={{ p: 0, display: "grid" }} md={12} item>
              {response && (
                <JSONTree
                  data={response?.result?.rows}
                  invertTheme
                />
              )}
            </Grid>
          </Grid>
        </Box>
      </Box>
      {loader && <SkeletonLoader />}
    </Box>
  );
}
