import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom"; // To get the booking ID from the URL
import axios from "axios";
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import "./BookingInformation.css";
import {Bike, CalendarDays, MapPinned, Users,ArrowLeft} from "lucide-react"

function BookingInformation() {
  const { bookingId } = useParams(); // Assume the booking ID is passed in the route
  const [booking, setBooking] = useState(null);
  const [vehicle, setVehicle] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBookingDetails = async () => {
      try {
        setIsLoading(true);

        // Fetch the booking details
        const bookingResponse = await axios.get(`http://localhost:3000/bookings/${bookingId}`);
        const bookingData = bookingResponse.data;

        // Fetch the associated motorcycle details using motorcycle_id
        const motorcycleResponse = await axios.get(`http://localhost:3000/motorcycles/${bookingData.motorcycle_id}`);
        const motorcycleData = motorcycleResponse.data;

        setBooking(bookingData);
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
      <Header position="sticky" />
      <div className="BookingInformation">
      <Link to="/Booking"><ArrowLeft color="#212529" className="arrow-back" /></Link>
      
        <img className="imgbooking"src={vehicle.image || "/images/dummy.png"} alt={`${vehicle.brand} ${vehicle.model}`} />
        <p id="productName" className="booking-title">Booking Information</p>
        <p id="type">{booking.rental_status}</p>
      <div className="booking-detail-info">
      <div className="included-info">
          <p id="included-info-heading4">Start and end date <CalendarDays color="#02a4d1" /></p>
          <p id="included-info-heading3">{new Date(booking.rental_start_date).toLocaleDateString("en-US")} - {new Date(booking.rental_end_date).toLocaleDateString("en-US")} </p>
         
        </div>

        <div className="included-info">
          <p id="included-info-heading4">Upon meet up <Users color="#02a4d1" /></p>
          <p id="included-info-heading3">Please pay the amount of <span id="included-info-heading2">₱{parseFloat(booking.total_price).toLocaleString()}</span></p>
        </div>

        <div className="included-info">
          <p id="included-info-heading4" >Pickup and Dropoff <MapPinned color="#02a4d1" /></p>
          <p id="included-info-heading3">Pickup: <b className="font-semibold">{booking.pickup_location}</b> at {booking.pickup_time}</p>
          <p id="included-info-heading3">Dropoff: <b className="font-semibold">{booking.dropoff_location}</b> at {booking.dropoff_time}</p>
        </div>

        <div className="included-info">
          <p id="included-info-heading4">{vehicle.brand} {vehicle.model} <Bike color="#02a4d1" /></p>
          <p id="included-info-heading3">{vehicle.type}</p>
          <p id="included-info-heading3">{vehicle.year}</p>
          <p id="included-info-heading3">{vehicle.color}</p>
          <p id="included-info-heading3">{vehicle.transmission}</p>
        </div>
      </div>
      
      {/* <div className="booking-detail-info"> */}
      <div className="included-info1">
            <p id="included-info-heading4">Tips for a smooth ride</p>
            <p id="included-info-heading2">Things to keep in mind</p>
            <div className="included policies">
              <div className="included-item">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  width="36"
                  height="36"
                  color="#212529"
                  fill="none"
                >
                  <path
                    d="M8.5 18C10.3135 16.0463 13.667 15.9543 15.5 18M13.9406 12C13.9406 13.1046 13.0688 14 11.9934 14C10.918 14 10.0462 13.1046 10.0462 12C10.0462 10.8954 10.918 10 11.9934 10C13.0688 10 13.9406 10.8954 13.9406 12Z"
                    stroke="currentColor"
                    stroke-width="1.5"
                    stroke-linecap="round"
                  />
                  <path
                    d="M9.5 4.00195C6.85561 4.01181 5.44101 4.10427 4.52513 4.97195C3.5 5.94312 3.5 7.5062 3.5 10.6324V15.3692C3.5 18.4954 3.5 20.0584 4.52513 21.0296C5.55025 22.0008 7.20017 22.0008 10.5 22.0008H13.5C16.7998 22.0008 18.4497 22.0008 19.4749 21.0296C20.5 20.0584 20.5 18.4954 20.5 15.3692V10.6324C20.5 7.5062 20.5 5.94312 19.4749 4.97195C18.559 4.10427 17.1444 4.01181 14.5 4.00195"
                    stroke="currentColor"
                    stroke-width="1.5"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                  <path
                    d="M9.77216 3.63163C9.8681 3.21682 9.91608 3.00942 10.0082 2.84004C10.2229 2.44546 10.6188 2.15548 11.0914 2.0467C11.2943 2 11.5296 2 12 2C12.4704 2 12.7057 2 12.9086 2.0467C13.3812 2.15548 13.7771 2.44545 13.9918 2.84004C14.0839 3.00942 14.1319 3.21682 14.2278 3.63163L14.3111 3.99176C14.4813 4.72744 14.5664 5.09528 14.438 5.37824C14.3549 5.5615 14.2132 5.71842 14.031 5.82911C13.7496 6 13.3324 6 12.4981 6H11.5019C10.6676 6 10.2504 6 9.96901 5.82911C9.78677 5.71842 9.6451 5.5615 9.56197 5.37824C9.43361 5.09528 9.51869 4.72744 9.68886 3.99176L9.77216 3.63163Z"
                    stroke="currentColor"
                    stroke-width="1.5"
                  />
                </svg>
                <p>
                  {" "}
                  Plan Your Route{" "}
                  <span id="policy-bold">Know your destination and check for road conditions.</span>
                </p>
              </div>
              <div className="included-item">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  width="36"
                  height="36"
                  color="#212529"
                  fill="none"
                >
                  <path
                    d="M22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12Z"
                    stroke="currentColor"
                    stroke-width="1.5"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                  <path
                    d="M19 14C16.5 14.5 14.5 16.5 14 19"
                    stroke="currentColor"
                    stroke-width="1.5"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                  <path
                    d="M5 14C7.5 14.5 9.5 16.5 10 19"
                    stroke="currentColor"
                    stroke-width="1.5"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                  <path
                    d="M19 11C16.8847 10.3593 14.5097 10 12 10C9.49033 10 7.11528 10.3593 5 11"
                    stroke="currentColor"
                    stroke-width="1.5"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                  <path
                    d="M12.009 14H12"
                    stroke="currentColor"
                    stroke-width="3"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                </svg>
                <p>
                  {" "}
                  Check the weather{" "}
                  <span id="policy-bold">Avoid unpleasant surprises by preparing for rain or extreme heat.</span>
                </p>
              </div>
              <div className="included-item">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  width="36"
                  height="36"
                  color="#212529"
                  fill="none"
                >
                  <path
                    d="M4 3V21M20 3V21"
                    stroke="currentColor"
                    stroke-width="1.5"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                  <path
                    d="M9.66101 16.8652C10.6709 14.9551 11.1759 14 12 14C12.8241 14 13.3291 14.9551 14.339 16.8652L15.0267 18.166C15.8023 19.6329 16.1901 20.3664 15.9082 20.7191C15.8324 20.8139 15.7325 20.8921 15.6163 20.9476C15.1841 21.1541 14.3908 20.7381 12.8043 19.9062C12.4524 19.7216 12.2764 19.6294 12.084 19.6129C12.0281 19.6081 11.9719 19.6081 11.916 19.6129C11.7236 19.6294 11.5476 19.7216 11.1957 19.9062C9.60915 20.7381 8.81587 21.1541 8.38372 20.9476C8.26754 20.8921 8.16764 20.8139 8.09184 20.7191C7.80989 20.3664 8.19769 19.6329 8.97329 18.166L9.66101 16.8652Z"
                    stroke="currentColor"
                    stroke-width="1.5"
                  />
                  <path
                    d="M12 3V5"
                    stroke="currentColor"
                    stroke-width="1.5"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                  <path
                    d="M12 9V11"
                    stroke="currentColor"
                    stroke-width="1.5"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                </svg>
                <p>
                  {" "}
                  Stay Hydrated{" "}
                  <span id="policy-bold">Bring water, especially for long rides.</span>
                </p>
              </div>
              <div className="included-item">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  width="36"
                  height="36"
                  color="#212529"
                  fill="none"
                >
                  <path
                    d="M12 22C6.47715 22 2 17.5228 2 12C2 9.20746 3.14465 6.68227 4.99037 4.86802M12 22C11.037 21.2864 11.1907 20.4555 11.6738 19.6247C12.4166 18.3474 12.4166 18.3474 12.4166 16.6444C12.4166 14.9414 13.4286 14.1429 17 14.8571C18.6047 15.1781 19.7741 12.9609 21.8573 13.693M12 22C16.9458 22 21.053 18.4096 21.8573 13.693M21.8573 13.693C21.9511 13.1427 22 12.5771 22 12C22 7.11857 18.5024 3.05405 13.8766 2.17579M13.8766 2.17579C14.3872 3.11599 14.1816 4.23551 13.1027 4.66298C11.3429 5.3603 12.6029 6.64343 11.1035 7.4356C10.1038 7.96372 8.6044 7.83152 7.10496 6.24716C6.31517 5.41264 5.83966 4.95765 4.99037 4.86802M13.8766 2.17579C13.2687 2.06039 12.6414 2 12 2C9.26969 2 6.79495 3.09421 4.99037 4.86802"
                    stroke="currentColor"
                    stroke-width="1.5"
                    stroke-linejoin="round"
                  />
                </svg>
                <p>
                  {" "}
                  Pack Light{" "}
                  <span id="policy-bold">If you're traveling, ensure your luggage is manageable for a motorcycle ride.</span>
                </p>
              </div>

            </div>
          </div>
      {/* </div> */}

      </div>
      <Footer />
    </>
  );
}

export default BookingInformation;
