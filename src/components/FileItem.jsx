import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import DeleteConfirmationPopup from "./DeleteConfirmationPopup";
import ShareableLinkPopup from "./ShareableLinkPopup";
import { MdDeleteOutline, MdEditSquare } from "react-icons/md";
import { SiGoogledocs } from "react-icons/si";

const FileItem = ({ file, token }) => {
  const [showDeletePopup, setShowDeletePopup] = useState(false);
  const [showSharePopup, setShowSharePopup] = useState(false);
  const navigate = useNavigate();

  const handleEdit = () => {
    localStorage.removeItem("lastFileId");
    navigate(`/document/${file.id}`);
  };

  const handleDeleteSuccess = () => {
    // Handle any post-deletion actions (like refreshing the file list)
  };

  return (
    <li className="file-item">
      <div className="file-item-head">
        <div className="file-item-details">
          <h3>{file.name}</h3>
          <p>Last Modified: {file.modifiedTime}</p>
        </div>
        <button className="file-edit-btn" onClick={handleEdit}>
          <MdEditSquare />
        </button>
      </div>

      {/* Google Docs Embed Preview */}
      <div className="file-preview-container">
        <iframe
          src={`https://docs.google.com/document/d/${file.id}/preview`}
          title="Document Preview"
          className="doc-iframe"
        ></iframe>
      </div>

      <div className="file-actions">
        <a href={file.webViewLink} target="_blank" rel="noopener noreferrer">
          <SiGoogledocs className="doc-icon" /> Open in Google Docs
        </a>

        <button className="share-btn" onClick={() => setShowSharePopup(true)}>
          🔗 Share
        </button>
        <button className="delete-btn" onClick={() => setShowDeletePopup(true)}>
          <MdDeleteOutline className="delete-icon" />
        </button>
      </div>

      {/* Delete Confirmation Popup */}
      {showDeletePopup && (
        <DeleteConfirmationPopup
          fileId={file.id}
          token={token}
          fileName={file.name}
          onDeleteSuccess={handleDeleteSuccess}
          onClose={() => setShowDeletePopup(false)}
        />
      )}

      {/* Shareable Link Popup */}
      {showSharePopup && (
        <ShareableLinkPopup
          fileId={file.id}
          token={token}
          onClose={() => setShowSharePopup(false)}
        />
      )}
    </li>
  );
};

export default FileItem;
