import React from "react";
import { deleteGoogleDoc } from "../services/driveService"; // API call for deleting file

const DeleteConfirmationPopup = ({ fileId, fileName, onClose, onDeleteSuccess }) => {
  const handleDelete = async () => {
    try {
      await deleteGoogleDoc(fileId, token);
      alert(`${fileName} deleted successfully!`);
      onDeleteSuccess(); // Callback to handle post-deletion actions in parent
      onClose();
      window.location.reload();
    } catch (error) {
      console.error("Error deleting file:", error);
      alert("Failed to delete file.");
    }
  };

  const token = localStorage.getItem("token");
  return (
    <div className="popup-overlay">
      <div className="popup">
        <h3>Are you sure you want to delete {fileName}?</h3>
        <div className="popup-actions">
          <button onClick={onClose}>Cancel</button>
          <button onClick={handleDelete} className="delete-btn">
            Confirm Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteConfirmationPopup;
