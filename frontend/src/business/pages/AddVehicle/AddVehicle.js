import React, {useState} from 'react'
import axios from 'axios'
import Dashboard from '../Dashboard/Dashboard'
import "./AddVehicle.css";
import {ArrowLeft} from 'lucide-react'
import { Link } from 'react-router-dom';

const AddVehicle = () => {
  const [formData, setFormData] = useState({
    owner_id: "8", 
    brand: "Yamaha",
    model: "",
    year: 2024,
    color: "black", // Ensure color defaults to a valid value
    type: "cruiser",
    transmission: "manual",
    mileage: "",
    vehicle_condition: "new", // Ensure vehicle_condition defaults to a valid value
    price_per_day: "",
    is_available: 1
  });
  
  // Handle form input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };
  
  // Handle form submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:3000/motorcycles", formData, {
        headers: { "Content-Type": "application/json" },
      });
      console.log("Motorcycle added:", response.data);
      alert("Motorcycle added successfully!");
    } catch (error) {
      console.error("Error adding motorcycle:", error);
      alert("Failed to add motorcycle.");
    }
  };
  
  // Return the JSX
  return (
    <>
      <Dashboard />
      <div className="add-form-container">
        <div className="add-title text-center">
          <Link to="/business/Inventory"><ArrowLeft /> </Link>
          <p id="inventory1">Create new listing</p>
        </div>
        <form id="motorcycleForm" onSubmit={handleSubmit}>
          <div className="form-group-add">
            <label htmlFor="brand">Brand</label>
            <select id="brand" name="brand" value={formData.brand} onChange={handleChange} required>
              <option value="Yamaha">Yamaha</option>
              <option value="Honda">Honda</option>
              <option value="Kawasaki">Kawasaki</option>
              <option value="Suzuki">Suzuki</option>
              <option value="KTM">KTM</option>
              <option value="BMW">BMW</option>
            </select>
          </div>
  
          <div className="form-group-add">
            <label htmlFor="model">Model</label>
            <input type="text" id="model" name="model" value={formData.model} onChange={handleChange} required />
          </div>
  
          <div className="form-group-add">
            <label htmlFor="year">Year</label>
            <select id="year" name="year" value={formData.year} onChange={handleChange} required>
              {Array.from({ length: 25 }, (_, i) => (
                <option key={i} value={2024 - i}>{2024 - i}</option>
              ))}
            </select>
          </div>
  
          <div className="form-group-add">
            <label htmlFor="color">Color</label>
            <select id="color" name="color" value={formData.color} onChange={handleChange} required>
              <option value="black">Black</option>
              <option value="white">White</option>
              <option value="red">Red</option>
              <option value="blue">Blue</option>
              <option value="gray">Gray</option>
              <option value="silver">Silver</option>
              <option value="green">Green</option>
              <option value="yellow">Yellow</option>
              <option value="orange">Orange</option>
            </select>
          </div>
  
          <div className="form-group-add">
            <label htmlFor="type">Motorcycle Type</label>
            <select id="type" name="type" value={formData.type} onChange={handleChange} required>
              <option value="cruiser">Cruiser</option>
              <option value="scooter">Scooter</option>
              <option value="sport">Sport</option>
              <option value="touring">Touring</option>
              <option value="dirtbike">Dirt Bike</option>
              <option value="adventure">Adventure</option>
            </select>
          </div>
  
          <div className="form-group-add">
            <label htmlFor="transmission">Transmission Type</label>
            <select id="transmission" name="transmission" value={formData.transmission} onChange={handleChange} required>
              <option value="manual">Manual</option>
              <option value="automatic">Automatic</option>
            </select>
          </div>
  
          <div className="form-group-add">
            <label htmlFor="mileage">Mileage (in km)</label>
            <input type="number" id="mileage" name="mileage" value={formData.mileage} onChange={handleChange} required />
          </div>
  
          <div className="form-group-add">
            <label htmlFor="vehicle_condition">Condition</label>
            <select id="vehicle_condition" name="vehicle_condition" value={formData.vehicle_condition} onChange={handleChange} required>
              <option value="new">New</option>
              <option value="excellent">Excellent</option>
              <option value="good">Good</option>
              <option value="fair">Fair</option>
              <option value="poor">Poor</option>
            </select>
          </div>
  
          <div className="form-group-add">
            <label htmlFor="price_per_day">Price per Day</label>
            <input type="number" id="price_per_day" name="price_per_day" step="0.01" value={formData.price_per_day} onChange={handleChange} required />
          </div>

          <div className="form-group-add">
     
          </div>
  
          <button className="addVehicle" type="submit">Add Motorcycle</button>
        </form>
      </div>
    </>
  );
  
};


export default AddVehicle;
