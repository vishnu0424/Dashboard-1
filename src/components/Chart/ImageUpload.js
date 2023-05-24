import { FileUploader } from "react-drag-drop-files";
const fileTypes = ["JPEG", "PNG", "GIF"];

export default function ImageUpload({ file, setFile }) {
  const handleChange = (file) => {
    setFile(null);
    setTimeout(() => {
      setFile(file);
    }, 1);
  };

  return (
    <div className="imageUpload">
      <FileUploader
        multiple={true}
        handleChange={handleChange}
        name="file"
        types={fileTypes}
      />
      <p>
        {file && file[0]
          ? `File name: ${file[0]?.name}`
          : "no files uploaded yet"}
      </p>
    </div>
  );
}
