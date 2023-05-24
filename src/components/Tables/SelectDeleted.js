import DeleteIcon from "@mui/icons-material/Delete";
import {
  Button,
  Dialog,
  DialogActions,
  DialogTitle,
  IconButton,
  Toolbar,
  Tooltip,
  Typography,
} from "@mui/material";
import { alpha } from "@mui/material/styles";
import PropTypes from "prop-types";
import { tableStyles } from "../Styles";

export default function SelectDeleted(props) {
  const { numSelected, deleteFun, openDialog, setOpenDialog } = props;

  const classes = tableStyles();

  const handleClickOpenDialog = () => {
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  return (
    <Toolbar
      sx={{
        minHeight: { xs: 35 },
        pl: { sm: 2 },
        pr: { xs: 1, sm: 1 },
        ...(numSelected > 0 && {
          bgcolor: (theme) =>
            alpha(
              theme.palette.primary.main,
              theme.palette.action.activatedOpacity
            ),
        }),
      }}
    >
      {numSelected > 0 && (
        <Typography
          sx={{ flex: "1 1 100%" }}
          color="inherit"
          variant="subtitle1"
          component="div"
        >
          {numSelected} selected
        </Typography>
      )}

      {numSelected > 0 && (
        <Tooltip title="Delete">
          <IconButton size="small" onClick={handleClickOpenDialog}>
            <DeleteIcon />
          </IconButton>
        </Tooltip>
      )}
      <Dialog
        className={classes.dialogCus}
        open={openDialog}
        onClose={handleCloseDialog}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle variant="h6" id="alert-dialog-title">
          {"Are you sure want to delete?"}
        </DialogTitle>

        <DialogActions>
          <Button variant="outlined" size="small" onClick={deleteFun} autoFocus>
            Yes
          </Button>
          <Button
            variant="outlined"
            color="error"
            size="small"
            onClick={handleCloseDialog}
          >
            No
          </Button>
        </DialogActions>
      </Dialog>
    </Toolbar>
  );
}

SelectDeleted.propTypes = {
  numSelected: PropTypes.number.isRequired,
};
