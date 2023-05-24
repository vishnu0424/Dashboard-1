import { AreaSelector } from "@bmunozg/react-image-area";
import CancelOutlinedIcon from "@mui/icons-material/CancelOutlined";
import RestartAltOutlinedIcon from "@mui/icons-material/RestartAltOutlined";
import { Box, Button, IconButton, Modal, Typography } from "@mui/material";
import { useEffect, useRef, useState } from "react";

export default function SelectCoordinatesModal(props) {
  const { Imgarea1, file, setImgarea1, data, imgProps1, setImgProps1 } = props;

  const myCanvas = useRef();

  const [open, setOpen] = useState(false);

  const handleOpen = () => setOpen(true);

  const handleClose = () => setOpen(false);

  const style = {
    display: "flex",
    alignItems: "center",
    width: "auto",
    textAlign: "center",
    height: "100vh",
    maxHeight: "100vh",
    overflow: "auto",
    "& .pop": {
      margin: "auto",
      "& img": {
        backgroundColor: "#fff",
      },
    },
    "& .popBtns": {
      position: "absolute",
      top: "4px",
      right: "0",
      zIndex: "9",
      "& button": {
        marginRight: "4px",
      },
      "& button.MuiIconButton-root": {
        border: "1px solid #ed6c02",
        backgroundColor: "#ed6c02",
        color: "#fff",
        borderRadius: "4px",
        marginRight: "8px",
      },
    },
  };

  const onChangeHandler1 = (areas) => {
    setImgarea1(areas);
    drawRectangle();
    drawRectangle();
  };

  useEffect(() => {
    if (file) drawRectangle();
  }, [file, Imgarea1]);

  function drawRectangle() {
    let context2 = myCanvas.current.getContext("2d");
    let image2 = new Image();
    if (file[0]) {
      image2.src = URL.createObjectURL(file[0]);
    } else {
      image2.src = file.location;
    }
    image2.onload = () => {
      context2.drawImage(image2, 0, 0);
      let props = { width: image2.width, height: image2.height };
      setImgProps1(props);
      Imgarea1.forEach((obj) => {
        let r1Style = { borderColor: data.color, borderWidth: 3 };
        drawRect(obj, r1Style, context2);
      });
    };
  }

  const drawRect = (info, style = {}, context) => {
    let { x, y, width, height } = info;
    let { borderColor, borderWidth } = style;
    context.beginPath();
    context.lineWidth = borderWidth;
    context.strokeStyle = borderColor;
    context.rect(x, y, width, height);
    context.stroke();
  };

  const customRender = (areaProps) => {
    if (!areaProps.isChanging) {
      return (
        <Box className="corCount" key={areaProps.areaNumber}>
          {areaProps.areaNumber}
        </Box>
      );
    }
  };

  return (
    <>
      {file && (
        <Box className="openCorBtn" onClick={handleOpen}>
          <Typography>Select Area to ignore</Typography>
        </Box>
      )}
      {file && (
        <Box className="imgBox">
          <canvas
            ref={myCanvas}
            width={imgProps1.width}
            height={imgProps1.height}
          />
        </Box>
      )}
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Box className="popBtns">
            <IconButton
              color="warning"
              variant="contained"
              size="small"
              onClick={() => {
                setImgarea1([]);
              }}
            >
              <RestartAltOutlinedIcon />
            </IconButton>
            <Button variant="contained" size="small" onClick={handleClose}>
              Ok
            </Button>
            <Button
              color="error"
              variant="contained"
              size="small"
              onClick={() => {
                setImgarea1([]);
                setOpen(false);
              }}
            >
              <CancelOutlinedIcon />
              Cancel
            </Button>
          </Box>
          <Box className="pop">
            <AreaSelector
              areas={Imgarea1}
              onChange={onChangeHandler1}
              customAreaRenderer={customRender}
            >
              {file && (
                <Box className="imgBox">
                  {file[0] ? (
                    <img src={URL.createObjectURL(file[0])} alt="my image" />
                  ) : (
                    <img src={file.location} alt="my image" />
                  )}
                </Box>
              )}
            </AreaSelector>
          </Box>
        </Box>
      </Modal>
    </>
  );
}
