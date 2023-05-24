import AddPhotoAlternateOutlinedIcon from "@mui/icons-material/AddPhotoAlternateOutlined";
import { Box, Button, Grid, Typography } from "@mui/material";
import { useContext, useEffect, useState } from "react";
import { SnackbarContext } from "../../App";
import ApiService from "../../services/app.service";
import InnerHeader from "../InnerHeader";
import SkeletonLoader from "../SkeletonLoader";
import FilterFields from "./FilterFields";
import ImageCordinates from "./ImageCordinates";
import ImageUpload from "./ImageUpload";
import Output from "./Output";
import SelectCoordinatesModal from "./SelectCoordinatesModal";

export default function ImageComparison() {
  const [Imgarea1, setImgarea1] = useState([]);

  const [file1, setFile1] = useState(null);
  const [file2, setFile2] = useState(null);

  const [imgProps1, setImgProps1] = useState({ width: 0, height: 0 });

  const [outPut, setOutPut] = useState([]);

  const [data, setData] = useState({
    threshold: 50,
    Comparison: "Strict",
    Highlight_Differences: "true",
    count_to_get: 1,
    color: "rgb(255 0 0 / 52%)",
  });

  const [loading, setLoading] = useState(false);
  const [loader, setLoader] = useState(false);

  const { setSnack } = useContext(SnackbarContext);

  useEffect(() => {
    setImgarea1([]);
  }, [file1, file2]);

  const handleSubmit = async () => {
    setLoader(true);
    var data1 = {
      image_path_1: file1[0],
      image_path_2: file2[0],
      threshold: data.threshold,
      Comparison: data.Comparison,
      Highlight_Differences: data.Highlight_Differences,
      count_to_get: data.count_to_get,
      AreaToIgnore: Imgarea1,
    };
    var form_data = new FormData();
    Object.keys(data1).forEach((key) => {
      if (key === "AreaToIgnore") {
        form_data.append(key, JSON.stringify(data1[key]));
      } else {
        form_data.append(key, data1[key]);
      }
    });
    let response = await ApiService.imageComparision(form_data);
    if (response?.data?.Score_error) {
      setSnack({
        message: response.data.Score_error,
        open: true,
        colour: "warning",
      });
      setLoader(false);
    } else {
      setOutPut(response?.data);
      setLoading(true);
      setLoader(false);
    }
  };

  return (
    <Box className="imageComparison">
      <InnerHeader name={"Report Validation"} />
      <Box>
        <Box>
          <Grid container className="headerImg" spacing={1} mb="16px">
            <Grid xs={4} item>
              <Typography variant="h6">
                Image 1 <AddPhotoAlternateOutlinedIcon />
              </Typography>
            </Grid>
            <Grid xs={4} item>
              <Typography variant="h6">
                Image 2 <AddPhotoAlternateOutlinedIcon />
              </Typography>
            </Grid>
            <Grid xs={4} item></Grid>
          </Grid>
          <Grid container spacing={1}>
            <Grid xs={4} item>
              <Box className="imgUpMain">
                <Box className="imgDisplay">
                  <SelectCoordinatesModal
                    Imgarea1={Imgarea1}
                    file={file1}
                    setImgarea1={setImgarea1}
                    data={data}
                    imgProps1={imgProps1}
                    setImgProps1={setImgProps1}
                  />
                </Box>
                <ImageUpload
                  setFile={setFile1}
                  file={file1}
                  setLoading={setLoading}
                />
              </Box>
            </Grid>
            <Grid xs={4} item>
              <Box className="imgUpMain">
                <Box className="imgDisplay">
                  {file2 && (
                    <Box className="imgBox">
                      <img src={URL.createObjectURL(file2[0])} alt="my image" />
                    </Box>
                  )}
                </Box>
                <ImageUpload
                  setFile={setFile2}
                  file={file2}
                  setLoading={setLoading}
                />
              </Box>
            </Grid>
            <Grid xs={4} item>
              <ImageCordinates
                Imgarea1={Imgarea1}
                setImgarea1={setImgarea1}
                file1={file1}
                file2={file2}
                sizes={true}
                setLoading={setLoading}
              />
            </Grid>
          </Grid>
        </Box>
        <Box>
          <FilterFields data={data} setData={setData} />
        </Box>
        <Box mt="16px" textAlign="center">
          <Button
            variant="contained"
            size="small"
            onClick={handleSubmit}
            disabled={!file1 || !file2}
          >
            Compare
          </Button>
        </Box>
        {!loader && loading && (
          <Box>
            <Output
              outPut={outPut}
              data={data}
              file1={file1}
              file2={file2}
              setOutPut={setOutPut}
            />
          </Box>
        )}
        {loader && <SkeletonLoader />}
      </Box>
    </Box>
  );
}
