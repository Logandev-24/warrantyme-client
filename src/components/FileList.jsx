import React, { useEffect, useState } from "react";
import FileItem from "./FileItem";
import { listFilesInFolder } from "../services/driveService";

const FileList = ({ token }) => {
  const [files, setFiles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchFiles = async () => {
      setLoading(true);
      setError(null);

      try {
        const response = await listFilesInFolder(token); // Fetch response from API
        if (response.success && Array.isArray(response.files)) {
          setFiles(response.files); // Only set files if response is valid
        } else {
          setError("No files found or invalid response.");
        }
      } catch (error) {
        console.log(error);
        setError("Failed to fetch files. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchFiles();
  }, [token]);

  return (
    <div className="file-list">


      {loading ? (
        <p>Loading files...</p>
      ) : error ? (
        <p>{error}</p>
      ) : files.length === 0 ? (
        <p>No files found.</p>
      ) : (
        <ul className="file-list-ul">
          {files.map((file) => (
            <FileItem key={file.id} file={file} />
          ))}
        </ul>
      )}
    </div>
  );
};

export default FileList;
