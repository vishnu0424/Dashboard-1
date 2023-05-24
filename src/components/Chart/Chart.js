import { Box, Button, Grid } from "@mui/material";
import CircularProgress from "@mui/material/CircularProgress";
import { useEffect, useState } from "react";
import ApiService from "../../services/app.service";
import InnerHeader from "../InnerHeader";
import ImageUpload from "./ImageUpload";
import Output from "./Output";

export default function Chart() {
  const [file1, setFile1] = useState(null);
  const [outPut, setOutPut] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    setLoading(true);
    let data = {
      image: file1[0],
      chartType: "piechart",
    };
    try {
      let response = await ApiService.ChartDataAnalyzor(data);
      setOutPut(response.data);
    } catch (error) {
      console.log(error);
    }
    setLoading(false);
  };

  useEffect(() => {
    if (!file1) {
      setOutPut([]);
    }
  }, file1);

  return (
    <Box className="imageComparison">
      <InnerHeader name={"Chart Validation"} />
      <Box className="imageComparison">
        <Box>
          <Grid container alignItems="center" spacing={1}>
            <Grid xs={5} item>
              <Box className="imgUpMain">
                <Box className="imgDisplay">
                  {file1 && file1[0] && (
                    <Box className="imgBox">
                      <img
                        src={file1[0] ? URL.createObjectURL(file1[0]) : ""}
                        alt="my image"
                      />
                    </Box>
                  )}
                </Box>
                <ImageUpload setFile={setFile1} file={file1} />
              </Box>
            </Grid>
            <Grid xs={2} item>
              <Box mt="16px" textAlign="center">
                <Button
                  disabled={loading}
                  variant="contained"
                  size="small"
                  onClick={handleSubmit}
                >
                  {loading ? (
                    <>
                      <CircularProgress
                        style={{
                          width: "20px",
                          height: "20px",
                          color: "#ffffff",
                          marginRight: "8px",
                        }}
                      />
                      Analyze
                    </>
                  ) : (
                    <>Analyze</>
                  )}
                </Button>
              </Box>
            </Grid>
            <Grid xs={5} item>
              {outPut?.Data && (
                <Box>
                  <Output outPut={outPut} />
                </Box>
              )}
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Box>
  );
}
