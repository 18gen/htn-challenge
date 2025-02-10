import React from 'react';
import LoginDrawer from './LoginDrawer';
import '@/app/globals.css';

const Navbar = () => {
  return (
    <nav className="navbar navbar-expand-lg ">
      <div className="container-fluid">
        <a className="navbar-brand fw-bold" href="#">
            Hackathon Global inc.™
        </a>
        <LoginDrawer />
      </div>
    </nav>
  );
};

export default Navbar;