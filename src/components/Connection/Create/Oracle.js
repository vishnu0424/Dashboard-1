import { Grid, MenuItem, TextField } from "@mui/material";
import { useState } from "react";
import { Controller } from "react-hook-form";

const Connection = [
  {
    value: "Servive Name",
    label: "Oracle Service Name",
  },
  {
    value: "SID",
    label: "Oracle SID",
  },
];

export default function OracleForm({
  register,
  errors,
  control,
  formData,
  defaultValues,
}) {
  const [connType, setConnType] = useState("SID");

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
          defaultValue={formData?.host}
          {...register("host", { required: true })}
          label="Host"
          fullWidth
          error={errors.host ? true : false}
          variant="outlined"
          size="small"
        />
      </Grid>
      <Grid item sm={12} style={{ display: "flex" }}>
        <Grid item sm={4} marginRight={2}>
          <Controller
            control={control}
            render={() => (
              <TextField
                fullWidth
                select
                label="Connection Type"
                size="small"
                {...register("connType", {
                  required: true,
                })}
                defaultValue={
                  defaultValues.connType ? defaultValues.connType : "SID"
                }
                onChange={(e) => {
                  setConnType(e.target.value);
                }}
              >
                {Connection.map((option) => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.label}
                  </MenuItem>
                ))}
              </TextField>
            )}
          />
        </Grid>
        {connType === "SID" ? (
          <Grid item sm={8}>
            <TextField
              defaultValue={formData?.sid}
              fullWidth
              {...register("sid", { required: true })}
              label="SID"
              error={errors.sid ? true : false}
              variant="outlined"
              size="small"
            />
          </Grid>
        ) : (
          <Grid item sm={8}>
            <TextField
              defaultValue={formData?.servicename}
              fullWidth
              {...register("servicename", { required: true })}
              label="Service Name"
              error={errors.servicename ? true : false}
              variant="outlined"
              size="small"
            />
          </Grid>
        )}
      </Grid>
    </>
  );
}
