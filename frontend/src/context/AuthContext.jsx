import { createContext, useState, useContext } from "react";
import axios from "axios";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [admin, setAdmin] = useState(null);
  const [token, setToken] = useState(null);

  // ---------------- USER REGISTER ----------------
  const registerUser = async ({ name, email, password }) => {
    const { data } = await axios.post(
      "http://localhost:5000/api/user/register",
      { name, email, password }
    );

    setUser(data.user);
    setToken(data.token);
      localStorage.setItem("userToken", data.token);
  localStorage.setItem("userInfo", JSON.stringify(data.user));
  };

  // ---------------- USER LOGIN ----------------
  const loginUser = async ({ email, password }) => {
    const { data } = await axios.post(
      "http://localhost:5000/api/user/login",
      { email, password }
    );

    setUser(data.user);
    setToken(data.token);
      localStorage.setItem("userToken", data.token);
  localStorage.setItem("userInfo", JSON.stringify(data.user));
  };

  // ---------------- ADMIN LOGIN ----------------
  const loginAdmin = async ({ email, password }) => {
  const { data } = await axios.post(
    "http://localhost:5000/api/admin/login",
    { email, password }
  );

  setAdmin(data.admin);
  setToken(data.token);

  // ✅ Store token and admin info in localStorage automatically
  localStorage.setItem("adminToken", data.token);
  localStorage.setItem("adminInfo", JSON.stringify(data.admin));
};


  // ---------------- LOGOUT ----------------
// AuthContext.js (add logout)
const logout = async () => {
  await axios.post("http://localhost:5000/api/user/logout", {}, { withCredentials: true });
  setUser(null); // or setAdmin(null)
};


  return (
    <AuthContext.Provider
      value={{
        user,
        admin,
        token,
        registerUser,
        loginUser,
        loginAdmin,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
