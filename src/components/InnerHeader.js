import * as React from "react";
import { Box, Grid, Paper, Typography } from "@mui/material";

export default function InnerHeader({name}) {
    return (
<Box className="innerHeader">
<Typography variant="h6" marginBottom="0" gutterBottom component="div">
{name}
</Typography>

</Box>
    );
}