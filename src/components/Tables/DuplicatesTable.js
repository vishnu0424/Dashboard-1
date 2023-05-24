import { useEffect, useState } from "react";
import { CustomHeaderAgGrid } from "../AgGrid/CustomAgGrid";

export default function DuplicatesInDataSource({ highLightColumn, headCells }) {
  const [bodyData, setBodyData] = useState([]);
  
  useEffect(() => {
    let arr = [];
    headCells.forEach((obj) => {
      obj.Entities.forEach((obj1) => {
        arr.push(obj1);
      });
    });
    setBodyData(arr);
  }, [headCells]);

  return (
    <div>
      {bodyData.length > 0 && (
        <CustomHeaderAgGrid
          data={bodyData}
          errorColumn={{ columns: highLightColumn, color: "red" }}
        />
      )}
    </div>
  );
}
