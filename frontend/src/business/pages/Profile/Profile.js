import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Dashboard from '../Dashboard/Dashboard';
import './Profile.css';
import { Link } from 'react-router-dom';
import { Contact, Car, IdCard, Phone, Mail } from 'lucide-react';
import { jwtDecode } from 'jwt-decode'; 
import { NotificationManager } from 'react-notifications';

const Profile = () => {
  const token = localStorage.getItem('authToken');

  const [selectedImage, setSelectedImage] = useState(null);
  const [selectedImage1, setSelectedImage1] = useState(null);
  const [selectedImage2, setSelectedImage2] = useState(null);
  const [selectedImage3, setSelectedImage3] = useState(null);
  if (token) {
    const decoded = jwtDecode(token);
    console.log('Decoded Token:', decoded);
  }

  const userID = token ? jwtDecode(token).user_id : null;

  const [user, setUser] = useState(null); 
  const [formData, setFormData] = useState({
    first_name: '',
    last_name: '',
    email: '',
    phone_number: '',
    registration_status: ''
  });
  useEffect(() => {
    axios
      .get(`http://localhost:3000/users/${userID}`)
      .then((res) => {
        setUser(res.data);
        setFormData({
          first_name: res.data.first_name,
          last_name: res.data.last_name,
          email: res.data.email,
          phone_number: res.data.phone_number,
          registration_status: res.data.registration_status
        });
      })
      .catch((err) => {
        console.error("Error fetching user:", err);
      });
  }, [userID]);
  
  // document shizz
  const [document, setDocument] = useState(null); 
const [formData1, setFormData1] = useState({
  tin: '',
  business_permit: '',
  cor: ''
});

useEffect(() => {
  axios
    .get(`http://localhost:3000/businessdocuments/business/${userID}`)
    .then((res) => {
      // Check if response contains any documents
      if (res.data.length > 0) {
        const doc = res.data[0]; // Get the first document
        setDocument(doc); // Set the document state
        setFormData1({
          tin: doc.tin,
          business_permit: doc.business_permit,
          cor: doc.cor
        });
      }
    })
    .catch((err) => {
      console.error("Error fetching user:", err);
    });
}, [userID]);


  const handleRequirements = async (e) => {
    e.preventDefault();
  

    if (!userID) {
      alert('User ID is missing or invalid.');
      return;
    }
  
    // Create a FormData object and append the files
    const dataz = new FormData();
  
    if (selectedImage1) {
      dataz.append('tin', selectedImage1);
    }
  
    if (selectedImage2) {
      dataz.append('business_permit', selectedImage2);
    }
  
    if (selectedImage3) {
      dataz.append('cor', selectedImage3);
    }
  
    try {
      const response = await axios.put(
        `http://localhost:3000/businessdocuments/business/${userID}`,
        dataz,
        { headers: { 'Content-Type': 'multipart/form-data' } }
      );
      NotificationManager.success('Requirements updated successfully!', 'Success');

     
    } catch (error) {
      console.error('Error updating user:', error);
      alert('Failed to update user');
    }
  };
  


  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setSelectedImage(file);
  };

  const handleFileChange1 = (e) => {
    const file = e.target.files[0];
    setSelectedImage1(file);
  };


  const handleFileChange2 = (e) => {
    const file = e.target.files[0];
    setSelectedImage2(file);
  };

  const handleFileChange3 = (e) => {
    const file = e.target.files[0];
    setSelectedImage3(file);
  };
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    const data = new FormData();
    data.append('first_name', formData.first_name);
    data.append('last_name', formData.last_name);
    data.append('email', formData.email);
    data.append('phone_number', formData.phone_number);
    data.append('registration_status', formData.registration_status);
  
    if (selectedImage) {
      data.append('profile_pic', selectedImage);
    }
  
    try {
      const response = await axios.put(
        `http://localhost:3000/users/${userID}`,
        data,
        { headers: { 'Content-Type': 'multipart/form-data' } }
      );
      NotificationManager.success('Updated successfully!', 'Success');

    
    } catch (error) {
      console.error('Error updating user:', error);
      alert('Failed to update user');
    }
  };

  const [isExpanded, setIsExpanded] = useState(false);
  const [isExpanded1, setIsExpanded1] = useState(false);
  const [isExpanded2, setIsExpanded2] = useState(false);
  const toggleExpand = () => {
    setIsExpanded((prev) => !prev);
  };

  const toggleExpand1 = () => {
    setIsExpanded1((prev) => !prev);
  };
  const toggleExpand2 = () => {
    setIsExpanded2((prev) => !prev);
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
      <Dashboard />
      <div className="profile-body">
      <div className="profile-section1">
        <div className="profile-heading">
          <p id="booking-title" className="logout-icon">
            Account Settings
            <p className="float-right">
          
            </p>
          </p>
          <p id="subheading">Manage your information, password, and other.</p>
        </div>

        <div className="personal-info">
          <div className="profile-pic">
            <p>Profile Picture</p>
            <img src={`http://localhost:3000/${user.profile_pic}`} alt="Profile" />
          </div>

          <p className="cursor-pointer" id="included-info-heading2" onClick={() => setIsExpanded(!isExpanded)}>
            {isExpanded ? 'CLOSE' : 'CHANGE'}
          </p>
        </div>

        <form id="uploadForm" encType="multipart/form-data" className={`expandable ${isExpanded ? 'expanded' : ''}`} onSubmit={handleSubmit}>
          <p id="select-img">SELECT IMAGE</p>
          <input type="file" name="profile_pic" accept="image/*" onChange={(e) => handleFileChange(e, 'profile_pic')} />
          <button id="submit-profile" type="submit">SAVE CHANGES</button>
        </form>

        <div className="personal-info personal-deets">
          <div className="profile-pic">
            <p> Your Details</p>
            <div className="personal-information py-4">
              <div className="information-child">
                <Contact color="#616161" />
                <p>{user.first_name} {user.last_name}</p>
              </div>
              <div className="information-child">
                <Mail color="#616161" />
                <p>{user.email}</p>
              </div>
              <div className="information-child">
                <Phone color="#616161" />
                <p>{user.phone_number}</p>
              </div>
            </div>
          </div>

          <p className="cursor-pointer" id="included-info-heading2" onClick={() => setIsExpanded1(!isExpanded1)}>
            {isExpanded1 ? 'CLOSE' : 'EDIT'}
          </p>
        </div>

        <form id="uploadForm1" encType="multipart/form-data" className={`max-w-lg p-6 space-y-4 expandable1 ${isExpanded1 ? 'expanded1' : ''}`} onSubmit={handleSubmit}>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700" htmlFor="first_name">FIRST NAME</label>
              <input
                type="text"
                id="first_name"
                name="first_name"
                className="mt-1 block w-full px-3 py-2 border border-gray-300"
                value={formData.first_name}
                onChange={handleChange}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700" htmlFor="last_name">LAST NAME</label>
              <input
                type="text"
                id="last_name"
                name="last_name"
                className="mt-1 block w-full px-3 py-2 border border-gray-300"
                value={formData.last_name}
                onChange={handleChange}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700" htmlFor="email">EMAIL ADDRESS</label>
              <input
                type="email"
                id="email"
                name="email"
                className="mt-1 block w-full px-3 py-2 border border-gray-300"
                value={formData.email}
                onChange={handleChange}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700" htmlFor="phone_number">PHONE NUMBER</label>
              <input
                type="tel"
                id="phone_number"
                name="phone_number"
                className="mt-1 block w-full px-3 py-2 border border-gray-300"
                value={formData.phone_number}
                onChange={handleChange}
              />
            </div>
          </div>

      <button id="submit-profile" type="submit">SAVE CHANGES</button>
      </form>

      <div className="personal-info personal-deets">
          <div className="profile-pic">
            <p>Requirements</p>
            <div className="personal-information py-4">
              <div className="information-child">
                <IdCard color="#616161" />
                <p>
  Tax Identification Number (TIN) 
  {document ? (
    <span style={circleStyle(!!document.tin)}></span>
  ) : (
    <span>Loading...</span>
  )}
</p>


              </div>
              <div className="information-child">
                <Car color="#616161" />
                <p>
 Business Permit
  {document ? (
    <span style={circleStyle(!!document.business_permit)}></span>
  ) : (
    <span>Loading...</span>
  )}
</p>

              </div>
              <div className="information-child">
              <IdCard color="#616161" />
              <p>
  Certificate of Registration
  {document ? (
    <span style={circleStyle(!!document.cor)}></span>
  ) : (
    <span>Loading...</span>
  )}
</p>

              </div>
            </div>
          </div>

          <p className="cursor-pointer" id="included-info-heading2" onClick={() => setIsExpanded2(!isExpanded2)}>
            {isExpanded2 ? 'CLOSE' : 'UPLOAD'}
          </p>
        </div>

        <form id="uploadForm2" encType="multipart/form-data" className={`max-w-lg p-6 space-y-4 expandable2 ${isExpanded2 ? 'expanded2' : ''}`} onSubmit={handleRequirements}>
          <div className="grid grid-cols-2 gap-4">

          <div>
<label className="block text-sm font-medium text-gray-700">Tax Identification Number (TIN) </label>

<input type="file" name="tin" accept="image/*" onChange={(e) => handleFileChange1(e, 'tin')} />
</div>

<div>
<label className="block text-sm font-medium text-gray-700">Business Permit</label>
<input type="file" name="business_permit" accept="image/*" onChange={(e) => handleFileChange2(e, 'business_permit')} />
</div>
     
<div>
<label className="block text-sm font-medium text-gray-700">Certificate of Registration</label>
<input type="file" name="cor" accept="image/*" onChange={(e) => handleFileChange3(e, 'cor')} />
</div>

          </div>

      <button id="submit-requirements" type="submit">SAVE CHANGES</button>
      </form>

</div>

      </div>
    </>
  );
};

export default Profile;
