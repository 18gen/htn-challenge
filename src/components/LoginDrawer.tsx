"use client";
import React, { useState, useEffect, useRef } from "react";
import { useAuth } from "../context/AuthContext";
import "@/styles/globals.css";

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
    <div className="relative z-40">
      <button
        className="px-3 mr-3 py-1 border-1 border-gray-600 rounded-xl hover:bg-[#e0dcd1] transition-colors duration-300 flex items-center gap-1"
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
          onClick={() => setIsOpen(false)}
          className="absolute top-5 right-4 p-2 rounded-full hover:bg-[#d6d2c8] transition-colors duration-200"
        >
          <img src="/close.svg" alt="close popup" className="w-4 h-4" />
        </button>

        {isAuthenticated ? (
          <div>
            <h4
              id="drawer-title"
              className="text-xl font-semibold mb-4 text-gray-900"
            >
              Welcome, Hacker!
            </h4>
            <button
              className="w-full text-white bg-red-500 hover:bg-red-600 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 transition-colors duration-200"
              onClick={logout}
            >
              Logout
            </button>
          </div>
        ) : (
          <div>
            <h4
              id="drawer-title"
              className="text-xl font-semibold mb-4 text-gray-900"
            >
              Login
            </h4>
            <input
              type="text"
              className="w-full p-2 mb-4 border border-gray-300 rounded-lg"
              placeholder="Username: hacker"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              aria-label="Username"
            />
            <input
              type="password"
              className="w-full p-2 mb-4 border border-gray-300 rounded-lg"
              placeholder="Password: htn2025"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              aria-label="Password"
            />
            <button
              className="w-full text-white bg-green-500 hover:bg-green-600 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 transition-colors duration-200"
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
