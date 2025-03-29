import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Login from "../pages/Login";
import Dashboard from "../pages/Dashboard";
import NotFound from "../pages/NotFound";
import AuthProvider from "../context/AuthContext"; // Assuming this context handles user authentication
import DocumentEditor from "../pages/DocumentEditor";

// Defining the routes
const router = createBrowserRouter([
  { path: "/", element: <Login /> },  // Login page route
  { path: "/dashboard", element: <Dashboard /> },  // Dashboard page route
  { path: "/document/:fileId", element: <DocumentEditor /> }, // Route for editing an existing document
  { path: "/create-document", element: <DocumentEditor /> }, // Route for creating a new document
  { path: "*", element: <NotFound /> },  // Route for not found (404)
]);

// Main Router Component
const AppRouter = () => {
  return (
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  );
};

export default AppRouter;
