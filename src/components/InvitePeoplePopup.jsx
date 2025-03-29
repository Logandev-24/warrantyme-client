import React, { useState } from "react";
import { shareGoogleDoc } from "../services/driveService"; // Assuming shareGoogleDoc is imported correctly

const InvitePeoplePopup = ({ fileId, token, onClose }) => {
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("reader"); // Default role is "reader"
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleInvite = async () => {
    setLoading(true);
    setError(null);
    
    if (!email || !role) {
      setError("Email and Role are required.");
      setLoading(false);
      return;
    }

    try {
      await shareGoogleDoc(fileId, email, role, token);
      setLoading(false);
      alert("Invite sent successfully!");
      onClose(); // Close the modal after success
    } catch (error) {
        console.log(error);
      setLoading(false);
      setError("Failed to send invite.");
    }
  };

  return (
    <div className="popup-overlay">
      <div className="popup">
        <h3>Invite People</h3>
        <label>Email Address</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter email address"
          className="popup-email-input"
        />
        <label>Permission Type</label>
        <select
          value={role}
          onChange={(e) => setRole(e.target.value)}
          className="popup-email-select"
        >
          <option value="reader">Reader</option>
          <option value="writer">Writer</option>
        </select>
        {error && <p className="error-message">{error}</p>}
        <div className="popup-actions">
          <button onClick={handleInvite} disabled={loading} className="popup-button">
            {loading ? "Sending..." : "Send Invite"}
          </button>
          <button onClick={onClose} className="popup-cancel-button">Cancel</button>
        </div>
      </div>
    </div>
  );
};

export default InvitePeoplePopup;
