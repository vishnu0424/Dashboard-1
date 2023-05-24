import { FileUploader } from "react-drag-drop-files";
const fileTypes = ["JPG", "PNG", "GIF"];

export default function ImageUpload({ file, setFile }) {
  const handleChange = (file) => {
    if (file[0]) {
      setFile(file);
    }
  };

  return (
    <div className="imageUpload">
      <FileUploader
        multiple={true}
        handleChange={handleChange}
        name="file"
        types={fileTypes}
      />
      {file ? (
        <>
          {file[0] ? (
            <p>File name: {file[0].name}</p>
          ) : (
            <p>File name: {file.originalname}</p>
          )}
        </>
      ) : (
        <>
          <p>no files uploaded yet</p>
        </>
      )}
    </div>
  );
}
