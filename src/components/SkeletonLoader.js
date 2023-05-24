import Box from "@mui/material/Box";
import Skeleton from "@mui/material/Skeleton";
import * as React from "react";

export default function SkeletonLoader() {
  return (
    <Box fullWidth>
      <Skeleton style={{ background: "#096fb7" }} />
      <Skeleton animation="wave" style={{ background: "#096fb7" }} />
      <Skeleton animation={false} style={{ background: "#096fb7" }} />
    </Box>
  );
}
