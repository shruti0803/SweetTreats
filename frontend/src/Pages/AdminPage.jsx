import React, { useEffect, useState } from "react";
import { PencilIcon, PlusCircleIcon, TrashIcon } from "@heroicons/react/24/outline";
import axios from "axios";

const API = "http://localhost:5000/api/sweets";

export default function AdminPage() {
  const [sweets, setSweets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const [modalOpen, setModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState(""); // "update" | "restock" | "add"
  const [selectedSweet, setSelectedSweet] = useState(null);
  const [form, setForm] = useState({
    name: "",
    price: "",
    category: "",
    quantity: "",
    image: "",
    description: "",
  });

  const token = localStorage.getItem("adminToken");
  const authHeader = { headers: { Authorization: `Bearer ${token}` } };

  const loadSweets = async () => {
    try {
      const res = await axios.get(`${API}/getAllsweets`);
      setSweets(res.data.sweets || res.data);
    } catch (err) {
      console.error("Failed to load sweets", err);
    }
    setLoading(false);
  };

  useEffect(() => {
    loadSweets();
  }, []);

  const handleAddSweet = async () => {
    try {
      await axios.post(
        API,
        {
          name: form.name,
          price: Number(form.price),
          category: form.category,
          quantity: Number(form.quantity),
          image: form.image || "",
          description: form.description || "",
        },
        authHeader
      );
      loadSweets();
      setForm({ name: "", price: "", category: "", quantity: "", image: "", description: "" });
      setModalOpen(false);
    } catch (err) {
      alert("Add failed");
      console.log(err);
    }
  };

  const handleUpdateSweet = async () => {
    if (!selectedSweet) return;
    try {
      await axios.put(`${API}/${selectedSweet._id}`, { price: form.price }, authHeader);
      loadSweets();
      setModalOpen(false);
    } catch (err) {
      alert("Update failed");
      console.log(err);
    }
  };

const handleRestock = async () => {
  if (!selectedSweet) return;

  if (!form.quantity || isNaN(Number(form.quantity))) {
    alert("Enter a valid quantity");
    return;
  }

  try {
    const res = await axios.post(
      `${API}/${selectedSweet._id}/restock`,
      { amount: Number(form.quantity) },
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json", // <- important
        },
      }
    );

    console.log(res.data); // see backend response
    loadSweets(); // refresh table
    setModalOpen(false);
  } catch (err) {
    console.log(err.response?.data || err.message);
    alert("Restock failed");
  }
};



  const handleDelete = async (sweet) => {
    setSelectedSweet(sweet);
    setModalMode("delete");
    setModalOpen(true);
  };

  const confirmDelete = async () => {
    try {
      await axios.delete(`${API}/${selectedSweet._id}`, authHeader);
      loadSweets();
      setModalOpen(false);
    } catch (err) {
      alert("Delete failed");
    }
  };

  if (loading) return <p className="text-center mt-20">Loading...</p>;

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <div
        className={`bg-gradient-to-br from-red-900 to-red-800 text-white p-5 transition-all duration-300 ${
          isSidebarOpen ? "w-60" : "w-16"
        }`}
      >
        <button
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          className="mb-5 bg-white text-red-900 px-2 py-1 rounded"
        >
          {isSidebarOpen ? "<" : ">"}
        </button>

        {isSidebarOpen && (
          <div>
            <h2 className="text-xl font-bold mb-4">Admin Menu</h2>
            <ul className="space-y-3">
              <li className="cursor-pointer hover:text-gray-300">Dashboard</li>
              <li className="cursor-pointer hover:text-gray-300">Manage Sweets</li>
              <li className="cursor-pointer hover:text-gray-300">Orders</li>
              <li className="cursor-pointer hover:text-gray-300">Logout</li>
            </ul>
          </div>
        )}
      </div>

      {/* Main content */}
      <div className="flex-grow p-10">
        <h1 className="text-3xl font-bold mb-6 text-red-900">Admin Dashboard</h1>

        {/* ADD SWEET FORM */}
        <div className="bg-white p-6 rounded-lg shadow mb-10">
          <h2 className="text-xl font-semibold mb-4">Add New Sweet</h2>
          <div className="grid grid-cols-2 gap-4">
            <input
              placeholder="Name"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              className="border p-2 rounded"
            />
            <input
              placeholder="Price"
              value={form.price}
              onChange={(e) => setForm({ ...form, price: e.target.value })}
              className="border p-2 rounded"
            />
            <input
              placeholder="Category"
              value={form.category}
              onChange={(e) => setForm({ ...form, category: e.target.value })}
              className="border p-2 rounded"
            />
            <input
              placeholder="Quantity"
              value={form.quantity}
              onChange={(e) => setForm({ ...form, quantity: e.target.value })}
              className="border p-2 rounded"
            />
            <input
              placeholder="Image URL (optional)"
              value={form.image}
              onChange={(e) => setForm({ ...form, image: e.target.value })}
              className="border p-2 rounded"
            />
            <input
              placeholder="Description (optional)"
              value={form.description}
              onChange={(e) => setForm({ ...form, description: e.target.value })}
              className="border p-2 rounded"
            />
          </div>
          <button
            onClick={() => {
              setModalMode("add");
              setModalOpen(true);
            }}
            className="mt-4 bg-red-900 text-white px-4 py-2 rounded hover:bg-red-700"
          >
            Add Sweet
          </button>
        </div>

        {/* SWEETS TABLE */}
        <div className="bg-white p-6 rounded shadow">
          <h2 className="text-xl font-semibold mb-4">All Sweets</h2>
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-red-900 text-white">
                <th className="p-3 text-left">Image</th>
                <th className="p-3 text-left">Name</th>
                <th className="p-3 text-left">Price</th>
                <th className="p-3 text-left">Stock</th>
                <th className="p-3 text-left">Actions</th>
              </tr>
            </thead>
            <tbody>
              {sweets.map((s) => (
                <tr key={s._id} className="border-b">
                  <td className="p-3">
                    <img src={s.image} alt="" className="w-14 h-14 rounded" />
                  </td>
                  <td className="p-3">{s.name}</td>
                  <td className="p-3">₹{s.price}</td>
                  <td className="p-3">{s.quantity}</td>
                  <td className="p-3 flex gap-2">
  <button
    className="text-blue-600 hover:text-blue-800"
    onClick={() => {
      setSelectedSweet(s);
      setForm({ ...form, price: s.price });
      setModalMode("update");
      setModalOpen(true);
    }}
  >
    <PencilIcon className="w-6 h-6" />
  </button>

  <button
    className="text-yellow-500 hover:text-yellow-700"
    onClick={() => {
      setSelectedSweet(s);
      setForm({ ...form, quantity: "" });
      setModalMode("restock");
      setModalOpen(true);
    }}
  >
    <PlusCircleIcon className="w-6 h-6" />
  </button>

  <button
    className="text-red-600 hover:text-red-800"
    onClick={() => handleDelete(s)}
  >
    <TrashIcon className="w-6 h-6" />
  </button>
</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* MODAL */}
      {modalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96">
            <h2 className="text-xl font-semibold mb-4 text-red-600">
              {modalMode === "add"
                ? "Add Sweet"
                : modalMode === "update"
                ? "Update Price"
                : modalMode === "restock"
                ? "Restock"
                : "Confirm Delete"}
            </h2>

            {(modalMode === "add" || modalMode === "update" || modalMode === "restock") && (
              <div className="flex flex-col gap-3">
                {(modalMode === "add" || modalMode === "update") && (
                  <input
                    placeholder="Price"
                    type="number"
                    value={form.price}
                    onChange={(e) => setForm({ ...form, price: e.target.value })}
                    className="border p-2 rounded"
                  />
                )}
                {(modalMode === "add" || modalMode === "restock") && (
                  <input
                    placeholder="Quantity"
                    type="number"
                    value={form.quantity}
                    onChange={(e) => setForm({ ...form, quantity: e.target.value })}
                    className="border p-2 rounded"
                  />
                )}
                {modalMode === "add" && (
                  <>
                    <input
                      placeholder="Name"
                      value={form.name}
                      onChange={(e) => setForm({ ...form, name: e.target.value })}
                      className="border p-2 rounded"
                    />
                    <input
                      placeholder="Category"
                      value={form.category}
                      onChange={(e) => setForm({ ...form, category: e.target.value })}
                      className="border p-2 rounded"
                    />
                    <input
                      placeholder="Image URL (optional)"
                      value={form.image}
                      onChange={(e) => setForm({ ...form, image: e.target.value })}
                      className="border p-2 rounded"
                    />
                    <input
                      placeholder="Description (optional)"
                      value={form.description}
                      onChange={(e) => setForm({ ...form, description: e.target.value })}
                      className="border p-2 rounded"
                    />
                  </>
                )}
              </div>
            )}

            {modalMode === "delete" && <p>Are you sure you want to delete {selectedSweet.name}?</p>}

            <div className="mt-4 flex justify-end gap-3">
              <button
                className="px-4 py-2 rounded border"
                onClick={() => setModalOpen(false)}
              >
                Cancel
              </button>
              {modalMode === "add" && (
                <button
                  className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
                  onClick={handleAddSweet}
                >
                  Add
                </button>
              )}
              {modalMode === "update" && (
                <button
                  className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                  onClick={handleUpdateSweet}
                >
                  Update
                </button>
              )}
              {modalMode === "restock" && (
                <button
                  className="px-4 py-2 bg-yellow-500 text-white rounded hover:bg-yellow-600"
                  onClick={handleRestock}
                >
                  Restock
                </button>
              )}
              {modalMode === "delete" && (
                <button
                  className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
                  onClick={confirmDelete}
                >
                  Delete
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
