import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Button,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Typography,
} from "@mui/material";
import { Box } from "@mui/system";
import { useState } from "react";
import { ExpectedRowColumn } from "../Files/ValidationsForm";
import SkeletonLoader from "../SkeletonLoader";

export default function FilePreview({
  loader,
  file,
  totalRows,
  totalColumns,
  finalValidations,
  setFinalValidations,
  tables,
  rows,
  setRows,
}) {
  const [inputValue, setInputValue] = useState("");
  const [diable, setDiable] = useState(true);

  let validation_obj = JSON.parse(JSON.stringify(ExpectedRowColumn[0]));

  const [rowcol, setRowColumn] = useState(validation_obj);

  const addExpectedColRows = (e, type) => {
    if (e.target.value.length > 0) {
      setDiable(false);
    } else {
      setDiable(true);
    }
    if (type === "rows") {
      rowcol.NestedControls[0].SelectedValue = e.target.value.length
        ? e.target.value
        : 0;
    } else {
      rowcol[1]["Value"] = e.target.value;
    }
    setInputValue(e.target.value);
    setRowColumn(rowcol);
  };

  const addFinalRow = () => {
    let prev_validation = [...finalValidations];
    var list = prev_validation.filter((obj) => obj.ColumnName === "");
    if (list.length > 0) {
      list[0].validation[0].NestedControls[0].SelectedValue =
        rowcol.NestedControls[0].SelectedValue;
    } else {
      var a = {
        ColumnName: "",
        validation: [rowcol],
      };
      prev_validation.push(a);
    }
    let validation_obj = JSON.parse(JSON.stringify(ExpectedRowColumn[0]));
    setRowColumn(validation_obj);
    setFinalValidations(prev_validation);
    setInputValue("");
    setDiable(true);
  };

  return (
    <Accordion key={"sadasd"} defaultExpanded={true}>
      <Grid container alignItems="center">
        <Grid sx={{ pl: 2, display: "flex" }} sm={5}>
          <Typography>
            <b>File name:</b> {file?.fileName} [ rows:{totalRows} | cols:
            {totalColumns} ]
          </Typography>
        </Grid>
        <Grid sm={5}>
          <TextField
            className="expRow"
            size="small"
            type="number"
            value={inputValue}
            minLength="0"
            sx={{ mr: 1 }}
            onChange={(e) => addExpectedColRows(e, "rows")}
            label="Expected rows"
            variant="outlined"
            InputProps={{ inputProps: { min: "0", step: "1" } }}
            onKeyPress={(e) => {
              if (e.code === "Minus") {
                e.preventDefault();
              }
            }}
          />
          <Button
            className="expBtn"
            variant="contained"
            onClick={() => addFinalRow()}
            disabled={diable}
          >
            Add row count validation
          </Button>
        </Grid>
        <Grid sm={2}>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel2a-content"
            id="panel2a-header"
            sx={{ minHeight: "auto!important" }}
          ></AccordionSummary>
        </Grid>
      </Grid>
      <AccordionDetails sx={{ backgroundColor: "#ffffff" }}>
        <Box>
          <Grid container spacing={2} sx={{ py: 0.5 }}>
            <Grid xs={12} sx={{ p: 0, display: "grid" }} md={4} item></Grid>
            <Grid xs={12} md={3} item></Grid>
            <Grid xs={12} md={3} item></Grid>
            <Grid xs={12} md={2} item>
              <FormControl
                fullWidth
                sx={{ maxWidth: 100, ml: "auto", display: "flex", mb: 1 }}
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
                  <MenuItem key={"5"} value={5}>
                    5
                  </MenuItem>
                  <MenuItem key={"10"} value={10}>
                    10
                  </MenuItem>
                  <MenuItem key={"25"} value={25}>
                    25
                  </MenuItem>
                </Select>
              </FormControl>
            </Grid>
          </Grid>
          <TableContainer sx={{ display: "grid" }}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
              <TableHead>
                <TableRow key={"tablehead1"}>
                  {tables.length > 0 &&
                    tables[0].map((td, i) => {
                      const labelId = `columnOption-${i}`;
                      let optionVal = file?.firstRowisHeader
                        ? td
                        : `Column ${i + 1}`;
                      return <TableCell key={labelId}>{optionVal}</TableCell>;
                    })}
                </TableRow>
              </TableHead>
              <TableBody sx={{ "& tr": { verticalAlign: "top" } }}>
                {tables.length > 0 &&
                  (file?.firstRowisHeader ? tables.slice(1) : tables).map(
                    (item, key) => {
                      const labelId = `filesrow-${key}`;
                      return (
                        <TableRow key={labelId}>
                          {item.length > 0 &&
                            item.map((td, i) => {
                              const labelId = `filesrowtd-${i}`;
                              return <TableCell key={labelId}>{td}</TableCell>;
                            })}
                        </TableRow>
                      );
                    }
                  )}
              </TableBody>
            </Table>
          </TableContainer>
        </Box>
      </AccordionDetails>
      {loader && <SkeletonLoader />}
    </Accordion>
  );
}
