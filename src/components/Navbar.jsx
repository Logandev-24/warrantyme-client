import React from "react";
import { IoPowerSharp } from "react-icons/io5";

const Navbar = ({ user, onLogout }) => {
  return (
    <nav className="navbar">
      <div className="navbar-left">
        <h2 className="logo">Logan's Text Editor</h2>
      </div>
      <div className="navbar-right">
        {user.profilePic && (
          <img
            src={user.profilePic}
            alt="Profile"
            className="profile-pic"
          />
        )}
        <div className="user-details">
        <p className="user-name">{user.name}</p>
          <span className="user-email">{user.email}</span>{" "}
        
        </div>
        
        <button onClick={onLogout} className="logout-btn">
        <IoPowerSharp className="logout-icon" />  Logout
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
