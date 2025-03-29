import { Link } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

const Navbar = () => {
  const { user } = useAuth();

  return (
    <nav>
      <Link to="/">Home</Link>
      {user && <Link to="/dashboard">Dashboard</Link>}
    </nav>
  );
};

export default Navbar;
