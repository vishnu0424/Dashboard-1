import { Box, Button, Grid } from "@mui/material";
import { useEffect, useState, useContext } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { SnackbarContext } from "../../App";
import ApiService from "../../services/app.service";
import EditDatabaseToFile from "../Validations/Step2/EditDatabaseToFile";
import { CreateValidationSchema } from "./test.schema";
import ValidateResultModal from "./ValidateResultModal";

export default function EditCompareValidation() {
  const [createValidationSchema] = useState(CreateValidationSchema);
  const { setSnack } = useContext(SnackbarContext);
  const navigate = useNavigate();
  const params = useParams();
  
  const [source1, setSource1] = useState();
  const [source2, setSource2] = useState();

  const [source1Sql, setsource1Sql] = useState("No");

  const [validationsResult, setValidationsResult] = useState([]);
  const [validationsResultShow, setValidationsResultShow] = useState(false);

  const [finalValidation, setfinalValidation] = useState([]);

  useEffect(() => {
    (async () => {
      try {
        let response = await ApiService.editValidation(params.testId);
        setSource1(response?.data?.ConnectionDetails?.FirstDatasourceDetails);
        setSource2(response?.data?.ConnectionDetails?.SecondDatasourceDetails);
        if (response?.data?.comparissonValidations[0]?.SqlQuery) {
          setsource1Sql("Yes");
          var data2 = response.data.comparissonValidations.map((obj) => {
            var a = {
              source1: obj.SqlQuery.FirstDataSource,
              source2: obj.SqlQuery.SecondDataSource,
              validation: {
                row_count_matching:
                  obj.ValidationName === "RowCount" ? true : false,
                row_data_matching:
                  obj.ValidationName === "RowComparison" ? true : false,
              },
            };
            return a;
          });
          setfinalValidation(data2);
        } else {
          var data1 = response?.data?.comparissonValidations.map((obj) => {
            var a = {
              source1: obj.FirstDataSource,
              source2: obj.SecondDataSource,
              validation: {
                row_count_matching:
                  obj.ValidationName === "RowCount" ? true : false,
                row_data_matching:
                  obj.ValidationName === "RowComparison" ? true : false,
              },
            };
            return a;
          });
          setTimeout(() => {
            setfinalValidation(data1);
          }, "100");
        }
      } catch (error) {
        setSnack({
          message: "somthing went wrong",
          open: true,
          colour: "error",
        });
      }
    })();
  }, [params.testId]);

  const dataFormat = () => {
    let data = { ...createValidationSchema };
    data.comparissonValidations = [];
    data["FirstDatasourceId"] = source1?.connectionName
      ? source1.id
      : source1._id;
    data["FirstDatasourceName"] = source1?.dataBase
      ? source1?.dataBase
      : source1?.fileName;
    data["FirstDatasourceType"] = source1?.connectionName ? "Database" : "File";
    data["SecondDatasourceId"] = source2?.connectionName
      ? source2.id
      : source2._id;
    data["SecondDatasourceName"] = source2?.dataBase
      ? source2?.dataBase
      : source2?.fileName;
    data["SecondDatasourceType"] = source2?.connectionName
      ? "Database"
      : "File";
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
    data["comparissonValidations"] = [];
    data["FirstDatasourceId"] = source1?.connectionName
      ? source1.id
      : source1._id;
    data["FirstDatasourceType"] = source1?.connectionName ? "Database" : "File";
    data["FirstDatasourceName"] = source1?.dataBase
      ? source1?.dataBase
      : source1?.fileName;

    data["SecondDatasourceId"] = source2?.connectionName
      ? source2.id
      : source2._id;
    data["SecondDatasourceType"] = source2?.connectionName
      ? "Database"
      : "File";
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

  const ValidationCheck = async () => {
    var data;
    if (source1Sql === "Yes") {
      data = sqlDataFormate();
    } else {
      data = dataFormat();
    }
    try {
      let response = await ApiService.checkValidation(data);
      if (response?.data?.status) {
        setValidationsResult(
          response?.data?.response?.ResponseObject?.Validations
        );
        setValidationsResultShow(true);
      } else {
        setSnack({
          message: response.data.message,
          open: true,
          colour: "error",
        });
      }
    } catch (error) {
      setSnack({
        message: "somthing went wrong",
        open: true,
        colour: "error",
      });
    }
  };
  
  const updateValidation = async () => {
    var data;
    if (source1Sql === "Yes") {
      data = sqlDataFormate();
    } else {
      data = dataFormat();
    }
    try {
      await ApiService.updateValidation(data, params.testId);
      setSnack({ message: "DQ Rule Updated", open: true, colour: "success" });
      navigate("/test-hub");
    } catch (error) {
      setSnack({
        message: "somthing went wrong",
        open: true,
        colour: "error",
      });
    }
  };

  return (
    <Box sx={{ width: "100%" }}>
      <EditDatabaseToFile
        source1={source1}
        source2={source2}
        finalValidation={finalValidation}
        setfinalValidation={setfinalValidation}
        source1Sql={source1Sql}
        setsource1Sql={setsource1Sql}
        sqlQuery={false}
      />
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
                updateValidation();
              }}
              size="small"
              variant="contained"
            >
              Update DQ Rule
            </Button>
          </Grid>
        </Grid>
      )}
    </Box>
  );
}
