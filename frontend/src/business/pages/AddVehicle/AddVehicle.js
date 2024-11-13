import React, {useEffect, useState} from 'react'
import axios from 'axios'
import Dashboard from '../Dashboard/Dashboard'
import "./AddVehicle.css";



const AddVehicle = () => (
  <>
   
    
    <Dashboard/>
    <div className="add-form-container">
      <div className="add-title">
        <p id="add-title-1">Create new listing</p>
        <p id="add-title-2">Let's get you started</p>
      </div>
      <form id="motorcycleForm">
        <div className="form-group-add">
          <label htmlFor="brand">Brand</label>
          <select id="brand" name="brand" required>
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
          <input type="text" id="model" name="model" required />
        </div>

        <div className="form-group-add">
          <label htmlFor="year">Year</label>
          <select id="year" name="year" required>
            {Array.from({ length: 25 }, (_, i) => (
              <option key={i} value={2024 - i}>
                {2024 - i}
              </option>
            ))}
          </select>
        </div>

        <div className="form-group-add">
          <label htmlFor="color">Color</label>
          <select id="color" name="color" required>
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
          <select id="type" name="type" required>
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
          <select id="transmission" name="transmission" required>
            <option value="manual">Manual</option>
            <option value="automatic">Automatic</option>
          </select>
        </div>

        <div className="form-group-add">
          <label htmlFor="mileage">Mileage (in km)</label>
          <input type="number" id="mileage" name="mileage" required />
        </div>

        <div className="form-group-add">
          <label htmlFor="condition">Condition</label>
          <select id="condition" name="condition" required>
            <option value="new">New</option>
            <option value="excellent">Excellent</option>
            <option value="good">Good</option>
            <option value="fair">Fair</option>
            <option value="poor">Poor</option>
          </select>
        </div>

        <div className="form-group-add">
          <label htmlFor="price">Price per Day </label>
          <input type="number" id="price" name="price" step="0.01" required />
        </div>

        <div className="form-group-add">
          <label htmlFor="image">Image</label>
          <input type="file" id="image" name="image" accept="image/*" />
        </div>

        <button className="addVehicle" type="submit">
          Add Motorcycle
        </button>
      </form>
    </div>
  </>
);

export default AddVehicle;
