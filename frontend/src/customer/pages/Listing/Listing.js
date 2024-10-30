import React from "react";
import products from "../../../shared/db/product.json";
import "./Listing.css";
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import Filter from "../../components/Filter/Filter";
import { useNavigate } from "react-router-dom"; // Import useNavigate

const Listing = () => {
  const navigate = useNavigate();

  // Function to handle clicking on a product card
  const handleProductClick = (id) => {
    navigate(`/vehicle/${id}`); // Navigate to the dynamic vehicle route
  };

  return (
    <>
      <Header position="fixed" />
      <section className="home-1 listing-bg">
        <div className="home-1-content">
          <p id="heading-home"> Available scooters</p>
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
          {products.map((product) => (
            <div
              className="card shadow"
              key={product.id}
              onClick={() => handleProductClick(product.id)}
            >
              <img src={product.imageSrc} alt={product.productName} />
              <h3>{product.productName}</h3>
              <div className="product-info">
                <p id="price">
                  ₱{product.price}/day
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Listing;
