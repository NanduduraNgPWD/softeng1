import React, { useState } from 'react';
import './Filter.css'; 

const Filter = () => {
  // State for form inputs
  const [motorcycleType, setMotorcycleType] = useState('all');
  const [minPrice, setMinPrice] = useState('');
  const [maxPrice, setMaxPrice] = useState('');
  const [brands, setBrands] = useState([]);
  const [transmission, setTransmission] = useState([]);
  const [colors, setColors] = useState([]);
  const [engineSize, setEngineSize] = useState([]);

  // Handle form submission
  const handleSubmit = (event) => {
    event.preventDefault();
  
    const filters = {
      motorcycleType,
      minPrice,
      maxPrice,
      brands,
      transmission,
      colors,
      engineSize
    };
    console.log('Filters applied:', filters);
  };

  // Handle checkbox changes for multiple selection
  const handleCheckboxChange = (event, stateSetter, currentState) => {
    const { value, checked } = event.target;
    if (checked) {
      stateSetter([...currentState, value]);
    } else {
      stateSetter(currentState.filter((item) => item !== value));
    }
  };

  return (
    <div className="filter-form-container">
      <form className="filter-form" onSubmit={handleSubmit}>
        <h2>Search Filter</h2>

        {/* Motorcycle Type Dropdown */}
        <div className="form-group">
          <label htmlFor="motorcycle-type">Motorcycle Type</label>
          <select
            id="motorcycle-type"
            value={motorcycleType}
            onChange={(e) => setMotorcycleType(e.target.value)}
          >
            <option value="all">All</option>
            <option value="cruiser">Cruiser</option>
            <option value="sportbike">Sportbike</option>
            <option value="touring">Touring</option>
            <option value="dual-sport">Dual-sport</option>
            <option value="scooter">Scooter</option>
            <option value="off-road">Off-road</option>
          </select>
        </div>

        {/* Price Range */}
        <div className="form-group">
          <label htmlFor="price-range">Price Range (₱)</label>
          <input
            type="number"
            id="min-price"
            value={minPrice}
            onChange={(e) => setMinPrice(e.target.value)}
            placeholder="Min Price"
          />
          <input
            type="number"
            id="max-price"
            value={maxPrice}
            onChange={(e) => setMaxPrice(e.target.value)}
            placeholder="Max Price"
          />
        </div>

        {/* Brand Checkboxes */}
        <div className="form-group">
          <label>Brand</label>
          <div className="checkbox-group">
            {['Honda', 'Yamaha', 'Suzuki', 'Kawasaki', 'KTM', 'Ducati'].map((brand) => (
              <label key={brand}>
                <input
                  type="checkbox"
                  name="brand"
                  value={brand.toLowerCase()}
                  onChange={(e) => handleCheckboxChange(e, setBrands, brands)}
                />{' '}
                {brand}
              </label>
            ))}
          </div>
        </div>

        {/* Transmission Type Checkboxes */}
        <div className="form-group">
          <label>Transmission Type</label>
          <div className="checkbox-group">
            {['Manual', 'Automatic'].map((type) => (
              <label key={type}>
                <input
                  type="checkbox"
                  name="transmission"
                  value={type.toLowerCase()}
                  onChange={(e) => handleCheckboxChange(e, setTransmission, transmission)}
                />{' '}
                {type}
              </label>
            ))}
          </div>
        </div>

        {/* Color Checkboxes */}
        <div className="form-group">
          <label>Color</label>
          <div className="checkbox-group">
            {['Black', 'White', 'Red', 'Blue', 'Green'].map((color) => (
              <label key={color}>
                <input
                  type="checkbox"
                  name="color"
                  value={color.toLowerCase()}
                  onChange={(e) => handleCheckboxChange(e, setColors, colors)}
                />{' '}
                {color}
              </label>
            ))}
          </div>
        </div>

        {/* Engine Size Checkboxes */}
        <div className="form-group">
          <label>Engine Size (cc)</label>
          <div className="checkbox-group">
            {['Below 125cc', '126cc - 250cc', '251cc - 500cc', '501cc - 750cc', '751cc+'].map((size) => (
              <label key={size}>
                <input
                  type="checkbox"
                  name="engine-size"
                  value={size.toLowerCase()}
                  onChange={(e) => handleCheckboxChange(e, setEngineSize, engineSize)}
                />{' '}
                {size}
              </label>
            ))}
          </div>
        </div>

        {/* Submit Button */}
        <button type="submit" className="filter-btn">
          Apply Filters
        </button>
      </form>
    </div>
  );
};

export default Filter;
