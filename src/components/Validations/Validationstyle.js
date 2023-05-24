import { styled } from "@mui/material/styles";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";
import { makeStyles } from "@mui/styles";

export const useStyles = makeStyles({
  root: {
    "& .selectConnection": {
      "& .filterCon": {
        "& .MuiOutlinedInput-root": {
          borderTopRightRadius: "0px",
          borderBottomRightRadius: "0px",
        },
      },
    },
  },
  createconnection: {
    "& .MuiBackdrop-root": {
      backgroundColor: "transparent",
    },
    "& .MuiDrawer-paperAnchorRight": {
      padding: "30px",
      paddingBottom: "70px",
      top: "48px",
      boxShadow:
        "0px 8px 10px -5px rgb(0 0 0 / 20%), 0px 16px 24px 2px rgb(0 0 0 / 4%), 0px 6px 30px 5px rgb(0 0 0 / 5%)",
    },
  },
});

export const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
    padding: "0px 10px",
    border: "0.5px solid #ccc",
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 12,
    padding: "0px 10px",
    border: "0.5px solid #ccc",
  },
}));

export const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  "&:last-child td, &:last-child th": {
    borderBottom: 0,
  },
}));
