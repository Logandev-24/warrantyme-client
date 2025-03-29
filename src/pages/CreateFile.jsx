import React, { useState } from "react";

const CreateFile = () => {
  const [fileType, setFileType] = useState("google-docs");

  const handleCreate = () => {
    // API call to create file (Google Doc or Text file)
    alert(`Creating a new ${fileType}`);
  };

  return (
    <div className="create-file">
      <h2>Create New File</h2>
      <div>
        <label>
          File Type:
          <select value={fileType} onChange={(e) => setFileType(e.target.value)}>
            <option value="google-docs">Google Docs</option>
            <option value="text-file">Text File</option>
          </select>
        </label>
      </div>
      <button onClick={handleCreate}>Create</button>
    </div>
  );
};

export default CreateFile;
