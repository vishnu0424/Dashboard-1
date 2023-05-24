import { Grid, MenuItem, TextField } from "@mui/material";
import { FormTabs } from "./FormTabs";

export default function SalesforceForm({
  register,
  errors,
  control,
  formData,
}) {
  const password = {
    tab1: "Password",
    tab2: "Azure Key vault",
    labelName: "password",
    type: "password",
  };

  const securityToken = {
    tab1: "Security token",
    tab2: "Azure Key vault",
    type: "text",
  };
  const clientSecret = {
    tab1: "Client Secret",
    tab2: "Azure Key vault",
    type: "text",
  };

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
          {...register("Description", { required: true })}
          error={errors.Description ? true : false}
          defaultValue={formData?.Description}
        />
      </Grid>

      <Grid item sm={12}>
        <TextField
          size="small"
          fullWidth
          select
          label="Connection via integration runtime"
          {...register("AutoResolveIntegrationRuntime", { required: true })}
          error={errors.AutoResolveIntegrationRuntime ? true : false}
          defaultValue={formData?.AutoResolveIntegrationRuntime}
        >
          <MenuItem value="AutoResolveIntegrationRuntime">
            Auto Resolve Integration Runtime{" "}
          </MenuItem>
        </TextField>
      </Grid>
      <Grid item sm={12}>
        <TextField
          size="small"
          fullWidth
          label="Environment url"
          {...register("EnvironmentUrl", { required: true })}
          error={errors.EnvironmentUrl ? true : false}
          defaultValue={formData?.EnvironmentUrl}
        ></TextField>
      </Grid>
      <Grid item sm={12}>
        <TextField
          size="small"
          fullWidth
          label="Domain"
          {...register("Domain", { required: true })}
          error={errors.Domain ? true : false}
          defaultValue={formData?.Domain}
        ></TextField>
      </Grid>

      <Grid item sm={12}>
        <TextField
          fullWidth
          size="small"
          label="User name"
          {...register("Username", { required: true })}
          error={errors.Username ? true : false}
          defaultValue={formData?.Username}
        />
      </Grid>

      <Grid item sm={12}>
        <FormTabs
          label={password}
          register={register}
          errors={errors}
          control={control}
          formData={formData}
        />
      </Grid>
      <Grid item sm={12}>
        <FormTabs
          label={securityToken}
          register={register}
          errors={errors}
          control={control}
          formData={formData}
        />
      </Grid>
      <Grid item sm={12}>
        <TextField
          fullWidth
          size="small"
          label="Client ID"
          {...register("ClientId")}
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
    </>
  );
}
