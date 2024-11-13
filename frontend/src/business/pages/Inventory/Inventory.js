import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Dashboard from '../Dashboard/Dashboard';

const Inventory = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    axios
      .get('http://localhost:3000/motorcycles')
      .then((res) => {
        console.log(res);
        setData(res.data || []);
      })
      .catch((err) => console.error("Error fetching motorcycles:", err));
  }, []);

  // Handler for deleting a motorcycle
  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this motorcycle?")) {
      axios
        .delete(`http://localhost:3000/motorcycles/${id}`)
        .then(() => {
          setData((prevData) => prevData.filter((motorcycle) => motorcycle.motorcycle_id !== id));
          console.log("Motorcycle deleted successfully");
        })
        .catch((err) => console.error("Error deleting motorcycle:", err));
    }
  };

  // Handler for editing a motorcycle
  const handleEdit = (id) => {
    // Redirect to an edit page or show an edit form modal
    console.log("Edit motorcycle with ID:", id);
    // You might want to use a state or a modal to open an edit form here
  };

  return (
    <>
      <Dashboard />
      <div className="w-full p-4">
        <table className="w-full border-collapse border border-gray-300">
          <thead>
            <tr className="bg-gray-200">
              <th className="border border-gray-300 px-4 py-2">Motorcycle ID</th>
              <th className="border border-gray-300 px-4 py-2">Brand</th>
              <th className="border border-gray-300 px-4 py-2">Model</th>
              <th className="border border-gray-300 px-4 py-2">Year</th>
              <th className="border border-gray-300 px-4 py-2">Color</th>
              <th className="border border-gray-300 px-4 py-2">Price per Day</th>
              <th className="border border-gray-300 px-4 py-2">Available</th>
              <th className="border border-gray-300 px-4 py-2">Actions</th> {/* New Actions Column */}
            </tr>
          </thead>
          <tbody>
            {data.map((motorcycle) => (
              <tr key={motorcycle.motorcycle_id} className="hover:bg-gray-100">
                <td className="border border-gray-300 px-4 py-2">{motorcycle.motorcycle_id}</td>
                <td className="border border-gray-300 px-4 py-2">{motorcycle.brand}</td>
                <td className="border border-gray-300 px-4 py-2">{motorcycle.model}</td>
                <td className="border border-gray-300 px-4 py-2">{motorcycle.year}</td>
                <td className="border border-gray-300 px-4 py-2">{motorcycle.color}</td>
                <td className="border border-gray-300 px-4 py-2">{motorcycle.price_per_day}</td>
                <td className="border border-gray-300 px-4 py-2">
                  {motorcycle.is_available ? 'Yes' : 'No'}
                </td>
                <td className=" px-4 py-2 flex w-48">
                  <button
                    onClick={() => handleEdit(motorcycle.motorcycle_id)}
                    className="bg-blue-500 text-white px-2 py-1 mr-2 rounded"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(motorcycle.motorcycle_id)}
                    className="bg-red-500 text-white px-2 py-1 rounded"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default Inventory;
