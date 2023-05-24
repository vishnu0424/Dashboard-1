import DeleteIcon from "@mui/icons-material/Delete";
import { Box, Checkbox, Grid, IconButton, Typography } from "@mui/material";
import { useState } from "react";

export default function ImageCordinates({
  Imgarea1,
  setImgarea1,
  file1,
  file2,
  setLoading,
}) {
  const [checkBoxes, setCheckBoxes] = useState([]);

  const checkCoordinates = (e) => {
    var arr = [...checkBoxes];
    if (e.target.checked) {
      arr.push(parseInt(e.target.value));
    } else {
      const index = arr.indexOf(parseInt(e.target.value));
      if (index > -1) {
        arr.splice(index, 1);
      }
    }
    setCheckBoxes(arr);
  };

  const resetData = () => {
    let arr = [...Imgarea1];
    checkBoxes.map((obj) => {
      delete arr[obj];
    });
    var arr1 = arr.filter(function (element) {
      return element !== undefined;
    });
    setImgarea1(arr1);
    setCheckBoxes([]);
    setLoading(false);
  };

  const isSelected = (index) => checkBoxes.indexOf(index) !== -1;

  return (
    <Box className="ignoreCordinates">
      <Box className="innerSubHead">
        <Grid container alignItems="center">
          <Grid md={6} item>
            <Typography variant="h6">
              Area to ignore <b>[{Imgarea1.length}]</b>
            </Typography>
          </Grid>
          <Grid md={6} textAlign="right" item>
            {checkBoxes.length > 0 && (
              <IconButton size="small" onClick={resetData}>
                <DeleteIcon />
              </IconButton>
            )}
          </Grid>
        </Grid>
      </Box>
      <Box className="cordinatesBody">
        <Box className="cordinatesSec">
          {Imgarea1.map((obj, index) => {
            const isItemSelected = isSelected(index);
            return (
              <Box key={index}>
                <b>{index + 1}.</b>{" "}
                <Checkbox
                  size="small"
                  onChange={checkCoordinates}
                  value={index}
                  checked={isItemSelected}
                />
                <Typography>
                  <span>X:{obj.x.toFixed(2)}</span>
                  <span>Y:{obj.y.toFixed(2)}</span>
                  <span>Width:{obj.width.toFixed(2)}</span>
                  <span>Height:{obj.height.toFixed(2)}</span>
                  <span>Unit:{obj.unit}</span>
                </Typography>
              </Box>
            );
          })}
          {Imgarea1.length === 0 && (
            <Typography>Please select co-ordinates</Typography>
          )}
        </Box>
      </Box>
      <Box className="innerSubHead">
        <Grid container alignItems="center">
          <Grid md={6} item>
            <Typography variant="h6">Image 1</Typography>
          </Grid>
          <Grid md={6} item>
            <Typography variant="h6">Image 2</Typography>
          </Grid>
        </Grid>
      </Box>
      <Box className="imageCordinates">
        <Grid container>
          <Grid md={6} item>
            {file1 && (
              <Typography>
                {" "}
                Size: {(file1[0].size * 0.001).toFixed(1)}KB
              </Typography>
            )}
          </Grid>
          <Grid md={6} item>
            {file2 && (
              <Typography>
                {" "}
                Size: {(file2[0].size * 0.001).toFixed(1)}KB
              </Typography>
            )}
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
}
