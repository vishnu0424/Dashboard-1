import { Grid, Typography } from "@mui/material";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import CircularProgress from "@mui/material/CircularProgress";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import Stepper from "@mui/material/Stepper";
import React, { useContext, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { SnackbarContext } from "../../App";
import ApiService from "../../services/app.service";
import InnerHeader from "../InnerHeader";
import { tableStyles } from "../Styles";
import Comparative from "./Comparative";
import DatabaseToFile from "./Step2/DatabaseToFile";
import { CreateValidationSchema } from "./test.schema";
import ValidateResultModal from "./ValidateResultModal";

const steps = ["Select Data Sources", "Validate"];

export default function Validations() {
  const classes = tableStyles();
  const { setSnack } = useContext(SnackbarContext);

  const ScrollRef = useRef();

  const navigate = useNavigate();

  const [source1, setSource1] = useState();
  const [source2, setSource2] = useState();

  const [activeStep, setActiveStep] = useState(0);
  const [skipped, setSkipped] = useState(new Set());

  const [source1Sql, setsource1Sql] = useState("No");

  const [createValidationSchema] = useState(CreateValidationSchema);
  const [finalValidation, setfinalValidation] = useState([]);
  const [validationsResult, setValidationsResult] = useState([]);
  const [validationsResultShow, setValidationsResultShow] = useState(false);

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

  const dataFormat = () => {
    let data = { ...createValidationSchema };
    data.comparissonValidations = [];
    data["FirstDatasourceId"] = source1?.connectionName
      ? source1.id
      : source1.id;
    data["FirstDatasourceName"] = source1?.dataBase
      ? source1?.dataBase
      : source1?.fileName;
    data["FirstDatasourceType"] = source1?.fileName ? "File" : "Database";
    data["SecondDatasourceId"] = source2?.connectionName
      ? source2.id
      : source2.id;
    data["SecondDatasourceName"] = source2?.dataBase
      ? source2?.dataBase
      : source2?.fileName;
    data["SecondDatasourceType"] = source2?.fileName ? "File" : "Database";
    finalValidation.forEach((obj) => {
      if (obj.validation.row_count_matching === true) {
        obj.source1.forEach((obj1, index) => {
          var data__ = {};
          data__["ValidationName"] = "RowCount";
          data__["ValidationId"] = "21";
          data__["ValidationDisplayName"] = "Row Count Match";
          data__["FirstDataSource"] = [];
          data__["SecondDataSource"] = [];
          var a = {
            Table: obj1.Table ? obj1.Table : obj1.filename,
            Column: obj1.Column,
            IsKey: obj1.IsKey,
          };
          var b = {
            Table: obj.source2[index].Table
              ? obj.source2[index].Table
              : obj.source2[index].filename,
            Column: obj.source2[index].Column,
            IsKey: obj.source2[index].IsKey,
          };
          data__["FirstDataSource"].push(a);
          data__["SecondDataSource"].push(b);
          data["comparissonValidations"].push(data__);
        });
      }
      if (obj.validation.row_data_matching === true) {
        obj.source1 &&
          obj.source1.forEach((obj1, index) => {
            var data__ = {};
            data__["ValidationName"] = "RowComparison";
            data__["ValidationId"] = "22";
            data__["ValidationDisplayName"] = "Row Comparison";
            data__["FirstDataSource"] = [];
            data__["SecondDataSource"] = [];

            var a = {
              Table: obj1.Table ? obj1.Table : obj1.filename,
              Column: obj1.Column,
              IsKey: obj1.IsKey,
            };

            var b = {
              Table: obj.source2[index].Table
                ? obj.source2[index].Table
                : obj.source2[index].filename,
              Column: obj.source2[index].Column,
              IsKey: obj.source2[index].IsKey,
            };
            data__["FirstDataSource"].push(a);
            data__["SecondDataSource"].push(b);
            data["comparissonValidations"].push(data__);
          });
      }
    });
    return data;
  };

  const sqlDataFormate = () => {
    let data = { ...createValidationSchema };
    data.comparissonValidations = [];
    data["FirstDatasourceId"] = source1?.connectionName
      ? source1.id
      : source1._id;
    data["FirstDatasourceName"] = source1?.dataBase
      ? source1?.dataBase
      : source1?.fileName;
    data["FirstDatasourceType"] = source1?.fileName ? "File" : "Database";
    data["FirstDatasourceName"] = source1?.dataBase
      ? source1?.dataBase
      : source1?.fileName;
    data["SecondDatasourceId"] = source2?.connectionName
      ? source2.id
      : source2.id;
    data["SecondDatasourceName"] = source2?.dataBase
      ? source2?.dataBase
      : source2?.fileName;
    data["SecondDatasourceType"] = source2?.fileName ? "File" : "Database";

    data["SecondDatasourceName"] = source2?.dataBase
      ? source2?.dataBase
      : source2?.fileName;

    finalValidation.forEach((obj) => {
      if (obj.validation.row_count_matching === true) {
        var data__ = {};
        data__["ValidationName"] = "RowCount";
        data__["ValidationId"] = "21";
        data__["ValidationDisplayName"] = "Row Count Match";
        data__["SqlQuery"] = {
          FirstDataSource: obj.source1,
          SecondDataSource: obj.source2,
        };
        data["comparissonValidations"].push(data__);
      }

      if (obj.validation.row_data_matching === true) {
        data__ = {};
        data__["ValidationName"] = "RowComparison";
        data__["ValidationId"] = "22";
        data__["ValidationDisplayName"] = "Row Comparison";
        data__["SqlQuery"] = {
          FirstDataSource: obj.source1,
          SecondDataSource: obj.source2,
        };
        data["comparissonValidations"].push(data__);
      }
    });
    return data;
  };

  const createValidation = async () => {
    setCreateLoading(true);
    var data;
    if (source1Sql === "Yes") {
      data = sqlDataFormate();
    } else {
      data = dataFormat();
    }
    try {
      await ApiService.createValidation(data);
      setSnack({ message: "DQ Rule created", open: true, colour: "success" });
      navigate("/test-hub");
    } catch (error) {
      console.log(error.message);
      setSnack({
        message: "somthing went wrong",
        open: true,
        colour: "error",
      });
    }
    setCreateLoading(false);
  };

  const checkValidation = async () => {
    setValidateLoading(true);
    var data;
    if (source1Sql === "Yes") {
      data = sqlDataFormate();
    } else {
      data = dataFormat();
    }
    try {
      let response = await ApiService.checkValidation(data);
      setValidationsResult(
        response?.data?.response?.ResponseObject?.Validations
      );
      setValidationsResultShow(true);
    } catch (error) {
      console.log(error.message);
    }
    setValidateLoading(false);
  };

  const checkNext = () => {
    if (source1 && source2) {
      return false;
    } else {
      return true;
    }
  };

  return (
    <Box sx={{ width: "100%" }} className={classes.tableCus} ref={ScrollRef}>
      <InnerHeader name={"Comparison"} />
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
              <Comparative setSource1={setSource1} setSource2={setSource2} />
            </div>

            <div style={{ display: activeStep === 1 ? "block" : "none" }}>
              <DatabaseToFile
                source1={source1}
                source2={source2}
                finalValidation={finalValidation}
                setfinalValidation={setfinalValidation}
                source1Sql={source1Sql}
                setsource1Sql={setsource1Sql}
                sqlQuery={true}
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
                          Comparative={true}
                          returnValue={(value) => {
                            setValidationsResultShow(value);
                            setValidationsResult([]);
                          }}
                          validationDetailsRowComparison={dataFormat}
                        />
                      )}
                      <Button
                        onClick={() => {
                          checkValidation();
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
                disabled={checkNext()}
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
