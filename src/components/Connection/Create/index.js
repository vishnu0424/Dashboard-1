import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import { IconButton, InputAdornment } from "@mui/material";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import CircularProgress from "@mui/material/CircularProgress";
import Grid from "@mui/material/Grid";
import MenuItem from "@mui/material/MenuItem";
import Paper from "@mui/material/Paper";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableRow from "@mui/material/TableRow";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import { useContext, useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { SnackbarContext } from "../../../App";
import ApiService from "../../../services/app.service";
import AwsS3 from "./AWS_S3";
import AzureBlob from "./AzureBlob";
import BigQueryForm from "./BigQuery";
import { FormTabs } from "./FormTabs";
import Generic from "./Generic";
import HBaseForm from "./HBase";
import MongoDB from "./MongoDB";
import OracleForm from "./Oracle";
import SalesforceForm from "./Salseforce";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

const Authentication = [
  {
    value: "SQL Server Authentication",
    label: "Server Authentication",
  },
  {
    value: "Active Directory - Integrated",
    label: "Active Directory - Integrated",
  },
];

export default function CreateConnection({
  type,
  formData,
  selected,
  EffectedRow,
  returnValue,
  connectionType,
}) {
  const password = {
    tab1: "Password",
    tab2: "Azure Key vault",
    labelName: "password",
    type: "password",
  };

  const [typeCon, setTypeCon] = useState(type);
  const [isauth, setIsauth] = useState(false);
  const { setSnack } = useContext(SnackbarContext);
  const [loading, setLoading] = useState(false);
  const [loadingSubmit, setLoadingSubmit] = useState(false);
  const [loadingValidate, setLoadingValidate] = useState(false);
  const [connType, setConnType] = useState();

  const ConTypes = [
    {
      value: "SQL",
      label: "SQL",
    },
    {
      value: "Oracle",
      label: "Oracle",
    },
    {
      value: "My SQL",
      label: "My SQL",
    },
    {
      value: "SAP HANA",
      label: "SAP HANA",
    },
    {
      value: "PostgreSQL",
      label: "PostgreSQL",
    },
    {
      value: "snowflake",
      label: "Snowflake",
    },
    {
      value: "Azure SQL",
      label: "Azure SQL",
    },
  ];

  const defaultValues = {
    connectionName: formData.connectionName ? formData.connectionName : "",
    connectionType: connectionType,
    authenticationType: formData.authenticationType
      ? formData.authenticationType
      : "",
    server: formData.server ? formData.server : "",
    password: formData.password ? formData.password : "",
    dataBase: formData.dataBase ? formData.dataBase : "",
    user: formData.user ? formData.user : "",
    id: formData.id ? formData.id : "",
  };

  const {
    register,
    formState: { errors },
    handleSubmit,
    control,
  } = useForm();

  const [expresponse, setExpresponse] = useState(
    formData?.ValidateWithExpectedResponse === true ? true : false
  );

  const Toster = ({ msg, mType }) => {
    setSnack({ message: msg, open: true, colour: mType });
  };
  const onChangeAuthenticationType = (event) => {
    if (event.target.value === "SQL Server Authentication") {
      setIsauth(true);
    } else {
      setIsauth(false);
    }
  };
  useEffect(() => {
    if (defaultValues.authenticationType === "SQL Server Authentication") {
      setIsauth(true);
    }
  }, [isauth]);

  const onSubmitTestCreate = async (data) => {
    setLoadingSubmit(true);
    if (defaultValues.id) {
      try {
        let response = await ApiService.ConnectionUpdate(
          data,
          defaultValues.id
        );
        Toster({
          msg: "Connection updated successfully",
          mType: "success",
        });
        selected(true);
        EffectedRow(response.data);
      } catch (error) {
        Toster({
          msg:
            typeof error?.response?.data?.message === "string"
              ? error?.response.data.message
              : "Failed to connect Datasource",
          mType: "error",
        });
      }
    } else {
      try {
        let response = await ApiService.ConnectionCreate(data);
        returnValue(response.data.rows.data[0]);
        Toster({
          msg: "connection created successfully",
          mType: "success",
        });
        selected(true);
        EffectedRow(response.data);
      } catch (error) {
        Toster({
          msg:
            typeof error?.response?.data?.message === "string"
              ? error?.response?.data?.message
              : "Failed to connect Datasource",
          mType: "error",
        });
      }
    }
    setLoadingSubmit(false);
  };
  const onSubmitTest = (data) => {
    setLoading(true);
    TestConnecton(data);
  };
  const onSubmitValidate = (data) => {
    setLoadingValidate(true);
    TestConnecton(data);
  };
  const TestConnecton = async (data) => {
    try {
      await ApiService.TestConnection(data);
      Toster({ msg: "Connected successfully", mType: "success" });
    } catch (error) {
      Toster({
        msg:
          typeof error?.response?.data?.message === "string"
            ? error?.response?.data?.message
            : "Failed to connect to Datasource",
        mType: "error",
      });
    }
    setLoading(false);
    setLoadingValidate(false);
  };

  const checkValidateUnique = async (val) => {
    const checkVal = await ApiService.CheckConnectionUnique({
      key: val,
      id: defaultValues.id,
    });
    if (checkVal.data.data > 0) {
      return "Data Source Name already existed";
    } else {
      return true;
    }
  };

  const [showPassword, setShowPassword] = useState(false);
  const handleClickShowPassword = () => setShowPassword(!showPassword);
  const handleMouseDownPassword = () => setShowPassword(!showPassword);
  return (
    <Box>
      <Box className="drawerHead">
        <Typography variant="h6">
          {typeCon} {connectionType} Data Source:
        </Typography>
      </Box>

      {typeCon === "View" ? (
        <>
          {" "}
          <TableContainer component={Paper}>
            <Table aria-label="customized table">
              <TableBody>
                <StyledTableRow key={formData.connectionName}>
                  <StyledTableCell component="th" scope="row">
                    connectionName:
                  </StyledTableCell>
                  <StyledTableCell align="Left">
                    {formData.connectionName}
                  </StyledTableCell>
                </StyledTableRow>
                <StyledTableRow key={formData.connectionType}>
                  <StyledTableCell component="th" scope="row">
                    connectionType:
                  </StyledTableCell>
                  <StyledTableCell align="Left">
                    {formData.connectionType}
                  </StyledTableCell>
                </StyledTableRow>

                <StyledTableRow key={formData.server}>
                  <StyledTableCell component="th" scope="row">
                    Server:
                  </StyledTableCell>
                  <StyledTableCell align="Left">
                    {formData.server}
                  </StyledTableCell>
                </StyledTableRow>

                <StyledTableRow key={formData.dataBase}>
                  <StyledTableCell component="th" scope="row">
                    Database:
                  </StyledTableCell>
                  <StyledTableCell align="Left">
                    {formData.dataBase}
                  </StyledTableCell>
                </StyledTableRow>

                <StyledTableRow key={formData.user}>
                  <StyledTableCell component="th" scope="row">
                    User:
                  </StyledTableCell>
                  <StyledTableCell align="Left">
                    {formData.user}
                  </StyledTableCell>
                </StyledTableRow>
                <StyledTableRow key={formData.password}>
                  <StyledTableCell component="th" scope="row">
                    Password:
                  </StyledTableCell>
                  <StyledTableCell align="Left">*******</StyledTableCell>
                </StyledTableRow>
              </TableBody>
            </Table>
          </TableContainer>
          <Grid
            container
            sx={{ m: 1 }}
            rowSpacing={1}
            columnSpacing={{ xs: 1, sm: 2, md: 3 }}
          >
            <Grid item xs={4} textAlign="left">
              <Button
                onClick={() => {
                  selected(true);
                }}
                variant="contained"
                color="error"
                size="medium"
              >
                Cancel
              </Button>
            </Grid>
            <Grid item xs={4} textAlign="center"></Grid>
            <Grid item xs={4} textAlign="right">
              <Button
                onClick={() => {
                  setTypeCon("Edit");
                }}
                variant="outlined"
                color="success"
                size="medium"
              >
                Edit
              </Button>
            </Grid>
          </Grid>{" "}
        </>
      ) : (
        <>
          <Box component="form" noValidate autoComplete="off">
            <Grid item container spacing={2}>
              <Grid item sm={12}>
                <TextField
                  defaultValue={defaultValues.connectionName}
                  fullWidth
                  {...register("connectionName", {
                    required: true,
                    minLength: {
                      value: 4,
                      message: "Minimum length 4 char",
                    },
                    validate: {
                      validate: (value) =>
                        checkValidateUnique(value) || "error message",
                    },
                  })}
                  error={errors.connectionName ? true : false}
                  helperText={
                    errors?.connectionName?.message
                      ? errors?.connectionName?.message
                      : null
                  }
                  label="Data Source Name"
                  variant="outlined"
                  size="small"
                />
              </Grid>

              {!connectionType ? (
                <Grid item sm={12}>
                  <TextField
                    select
                    fullWidth
                    label="Connection type"
                    size="small"
                    defaultValue={defaultValues.connectionType}
                    {...register("connectionType", { required: true })}
                    error={errors.connectionType ? true : false}
                    onChange={(e) => {
                      setConnType(e.target.value);
                    }}
                  >
                    {ConTypes.map((option) => (
                      <MenuItem key={option.value} value={option.value}>
                        {option.label}
                      </MenuItem>
                    ))}
                  </TextField>
                </Grid>
              ) : (
                <TextField
                  sx={{ display: "none" }}
                  label="Connection type"
                  size="small"
                  defaultValue={defaultValues.connectionType}
                  {...register("connectionType", { required: true })}
                  error={errors.connectionType ? true : false}
                ></TextField>
              )}
              {[
                "My SQL",
                "SQL",
                "PostgreSQL",
                "Snowflake",
                "Azure SQL",
                "SAP HANA",
                undefined,
              ].includes(connectionType) && (
                <>
                  <Grid item sm={12}>
                    <TextField
                      defaultValue={formData?.server}
                      {...register("server", { required: true })}
                      label="Server"
                      fullWidth
                      error={errors.server ? true : false}
                      variant="outlined"
                      size="small"
                    />
                  </Grid>
                  {connType !== "SAP HANA" && connectionType !== "SAP HANA" && (
                    <Grid item sm={12} sx={{}}>
                      <TextField
                        defaultValue={formData?.dataBase}
                        fullWidth
                        {...register("dataBase", { required: true })}
                        label="Database"
                        error={errors.dataBase ? true : false}
                        variant="outlined"
                        size="small"
                      />
                    </Grid>
                  )}
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
                              : "Active Directory - Integrated"
                          }
                          onChange={(e) => {
                            onChangeAuthenticationType(e);
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

                  {isauth ? (
                    <>
                      <Grid item sm={12}>
                        <TextField
                          defaultValue={formData?.user}
                          {...register("user", { required: true })}
                          error={errors.user ? true : false}
                          label="User"
                          variant="outlined"
                          fullWidth
                          size="small"
                        />
                      </Grid>
                      <Grid item sm={12}>
                        <TextField
                          defaultValue={formData?.password}
                          fullWidth
                          {...register("password", { required: true })}
                          error={errors.password ? true : false}
                          label="Password"
                          variant="outlined"
                          size="small"
                          type={showPassword ? "text" : "password"}
                          InputProps={{
                            endAdornment: (
                              <InputAdornment position="end">
                                <IconButton
                                  aria-label="toggle password visibility"
                                  onClick={handleClickShowPassword}
                                  onMouseDown={handleMouseDownPassword}
                                >
                                  {showPassword ? (
                                    <VisibilityIcon />
                                  ) : (
                                    <VisibilityOffIcon />
                                  )}
                                </IconButton>
                              </InputAdornment>
                            ),
                          }}
                        />
                      </Grid>
                    </>
                  ) : (
                    <>
                      <Grid item sm={12}>
                        <TextField
                          disabled
                          fullWidth
                          label="User"
                          defaultValue={defaultValues.user}
                          variant="outlined"
                          size="small"
                        />
                      </Grid>
                      <Grid item sm={12}>
                        <TextField
                          disabled
                          fullWidth
                          label="Password"
                          defaultValue={defaultValues.password}
                          variant="outlined"
                          size="small"
                        />
                      </Grid>
                    </>
                  )}
                </>
              )}

              {["GCP BigQuery"].includes(connectionType) && (
                <BigQueryForm
                  register={register}
                  control={control}
                  errors={errors}
                  formData={formData}
                  defaultValues={defaultValues}
                />
              )}

              {["MongoDB"].includes(connectionType) && (
                <MongoDB
                  register={register}
                  errors={errors}
                  formData={formData}
                />
              )}

              {["AWS S3"].includes(connectionType) && (
                <AwsS3
                  register={register}
                  errors={errors}
                  formData={formData}
                />
              )}

              {["Azure Blob Storage"].includes(connectionType) && (
                <AzureBlob
                  register={register}
                  errors={errors}
                  formData={formData}
                />
              )}

              {["Oracle"].includes(connectionType) && (
                <OracleForm
                  register={register}
                  errors={errors}
                  control={control}
                  formData={formData}
                  defaultValues={defaultValues}
                />
              )}

              {["Apache HBASE"].includes(connectionType) && (
                <HBaseForm
                  register={register}
                  errors={errors}
                  formData={formData}
                />
              )}

              {["Oracle", "Apache HBASE"].includes(connectionType) && (
                <>
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
                </>
              )}

              {["Web App"].includes(connectionType) && (
                <Generic
                  register={register}
                  errors={errors}
                  control={control}
                  formData={formData}
                  expresponse={expresponse}
                  setExpresponse={setExpresponse}
                />
              )}

              {["Salesforce"].includes(connectionType) && (
                <SalesforceForm
                  register={register}
                  errors={errors}
                  control={control}
                  formData={formData}
                />
              )}

              <Grid item sm={12} container sx={{ m: 1 }}>
                <Grid item xs textAlign="left">
                  <Button
                    onClick={() => {
                      selected(true);
                    }}
                    variant="contained"
                    color="error"
                    size="small"
                  >
                    Cancel
                  </Button>
                </Grid>
                <Grid item xs textAlign="center">
                  <Button
                    disabled={loading}
                    onClick={handleSubmit(onSubmitTest)}
                    variant="contained"
                    size="small"
                  >
                    {loading ? (
                      <>
                        <CircularProgress
                          style={{
                            width: "20px",
                            height: "20px",
                            color: "#ffffff",
                          }}
                        />
                        Test{" "}
                      </>
                    ) : (
                      "Test"
                    )}
                  </Button>
                </Grid>
                {expresponse && (
                  <Grid item xs={4} textAlign="center">
                    <Button
                      disabled={loadingValidate}
                      onClick={handleSubmit(onSubmitValidate)}
                      variant="contained"
                      size="small"
                      color="warning"
                    >
                      {loadingValidate ? (
                        <>
                          <CircularProgress
                            style={{
                              width: "20px",
                              height: "20px",
                              color: "#ffffff",
                            }}
                          />
                          Validate Schema
                        </>
                      ) : (
                        "Validate Schema"
                      )}
                    </Button>
                  </Grid>
                )}
                <Grid item xs textAlign="right">
                  <Button
                    disabled={loadingSubmit}
                    onClick={handleSubmit(onSubmitTestCreate)}
                    variant="contained"
                    color="success"
                    size="small"
                  >
                    {loadingSubmit ? (
                      <>
                        <CircularProgress
                          style={{
                            width: "20px",
                            height: "20px",
                            color: "#ffffff",
                            marginRight: "8px",
                          }}
                        />
                        Test & {typeCon === "Add" ? "Create" : "Update "}
                      </>
                    ) : (
                      <> Test & {typeCon === "Add" ? "Create" : "Update "}</>
                    )}
                  </Button>
                </Grid>
              </Grid>
            </Grid>
          </Box>
        </>
      )}
    </Box>
  );
}
