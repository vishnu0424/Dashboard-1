import { Box, Button, Grid, Paper, TextField, Typography } from "@mui/material";
import { useContext, useRef } from "react";
import { useForm } from "react-hook-form";
import { SnackbarContext } from "../../App";
import ApiService from "../../services/app.service";

export default function SmptValidations({ smptData, anchor, toggleDrawer }) {
  const { setSnack } = useContext(SnackbarContext);
  const buttonRef = useRef(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  let defaultValues = {
    service: smptData.service ? smptData.service : "",
    host: smptData.host ? smptData.host : "",
    user: smptData.user ? smptData.user : "",
    password: smptData.password ? smptData.password : "",
  };

  const smptSubmit = async (data) => {
    try {
      await ApiService.createSmtp(data);
      buttonRef.current.click();
      setSnack({
        message: "Smtp Credentials added",
        open: true,
        colour: "success",
      });
    } catch (error) {
      setSnack({
        message: "Something went wrong",
        open: true,
        colour: "error",
      });
    }
  };

  return (
    <Box
      sx={{ width: anchor === "top" || anchor === "bottom" ? "auto" : 500 }}
      role="presentation"
    >
      <Paper
        elevation={0}
        sx={{
          "& .MuiFormControl-root": {
            mb: 1,
          },
        }}
      >
        <Box className="drawerHead">
          <Typography variant="h6">SMTP Credentials:</Typography>
        </Box>
        <Box component="form">
          <Grid container spacing={2}>
            <Grid sm={12} item>
              <TextField
                size="small"
                name="host"
                fullWidth
                defaultValue={defaultValues.host}
                label="SMTP Server"
                variant="outlined"
                {...register("host", {
                  required: true,
                  minLength: {
                    value: 4,
                    message: "Minimum length 4 char",
                  },
                })}
                helperText={
                  errors?.host?.message ? errors?.host?.message : null
                }
                error={errors?.host ? true : false}
              />
            </Grid>
            <Grid sm={12} item>
              <TextField
                size="small"
                name="user"
                fullWidth
                label="User"
                defaultValue={defaultValues.user}
                variant="outlined"
                {...register("user", {
                  required: true,
                  minLength: {
                    value: 4,
                    message: "Minimum length 4 char",
                  },
                })}
                helperText={
                  errors?.user?.message ? errors?.user?.message : null
                }
                error={errors?.user ? true : false}
              />
            </Grid>
            <Grid sm={12} item>
              <TextField
                size="small"
                name="password"
                fullWidth
                defaultValue={defaultValues.password}
                label="Password"
                variant="outlined"
                {...register("password", {
                  required: true,
                  minLength: {
                    value: 4,
                    message: "Minimum length 4 char",
                  },
                })}
                helperText={
                  errors?.password?.message ? errors?.password?.message : null
                }
                error={errors?.password ? true : false}
              />
            </Grid>
            <Grid sm={12} item>
              <Box>
                <Button
                  variant="contained"
                  onClick={toggleDrawer(anchor, false)}
                  size="small"
                  color="error"
                  ref={buttonRef}
                >
                  Cancel
                </Button>
                <Button
                  sx={{ float: "right" }}
                  onClick={handleSubmit(smptSubmit)}
                  variant="contained"
                >
                  Submit
                </Button>
              </Box>
            </Grid>
          </Grid>
        </Box>
      </Paper>
    </Box>
  );
}
