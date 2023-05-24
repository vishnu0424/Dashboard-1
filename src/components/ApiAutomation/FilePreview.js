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
import { JSONTree } from "react-json-tree";
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
  const [rows, setRows] = useState(file);
  const handleClose = () => {
    setOpen(false);
    returnValue(false);
  };

  useEffect(() => {
    setOpen(model);
  }, [model]);

  useEffect(() => {
    setRows(file);
  }, [file]);

  return (
    <>
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
                    Preview
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
                      {rows[0] &&
                        Object.keys(rows[0]).length > 0 &&
                        Object.keys(rows[0]).map((obj) => (
                          <StyledTableCell>{obj}</StyledTableCell>
                        ))}
                    </TableRow>
                  </TableHead>
                  <TableBody sx={{ "& tr": { verticalAlign: "top" } }}>
                    {Array.isArray(rows) ? (
                      rows.map((obj, index) => {
                        return (
                          <StyledTableRow key={index + obj.toString()}>
                            {Object.keys(obj).map((data) => {
                              return (
                                <StyledTableCell component="th" scope="row">
                                  {obj[data]}
                                </StyledTableCell>
                              );
                            })}
                          </StyledTableRow>
                        );
                      })
                    ) : (
                      <>
                        <StyledTableRow key={1}>
                          <StyledTableCell
                            component="th"
                            scope="row"
                            align="center"
                            sx={{
                              color: "red",
                            }}
                          >
                            Not Valid
                          </StyledTableCell>
                        </StyledTableRow>

                        <StyledTableRow key={2}>
                          <StyledTableCell component="tr" scope="row">
                            {rows && (
                              <JSONTree data={rows} theme={{}} invertTheme />
                            )}
                          </StyledTableCell>
                        </StyledTableRow>
                      </>
                    )}
                  </TableBody>
                </Table>
              </TableContainer>
            </Box>
            <Box textAlign="center" mt="16px">
              <Button onClick={handleClose} variant="outlined" size="small">
                Ok
              </Button>
            </Box>
          </Box>
        </Card>
      </Modal>
    </>
  );
}
