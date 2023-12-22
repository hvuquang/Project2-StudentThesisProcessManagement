// components/FileList.js
const FileList = ({ files }: { files: FileList }) => {
  if (!files || files.length === 0) {
    return <p>No files available.</p>;
  }

  return (
    <ul>
      {files.map((file, index) => (
        <li key={index}>{file}</li>
      ))}
    </ul>
  );
};

export default FileList;
