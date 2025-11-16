import { Routes, Route } from "react-router-dom";
import HomePage from "./Pages/HomePage";
import AdminPage from "./Pages/AdminPage";   // ⬅️ your admin dashboard

export default function App() {
  return (
    <>
      <Routes>
        {/* Home */}
        <Route path="/" element={<HomePage />} />

        {/* Admin Dashboard */}
        <Route path="/admin" element={<AdminPage />} />

        {/* You can add more routes later */}
      </Routes>
    </>
  );
}
