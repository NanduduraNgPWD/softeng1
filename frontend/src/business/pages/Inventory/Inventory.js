import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Dashboard from '../Dashboard/Dashboard';
import {Pencil, Trash2, CirclePlus} from 'lucide-react'
import './Inventory.css';
import { Link } from 'react-router-dom';

const Inventory = () => {
  const [data, setData] = useState([]);
  
  // Placeholder owner_id until login functionality is implemented
  const placeholderOwnerId = 8;

  useEffect(() => {
    axios
      .get('http://localhost:3000/motorcycles')
      .then((res) => {
        const fetchedMotorcycles = res.data || [];
        // Filter motorcycles based on the placeholder owner_id
        const ownerMotorcycles = fetchedMotorcycles.filter(
          (motorcycle) => motorcycle.owner_id === placeholderOwnerId
        );
        setData(ownerMotorcycles);
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
    console.log("Edit motorcycle with ID:", id);
    // Add your edit logic here (e.g., open an edit form)
  };

  return (
    <>
      <Dashboard />
      <div className="booking-body my-4 mx-auto">
      {/* <span className="hover-text">Add motorcycle</span> */}
        <div id="inventory"className='my-12'>Your Inventory <div className="add-motorcycle"> <Link to="/business/AddVehicle">  <CirclePlus /> </Link></div></div>
        <table className="w-full border-collapse border border-gray-300 inventory-table">
          <thead>
            <tr className="bg-gray-200">
              <th className="border border-gray-300 px-4 py-2">Motorcycle ID</th>
              <th className="border border-gray-300 px-4 py-2">Brand</th>
              <th className="border border-gray-300 px-4 py-2">Model</th>
              <th className="border border-gray-300 px-4 py-2">Year</th>
              <th className="border border-gray-300 px-4 py-2">Color</th>
              <th className="border border-gray-300 px-4 py-2">Price per Day</th>
              <th className="border border-gray-300 px-4 py-2">Available</th>
              <th className="border border-gray-300 px-4 py-2">Actions</th>
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
                <td className="border border-gray-300 px-4 py-2 flex justify-evenly ">
                  <div className='cursor-pointer'
                    onClick={() => handleEdit(motorcycle.motorcycle_id)}
                   
                  >
              <Pencil />
                  </div>
                  <div className='cursor-pointer'
                    onClick={() => handleDelete(motorcycle.motorcycle_id)}
                  
                  >
               <Trash2 />
                  </div>
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
