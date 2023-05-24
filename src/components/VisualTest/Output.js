import AddPhotoAlternateOutlinedIcon from "@mui/icons-material/AddPhotoAlternateOutlined";
import CancelOutlinedIcon from "@mui/icons-material/CancelOutlined";
import ZoomOutMapOutlinedIcon from "@mui/icons-material/ZoomOutMapOutlined";
import {
  Box,
  Button,
  Checkbox,
  Dialog,
  DialogActions,
  DialogTitle,
  Grid,
  IconButton,
  Paper,
  Typography,
} from "@mui/material";
import { useState } from "react";
import { tableStyles } from "../Styles";
import CanvasImage from "./CanvasImage";
import { ImagePreview } from "./ImagePreview";

export default function Output({ outPut, setOutPut, setselectedId }) {
  const [checkBoxes, setCheckBoxes] = useState([]);

  const [openDialog, setOpenDialog] = useState(false);

  const classes = tableStyles();

  const [open1, setOpen1] = useState(false);
  const [open2, setOpen2] = useState(false);

  const [imgProps1, setImgProps1] = useState({ width: 0, height: 0 });
  const [imgProps2, setImgProps2] = useState({ width: 0, height: 0 });

  const checkCoordinates = (e) => {
    var arr = [...checkBoxes];
    if (e.target.checked) {
      arr.push(parseInt(e.target.value));
    } else {
      let index = arr.indexOf(parseInt(e.target.value));
      if (index > -1) {
        arr.splice(index, 1);
      }
    }
    setCheckBoxes(arr);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  const isSelected = (index) => checkBoxes.indexOf(index) !== -1;

  const resetData = () => {
    let obj = { ...outPut };
    let someArray = obj.Differences.filter(
      (x) => !checkBoxes.includes(x.Label - 1)
    );
    someArray.forEach((obj, index) => {
      obj.Label = index + 1;
    });
    obj["Differences"] = someArray;
    setOutPut(obj);
    setCheckBoxes([]);
    handleCloseDialog();
  };

  return (
    <Box>
      <Paper className="imgComOutput">
        <Box className="innerSubHead">
          <Grid container alignItems="center" justify="center">
            <Grid sm={2}>
              <Typography variant="h6">Result: </Typography>
            </Grid>
            <Grid align="center" sm={8}></Grid>
            <Grid sm={2}>
              <IconButton
                onClick={() => {
                  setOutPut();
                  setselectedId();
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
        <Box>
          <Grid container spacing={1} textAlign="center" mt="16px">
            <Grid xs={4} item>
              <Typography>
                Base Image <AddPhotoAlternateOutlinedIcon />
              </Typography>
            </Grid>
            <Grid xs={4} item>
              <Typography>
                App URL Image <AddPhotoAlternateOutlinedIcon />
              </Typography>
            </Grid>
            <Grid xs={4} item></Grid>
          </Grid>
          <Grid
            container
            spacing={2}
            alignItems={"center"}
            className="VTPreview"
          >
            <Grid item xs={4} className="VT-Left">
              <Box className="imgOutput">
                <Typography
                  onClick={() => {
                    setOpen1(true);
                  }}
                >
                  <ZoomOutMapOutlinedIcon />
                </Typography>
                <CanvasImage
                  sourceImage={outPut.BaseImage}
                  differences={outPut.Differences}
                  imgProps={imgProps1}
                  setImgProps={setImgProps1}
                />
              </Box>
            </Grid>
            <Grid item xs={4} className="VT-Left">
              <Box className="imgOutput">
                <Typography
                  onClick={() => {
                    setOpen2(true);
                  }}
                >
                  <ZoomOutMapOutlinedIcon />
                </Typography>
                <CanvasImage
                  sourceImage={outPut.ScreenshotImage}
                  differences={outPut.Differences}
                  imgProps={imgProps2}
                  setImgProps={setImgProps2}
                />
              </Box>
            </Grid>
            <Grid item xs={4}>
              <Box className="ignoreCordinates" mt="16px">
                <Box className="innerSubHead">
                  <Grid container alignItems="center">
                    <Grid md={8}>
                      <Typography variant="h6">
                        Differences & Coordinates [
                        {outPut && outPut?.Differences
                          ? outPut?.Differences?.length
                          : 0}
                        ]
                      </Typography>
                    </Grid>
                    <Grid md={4} textAlign="right">
                      {checkBoxes.length > 0 && (
                        <Button
                          className="exSmall"
                          onClick={() => {
                            setOpenDialog(true);
                          }}
                          variant="contained"
                          size="small"
                          color="error"
                        >
                          Reject
                        </Button>
                      )}
                    </Grid>
                  </Grid>
                </Box>
                <Box className="cordinatesBody">
                  <Box className="cordinatesSec">
                    {outPut &&
                      outPut?.Differences?.length > 0 &&
                      outPut?.Differences.map((obj, index) => {
                        const isItemSelected = isSelected(index);
                        return (
                          <Box key={index}>
                            <Typography>
                              <b>{index + 1}.</b>
                              <Checkbox
                                size="small"
                                value={index}
                                onChange={checkCoordinates}
                                checked={isItemSelected}
                              />
                              <span>X:{obj.x}</span>
                              <span>Y:{obj.y}</span>
                              <span>Width:{obj.width}</span>
                              <span>Height:{obj.height}</span>
                              <span>Unit:"px"</span>
                            </Typography>
                          </Box>
                        );
                      })}
                  </Box>
                </Box>
                <Box className="innerSubHead">
                  <Grid container alignItems="center">
                    <Grid md={6}>
                      <Typography variant="h6">Base Image</Typography>
                    </Grid>
                    <Grid md={6}>
                      <Typography variant="h6">App URL Image</Typography>
                    </Grid>
                  </Grid>
                </Box>
                <Box className="imageCordinates">
                  <Grid container>
                    <Grid md={6}>
                      <Typography> Width: {imgProps1.width} px</Typography>
                      <Typography> Height: {imgProps1.height} px</Typography>
                    </Grid>
                    <Grid md={6}>
                      <Typography> Width: {imgProps2.width} px</Typography>
                      <Typography> Height: {imgProps2.height} px</Typography>
                    </Grid>
                  </Grid>
                </Box>
              </Box>
            </Grid>
          </Grid>
        </Box>

        {open1 ? (
          <ImagePreview
            open={open1}
            setOpen={setOpen1}
            sourceImage={outPut.BaseImage}
            differences={outPut.Differences}
            imgProps={imgProps1}
            setImgProps={setImgProps1}
          />
        ) : (
          <ImagePreview
            open={open2}
            setOpen={setOpen2}
            sourceImage={outPut.ScreenshotImage}
            differences={outPut.Differences}
            imgProps={imgProps2}
            setImgProps={setImgProps2}
          />
        )}
      </Paper>
      <Dialog
        className={classes.dialogCus}
        open={openDialog}
        onClose={handleCloseDialog}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle variant="h6" id="alert-dialog-title">
          {"Are you sure want to reject the selected co-ordinates ?"}
        </DialogTitle>

        <DialogActions>
          <Button
            variant="outlined"
            color="error"
            size="small"
            onClick={handleCloseDialog}
          >
            No
          </Button>
          <Button
            variant="outlined"
            size="small"
            onClick={() => {
              resetData();
            }}
            autoFocus
          >
            Yes
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
