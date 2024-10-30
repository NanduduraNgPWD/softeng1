import "./Booking.css";
import React, { useState } from "react";
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import products from "../../../shared/db/product.json";
function Booking() {
  const [status, setStatus] = useState("active");

  // Dummy data
  const bookingData = {
    active: [
      {
        id: 1,
        name: "Yamaha Fazzio",
        date: "10/10/2024 - 10/12/2024",
        price: "999",
      },
    ],
    pending: [
      // { id: 3, name: 'Booking 3', details: 'Pending booking details 1' },
    ],
    completed: [
      {
        id: 4,
        name: "Harley Davidson",
        date: "09/20/2024 - 09/21/2024",
        price: "3999",
      },
    ],
  };

  const handleStatusClick = (newStatus) => {
    setStatus(newStatus);
  };

  return (
    <>
      <Header position="sticky" />

      <div className="booking-body">
        <div className="booking-child">
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
          </div>
        </div>

        <div className="booking-list">
          {bookingData[status].length === 0 ? (
            <p>You have no {status} booking.</p>
          ) : (
            bookingData[status].map((booking) => (
              <div key={booking.id} className="booking-item">
                <p>{booking.name}</p>
                <p id="booking-date">{booking.date}</p>
                <p>₱{booking.price}</p>
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
