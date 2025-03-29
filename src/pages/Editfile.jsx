import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { EditorState, convertFromRaw, convertToRaw } from "draft-js";
import { Editor } from "draft-js";
import { fetchGoogleDocContent, updateGoogleDocContent } from "../services/driveService"; // Use the updated API service

const EditFile = () => {
  const { fileId } = useParams(); // Get fileId from URL params
  const navigate = useNavigate();

  const [editorState, setEditorState] = useState(EditorState.createEmpty()); // Initial empty editor state
  const [isLoading, setIsLoading] = useState(true); // Loading state
  const [error, setError] = useState(null); // Error state

  // Fetch file content when the component mounts or when fileId changes
  useEffect(() => {
    const fetchContent = async () => {
      setIsLoading(true); // Start loading when fetching content
      setError(null); // Reset error state
      try {
        const content = await fetchGoogleDocContent(fileId); // Fetch content from API
        if (content) {
          const rawContent = convertFromRaw(content); // Convert raw content to Draft.js format
          setEditorState(EditorState.createWithContent(rawContent)); // Set content in the editor
        }
        setIsLoading(false); // Set loading to false after fetching content
      } catch (err) {
        console.error(err);
        setError("Failed to load file content");
        setIsLoading(false);
      }
    };

    fetchContent(); // Trigger fetching the file content
  }, [fileId]); // Dependency array ensures it runs when fileId changes

  // Handle changes in the editor state
  const handleEditorChange = (newEditorState) => {
    setEditorState(newEditorState); // Update the editor state when user types
  };

  // Save the file content to the server
  const saveFileContent = async () => {
    setIsLoading(true); // Start loading when saving the content
    setError(null); // Reset error state
    try {
      const rawContent = convertToRaw(editorState.getCurrentContent()); // Convert editor state to raw Draft.js content
      await updateGoogleDocContent(fileId, rawContent); // Save content using the updated API service
      navigate("/dashboard"); // Redirect to the dashboard after successful save
    } catch (err) {
      console.error(err);
      setError("Failed to save file content");
    } finally {
      setIsLoading(false); // Stop loading when saving is complete
    }
  };

  // Display loading, error, or editor UI
  if (isLoading) return <p>Loading...</p>; // Display loading state
  if (error) return <p>{error}</p>; // Display error message if there's an issue

  return (
    <div className="edit-file">
      <h2>Edit File</h2>
      <Editor
        editorState={editorState}
        onChange={handleEditorChange}
        placeholder="Start editing your document here..."
      />
      <div className="actions">
        <button onClick={saveFileContent} disabled={isLoading}>Save</button>
        <button onClick={() => navigate("/dashboard")} disabled={isLoading}>Cancel</button>
      </div>
    </div>
  );
};

export default EditFile;
