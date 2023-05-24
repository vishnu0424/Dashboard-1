import AddPhotoAlternateOutlinedIcon from "@mui/icons-material/AddPhotoAlternateOutlined";
import {
  Box,
  Button,
  Checkbox,
  Dialog,
  DialogActions,
  DialogTitle,
  Grid,
  Paper,
  Typography,
} from "@mui/material";
import { useEffect, useRef, useState } from "react";
import { tableStyles } from "../Styles";

export default function Output({ outPut, data, file1, file2, setOutPut }) {
  const [checkBoxes, setCheckBoxes] = useState([]);

  const [openDialog, setOpenDialog] = useState(false);

  const classes = tableStyles();

  const myCanvas1 = useRef();
  const myCanvas2 = useRef();

  const [imgProps1, setImgProps1] = useState({ width: 0, height: 0 });
  const [imgProps2, setImgProps2] = useState({ width: 0, height: 0 });

  let context = null;

  useEffect(() => {
    context = myCanvas1.current.getContext("2d");
    const image = new Image();
    image.src = URL.createObjectURL(file1[0]);
    image.onload = () => {
      context.drawImage(image, 0, 0);
      var props = { width: image.width, height: image.height };
      setImgProps1(props);
      outPut.Object_Differences.forEach((obj) => {
        const r1Style = { borderColor: data.color, borderWidth: 3 };
        drawRect(obj, r1Style, context);
      });
    };

    const context2 = myCanvas2.current.getContext("2d");
    const image2 = new Image();
    image2.src = URL.createObjectURL(file2[0]);
    image2.onload = () => {
      context2.drawImage(image2, 0, 0);
      var props = { width: image2.width, height: image2.height };
      setImgProps2(props);
      outPut.Object_Differences.forEach((obj) => {
        const r1Style = { borderColor: data.color, borderWidth: 3 };
        drawRect(obj, r1Style, context2);
      });
    };
    myCanvas2.current.scrollIntoView({ behavior: "smooth" });
  }, [outPut, file1]);

  useEffect(() => {
    context = myCanvas1.current.getContext("2d");
    const image = new Image();
    image.src = URL.createObjectURL(file1[0]);
    image.onload = () => {
      context.drawImage(image, 0, 0);
      var props = { width: image.width, height: image.height };
      setImgProps1(props);
      outPut.Object_Differences.forEach((obj) => {
        const r1Style = { borderColor: data.color, borderWidth: 3 };
        drawRect(obj, r1Style, context);
      });
    };

    const context2 = myCanvas2.current.getContext("2d");
    const image2 = new Image();
    image2.src = URL.createObjectURL(file2[0]);
    image2.onload = () => {
      context2.drawImage(image2, 0, 0);
      var props = { width: image2.width, height: image2.height };
      setImgProps2(props);
      outPut.Object_Differences.forEach((obj) => {
        const r1Style = { borderColor: data.color, borderWidth: 3 };
        drawRect(obj, r1Style, context2);
      });
    };
  }, [outPut, file1]);

  const drawRect = (info, style = {}, context) => {
    const { x, y, width, height, Label } = info;
    const { borderColor, borderWidth } = style;

    context.beginPath();
    context.lineWidth = borderWidth;

    if (data.Highlight_Differences === "true") {
      context.fillStyle = borderColor;
      context.fillRect(x, y, width, height);
    } else {
      context.strokeStyle = borderColor;
      context.rect(x, y, width, height);
    }
    context.font = "bold 30px serif";
    context.fillStyle = "#000000";
    context.fillText(Label, x + width / 2, y);
    context.stroke();
  };

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

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  const isSelected = (index) => checkBoxes.indexOf(index) !== -1;

  const resetData = () => {
    var obj = { ...outPut };
    var someArray = obj.Object_Differences.filter(
      (x) => !checkBoxes.includes(x.Label - 1)
    );
    someArray.forEach((obj, index) => {
      obj.Label = index + 1;
    });
    obj["Object_Differences"] = someArray;
    setOutPut(obj);
    setCheckBoxes([]);
    handleCloseDialog();
  };

  return (
    <Box>
      <Paper className="imgComOutput">
        <Box className="innerSubHead">
          <Grid container alignItems="center">
            <Grid md={12} textAlign="center">
              <Typography variant="h6">Output</Typography>
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
          <Grid container spacing={2}>
            <Grid item xs={4}>
              <Box className="imgOutput">
                <canvas
                  ref={myCanvas1}
                  width={imgProps1.width}
                  height={imgProps1.height}
                />
              </Box>
            </Grid>
            <Grid item xs={4}>
              <Box className="imgOutput">
                <canvas
                  ref={myCanvas2}
                  width={imgProps2.width}
                  height={imgProps2.height}
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
                        {outPut && outPut?.Object_Differences
                          ? outPut?.Object_Differences?.length
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
                      outPut?.Object_Differences?.length > 0 &&
                      outPut?.Object_Differences.map((obj, index) => {
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
                      <Typography variant="h6">Image 1</Typography>
                    </Grid>
                    <Grid md={6}>
                      <Typography variant="h6">Image 2</Typography>
                    </Grid>
                  </Grid>
                </Box>
                <Box className="imageCordinates">
                  <Grid container>
                    <Grid md={6}>
                      <Typography> Width: {imgProps1.width} px</Typography>
                      <Typography> Height: {imgProps1.height} px</Typography>
                      <Typography>
                        {" "}
                        Size: {(file1[0].size * 0.001).toFixed(1)} KB
                      </Typography>
                    </Grid>
                    <Grid md={6}>
                      <Typography> Width: {imgProps2.width} px</Typography>
                      <Typography> Height: {imgProps2.height} px</Typography>
                      <Typography>
                        {" "}
                        Size: {(file2[0].size * 0.001).toFixed(1)} KB
                      </Typography>
                    </Grid>
                  </Grid>
                </Box>
              </Box>
            </Grid>
          </Grid>
        </Box>
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
