  import React, { useState, useEffect } from "react";
  import { useParams, Link } from "react-router-dom"; // To get the booking ID from the URL
  import axios from "axios";
  import Dashboard from "../Dashboard/Dashboard";
  import "./Overview.css";
  import { jwtDecode } from 'jwt-decode';
  import { BadgeCheck } from "lucide-react";

  import { NotificationManager } from 'react-notifications';
  function Subscription() {
    const token = localStorage.getItem('authToken');
    const [loading, setLoading] = useState(true);
  
  
    if (token) {
      const decoded = jwtDecode(token);
      console.log('Decoded Token:', decoded);
    }
    const userID = token ? jwtDecode(token).user_id : null;
    // Calculate the end date (3 months after today)
    const calculateEndDate = () => {
      const today = new Date();
      const endDate = new Date(today);
      endDate.setMonth(today.getMonth() + 3); // Add 3 months to current date
      return endDate.toISOString(); // Return the date as an ISO string
    };


  // POST function to add subscription
  const handleSubscribe = () => {
    const today = new Date().toISOString(); // Get today's date in ISO format
    const subscriptionData = {
      user_id: userID,
      plan_name: "Free",
      start_date: today,
      end_date: calculateEndDate(), // 3 months from today
      status: "active",
    };

    setLoading(true); // Start loading

    // Make the POST request
    axios
      .post("http://localhost:3000/subscriptions", subscriptionData)
      .then((response) => {
        setLoading(false);
        console.log("Subscription added:", response.data);
        NotificationManager.success('You have been subscribed to the Free Plan', 'Success');
      })
      .catch((error) => {
        setLoading(false);
        console.error("Error adding subscription:", error);
        alert("An error occurred while subscribing. Please try again.");
      });
  };


    const [subscription, setSubscription] = useState(null);
    const [formData, setFormData] = useState({
      user_id: '',
      plan_name: '',
      start_date: '',
      end_date: '',
      status: '',
    });

    useEffect(() => {
      axios
        .get(`http://localhost:3000/subscriptions/user/${userID}`)
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
    }, [userID]);
    
  
    if (loading) {
      return <p>Loading...</p>; // Show a loading state while fetching
    }
  
    
    // if (!subscription) {
    //   return <p>No subscription data available.</p>; // Handle case where subscription is null
    // }
  
    return (
      <>
        <Dashboard />
        <div className="booking-body my-12 mx-auto">
          <p id="booking-title">Subscription</p>
  
          <div></div>
          <div className="overview-grid1 wew1">
          <div className="grid-item1">
  <h3 className="text-xl">
    <BadgeCheck size="36" color="#2196F3" /> Free Plan
  </h3>
  <h3>Up to 2 Listings</h3>
  <h3>3 months</h3>
  <h3 className="price">Free</h3>

  {subscription && subscription.plan_name === "free" && subscription.status === "active" ? (
    <button className="subscribebtn subscribed-btn" disabled>
      Subscribed
    </button>
  ) : (
    <button
      className="subscribebtn"
      onClick={handleSubscribe}
      disabled={loading} // Disable the button while loading
    >
      {loading ? "Subscribing..." : "Subscribe"}
    </button>
  )}
</div>

            <div className="grid-item1">
              <h3 className="text-xl">
                <BadgeCheck size="36" color="#4CAF50" /> Basic Plan
              </h3>
              <h3>Up to 6 Listings</h3>
              <h3>6 months</h3>
              <h3 className="price">₱999</h3>
             <Link to={"/business/SubscriptionPage"}> <button className="subscribebtn">Subscribe</button></Link>
            </div>
            <div className="grid-item1">
              <h3 className="text-xl">
                <BadgeCheck size="36" color="#FFD700" /> Premium Plan
              </h3>
              <h3>No limit</h3>
              <h3>12 months</h3>
              <h3 className="price">₱1799</h3>
              <button className="subscribebtn">Subscribe</button>
            </div>
          </div>
        </div>
      </>
    );
  }
  
  export default Subscription;
  