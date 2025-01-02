import React, { useState, useEffect } from "react";
import axios from "axios";
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import Button from "../../components/Button/Button";
import { useNavigate } from "react-router-dom";
import "./Booking.css";
import { NotificationManager } from 'react-notifications';
import { jwtDecode } from 'jwt-decode'; 

function Booking() {
  //user id
  const token = localStorage.getItem('authToken');
  
  if (token) {
    const decoded = jwtDecode(token);
    console.log('Decoded Token:', decoded);
  }
  const userID = token ? jwtDecode(token).user_id : null;

  const navigate = useNavigate();
  const [status, setStatus] = useState("active");
  const [bookings, setBookings] = useState([]);
  // const userID = 4;

  useEffect(() => {
    axios.get(`http://localhost:3000/bookings/customer/${userID}`)
      .then((response) => {
        const data = Array.isArray(response.data) ? response.data : [response.data]; // Ensure it's an array
  
        const organizedBookings = {
          active: data.filter(b => b.rental_status === "Ongoing"),
          upcoming: data.filter(b => b.rental_status === "Upcoming"),
          pending: data.filter(b => b.rental_status === "Pending"),
          completed: data.filter(b => b.rental_status === "Completed"),
        };
  
        setBookings(organizedBookings);
      })
      .catch((error) => console.error("Error fetching bookings:", error));
    
  }, [userID]);
  console.log(bookings)

  const handleStatusClick = (newStatus) => {
    setStatus(newStatus);
  };

  const handleProductClick = (id) => {
    navigate(`/bookings/${id}`); 
  };


const handleUpdateStatus = (bookingId, newStatus, currentStatus) => {
  axios
    .put(`http://localhost:3000/bookings/${bookingId}`, { rental_status: newStatus })
    .then(() => {
      // Immediately update bookings in the frontend state
      setBookings((prev) => {
        const updatedBookings = { ...prev };

        // Find the booking to update in the current status
        const bookingToUpdate = updatedBookings[currentStatus]?.find(
          (b) => b.booking_id === bookingId
        );

        if (bookingToUpdate) {
          // Remove the booking from its current status
          updatedBookings[currentStatus] = updatedBookings[currentStatus].filter(
            (b) => b.booking_id !== bookingId
          );

          // Initialize the new status array if it doesn't exist
          if (!updatedBookings[newStatus.toLowerCase()]) {
            updatedBookings[newStatus.toLowerCase()] = [];
          }

          // Update the booking's status and move it to the new status
          bookingToUpdate.rental_status = newStatus;
          updatedBookings[newStatus.toLowerCase()].push(bookingToUpdate);
        }

        return updatedBookings;
      });

      // Display success notification
      NotificationManager.success('Booking has been cancelled!', 'Success');
    })
    .catch((error) => {
      console.error("Error updating booking status:", error);
      // Optionally display error notification
      NotificationManager.error('Failed to update booking status.', 'Error');
    });
};

  

  return (
    <>
      <Header position="sticky" />

      <div className="booking-body mx-auto">
  <div className="booking-child">
    <div className="booking-child-first">
      <p id="booking-title">Your {status} bookings</p>
      <p id="pastbooking" onClick={() => handleStatusClick("completed")}>
        VIEW PAST BOOKINGS
      </p>
    </div>
    <div className="status-buttons">
      <button
        className={status === "active" ? "highlighted" : ""}
        onClick={() => handleStatusClick("active")}
      >
        Active
      </button>
      <button
        className={status === "upcoming" ? "highlighted" : ""}
        onClick={() => handleStatusClick("upcoming")}
      >
        Upcoming
      </button>
      <button
        className={status === "pending" ? "highlighted" : ""}
        onClick={() => handleStatusClick("pending")}
      >
        Pending
      </button>
    </div>
  </div>

  <div className="booking-list">
    {bookings[status] && bookings[status].length === 0 ? (
      <p>You have no {status} bookings.</p>
    ) : (
      bookings[status] &&
      bookings[status].map((booking) => (
        <div key={booking.booking_id} className="booking-item shadow">
          <div className="booking-deets">
            <img className="imgbooking" src={"/images/dummy.png"} />
            <div className="booking-deets-text">
              <p>Start date - End date</p>
              <p id="booking-date">
                {new Date(booking.rental_start_date).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "2-digit",
                  day: "2-digit",
                })}{" "}
                -{" "}
                {new Date(booking.rental_end_date).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "2-digit",
                  day: "2-digit",
                })}
              </p>
              <p>₱{booking.total_price}</p>
            </div>
          </div>
          <div className="right-buttons py-4">
          <Button onClick={() => handleProductClick(booking.booking_id)} text="View" />
          {status === "pending" && (
   <div className="actions my-2">
   {bookings[status]?.map((booking) => (
     <Button
       key={booking.booking_id} // Ensure booking_id is unique
       className="decline-button"
       onClick={() =>
         handleUpdateStatus(booking.booking_id, "Canceled", "pending") // Pass correct booking_id and status
       }
       text="Decline"
       style={{ backgroundColor: "#e2e5e9", color: "#080809" }}
     />
   ))}
 </div>
 
    )}
    </div>
        </div>
      ))
    )}
  </div>
</div>

      <Footer />
    </>
  );
}

export default Booking;