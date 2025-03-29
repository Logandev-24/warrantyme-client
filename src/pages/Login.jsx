import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import axios from "axios";
import { toast } from "react-toastify";

 import documentCover from "../assets/document.jpg";

const Login = () => {
  const navigate = useNavigate();
  const { user, setUser } = useAuth();

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const token = urlParams.get("token");

    console.log("🔍 Extracted Token from URL:", token); // Debugging

    if (token) {
      localStorage.setItem("token", token);
      axios
        .get(`${import.meta.env.VITE_BACKEND_URL}/auth/validate-token`, {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((res) => {
          console.log("✅ Token Validated, User Data:", res.data.user);
          setUser(res.data.user);
          navigate("/dashboard");
        })
        .catch((err) => {
          console.error("❌ Token validation failed:", err);
          toast.error("Invalid token. Please login again.");
          localStorage.removeItem("token");
        });
    }
  }, []);

  console.log("Current User State:", user); // Debugging

  const handleLogin = () => {
    window.location.href = `${import.meta.env.VITE_BACKEND_URL}/auth/google`;
  };

  return (
    <div className="login-container">
      {/* Left Side - App Information */}
      <div className="login-info">
        <img src={documentCover} alt="document image" className="document-image" />
        <h1>Welcome to Logans Document Editor</h1>
        <p>
          Create, edit, and collaborate on documents seamlessly with our online document editor. 
          Share your work, generate links, and save documents securely on Google Drive.
        </p>
      </div>

      {/* Right Side - Login Section */}
      <div className="login-box">
        <h2>Login to Get Started</h2>
        <button onClick={handleLogin} className="login-btn">Sign in with Google</button>
      </div>
    </div>
  );
};

export default Login;
