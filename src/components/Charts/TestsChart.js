import Paper from "@mui/material/Paper";
import {
  Chart,
  CommonSeriesSettings,
  Export,
  Legend,
  Series,
  Tooltip,
} from "devextreme-react/chart";

export default function Demo({ dataSource }) {
  const customizeTooltip = (arg) => {
    return {
      text: `${arg.seriesName} - ${arg.value}`,
    };
  };

  return (
    <Paper
      elevation={0}
      sx={{
        "& .dxc-title": {
          clipPath: "none",
          "& text": {
            fontSize: "14px !important",
            fontFamily: 'Poppins, Helvetica, "sans-serif" !important',
            fill: "#90a4ae !important",
            fontWeight: "400",
          },
        },
      }}
    >
      <Chart id="chart" dataSource={dataSource}>
        <CommonSeriesSettings
          argumentField="Date"
          type="stackedBar"
        ></CommonSeriesSettings>
        <Series valueField="Passed" name="Passed" color="#50cd89"></Series>
        <Series valueField="Failed" name="Failed" color="#ffc700"></Series>
        <Legend
          verticalAlignment="top"
          horizontalAlignment="center"
          itemTextPosition="right"
        />
        <Export enabled={true} />
        <Tooltip enabled={true} customizeTooltip={customizeTooltip} />
      </Chart>
    </Paper>
  );
}
