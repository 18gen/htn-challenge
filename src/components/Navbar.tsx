import React from "react";
import LoginDrawer from "./LoginDrawer";
import "@/styles/globals.css";

const Navbar = () => {
  return (
    <nav className="navbar navbar-expand-lg border">
      <div className="container-fluid">
        <a className="navbar-brand fw-bold flex items-center" href="#">
          <img src="/global.svg" alt="Event" className="w-5 h-5 mr-3" />
          Hackathon Global inc.™
        </a>
        <LoginDrawer />
      </div>
    </nav>
  );
};

export default Navbar;
