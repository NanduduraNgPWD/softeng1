import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import products from "../../../shared/db/product.json";
import "./VehicleDetail.css";
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";

// import Calendaryo from "../../components/Calendar/Calendar";

import "react-datepicker/dist/react-datepicker.css"; // Import the default Calendar styles
import DatePicker from "react-datepicker";

const VehicleDetail = () => {
  const { id } = useParams();

  const [pickup, setPickup] = useState("08:00");
  const [dropoff, setDropoff] = useState("08:00");
  const [riding, setRiding] = useState("Alone");

  // from date
  const [selectedDate, setSelectedDate] = useState(null);
  // to date
  const [selectedDate1, setSelectedDate1] = useState(null);
  // Find the product with the matching ID

  //get vehicles info
  const vehicle = products.find((product) => product.id === Number(id));

  //pricing calculate
  const [totalPrice, setTotalPrice] = useState(0);
  const pricePerDay = vehicle.price;

  useEffect(() => {
    if (selectedDate && selectedDate1) {
      const rentalDays = Math.ceil(
        (selectedDate1 - selectedDate) / (1000 * 60 * 60 * 24)
      ); // Calculate days
      if (rentalDays > 0) {
        setTotalPrice(rentalDays * pricePerDay); // Update total price
      } else {
        setTotalPrice(0); // Reset if dates are invalid
      }
    }
  }, [selectedDate, selectedDate1]);
  //pricing calculate

  if (!vehicle) {
    return <p>Vehicle not found</p>;
  }
  return (
    <>
      <Header color="white" position="fixed" />

      <div className="view-container">
        <div className="vehicle-detail">
          <img src={vehicle.imageSrc} alt={vehicle.productName} />
          <p id="productName">{vehicle.productName}</p>
          <p id="type"> {vehicle.type}</p>
          <div className="vehicle-detail-text">
            <p>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                width="24"
                height="24"
                color="#02a4d1"
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
              {vehicle.brand}
            </p>
            <p>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                width="24"
                height="24"
                color="#02a4d1"
                fill="none"
              >
                <path
                  d="M9.37866 3.83307L9.21729 2.88021C9.14611 2.45991 9.11052 2.24976 8.95858 2.12488C8.80664 2 8.58655 2 8.14636 2H7.85617C7.41598 2 7.19589 2 7.04395 2.12488C6.89202 2.24976 6.85643 2.45991 6.78525 2.88021L6.62387 3.83307C6.28266 3.96639 5.96616 4.14778 5.68298 4.36874L4.7826 4.03678C4.3673 3.88367 4.15966 3.80712 3.97059 3.87291C3.78152 3.93869 3.67182 4.12567 3.45243 4.49963L3.29194 4.77319C3.07837 5.13722 2.97159 5.31924 3.00653 5.50636C3.04146 5.69349 3.20731 5.82785 3.53901 6.09658L4.30581 6.7178C4.28019 6.89156 4.26694 7.06926 4.26694 7.25C4.26694 7.4314 4.28029 7.60974 4.30609 7.7841L3.5411 8.40386C3.2094 8.67259 3.04355 8.80695 3.00861 8.99408C2.97367 9.1812 3.08046 9.36322 3.29402 9.72725L3.45451 10.0008C3.6739 10.3748 3.7836 10.5617 3.97267 10.6275C4.16174 10.6933 4.36939 10.6168 4.78468 10.4637L5.68403 10.1321C5.96694 10.3527 6.28308 10.5338 6.62387 10.6669L6.78524 11.6198C6.85643 12.0401 6.89202 12.2502 7.04395 12.3751C7.19589 12.5 7.41598 12.5 7.85617 12.5H8.14636C8.58655 12.5 8.80664 12.5 8.95858 12.3751C9.11051 12.2502 9.14611 12.0401 9.21729 11.6198L9.37866 10.6669C9.71912 10.5339 10.035 10.353 10.3177 10.1327L11.2153 10.4637C11.6306 10.6168 11.8383 10.6933 12.0273 10.6275C12.2164 10.5617 12.3261 10.3748 12.5455 10.0008L12.706 9.72725C12.9195 9.36322 13.0263 9.1812 12.9914 8.99408C12.9565 8.80695 12.7906 8.67259 12.4589 8.40386L11.6962 7.78593C11.7221 7.61099 11.7356 7.43204 11.7356 7.25C11.7356 7.06862 11.7222 6.89031 11.6965 6.71597L12.461 6.09658C12.7927 5.82785 12.9585 5.69349 12.9935 5.50636C13.0284 5.31924 12.9216 5.13722 12.7081 4.77319L12.5476 4.49963C12.3282 4.12567 12.2185 3.93869 12.0294 3.87291C11.8403 3.80712 11.6327 3.88367 11.2174 4.03678L10.3187 4.3681C10.0358 4.14743 9.71954 3.96626 9.37866 3.83307Z"
                  stroke="currentColor"
                  stroke-width="1.5"
                  stroke-linejoin="round"
                />
                <path
                  d="M17.3787 13.3331L17.2173 12.3802C17.1461 11.9599 17.1105 11.7498 16.9586 11.6249C16.8066 11.5 16.5866 11.5 16.1464 11.5H15.8562C15.416 11.5 15.1959 11.5 15.044 11.6249C14.892 11.7498 14.8564 11.9599 14.7852 12.3802L14.6239 13.3331C14.2827 13.4664 13.9662 13.6478 13.683 13.8687L12.7826 13.5368C12.3673 13.3837 12.1597 13.3071 11.9706 13.3729C11.7815 13.4387 11.6718 13.6257 11.4524 13.9996L11.2919 14.2732C11.0784 14.6372 10.9716 14.8192 11.0065 15.0064C11.0415 15.1935 11.2073 15.3279 11.539 15.5966L12.3058 16.2178C12.2802 16.3916 12.2669 16.5693 12.2669 16.75C12.2669 16.9314 12.2803 17.1097 12.3061 17.2841L11.5411 17.9039C11.2094 18.1726 11.0435 18.307 11.0086 18.4941C10.9737 18.6812 11.0805 18.8632 11.294 19.2272L11.4545 19.5008C11.6739 19.8748 11.7836 20.0617 11.9727 20.1275C12.1617 20.1933 12.3694 20.1168 12.7847 19.9637L13.684 19.6321C13.9669 19.8527 14.2831 20.0338 14.6239 20.1669L14.7852 21.1198C14.8564 21.5401 14.892 21.7502 15.044 21.8751C15.1959 22 15.416 22 15.8562 22H16.1464C16.5866 22 16.8066 22 16.9586 21.8751C17.1105 21.7502 17.1461 21.5401 17.2173 21.1198L17.3787 20.1669C17.7191 20.0339 18.035 19.853 18.3177 19.6327L19.2153 19.9637C19.6306 20.1168 19.8383 20.1933 20.0273 20.1275C20.2164 20.0617 20.3261 19.8748 20.5455 19.5008L20.706 19.2272C20.9195 18.8632 21.0263 18.6812 20.9914 18.4941C20.9565 18.307 20.7906 18.1726 20.4589 17.9039L19.6962 17.2859C19.7221 17.111 19.7356 16.932 19.7356 16.75C19.7356 16.5686 19.7222 16.3903 19.6965 16.216L20.461 15.5966C20.7927 15.3279 20.9585 15.1935 20.9935 15.0064C21.0284 14.8192 20.9216 14.6372 20.7081 14.2732L20.5476 13.9996C20.3282 13.6257 20.2185 13.4387 20.0294 13.3729C19.8403 13.3071 19.6327 13.3837 19.2174 13.5368L18.3187 13.8681C18.0358 13.6474 17.7195 13.4663 17.3787 13.3331Z"
                  stroke="currentColor"
                  stroke-width="1.5"
                  stroke-linejoin="round"
                />
                <path
                  d="M8.75 7.25C8.75 7.66421 8.41421 8 8 8C7.58579 8 7.25 7.66421 7.25 7.25C7.25 6.83579 7.58579 6.5 8 6.5C8.41421 6.5 8.75 6.83579 8.75 7.25Z"
                  stroke="currentColor"
                  stroke-width="1.5"
                  stroke-linejoin="round"
                />
                <path
                  d="M16.75 16.75C16.75 17.1642 16.4142 17.5 16 17.5C15.5858 17.5 15.25 17.1642 15.25 16.75C15.25 16.3358 15.5858 16 16 16C16.4142 16 16.75 16.3358 16.75 16.75Z"
                  stroke="currentColor"
                  stroke-width="1.5"
                  stroke-linejoin="round"
                />
              </svg>
              {vehicle.transmission}
            </p>
            <p>
              {" "}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                width="24"
                height="24"
                color="#02a4d1"
                fill="none"
              >
                <circle
                  cx="12"
                  cy="18"
                  r="3"
                  stroke="currentColor"
                  stroke-width="1.5"
                />
                <path
                  d="M12 15V10"
                  stroke="currentColor"
                  stroke-width="1.5"
                  stroke-linecap="round"
                />
                <path
                  d="M22 13C22 7.47715 17.5228 3 12 3C6.47715 3 2 7.47715 2 13"
                  stroke="currentColor"
                  stroke-width="1.5"
                  stroke-linecap="round"
                />
              </svg>
              {vehicle.mileage} km
            </p>
            <p>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                width="24"
                height="24"
                color="#02a4d1"
                fill="none"
              >
                <path
                  d="M18.9905 19H19M18.9905 19C18.3678 19.6175 17.2393 19.4637 16.4479 19.4637C15.4765 19.4637 15.0087 19.6537 14.3154 20.347C13.7251 20.9374 12.9337 22 12 22C11.0663 22 10.2749 20.9374 9.68457 20.347C8.99128 19.6537 8.52349 19.4637 7.55206 19.4637C6.76068 19.4637 5.63218 19.6175 5.00949 19C4.38181 18.3776 4.53628 17.2444 4.53628 16.4479C4.53628 15.4414 4.31616 14.9786 3.59938 14.2618C2.53314 13.1956 2.00002 12.6624 2 12C2.00001 11.3375 2.53312 10.8044 3.59935 9.73817C4.2392 9.09832 4.53628 8.46428 4.53628 7.55206C4.53628 6.76065 4.38249 5.63214 5 5.00944C5.62243 4.38178 6.7556 4.53626 7.55208 4.53626C8.46427 4.53626 9.09832 4.2392 9.73815 3.59937C10.8044 2.53312 11.3375 2 12 2C12.6625 2 13.1956 2.53312 14.2618 3.59937C14.9015 4.23907 15.5355 4.53626 16.4479 4.53626C17.2393 4.53626 18.3679 4.38247 18.9906 5C19.6182 5.62243 19.4637 6.75559 19.4637 7.55206C19.4637 8.55858 19.6839 9.02137 20.4006 9.73817C21.4669 10.8044 22 11.3375 22 12C22 12.6624 21.4669 13.1956 20.4006 14.2618C19.6838 14.9786 19.4637 15.4414 19.4637 16.4479C19.4637 17.2444 19.6182 18.3776 18.9905 19Z"
                  stroke="currentColor"
                  stroke-width="1.5"
                />
                <path
                  d="M9 12.8929C9 12.8929 10.2 13.5447 10.8 14.5C10.8 14.5 12.6 10.75 15 9.5"
                  stroke="currentColor"
                  stroke-width="1.5"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>
              {vehicle.condition}
            </p>
          </div>

          <div className="included-info">
            <p id="included-info-heading1">Included</p>
            <p id="included-info-heading2">WHO DOESN'T LOVE FREE STUFF?</p>
            <div className="included">
              <div className="included-item">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  width="28"
                  height="28"
                  color="#212529"
                  fill="none"
                >
                  <path
                    d="M19.5 8.5C18 5 14.9924 3 11.4046 3C6.21058 3 2 7.24151 2 12.4737C2 15.8912 3.79635 18.886 6.48977 20.5523C7.06928 20.9108 7.54664 21 8.22657 21H14.763C16.1727 21 17.3155 19.8807 17.3155 18.5C17.3155 17.1193 16.1727 16 14.763 16C14.3687 16 13.6311 16.1485 13.3534 15.8267C13.2038 15.6533 13.2359 15.4366 13.3 15.0031C13.7388 12.0363 16.2376 11.5 19.4564 11.5C20.2168 11.5 20.9772 10.655 21.5235 9.86188C21.9052 9.30765 22.096 9.03053 21.952 8.76527C21.808 8.5 21.4444 8.5 20.7171 8.5H19.5ZM19.5 8.5H15.0693"
                    stroke="currentColor"
                    stroke-width="1.5"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                  <path
                    d="M15.0078 18.5L14.9988 18.5"
                    stroke="currentColor"
                    stroke-width="1.5"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                </svg>
                <p> Helmet ✔</p>
              </div>
              <div className="included-item">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  width="28"
                  height="28"
                  color="#212529"
                  fill="none"
                >
                  <path
                    d="M5 9C5 5.70017 5 4.05025 6.02513 3.02513C7.05025 2 8.70017 2 12 2C15.2998 2 16.9497 2 17.9749 3.02513C19 4.05025 19 5.70017 19 9V15C19 18.2998 19 19.9497 17.9749 20.9749C16.9497 22 15.2998 22 12 22C8.70017 22 7.05025 22 6.02513 20.9749C5 19.9497 5 18.2998 5 15V9Z"
                    stroke="currentColor"
                    stroke-width="1.5"
                    stroke-linecap="round"
                  />
                  <path
                    d="M11 19H13"
                    stroke="currentColor"
                    stroke-width="1.5"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                  <path
                    d="M9 2L9.089 2.53402C9.28188 3.69129 9.37832 4.26993 9.77519 4.62204C10.1892 4.98934 10.7761 5 12 5C13.2239 5 13.8108 4.98934 14.2248 4.62204C14.6217 4.26993 14.7181 3.69129 14.911 2.53402L15 2"
                    stroke="currentColor"
                    stroke-width="1.5"
                    stroke-linejoin="round"
                  />
                </svg>
                <p> Phone holder ✔</p>
              </div>
              <div className="included-item">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  width="28"
                  height="28"
                  color="#212529"
                  fill="none"
                >
                  <path
                    d="M12.5 15L11.5 17M17 15L16 17M13.5 19L12.5 21M8 15L7 17M9 19L8 21"
                    stroke="currentColor"
                    stroke-width="1.5"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                  <path
                    d="M17.4776 8.89801L17.5 8.89795C19.9853 8.89795 22 10.8784 22 13.3214C22 14.8551 21.206 16.2065 20 17M17.4776 8.89801C17.4924 8.73611 17.5 8.57216 17.5 8.40646C17.5 5.42055 15.0376 3 12 3C9.12324 3 6.76233 5.17106 6.52042 7.93728M17.4776 8.89801C17.3753 10.0132 16.9286 11.0307 16.2428 11.8469M6.52042 7.93728C3.98398 8.17454 2 10.2745 2 12.8299C2 14.4378 2.78565 15.8652 4 16.7619M6.52042 7.93728C6.67826 7.92251 6.83823 7.91496 7 7.91496C8.12582 7.91496 9.16474 8.28072 10.0005 8.89795"
                    stroke="currentColor"
                    stroke-width="1.5"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                </svg>
                <p> Disposable Raincoat ✔</p>
              </div>
              <div className="included-item">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  width="28"
                  height="28"
                  color="#212529"
                  fill="none"
                >
                  <path
                    d="M18 2V4M6 2V4"
                    stroke="currentColor"
                    stroke-width="1.5"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                  <path
                    d="M3 8H21"
                    stroke="currentColor"
                    stroke-width="1.5"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                  <path
                    d="M2.5 12.2432C2.5 7.88594 2.5 5.70728 3.75212 4.35364C5.00424 3 7.01949 3 11.05 3H12.95C16.9805 3 18.9958 3 20.2479 4.35364C21.5 5.70728 21.5 7.88594 21.5 12.2432V12.7568C21.5 17.1141 21.5 19.2927 20.2479 20.6464C18.9958 22 16.9805 22 12.95 22H11.05C7.01949 22 5.00424 22 3.75212 20.6464C2.5 19.2927 2.5 17.1141 2.5 12.7568V12.2432Z"
                    stroke="currentColor"
                    stroke-width="1.5"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                  <path
                    d="M9.5 14.5C9.99153 13.9943 11.2998 12 12 12M14.5 14.5C14.0085 13.9943 12.7002 12 12 12M12 12V18"
                    stroke="currentColor"
                    stroke-width="1.5"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                </svg>
                <p> Pickup ✔</p>
              </div>
              <div className="included-item">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  width="28"
                  height="28"
                  color="#212529"
                  fill="none"
                >
                  <path
                    d="M18 2V4M6 2V4"
                    stroke="currentColor"
                    stroke-width="1.5"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                  <path
                    d="M3 8H21"
                    stroke="currentColor"
                    stroke-width="1.5"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                  <path
                    d="M2.5 12.2432C2.5 7.88594 2.5 5.70728 3.75212 4.35364C5.00424 3 7.01949 3 11.05 3H12.95C16.9805 3 18.9958 3 20.2479 4.35364C21.5 5.70728 21.5 7.88594 21.5 12.2432V12.7568C21.5 17.1141 21.5 19.2927 20.2479 20.6464C18.9958 22 16.9805 22 12.95 22H11.05C7.01949 22 5.00424 22 3.75212 20.6464C2.5 19.2927 2.5 17.1141 2.5 12.7568V12.2432Z"
                    stroke="currentColor"
                    stroke-width="1.5"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                  <path
                    d="M9.5 15.5C9.99153 16.0057 11.2998 18 12 18M14.5 15.5C14.0085 16.0057 12.7002 18 12 18M12 18V12"
                    stroke="currentColor"
                    stroke-width="1.5"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                </svg>
                <p> Dropoff ✔</p>
              </div>
            </div>
          </div>
          <div className="included-info ">
            <p id="included-info-heading1">Things to keep in mind</p>
            <p id="included-info-heading2">RENTAL POLICIES</p>
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
                  We require you to have atleast{" "}
                  <span id="policy-bold">1 Valid ID</span>
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
                <p> Driver's license</p>
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
                  This Motorycycle includes{" "}
                  <span id="policy-bold">unlimited mileage</span>
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
                  Pick-up and drop-off must be within{" "}
                  <span id="policy-bold">Bacolod City</span> only.
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
                  <circle
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    stroke-width="1.5"
                  />
                  <path
                    d="M11.992 15H12.001"
                    stroke="currentColor"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                  <path
                    d="M12 12L12 8"
                    stroke="currentColor"
                    stroke-width="1.5"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                </svg>
                <p>
                  {" "}
                  You must be at least{" "}
                  <span id="policy-bold">18 years old</span> to rent
                </p>
              </div>
            </div>
          </div>
          <div className="rental-reviews">
            <p id="included-info-heading1">Reviews</p>
            <p id="included-info-heading2">LET'S HEAR IT FROM THEM</p>
          </div>
        </div>

        <div className="booking-information">
          <p>Per day rental</p>
          <h2 id="totalprice">
            {totalPrice.toFixed(2)} <span id="rentalphp">php</span>
          </h2>
          <div className="rental-dates">
            <div className="date-from pickup-dropoff-content1">
              <label htmlFor="rental-dates ">FROM</label>
              <DatePicker
                minDate={new Date()}
                selected={selectedDate}
                onChange={(date) => setSelectedDate(date)}
              ></DatePicker>
            </div>
            <div className="date-to pickup-dropoff-content2">
              <label htmlFor="rental-dates">TO</label>
              <DatePicker
                minDate={selectedDate}
                selected={selectedDate1}
                onChange={(date1) => setSelectedDate1(date1)}
              ></DatePicker>
            </div>
          </div>
          <div className="pickup-dropoff">
            <div className="pickup-dropoff-content1">
              <label htmlFor="pickup">PICKUP</label>
              <input
                type="time"
                id="pickup"
                value={pickup}
                onChange={(e) => setPickup(e.target.value)}
              />
            </div>
            <div className="pickup-dropoff-content2">
              <label htmlFor="dropoff">DROPOFF</label>
              <input
                type="time"
                id="dropoff"
                value={dropoff}
                onChange={(e) => setDropoff(e.target.value)}
              />
            </div>
          </div>
          <div className="how-are-you-riding">
            <label htmlFor="riding">HOW ARE YOU RIDING?</label>
            <select
              id="riding"
              value={riding}
              onChange={(e) => setRiding(e.target.value)}
            >
              <option>Alone</option>
              <option>With a passenger</option>
            </select>
          </div>
          <button className="checkout-button">GO TO CHECKOUT</button>
          <p className="best-price">
            Best price <strong>guaranteed.</strong>
          </p>
          <div className="features">
            <p>✔ Free cancellations</p>
            <p>✔ Free amendments</p>
          </div>
        </div>
      </div>
      <div className="fucker"></div>
      <Footer />
    </>
  );
};

export default VehicleDetail;
