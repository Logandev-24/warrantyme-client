import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import Navbar from "../components/Navbar";
import FileList from "../components/FileList";
import { TiDocumentAdd } from "react-icons/ti";

const Dashboard = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const token = localStorage.getItem("token");

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      navigate("/");
      return;
    }

    try {
      const decodedUser = jwtDecode(token);
      setUser(decodedUser);
    } catch (error) {
      console.error("Invalid token:", error);
      localStorage.removeItem("token");
      navigate("/");
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    setUser(null);
    navigate("/");
  };

  const handleCreateDocument = () => {
    localStorage.removeItem("lastFileId");
    // Navigate to the DocumentEditor to create a new document
    navigate("/create-document");
  };

  return (
    <div>
      {user && <Navbar user={user} onLogout={handleLogout} />}
      <div className="dashboard">
        {user ? (
          <>
            {/* Create Document Button */}
            <div className="create-document-btn-container">
            <h2>📂 Your Google Drive Files</h2>

              <button
                onClick={handleCreateDocument}
                className="create-document-btn"
              >
                <TiDocumentAdd className="new-doc-icon" />
                Create New Document
              </button>
            </div>

            {/* File List */}
            <FileList token={token} />
          </>
        ) : (
          <p>Loading...</p>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
