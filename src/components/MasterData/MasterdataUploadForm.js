import ErrorOutlineOutlinedIcon from "@mui/icons-material/ErrorOutlineOutlined";
import FileDownloadDoneOutlinedIcon from "@mui/icons-material/FileDownloadDoneOutlined";
import {
  Box,
  Button,
  CircularProgress,
  Divider,
  FormHelperText,
  Grid,
  MenuItem,
  TextField,
  Typography,
} from "@mui/material";
import * as React from "react";
import { useContext, useRef, useState } from "react";
import ApiService from "../../services/app.service";
import { SnackbarContext } from "../../App";
import dragImg from "../../images/Drag_Drop.png";

export default function MasterdataUploadForm({ fetchList, returnValue }) {
  const boarderCss = {
    border: "1px dashed #096eb6",
  };

  const validTypes = [
    "application/vnd.ms-excel",
    ".csv",
    "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    "text/csv",
  ];

  const { setSnack } = useContext(SnackbarContext);
  const [wrapCss, setBoarder] = useState(boarderCss);
  const fileInput = useRef();

  const [uploadButton, setuploadButton] = useState(true);

  const [loader, setLoading] = useState(false);

  const [masterdataName, setmasterdataName] = useState("");

  const [description, setdescription] = useState("");

  const [showdelimiter, setDelimiterShow] = useState(false);
  const [delimiter, setdelimiter] = useState(",");

  const [file, setFile] = useState();
  const [formError, setformError] = useState("");
  const [fileError, setError] = useState(false);
  const [fileSuccess, setFileSuccess] = useState(false);

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
    if (validTypes.indexOf(files[0].type) === -1) {
      setError(true);
      setuploadButton(true);
      return false;
    }
    let originalname = files[0].name;
    let ext = originalname.split(".")[originalname.split(".").length - 1];
    if (ext === "csv") {
      setDelimiterShow(true);
    } else {
      setDelimiterShow(false);
    }
    setFileSuccess(true);
    setFile(files);
    setuploadButton(false);
  };

  const handleFileChange = (e) => {
    const files = e.target.files;
    if (validTypes.indexOf(files[0].type) === -1) {
      setError(true);
      setuploadButton(true);
      return false;
    }
    setFileSuccess(false);
    setError(false);
    let originalname = e.target.files[0].name;
    let ext = originalname.split(".")[originalname.split(".").length - 1];
    if (ext === "csv") {
      setDelimiterShow(true);
    } else {
      setDelimiterShow(false);
    }
    setFileSuccess(true);
    setFile(files);
    setuploadButton(false);
  };

  const handleFileDrag = (e) => {
    e.preventDefault();
    setBoarder({ border: "1px solid #1976d2" });
  };

  const handleFileDragleave = (e) => {
    e.preventDefault();
    setBoarder(boarderCss);
  };

  const handleMasterdataName = (e) => {
    setmasterdataName(e.target.value);
    if (e.target.value.trim().length < 4) {
      setformError("Minimum length 4 char");
    } else {
      setformError("");
    }
  };

  const handledescription = (e) => {
    setdescription(e.target.value);
  };

  const changeDelimiter = (e) => {
    setdelimiter(e.target.value);
  };

  const Formdata = (data) => {
    let formData = new FormData();
    Object.keys(data).forEach((key2) => {
      formData.append(key2, data[key2]);
    });
    return formData;
  };

  // upload a file to db
  const uploadFiles = async (e) => {
    if (masterdataName.trim().length === 0) {
      setformError("This field is required");
      return;
    } else if (masterdataName.trim().length < 4) {
      setformError("Minimum length 4 char");
      return;
    }
    setLoading(true);
    setuploadButton(true);
    var data = {
      file: file[0],
      delimiter: delimiter,
      name: masterdataName,
      description: description,
    };
    let fomdata = Formdata(data);
    try {
      let response = await ApiService.MasterdataUpload(fomdata);
      returnValue(response.data.response);
      setFileSuccess(false);
      setLoading(false);
      setdelimiter(",");
      setDelimiterShow(false);
      setuploadButton(true);
      fetchList();
      setSnack({
        message: "File uploaded successfully",
        open: true,
        colour: "success",
      });
    } catch (error) {
      setLoading(false);
      setuploadButton(false);
      setSnack({
        message: error.response.data.name.message
          ? "Master datasource Name already Exists"
          : error.response.data.message,
        open: true,
        colour: "error",
      });
    }
  };

  return (
    <Box
      style={wrapCss}
      sx={{ p: 1.25, mb: 1 }}
      onDrop={(e) => handleFileDrop(e)}
      onDragOver={(e) => handleFileDrag(e)}
      onDragEnter={(e) => handleFileDrag(e)}
      onDragLeave={(e) => handleFileDragleave(e)}
    >
      <Grid container spacing={2} alignItems="center">
        <Grid item sx={{ m: "auto" }} xs={12} md={7} className="fileUpGrid1">
          <Grid container>
            <Grid item xs={12} mb="16px" mt="4px">
              <TextField
                fullWidth
                size="small"
                label="Masterdata Source Name*"
                value={masterdataName}
                onChange={handleMasterdataName}
              />
              <Typography className="errorText">{formError}</Typography>
            </Grid>
            <Grid item xs={12} mb="16px" mt="4px">
              <TextField
                fullWidth
                size="small"
                label="Description"
                minRows={2}
                maxRows={4}
                multiline
                value={description}
                onChange={handledescription}
              />
            </Grid>
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
                  only
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
                accept=".xlsx, .xls, .csv"
              />
            </Grid>
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
            <Grid item xs={12} mb="16px" mt="4px">
              <FormHelperText>
                Note: Master Data can be a Single Column of data(Excel) or a
                long string of comma separated values(CSV). Only Single column
                data is accepted as Master data.
              </FormHelperText>
            </Grid>
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
      </Grid>
      <Divider sx={{ my: 1 }} />
      <Box sx={{ textAlign: "center" }}>
        <Typography sx={{ m: "auto" }}>
          <img alt="loading.." src={dragImg} width="200px" />
        </Typography>
      </Box>
    </Box>
  );
}
