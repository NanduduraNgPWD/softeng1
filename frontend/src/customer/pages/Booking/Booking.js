import React, { useState, useEffect } from "react";
import axios from "axios";
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import Button from "../../components/Button/Button";
import { useNavigate } from "react-router-dom";
import "./Booking.css";

function Booking() {
  const navigate = useNavigate();
  const [status, setStatus] = useState("active");
  const [bookings, setBookings] = useState([]);
  const userID = 4;

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

  return (
    <>
      <Header position="sticky" />

      <div className="booking-body mx-auto">
        
        <div className="booking-child">
<div className="booking-child-first">
<p id="booking-title"> Your {status} bookings</p>
        <p id="pastbooking"
              onClick={() => handleStatusClick("completed")}> VIEW PAST BOOKINGS </p>
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
            {/* <button
              className={status === "completed" ? "highlighted" : ""}
              onClick={() => handleStatusClick("completed")}
            >
              Completed
            </button> */}
          </div>
        </div>

        <div className="booking-list">
          {bookings[status] && bookings[status].length === 0 ? (
            <p>You have no {status} bookings.</p>
          ) : (
            bookings[status] && bookings[status].map((booking) => (
              <div key={booking.booking_id} className="booking-item shadow" >
                <div className="booking-deets">
                <img className="imgbooking"src={"/images/dummy.png"}  />
               <div className="booking-deets-text">
               <p>Start date - End date</p>
                <p id="booking-date">
          {new Date(booking.rental_start_date).toLocaleDateString('en-US', {
            year: 'numeric',
            month: '2-digit',
            day: '2-digit',
          })}{" "} 
          -{" "}   
          {new Date(booking.rental_end_date).toLocaleDateString('en-US', {
            year: 'numeric',
            month: '2-digit',
            day: '2-digit',
          })} 
        </p>
                <p>₱{booking.total_price}</p>
                </div>
               </div>
                <Button onClick={() => handleProductClick(booking.booking_id)} text="View"/>
        
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