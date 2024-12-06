import React, { useState, useEffect } from "react";
import axios from "axios";
import Dashboard from "../Dashboard/Dashboard";
import { useNavigate } from "react-router-dom";
import "./Bookings.css";
import Button from "../../../customer/components/Button/Button";


function Booking() {
  const navigate = useNavigate();
  const [status, setStatus] = useState("active");
  
  const [bookings, setBookings] = useState({
    active: [],
    pending: [],
    upcoming: [],
    completed: [],
    canceled: [],
  });
  const userID = 2; // Placeholder 


  
  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/bookings/owner/${userID}`);
        const data = Array.isArray(response.data) ? response.data : [response.data];
        console.log(response.data);
  
       
        const bookingsWithCustomers = await Promise.all(
          data.map(async (booking) => {
            try {
              // Fetch customer details based on customer_id
              const customerResponse = await axios.get(`http://localhost:3000/users/${booking.customer_id}`);
              const customerData = customerResponse.data;
              return {
                ...booking,
                customer_name: customerData.name, // Assuming the API returns a "name" field
              };
            } catch (error) {
              console.error(`Error fetching customer data for ID ${booking.customer_id}:`, error);
              return { ...booking, customer_name: "Unknown Customer" };
            }
          })
        );
  
        const organizedBookings = {
          active: bookingsWithCustomers.filter((b) => b.rental_status === "Ongoing"),
          pending: bookingsWithCustomers.filter((b) => b.rental_status === "Pending"),
          upcoming: bookingsWithCustomers.filter((b) => b.rental_status === "Upcoming"),
          completed: bookingsWithCustomers.filter((b) => b.rental_status === "Completed"),
          canceled: bookingsWithCustomers.filter((b) => b.rental_status === "Canceled"),
        };
  
        setBookings(organizedBookings);
      } catch (error) {
        console.error("Error fetching bookings or customer data:", error);
      }
    };
  
    fetchBookings();
  }, [userID]);
  
  
  

  const handleStatusClick = (newStatus) => {
    setStatus(newStatus);
  };

  const handleProductClick = (id) => {
    navigate(`/business/Bookings/${id}`); 
  };

  const handleUpdateStatus = (bookingId, newStatus) => {
    axios
      .put(`http://localhost:3000/bookings/${bookingId}`, { rental_status: newStatus })
      .then(() => {
        // Update bookings in the frontend state
        setBookings((prev) => {
          const updatedBookings = { ...prev };
  
          // Find the booking to update in the current status
          const bookingToUpdate = updatedBookings[status]?.find((b) => b.booking_id === bookingId);
  
          if (bookingToUpdate) {
            // Remove the booking from its current status
            updatedBookings[status] = updatedBookings[status].filter((b) => b.booking_id !== bookingId);
  
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
      })
      .catch((error) => console.error("Error updating booking status:", error));
  };
  
  
  
  

  return (
    <>
      <Dashboard/>
      <div className="booking-body my-4 mx-auto">
        <div className="booking-child ">
          <div className="status-buttons">
            <button
              className={status === "active" ? "highlighted" : ""}
              onClick={() => handleStatusClick("active")}
            >
              Active
            </button>
            <button
              className={status === "pending" ? "highlighted" : ""}
              onClick={() => handleStatusClick("pending")}
            >
              Pending
            </button>
            <button
              className={status === "completed" ? "highlighted" : ""}
              onClick={() => handleStatusClick("completed")}
            >
              Completed
            </button>
            <button
              className={status === "canceled" ? "highlighted" : ""}
              onClick={() => handleStatusClick("canceled")}
            >
              Canceled
            </button>
          </div>
        </div>

        <div className="booking-list h-48">
          {bookings[status] && bookings[status].length === 0 ? (
            <p>You have no {status} bookings.</p>
          ) : (
            bookings[status] &&
            bookings[status].map((booking) => (
              <div key={booking.booking_id} className="booking-item h-full">
               
               <div className="booking-deets-text">
                <p>Booking ID: #{booking.booking_id}</p>
                <p>Customer: {booking.customer_name}</p>
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
            
                {status === "pending" && (
                  <div className="actions">
                    <Button
                      className="approve-button"
                      onClick={() => handleUpdateStatus(booking.booking_id, "Upcoming")} text="Accept" style={{ backgroundColor: '#00607a' }}
                    />
                     
                    <Button onClick={() => handleProductClick(booking.booking_id)} text="View" />
                    <Button
                      className="decline-button"
                      onClick={() => handleUpdateStatus(booking.booking_id, "Canceled")}  text="Decline" style={{ backgroundColor: '#e2e5e9', color:'#080809'}}
                    />

                  </div>
                )}
{status === "active" && (
 <div className="actions">
   <button
    className="complete-button"
    onClick={() => {
      const rentalEndDate = new Date(booking.rental_end_date); // Convert end date to Date object
      const currentDate = new Date(); // Get the current date

      if (rentalEndDate >= rentalEndDate) {
       
        handleUpdateStatus(booking.booking_id, "Completed");
      } else {
        alert("You can only mark this booking as completed after the rental end date.");
      }
    }}
  >
    Complete
  </button>

  <Button onClick={() => handleProductClick(booking.booking_id)} text="View" style={{ backgroundColor: '#00607a' }}/>
 </div>
)}

              </div>
            ))
          )}
        </div>
      </div>
    </>
  );
}

export default Booking;
