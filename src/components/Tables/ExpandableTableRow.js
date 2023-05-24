import { Box, TableCell, TableRow } from "@mui/material";
import React, { useState, useEffect } from "react";
import KeyboardArrowDownOutlinedIcon from "@mui/icons-material/KeyboardArrowDownOutlined";
import KeyboardArrowUpOutlinedIcon from "@mui/icons-material/KeyboardArrowUpOutlined";

export default function ExpandableTableRow({
  AutoScroll,
  children,
  PassedRows,
  showData,
  type,
  FailedRows,
  expandComponent,
  ...otherProps
}) {
  const [isExpanded, setIsExpanded] = useState(false);

  useEffect(() => {
    if (type) {
      setIsExpanded(type);
    }
  }, [type]);

  return (
    <React.Fragment>
      <TableRow {...otherProps}>
        {children}
        <TableCell sx={{}}>
          <Box
            className="passfailBtn"
            variant="contained"
            color="primary"
            onClick={() => {
              setIsExpanded(!isExpanded);
              AutoScroll();
            }}
          >
            {showData}
            {isExpanded ? (
              <KeyboardArrowUpOutlinedIcon />
            ) : (
              <KeyboardArrowDownOutlinedIcon />
            )}
          </Box>
        </TableCell>
      </TableRow>
      {isExpanded && <TableRow>{expandComponent}</TableRow>}
    </React.Fragment>
  );
}
