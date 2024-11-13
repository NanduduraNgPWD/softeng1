import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from "react-router-dom";
import "./VehicleDetail.css";
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import "react-datepicker/dist/react-datepicker.css"; 
import DatePicker from "react-datepicker";

const VehicleDetail = () => {
  const { id } = useParams();
  const [data, setData] = useState([]);
  const [vehicle, setVehicle] = useState(null);
  
  const [pickup, setPickup] = useState("08:00");
  const [dropoff, setDropoff] = useState("08:00");
  const [pickupLocation, setPickupLocation] = useState("");
  const [dropoffLocation, setDropoffLocation] = useState("");
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedDate1, setSelectedDate1] = useState(null);
  const [totalPrice, setTotalPrice] = useState(0);


  const ownerId = vehicle ? vehicle.owner_id : null;
  const customerId = 4; // Placeholder until login functionality is added
  const rentalStatus = "Pending";

  useEffect(() => {
    axios.get('http://localhost:3000/motorcycles')
      .then(res => {
        const fetchedData = res.data || [];
        setData(fetchedData);

        const foundVehicle = fetchedData.find((product) => product.motorcycle_id === Number(id));
        setVehicle(foundVehicle);
      })
      .catch(err => console.error("Error fetching motorcycles:", err));
  }, [id]);

  useEffect(() => {
    if (selectedDate && selectedDate1 && vehicle) {
      const rentalDays = Math.ceil((selectedDate1 - selectedDate) / (1000 * 60 * 60 * 24));
      setTotalPrice(rentalDays > 0 ? rentalDays * vehicle.price_per_day : 0);
    }
  }, [selectedDate, selectedDate1, vehicle]);

  // Function to handle booking creation
  const handleCheckout = async () => {
    try {
      const bookingData = {
        owner_id: ownerId,
        motorcycle_id: id,
        customer_id: customerId,
        rental_start_date: selectedDate ? selectedDate.toISOString().slice(0, 10) : null,
        rental_end_date: selectedDate1 ? selectedDate1.toISOString().slice(0, 10) : null,
        total_price: totalPrice,
        pickup_location: pickupLocation,
        dropoff_location: dropoffLocation,
        pickup_time: pickup,
        dropoff_time: dropoff,
        rental_status: rentalStatus
      };
      

      const response = await axios.post('http://localhost:3000/bookings', bookingData);
      if (response.status === 201) {
        alert("Booking created successfully!");
      } else {
        alert("Failed to create booking.");
      }
    } catch (error) {
      console.error("Error creating booking:", error);
      alert("An error occurred while creating the booking.");
    }
  };

  if (!vehicle) return <p>Loading vehicle details...</p>;

  return (
    <>
      <Header color="white" position="fixed" />

      <div className="view-container">

        
        <div className="booking-information">
          <p>Per day rental</p>
          <h2 id="totalprice">
            {totalPrice.toFixed(2)} <span id="rentalphp">php</span>
          </h2>
          <div className="rental-dates">
            <div className="date-from pickup-dropoff-content1">
              <label htmlFor="rental-dates">FROM</label>
              <DatePicker
                minDate={new Date()}
                selected={selectedDate}
                onChange={(date) => setSelectedDate(date)}
              />
            </div>
            <div className="date-to pickup-dropoff-content2">
              <label htmlFor="rental-dates">TO</label>
              <DatePicker
                minDate={selectedDate}
                selected={selectedDate1}
                onChange={(date) => setSelectedDate1(date)}
              />
            </div>
          </div>
          <div className="pickup-dropoff">
            <div className="pickup-dropoff-content1">
              <label htmlFor="pickup">PICKUP</label>
              <input
                type="time"
                id="pickup"
                value={pickup}
                onChange={(e) => setPickup(e.target.value)}
              />
            </div>
            <div className="pickup-dropoff-content2">
              <label htmlFor="dropoff">DROPOFF</label>
              <input
                type="time"
                id="dropoff"
                value={dropoff}
                onChange={(e) => setDropoff(e.target.value)}
              />
            </div>
          </div>
          <div className="pickup-dropoff">
            <div className="pickup-dropoff-content1">
              <label htmlFor="pickup-location">PICKUP LOCATION</label>
              <select
                id="pickup-location"
                value={pickupLocation}
                onChange={(e) => setPickupLocation(e.target.value)}
              >
                <option value="">Select Pickup Location</option>
                <option value="Airport">Airport</option>
                <option value="SM City">SM City</option>
                <option value="Lagoon">Lagoon</option>
              </select>
            </div>
            <div className="pickup-dropoff-content2">
              <label htmlFor="dropoff-location">DROPOFF LOCATION</label>
              <select
                id="dropoff-location"
                value={dropoffLocation}
                onChange={(e) => setDropoffLocation(e.target.value)}
              >
                <option value="">Select Dropoff Location</option>
                <option value="Airport">Airport</option>
                <option value="SM City">SM City</option>
                <option value="Lagoon">Lagoon</option>
              </select>
            </div>
          </div>

          <button className="checkout-button" onClick={handleCheckout}>GO TO CHECKOUT</button>
          <p className="best-price">
            Best price <strong>guaranteed.</strong>
          </p>
          <div className="features">
            <p>✔ Free cancellations</p>
            <p>✔ Free amendments</p>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default VehicleDetail;
