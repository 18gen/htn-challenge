'use client';
import React, { useState, useEffect, useRef } from 'react';
import { useAuth } from '../context/AuthContext';

const LoginDrawer = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const { login, isAuthenticated, logout } = useAuth();
  const drawerRef = useRef<HTMLDivElement>(null);

  const handleLogin = () => {
    if (login(username, password)) {
      setIsOpen(false); // Close drawer on successful login
    } else {
      alert('Invalid credentials');
    }
  };

  // Close drawer when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (drawerRef.current && !drawerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className='z-auto'>
      <button className="btn btn-primary" onClick={() => setIsOpen(!isOpen)}>
        {isAuthenticated ? 'Profile' : 'Login'}
      </button>
      { isOpen &&
      <div
      ref={drawerRef}
      className={`position-fixed top-0 end-0 h-100 bg-light p-4 shadow-lg`}
      style={{ width: '300px', transition: 'transform 0.3s ease', zIndex: 1001 }}
    >
      {isAuthenticated ? (
        <div>
          <h4>Welcome, Hacker!</h4>
          <button className="btn btn-danger" onClick={logout}>
            Logout
          </button>
        </div>
      ) : (
        <div>
          <h4>Login</h4>
          <input
            type="text"
            className="form-control mb-2"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <input
            type="password"
            className="form-control mb-2"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button className="btn btn-success w-100" onClick={handleLogin}>
            Login
          </button>
        </div>
      )}
    </div>
      }
      
    </div>
  );
};

export default LoginDrawer;