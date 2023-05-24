import { Grid, Typography } from "@mui/material";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import CircularProgress from "@mui/material/CircularProgress";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import Stepper from "@mui/material/Stepper";
import React, { useContext, useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { SnackbarContext } from "../../../App";
import ApiService from "../../../services/app.service";
import InnerHeader from "../../InnerHeader";
import { tableStyles } from "../../Styles";
import ValidateResultModal from "../../Validations/ValidateResultModal";
import FileValidations from "./Filevalidation";
import SingleDataSource from "./singlefile";

const steps = ["File", "Validate"];

export default function SingleFile() {
  const classes = tableStyles();
  const navigate = useNavigate();
  const ScrollRef = useRef();
  const { setSnack } = useContext(SnackbarContext);
  const [source1, setSource1] = useState();
  const [activeStep, setActiveStep] = useState(0);
  const [skipped, setSkipped] = useState(new Set());
  const [finalValidation, setfinalValidation] = useState([]);
  const [validationsResult, setValidationsResult] = useState([]);
  const [validationsResultShow, setValidationsResultShow] = useState(false);
  const [inputParams, setinputParams] = useState([{ Name: "", Value: "" }]);
  const [requestBody, setrequestBody] = useState();
  const [file, setfile] = useState();
  const [createloading, setCreateLoading] = useState(false);
  const [validateloading, setValidateLoading] = useState(false);

  const AutoScroll = () => {
    setTimeout(() => {
      ScrollRef.current.scrollIntoView({
        behavior: "smooth",
        block: "end",
        inline: "nearest",
      });
    }, 600);
  };

  const isStepSkipped = (step) => {
    return skipped.has(step);
  };

  useEffect(() => {
    setfinalValidation([]);
  }, [source1]);

  const handleNext = () => {
    let newSkipped = skipped;
    if (isStepSkipped(activeStep)) {
      newSkipped = new Set(newSkipped.values());
      newSkipped.delete(activeStep);
    }
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    setSkipped(newSkipped);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleReset = () => {
    setActiveStep(0);
  };

  const createValidation = async () => {
    setCreateLoading(true);
    const d1 = new Date();
    let data = {
      TestName: "Single File -" + d1.getTime(),
      TestType: "Single File",
      requestBody: requestBody,
      File: file,
      Params:
        Object.values(inputParams[0]).toString().length === 1
          ? undefined
          : inputParams,
      Tables: [
        {
          TableName: source1?.fileName,
          columns: finalValidation,
        },
      ],
      ConnectionId: source1.id,
    };
    try {
      await ApiService.createValidation(data);
      setCreateLoading(false);
      setSnack({ message: "DQ Rule created", open: true, colour: "success" });
      navigate("/test-hub");
    } catch (error) {
      setCreateLoading(false);
      setSnack({
        message: "somthing went wrong",
        open: true,
        colour: "error",
      });
    }
  };

  const ValidationCheck = async () => {
    setValidateLoading(true);
    const d1 = new Date();
    let data = {
      TestName: "Single File -" + d1.getTime(),
      TestType: "Single File",
      Tables: [
        {
          TableName: source1?.fileName,
          columns: finalValidation,
        },
      ],
      fileId: source1.id,
    };
    try {
      let response = await ApiService.checkValidation(data);
      setValidateLoading(false);
      setValidationsResult(
        response?.data?.response?.ResponseObject?.Validations
      );
      setValidationsResultShow(true);
    } catch (error) {
      setValidateLoading(false);
      setSnack({
        message: "somthing went wrong",
        open: true,
        colour: "error",
      });
    }
  };

  return (
    <Box sx={{ width: "100%" }} className={classes.tableCus} ref={ScrollRef}>
      <InnerHeader name={"Single File"} />
      <Stepper activeStep={activeStep}>
        {steps.map((label, index) => {
          const stepProps = {};
          const labelProps = {};

          if (isStepSkipped(index)) {
            stepProps.completed = false;
          }
          return (
            <Step key={label} {...stepProps}>
              <StepLabel {...labelProps}>{label}</StepLabel>
            </Step>
          );
        })}
      </Stepper>
      {activeStep === steps.length ? (
        <React.Fragment>
          <Typography sx={{ mt: 2, mb: 1 }}>
            All steps completed - you&apos;re finished
          </Typography>
          <Box sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
            <Box sx={{ flex: "1 1 auto" }} />
            <Button onClick={handleReset}>Reset</Button>
          </Box>
        </React.Fragment>
      ) : (
        <React.Fragment>
          <Box sx={{ mt: 2, mb: 1 }}>
            <div style={{ display: activeStep === 0 ? "block" : "none" }}>
              <SingleDataSource
                activeStep={activeStep}
                setSource1={setSource1}
                type="file"
                sourceType={{ type: "Files" }}
              />
            </div>

            <div style={{ display: activeStep === 1 ? "block" : "none" }}>
              <FileValidations
                fileId={source1?.id}
                finalValidation={finalValidation}
                setfinalValidation={setfinalValidation}
                inputParams={inputParams}
                setinputParams={setinputParams}
                requestBody={requestBody}
                setrequestBody={setrequestBody}
                setfile={setfile}
                AutoScroll={AutoScroll}
              />
            </div>
          </Box>
          <Box sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
            <Button
              color="inherit"
              variant="contained"
              disabled={activeStep === 0}
              onClick={handleBack}
              sx={{ mr: 1 }}
            >
              Back
            </Button>
            <Box sx={{ flex: "1 1 auto" }} />
            {activeStep === steps.length - 1 ? (
              <>
                {finalValidation.length > 0 && (
                  <Grid container>
                    <Grid sm={6} sx={{ mt: 1 }}></Grid>
                    <Grid sm={6} sx={{ textAlign: "right", mt: 1 }}>
                      {validationsResultShow && (
                        <ValidateResultModal
                          Validations={validationsResult}
                          model={true}
                          returnValue={(value) => {
                            setValidationsResultShow(value);
                            setValidationsResult([]);
                          }}
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
                        disabled={validateloading || createloading}
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
                )}
              </>
            ) : (
              <Button
                disabled={!source1}
                variant="contained"
                onClick={handleNext}
              >
                Next
              </Button>
            )}
          </Box>
        </React.Fragment>
      )}
    </Box>
  );
}
