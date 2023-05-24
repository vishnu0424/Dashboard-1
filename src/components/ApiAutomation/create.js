import { Box, Button, Container, Grid, Paper, TextField } from "@mui/material";
import { serialize } from "object-to-formdata";
import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { SnackbarContext } from "../../App";
import ApiService from "../../services/app.service";
import InnerHeader from "../InnerHeader";
import { tableStyles } from "../Styles";
import { InputRow } from "./InputRow";

export default function ApiAutomationCreate() {
  const inpFields = {
    APIName: "",
    APIUrl: "",
    Method: "",
    Headers: [
      {
        Name: "",
        Value: "",
      },
    ],
    Request: {
      RequestFileExist: false,
      RequestFilePath: "",
      RequestFileOrginalName: "",
      Params: [
        {
          Key: "",
          Value: "",
          MappingKey: "",
          ApiSequenseNumber: 0,
        },
      ],
      QueryParams: [
        {
          Key: "",
          Value: "",
          MappingKey: "",
          ApiSequenseNumber: 0,
        },
      ],
    },
    Response: {
      ResponseFileExist: false,
      ResponseFilePath: "",
      ResponseFileOrginalName: "",
      ResponseColumnPath: "",
      ColumnsCompare: [{ Name: "" }],
      StatusCodeCheckfor: "",
    },
  };

  const { setSnack } = useContext(SnackbarContext);
  const navigate = useNavigate();
  const classes = tableStyles();
  const [collectionName, setCollectionName] = useState("");
  const [BaseUrl, setBaseUrl] = useState("");
  const params = useParams();
  const [inputFields, setInputFields] = useState([inpFields]);

  useEffect(() => {
    params?.id && getDeatils(params.id);
  }, [params?.id]);

  const getDeatils = async (id) => {
    try {
      let getResponse = await ApiService.getApiCollection(id);
      let inf = getResponse?.data?.ApiRequests;
      setInputFields(inf);
      setCollectionName(getResponse?.data?.CollectionName);
      setBaseUrl(getResponse?.data?.BaseUrl);
    } catch (e) {
      setSnack({
        message: "Failed to connect API",
        open: true,
        colour: "error",
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    let requests = inputFields.map((e, i) => {
      e["Headers_API" + i] = e.Headers;
      e["Params_API" + i] = e.Request.Params;
      e["QueryParams_API" + i] = e.Request.QueryParams;
      e["RequestFileOrginalName" + i] = e.Request.RequestFileOrginalName;
      e["RequestFileExist" + i] = e.Request.RequestFileExist;
      e["ResponseFileOrginalName" + i] = e.Response.ResponseFileOrginalName;
      e["ResponseFileExist" + i] = e.Response.ResponseFileExist;
      e["ResponseColumnPath" + i] = e.Response.ResponseColumnPath;
      e["ColumnsCompare_API" + i] = e.Response.ColumnsCompare;
      return e;
    });

    let reqBody = {
      ApiRequests: [...requests],
      CollectionName: collectionName,
      BaseUrl: BaseUrl,
      id: params?.id,
    };
    const formData1 = serialize({ reqBody });

    try {
      await ApiService.postApiAutomation(formData1);
      setSnack({
        message: params?.id ? "Updated Successfully" : "Created Successfully",
        open: true,
        colour: "success",
      });
      navigate("/api-automation");
    } catch (e) {
      setSnack({
        message: e?.response?.data?.message,
        open: true,
        colour: "error",
      });
    }
  };

  const handleChange = (event, index) => {
    const values = [...inputFields];
    values[index][event.target.name] = event.target.value;
    setInputFields(values);
  };
  const handleChangeHeader = (event, index, p) => {
    const values = [...inputFields];
    values[p].Headers[index][event.target.name] = event.target.value;
    setInputFields(values);
  };
  const handleChangeRequest = (event, index, p) => {
    const values = [...inputFields];
    values[p].Request.Params[index][event.target.name] = event.target.value;
    setInputFields(values);
  };

  const RequestQueryParams = (event, index, p) => {
    const values = [...inputFields];
    values[p].Request.QueryParams[index][event.target.name] =
      event.target.value;
    setInputFields(values);
  };
  const handleChangeResponse = (event, index, p) => {
    const values = [...inputFields];
    values[p].Response.ColumnsCompare[index][event.target.name] =
      event.target.value;
    setInputFields(values);
  };
  const handleResponseKeyMap = (event, index) => {
    const values = [...inputFields];
    values[index].Response.ResponseColumnPath = event.target.value;
    setInputFields(values);
  };

  const handleName = (event) => {
    setCollectionName(event.target.value);
  };
  const handleBaseUrl = (event) => {
    setBaseUrl(event.target.value);
  };

  // adds new input
  const handleAdd = () => {
    setInputFields([...inputFields, inpFields]);
  };
  const AddHeader = (i, e) => {
    const values = [...inputFields];
    values[i].Headers = [
      ...inputFields[i].Headers,
      {
        Name: "",
        Value: "",
      },
    ];
    setInputFields(values);
  };

  const RemoveHeader = (p, c) => {
    if (inputFields[p].Headers.length !== 1) {
      const values = [...inputFields];
      values[p].Headers.splice(c, 1);
      setInputFields(values);
    }
  };

  const AddRequest = (i, e) => {
    const values = [...inputFields];
    values[i].Request.Params = [
      ...inputFields[i].Request.Params,
      {
        Key: "",
        Value: "",
        MappingKey: "",
        ApiSequenseNumber: 0,
      },
    ];
    setInputFields(values);
  };

  const RemoveRequest = (p, c) => {
    if (inputFields[p].Request?.Params.length !== 1) {
      const values = [...inputFields];
      values[p].Request?.Params.splice(c, 1);
      setInputFields(values);
    }
  };

  const AddRequestQueryParams = (i, e) => {
    const values = [...inputFields];
    values[i].Request.QueryParams = [
      ...inputFields[i].Request.QueryParams,
      {
        Key: "",
        Value: "",
        MappingKey: "",
        ApiSequenseNumber: 0,
      },
    ];
    setInputFields(values);
  };
  const RequestFileHandle = (i, value) => {
    const values = [...inputFields];
    values[i].Request.RequestFilePath = value;
    values[i].Request.RequestFileOrginalName = value?.name;
    values[i].Request.RequestFileExist = true;
    setInputFields(values);
  };
  const ResponseFileHandle = (i, value) => {
    const values = [...inputFields];
    values[i].Response.ResponseFilePath = value;
    values[i].Response.ResponseFileOrginalName = value?.name;
    values[i].Response.ResponseFileExist = true;
    setInputFields(values);
  };

  const RemoveRequestQueryParams = (p, c) => {
    if (inputFields[p].Request?.QueryParams.length !== 1) {
      const values = [...inputFields];
      values[p].Request?.QueryParams.splice(c, 1);
      setInputFields(values);
    }
  };

  const AddResponse = (i, e) => {
    const values = [...inputFields];
    values[i].Response.ColumnsCompare = [
      ...inputFields[i].Response.ColumnsCompare,
      {
        Name: "",
      },
    ];
    setInputFields(values);
  };

  const RemoveResponse = (p, c) => {
    if (inputFields[p].Response?.ColumnsCompare?.length !== 1) {
      const values = [...inputFields];
      values[p].Response?.ColumnsCompare.splice(c, 1);
      setInputFields(values);
    }
  };

  // removes input
  const handleRemove = (index) => {
    if (inputFields.length !== 1) {
      const values = [...inputFields];
      values.splice(index, 1);
      setInputFields(values);
    }
  };
  return (
    <Box sx={{ width: "100%" }} className={classes.tableCus}>
      <InnerHeader name={"API Automation"} />

      <Paper columnSpacing={{ xs: 1, sm: 2, md: 3 }} sx={{ p: 2 }}>
        <Container columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
          <form onSubmit={handleSubmit}>
            <Grid container sx={{ m: 1 }} alignItems="center">
              <Grid item sm={12} sx={{ p: 0.5 }}>
                <TextField
                  name="CollectionName"
                  required
                  fullWidth
                  label="Collection Name"
                  size="small"
                  onChange={(event) => handleName(event)}
                  value={collectionName}
                  inputProps={{ minLength: 4 }}
                />
              </Grid>
              <Grid item sm={12} sx={{ p: 0.5 }}>
                <TextField
                  name="BaseUrl"
                  type={"url"}
                  required
                  fullWidth
                  label="Base Url"
                  size="small"
                  onChange={(event) => handleBaseUrl(event)}
                  value={BaseUrl}
                />
              </Grid>
              <Grid container sx={{ p: 0.5 }}>
                {inputFields.map((item, index) => {
                  return (
                    <>
                      <InputRow
                        index={index}
                        item={item}
                        handleChange={handleChange}
                        handleRemove={handleRemove}
                        handleAdd={handleAdd}
                        AddHeader={AddHeader}
                        RemoveHeader={RemoveHeader}
                        AddRequest={AddRequest}
                        RemoveRequest={RemoveRequest}
                        handleChangeHeader={handleChangeHeader}
                        handleChangeRequest={handleChangeRequest}
                        handleChangeResponse={handleChangeResponse}
                        RemoveResponse={RemoveResponse}
                        AddResponse={AddResponse}
                        handleResponseKeyMap={handleResponseKeyMap}
                        RequestQueryParams={RequestQueryParams}
                        RemoveRequestQueryParams={RemoveRequestQueryParams}
                        AddRequestQueryParams={AddRequestQueryParams}
                        RequestFileHandle={RequestFileHandle}
                        ResponseFileHandle={ResponseFileHandle}
                      />
                    </>
                  );
                })}
              </Grid>
              <Grid
                container
                sx={{ p: 1 }}
                columnSpacing={{ xs: 1, sm: 2, md: 3 }}
              >
                <Grid item xs={4} textAlign="left">
                  <Button
                    variant="contained"
                    color="error"
                    size="medium"
                    onClick={(e) => {
                      navigate("/api-automation");
                    }}
                  >
                    Cancel
                  </Button>
                </Grid>
                <Grid item xs textAlign="right">
                  <Button
                    type="submit"
                    variant="contained"
                    color="success"
                    size="small"
                  >
                    {params?.id ? "Update" : "Save"}
                  </Button>
                </Grid>
              </Grid>
            </Grid>
          </form>
        </Container>
      </Paper>
    </Box>
  );
}
