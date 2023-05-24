import {
  Box,
  Grid,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from "@mui/material";
import {useState} from "react";
import ApiRequests from "./APIRequests";

export default function APIExecuteResult({ AutoScroll, items }) {
  const [rows] = useState(items);
  return (
    <Box sx={{ maxHeight: "70vh", overflow: "auto", pb: 1, width: "100%" }}>
      <Grid container sx={{ my: 0 }}>
        <Grid xs={12}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>API Url</TableCell>
                <TableCell>Method</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {Array.isArray(rows) &&
                rows.map((item) => {
                  return <ApiRequests AutoScroll={AutoScroll} row={item} />;
                })}
            </TableBody>
          </Table>
        </Grid>
      </Grid>
    </Box>
  );
}
