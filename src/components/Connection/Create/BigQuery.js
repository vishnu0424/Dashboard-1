import { Grid, MenuItem, TextField } from "@mui/material";
import {useState} from "react";
import { Controller } from "react-hook-form";
import { FormTabs } from "./FormTabs";

const Authentication = [
  {
    value: "UserAuthentication",
    label: "User Authentication",
  },
  {
    value: "ServiceAuthentication",
    label: "Service Authentication",
  },
];

const RefreshToken = {
  tab1: "Refresh token",
  tab2: "Azure Key vault",
  type: "text",
};

const clientSecret = {
  tab1: "Client Secret",
  tab2: "Azure Key vault",
  type: "text",
};

export default function BigQueryForm({
  register,
  errors,
  control,
  formData,
  defaultValues,
}) {
  const [authType, setAuthtype] = useState("UserAuthentication");

  return (
    <>
      <Grid item sm={12}>
        <TextField
          fullWidth
          size="small"
          name="Title"
          label="Description"
          rows={2}
          maxRows={4}
          multiline
          {...register("Description")}
          defaultValue={formData?.Description}
        />
      </Grid>
      <Grid item sm={12}>
        <TextField
          size="small"
          fullWidth
          label="Project ID"
          {...register("projectid", { required: true })}
          error={errors.projectid ? true : false}
          defaultValue={formData?.projectid}
        ></TextField>
      </Grid>
      <Grid item sm={12}>
        <TextField
          size="small"
          fullWidth
          label="Additional Project IDs"
          {...register("additionalPIDs")}
          defaultValue={formData?.additioanalPIDs}
        ></TextField>
      </Grid>

      <Grid item sm={12}>
        <Controller
          control={control}
          render={() => (
            <TextField
              fullWidth
              select
              label="Authentication"
              size="small"
              {...register("authenticationType", {
                required: true,
              })}
              defaultValue={
                defaultValues.authenticationType
                  ? defaultValues.authenticationType
                  : "UserAuthentication"
              }
              onChange={(e) => {
                setAuthtype(e.target.value);
              }}
            >
              {Authentication.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </TextField>
          )}
        />
      </Grid>
      {authType === "UserAuthentication" ? (
        <>
          <Grid item sm={12}>
            <TextField
              fullWidth
              size="small"
              label="Client ID"
              {...register("ClientId", { required: true })}
              error={errors.ClientId ? true : false}
              defaultValue={formData?.ClientId}
            />
          </Grid>
          <Grid item sm={12}>
            <FormTabs
              label={clientSecret}
              register={register}
              errors={errors}
              control={control}
              formData={formData}
            />
          </Grid>
          <Grid item sm={12}>
            <FormTabs
              label={RefreshToken}
              register={register}
              errors={errors}
              control={control}
              formData={formData}
            />
          </Grid>
        </>
      ) : (
        <>
          <Grid item sm={12}>
            <TextField
              fullWidth
              size="small"
              label="Email"
              {...register("email", {
                required: true,
                pattern: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
              })}
              error={errors.email ? true : false}
              defaultValue={formData?.email}
              helperText={errors.email ? "Invalid Email" : " "}
            />
          </Grid>
          <Grid item sm={12}>
            <TextField
              fullWidth
              size="small"
              label="Key File Path"
              {...register("keyfilepath", { required: true })}
              error={errors.keyfilepath ? true : false}
              defaultValue={formData?.keyfilepath}
            />
          </Grid>
        </>
      )}
    </>
  );
}
