import React, { useState } from "react";
import {
  HomeIcon,
  ShoppingCartIcon,
  UserIcon,
} from "@heroicons/react/24/outline";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";


export default function Navbar() {
  const [roleModal, setRoleModal] = useState(false);
  const [userModal, setUserModal] = useState(false);
  const [adminModal, setAdminModal] = useState(false);
const [authMode, setAuthMode] = useState("login"); 
// "login" or "register"





const { registerUser, loginUser, loginAdmin } = useContext(AuthContext);

const [form, setForm] = useState({
  name: "",
  email: "",
  password: "",
  confirmPassword: "",
});
  
  const openUserModal = () => {
    setRoleModal(false);
    setUserModal(true);
  };

  const openAdminModal = () => {
    setRoleModal(false);
    setAdminModal(true);
  };

  const closeAll = () => {
    setRoleModal(false);
    setUserModal(false);
    setAdminModal(false);
  };

  return (
    <>
      {/* NAVBAR */}
      <nav className="bg-white shadow-md fixed w-full z-50">
        <div className="max-w-7xl mx-auto px-2 py-4 flex justify-between items-center">
          <div className="text-2xl font-bold text-pink-600">SweetTreats</div>

          <div className="hidden md:flex space-x-6 items-center">
            <Link
              to="/"
              className="flex items-center space-x-1 hover:text-pink-500 transition-colors"
            >
              <HomeIcon className="w-6 h-6" />
              <span>Home</span>
            </Link>

            <Link
              to="/shop"
              className="flex items-center space-x-1 hover:text-pink-500 transition-colors"
            >
              <ShoppingCartIcon className="w-6 h-6" />
              <span>Shop</span>
            </Link>

            {/* LOGIN → opens role selection */}
            <button
              onClick={() => setRoleModal(true)}
              className="flex items-center space-x-1 hover:text-pink-500 transition-colors"
            >
              <UserIcon className="w-6 h-6" />
              <span>Login</span>
            </button>
          </div>

          <div className="md:hidden">
            <button>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 text-gray-700"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </button>
          </div>
        </div>
      </nav>

      {/* ---------------------------------------------------------------- */}
      {/* ROLE SELECTION MODAL */}
      {/* ---------------------------------------------------------------- */}
      {roleModal && (
        <ModalBox>
          <h2 className="text-xl font-semibold">Login as</h2>

          <button
            onClick={openUserModal}
            className="w-full py-2 bg-pink-500 text-white rounded-lg hover:bg-pink-600"
          >
            User
          </button>

          <button
            onClick={openAdminModal}
            className="w-full py-2 bg-purple-500 text-white rounded-lg hover:bg-purple-600"
          >
            Admin
          </button>

          <button
            onClick={closeAll}
            className="text-gray-600 text-sm hover:text-gray-800"
          >
            Cancel
          </button>
        </ModalBox>
      )}

      {/* ---------------------------------------------------------------- */}
      {/* USER LOGIN & REGISTER MODAL */}
      {/* ---------------------------------------------------------------- */}
     {/* ---------------------------------------------------------------- */}
{/* USER LOGIN / REGISTER MODAL */}
{/* ---------------------------------------------------------------- */}
{userModal && (
  <div className="fixed inset-0 bg-black/40 flex justify-center items-center z-50">
    <div className="bg-white rounded-xl w-[700px] shadow-xl flex overflow-hidden">

      {/* LEFT SIDE IMAGE */}
      <div className="w-1/2">
        <img
          src="https://images.unsplash.com/photo-1483691278019-cb7253bee49f"
          alt="sweet"
          className="w-full h-full object-cover"
        />
      </div>

      {/* RIGHT SIDE CONTENT */}
      <div className="w-1/2 p-6">

        {/* LOGIN / REGISTER TAB SELECTOR */}
        <div className="flex justify-around mb-5">
          <button
            className={`py-2 px-4 border-b-2 ${
              authMode === "login"
                ? "border-pink-500 text-pink-600 font-semibold"
                : "border-transparent text-gray-500"
            }`}
            onClick={() => setAuthMode("login")}
          >
            Login
          </button>

          <button
            className={`py-2 px-4 border-b-2 ${
              authMode === "register"
                ? "border-pink-500 text-pink-600 font-semibold"
                : "border-transparent text-gray-500"
            }`}
            onClick={() => setAuthMode("register")}
          >
            Register
          </button>
        </div>

        {/* LOGIN FORM */}
        {authMode === "login" && (
          <div>
            <h2 className="text-xl font-semibold mb-3 text-center">User Login</h2>

            <input
              type="email"
              placeholder="Email"
              className="w-full border p-2 rounded mb-3"
            />
            <input
              type="password"
              placeholder="Password"
              className="w-full border p-2 rounded mb-3"
            />

            <button className="w-full bg-green-500 text-white py-2 rounded-lg hover:bg-green-600">
              Login
            </button>
          </div>
        )}

        {/* REGISTER FORM */}
        {authMode === "register" && (
          <div>
            <h2 className="text-xl font-semibold mb-3 text-center">Register User</h2>

            <input
              type="text"
              placeholder="Name"
              className="w-full border p-2 rounded mb-3"
            />

            <input
              type="email"
              placeholder="Email"
              className="w-full border p-2 rounded mb-3"
            />

            <input
              type="password"
              placeholder="Password"
              className="w-full border p-2 rounded mb-3"
            />

            <input
              type="password"
              placeholder="Confirm Password"
              className="w-full border p-2 rounded mb-3"
            />

            <button className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600">
              Register
            </button>
          </div>
        )}

        {/* CLOSE BUTTON */}
        <button
          onClick={() => setUserModal(false)}
          className="block mx-auto mt-4 text-sm text-gray-600 hover:text-gray-800"
        >
          Close
        </button>
      </div>
    </div>
  </div>
)}


      {/* ---------------------------------------------------------------- */}
      {/* ADMIN LOGIN MODAL */}
      {/* ---------------------------------------------------------------- */}
      {adminModal && (
        <ModalBox>
          <h2 className="text-xl font-semibold mb-3">Admin Login</h2>

          <input
            type="email"
            placeholder="Admin Email"
            className="w-full border p-2 rounded mb-3"
          />
          <input
            type="password"
            placeholder="Password"
            className="w-full border p-2 rounded mb-3"
          />

          <button className="w-full bg-purple-600 text-white py-2 rounded-lg hover:bg-purple-700">
            Login
          </button>

          <button
            onClick={closeAll}
            className="block mx-auto mt-4 text-sm text-gray-600 hover:text-gray-800"
          >
            Close
          </button>
        </ModalBox>
      )}
    </>
  );
}

/* -------------------------------------------------------------------- */
/* REUSABLE MODAL BOX COMPONENT */
/* -------------------------------------------------------------------- */
function ModalBox({ children }) {
  return (
    <div className="fixed inset-0 bg-black/40 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded-xl w-96 shadow-xl text-center space-y-4">
        {children}
      </div>
    </div>
  );
}
