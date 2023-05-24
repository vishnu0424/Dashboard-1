import CheckBoxIcon from "@mui/icons-material/CheckBox";
import CheckBoxOutlineBlankIcon from "@mui/icons-material/CheckBoxOutlineBlank";
import {
  Autocomplete,
  Box,
  Button,
  Checkbox,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  Switch,
  TextField,
  Typography,
} from "@mui/material";
import CircularProgress from "@mui/material/CircularProgress";
import moment from "moment";
import { useContext, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { SnackbarContext } from "../../App";
import ApiService from "../../services/app.service";

const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
const checkedIcon = <CheckBoxIcon fontSize="small" />;

export default function TestScheduler(props) {
  const {
    selectedData,
    retVal,
    scheduleData,
    setscheduleData,
    scheduledId,
    fetchList,
  } = props;

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const watchFields = watch();
  const naviate = useNavigate();
  const { setSnack } = useContext(SnackbarContext);
  const [editStatus, setEditStatus] = useState(false);
  const [SelectedValue, setSelectedValue] = useState([]);
  const [dropDown, setdropDown] = useState([]);
  const [visualTests, setVisualTests] = useState([]);
  const [loadingSubmit, setLoadingSubmit] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setSelectedValue([]);
  }, [watchFields.TestType]);

  useEffect(() => {
    (async () => {
      let response = await ApiService.getValidationList();
      setdropDown(response.data?.validationTests);
      setVisualTests(response.data?.visualTests);

      if (selectedData) {
        let val = [...SelectedValue];
        selectedData.forEach((element) => {
          let SelectedTests =
            scheduleData.TestType === "Validation Test"
              ? response.data?.validationTests
              : response.data?.visualTests;
          var a = SelectedTests.filter((obj) => obj._id === element);
          val.push(a[0]);
        });
        setSelectedValue(val);
      }
    })();
  }, []);

  const handleCustomChange = (e) => {
    let data = { ...scheduleData };
    data["Custom"][e.target.name] = e.target.value;
    setscheduleData(data);
  };

  const formatData = (data) => {
    var res = {
      Title: data.Title,
      RepeatType: scheduleData.RepeatType,
      Description: data.Description,
      FromDate: data.FromDate,
      ExecuteParallel: scheduleData.ExecuteParallel,
      TestType: data.TestType,
    };
    if (data.TestType === "Validation Test") {
      res["TestIds"] = SelectedValue;
    } else {
      res["VisuvalTestIds"] = SelectedValue;
    }
    if (scheduleData.RepeatType === true) {
      res["Frequency"] = data.Frequency;
      res["NoOfTimes"] = data.NoOfTimes;
    } else {
      res["Frequency"] = "";
      res["NoOfTimes"] = "";
    }
    return res;
  };

  async function scheduleTest(data) {
    if (SelectedValue.length === 0) {
      setSnack({
        message: "Select atleast one test",
        open: true,
        colour: "error",
      });
      return;
    }
    setLoadingSubmit(true);
    var res = formatData(data);
    if (scheduledId) {
      await ApiService.updateScheduledTestData(scheduledId, res);
      setLoadingSubmit(false);
      retVal(false);
      fetchList();
      setSnack({
        message: "Schedule DQ Rule Updated",
        open: true,
        colour: "success",
      });
    } else {
      await ApiService.createScheduleRun(res);
      if (fetchList) {
        setLoadingSubmit(false);
        retVal(false);
        fetchList();
      } else {
        naviate("scheduled/list");
      }
      setSnack({
        message: "Schedule DQ Rule created",
        open: true,
        colour: "success",
      });
    }
  }

  const createNewTest = async (data) => {
    setLoading(true);
    var res = formatData(data);
    await ApiService.createScheduleRun(res);
    setLoading(false);
    setSnack({
      message: "Schedule DQ Rule created",
      open: true,
      colour: "success",
    });
    retVal(false);
    fetchList();
  };

  const checkValidateUnique = async (val) => {
    var checkVal;
    if (!!editStatus) {
      checkVal = await ApiService.checkScheduledTitle({ key: val });
    } else {
      checkVal = await ApiService.checkScheduledTitle({
        key: val,
        id: scheduledId,
      });
    }
    if (checkVal.data.result.length > 0) {
      return "Scheduled Name already existed";
    } else {
      return true;
    }
  };

  const editTableStatus = (val) => {
    setEditStatus(val);
  };

  return (
    <Box component="form" sx={{}} noValidate autoComplete="off">
      <Box className="drawerHead">
        <Typography variant="h6">Schedule DQ Rule:</Typography>
      </Box>

      <Grid item container spacing={2}>
        <Grid sm={12} item>
          <TextField
            fullWidth
            size="small"
            name="Title"
            label="Name"
            defaultValue={scheduleData.Title}
            variant="outlined"
            {...register("Title", {
              required: true,
              minLength: {
                value: 4,
                message: "Minimum length 4 char",
              },
              validate: {
                validate: (value) =>
                  checkValidateUnique(value, scheduleData._id) ||
                  "error message",
              },
            })}
            helperText={errors?.Title?.message ? errors?.Title?.message : null}
            error={errors.Title ? true : false}
          />
        </Grid>
        <Grid sm={12} item>
          <TextField
            fullWidth
            size="small"
            name="Description"
            label="Description"
            defaultValue={scheduleData.Description}
            variant="outlined"
            {...register("Description", {
              required: true,
              minLength: {
                value: 4,
                message: "Minimum length 4 char",
              },
            })}
            helperText={
              errors?.Description?.message ? errors?.Description?.message : null
            }
            error={errors.Description ? true : false}
          />
        </Grid>
        <Grid sm={12} item>
          <TextField
            select
            fullWidth
            label="DQ Source Type"
            size="small"
            defaultValue={
              scheduleData.TestType ? scheduleData.TestType : "Validation Test"
            }
            onChange={(e) => {
              let data = { ...scheduleData };
              data[e.target.name] = e.target.value;
              setscheduleData(data);
            }}
            {...register("TestType", { required: true })}
            error={errors.TestType ? true : false}
          >
            <MenuItem value={"Validation Test"}>Data Quality Rules</MenuItem>
            <MenuItem value={"Visual Test"}>Visual Tests</MenuItem>
          </TextField>
        </Grid>
        {watchFields.TestType === "Validation Test" ? (
          <Grid item sm={12} sx={{ m: "auto" }}>
            <Autocomplete
              multiple
              size="small"
              limitTags={1}
              options={dropDown}
              value={SelectedValue}
              disableCloseOnSelect
              getOptionLabel={(option) => option?.TestName}
              onChange={(event, newValue, reason) => {
                if (reason === "selectOption") {
                  setSelectedValue(newValue);
                } else if (reason === "removeOption") {
                  setSelectedValue(newValue);
                } else if (reason === "clear") {
                  setSelectedValue([]);
                }
              }}
              renderOption={(props, option, { selected }) => (
                <li {...props}>
                  <Checkbox
                    icon={icon}
                    checkedIcon={checkedIcon}
                    style={{ marginRight: 8 }}
                    checked={selected}
                  />
                  {option.TestName}
                </li>
              )}
              style={{ width: 500 }}
              renderInput={(params) => (
                <TextField {...params} label="Select Data Quality Rules" />
              )}
            />
          </Grid>
        ) : (
          <Grid item sm={12} sx={{ m: "auto" }}>
            <Autocomplete
              multiple
              size="small"
              limitTags={1}
              options={visualTests}
              value={SelectedValue}
              disableCloseOnSelect
              getOptionLabel={(option) => option?.TestName}
              onChange={(event, newValue, reason) => {
                if (reason === "selectOption") {
                  setSelectedValue(newValue);
                } else if (reason === "removeOption") {
                  setSelectedValue(newValue);
                } else if (reason === "clear") {
                  setSelectedValue([]);
                }
              }}
              renderOption={(props, option, { selected }) => (
                <li {...props}>
                  <Checkbox
                    icon={icon}
                    checkedIcon={checkedIcon}
                    style={{ marginRight: 8 }}
                    checked={selected}
                  />
                  {option.TestName}
                </li>
              )}
              style={{ width: 500 }}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Select Visual Test"
                  placeholder="Visual Test"
                />
              )}
            />
          </Grid>
        )}
        <Grid item sm={6}>
          <TextField
            fullWidth
            size="small"
            name="FromDate"
            inputProps={{
              min: new Date().toISOString().slice(0, 16),
            }}
            defaultValue={moment(scheduleData.FromDate).format(
              "YYYY-MM-DDTHH:mm"
            )}
            id="datetime-local"
            label="Schedule Date & Time"
            type="datetime-local"
            InputLabelProps={{
              shrink: true,
            }}
            {...register("FromDate", { required: true })}
            error={errors.FromDate ? true : false}
          />
        </Grid>
        <Grid item sm={6}>
          Repeat
          <Switch
            onChange={(e) => {
              let data = { ...scheduleData };
              data[e.target.name] = e.target.checked;
              setscheduleData(data);
            }}
            name="RepeatType"
            checked={scheduleData.RepeatType}
          />
        </Grid>
        {scheduleData.RepeatType === true && (
          <>
            <Grid item sm={6}>
              <FormControl size="small" fullWidth>
                <InputLabel id="demo-simple-select-label">Frequency</InputLabel>
                <Select
                  defaultValue={scheduleData.Frequency}
                  label="Frequency"
                  {...register("Frequency", { required: true })}
                  error={errors.Frequency ? true : false}
                >
                  <MenuItem value={"12"}>Every 12 hrs</MenuItem>
                  <MenuItem value={"24"}>Every 24 hrs</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item sm={6}>
              <FormControl size="small" fullWidth>
                <TextField
                  label="No of Times"
                  name="NoOfTimes"
                  InputProps={{ inputProps: { min: "1", step: "1" } }}
                  size="small"
                  type="number"
                  defaultValue={scheduleData.NoOfTimes}
                  onChange={handleCustomChange}
                  {...register("NoOfTimes", {
                    required: true,
                    validate: {
                      validate: (value) => parseInt(value[0]) > 0 || "Grater",
                    },
                  })}
                  error={errors.NoOfTimes ? true : false}
                />
              </FormControl>
            </Grid>
          </>
        )}
        <Grid item sm={6}>
          Execute In Parallel
          <Switch
            onChange={(e) => {
              let data = { ...scheduleData };
              data[e.target.name] = e.target.checked;
              setscheduleData(data);
            }}
            name="ExecuteParallel"
            checked={scheduleData.ExecuteParallel}
          />
        </Grid>
      </Grid>
      <Box
        sx={{
          mt: 2,
          textAlign: "center",
          "& .MuiButton-root": {
            "&:nth-of-type(1)": {
              mr: 1,
            },
          },
        }}
      >
        <Grid
          container
          sx={{ m: 1 }}
          rowSpacing={1}
          columnSpacing={{ xs: 1, sm: 2, md: 3 }}
        >
          <Grid item xs={4} textAlign="left">
            <Button
              variant="contained"
              onClick={() => {
                retVal(false);
              }}
              color="error"
              size="small"
            >
              Cancel
            </Button>
          </Grid>
          <Grid item xs={4} textAlign="center">
            {scheduledId && (
              <Button
                disabled={loading}
                variant="contained"
                size="small"
                color="success"
                onMouseEnter={() => {
                  editTableStatus(true);
                }}
                onClick={handleSubmit(createNewTest)}
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
                    Save As New
                  </>
                ) : (
                  <>Save As New</>
                )}
              </Button>
            )}
          </Grid>
          <Grid item xs={4} textAlign="right">
            <Button
              disabled={loadingSubmit}
              variant="contained"
              size="small"
              sx={{ mr: 1 }}
              onMouseEnter={() => {
                editTableStatus(false);
              }}
              onClick={handleSubmit(scheduleTest)}
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
                  Save
                </>
              ) : (
                <>Save</>
              )}
            </Button>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
}
