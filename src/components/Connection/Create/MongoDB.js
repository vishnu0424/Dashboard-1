import { Grid, TextField } from "@mui/material";

export default function MongoDB({ register, errors, formData }) {
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
          defaultValue={formData?.connectionstring}
          {...register("connectionstring", { required: true })}
          label="Connection String"
          fullWidth
          error={errors.connectionstring ? true : false}
          variant="outlined"
          size="small"
        />
      </Grid>
      <Grid item sm={12}>
        <TextField
          defaultValue={formData?.database}
          {...register("database", { required: true })}
          label="Database"
          fullWidth
          error={errors.database ? true : false}
          variant="outlined"
          size="small"
        />
      </Grid>
    </>
  );
}
