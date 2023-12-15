// FileInput.tsx
import React, { ChangeEvent, useState } from "react";

interface FileInputProps {
  onFilesChange: (files: FileList | null) => void;
}

const FileInput: React.FC<FileInputProps> = ({ onFilesChange }) => {
  const [selectedFileNames, setSelectedFileNames] = useState<string[]>([]);

  const handleFilesChange = (event: ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files || null;
    onFilesChange(files);

    // Update the selected file names for display
    const fileNames = files ? Array.from(files).map((file) => file.name) : [];
    setSelectedFileNames(fileNames);
  };

  return (
    <label className="block text-sm font-medium text-gray-700">
      <div className="flex flex-col items-center justify-center bg-gray-100 border-dashed border-2 border-gray-300 rounded-md p-4">
        <svg
          className="w-6 h-6 text-gray-400 mb-2"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M8 15v3h8v-3"
          ></path>
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M12 10V3"
          ></path>
        </svg>
        <span className="text-gray-600">
          {selectedFileNames.length > 0
            ? selectedFileNames.join(", ")
            : "Upload files"}
        </span>
        <input
          type="file"
          className="hidden"
          onChange={handleFilesChange}
          multiple
        />
      </div>
    </label>
  );
};

export default FileInput;
