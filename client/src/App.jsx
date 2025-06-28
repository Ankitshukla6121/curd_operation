import React, { useEffect, useState } from 'react';
import axios from 'axios';

const App = () => {
  const [items, setItems] = useState([]);
  const [form, setForm] = useState({ name: '', description: '' });

  useEffect(() => {
    axios.get('http://localhost:8080/items').then((res) => setItems(res.data));
  }, []);

  const createItem = () => {
    axios.post('http://localhost:8080/item', form).then((res) => {
      setItems([...items, res.data]);
      setForm({ name: '', description: '' });
    });
  };

  const updateItem = (id) => {
  const updatedName = prompt('Enter the new name:');

  if (!updatedName) return alert("Name cannot be empty!");

  axios
    .put(`http://localhost:8080/item/${id}`, { name: updatedName })
    .then((res) => {
      setItems(items.map((item) => (item._id === id ? res.data : item)));
    })
    .catch((err) => console.error("Update failed", err));
};

  const deleteItem = (id) => {
    axios.delete(`http://localhost:8080/item/${id}`).then(() => {
      setItems(items.filter((item) => item._id !== id));
    });
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-3xl font-bold text-center mb-6 text-indigo-600">🔧 CRUD App</h1>

      <div className="flex flex-col sm:flex-row justify-center items-center gap-4 mb-6">
        <input
          type="text"
          placeholder="Name"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          className="px-4 py-2 border rounded-md w-full sm:w-64 shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-400"
        />
        <input
          type="text"
          placeholder="Description"
          value={form.description}
          onChange={(e) => setForm({ ...form, description: e.target.value })}
          className="px-4 py-2 border rounded-md w-full sm:w-64 shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-400"
        />
        <button
          onClick={createItem}
          className="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold px-4 py-2 rounded-md"
        >
          ➕ Add Item
        </button>
      </div>

      <ul className="max-w-3xl mx-auto space-y-4">
        {items.map((item) => (
          <li
            key={item._id}
            className="flex justify-between items-center bg-white shadow-md p-4 rounded-lg"
          >
            <div>
              <p className="font-semibold text-lg">{item.name}</p>
              <p className="text-gray-600">{item.description}</p>
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => updateItem(item._id)}
                className="bg-yellow-400 hover:bg-yellow-500 text-white px-3 py-1 rounded-md"
              >
                ✏️ Edit
              </button>
              <button
                onClick={() => deleteItem(item._id)}
                className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded-md"
              >
                ❌ Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default App;
