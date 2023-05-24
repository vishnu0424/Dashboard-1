import { useState } from "react";
import FileValidations from "./FileValidations";

export default function FFileValidations() {
  const [file, setFile] = useState({});

  return <FileValidations file={file} setFile={setFile} />;
}
