import CancelOutlinedIcon from "@mui/icons-material/CancelOutlined";
import { Box, Button, Modal } from "@mui/material";
import CanvasImage from "./CanvasImage";
import style from "./Style";
export function ImagePreview(props) {
  const {
    open,
    setOpen,
    url,
    sourceImage,
    differences,
    imgProps,
    setImgProps,
  } = props;

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Box className="imgDisplay">
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Box className="popBtns">
            <Button variant="contained" size="small" onClick={handleClose}>
              Ok
            </Button>
            <Button
              color="error"
              variant="contained"
              size="small"
              onClick={handleClose}
            >
              <CancelOutlinedIcon />
              Cancel
            </Button>
          </Box>
          <Box className="pop">
            <Box className="imgBox">
              {url ? (
                <img src={url} alt="my image" />
              ) : (
                <CanvasImage
                  sourceImage={sourceImage}
                  differences={differences}
                  imgProps={imgProps}
                  setImgProps={setImgProps}
                />
              )}
            </Box>
          </Box>
        </Box>
      </Modal>
    </Box>
  );
}
