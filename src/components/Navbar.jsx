import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { getUser, logout } from "../services/authorize";

const Navbar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    logout(() => {
      navigate('/login');  // Redirect to the login page after logout
    });
  };

  return (
    <nav className="navbar bg-orange-500 py-4 flex justify-center">
      <div className="container flex justify-around text-2xl font-bold">
        <div className="navbar-brand">
          <NavLink to="/" className="navbar-item">
            Your Logo
          </NavLink>
        </div>
        <div className="navbar-menu">
          <div className="navbar-start gap-6 flex">
            <NavLink to="/" className="navbar-item">
              Home
            </NavLink>
          
            {!getUser() && (
              <NavLink to="/login" className="navbar-item">
                Login
              </NavLink>
            )}
            {getUser() && (
              <NavLink to="/create" className="navbar-item">
              CreateBlog
            </NavLink>
            )}
            {getUser() && (
              <button className="navbar-item" onClick={handleLogout}>
                Logout
              </button>
            )}
            {/* Add more links as needed */}
          </div>
          <div className="navbar-end">
            {/* Add any additional elements to the right side of the navbar */}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
