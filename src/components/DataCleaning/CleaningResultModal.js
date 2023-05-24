import { Box, Button, Card, Grid, Modal, Typography } from "@mui/material";
import { useState, useEffect } from "react";
import FuzzyReplaceResult from "./FuzzyReplaceResult";
import ConnectionDetails from "./MasterdataConnectionDetails";

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

export default function CleaningResultModal(props) {
  const { Result, model, returnValue } = props;
  const [open, setOpen] = useState(model);

  const handleClose = () => {
    setOpen(false);
    returnValue(false);
  };

  useEffect(() => {
    setOpen(model);
  }, [model]);

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
                  Data Cleaning Result{" "}
                </Typography>
              </Grid>
            </Grid>
          </Box>
          {Result && (
            <ConnectionDetails
              connectionDetails={Result?.dataCleaning?.connectionDeatails}
            />
          )}
          {Result && <FuzzyReplaceResult Result={Result} />}
          <Box textAlign="center" mt="16px">
            <Button onClick={handleClose} variant="outlined" size="small">
              Cancel
            </Button>
          </Box>
        </Box>
      </Card>
    </Modal>
  );
}
