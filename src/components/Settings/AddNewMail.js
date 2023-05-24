import CheckBoxIcon from "@mui/icons-material/CheckBox";
import CheckBoxOutlineBlankIcon from "@mui/icons-material/CheckBoxOutlineBlank";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import {
  Autocomplete,
  Button,
  Checkbox,
  Grid,
  IconButton,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import Box from "@mui/material/Box";
import CircularProgress from "@mui/material/CircularProgress";
import Drawer from "@mui/material/Drawer";
import { Fragment, useContext, useEffect, useState } from "react";
import { SnackbarContext } from "../../App";
import ApiService from "../../services/app.service";
import SelectDeleted from "../Tables/SelectDeleted";

const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
const checkedIcon = <CheckBoxIcon fontSize="small" />;

export default function AddNewMail({
  dropDown,
  fetchData,
  edit,
  userData,
  selected,
  deleteSelected,
  openDialog,
  setOpenDialog,
}) {
  const initialUserState = {
    Name: "",
    Email: "",
    Password: "Password",
    TestValidationIds: [],
    emailError: "",
  };

  const { setSnack } = useContext(SnackbarContext);
  const [state, setState] = useState({ right: false });
  const [SelectedValue, setSelectedValue] = useState([]);
  const [loading, setLoading] = useState(false);
  const [users, setUsers] = useState(initialUserState);

  useEffect(() => {
    if (edit) {
      let a = {
        Name: "",
        Email: "",
        Password: "Password",
        TestValidationIds: [],
        errors: {},
      };
      a["Name"] = userData.Name;
      a["Email"] = userData.Email;
      a["Password"] = userData.Password;
      let val = [];
      userData.TestValidationIds.forEach((element) => {
        let a = dropDown.filter((obj) => obj._id === element._id);
        val.push(a[0]);
      });
      setSelectedValue(val);
      a["TestValidationIds"] = userData.TestValidationIds;
      setUsers(a);
    }
  }, [userData]);

  const handleChange = (e) => {
    let data = { ...users };
    data[e.target.name] = e.target.value;
    setUsers(data);
  };

  const addEmail = async () => {
    if (SelectedValue.length === 0) {
      setSnack({
        message: "Select atleast one test",
        open: true,
        colour: "error",
      });
      return;
    }
    setLoading(true);
    users.TestValidationIds = SelectedValue;
    try {
      await ApiService.addUser(users);
      setState({ right: false });
      fetchData();
      setUsers(initialUserState);
      setSelectedValue([]);
      setSnack({ message: "Created", open: true, colour: "success" });
    } catch (error) {
      let usersErrors = { ...users };
      usersErrors.errors = error.response.data;
      setUsers(usersErrors);
    }
    setLoading(false);
  };

  const editEmail = async () => {
    if (SelectedValue.length === 0) {
      setSnack({
        message: "Select atleast one test",
        open: true,
        colour: "error",
      });
      return;
    }
    setLoading(true);
    users.TestValidationIds = SelectedValue;
    try {
      await ApiService.editUser(users, userData._id);
      setState({ right: false });
      fetchData();
      setSnack({ message: "Updated", open: true, colour: "success" });
    } catch (error) {
      let usersErrors = { ...users };
      usersErrors.errors = error.response.data;
      setUsers(usersErrors);
    }
    setLoading(false);
  };

  const toggleDrawer = (anchor, open) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }
    if (!open && edit === false) {
      setUsers(initialUserState);
      setSelectedValue([]);
    }
    setState({ ...state, [anchor]: open });
  };

  const list = (anchor) => (
    <Box
      sx={{ width: anchor === "top" || anchor === "bottom" ? "auto" : 500 }}
      role="presentation"
    >
      <Paper elevation={0}>
        <Box className="drawerHead">
          <Typography variant="h6">
            {!edit ? "Add New User:" : "Update User:"}
          </Typography>
        </Box>
        <Box component="form">
          <Grid spacing={2} container>
            <Grid sm={12} item>
              <TextField
                size="small"
                value={users.Name}
                helperText={users.errors?.Name?.message}
                error={users.errors?.Name}
                name="Name"
                onChange={handleChange}
                fullWidth
                label="Name"
                variant="outlined"
              />
            </Grid>
            <Grid sm={12} item>
              <TextField
                size="small"
                value={users.Email}
                helperText={users.errors?.Email?.message}
                error={users.errors?.Email}
                name="Email"
                onChange={handleChange}
                fullWidth
                label="Email"
                variant="outlined"
              />
            </Grid>
            <Grid sm={12} item>
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
          </Grid>
        </Box>
        <Box mt="16px">
          <Button
            variant="contained"
            onClick={toggleDrawer(anchor, false)}
            size="small"
            color="error"
          >
            Cancel
          </Button>
          {!edit ? (
            <Button
              disabled={loading}
              variant="contained"
              size="small"
              sx={{ float: "right" }}
              onClick={() => {
                addEmail();
              }}
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
                  Save
                </>
              ) : (
                <>Save</>
              )}
            </Button>
          ) : (
            <Button
              disabled={loading}
              variant="contained"
              size="small"
              sx={{ float: "right" }}
              onClick={() => {
                editEmail();
              }}
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
                <>Update</>
              )}
            </Button>
          )}
        </Box>
      </Paper>
    </Box>
  );

  return (
    <div>
      {["right"].map((anchor) => (
        <Fragment key={anchor}>
          {!edit ? (
            <>
              {selected.length !== 0 ? (
                <SelectDeleted
                  numSelected={selected.length}
                  deleteFun={deleteSelected}
                  openDialog={openDialog}
                  setOpenDialog={setOpenDialog}
                />
              ) : (
                <>
                  <Button
                    onClick={toggleDrawer(anchor, true)}
                    variant="outlined"
                    size="small"
                  >
                    add user
                  </Button>
                </>
              )}
            </>
          ) : (
            <IconButton
              color="success"
              onClick={toggleDrawer(anchor, true)}
              title="Edit"
              size="small"
            >
              <EditOutlinedIcon />
            </IconButton>
          )}
          <Drawer anchor={anchor} open={state[anchor]}>
            {list(anchor)}
          </Drawer>
        </Fragment>
      ))}
    </div>
  );
}
