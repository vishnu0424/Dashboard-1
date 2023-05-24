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
  TextField,
  Typography,
} from "@mui/material";
import CircularProgress from "@mui/material/CircularProgress";
import { useContext, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { SnackbarContext } from "../../App";
import ApiService from "../../services/app.service";

const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
const checkedIcon = <CheckBoxIcon fontSize="small" />;

export default function PipeLineTestScheduler(props) {
  const { selectedData, retVal, scheduleData, scheduledId, fetchList } = props;
  const naviate = useNavigate();
  const { setSnack } = useContext(SnackbarContext);
  const [SelectedValue, setSelectedValue] = useState([]);
  const [dropDown, setdropDown] = useState([]);
  const [loadingSubmit, setLoadingSubmit] = useState(false);
  const [loading, setLoading] = useState(false);
  const [editStatus, setEditStatus] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    (async () => {
      try {
        let response = await ApiService.getValidationList();
        setdropDown(response?.data?.validationTests);
        let val = [...SelectedValue];
        selectedData.forEach((element) => {
          let a = response?.data?.result.filter((obj) => obj._id === element);
          val.push(a[0]);
        });
        setSelectedValue(val);
      } catch (error) {
        console.log(error);
      }
    })();
  }, []);

  const formatData = (data) => {
    var res = {
      Title: data.Title,
      Description: data.Description,
      ExecuteParallel: scheduleData.ExecuteParallel,
      TestIds: SelectedValue,
      Type: data.Type,
    };
    return res;
  };

  async function createPipeLineTest(data) {
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
      await ApiService.updatePipeLineData(scheduledId, res).then((response) => {
        setLoadingSubmit(false);
        retVal(false);
        fetchList();
        setSnack({
          message: "PipeLine Updated",
          open: true,
          colour: "success",
        });
      });
    } else {
      await ApiService.createPileLine(res).then((response) => {
        setLoadingSubmit(false);
        if (fetchList) {
          fetchList();
          retVal(false);
        } else {
          naviate("pipeline/list");
        }
        setSnack({
          message: "PipeLine created",
          open: true,
          colour: "success",
        });
      });
    }
  }

  const createNewTest = async (data) => {
    setLoading(true);
    var res = formatData(data);
    await ApiService.createPileLine(res);
    setLoading(false);
    setSnack({ message: "PipeLine created", open: true, colour: "success" });
    retVal(false);
    fetchList();
  };

  const checkValidateUnique = async (val) => {
    var checkVal;
    if (!!editStatus) {
      checkVal = await ApiService.checkPipeLineTitle({ key: val });
    } else {
      checkVal = await ApiService.checkPipeLineTitle({
        key: val,
        id: scheduledId,
      });
    }
    if (checkVal.data.result.length > 0) {
      return "Name already existed";
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
        <Typography variant="h6">Execute as CI/CD pipeline step:</Typography>
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
        <Grid item sm={12} sx={{ m: "auto" }}>
          <Autocomplete
            multiple
            size="small"
            limitTags={1}
            id="checkboxes-tags-demo"
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
              <TextField
                {...params}
                label="Select Data Quality Rules"
                placeholder="Test Name"
              />
            )}
          />
        </Grid>
        <Grid sm={12} item>
          <FormControl fullWidth size="small">
            <InputLabel id="demo-simple-select-label">Select Type</InputLabel>
            <Select
              defaultValue={scheduleData.Type}
              name="Type"
              label="Select Type"
              {...register("Type")}
              helperText={errors?.Type?.message ? errors?.Type?.message : null}
              error={errors.Type ? true : false}
            >
              <MenuItem value={"Jenkins"}>Jenkins</MenuItem>
              <MenuItem value={"Azure Devops"}>Azure Devops</MenuItem>
            </Select>
          </FormControl>
        </Grid>
      </Grid>
      <Box mt="8px">
        <Grid container>
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
              onMouseEnter={() => {
                editTableStatus(false);
              }}
              onClick={handleSubmit(createPipeLineTest)}
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
