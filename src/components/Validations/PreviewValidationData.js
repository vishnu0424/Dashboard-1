import CancelOutlinedIcon from "@mui/icons-material/CancelOutlined";
import { Table, TableBody, TableCell, TableRow } from "@mui/material";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import IconButton from "@mui/material/IconButton";
import TableContainer from "@mui/material/TableContainer";
import Typography from "@mui/material/Typography";
import { styled } from "@mui/system";
import { useEffect, useState } from "react";
import ApiService from "../../services/app.service";
import CompareFinalValidation from "./Step2/Validation";

const grey = {
  50: "#F3F6F9",
  100: "#E7EBF0",
  200: "#E0E3E7",
  300: "#CDD2D7",
  400: "#B2BAC2",
  500: "#A0AAB4",
  600: "#6F7E8C",
  700: "#3E5060",
  800: "#2D3843",
  900: "#1A2027",
};

const Root = styled("div")(
  ({ theme }) => `
  & .MuiAccordion-root{
    display:grid;
    & .MuiCollapse-root{
      overflow-x:auto;
    }
  }
  & .css-1elwnq4-MuiPaper-root-MuiAccordion-root{
      box-shadow:none;
      & .css-sh22l5-MuiButtonBase-root-MuiAccordionSummary-root{
          min-height:auto;
          padding: 0px 10px;
          background-color: #CAD5E2;
      }
      & .css-o4b71y-MuiAccordionSummary-content{
        margin: 4px 0;
      }
      & .css-i4bv87-MuiSvgIcon-root{
        font-size: 1rem;
      }
  }
  & .css-1elwnq4-MuiPaper-root-MuiAccordion-root:before{
    background-color: rgb(255 255 255 / 58%);
  }
  & .css-15v22id-MuiAccordionDetails-root {
    padding: 0px;
}
  table {
    border-collapse: collapse;
    width: 100%;
  }

  td,
  th {
    border: 1px solid ${theme.palette.mode === "dark" ? grey[800] : grey[200]};
    text-align: left;
    padding: 6px;
    & .css-1ebqi03-MuiGrid-root>.MuiGrid-item{
        padding:0;
    }
   
  }
  & .rowsPage td {
    border:0;
    padding:10px;
}
th {
    background-color: '${
      theme.palette.mode === "dark" ? grey[900] : grey[100]
    }';
  }
  `
);

export default function PreviewValidationData({
  AutoScroll,
  connection,
  returnVal,
}) {
  const [source1Sql, setsource1Sql] = useState("No");

  const [testDetails, setTestDetails] = useState({});
  const [TestType, setTestType] = useState();
  const [finalValidation, setFinalValidation] = useState([]);

  useEffect(() => {
    (async () => {
      setFinalValidation([]);
      try {
        let response = await ApiService.GetDataValidationByID(connection);
        setTestDetails(response.data);
        if (response?.data?.TestType === "Comparison") {
          if (response.data?.comparissonValidations[0].SqlQuery) {
            setsource1Sql("Yes");
            let data2 = response.data.comparissonValidations.map((obj) => {
              let a = {
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
            setFinalValidation(data2);
          } else {
            let data1 = response?.data?.comparissonValidations.map((obj) => {
              let a = {
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
              setFinalValidation(data1);
            }, "100");
          }
        }
        setTestType(response?.data?.TestType);
        AutoScroll();
      } catch (error) {
        console.log(error);
      }
    })();
  }, [connection]);

  return (
    <Root sx={{ maxWidth: "100%" }}>
      <Box>
        <Box className="innerSubHead" mb="16px">
          <Grid container alignItems="center">
            <Grid item sm={2}>
              <Typography variant="h6">Preview: </Typography>
            </Grid>
            <Grid item align="center" sm={8}>
              <Grid container>
                <Grid item xs>
                  <Box>
                    <Typography variant="bold">Test Name:</Typography>{" "}
                    <Typography>
                      {" "}
                      {testDetails && testDetails.TestName}{" "}
                    </Typography>
                  </Box>
                </Grid>
                <Grid item xs>
                  <Box>
                    <Typography variant="bold">Data Source Name:</Typography>{" "}
                    <Typography>
                      {testDetails.ConnectionDetails &&
                        testDetails.TestType === "Single File" &&
                        testDetails.ConnectionDetails.fileName}
                      {testDetails.ConnectionDetails &&
                        testDetails.TestType === "Single Database" &&
                        testDetails.ConnectionDetails.connectionName}
                      {testDetails.ConnectionDetails &&
                        testDetails.TestType === "Comparison" && (
                          <>
                            {testDetails.ConnectionDetails
                              .FirstDatasourceDetails.connectionName
                              ? testDetails.ConnectionDetails
                                  .FirstDatasourceDetails.connectionName
                              : testDetails.ConnectionDetails
                                  .FirstDatasourceDetails.fileName}
                            <> / </>
                            {testDetails.ConnectionDetails
                              .SecondDatasourceDetails.connectionName
                              ? testDetails.ConnectionDetails
                                  .SecondDatasourceDetails.connectionName
                              : testDetails.ConnectionDetails
                                  .SecondDatasourceDetails.fileName}
                          </>
                        )}
                    </Typography>
                  </Box>
                </Grid>
                <Grid item xs>
                  <Box>
                    <Typography variant="bold"> Test type: </Typography>{" "}
                    <Typography>
                      {" "}
                      {testDetails && testDetails.TestType}{" "}
                    </Typography>
                  </Box>
                </Grid>
              </Grid>
            </Grid>
            <Grid item sm={2}>
              <IconButton
                onClick={() => {
                  returnVal(false);
                }}
                size="small"
                color="error"
                sx={{ ml: "auto", display: "flex" }}
                aria-label="add to shopping cart"
              >
                <CancelOutlinedIcon />
              </IconButton>
            </Grid>
          </Grid>
        </Box>

        {TestType !== "Comparison" && (
          <Grid container sx={{ p: 1.25, pt: 0, pb: 2 }}>
            <Grid xs={12} sx={{ p: 0, display: "grid" }} md={12} item>
              <TableContainer>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                  <TableBody>
                    {testDetails &&
                      testDetails.Tables &&
                      testDetails.Tables.map((row, irow) => {
                        const labelId = `validations-table-checkbox-${irow}`;
                        return (
                          <TableRow key={labelId}>
                            {row.tablename && (
                              <TableCell width="20%">
                                <Typography>
                                  <strong>Table Name:</strong> {row.tablename}{" "}
                                </Typography>
                              </TableCell>
                            )}
                            <TableCell sx={{ p: "0!important" }}>
                              <Table
                                sx={{
                                  border: 0,
                                  "& td": {
                                    border: 0,
                                    borderBottom: "1px solid #ccc",
                                  },
                                }}
                              >
                                {row.columns.map((data1, index) => {
                                  const labelId = `validations-intable-checkbox-${index}`;
                                  return (
                                    <TableRow
                                      key={labelId}
                                      sx={{
                                        "&:last-child": {
                                          "& td": {
                                            borderBottom: 0,
                                          },
                                        },
                                      }}
                                    >
                                      <TableCell width="30%">
                                        <Typography>
                                          {" "}
                                          <strong>Column Name:</strong>{" "}
                                          {data1.ColumnName === ""
                                            ? "NA"
                                            : data1.ColumnName}
                                        </Typography>
                                      </TableCell>
                                      <TableCell>
                                        {data1.validation.map((data, index) => {
                                          return (
                                            <div key={index}>
                                              {data1.ColumnName !== "" ? (
                                                <>
                                                  <strong>{index + 1}.</strong>{" "}
                                                  {data.DisplayName}
                                                </>
                                              ) : (
                                                ""
                                              )}
                                              {data["NestedControls"].map(
                                                (obj1, ind) => {
                                                  return (
                                                    <div key={ind}>
                                                      {obj1.ControlType ===
                                                        "CheckBox" && (
                                                        <>
                                                          ({obj1.Name} -{" "}
                                                          {obj1[
                                                            "ControlProperties"
                                                          ].IsChecked.toString()}
                                                          )
                                                        </>
                                                      )}
                                                      {obj1.ControlType ===
                                                        "Integer" && (
                                                        <>
                                                          ({obj1.SelectedValue})
                                                        </>
                                                      )}
                                                      {obj1.ControlType ===
                                                        "Dropdown" && (
                                                        <>
                                                          (
                                                          {obj1.SelectedValue
                                                            ? obj1.SelectedValue
                                                            : obj1[
                                                                "ControlProperties"
                                                              ].SelectedValue}
                                                          {""})
                                                        </>
                                                      )}
                                                      {obj1.ControlType ===
                                                        "Text" && (
                                                        <>
                                                          ({obj1.SelectedValue})
                                                        </>
                                                      )}
                                                    </div>
                                                  );
                                                }
                                              )}
                                              {data1.ColumnName === "" &&
                                                data.NestedControls && (
                                                  <>
                                                    <strong>
                                                      {index + 1}.
                                                    </strong>{" "}
                                                    {data.NestedControls &&
                                                      data.NestedControls[0]
                                                        ?.DisplayName}{" "}
                                                    -{" "}
                                                    {data.NestedControls &&
                                                      data.NestedControls[0]
                                                        ?.SelectedValue}
                                                  </>
                                                )}
                                              <br />
                                            </div>
                                          );
                                        })}
                                      </TableCell>
                                    </TableRow>
                                  );
                                })}
                              </Table>
                            </TableCell>
                          </TableRow>
                        );
                      })}
                  </TableBody>
                </Table>
              </TableContainer>
            </Grid>
          </Grid>
        )}
        {TestType === "Comparison" && (
          <CompareFinalValidation
            finalValidation={finalValidation}
            finalSelected={[]}
            source1Sql={source1Sql}
            checkbox={false}
          />
        )}
      </Box>
    </Root>
  );
}
