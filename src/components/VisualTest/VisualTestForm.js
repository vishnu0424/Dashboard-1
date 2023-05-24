import {
  Box,
  Button,
  FormControlLabel,
  Grid,
  MenuItem,
  Switch,
  TextField,
  Typography,
} from "@mui/material";
import CircularProgress from "@mui/material/CircularProgress";
import * as React from "react";
import { useContext, useEffect, useRef, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { SnackbarContext } from "../../App";
import appService from "../../services/app.service";
import ImageCordinates from "./ImageCordinates";
import ImageUpload from "./ImageUpload";
import SelectCoordinatesModal from "./SelectCoordinatesModal";

export default function VisualTestForm(props) {
  const { setSnack } = useContext(SnackbarContext);

  const ScrollRef = useRef();

  const { setState, type, defaultValues, returnValue } = props;
  const {
    handleSubmit,
    register,
    reset,
    setValue,
    setError,
    control,
    formState: { errors },
    getValues,
  } = useForm({ defaultValues });

  const [Imgarea1, setImgarea1] = useState([]);
  const [loading, setLoading] = useState(false);
  const [BaseImage, setBaseImage] = useState(
    defaultValues?.UploadBaseImage ? defaultValues.UploadBaseImage : false
  );

  const [loadingSubmit, setLoadingSubmit] = useState(false);

  const [file1, setFile1] = useState();

  const ValBaseImageUrl = (e) => {
    setBaseImage(!BaseImage);
  };

  useEffect(() => {
    if (type === "edit") {
      setFile1(getValues("BaseImage"));
    }
  }, [type]);

  useEffect(() => {
    if (file1) {
      if (file1[0]) setValue("BaseImage", file1[0]);
      else setValue("BaseImage", file1.location);
    }
    if (type === "edit") {
      setImgarea1(getValues("IgnoredAreas"));
    }
  }, [file1]);

  const [imgProps1, setImgProps1] = useState({ width: 0, height: 0 });

  function isValidHttpUrl(string) {
    let url;
    try {
      url = new URL(string);
    } catch (_) {
      return false;
    }
    return url.protocol === "http:" || url.protocol === "https:";
  }
  const ScrolltoTop = () => {
    setTimeout(() => {
      ScrollRef.current.scrollIntoView({
        behavior: "smooth",
        block: "start",
        inline: "nearest",
      });
    }, 400);
  };

  const handleSave = async (data) => {
    setLoadingSubmit(true);
    if (BaseImage && !data.BaseImage) {
      setSnack({
        message: "Upload a base image",
        open: true,
        colour: "error",
      });
      ScrolltoTop();
    } else {
      if (data._id) {
        delete data._id;
      }
      data["IgnoredAreas"] = Imgarea1;
      try {
        await appService.createVisualTest(data);
        reset();
        returnValue(false);
        setSnack({
          message: "Visual Test created",
          open: true,
          colour: "success",
        });
      } catch (err) {
        Object.keys(err?.response?.data).map((obj) => {
          setError(obj, {
            type: "custom",
            message: err.response.data[obj].message,
          });
        });
        ScrolltoTop();
      }
    }
    setLoadingSubmit(false);
  };

  const handleEdit = async (data) => {
    setLoading(true);
    if (BaseImage && !data.BaseImage) {
      setSnack({
        message: "Upload a base image",
        open: true,
        colour: "error",
      });
      ScrolltoTop();
    } else {
      data["IgnoredAreas"] = Imgarea1;
      try {
        await appService.editVisualTest(defaultValues._id, data);
        reset();
        returnValue(false);
        setSnack({
          message: "Visual Test Updated",
          open: true,
          colour: "success",
        });
      } catch (error) {
        setSnack({
          message: "somthing went wrong",
          open: true,
          colour: "error",
        });
        ScrolltoTop();
      }
    }
    setLoading(false);
  };

  return (
    <Box>
      <Typography sx={{ flex: "1 1 100%", mb: 1 }} variant="h6" component="div">
        {type === "add" ? "New" : "Edit"} Visual Test:
      </Typography>
      <Grid item container spacing={2} ref={ScrollRef}>
        <Grid sm={12} item>
          <TextField
            fullWidth
            size="small"
            label="Test Name"
            error={errors.TestName ? true : false}
            {...register("TestName", {
              required: "This input is required.",
              minLength: {
                value: 4,
                message: "Minimum length 4 char",
              },
            })}
            helperText={errors?.TestName?.message}
          />
        </Grid>
        {BaseImage && (
          <>
            <Grid xs={6} item>
              <Box className="imgUpMain">
                <Box className="imgDisplay">
                  <SelectCoordinatesModal
                    Imgarea1={Imgarea1}
                    file={file1}
                    setImgarea1={setImgarea1}
                    imgProps1={imgProps1}
                    setImgProps1={setImgProps1}
                    data={{
                      threshold: getValues("Threshold"),
                      Comparison: "Strict",
                      Highlight_Differences: "true",
                      count_to_get: getValues("MaxDifferences"),
                      color: "rgb(255 0 0 / 52%)",
                    }}
                  />
                </Box>
                <ImageUpload setFile={setFile1} file={file1} />
              </Box>
            </Grid>
            <Grid xs={6} item>
              <ImageCordinates
                Imgarea1={Imgarea1}
                setImgarea1={setImgarea1}
                file1={file1}
                sizes={false}
              />
            </Grid>
          </>
        )}
        {errors?.file?.message}
        <Grid item xs={12}>
          <Box mb="8px" sx={{ "& label": { ml: 0 } }}>
            <Controller
              control={control}
              render={() => (
                <FormControlLabel
                  {...register("UploadBaseImage", {
                    onChange: (e) => ValBaseImageUrl(e),
                  })}
                  control={
                    <Switch checked={BaseImage} size="small" color="primary" />
                  }
                  label="Upload Base Image?"
                  labelPlacement="end"
                />
              )}
            />
          </Box>
        </Grid>
        <Grid sm={6} item>
          <TextField
            size="small"
            select
            fullWidth
            label="Threshold"
            name="threshold"
            defaultValue={
              defaultValues?.Threshold ? defaultValues.Threshold : "50"
            }
            {...register("Threshold", {
              required: "This input is required.",
            })}
            error={errors.Threshold ? true : false}
          >
            <MenuItem value="50"> 50 </MenuItem>
            <MenuItem value="100"> 100 </MenuItem>
            <MenuItem value="150"> 150 </MenuItem>
            <MenuItem value="200"> 200 </MenuItem>
            <MenuItem value="250"> 250 </MenuItem>
          </TextField>
        </Grid>
        <Grid sm={6} item>
          <TextField
            type="number"
            fullWidth
            defaultValue="10"
            InputProps={{ inputProps: { min: "1", step: "1" } }}
            onKeyPress={(e) => {
              if (e.code === "Minus") {
                e.preventDefault();
              } else if (e.code === "Digit0" && e.target.value.length === 0) {
                e.preventDefault();
              }
            }}
            error={errors.MaxDifferences ? true : false}
            {...register("MaxDifferences", {
              required: "This input is required.",
            })}
            size="small"
            label="No. of differences"
            variant="outlined"
          />
        </Grid>
        <Grid sm={12} item>
          <TextField
            fullWidth
            size="small"
            label="Application Url"
            {...register("ApplicationUrl", {
              required: "This input is required.",

              validate: {
                validate: (value) => isValidHttpUrl(value) || "error message",
              },
            })}
            helperText={errors?.ApplicationUrl?.message}
            error={errors.ApplicationUrl ? true : false}
          />
        </Grid>
        <Grid sm={12} item>
          <TextField
            fullWidth
            size="small"
            label="Application Name"
            {...register("ApplicationName", {
              required: "This input is required.",
              minLength: {
                value: 4,
                message: "Minimum length 4 char",
              },
            })}
            helperText={errors?.ApplicationName?.message}
            error={errors.ApplicationName ? true : false}
          />
        </Grid>
      </Grid>
      <Grid
        container
        sx={{ m: 1 }}
        rowSpacing={1}
        columnSpacing={{ xs: 1, sm: 2, md: 3 }}
      >
        <Grid item xs={4} textAlign="left">
          <Button
            variant="contained"
            color="error"
            size="small"
            onClick={() => {
              setState(false);
            }}
          >
            Cancel
          </Button>
        </Grid>
        <Grid item xs={4} textAlign="center">
          {type === "edit" && (
            <Button
              variant="contained"
              type="submit"
              size="small"
              sx={{ mr: 1 }}
              disabled={loadingSubmit || loading}
              onClick={handleSubmit(handleSave)}
            >
              {loadingSubmit ? (
                <>
                  <CircularProgress
                    style={{
                      width: "20px",
                      height: "20px",
                      color: "#ffffff",
                      marginRight: "8px",
                    }}
                  />
                  Create as New
                </>
              ) : (
                <> Create as New</>
              )}
            </Button>
          )}
        </Grid>
        <Grid item xs={4} textAlign="right">
          {type === "edit" ? (
            <Button
              variant="contained"
              type="submit"
              color="success"
              size="small"
              sx={{ mr: 1 }}
              disabled={loading || loadingSubmit}
              onClick={handleSubmit(handleEdit)}
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
                  Update
                </>
              ) : (
                <> Update</>
              )}
            </Button>
          ) : (
            <Button
              variant="contained"
              type="submit"
              color="success"
              size="small"
              sx={{ mr: 1 }}
              disabled={loadingSubmit}
              onClick={handleSubmit(handleSave)}
            >
              {loadingSubmit ? (
                <>
                  <CircularProgress
                    style={{
                      width: "20px",
                      height: "20px",
                      color: "#ffffff",
                      marginRight: "8px",
                    }}
                  />
                  Create
                </>
              ) : (
                <> Create</>
              )}
            </Button>
          )}
        </Grid>
      </Grid>
    </Box>
  );
}
