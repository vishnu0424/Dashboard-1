import {
  Box,
  Checkbox,
  FormControl,
  FormControlLabel,
  Grid,
  IconButton,
  InputAdornment,
  InputLabel,
  MenuItem,
  OutlinedInput,
  Switch,
  TextField,
  Typography,
} from "@mui/material";
import {useState} from "react";
import { Controller } from "react-hook-form";

function BearerToken({ register }) {
  return (
    <Box className="authFields">
      <Typography>
        <b>Token:</b>
      </Typography>
      <Grid container spacing={2}>
        <Grid item sm={12}>
          <TextField
            fullWidth
            size="small"
            label="Token"
            {...register("BearerToken")}
          />
        </Grid>
      </Grid>
    </Box>
  );
}

export default function Generic({
  register,
  errors,
  control,
  formData,
  expresponse,
  setExpresponse,
}) {
  const [values, setValues] = useState({
    password: "",
    showPassword: false,
  });

  const [authType, setAuthtype] = useState(
    formData?.authenticationType ? formData?.authenticationType : "No Auth"
  );

  const handleClickShowPassword = () => {
    setValues({
      ...values,
      showPassword: !values.showPassword,
    });
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const handleChangeAuthtype = (event) => {
    setAuthtype(event.target.value);
  };
  const ValExpRes = (e) => {
    setExpresponse(!expresponse);
  };

  const checkValidateJSON = (value) => {
    try {
      JSON.parse(value);
      return true;
    } catch (e) {
      return "Invalid JSON Object";
    }
  };

  function isValidHttpUrl(string) {
    let url;
    try {
      url = new URL(string);
    } catch (_) {
      return "Enter a Valid API URL";
    }
    return url.protocol === "http:" || url.protocol === "https:";
  }

  return (
    <>
      <Grid item sm={12}>
        <TextField
          fullWidth
          size="small"
          label="API Url"
          {...register("APIUrl", {
            required: true,
            validate: {
              validate: (value) => isValidHttpUrl(value) || "error message",
            },
          })}
          error={errors.APIUrl ? true : false}
          helperText={errors?.APIUrl?.message}
          defaultValue={formData?.APIUrl}
        />
      </Grid>
      <Grid item sm={12}>
        <TextField
          size="small"
          fullWidth
          select
          label="Select HTTP Method"
          {...register("HTTPMethod", { required: true })}
          defaultValue={formData?.HTTPMethod}
        >
          <MenuItem value="GET">GET </MenuItem>
          <MenuItem value="POST">POST</MenuItem>
          <MenuItem value="PUT">PUT</MenuItem>
        </TextField>
      </Grid>
      <Grid item sm={12}>
        <Controller
          control={control}
          render={() => (
            <TextField
              select
              label="Authentication Type"
              fullWidth
              size="small"
              {...register("authenticationType", { required: true })}
              defaultValue={authType}
              onChange={(e) => {
                handleChangeAuthtype(e);
              }}
            >
              <MenuItem value="">Select Authentication Type</MenuItem>
              <MenuItem value="No Auth">No Auth</MenuItem>
              <MenuItem value="API Key">API Key</MenuItem>
              <MenuItem value="Bearer Token">Bearer Token</MenuItem>
              <MenuItem value="Basic Auth">Basic Auth</MenuItem>
              <MenuItem value="OAuth 2.0">OAuth 2.0</MenuItem>
            </TextField>
          )}
        />

        <Box>
          {authType === "API Key" && (
            <Box className="authFields">
              <Typography>
                <b>API Key:</b>
              </Typography>
              <Grid container spacing={2}>
                <Grid item sm={12}>
                  <TextField
                    fullWidth
                    size="small"
                    label="Key"
                    {...register("APIKey")}
                    defaultValue={formData?.APIKey}
                  />
                </Grid>
                <Grid item sm={12}>
                  <TextField
                    fullWidth
                    size="small"
                    label="Value"
                    {...register("APIValue")}
                    defaultValue={formData?.APIValue}
                  />
                </Grid>
                <Grid item sm={12}>
                  <TextField
                    size="small"
                    fullWidth
                    select
                    label="Add to"
                    {...register("APIaddTo")}
                    defaultValue={formData?.APIaddTo}
                  >
                    <MenuItem value="Header">Header</MenuItem>
                    <MenuItem value="Query Params">Query Params</MenuItem>
                  </TextField>
                </Grid>
              </Grid>
            </Box>
          )}
          {authType === "Bearer Token" && <BearerToken register={register} />}
          {authType === "Basic Auth" && (
            <Box className="authFields">
              <Typography>
                <b>Basic Auth:</b>
              </Typography>
              <Grid container spacing={2}>
                <Grid item sm={12}>
                  <TextField
                    {...register("BasicAuthUsername", {
                      required: "This input is required.",
                    })}
                    defaultValue={formData?.BasicAuthUsername}
                    fullWidth
                    size="small"
                    label="User name"
                  />
                </Grid>
                <Grid item sm={12}>
                  <FormControl size="small" fullWidth variant="outlined">
                    <InputLabel htmlFor="outlined-adornment-password">
                      Password
                    </InputLabel>
                    <OutlinedInput
                      type={values.showPassword ? "text" : "text"}
                      endAdornment={
                        <InputAdornment position="end">
                          <IconButton
                            aria-label="toggle password visibility"
                            onClick={handleClickShowPassword}
                            onMouseDown={handleMouseDownPassword}
                            edge="end"
                          >
                          </IconButton>
                        </InputAdornment>
                      }
                      label="Password"
                      {...register("BasicAuthPassword", {
                        required: "This input is required.",
                      })}
                      defaultValue={formData?.BasicAuthPassword}
                    />
                  </FormControl>
                </Grid>
              </Grid>
            </Box>
          )}
          {authType === "OAuth 2.0" && (
            <Box className="authFields">
              <Typography>
                <b>OAuth 2.0:</b>
              </Typography>
              <Grid container spacing={2}>
                <Grid item sm={12}>
                  <TextField
                    size="small"
                    fullWidth
                    select
                    defaultValue={1}
                    label="Grant Type"
                    {...register("OAuthTwoGrantType", {
                      required: "This input is required.",
                    })}
                  >
                    <MenuItem value="Authorization Code">
                      Authorization Code
                    </MenuItem>
                    <MenuItem value="PKCE">PKCE</MenuItem>
                    <MenuItem value="Client Credentials">
                      Client Credentials
                    </MenuItem>
                    <MenuItem value="Device Code">Device Code</MenuItem>
                    <MenuItem value="Refresh Token"> Refresh Token</MenuItem>
                    <MenuItem value="Implicit Flow"> Implicit Flow</MenuItem>
                    <MenuItem value="Password Grant">Password Grant</MenuItem>
                  </TextField>
                </Grid>
                <Grid item sm={7}>
                  <TextField
                    fullWidth
                    size="small"
                    label="Callback URL"
                    {...register("OAuthTwoCallbackUrl")}
                  />
                </Grid>
                <Grid item sm={5}>
                  <FormControlLabel
                    control={<Checkbox />}
                    label="Authorize using browser"
                    {...register("OAuthTwoAuthorizeUsingBrowser")}
                  />
                </Grid>
                <Grid item sm={12}>
                  <TextField
                    fullWidth
                    size="small"
                    label="Auth URL"
                    {...register("OAuthTwoAuthURL")}
                  />
                </Grid>
                <Grid item sm={12}>
                  <TextField
                    fullWidth
                    size="small"
                    label="Access Token URL"
                    {...register("OAuthTwoAccessTokenURL")}
                  />
                </Grid>
                <Grid item sm={12}>
                  <TextField
                    fullWidth
                    size="small"
                    label="Client ID"
                    {...register("OAuthTwoClientID")}
                  />
                </Grid>
                <Grid item sm={12}>
                  <TextField
                    fullWidth
                    size="small"
                    label="Client Secret"
                    {...register("OAuthTwoClientSecret")}
                  />
                </Grid>
              </Grid>
            </Box>
          )}
        </Box>
      </Grid>
      <Grid item sm={12}>
        <TextField
          fullWidth
          size="small"
          name="Title"
          label="Request Payload"
          rows={2}
          maxRows={4}
          multiline
          defaultValue={formData?.RequestPayload}
          {...register("RequestPayload")}
        />
      </Grid>
      <Grid item sm={12}>
        <Box mb="8px" sx={{ "& label": { ml: 0 } }}>
          <Controller
            control={control}
            render={() => (
              <FormControlLabel
                {...register("ValidateWithExpectedResponse", {
                  onChange: (e) => ValExpRes(e),
                })}
                control={
                  <Switch checked={expresponse} size="small" color="primary" />
                }
                label="Validate with expected response?"
                labelPlacement="end"
              />
            )}
          />
        </Box>
        {expresponse && (
          <TextField
            fullWidth
            size="small"
            name="Title"
            label="Expected Response Sample"
            rows={6}
            maxRows={6}
            multiline
            defaultValue={formData?.ExpectedResponseSample}
            {...register("ExpectedResponseSample", {
              required: true,

              validate: {
                validate: (value) =>
                  checkValidateJSON(value) || "error message",
              },
            })}
            error={errors.ExpectedResponseSample ? true : false}
            helperText={
              errors?.ExpectedResponseSample?.message
                ? errors?.ExpectedResponseSample?.message
                : null
            }
          />
        )}
      </Grid>
    </>
  );
}
