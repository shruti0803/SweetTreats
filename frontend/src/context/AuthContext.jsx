import { createContext, useState, useEffect } from "react";
import axios from "axios";

export const AuthContext = createContext();

export default function AuthProvider({ children }) {
  const [user, setUser] = useState(null);  
  const [token, setToken] = useState(localStorage.getItem("token") || null);

  // Store token on change
  useEffect(() => {
    if (token) localStorage.setItem("token", token);
    else localStorage.removeItem("token");
  }, [token]);

  // -----------------------------
  // USER REGISTER
  // -----------------------------
  const registerUser = async (data) => {
    const res = await axios.post("http://localhost:5000/api/user/register", data);
    setUser(res.data.user);
    setToken(res.data.token);
    return res.data;
  };

  // -----------------------------
  // USER LOGIN
  // -----------------------------
  const loginUser = async (data) => {
    const res = await axios.post("http://localhost:5000/api/user/login", data);
    setUser(res.data.user);
    setToken(res.data.token);
    return res.data;
  };

  // -----------------------------
  // ADMIN LOGIN
  // -----------------------------
  const loginAdmin = async (data) => {
    const res = await axios.post("http://localhost:5000/api/admin/login", data);
    setUser({ ...res.data.admin, role: "admin" });
    setToken(res.data.token);
    return res.data;
  };

  const logout = () => {
    setUser(null);
    setToken(null);
  };

  return (
    <AuthContext.Provider
      value={{ user, token, registerUser, loginUser, loginAdmin, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
}
