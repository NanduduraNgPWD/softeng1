import "./Partner.css";
import Button from "../../components/Button/Button";
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import { Link } from "react-router-dom";
import React from "react";


const Partner = () => {
  return (
    <div className="partner-body">
       <Header/>
       <section className="home-1 listing-bg2">
        <div className="partner-head">
        <p id="heading-partner">
        List your motorbikes in our <br></br>website for free
        </p>
        <Link to="/SignupBusiness">
            {" "}
            <Button text="Join now" />{" "}
          </Link>
        </div>

      </section>
      <section className="home-3 partner-home">
      <div className="home-5-container contact-content-info">
          <div className="home-5-box contact-text partner-text">
            <h1>1</h1>
            <h6 id="contact-information">Create an account</h6>
            <p>It takes 5 minutes to set up an account.</p>
          </div>
          <div className="home-5-box contact-text partner-text">
           
          <h1>2</h1>
            <h6 id="contact-information">List your bike</h6>
            <p>Set your prices and provide information about your bike.</p>
            
          </div>
          <div className="home-5-box contact-text partner-text">
          <h1>3</h1>
            <h6 id="contact-information">Get online bookings</h6>
            <p>No hidden charges and fees, only pay commission.</p>
          </div>
        </div>
        </section>    

<div className="partner-content1">
    <img src="/images/sample.png"></img>
    <div className="partner-content-text">
      <h1 className="text-2xl ">Manage your fleet hassle-free</h1>
      <p> Lorem ipsum dolor sit amet, consectetur adipiscing elit. sce eu diam nec tortor vulputate auctor at ac ante. Phasellus sapien nunc, vulputate non porta quis, posuere et metus. Nunc viverra vel ante eget vehicula. Curabitur in imperdiet turpis</p>
    </div>
</div>
       <Footer/>
    </div>
  )
}

export default Partner;
