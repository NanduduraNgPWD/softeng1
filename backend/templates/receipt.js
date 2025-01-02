const generateReceiptHTML = ({
    customerName,
    bookingId,
    totalPrice,
    rentalStartDate,
    rentalEndDate,
    pickupLocation,
    dropoffLocation,
  }) => `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #ddd;">
      <h1 style="text-align: center; color: #02a4d1;">Booking Confirmation</h1>
      <p>Hi ${customerName},</p>
      <p>Your booking has been successfully accepted. Here are the details:</p>
      
      <h2>Booking Details</h2>
      <ul>
        <li><strong>Booking ID:</strong> ${bookingId}</li>
        <li><strong>Total Price:</strong> $${totalPrice}</li>
        <li><strong>Rental Dates:</strong> ${rentalStartDate} to ${rentalEndDate}</li>
        <li><strong>Pickup Location:</strong> ${pickupLocation}</li>
        <li><strong>Dropoff Location:</strong> ${dropoffLocation}</li>
      </ul>
  
      <p>Thank you for booking with us!</p>
      <p style="text-align: center;">&copy; ${new Date().getFullYear()} Your Business Name</p>
    </div>
  `;
  
  module.exports = generateReceiptHTML;
  