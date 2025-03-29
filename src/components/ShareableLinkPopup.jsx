import React, { useState, useEffect } from "react";
import { generateShareableLink } from "../services/driveService"; // Import API service for generating the link

const ShareableLinkPopup = ({ fileId,  onClose }) => {
  const [permissionType, setPermissionType] = useState("reader");
  const [link, setLink] = useState(""); // Store generated link
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(""); // To store any error message

  const token = localStorage.getItem("token");

  const handleGenerateShareableLink = async () => {
    setLoading(true);
    console.log("token:", token);
    setError(""); // Reset the error message

    try {
      const response = await generateShareableLink(fileId, permissionType, token);
      if (response.success) {
        setLink(response.shareableLink); // Set the generated link
      } else {
        setError("Failed to generate link. Please try again.");
      }
    } catch (err) {
      console.error("Error generating shareable link:", err);
      setError("Failed to generate link. Please try again.");
    }

    setLoading(false);
  };

  const handleCopy = () => {
    if (link) {
      navigator.clipboard.writeText(link);
      alert("Link copied to clipboard!"); // Notification after copying the link
    }
  };

  // Use useEffect to trigger the link generation whenever the permission type changes
  useEffect(() => {
    setLink(""); // Clear the existing link when permission type changes
    handleGenerateShareableLink(); // Regenerate the link based on the new permission type
  }, [permissionType, fileId, token]); // Dependencies: permissionType, fileId, and token

  return (
    <div className="popup-overlay">
      <div className="popup">
        <h3>Generate Shareable Link</h3>

        {/* Permission options */}
        <div className="permission-options">
          <label>
            <input
              type="radio"
              name="permissionType"
              value="reader"
              checked={permissionType === "reader"}
              onChange={(e) => setPermissionType(e.target.value)}
            />
            Reader (View)
          </label>
          <label>
            <input
              type="radio"
              name="permissionType"
              value="writer"
              checked={permissionType === "writer"}
              onChange={(e) => setPermissionType(e.target.value)}
            />
            Writer (Edit)
          </label>
        </div>

        {/* Show loading or error message */}
        {loading && <p>Generating link...</p>}
        {error && <p className="error">{error}</p>}

        {/* Display the generated link or "Create a link" if no link is generated yet */}
        <div className="link-container">
          {link ? (
            <div className="copu-link-div">
            <div className="sharabble-links">
              <p className="sharable-head">Shareable Link:</p>
              <a href={link}  target="_blank" rel="noopener noreferrer">
                {link} 
              </a>
            </div>
            <div>
              <button onClick={handleCopy} className="copy-btn">
                Copy Link
              </button>
              </div>
            </div>
          ) : (
            !loading && <p>Create a link to generate a shareable link.</p>
          )}
        </div>

        {/* Close button */}
        <div className="popup-actions">
          <button onClick={onClose}>Close</button>
        </div>
      </div>
    </div>
  );
};

export default ShareableLinkPopup;
