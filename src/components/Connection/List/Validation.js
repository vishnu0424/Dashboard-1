import { Box, Button, CircularProgress, Grid } from "@mui/material";
import { useContext, useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { SnackbarContext } from "../../../App";
import ApiService from "../../../services/app.service";
import ValidateResultModal from "../../Validations/ValidateResultModal";
import DataValidations from "./DataValidations";

export default function ConnectionDataValidations() {
  const [finalValidation, setfinalValidation] = useState([]);
  const [validationsResult, setValidationsResult] = useState([]);
  const [validationsResultShow, setValidationsResultShow] = useState(false);
  const [connectionData, setConnectionData] = useState({});
  const params = useParams();
  const navigate = useNavigate();
  const { setSnack } = useContext(SnackbarContext);
  const [createloading, setCreateLoading] = useState(false);
  const [validateloading, setValidateLoading] = useState(false);
  const ScrollRef = useRef();

  const AutoScroll = () => {
    setTimeout(() => {
      ScrollRef.current.scrollIntoView({
        behavior: "smooth",
        block: "end",
        inline: "nearest",
      });
    }, 600);
  };

  const GetConnectionDetails = async () => {
    let results = await ApiService.ConnectionDetails(params.connectionId);
    if (results?.data) {
      setConnectionData(results?.data?.ConnectionDetails);
    }
  };

  useEffect(() => {
    GetConnectionDetails();
  }, [params.connectionId]);

  const ValidationCheck = async () => {
    setValidateLoading(true);
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
        response.data?.response?.ResponseObject?.Validations
      );
      setValidationsResultShow(true);
    } catch (error) {
      setSnack({
        message: "somthing went wrong",
        open: true,
        colour: "error",
      });
    }
    setValidateLoading(false);
  };

  const createValidation = async () => {
    setCreateLoading(true);
    const d1 = new Date();
    var data = {
      TestName: "Single Database -" + d1.getTime(),
      TestType: "Single Database",
      Tables: finalValidation,
      ConnectionId: params.connectionId,
    };
    try {
      await ApiService.createValidation(data);
      setSnack({ message: "DQ Rule created", open: true, colour: "success" });
      navigate("/test-hub");
    } catch (e) {
      setSnack({
        message: "somthing went wrong",
        open: true,
        colour: "error",
      });
    }
    setCreateLoading(false);
  };

  return (
    <Box sx={{ width: "100%" }} ref={ScrollRef}>
      <DataValidations
        connectionId={params?.connectionId}
        finalValidations={finalValidation}
        setfinalValidations={setfinalValidation}
        connectionData={connectionData}
        AutoScroll={AutoScroll}
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
                  navigate("/connections");
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
                disabled={validateloading || createloading}
              >
                {validateloading ? (
                  <>
                    <CircularProgress
                      style={{
                        width: "20px",
                        height: "20px",
                        color: "#ffffff",
                        marginRight: "8px",
                      }}
                    />
                    Validate
                  </>
                ) : (
                  <>Validate</>
                )}
              </Button>
              <Button
                onClick={() => {
                  createValidation();
                }}
                size="small"
                variant="contained"
                disabled={createloading || validateloading}
              >
                {createloading ? (
                  <>
                    <CircularProgress
                      style={{
                        width: "20px",
                        height: "20px",
                        color: "#ffffff",
                        marginRight: "8px",
                      }}
                    />
                    Create DQ Rule
                  </>
                ) : (
                  <>Create DQ Rule</>
                )}
              </Button>
            </Grid>
          </Grid>
        </Box>
      )}
    </Box>
  );
}
