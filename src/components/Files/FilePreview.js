import {
  Box,
  Button,
  Card,
  Grid,
  Modal,
  Paper,
  Table,
  TableBody,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import * as XLSX from "xlsx";
import {
  StyledTableCell,
  StyledTableRow,
} from "../Validations/Validationstyle";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "80%",
  bgcolor: "background.paper",
  borderTop: "10px solid #2b81d6",
  boxShadow: 24,
  px: 2,
  pb: 2,
  borderRadius: "4px",
  maxHeight: "97vh",
};

export default function FilePreview(props) {
  const { file, model, returnValue } = props;
  const [open, setOpen] = useState(model);
  const [rows, setrows] = useState([]);

  const handleClose = () => {
    setOpen(false);
    returnValue(false);
  };

  useEffect(() => {
    setOpen(model);
  }, [model]);

  useEffect(() => {
    var f = file;
    let reader = new FileReader();

    reader.onload = function (e) {
      var data = e.target.result;
      let readedData = XLSX.read(data, { type: "binary" });
      const wsname = readedData.SheetNames[0];
      const ws = readedData.Sheets[wsname];

      /* Convert array to json*/
      const dataParse = XLSX.utils.sheet_to_json(ws, {
        header: 1,
        defval: null,
      });
      setrows(dataParse);
    };
    reader.readAsBinaryString(f);
  }, [file]);

  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Card>
        <Box sx={style}>
          <Box sx={{ p: "2px 16px", backgroundColor: "#e5f6fd" }}>
            <Grid container>
              <Grid sm={12} item>
                <Typography textAlign="center" variant="h6">
                  Preview{" "}
                </Typography>
              </Grid>
            </Grid>
          </Box>
          <Box
            sx={{
              maxHeight: "70vh",
              overflow: "auto",
              pb: 1,
              width: "100%",
              my: "10px",
            }}
          >
            <TableContainer component={Paper}>
              <Table aria-label="customized table">
                <TableHead>
                  <TableRow>
                    {rows[0]?.length > 0 &&
                      rows[0]?.map((obj) => (
                        <StyledTableCell>{obj}</StyledTableCell>
                      ))}
                  </TableRow>
                </TableHead>
                <TableBody sx={{ "& tr": { verticalAlign: "top" } }}>
                  {rows.map((obj, index) => {
                    return (
                      <StyledTableRow>
                        {index > 0 &&
                          obj.map((data) => {
                            return (
                              <StyledTableCell component="th" scope="row">
                                {data}
                              </StyledTableCell>
                            );
                          })}
                      </StyledTableRow>
                    );
                  })}
                </TableBody>
              </Table>
            </TableContainer>
            <Box sx={{ my: "10px" }}>
              <Grid container>
                <Grid item xs={6} textAlign="right">
                  <Typography
                    sx={{ flex: "1 1 100%", mb: 1 }}
                    id="tableTitle"
                    component="div"
                  >
                    <b>Total Rows:</b> {rows.length - 1}
                  </Typography>
                </Grid>
                <Grid item xs={6} textAlign="right">
                  <Typography
                    sx={{ flex: "1 1 100%", mb: 1 }}
                    id="tableTitle"
                    component="div"
                  >
                    <b>Total Columns:</b> {rows[0]?.length - 1}
                  </Typography>
                </Grid>
              </Grid>
            </Box>
          </Box>
          <Box textAlign="center" mt="16px">
            <Button onClick={handleClose} variant="outlined" size="small">
              Ok
            </Button>
          </Box>
        </Box>
      </Card>
    </Modal>
  );
}
