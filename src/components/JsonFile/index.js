import { useEffect, useState } from "react";
import ApiService from "../../services/app.service";
import SkeletonLoader from "../SkeletonLoader";
import CustomJsonTree from "./CustomJsonTree";

export default function CustomizedTreeView(props) {
  const { ScrollRef, returnVal, connection } = props;

  const [response, setResponse] = useState();
  const [loader, setLoader] = useState(false);

  useEffect(() => {
    (async () => {
      setLoader(true);
      var response = await ApiService.GetFilesData({
        id: connection,
        numberOfRows: 5,
      });
      setResponse(response?.data);
      setLoader(false);
      setTimeout(() => {
        ScrollRef.current.scrollIntoView({
          behavior: "smooth",
          block: "end",
          inline: "nearest",
        });
      }, 500);
    })();
  }, [connection]);

  return (
    <>
      {response && (
        <CustomJsonTree
          response={response}
          returnVal={returnVal}
          showCross={true}
        />
      )}
      {loader && <SkeletonLoader />}
    </>
  );
}
