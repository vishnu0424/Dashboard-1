import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import {useState} from "react";
import DataCleaningForm from "./DataCleaningForm";
import FuzzyreplaceForm from "./FuzzyreplaceForm";

export default function DataCleaningTab({
  Connectiondetails,
  toggleDrawer,
  Table,
  Columns,
}) {
  const [value, setValue] = useState("1");

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ width: "100%", typography: "body1" }}>
      <TabContext value={value}>
        <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
          <TabList onChange={handleChange} aria-label="lab API tabs example">
            <Tab label="Fuzzy Replace" value="1" />
            <Tab label="Fixed Replace" value="2" />
          </TabList>
        </Box>
        <TabPanel value="1">
          <FuzzyreplaceForm
            Connectiondetails={Connectiondetails}
            Table={Table}
            Columns={Columns}
            toggleDrawer={toggleDrawer}
          />
        </TabPanel>
        <TabPanel value="2">
          <DataCleaningForm
            Connectiondetails={Connectiondetails}
            Table={Table}
            Columns={Columns}
            toggleDrawer={toggleDrawer}
          />
        </TabPanel>
      </TabContext>
    </Box>
  );
}
