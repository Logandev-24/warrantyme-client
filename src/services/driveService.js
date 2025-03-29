import axios from "axios";

// Get the backend URL from environment variables
const API_URL = import.meta.env.VITE_BACKEND_URL;

// Create an Axios instance
const api = axios.create({
  baseURL: `${API_URL}/drive`,
  headers: {
    "Content-Type": "application/json",
  },
});

// Helper function for handling authorization
const setAuthHeader = (token) => {
  api.defaults.headers["Authorization"] = `Bearer ${token}`;
};

// API Services

// Create Google Document
export const createGoogleDoc = async (data, token) => {
  setAuthHeader(token);
  try {
    const response = await api.post("/create-file", data);
    return response.data;
  } catch (error) {
    console.error("Error creating Google Doc", error);
    throw error;
  }
};

// Fetch List of Files in Folder
export const listFilesInFolder = async (token) => {
  setAuthHeader(token);
  try {
    const response = await api.get("/list-files");
    return response.data;
  } catch (error) {
    console.error("Error fetching files", error);
    throw error;
  }
};

// Fetch Google Doc Content
export const fetchGoogleDocContent = async (fileId, token) => {
  setAuthHeader(token);
  try {
    const response = await api.get(`/fetch-file-content/${fileId}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching Google Doc content", error);
    throw error;
  }
};

// Update Google Doc Content
export const updateGoogleDocContent = async (fileId, content, token) => {
  setAuthHeader(token);
  try {
    const response = await api.patch(`/update-file-content/${fileId}`, { content });
    return response.data;
  } catch (error) {
    console.error("Error updating Google Doc content", error);
    throw error;
  }
};

// Share Google Doc
export const shareGoogleDoc = async (fileId, email, role, token) => {
  setAuthHeader(token);
  try {
    const response = await api.post(`/share-file/${fileId}`, { email, role });
    return response.data;
  } catch (error) {
    console.error("Error sharing Google Doc", error);
    throw error;
  }
};

// Delete Google Doc
export const deleteGoogleDoc = async (fileId, token) => {
  setAuthHeader(token);
  try {
    const response = await api.delete(`/delete-file/${fileId}`);
    return response.data;
  } catch (error) {
    console.error("Error deleting Google Doc", error);
    throw error;
  }
};

// Generate Shareable Link
export const generateShareableLink = async (fileId, permissionType, token) => {
  setAuthHeader(token);
  try {
    const response = await api.post(`/generate-shareable-link/${fileId}`, { permissionType });
    return response.data;
  } catch (error) {
    console.error("Error generating shareable link", error);
    throw error;
  }
};
