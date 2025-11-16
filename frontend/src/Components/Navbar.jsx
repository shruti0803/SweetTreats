import React, { useState, useContext } from "react";
import { HomeIcon, ShoppingCartIcon, UserIcon } from "@heroicons/react/24/outline";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

export default function Navbar() {
  const { user, admin, loginUser, loginAdmin, registerUser, logout } = useContext(AuthContext);
const navigate = useNavigate();

  const [showDropdown, setShowDropdown] = useState(false);
  const [authMode, setAuthMode] = useState("login");
  const [userModal, setUserModal] = useState(false);
  const [adminModal, setAdminModal] = useState(false);

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const closeAll = () => {
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
            <Link to="/" className="flex items-center space-x-1 hover:text-pink-500">
              <HomeIcon className="w-6 h-6" />
              <span>Home</span>
            </Link>

            <Link to="/shop" className="flex items-center space-x-1 hover:text-pink-500">
              <ShoppingCartIcon className="w-6 h-6" />
              <span>Shop</span>
            </Link>

            {/* USER DROPDOWN */}
            <div className="relative">
              <button
                onClick={() => setShowDropdown(!showDropdown)}
                className="flex items-center space-x-1 hover:text-pink-500"
              >
                <UserIcon className="w-6 h-6" />
                <span>{user ? user.name : admin ? "Admin" : "Login"}</span>
              </button>

              {/* DROPDOWN BOX */}
              {showDropdown && (
                <div className="absolute right-0 mt-2 bg-white shadow-lg rounded-lg w-40 py-2 text-sm border">
                  
                  {!user && !admin ? (
                    <>
                      <button
                        onClick={() => {
                          setUserModal(true);
                          setShowDropdown(false);
                        }}
                        className="w-full px-4 py-2 hover:bg-gray-100 text-left"
                      >
                        User Login
                      </button>

                      <button
                        onClick={() => {
                          setAdminModal(true);
                          setShowDropdown(false);
                        }}
                        className="w-full px-4 py-2 hover:bg-gray-100 text-left"
                      >
                        Admin Login
                      </button>
                    </>
                  ) : (
                    <button
                     onClick={async () => {
  await logout();
  navigate("/");
}}

                      className="w-full px-4 py-2 hover:bg-gray-100 text-left text-red-600"
                    >
                      Logout
                    </button>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </nav>

      {/* -------------------------------- */}
      {/* USER LOGIN/REGISTER MODAL */}
      {/* -------------------------------- */}
      {userModal && (
        <AuthModal
          mode={authMode}
          setMode={setAuthMode}
          form={form}
          handleChange={handleChange}
          onClose={closeAll}
          onLogin={loginUser}
          onRegister={registerUser}
           navigate={navigate} 
        />
      )}

      {/* -------------------------------- */}
      {/* ADMIN LOGIN MODAL */}
      {/* -------------------------------- */}
     {adminModal && (
  <AdminLoginModal
    form={form}
    handleChange={handleChange}
    onLogin={loginAdmin}
    onClose={closeAll}
    navigate={navigate}   // <-- ADD THIS
  />
)}

    </>
  );
}

/* ------------------------------------------------------- */
/* USER AUTH MODAL COMPONENT                               */
/* ------------------------------------------------------- */

function AuthModal({ mode, setMode, form, handleChange, onClose, onLogin, onRegister }) {
  return (
    <div className="fixed inset-0 bg-black/40 flex justify-center items-center z-50">
      <div className="bg-white rounded-xl w-[700px] shadow-xl flex">

        {/* LEFT IMAGE */}
        <div className="w-1/2">
          <img
            src="https://images.unsplash.com/photo-1483691278019-cb7253bee49f"
            className="w-full h-full object-cover"
          />
        </div>

        {/* RIGHT CONTENT */}
        <div className="w-1/2 p-6">

          {/* SWITCH LOGIN / REGISTER */}
          <div className="flex justify-around mb-5">
            <button
              onClick={() => setMode("login")}
              className={mode === "login" ? "text-pink-600 font-bold" : "text-gray-400"}
            >
              Login
            </button>
            <button
              onClick={() => setMode("register")}
              className={mode === "register" ? "text-pink-600 font-bold" : "text-gray-400"}
            >
              Register
            </button>
          </div>

          {/* LOGIN FORM */}
          {mode === "login" && (
            <>
              <input name="email" placeholder="Email" className="input" onChange={handleChange} />
              <input name="password" type="password" placeholder="Password" className="input" onChange={handleChange} />

              <button
                onClick={async () => {
  try {
    await onLogin({ email: form.email, password: form.password });
    navigate("/");
    onClose();
  } catch {
    alert("Login Failed");
  }
}}

                className="btn-primary bg-green-500"
              >
                Login
              </button>
            </>
          )}

          {/* REGISTER FORM */}
          {mode === "register" && (
            <>
              <input name="name" placeholder="Name" className="input" onChange={handleChange} />
              <input name="email" placeholder="Email" className="input" onChange={handleChange} />
              <input name="password" type="password" placeholder="Password" className="input" onChange={handleChange} />
              <input name="confirmPassword" type="password" placeholder="Confirm Password" className="input" onChange={handleChange} />

              <button
              onClick={async () => {
  if (form.password !== form.confirmPassword) return alert("Passwords mismatch");

  await onRegister(form);
  navigate("/");
  onClose();
}}

                className="btn-primary bg-blue-500"
              >
                Register
              </button>
            </>
          )}

          <button onClick={onClose} className="mt-4 text-sm text-gray-600">Close</button>
        </div>
      </div>
    </div>
  );
}

/* ------------------------------------------------------- */
/* ADMIN LOGIN MODAL                                       */
/* ------------------------------------------------------- */

function AdminLoginModal({ form, handleChange, onLogin, onClose, navigate }) {
  return (
    <div className="fixed inset-0 bg-black/40 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded-xl w-96 shadow-xl text-center space-y-4">

        <h2 className="text-xl font-semibold">Admin Login</h2>

        <input name="email" placeholder="Email" className="input" onChange={handleChange} />
        <input name="password" type="password" placeholder="Password" className="input" onChange={handleChange} />

        <button
          onClick={async () => {
            try {
              await onLogin({ email: form.email, password: form.password });
              navigate("/admin");   // <-- ADMIN DASH NAVIGATE
              onClose();            // <-- CLOSE MODAL
            } catch {
              alert("Admin Login Failed");
            }
          }}
          className="btn-primary bg-purple-600"
        >
          Login
        </button>

        <button onClick={onClose} className="text-sm text-gray-600">Close</button>
      </div>
    </div>
  );
}

