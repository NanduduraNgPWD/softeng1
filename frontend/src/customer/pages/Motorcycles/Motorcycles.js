import React, {useEffect, useState} from 'react'
import axios from 'axios'
import "./Listing.css";
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import Filter from "../../components/Filter/Filter";
import { useNavigate } from "react-router-dom"; // Import useNavigate

const Motorcycles = () => {
  const navigate = useNavigate();

  const [data, setData] = useState([])
  useEffect(() => {
    axios.get('http://localhost:3000/motorcycles')
      .then(res => {
        console.log(res); 
        setData(res.data || []); 
      })
      .catch(err => console.error("Error fetching motorcycles:", err));
  }, []);

  // cards
  const handleProductClick = (id) => {
    navigate(`/Motorcycles/${id}`); 
  };

  return (
    <>
      <Header position="fixed" />
      <section className="home-1 listing-bg">
        <div className="home-1-content">
          <p id="heading-home">Available scooters</p>
          <p id="text-home">
            A peer-to-peer rental platform exclusive to the City of Bacolod. We
            want you to have an enjoyable experience when renting a motorcycle.
            By implementing a decentralized platform, everyone can rent and
            provide rental services!
          </p>
        </div>
      </section>
      <div className="listing-content">
        <div className="listing-filter">
          <Filter />
        </div>
  
        <div className="product-list">
          {data?.length > 0 ? (
     
            data
              .filter((motorcycle) => motorcycle.is_available === 1)
              .map((motorcycle, index) => (
                <div
                  className="card shadow"
                  key={index}
                  onClick={() => handleProductClick(motorcycle.motorcycle_id)}
                >
                  <img src="/images/dummy.png" alt="Motorcycle Image"></img>
                  <h3>{motorcycle.brand} {motorcycle.model}</h3>
                  <div className="product-info">
                    <p>{motorcycle.year} - {motorcycle.color}</p>
                    <p id="price">₱{motorcycle.price_per_day}/day</p>
                  </div>
                </div>
              ))
          ) : (
            <p>Loading motorcycles...</p>
          )}
        </div>
      </div>
      <Footer />
    </>
  );
  
};

export default Motorcycles;
