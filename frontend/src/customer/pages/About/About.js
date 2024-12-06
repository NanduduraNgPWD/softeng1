import React, { useState } from "react";
import "./About.css";
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import {Handshake, Telescope} from 'lucide-react'
const About = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission here (e.g., send data to backend)
    console.log(formData);
  };
  return (
    <>
      <Header position="relative" />
      <section className="home-1 listing-bg3">
        <div className="contactus">
          <p id="heading-home" className="color-white">
            {" "}
            About Us{" "}
          </p>
        </div>
      </section>
      <div className="about-content">

      <div className="partner-content1">
   <div className="about-mission-vision">
   <div className="partner-content-text">
      <h1 className="text-2xl ">Mission</h1>
      <p> To provide a seamless and secure platform for customers to find and rent motorcycles conveniently from trusted businesses.</p>
    </div>
    <Handshake size={128} absoluteStrokeWidth />
   </div>
</div>

<div className="partner-content12 ">
<div className="about-mission-vision">
<Telescope size={128} absoluteStrokeWidth />
    <div className="partner-content-text">
      <h1 className="text-2xl my-8">Vision</h1>
      <p> To become the leading online hub for motorcycle rentals, fostering accessibility and reliability in the rental industry.</p>
    </div>
    </div>
</div>

<section className="home-5 my-20">
          <h5>Why We Are Here </h5>
          <div className="home-5-container">
            <div className="home-5-box">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                width="72"
                height="72"
                color="#1b1b1b"
                fill="none"
              >
                <circle
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  stroke-width="1.5"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
                <path
                  d="M7 9C7.20949 9.5826 7.77476 10 8.43922 10C9.10367 10 9.66894 9.5826 9.87843 9M14.1216 9C14.3311 9.5826 14.8963 10 15.5608 10C16.2252 10 16.7905 9.5826 17 9"
                  stroke="currentColor"
                  stroke-width="1.5"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
                <path
                  d="M12 17.5C10 17.5 8 16 7.5 14"
                  stroke="currentColor"
                  stroke-width="1.38889"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>
              <h6>Empowering Renters</h6>
              <p>
              To provide a user-friendly platform that connects customers with reliable motorcycle rental services.
              </p>
            </div>
            <div className="home-5-box">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                width="72"
                height="72"
                color="#1b1b1b"
                fill="none"
              >
                <circle
                  cx="12"
                  cy="4"
                  r="2"
                  stroke="currentColor"
                  stroke-width="1.5"
                />
                <path
                  d="M10 4H6"
                  stroke="currentColor"
                  stroke-width="1.5"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
                <path
                  d="M18 4H14"
                  stroke="currentColor"
                  stroke-width="1.5"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
                <path
                  d="M9 20C7.6725 19.9645 6.90036 19.8282 6.42177 19.3045C5.77472 18.5965 5.9693 17.5144 6.35847 15.35L6.96989 11.9497C7.21514 10.5857 7.33777 9.90371 7.69445 9.38625C8.0453 8.87725 8.55358 8.47814 9.15294 8.24104C9.76224 8 10.5082 8 12 8C13.4918 8 14.2378 8 14.8471 8.24104C15.4464 8.47814 15.9547 8.87725 16.3056 9.38625C16.6622 9.90371 16.7849 10.5857 17.0301 11.9497L17.6415 15.35C18.0307 17.5144 18.2253 18.5965 17.5782 19.3045C17.1018 19.8258 16.3345 19.9636 15.018 20"
                  stroke="currentColor"
                  stroke-width="1.5"
                  stroke-linecap="round"
                />
                <path
                  d="M12 18V22"
                  stroke="currentColor"
                  stroke-width="1.5"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>
              <h6>Supporting Businesses</h6>
              <p>To help rental businesses reach a wider audience and grow their operations.</p>
            </div>
            <div className="home-5-box">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                width="72"
                height="72"
                color="#1b1b1b"
                fill="none"
              >
                <path
                  d="M21.5 11.0288C21.8239 11.8026 22 12.6342 22 13.5C22 15.5586 21.0047 17.4235 19.3933 18.7788C19.1517 18.982 19 19.2762 19 19.5919V22H17L16.2062 20.8674C16.083 20.6916 15.8616 20.6153 15.6537 20.6687C13.9248 21.1132 12.0752 21.1132 10.3463 20.6687C10.1384 20.6153 9.91703 20.6916 9.79384 20.8674L9 22H7V19.6154C7 19.2866 6.83835 18.9788 6.56764 18.7922C5.49285 18.0511 2 16.6014 2 15.0582V13.5C2 12.9083 2.44771 12.4286 3 12.4286C3.60665 12.4286 4.10188 12.1929 4.30205 11.5661C5.06912 9.16411 7.23085 7.23604 10.0206 6.42073"
                  stroke="currentColor"
                  stroke-width="1.5"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
                <path
                  d="M14.125 9.5L14.125 3.5M16 3.5V2M16 11V9.5M14.125 6.5H17.875M17.875 6.5C18.4963 6.5 19 7.00368 19 7.625V8.375C19 8.99632 18.4963 9.5 17.875 9.5H13M17.875 6.5C18.4963 6.5 19 5.99632 19 5.375V4.625C19 4.00368 18.4963 3.5 17.875 3.5H13"
                  stroke="currentColor"
                  stroke-width="1.5"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
                <path
                  d="M7.49981 12H7.50879"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>
              <h6>Fostering Trust</h6>
              <p>
              To ensure secure and transparent transactions between customers and rental providers.
              </p>
            </div>
          </div>
        </section>

      </div>
      <Footer />
    </>
  );
};

export default About;
