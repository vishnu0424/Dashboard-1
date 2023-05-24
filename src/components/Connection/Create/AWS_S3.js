import { Grid, TextField } from "@mui/material";

export default function AwsS3({ register, errors, formData }) {
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
          defaultValue={formData?.accesskey}
          {...register("accesskey", { required: true })}
          label="Access Key ID"
          fullWidth
          error={errors.accesskey ? true : false}
          variant="outlined"
          size="small"
        />
      </Grid>
      <Grid item sm={12}>
        <TextField
          defaultValue={formData?.secretaccess}
          {...register("secretaccess", { required: true })}
          label="Secret Access Key"
          fullWidth
          error={errors.secretaccess ? true : false}
          variant="outlined"
          size="small"
        />
      </Grid>
    </>
  );
}
