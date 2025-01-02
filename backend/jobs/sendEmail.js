const schedule = require('node-schedule');
const db = require('../db/dbConfig');
const nodemailer = require('nodemailer');


schedule.scheduleJob('0 0 * * *', async () => {
    try {
      // Fetch overdue bookings
      const [overdueBookings] = await db.query(
        `SELECT b.*, u.name, u.email, u.phone_number
         FROM bookings b
         JOIN users u ON b.customer_id = u.user_id
         WHERE b.returned_status = 'Pending'
         AND b.rental_status = 'Completed'
         AND b.rental_end_date < NOW()
`
      );
  
      for (const booking of overdueBookings) {
        // Send email to authorities
        await sendEmail(booking);
  
      }
    } catch (error) {
      console.error('Error in automated email job:', error);
    }
  });
  
  // Function to send email
  async function sendEmail(booking) {
    const transporter = nodemailer.createTransport({
      service: 'gmail', // Update based on your email service
      auth: {
        user: 'onthego8210@gmail.com',
        pass: 'vacw cjim rcjl hgvj',
      },
    });
  
    const mailOptions = {
      from: 'onthego8210@gmail.com',
      to: 'juenmiguel00@gmail.com', // Authorities' email
      subject: `Overdue Motorcycle Return Alert - Booking ID ${booking.booking_id}`,
      text: `Dear Authorities,
  
  The motorcycle rented under Booking ID ${booking.booking_id} has not been marked as returned within 3 days after the end date (${booking.rental_end_date}).
  
  Details:
  - Motorcycle ID: ${booking.motorcycle_id}
  - Renter Name: ${booking.name}
  - Renter Email: ${booking.email}
  - Renter Phone number: ${booking.phone_number}

  Please take necessary actions.
  
  Thank you,
  On the Go Team`,
    };
  
    await transporter.sendMail(mailOptions);
  }
  