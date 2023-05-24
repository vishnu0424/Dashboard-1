import CancelOutlinedIcon from "@mui/icons-material/CancelOutlined";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import { Autocomplete, TextField } from "@mui/material";
import Accordion from "@mui/material/Accordion";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Divider from "@mui/material/Divider";
import FormControl from "@mui/material/FormControl";
import FormControlLabel from "@mui/material/FormControlLabel";
import Grid from "@mui/material/Grid";
import IconButton from "@mui/material/IconButton";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import Switch from "@mui/material/Switch";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Typography from "@mui/material/Typography";
import * as React from "react";
import { useContext, useEffect, useState } from "react";
import { SnackbarContext } from "../../../App";
import CheckboxesAutoComplete from "../../../components/SelectDropdown";
import ApiService from "../../../services/app.service";
import DataCleaning from "../../DataCleaning";
import SkeletonLoader from "../../SkeletonLoader";

export default function PreviewConnection({
  ScrollRef,
  AutoScroll,
  connection,
  returnVal,
}) {
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [tables, setTables] = useState([]);
  const [tableName, setTableName] = useState([]);
  const [sobjects, setSobjects] = useState([]);
  const connectionDetails = connection;
  const [databaseTables, setDatabaseTables] = useState([]);
  const { setSnack } = useContext(SnackbarContext);
  const [loading, setLoading] = useState(false);
  const [loadingTables, setLoadingTables] = useState(false);
  const [customObjects, setCustomObjects] = useState(false);

  const getTableData = async (noRows) => {
    setLoading(true);
    setDatabaseTables([]);
    try {
      let response = await ApiService.ConnectionDetailsDataValidation({
        connectionId: connectionDetails.id,
        tableName: tableName,
        rowsPerPage: noRows,
      });
      setDatabaseTables(response?.data?.tablesData);
      AutoScroll();
    } catch (error) {
      setSnack({ message: error.message, open: true, colour: "error" });
    }
    setLoading(false);
  };

  useEffect(() => {
    setLoadingTables(true);
    (async () => {
      try {
        let response = await ApiService.ConnectionDetails(connection.id);
        if (response.data) {
          setTableName([]);
          setDatabaseTables([]);
          response.data?.ConnectionDetails?.connectionType === "Salesforce"
            ? setSobjects(response.data?.results)
            : setTables(response.data?.tables);
        }
      } catch (error) {
        setSnack({
          message: error?.response?.data?.message
            ? error?.response.data.message
            : error?.message,
          open: true,
          colour: "error",
        });
        returnVal(false);
      }
      setLoadingTables(false);
    })();
  }, [connection.id]);

  return (
    <Box>
      <Box className="innerSubHead">
        <Grid container alignItems="center">
          <Grid sm={2}>
            <Typography variant="h6">Preview: </Typography>
          </Grid>
          {[
            "My SQL",
            "SQL",
            "PostgreSQL",
            "Snowflake",
            "Azure SQL",
            "SAP HANA",
            undefined,
          ].includes(connectionDetails?.connectionType) && (
            <Grid align="center" sm={8}>
              <Grid container>
                <Grid item xs>
                  <Box>
                    <Typography variant="bold"> Data Source Name: </Typography>{" "}
                    <Typography>{connectionDetails.connectionName}</Typography>
                  </Box>
                </Grid>
                <Grid item xs>
                  <Box>
                    <Typography variant="bold"> Server: </Typography>{" "}
                    <Typography> {connectionDetails?.server} </Typography>
                  </Box>
                </Grid>
                <Grid item xs>
                  <Box>
                    <Typography variant="bold"> Database: </Typography>{" "}
                    <Typography>{connectionDetails?.dataBase}</Typography>
                  </Box>
                </Grid>
              </Grid>
            </Grid>
          )}
          {["Salesforce"].includes(connectionDetails?.connectionType) && (
            <Grid align="center" sm={8}>
              <Grid container>
                <Grid item xs>
                  <Box>
                    <Typography variant="bold"> Data Source Name: </Typography>{" "}
                    <Typography>
                      {" "}
                      {" " + connectionDetails?.connectionName}{" "}
                    </Typography>
                  </Box>
                </Grid>
                <Grid item xs>
                  <Box>
                    <Typography variant="bold"> Domain: </Typography>{" "}
                    <Typography> {connectionDetails?.Domain} </Typography>
                  </Box>
                </Grid>
                <Grid item xs>
                  <Box>
                    <Typography variant="bold"> Saleforce Cloud: </Typography>{" "}
                    <Typography>{"Sales "}</Typography>
                  </Box>
                </Grid>
              </Grid>
            </Grid>
          )}
          <Grid sm={2}>
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
      <Divider sx={{ mb: 2 }} />
      {!loadingTables && (
        <Grid container spacing={2} sx={{ p: 1.25, pt: 0, pb: 2 }}>
          {tables?.length > 0 && (
            <Grid xs={12} sx={{ p: 0, display: "grid" }} md={5} item>
              <CheckboxesAutoComplete
                lable="Select Tables"
                placeholder="Select Tables"
                optionsList={tables}
                returnBack={(val) => {
                  setTableName(val);
                  if (val.length === 0) {
                    setDatabaseTables([]);
                  }
                }}
              />
            </Grid>
          )}
          {sobjects?.length > 0 && (
            <Grid xs={12} sx={{ p: 0, display: "grid" }} md={5} item>
              <Autocomplete
                disablePortal
                onChange={(e, value) => {
                  setTableName([value]);
                }}
                size="small"
                options={sobjects}
                renderInput={(params) => (
                  <TextField {...params} label="Select Sobjects" />
                )}
              />
            </Grid>
          )}
          {["Salesforce"].includes(connectionDetails?.connectionType) && (
            <Grid
              xs={12}
              md={3}
              item
              textAlign="center"
              sx={{
                "& .MuiSwitch-root": {
                  top: 0,
                },
              }}
            >
              <FormControlLabel
                control={
                  <Switch
                    size="small"
                    checked={customObjects ? false : true}
                    onChange={() => {
                      setCustomObjects(!customObjects);
                    }}
                  />
                }
                label="Show Custom objects only"
              />
            </Grid>
          )}
          <Grid xs={12} md={2} item>
            {tableName.length > 0 && (
              <Button
                onClick={() => {
                  getTableData(rowsPerPage);
                }}
                variant="contained"
                color="success"
              >
                Go
              </Button>
            )}
          </Grid>
          {[
            "My SQL",
            "SQL",
            "PostgreSQL",
            "Snowflake",
            "Azure SQL",
            "SAP HANA",
            undefined,
          ].includes(connectionDetails?.connectionType) && (
            <Grid xs={12} md={3} item></Grid>
          )}

          <Grid xs={12} md={2} item>
            <FormControl
              fullWidth
              sx={{ maxWidth: 100, ml: "auto", display: "flex" }}
              size="small"
            >
              <InputLabel id="demo-simple-select-label">
                Records Shown
              </InputLabel>
              <Select
                labelId="demo-simple-select-label"
                label="Records Shown"
                defaultValue={rowsPerPage}
                onChange={(e) => {
                  setRowsPerPage(parseInt(e.target.value, 10));
                  getTableData(parseInt(e.target.value, 10));
                }}
              >
                <MenuItem value={5}>5</MenuItem>
                <MenuItem value={10}>10</MenuItem>
                <MenuItem value={25}>25</MenuItem>
              </Select>
            </FormControl>
          </Grid>
        </Grid>
      )}
      {loading && <SkeletonLoader />}
      {loadingTables && <SkeletonLoader />}

      {Array.isArray(databaseTables) &&
        databaseTables.map((row, index) => {
          const labelId = `enhanced-table-acordian-${index}`;
          const databseTableName = Object.keys(row);
          const databseTableValus = Object.values(row);
          let TableRowkeys = [];
          if (databseTableName.length > 0) {
            TableRowkeys = Object.keys(databseTableName[0]);
          }
          return (
            <Accordion
              onChange={() => {
                AutoScroll();
              }}
            >
              <AccordionSummary
                expandIcon={<KeyboardArrowRightIcon />}
                aria-controls="panel1a-content"
                id={labelId}
                sx={{
                  minHeight: "auto!important",
                  flexDirection: "row-reverse",
                }}
              >
                <Grid item container>
                  <Grid item sm={9}>
                    <Typography m={1}>
                      <b>{databseTableName[0]}</b> [ rows:
                      {databseTableValus[0]?.rowsCount} | cols:
                      {databseTableValus[0].columnCount} ]
                    </Typography>
                  </Grid>
                  <Grid item sm={3}>
                    <DataCleaning
                      type={"database"}
                      Connectiondetails={connectionDetails}
                      Table={databseTableName[0]}
                      fuzzyreplace={true}
                    />
                  </Grid>
                </Grid>
              </AccordionSummary>
              <AccordionDetails sx={{ display: "grid" }}>
                <TableContainer>
                  <Table aria-label="custom pagination table" ref={ScrollRef}>
                    <TableHead>
                      <TableRow>
                        {databseTableValus[0]?.Columns.map((v, i) => {
                          return <TableCell>{v.COLUMN_NAME}</TableCell>;
                        })}
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {databseTableValus[0]?.rows.length > 0 &&
                        databseTableValus[0]?.rows.map((itemRow, ki) => {
                          return (
                            <TableRow>
                              {databseTableValus[0]?.Columns.map((v, i) => {
                                return (
                                  <TableCell>
                                    {itemRow[v.COLUMN_NAME]
                                      ? itemRow[v.COLUMN_NAME].toString()
                                      : itemRow[v.COLUMN_NAME]}
                                  </TableCell>
                                );
                              })}
                            </TableRow>
                          );
                        })}

                      {databseTableValus[0]?.rows.length === 0 && (
                        <TableRow>
                          <TableCell
                            sx={{ textAlign: "center" }}
                            colSpan={databseTableValus[0]?.Columns?.length}
                          >
                            No records to display
                          </TableCell>
                        </TableRow>
                      )}
                    </TableBody>
                  </Table>
                </TableContainer>
              </AccordionDetails>
            </Accordion>
          );
        })}
    </Box>
  );
}
