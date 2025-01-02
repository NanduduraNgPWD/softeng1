import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom"; // To get the booking ID from the URL
import axios from "axios";
import Dashboard from "../Dashboard/Dashboard";
import "./Overview.css";
import { jwtDecode } from 'jwt-decode';
function Overview() {

  const token = localStorage.getItem('authToken');
  
  if (token) {
    const decoded = jwtDecode(token);
    console.log('Decoded Token:', decoded);
  }
  const placeholderOwnerId = token ? jwtDecode(token).user_id : null;

  const [data, setData] = useState([]);
  
  const [totalBookings, setTotalBookings] = useState(0);
  const [activeBookings, setActiveBookings] = useState(0);
  const [pendingBookings, setPendingBookings] = useState(0);
  const [pastActive, setPastActiveBookings] = useState(0);
  const [upcomingBookings, setUpcomingBookings] = useState(0);
  console.log("placeholderOwnerId:", placeholderOwnerId);

  const calculateDaysLeft = (endDateString) => {
    const today = new Date();
    const endDate = new Date(endDateString);
  
    // Calculate the difference in time (in milliseconds)
    const timeDifference = endDate - today;
  
    // Convert milliseconds to days
    const daysLeft = Math.floor(timeDifference / (1000 * 3600 * 24));
  
    // Return the number of days left
    return daysLeft;
  };
  useEffect(() => {
    if (!placeholderOwnerId) return; // Ensure owner ID is defined
  
    axios
      .get(`http://localhost:3000/bookings/owner/${placeholderOwnerId}`)
      .then((res) => {
        const fetchedBookings = Array.isArray(res.data) ? res.data : [];
        console.log("Fetched Bookings:", fetchedBookings);
  
        const ownerBookings = fetchedBookings.filter(
          (booking) => booking.owner_id === Number(placeholderOwnerId) // Ensure type match
        );
  
        console.log("Owner Bookings:", ownerBookings);
  
        setData(ownerBookings);
  
        // Calculate totals
        const calculateBookings = (status) =>
          ownerBookings.filter((booking) => booking.rental_status === status).length; // Match rental_status in the database
        const total = calculateBookings('Completed');
        const active = calculateBookings('Ongoing');
        const pending = calculateBookings('Pending');
        const upcoming = calculateBookings('Upcoming');
  
       
        const activePastEndDate = ownerBookings.filter(
          (booking) =>
            booking.rental_status === 'Completed' && 
            booking.returned_status === 'Pending'
        ).length;
        
  
        setTotalBookings(total);
        setActiveBookings(active);
        setPendingBookings(pending);
        setUpcomingBookings(upcoming);
        setPastActiveBookings(activePastEndDate);
      })
      .catch((err) =>
        console.error("Error fetching bookings:", err?.response?.data || err)
      );
  }, [placeholderOwnerId]);
  
  console.log("Total Bookings:", totalBookings);
  console.log("Active Bookings:", activeBookings);
  console.log("Pending Bookings:", pendingBookings);
  console.log("Upcoming Bookings:", upcomingBookings);
  console.log("Past Active:", pastActive);
  


  
  const [subscription, setSubscription] = useState(null);
  const [formData, setFormData] = useState({
    user_id: '',
    plan_name: '',
    start_date: '',
    end_date: '',
    status: '',
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get(`http://localhost:3000/subscriptions/user/${placeholderOwnerId}`)
      .then((res) => {
        if (res.data.length > 0) {  // Ensure there is at least one subscription
          const subscriptionData = res.data[0];  // Get the first subscription in the array
          setSubscription(subscriptionData);  // Set subscription state
          setFormData({
            user_id: subscriptionData.user_id,
            plan_name: subscriptionData.plan_name,
            start_date: subscriptionData.start_date,
            end_date: subscriptionData.end_date,
            status: subscriptionData.status,
          });
        }
        console.log("API Response:", res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error('Error fetching user:', err);
        setLoading(false);
      });
  }, [placeholderOwnerId]);

    
  if (loading) {
    return <p>Loading...</p>; // Show a loading state while fetching
  }


  

  return (
    <>
  <Dashboard/>
  <div className="booking-body my-12 mx-auto">
<p id="booking-title">Dashboard</p>
<p id="pastbooking">OVERVIEW</p>

<div className="overview-container">
<div className="overview-grid">
<Link to="/business/Inventory">      <div className="grid-item">
          <h3>Motorcycles Listed</h3>
          <p> 1</p>
        </div> </Link>
        <div className="grid-item">
          <h3>Completed Bookings</h3>
          <p> {totalBookings}</p>
        </div>
        <div className="grid-item">
          <h3>Pending Approval</h3>
          <p> {pendingBookings}</p>
        </div>
        <Link to="/business/bookings">   <div className="grid-item">
          <h3>Active Bookings</h3>
          <p>{activeBookings}</p>
        </div>
        </Link>
        <Link to="/business/bookings">    <div className="grid-item">
          <h3>Upcoming Bookings</h3>
          <p>{upcomingBookings}</p>
        </div> </Link>
        <Link to="/business/bookings">      <div className="grid-item warning">
          <h3>To be marked as complete</h3>
          <p>{pastActive}</p>
          {pastActive > 0 && (
            <div className="warning-sign">⚠️</div>
          )}
        </div> </Link>
      </div>

      
</div>

<p id="booking-title">Subscription</p>
<Link to="/business/subscription"> <p id="pastbooking">VIEW</p> </Link>
<div className="overview-grid">
  
<Link to="/business/subscription">    {subscription ? (
    // If subscription exists, display the subscription info
    <div className="grid-item">
      <h3>
        <span className="allcaps">{subscription.plan_name}</span> PLAN
      </h3>
      <p><span className="text-sm">{calculateDaysLeft(subscription.end_date)} days left</span></p>
    </div>
  ) : (
    // If no subscription, display a fallback message
    <div className="grid-item">
    <h3>No active subscription.</h3>
    </div>
  )}  </Link>

        <div className="grid-item2">

        </div>

        <div className="grid-item2">
       
        </div>

        <div className="grid-item2">
        
        </div>
        </div>
</div>


    </>
  );
}

export default Overview;
