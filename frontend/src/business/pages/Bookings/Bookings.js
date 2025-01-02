import React, { useState, useEffect } from "react";
import axios from "axios";
import Dashboard from "../Dashboard/Dashboard";
import { useNavigate } from "react-router-dom";
import "./Bookings.css";
import Button from "../../../customer/components/Button/Button";
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
  
  const [bookings, setBookings] = useState({
    active: [],
    pending: [],
    upcoming: [],
    completed: [],
    canceled: [],
  });

  
  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/bookings/owner/${userID}`);
        const data = Array.isArray(response.data) ? response.data : [response.data];
        console.log(response.data);
  
       
        const bookingsWithCustomers = await Promise.all(
          data.map(async (booking) => {
            try {
              // Fetch customer based sa customer_id
              const customerResponse = await axios.get(`http://localhost:3000/users/${booking.customer_id}`);
              const customerData = customerResponse.data;
              return {
                ...booking,
                customer_name: customerData.first_name, 
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

  const handleUpdateStatus = (bookingId, newStatus, currentStatus) => {
    const normalizedNewStatus = newStatus.toLowerCase();
  
    // Validate the new status against known values
    const VALID_RENTAL_STATUSES = ['upcoming', 'ongoing', 'completed'];
    if (!VALID_RENTAL_STATUSES.includes(normalizedNewStatus)) {
      NotificationManager.error('Invalid rental status!', 'Error');
      return;
    }
  
    axios
      .put(`http://localhost:3000/bookings/${bookingId}`, { rental_status: newStatus })
      .then(() => {
        // Update bookings in the frontend state immediately
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
            if (!updatedBookings[normalizedNewStatus]) {
              updatedBookings[normalizedNewStatus] = [];
            }
  
            // Update the booking's status and move it to the new status
            bookingToUpdate.rental_status = newStatus;
            updatedBookings[normalizedNewStatus].push(bookingToUpdate);
          }
  
          NotificationManager.success('Booking status updated!', 'Success');
          return updatedBookings;
        });
      })
      .catch((error) => {
        console.error('Error updating booking status:', error);
        NotificationManager.error(
          error.response?.data || 'Error updating booking status!',
          'Error'
        );
      });
  };
  
  
  


  const handleUpdateReturnedStatus = (bookingId, newReturnedStatus) => {
    axios
      .put(`http://localhost:3000/bookings/${bookingId}`, { returned_status: newReturnedStatus })
      .then(() => {
        // Update bookings in the frontend state
        setBookings((prev) => {
          const updatedBookings = { ...prev };
  
          // Find the booking in the "completed" status group
          const bookingToUpdate = updatedBookings['completed']?.find((b) => b.booking_id === bookingId);
  
          if (bookingToUpdate) {
            // Update the returned_status for the found booking
            bookingToUpdate.returned_status = newReturnedStatus;
  
            // Grey out the button if the returned status is 'Confirmed'
            bookingToUpdate.isButtonGreyedOut = newReturnedStatus === 'Confirmed';
          }
  
          return updatedBookings;
        });
      })
      .catch((error) => console.error("Error updating returned status:", error));
  };
  
  
  
  
  

  return (
    <>
      <Dashboard/>
      <div className="booking-body my-4 mx-auto">
<div className="booking-title-container">
  
<p id="booking-title">Booking</p>
<p id="pastbooking"  onClick={() => handleStatusClick("completed")}>VIEW COMPLETED BOOKINGS</p>
</div>


        <div className="booking-child ">
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
              <div key={booking.booking_id} className="booking-item h-full"   style={{
                backgroundColor: booking.returned_status === 'Confirmed' ? '#dcdcdc' : '#fff', // Change color based on returned_status
              }}>
               
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
  onClick={() => handleUpdateStatus(booking.booking_id, "Upcoming", "pending")}
  text="Accept"
  style={{ backgroundColor: '#00607a' }}
/>
                     
                    <Button onClick={() => handleProductClick(booking.booking_id)} text="View" />
                    <Button
      className="decline-button"
      onClick={() => {
        handleUpdateStatus(booking.booking_id, "Canceled");
      }}
      text="Decline"
      style={{ backgroundColor: '#e2e5e9', color: '#080809' }}
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
{status === "upcoming" && (
 <div className="actions">

  <Button onClick={() => handleProductClick(booking.booking_id)} text="View" style={{ backgroundColor: '#00607a' }}/>
 </div>
)}

{status === "completed" && (
 <div className="actions">
<Button
  onClick={() => handleUpdateReturnedStatus(booking.booking_id, 'Confirmed')} // Pass 'Confirmed' explicitly
  text={booking.returned_status === 'Confirmed' ? 'Confirmed' : 'Confirm'} // Dynamically change the text
  style={{
    backgroundColor: booking.returned_status === 'Confirmed' ? '#808080' : '#02a4d1', // Change color based on returned_status
    cursor: booking.returned_status === 'Confirmed' ? 'not-allowed' : 'pointer', // Disable the cursor if it's confirmed
  }}
  disabled={booking.returned_status === 'Confirmed'} // Disable button if returned_status is 'Confirmed'
 />

{/* <Button
  disabled={booking.isButtonGreyedOut} 
  onClick={() => handleUpdateReturnedStatus(booking.booking_id, 'Confirmed')} 
  text="Confirm" 
  style={{ backgroundColor: '#02a4d1' }} 
/> */}

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
