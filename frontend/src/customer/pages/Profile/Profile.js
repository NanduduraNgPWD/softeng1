import "./About.css";
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import React, {useState, useEffect} from 'react';
import axios from "axios";
import { Contact, Car, IdCard, Phone, Mail } from 'lucide-react';
function Profile() {

  // Placeholder 
  const userID = 4;
  const [user, setUser] = useState(null); 

 
  useEffect(() => {
    axios
      .get(`http://localhost:3000/users/${userID}`)
      .then((res) => {
        setUser(res.data); 
      })
      .catch((err) => {
        console.error("Error fetching user:", err);
      });
  }, [userID]);


  const [isExpanded, setIsExpanded] = useState(false);
  const [isExpanded1, setIsExpanded1] = useState(false);
  const toggleExpand = () => {
    setIsExpanded((prev) => !prev);
};
const toggleExpand1 = () => {
  setIsExpanded1((prev) => !prev);
};

if (!user) {
  return <p>Loading user profile...</p>;
}

const circleStyle = (isProvided) => ({
  width: "12px",
  height: "12px",
  borderRadius: "50%",
  backgroundColor: isProvided ? "green" : "red",
  display: "inline-block",
  marginLeft: "10px",
});
  return (
    <>
      <Header position="relative" />

      <div className="profile-body">
<div className="profile-section1">

<div className="profile-heading">
          <p id="booking-title">Account Settings</p>
          <p id="subheading">Manage your personal information, password, and other.</p>

        </div>

        <div className="personal-info">
            <div className="profile-pic">
              <p>Profile Picture</p>
              <img src={"/images/dummypp.jpg"} alt="" />
            </div>

            <p className="cursor-pointer" id="included-info-heading2" onClick={toggleExpand}>{isExpanded ? "CLOSE" : "CHANGE"}</p>
        </div>

        <form id="uploadForm" enctype="multipart/form-data" className={`expandable ${isExpanded ? "expanded" : ""}`} >
        <p id="select-img">
          SELECT IMAGE
        </p>
        <input type="file" name="profile_pic" accept="image/*" />
        <button id="submit-profile" type="submit">SAVE CHANGES</button>
      </form>
{/* --------------------------------------------------------------------------------------------------- */}
      <div className="personal-info personal-deets">
            <div className="profile-pic">
              <p >Personal Details</p>

                <div className="personal-information py-4">
                  <div className="information-child">
                  <Contact color="#616161" />
                    <p> {user.name}</p>
                  </div>
                  <div className="information-child">
                  <Mail color="#616161" />
                    <p> {user.email}</p>
                  </div>
                  <div className="information-child">
                  <Phone color="#616161" />
                    <p> {user.phone_number}</p>
                  </div>
                  <div className="information-child">
                  <IdCard color="#616161" />
                    <p> Valid ID <span style={circleStyle(!!user.valid_id)}></span></p>

                  </div>
                  <div className="information-child">
                  <Car color="#616161" />
                    <p> Driver's License <span style={circleStyle(!!user.drivers_license)}></span></p>
                  </div>
                </div>
            </div>

            <p className="cursor-pointer" id="included-info-heading2" onClick={toggleExpand1}>{isExpanded1 ? "CLOSE" : "EDIT"}</p>


        </div>
      
        <form id="uploadForm1" enctype="multipart/form-data" className={`max-w-lg p-6 space-y-4 expandable1 ${isExpanded1 ? "expanded1" : ""}`}>
      <div className="grid grid-cols-2 gap-4">
        {/* Name */}
        <div>
          <label className="block text-sm font-medium text-gray-700" htmlFor="name">
            NAME
          </label>
          <input
            type="text"
            id="name"
            name="name"
            className="mt-1 block w-full px-3 py-2 border border-gray-300 "
            value={user.name}
          />
        </div>

        {/* Email Address */}
        <div>
          <label className="block text-sm font-medium text-gray-700" htmlFor="email">
            EMAIL ADDRESS
          </label>
          <input
            type="email"
            id="email"
            name="email"
            className="mt-1 block w-full px-3 py-2 border border-gray-300 "
            value={user.email}
          />
        </div>

        {/* Phone Number */}
        <div>
          <label className="block text-sm font-medium text-gray-700" htmlFor="phone">
            PHONE NUMBER
          </label>
          <div className="flex items-center mt-1">
           
            <input
              type="tel"
              id="phone"
              name="phone"
              className="block w-full px-3 py-2 border-t border-b border-r border-gray-300 "
              value={user.phone_number}
            />
          </div>
        </div>

        <div>
        <label className="block text-sm font-medium text-gray-700" >
            VALID ID
          </label>
        <input type="file" name="valid_id" accept="image/*" />
        </div>

        <div>
        <label className="block text-sm font-medium text-gray-700">
           DRIVER'S LICENSE
          </label>
        <input type="file" name="drivers_license" accept="image/*" />
        </div>

      </div>

      <button id="submit-profile" type="submit">SAVE CHANGES</button>
      </form>
</div>

      </div>
      <Footer />
    </>
  );
}

export default Profile;
