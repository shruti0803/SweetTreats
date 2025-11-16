import React, { useEffect, useState } from "react";
import axios from "axios";

const API = "http://localhost:5000/api/sweets";

export default function AdminPage() {
  const [sweets, setSweets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);





  const token = localStorage.getItem("adminToken"); // MUST EXIST

  const authHeader = {
    headers: {
      Authorization: `Bearer ${token}`
    }
  };

  // Fetch sweets
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

// Add these fields to your form state
const [form, setForm] = useState({
  name: "",
  price: "",
  category: "",
  quantity: "",
  image: "",       // optional
  description: ""  // optional
});

// Updated handleAddSweet
const handleAddSweet = async () => {
  try {
    await axios.post(
      API,
      {
        name: form.name,
        price: Number(form.price),
        category: form.category,
        quantity: Number(form.quantity),
        image: form.image || "",          // optional
        description: form.description || "" // optional
      },
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("adminToken")}`,
        },
      }
    );

    loadSweets();
    alert("Sweet Added!");
    // Reset form if needed
    setForm({ name: "", price: "", category: "", quantity: "", image: "", description: "" });
  } catch (err) {
    alert("Add failed");
    console.log(err);
  }
};





  const handleUpdateSweet = async (id) => {
    const newPrice = prompt("Enter new price:");
    if (!newPrice) return;

    try {
      await axios.put(`${API}/${id}`, { price: newPrice }, authHeader);
      loadSweets();
      alert("Updated!");
    } catch (err) {
      alert("Update failed");
      console.log(err);
    }
  };

  const handleRestock = async (id) => {
    const amount = prompt("Restock amount:");
    if (!amount) return;

    try {
      await axios.post(`${API}/${id}/restock`, { amount }, authHeader);
      loadSweets();
      alert("Restocked!");
    } catch (err) {
      alert("Restock failed");
    }
  };

  const handleDelete = async (id) => {
    if (!confirm("Delete this sweet?")) return;

    try {
      await axios.delete(`${API}/${id}`, authHeader);
      loadSweets();
      alert("Deleted!");
    } catch (err) {
      alert("Delete failed");
    }
  };

  if (loading) return <p className="text-center mt-20">Loading...</p>;

  return (
    <div className="flex min-h-screen bg-gray-100">

      {/* Sidebar */}
      <div className={`bg-red-600 text-white p-5 transition-all duration-300 ${isSidebarOpen ? "w-60" : "w-16"}`}>
        <button
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          className="mb-5 bg-white text-red-600 px-2 py-1 rounded"
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

        <h1 className="text-3xl font-bold mb-6 text-red-600">Admin Dashboard</h1>

        {/* ADD SWEET FORM */}
        <div className="bg-white p-5 rounded shadow mb-10">
          <h2 className="text-xl font-semibold mb-4">Add New Sweet</h2>
          <div className="grid grid-cols-2 gap-3">
  <input placeholder="Name" value={form.name} onChange={e=>setForm({...form, name:e.target.value})} />
  <input placeholder="Price" value={form.price} onChange={e=>setForm({...form, price:e.target.value})} />
  <input placeholder="Category" value={form.category} onChange={e=>setForm({...form, category:e.target.value})} />
  <input placeholder="Quantity" value={form.quantity} onChange={e=>setForm({...form, quantity:e.target.value})} />
  <input placeholder="Image URL (optional)" value={form.image} onChange={e=>setForm({...form, image:e.target.value})} />
  <input placeholder="Description (optional)" value={form.description} onChange={e=>setForm({...form, description:e.target.value})} />
</div>

          <button onClick={handleAddSweet} className="mt-4 bg-red-600 text-white px-4 py-2 rounded">
            Add Sweet
          </button>
        </div>

        {/* SWEETS TABLE */}
        <div className="bg-white p-6 rounded shadow">
          <h2 className="text-xl font-semibold mb-4">All Sweets</h2>

          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-red-500 text-white">
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
                  <td className="p-3"><img src={s.image} alt="" className="w-14 h-14 rounded" /></td>
                  <td className="p-3">{s.name}</td>
                  <td className="p-3">₹{s.price}</td>
                  <td className="p-3">{s.quantity}</td>

                  <td className="p-3 flex gap-2">
                    <button className="bg-blue-500 text-white px-3 py-1 rounded" onClick={() => handleUpdateSweet(s._id)}>Update</button>
                    <button className="bg-yellow-500 text-white px-3 py-1 rounded" onClick={() => handleRestock(s._id)}>Restock</button>
                    <button className="bg-red-600 text-white px-3 py-1 rounded" onClick={() => handleDelete(s._id)}>Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

        </div>

      </div>
    </div>
  );
}
