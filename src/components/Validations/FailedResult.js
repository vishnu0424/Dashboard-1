import { Box, Grid } from "@mui/material";
import { useState } from "react";
import { tableStyles } from "../Styles";
import FailedTabResult from "./FailedResultTableRow";

export default function FailedResult({
  AutoScroll,
  validations,
  validatemodal,
}) {
  const classes = tableStyles();
  
  const [rows] = useState(validations);

   return (
    <Box sx={{ maxHeight: "70vh", overflow: "auto", pb: 1, width: "100%" }}>
      <Grid container sx={{ my: 0 }}>
        <Grid item xs={12}>
          {rows &&
            rows.map((item, ind) => {
              return (
                <Box className={classes.tableCus} key={ind}>
                  <Grid container sx={{ mt: 1 }}>
                    <Grid item xs={12}>
                      <Box>
                        <Grid
                          sm={12}
                          sx={{
                            "& .MuiFormControl-root": {
                              width: "300px",
                            },
                          }}
                        >
                          <FailedTabResult
                            validatemodal={validatemodal}
                            AutoScroll={AutoScroll}
                            item={item}
                          />
                        </Grid>
                      </Box>
                    </Grid>
                  </Grid>
                </Box>
              );
            })}
        </Grid>
      </Grid>
    </Box>
  );
}
