"use client";
import React, { useState, useEffect, useRef } from "react";
import { useAuth } from "../context/AuthContext";

const LoginDrawer = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const { login, isAuthenticated, logout } = useAuth();
  const drawerRef = useRef<HTMLDivElement>(null);

  const handleLogin = () => {
    if (login(username, password)) {
      setIsOpen(false); // Close drawer on successful login
    } else {
      alert("Invalid credentials");
    }
  };

  // Close drawer when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        drawerRef.current &&
        !drawerRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="relative z-50">
      <button
        className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 transition-colors duration-200"
        onClick={() => setIsOpen(!isOpen)}
        aria-label={isAuthenticated ? "Profile" : "Login"}
      >
        {isAuthenticated ? "Profile" : "Login"}
      </button>

      {/* Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 transition-opacity duration-300 ease-in-out"
          onClick={() => setIsOpen(false)}
          aria-hidden="true"
        ></div>
      )}

      {/* Drawer */}
      <div
        ref={drawerRef}
        className={`fixed top-0 right-0 h-full w-80 bg-[#FBF6EA] shadow-2xl transform transition-transform duration-300 ease-in-out p-6 ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
        aria-modal="true"
        role="dialog"
        aria-labelledby="drawer-title"
      >
        <button
          className="absolute top-4 right-4 text-gray-600 hover:text-gray-900 transition-colors duration-200"
          onClick={() => setIsOpen(false)}
          aria-label="Close drawer"
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M6 18L18 6M6 6l12 12"
            ></path>
          </svg>
        </button>

        {isAuthenticated ? (
          <div className="mt-10">
            <h4
              id="drawer-title"
              className="text-xl font-semibold mb-4 text-gray-900"
            >
              Welcome, Hacker!
            </h4>
            <button
              className="w-full text-white bg-red-600 hover:bg-red-700 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 transition-colors duration-200"
              onClick={logout}
            >
              Logout
            </button>
          </div>
        ) : (
          <div className="mt-10">
            <h4
              id="drawer-title"
              className="text-xl font-semibold mb-4 text-gray-900"
            >
              Login
            </h4>
            <input
              type="text"
              className="w-full p-2 mb-4 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              aria-label="Username"
            />
            <input
              type="password"
              className="w-full p-2 mb-4 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              aria-label="Password"
            />
            <button
              className="w-full text-white bg-green-600 hover:bg-green-700 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 transition-colors duration-200"
              onClick={handleLogin}
            >
              Login
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default LoginDrawer;
