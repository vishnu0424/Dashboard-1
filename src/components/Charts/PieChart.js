import { Box, Divider, Grid, Typography } from "@mui/material";
import PieChart, {
  Connector,
  Font,
  Label,
  Legend,
  Series,
  Size
} from "devextreme-react/pie-chart";
import React, { useState } from "react";
import CustomDrawer from "../Drawer/index.js";
import { headCells } from "../Drawer/Modal.js";

function PieChartComponent({ columnData }) {
  const [drawerData, setdrawerData] = useState([]);
  const [state, setState] = useState(false);
  const [cells, setCells] = useState();

  const piedataSource = [ 'NullCount', 'NotNullCount', 'DistinctCount', 'DuplicateCount' ];

  function formateData(columnData) {
    let formattedData = [];
    piedataSource.forEach((obj) => {
      if (obj === "DistinctCount") {
        formattedData.push({
          key: obj,
          value: columnData[obj],
          details: columnData["DistinctValues"],
        });
      } else if (obj === "DuplicateCount") {
        formattedData.push({
          key: obj,
          value: columnData[obj],
          details: columnData["DuplicateValues"],
        });
      } else {
        formattedData.push({
          key: obj,
          value: columnData[obj],
        });
      }
    });
    return formattedData;
  }

  function formatLabel(arg) {
    return `${arg.argumentText}: ${arg.valueText}`;
  }

  const handlePropertyChange = (e) => {
    e.target.select();
    if (e.target.data.details) {
      var data = [...headCells];
      if (e.target.data.details[0].Count) {
        data.push({
          field: "Count",
          headerName: "Count",
          sortable: true,
          filter: false,
        });
      }
      setCells(data);
      setdrawerData(e.target.data);
      setState(true);
    }
  };
  return (
    <>
      {columnData.map((obj, index) => {
        let formattedData = formateData(obj);
        return (
          <React.Fragment key={index}>
            <Grid
              container
              alignItems="center"
              sx={{ padding: "8px 0px" }}
              spacing={1}
              key={index}
            >
              <Grid md={2} item>
                <Box className="colName">
                  <Typography>{obj.Name}</Typography>
                </Box>
              </Grid>
              <Grid md={10} item>
                <Box>
                  <Grid container spacing={0.5} alignItems="center">
                    <Grid md={7} item>
                      <Box position="relative">
                        <Grid container spacing={0.5}>
                          <Grid md={4} item key={1}>
                            <Box className="DPGraphFooter">
                              <Typography>Min Value</Typography>
                              <Typography variant="bold">
                                {obj?.MinValue ? obj?.MinValue : "NA"}
                              </Typography>
                            </Box>
                          </Grid>
                          <Grid md={4} item key={2}>
                            <Box className="DPGraphFooter">
                              <Typography>Max Value</Typography>
                              <Typography variant="bold">
                                {obj?.MaxValue ? obj?.MaxValue : "NA"}
                              </Typography>
                            </Box>
                          </Grid>
                          <Grid md={4} item key={3}>
                            <Box className="DPGraphFooter">
                              <Typography>Avg Value</Typography>
                              <Typography variant="bold">
                                {obj?.AvgValue ? obj?.AvgValue : "NA"}
                              </Typography>
                            </Box>
                          </Grid>
                          <Grid md={4} item key={4}>
                            <Box className="DPGraphFooter">
                              <Typography>Min Value Length</Typography>
                              <Typography variant="bold">
                                {obj?.MinValueLength}
                              </Typography>
                            </Box>
                          </Grid>
                          <Grid md={4} item key={5}>
                            <Box className="DPGraphFooter">
                              <Typography>Max Value Length</Typography>
                              <Typography variant="bold">
                                {obj?.MaxValueLength}
                              </Typography>
                            </Box>
                          </Grid>
                          <Grid md={4} item key={6}>
                            <Box className="DPGraphFooter">
                              <Typography>Average Value Length</Typography>
                              <Typography variant="bold">
                                {obj?.AverageValueLength}
                              </Typography>
                            </Box>
                          </Grid>
                        </Grid>
                      </Box>
                    </Grid>
                    <Grid md={5} item>
                      <PieChart
                        id="pie"
                        className="pieChart"
                        palette="Bright"
                        dataSource={formattedData}
                        onPointClick={handlePropertyChange}
                      >
                        <Legend
                          orientation="horizontal"
                          itemTextPosition="right"
                          horizontalAlignment="center"
                          verticalAlignment="bottom"
                          columnCount={15}
                        />
                        <Series argumentField="key" valueField="value">
                          <Label visible={true} customizeText={formatLabel}>
                            <Font size={8} />
                            <Connector visible={true} />
                          </Label>
                        </Series>
                        <Size height={100} />
                      </PieChart>
                    </Grid>
                  </Grid>
                </Box>
              </Grid>
            </Grid>
            <Divider />
          </React.Fragment>
        );
      })}
      <CustomDrawer
        state={state}
        setState={setState}
        drawerData={drawerData}
        headCells={cells}
      />
    </>
  );
}

export default PieChartComponent;
