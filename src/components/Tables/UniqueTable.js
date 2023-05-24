import { CustomHeaderAgGrid } from "../AgGrid/CustomAgGrid";

export default function UniqueTableView({ highLightColumn, bodyData }) {
  return (
    <CustomHeaderAgGrid
      data={bodyData}
      errorColumn={{ columns: highLightColumn, color: "red" }}
    />
  );
}
