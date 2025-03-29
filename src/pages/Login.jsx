import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import axios from "axios";
import { toast } from "react-toastify";

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
    <div>
      <h1>Login with Google</h1>
      <button onClick={handleLogin}>Sign in with Google</button>
    </div>
  );
};

export default Login;
