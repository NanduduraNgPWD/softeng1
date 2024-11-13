import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Dashboard from '../Dashboard/Dashboard';

const Bookings = () => {
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    axios
      .get('http://localhost:3000/bookings')
      .then((res) => {
        setBookings(res.data || []);
      })
      .catch((err) => console.error("Error fetching bookings:", err));
  }, []);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const year = date.getFullYear();
    return `${month}/${day}/${year}`;
  };

  const handleApprove = (rental_id) => {
    axios
      .put(`http://localhost:3000/rentals/${rental_id}`, { rental_status: 'Ongoing' })
      .then(() => {
        setBookings((prev) =>
          prev.map((booking) =>
            booking.rental_id === rental_id ? { ...booking, rental_status: 'Ongoing' } : booking
          )
        );
      })
      .catch((err) => console.error("Error approving booking:", err));
  };

  const handleDecline = (rental_id) => {
    axios
      .put(`http://localhost:3000/rentals/${rental_id}`, { rental_status: 'Canceled' })
      .then(() => {
        setBookings((prev) =>
          prev.map((booking) =>
            booking.rental_id === rental_id ? { ...booking, rental_status: 'Canceled' } : booking
          )
        );
      })
      .catch((err) => console.error("Error declining booking:", err));
  };

  return (
    <>
      <Dashboard />
      <div className="w-full p-4">
        <table className="w-full border-collapse border border-gray-300">
          <thead>
            <tr className="bg-gray-200">
              <th className="border border-gray-300 px-4 py-2">Booking ID</th>
              <th className="border border-gray-300 px-4 py-2">Motorcycle ID</th>
              <th className="border border-gray-300 px-4 py-2">Customer ID</th>
              <th className="border border-gray-300 px-4 py-2">Start Date</th>
              <th className="border border-gray-300 px-4 py-2">End Date</th>
              <th className="border border-gray-300 px-4 py-2">Total Price</th>
              <th className="border border-gray-300 px-4 py-2">Status</th>
              <th className="border border-gray-300 px-4 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {bookings.map((booking) => (
              <tr key={booking.rental_id} className="hover:bg-gray-100">
                <td className="border border-gray-300 px-4 py-2">{booking.booking_id}</td>
                <td className="border border-gray-300 px-4 py-2">{booking.motorcycle_id}</td>
                <td className="border border-gray-300 px-4 py-2">{booking.customer_id}</td>
                <td className="border border-gray-300 px-4 py-2">{formatDate(booking.rental_start_date)}</td>
                <td className="border border-gray-300 px-4 py-2">{formatDate(booking.rental_end_date)}</td>
                <td className="border border-gray-300 px-4 py-2">{booking.total_price}</td>
                <td className="border border-gray-300 px-4 py-2">{booking.rental_status}</td>
                <td className="border border-gray-300 px-4 py-2 flex w-60">
                  {booking.rental_status === 'Pending' && (
                    <>
                      <button
                        onClick={() => handleApprove(booking.booking_id)}
                        className="bg-green-500 text-white px-2 py-1 rounded mr-2"
                      >
                        Approve
                      </button>
                      <button
                        onClick={() => handleDecline(booking.booking_id)}
                        className="bg-red-500 text-white px-2 py-1 rounded"
                      >
                        Decline
                      </button>
                    </>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default Bookings;
