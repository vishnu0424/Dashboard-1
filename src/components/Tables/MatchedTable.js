import { Box, Tab, Tabs } from "@mui/material";
import { useState, useMemo } from "react";
import { CustomHeaderAgGrid } from "../AgGrid/CustomAgGrid";

export default function MatchedComponent(props) {
  const { headCells, highLightColumn } = props;
  const [source1, setSource1] = useState([]);
  const [source2, setSource2] = useState([]);
  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  useMemo(() => {
    var src1 = [];
    var src2 = [];
    headCells.forEach((obj) => {
      obj.EntitiesInSource1.forEach((obj1) => {
        src1.push(obj1);
      });
      obj.EntitiesInSource2.forEach((obj2) => {
        src2.push(obj2);
      });
    });
    setSource1(src1);
    setSource2(src2);
  }, []);

  return (
    <Box
      sx={{
        mb: 2,
        textAlign: "center",
        pb: 1,
      }}
    >
      <Tabs sx={{ mb: 2 }} value={value} centered onChange={handleChange}>
        <Tab
          label={"First Data source [" + source1.length + "]"}
          color="success"
          variant="outlined"
        />
        <Tab
          label={"Second Data source [" + source2.length + "]"}
          sx={{ ml: 1 }}
          color="red"
          variant="outlined"
        />
      </Tabs>

      {value === 0 && (
        <CustomHeaderAgGrid
          data={source1}
          errorColumn={{ columns: [highLightColumn.columnOne], color: "red" }}
        />
      )}
      {value === 1 && (
        <CustomHeaderAgGrid
          data={source2}
          errorColumn={{ columns: [highLightColumn.columnTwo], color: "red" }}
        />
      )}
    </Box>
  );
}
