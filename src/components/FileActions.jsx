import React from "react";

const FileActions = ({ onCreateDoc, onCreateText }) => {
  return (
    <div className="file-actions-container">
      <button onClick={onCreateDoc} className="create-btn">Create Google Doc</button>
      <button onClick={onCreateText} className="create-btn">Create Text File</button>
    </div>
  );
};

export default FileActions;
