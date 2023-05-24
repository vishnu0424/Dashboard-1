import { Grid, TextField } from "@mui/material";

function isValidHttpUrl(string) {
  let url;
  try {
    url = new URL(string);
  } catch (_) {
    return "Enter a Valid Http Path";
  }
  return url.protocol === "http:" || url.protocol === "https:";
}

export default function HBaseForm({ register, errors, formData }) {
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
      <Grid item sm={12}>
        <TextField
          defaultValue={formData?.httppath}
          {...register("httppath", {
            required: true,
            validate: {
              validate: (value) => isValidHttpUrl(value) || "error message",
            },
          })}
          helperText={errors?.httppath?.message}
          label="Http path"
          fullWidth
          error={errors.httppath ? true : false}
          variant="outlined"
          size="small"
        />
      </Grid>
    </>
  );
}
