import { Box, Button, Grid } from "@mui/material";
import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { SnackbarContext } from "../../../App";
import ApiService from "../../../services/app.service";
import ValidateResultModal from "../../Validations/ValidateResultModal";
import DataValidations from "./DataValidations";

export default function EditConnectionDataValidations() {
  const [finalValidation, setfinalValidation] = useState([]);
  const params = useParams();
  const navigate = useNavigate();
  const { setSnack } = useContext(SnackbarContext);
  const [validationsResult, setValidationsResult] = useState([]);
  const [validationsResultShow, setValidationsResultShow] = useState(false);
  const [connectionData, setConnectionData] = useState({});

  const GetConnectionDetails = async () => {
    try {
      let results = await ApiService.ConnectionDetails(params.connectionId);
      setConnectionData(results?.data?.ConnectionDetails);
    } catch (e) {
      console.log(e);
    }
  };

  const ValidationCheck = async () => {
    const d1 = new Date();
    var data = {
      TestName: "Single Database -" + d1.getTime(),
      TestType: "Single Database",
      Tables: finalValidation,
      ConnectionId: params.connectionId,
    };
    try {
      let response = await ApiService.checkValidation(data);
      setValidationsResult(
        response?.data?.response?.ResponseObject?.Validations
      );
      setValidationsResultShow(true);
    } catch (error) {
      setSnack({
        message: "somthing went wrong",
        open: true,
        colour: "error",
      });
    }
  };

  useEffect(() => {
    GetConnectionDetails();
    (async () => {
      try {
        let response = await ApiService.editValidation(params.testId);
        setfinalValidation(response?.data?.Tables);
      } catch (error) {
        setSnack({
          message: "somthing went wrong",
          open: true,
          colour: "error",
        });
      }
    })();
  }, []);

  const createValidation = async () => {
    var data = {
      Tables: finalValidation,
    };
    try {
      await ApiService.updateValidation(data, params.testId);
      setSnack({ message: "DQ Rule Updated", open: true, colour: "success" });
      navigate("/test-hub");
    } catch (error) {
      setSnack({ message: error?.message, open: true, colour: "error" });
    }
  };

  return (
    <Box sx={{ width: "100%" }}>
      <DataValidations
        connectionId={params?.connectionId}
        finalValidations={finalValidation}
        setfinalValidations={setfinalValidation}
      />
      {finalValidation.length > 0 && (
        <Box sx={{ mt: 1 }}>
          <Grid container>
            <Grid sm={6} sx={{ mt: 1 }}>
              <Button
                color="error"
                size="small"
                variant="contained"
                onClick={() => {
                  navigate("/test-hub");
                }}
              >
                Cancel
              </Button>
            </Grid>
            <Grid sm={6} sx={{ textAlign: "right", mt: 1 }}>
              {validationsResultShow && (
                <ValidateResultModal
                  Validations={validationsResult}
                  model={true}
                  returnValue={(value) => {
                    setValidationsResultShow(value);
                    setValidationsResult([]);
                  }}
                  connectionDetails={connectionData}
                />
              )}
              <Button
                onClick={() => {
                  ValidationCheck();
                }}
                sx={{ mr: 1 }}
                size="small"
                color="success"
                variant="contained"
              >
                Validate
              </Button>
              <Button
                onClick={() => {
                  createValidation();
                }}
                size="small"
                variant="contained"
              >
                Update DQ Rule
              </Button>
            </Grid>
          </Grid>
        </Box>
      )}
    </Box>
  );
}
