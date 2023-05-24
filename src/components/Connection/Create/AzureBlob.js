import { Grid, TextField } from "@mui/material";

export default function AzureBlob({ register, errors, formData }) {
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
          defaultValue={formData?.accountkey}
          {...register("accountkey", { required: true })}
          label="Account Key"
          fullWidth
          error={errors.accountkey ? true : false}
          variant="outlined"
          size="small"
        />
      </Grid>
      <Grid item sm={12}>
        <TextField
          defaultValue={formData?.accountname}
          {...register("accountname", { required: true })}
          label="Storage account Name"
          fullWidth
          error={errors.accountname ? true : false}
          variant="outlined"
          size="small"
        />
      </Grid>
    </>
  );
}
