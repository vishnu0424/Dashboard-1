import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import {
  Box,
  FormControl,
  Grid,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  Tab,
  Tabs,
  TextField,
  Typography,
} from "@mui/material";
import * as React from "react";

export function FormTabs(props) {
  const { label, register, errors, formData } = props;

  const [tabvalue, setTabvalue] = React.useState("one");
  const [values, setValues] = React.useState({
    password: "",
    showPassword: false,
  });
  const handleChangeTab = (event, newValue) => {
    setTabvalue(newValue);
  };
  const handleClickShowPassword = () => {
    setValues({
      ...values,
      showPassword: !values.showPassword,
    });
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };
  const handleChange = (prop) => (event) => {
    setValues({ ...values, [prop]: event.target.value });
  };

  return (
    <Box className="formTabs">
      <Box sx={{ width: "100%" }}>
        <Tabs value={tabvalue} onChange={handleChangeTab}>
          <Tab value="one" label={label.tab1} />

          <Tab value="two" label={label.tab2} />
        </Tabs>
      </Box>
      {tabvalue === "one" && (
        <Box className="authFields">
          <Typography>
            <b>{label.tab1}:</b>
          </Typography>

          <Grid item sm={12}>
            {label.type === "password" && (
              <FormControl size="small" fullWidth variant="outlined">
                <InputLabel htmlFor="outlined-adornment-password">
                  {label.tab1}
                </InputLabel>
                <OutlinedInput
                  type={values.showPassword ? "text" : "password"}
                  onChange={handleChange("password")}
                  endAdornment={
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={handleClickShowPassword}
                        onMouseDown={handleMouseDownPassword}
                        edge="end"
                      >
                        {values.showPassword ? (
                          <Visibility />
                        ) : (
                          <VisibilityOff />
                        )}
                      </IconButton>
                    </InputAdornment>
                  }
                  label={label.tab1}
                  {...register(label.tab1.replace(/\s/g, ""), {
                    required: true,
                  })}
                  error={errors[label.tab1.replace(/\s/g, "")] ? true : false}
                  defaultValue={formData[label.tab1.replace(/\s/g, "")]}
                />
              </FormControl>
            )}

            {label.type === "text" && (
              <TextField
                fullWidth
                size="small"
                label={label.tab1}
                {...register(label.tab1.replace(/\s/g, ""), { required: true })}
                error={errors[label.tab1.replace(/\s/g, "")] ? true : false}
                defaultValue={formData[label.tab1.replace(/\s/g, "")]}
              />
            )}
          </Grid>
        </Box>
      )}
      {tabvalue === "two" && (
        <Box className="authFields">
          <Typography>
            <b>{label.tab2}:</b>
          </Typography>

          <Grid item sm={12}>
            <TextField
              fullWidth
              size="small"
              label={label.tab2}
              {...register(label.tab2.replace(/\s/g, ""), { required: true })}
              error={errors[label.tab1.replace(/\s/g, "")] ? true : false}
              defaultValue={formData[label.tab2.replace(/\s/g, "")]}
            />
          </Grid>
        </Box>
      )}
    </Box>
  );
}
