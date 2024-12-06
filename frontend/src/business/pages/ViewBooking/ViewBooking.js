import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom"; // To get the booking ID from the URL
import axios from "axios";
import Dashboard from "../Dashboard/Dashboard";
import "./BookingInformation.css";

function ViewBooking() {
  const { bookingId } = useParams(); // Assume the booking ID is passed in the route
  const [booking, setBooking] = useState(null);
  const [vehicle, setVehicle] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBookingDetails = async () => {
      try {
        setIsLoading(true);
  
        const bookingResponse = await axios.get(`http://localhost:3000/bookings/${bookingId}`);
        const bookingData = bookingResponse.data;

        const motorcycleResponse = await axios.get(`http://localhost:3000/motorcycles/${bookingData.motorcycle_id}`);
        const motorcycleData = motorcycleResponse.data;

        let customerName = "";
        let phoneNumber = "";
        try {
          const customerResponse = await axios.get(`http://localhost:3000/users/${bookingData.customer_id}`);
          customerName = customerResponse.data.name; 
          phoneNumber = customerResponse.data.phone_number;
        } catch (error) {
          console.error(`Error fetching customer data for ID ${bookingData.customer_id}:`, error);
        }
  
        setBooking({
          ...bookingData,
          customer_name: customerName,
          phone_number: phoneNumber,

        });
        setVehicle(motorcycleData);
      } catch (err) {
        console.error("Error fetching booking or vehicle details:", err);
        setError("Failed to load booking information. Please try again.");
      } finally {
        setIsLoading(false);
      }
    };
  
    fetchBookingDetails();
  }, [bookingId]);
  

  if (isLoading) {
    return <p>Loading booking information...</p>;
  }

  if (error) {
    return <p className="error">{error}</p>;
  }

  if (!booking || !vehicle) {
    return <p>No booking or vehicle details found.</p>;
  }

  return (
    <>
  <Dashboard/>
  <div className="booking-body my-12 mx-auto">
  <table className="w-full border-collapse border border-gray-300">
    <thead>
      <tr className="bg-gray-200">
        <th className="border border-gray-300 px-4 py-2">Detail</th>
        <th className="border border-gray-300 px-4 py-2">Information</th>
      </tr>
    </thead>
    <tbody>

    <tr className="hover:bg-gray-100">
        <td className="border border-gray-300 px-4 py-2">Customer</td>
        <td className="border border-gray-300 px-4 py-2">{booking.customer_name}</td>
      </tr>

      <tr className="hover:bg-gray-100">
        <td className="border border-gray-300 px-4 py-2">Phone number</td>
        <td className="border border-gray-300 px-4 py-2">{booking.phone_number}</td>
      </tr>
    
      <tr className="hover:bg-gray-100">
        <td className="border border-gray-300 px-4 py-2">Rental Status</td>
        <td className="border border-gray-300 px-4 py-2">{booking.rental_status}</td>
      </tr>

      <tr className="hover:bg-gray-100">
        <td className="border border-gray-300 px-4 py-2">Start and End Date</td>
        <td className="border border-gray-300 px-4 py-2">
          {new Date(booking.rental_start_date).toLocaleDateString("en-US")} -{" "}
          {new Date(booking.rental_end_date).toLocaleDateString("en-US")}
        </td>
      </tr>
      <tr className="hover:bg-gray-100">
        <td className="border border-gray-300 px-4 py-2">Amount to Collect</td>
        <td className="border border-gray-300 px-4 py-2">₱{parseFloat(booking.total_price).toLocaleString()}</td>
      </tr>
      <tr className="hover:bg-gray-100">
        <td className="border border-gray-300 px-4 py-2">Pickup and Dropoff</td>
        <td className="border border-gray-300 px-4 py-2">
          <p>Pickup: <b className="font-semibold">{booking.pickup_location}</b> at {booking.pickup_time}</p>
          <p>Dropoff: <b className="font-semibold">{booking.dropoff_location}</b> at {booking.dropoff_time}</p>
        </td>
      </tr>
      <tr className="hover:bg-gray-100">
        <td className="border border-gray-300 px-4 py-2">Motorcycle</td>
        <td className="border border-gray-300 px-4 py-2">
          <p>{vehicle.brand} {vehicle.model}</p>
          <p>{vehicle.year}</p>
          <p>{vehicle.color}</p>
        </td>
      </tr>
    </tbody>
  </table>
</div>


    </>
  );
}

export default ViewBooking;
