import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { createGoogleDoc, updateGoogleDocContent, fetchGoogleDocContent } from "../services/driveService";
import ShareableLinkPopup from "../components/ShareableLinkPopup";
import InvitePeoplePopup from "../components/InvitePeoplePopup";
import { SiGoogledocs } from "react-icons/si";
import { IoPersonAdd } from "react-icons/io5";
import { IoMdSave } from "react-icons/io";
import { IoMdShare } from "react-icons/io";
const DocumentEditor = () => {
  const navigate = useNavigate();
  const { fileId } = useParams(); // Use fileId from the URL params
  const [content, setContent] = useState(" ");
  const [title, setTitle] = useState("");
  const [loading, setLoading] = useState(false);
  const [file, setFile] = useState(null);
  const [isNewFile, setIsNewFile] = useState(true);
  const [error, setError] = useState(null);
  const [popupVisible, setPopupVisible] = useState(true);
  const [showSharePopup, setShowSharePopup] = useState(false);
  const [showInvitePopup, setShowInvitePopup] = useState(false);
  const [unsavedChanges, setUnsavedChanges] = useState(false); // Track unsaved changes

  const token = localStorage.getItem("token");

  useEffect(() => {
    if (fileId) {
      setIsNewFile(false);
      setPopupVisible(false); // Hide the share and invite popups when loading a file
      fetchFileContent(fileId); // Fetch the file content if it's an existing file
    } else {
      setIsNewFile(true); // Mark as a new file if no fileId is provided
    }

    window.addEventListener("beforeunload", handleBeforeUnload); // Prevent leaving with unsaved changes

    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, [fileId]);

  const handleBeforeUnload = (event) => {
    if (unsavedChanges) {
      const message = "You have unsaved changes. Are you sure you want to leave?";
      event.returnValue = message; // For some browsers like Chrome
      return message;
    }
  };

  const fetchFileContent = async (fileId) => {
    try {
      const data = await fetchGoogleDocContent(fileId, token);
      console.log(data)
      setTitle(data.title);
      setContent(data.content);
      setFile(data);
    } catch (error) {
      console.error("Error fetching file content:", error);
    }
  };

  const handleSaveTitle = () => {
    setPopupVisible(false);
    saveContent(); // Proceed to save content when the title is saved
  };

  const saveContent = async () => {
    setLoading(true);

    if (!content || content.trim() === "") {
      alert("Cannot save an empty document.");
      setLoading(false);
      return;
    }

    try {
      if (isNewFile) {
        const newFile = await createGoogleDoc({ fileName: title, content }, token);
        setFile(newFile);
        setIsNewFile(false);
        setError(null); 
      } else {
        await updateGoogleDocContent(fileId, content, token); // Update the existing file content
        setError(null); 
        setContent(content); // Update the content state
      }

      setUnsavedChanges(false); // Reset unsaved changes flag
      setLoading(false);
      alert("Document saved successfully!");
      setError(null); 
    } catch (error) {
      setLoading(false);
      setError("Failed to save the document.");
      console.error("Error saving the document:", error);
    }
  };

  const handleContentChange = (e) => {
    setContent(e.target.value);
    setUnsavedChanges(true); // Mark document as having unsaved changes
  };

  const invitePeople = () => {
    setShowInvitePopup(true); // Show the invite popup
  };

  const backToHome = () => {
    navigate('/dashboard'); // Navigate back to dashboard
  };

  return (
    <div className="doc-editor">
      {/* Header */}
      <div className="doc-editor-header">
        <button onClick={backToHome} className="doc-editor-back-btn">
        <SiGoogledocs />
        </button>
        <input
          type="text"
          value={title}
          readOnly
          onChange={(e) => setTitle(e.target.value)} // Allow title editing
          className="doc-editor-title-input"
        />
        <button onClick={saveContent} disabled={loading} className="doc-editor-save-btn">
        <IoMdSave className="doc-editior-icon" /> {loading ? "Saving..." : "Save"}
        </button>
        <button onClick={invitePeople} className="doc-editor-save-btn">
        <IoPersonAdd  className="doc-editior-icon" /> Invite People
        </button>
        <button onClick={() => setShowSharePopup(true)} className="doc-editor-save-btn">
        <IoMdShare  className="doc-editior-icon" />Generate Shareable Link
        </button>
      </div>

      {/* Title Popup */}
      {popupVisible && (
        <div className="doc-editor-popup">
          <div className="doc-editor-popup-content">
            <h3>Enter Document Title</h3>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Document title"
              className="doc-editor-popup-title-input"
            />
            <div className="doc-editor-popup-actions">
              <button onClick={handleSaveTitle} className="doc-editor-save-title-btn">Save</button>
              <button onClick={() => navigate('/dashboard')} className="doc-editor-cancel-btn">Cancel</button>
            </div>
          </div>
        </div>
      )}

      {/* Textarea for editing content */}
      <div className="doc-editor-container">
        <textarea
          value={content}
          onChange={handleContentChange}
          placeholder="Write your content here..."
          className="doc-editor-textarea"
        />
      </div>

      {error && <p className="doc-editor-error-message">{error}</p>}

      {/* Shareable Link Popup */}
      {showSharePopup && (
        <ShareableLinkPopup
          fileId={file.fileId}
          token={token}
          onClose={() => setShowSharePopup(false)}
        />
      )}

      {/* Invite People Popup */}
      {showInvitePopup && (
        <InvitePeoplePopup
          fileId={file.fileId}
          token={token}
          onClose={() => setShowInvitePopup(false)}
        />
      )}
    </div>
  );
};

export default DocumentEditor;
