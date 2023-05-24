import CancelOutlinedIcon from "@mui/icons-material/CancelOutlined";
import Box from "@mui/material/Box";
import FormControl from "@mui/material/FormControl";
import Grid from "@mui/material/Grid";
import IconButton from "@mui/material/IconButton";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Typography from "@mui/material/Typography";
import * as React from "react";
import { useEffect, useState } from "react";
import ApiService from "../../services/app.service";
import DataCleaning from "../DataCleaning";
import SkeletonLoader from "../SkeletonLoader";

export default function PreviewFiles({ type, connection, returnVal }) {
  const [rows, setRows] = useState(5);
  const [tables, setTables] = useState([]);
  const [file, setFile] = useState({});
  const [totalRows, setRotalRows] = useState(0);
  const [totalColumns, setTotalColumns] = useState(0);
  const [loader, setLoader] = useState(false);

  useEffect(() => {
    (async () => {
      setLoader(true);
      if (type === "datasource") {
        try {
          let response = await ApiService.GetFilesData({
            id: connection,
            numberOfRows: rows,
          });
          if (response?.data?.result?.ext === "txt") {
            if (response?.data?.result?.rows[0].length > 20) {
              var abc = response.data.result.rows[0].slice(0, 20);
              response.data.result.rows[0] = abc;
            }
          }
          setTables(response?.data?.result?.rows);
          setFile(response?.data?.fileDetails);
          setRotalRows(response?.data?.result?.totalRows);
          setTotalColumns(response?.data?.result?.totalColumns);
        } catch (error) {
          console.log(error);
        }
        setLoader(false);
      } else {
        try {
          let response = await ApiService.getmasterdatabyId({
            id: connection,
            numberOfRows: rows,
          });
          setTables(response?.data?.result?.rows);
          setFile(response?.data?.fileDetails);
          setRotalRows(response?.data?.result?.totalRows);
          setTotalColumns(response?.data?.result?.totalColumns);
        } catch (error) {
          console.log(error);
        }
        setLoader(false);
      }
    })();
  }, [connection, rows]);

  return (
    <Box sx={{ maxWidth: "100%" }}>
      <Box>
        <Box className="innerSubHead">
          <Grid container alignItems="center" justify="center">
            <Grid sm={2}>
              <Typography variant="h6">Preview: </Typography>
            </Grid>
            <Grid align="center" sm={8}>
              <Grid container>
                <Grid item xs>
                  <Box>
                    <Typography variant="bold"> Data Source Name: </Typography>{" "}
                    <Typography>
                      {" "}
                      {file?.connectionName
                        ? file?.connectionName
                        : file?.name}{" "}
                    </Typography>
                  </Box>
                </Grid>
                <Grid item xs>
                  <Box>
                    <Typography variant="bold"> Total rows: </Typography>{" "}
                    <Typography> {totalRows} </Typography>
                  </Box>
                </Grid>
                <Grid item xs>
                  <Box>
                    <Typography variant="bold"> Total columns: </Typography>{" "}
                    <Typography> {totalColumns} </Typography>
                  </Box>
                </Grid>
              </Grid>
            </Grid>
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
        <Box p="16px">
          <Grid container>
            <Grid sm={6}>
              <FormControl
                fullWidth
                sx={{ maxWidth: 100, display: "flex", mb: 1 }}
                size="small"
              >
                <InputLabel id="demo-simple-select-label">
                  Records Shown
                </InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  label="Records Shown"
                  defaultValue={rows}
                  onChange={(e) => {
                    setRows(e.target.value);
                  }}
                >
                  <MenuItem value={5}>5</MenuItem>
                  <MenuItem value={10}>10</MenuItem>
                  <MenuItem value={25}>25</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            {type === "datasource" && (
              <Grid sm={6} sx={{ mb: 1 }}>
                <DataCleaning
                  type={"file"}
                  Connectiondetails={file}
                  Columns={tables[0]}
                  fuzzyreplace={true}
                />
              </Grid>
            )}
            <Grid xs={12} sx={{ p: 0, display: "grid" }} md={12} item>
              <TableContainer>
                <Table aria-label="custom pagination table">
                  <TableHead>
                    {file.firstRowisHeader && (
                      <>
                        {tables.map((item, key) => {
                          let labelId = `filesrow-${key}`;
                          return (
                            <tr key={labelId}>
                              {key === 0 &&
                                item.map((td, i) => {
                                  let labelId = `filesrowth-${i}`;
                                  return (
                                    <TableCell key={labelId}>{td}</TableCell>
                                  );
                                })}
                            </tr>
                          );
                        })}
                      </>
                    )}

                    {!file.firstRowisHeader && (
                      <>
                        {tables.map((item, key) => {
                          let labelId = `filesrow-${key}`;
                          return (
                            <tr key={labelId}>
                              {key === 0 &&
                                item.map((td, i) => {
                                  let labelId = `filesrowth-${i}`;
                                  return (
                                    <TableCell key={labelId}>
                                      {" "}
                                      Column {i + 1}
                                    </TableCell>
                                  );
                                })}
                            </tr>
                          );
                        })}
                      </>
                    )}
                  </TableHead>
                  <TableBody
                    sx={{
                      "& tr": {
                        verticalAlign: "top",
                      },
                    }}
                  >
                    {tables.length > 0 &&
                      file.firstRowisHeader &&
                      tables.map((item, key) => {
                        const labelId = `filesrow-${key}`;
                        return (
                          <TableRow key={labelId}>
                            {item.length > 0 &&
                              key > 0 &&
                              item.map((td, i) => {
                                const labelId = `filesrowtd-${i}`;
                                return (
                                  <TableCell key={labelId}>{td}</TableCell>
                                );
                              })}
                          </TableRow>
                        );
                      })}

                    {tables.length > 0 &&
                      !file.firstRowisHeader &&
                      tables.map((item, key) => {
                        const labelId = `filesrow-${key}`;
                        return (
                          <TableRow key={labelId}>
                            {item.length > 0 &&
                              item.map((td, i) => {
                                const labelId = `filesrowtd-${i}`;
                                return (
                                  <TableCell key={labelId}>{td}</TableCell>
                                );
                              })}
                          </TableRow>
                        );
                      })}
                  </TableBody>
                </Table>
              </TableContainer>
            </Grid>
          </Grid>
        </Box>
      </Box>
      {loader && <SkeletonLoader />}
    </Box>
  );
}
