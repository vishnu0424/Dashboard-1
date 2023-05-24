import ErrorOutlineOutlinedIcon from "@mui/icons-material/ErrorOutlineOutlined";
import FileDownloadDoneOutlinedIcon from "@mui/icons-material/FileDownloadDoneOutlined";
import {
  Box,
  Button,
  Checkbox,
  CircularProgress,
  Divider,
  FormControlLabel,
  Grid,
  MenuItem,
  TextField,
  Typography,
} from "@mui/material";
import { useContext, useState, useRef } from "react";
import { SnackbarContext } from "../../App";
import dragImg from "../../images/Drag_Drop.png";
import ApiService from "../../services/app.service";
import FilePreview from "./FilePreview";

const FileHandle = ({
  rows,
  setfile,
  validationPage,
  returnValue,
}) => {
  const boarderCss = {
    border: "1px dashed #096eb6",
  };
  const { setSnack } = useContext(SnackbarContext);
  const fileInput = useRef();

  const [uploadButton, setuploadButton] = useState(true);

  const [loader, setLoading] = useState(false);

  const [showdelimiter, setDelimiterShow] = useState(false);

  const [firstRowisHeader, setfirstRowisHeader] = useState(true);
  const [delimiter, setdelimiter] = useState(",");
  const [file, setFile] = useState();
  const [connectionName, setconnectionName] = useState("");
  const [formError, setformError] = useState("");
  const [fileError, setError] = useState(false);

  const [fileSuccess, setFileSuccess] = useState(false);
  const [wrapCss, setBoarder] = useState(boarderCss);

  const [previewFile, setpreviewFile] = useState(false);

  const handleFileDrop = (e) => {
    e.preventDefault();
    if (loader) {
      return;
    }
    setBoarder(boarderCss);
    setFileSuccess(false);
    setError(false);
    setFile();
    const files = e.dataTransfer.files;
    const validTypes = [
      "application/vnd.ms-excel",
      "xml",
      "application/json",
      ".csv",
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      "text/plain",
      "text/csv",
    ];
    if (validTypes.indexOf(files[0].type) === -1) {
      setError(true);
      setuploadButton(true);
      return false;
    }
    let originalname = files[0].name;
    let ext = originalname.split(".")[originalname.split(".").length - 1];
    if (ext === "csv" || ext === "txt") {
      setDelimiterShow(true);
    } else {
      setDelimiterShow(false);
    }
    setFileSuccess(true);
    setFile(files);
    setuploadButton(false);
    setfile(files[0]);
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
    const validTypes = [
      "application/vnd.ms-excel",
      ".csv",
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      "text/plain",
      "text/csv",
      "text/xml",
      "application/json",
    ];
    if (validTypes.indexOf(files[0].type) === -1) {
      setError(true);
      setuploadButton(true);
      return false;
    }
    setFileSuccess(false);
    setError(false);
    let originalname = e.target.files[0].name;
    let ext = originalname.split(".")[originalname.split(".").length - 1];
    if (ext === "csv" || ext === "txt") {
      setDelimiterShow(true);
    } else {
      setDelimiterShow(false);
    }
    setFileSuccess(true);
    setFile(e.target.files);
    setuploadButton(false);
    setfile(e.target.files[0]);
  };

  // upload a file to db
  const uploadFiles = async (e) => {
    if (connectionName.trim().length === 0) {
      setformError("This field is required");
      return;
    } else if (connectionName.trim().length < 4) {
      setformError("Minimum length 4 char");
      return;
    }
    var check = await checkValidateUnique(connectionName);
    if (check.data.data > 0) {
      setformError("Data Source Name already existed");
      return;
    } else {
      setformError("");
    }
    setLoading(true);
    setuploadButton(true);
    const validTypes = [
      "application/vnd.ms-excel",
      "application/json",
      ".csv",
      ".json",
      "text/xml",
      "text/plain",
      "text/csv",
    ];
    var data = {
      file: file[0],
      delimiter: delimiter,
      connectionName: connectionName,
      firstRowisHeader: firstRowisHeader,
    };
    if (validTypes.indexOf(file[0].type) === -1) {
      data = {
        file: file[0],
        connectionName: connectionName,
        firstRowisHeader: firstRowisHeader,
      };
      setdelimiter(",");
    }
    try {
      let response = await ApiService.uploadFiles(data);
      returnValue(response?.data?.response);
      let val = response?.data;
      rows(val.rows.data);
      setFileSuccess(false);
      setFile();
      setfirstRowisHeader(true);
      setdelimiter(",");
      setDelimiterShow(false);
      setuploadButton(true);
      setSnack({
        message: "File uploaded successfully",
        open: true,
        colour: "success",
      });
    } catch (error) {
      setuploadButton(false);
      setSnack({
        message: error.response.data.message,
        open: true,
        colour: "error",
      });
    }
    setLoading(false);
  };

  const changeDelimiter = (e) => {
    setdelimiter(e.target.value);
  };

  const handleHeader = (e) => {
    setfirstRowisHeader(e.target.checked);
  };

  const handleConnectionName = (e) => {
    setconnectionName(e.target.value);
    if (e.target.value.trim().length < 4) {
      setformError("Minimum length 4 char");
    } else {
      setformError("");
    }
  };

  const checkValidateUnique = async (val) => {
    const checkVal = await ApiService.CheckConnectionUnique({
      key: val,
      id: "",
    });
    return checkVal;
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
            {rows && (
              <Grid item xs={12} mb="16px" mt="4px">
                <TextField
                  fullWidth
                  size="small"
                  label="Data Source Name"
                  onChange={handleConnectionName}
                />
                <Typography className="errorText">{formError}</Typography>
              </Grid>
            )}
            <Grid item xs={8}>
              <Box
                className="fileTextbox"
                onClick={() => (loader ? "" : fileInput.current.click())}
                title={file ? file[0].name : "Choose a file"}
              >
                {file ? file[0].name : "Choose a file"}

                {fileSuccess && (
                  <FileDownloadDoneOutlinedIcon className="sucIcon" />
                )}
              </Box>
              {fileError && (
                <Typography className="errorText">
                  <ErrorOutlineOutlinedIcon /> Allowed file types are excel, csv
                  and delimiter text
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
                disabled={loader}
              >
                Browse
              </Button>
              <input
                ref={fileInput}
                onChange={handleFileChange}
                type="file"
                onClick={(e) => (e.target.value = null)}
                style={{ display: "none" }}
                accept=".xlsx, .xls, .csv, .txt, .json, .xml"
              />
            </Grid>
            {validationPage && (
              <Grid item xs={2} sx={{ pl: 1 }}>
                {previewFile ? (
                  <FilePreview
                    file={file[0]}
                    model={true}
                    returnValue={(value) => {
                      setpreviewFile(value);
                    }}
                  />
                ) : (
                  <></>
                )}
                <Button
                  onClick={() => {
                    setpreviewFile(true);
                  }}
                  disabled={!file}
                  sx={{ mr: 1, borderRadius: 0 }}
                  fullWidth
                  size="small"
                  variant="contained"
                >
                  Preview
                </Button>
              </Grid>
            )}
            {rows && (
              <Grid item xs={2} sx={{ pl: 1 }}>
                <Button
                  disabled={uploadButton}
                  size="small"
                  fullWidth
                  variant="contained"
                  onClick={uploadFiles}
                >
                  {loader ? (
                    <CircularProgress
                      style={{ width: "20%", height: "20%", color: "#ffffff" }}
                    />
                  ) : (
                    "Upload"
                  )}
                </Button>
              </Grid>
            )}
          </Grid>
        </Grid>
        <Grid item xs={6} md={2} className="gridCusmd">
          {showdelimiter && (
            <TextField
              fullWidth
              select
              label="Delimiter"
              size="small"
              defaultValue=","
              onChange={(e) => changeDelimiter(e)}
            >
              <MenuItem key="comma" value=",">
                Comma
              </MenuItem>
              <MenuItem key="colon" value=":">
                Colon
              </MenuItem>
              <MenuItem key="Equal Sign" value="=">
                Equal Sign
              </MenuItem>
              <MenuItem key="semicolon" value=";">
                Semicolon
              </MenuItem>
              <MenuItem key="Tab" value="\t">
                Tab
              </MenuItem>
              <MenuItem key="Space" value=" ">
                Space
              </MenuItem>
            </TextField>
          )}
        </Grid>
        {rows && (
          <Grid
            item
            xs={6}
            md={3}
            className="gridCusmd"
            sx={{ textAlign: "right" }}
          >
            <FormControlLabel
              control={
                <Checkbox checked={firstRowisHeader} onChange={handleHeader} />
              }
              label="First Row is Header"
              labelPlacement="start"
              size="small"
            />
          </Grid>
        )}
      </Grid>
      <Divider sx={{ my: 1 }} />
      <Box sx={{ textAlign: "center" }}>
        <Typography sx={{ m: "auto" }}>
          <img alt="loading.." src={dragImg} width="200px" />
        </Typography>
      </Box>
    </Box>
  );
};

export default FileHandle;
