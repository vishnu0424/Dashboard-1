import ErrorOutlineOutlinedIcon from "@mui/icons-material/ErrorOutlineOutlined";
import FileDownloadDoneOutlinedIcon from "@mui/icons-material/FileDownloadDoneOutlined";
import { Box, Button, Divider, Grid, Typography } from "@mui/material";
import { useState, useRef } from "react";
import { useLocation } from "react-router-dom";
import FilePreview from "./FilePreview";

const FileHandle = ({ FileInfo, fileUrl, validationPage }) => {
  const location = useLocation();
  let fileUrlType = typeof fileUrl;
  const boarderCss = {
    border: "1px dashed #096eb6",
  };
  const fileInput = useRef();
  const [fileError, setError] = useState(false);

  const [fileSuccess, setFileSuccess] = useState(false);
  const [wrapCss, setBoarder] = useState(boarderCss);

  const [previewFile, setpreviewFile] = useState(false);
  const [fileData, setFileData] = useState([]);

  const fileReader = new FileReader();

  if (fileUrlType === "object") {
    fileReader.readAsText(fileUrl, "UTF-8");
    fileReader.onload = (e) => {
      setFileData(JSON.parse(e.target.result));
    };
  }
  let placeholderFile = "";

  if (
    ["/api-automation/create", "/api-automation/create/"].includes(
      location.pathname
    )
  ) {
    placeholderFile = fileUrl ? fileUrl.name : "Choose a file";
  } else {
    placeholderFile =
      fileUrl && fileUrlType === "object"
        ? fileUrl?.name
        : fileUrl && fileUrlType === "string"
        ? fileUrl
        : "Choose a file";
  }

  const handleFileDrop = (e) => {
    e.preventDefault();
    setBoarder(boarderCss);
    setFileSuccess(false);
    setError(false);
    const files = e.dataTransfer.files;
    setFileSuccess(true);
    FileInfo(files[0]);
  };

  const handleFileDragOver = (e) => {
    e.preventDefault();
    setBoarder({ border: "1px solid #1976d2" });
  };

  const handleFileDragEnter = (e) => {
    e.preventDefault();
    setBoarder({ border: "1px solid #1976d2" });
  };

  const handleFileDragLeave = (e) => {
    e.preventDefault();
    setBoarder(boarderCss);
  };

  const handleFileChange = (e) => {
    const files = e.target.files;
    const validTypes = ["application/json"];
    if (validTypes.indexOf(files[0].type) === -1) {
      setError(true);
      return false;
    }
    setError(false);
    FileInfo(e.target.files[0]);

    fileReader.readAsText(e.target.files[0], "UTF-8");
    fileReader.onload = (e) => {
      setFileData(JSON.parse(e.target.result));
    };
  };

  return (
    <Box
      style={wrapCss}
      sx={{ p: 1.25, mb: 1 }}
      onDrop={(e) => handleFileDrop(e)}
      onDragOver={(e) => handleFileDragOver(e)}
      onDragEnter={(e) => handleFileDragEnter(e)}
      onDragLeave={(e) => handleFileDragLeave(e)}
    >
      <Grid container spacing={2} alignItems="center">
        <Grid item sx={{ m: "auto" }} xs={12} md={7} className="fileUpGrid1">
          <Grid container>
            <Grid item xs={8}>
              <Box
                className="fileTextbox"
                onClick={() => {fileInput.current.click()}}
                title={placeholderFile}
              >
                {placeholderFile}

                {fileSuccess && (
                  <FileDownloadDoneOutlinedIcon className="sucIcon" />
                )}
              </Box>
              {fileError && (
                <Typography className="errorText">
                  <ErrorOutlineOutlinedIcon /> Allowed file types JSON
                </Typography>
              )}
            </Grid>
            <Grid item xs={2}>
              <Button
                fullWidth
                size="small"
                sx={{ borderRadius: 0 }}
                onClick={() => fileInput.current.click()}
                variant="outlined"
              >
                Browse
              </Button>
              <input
                ref={fileInput}
                onChange={handleFileChange}
                type="file"
                onClick={(e) => (e.target.value = null)}
                style={{ display: "none" }}
                accept=".json"
              />
            </Grid>
            {validationPage && (
              <Grid item xs={2} sx={{ pl: 1 }}>
                {previewFile && (
                  <FilePreview
                    file={fileData}
                    model={true}
                    returnValue={(value) => {
                      setpreviewFile(value);
                    }}
                  />
                )}
                <Button
                  onClick={() => {
                    setpreviewFile(true);
                  }}
                  disabled={typeof fileUrl === "string"}
                  sx={{ mr: 1, borderRadius: 0 }}
                  fullWidth
                  size="small"
                  variant="contained"
                >
                  Preview
                </Button>
              </Grid>
            )}
          </Grid>
        </Grid>
      </Grid>
      <Divider sx={{ my: 1 }} />
    </Box>
  );
};

export default FileHandle;
