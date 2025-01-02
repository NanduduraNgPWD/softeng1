
const db = require('../db/dbConfig');
const { sendEmail } = require('../utils/email');
const generateReceiptHTML = require('../templates/receipt');

    exports.getAllBookingTransaction = async (req, res) => {
        try {
        const [rows] = await db.query('SELECT * FROM bookings');
        res.json(rows);
        
        } catch (err) {
        console.error(err);
        res.status(500).send('Database errorz');
        }
        };
        
        
        exports.getBookingTransactionById = async (req, res) => {
            try {
                const [rows] = await db.query('SELECT * FROM bookings WHERE booking_id = ?', [req.params.id]);
                if (rows.length === 0) {
                    return res.status(404).send('Rental transaction not found');
                }
                res.json(rows[0]);
            } catch (err) {
                console.error(err);
                res.status(500).send('Database error');
            }
        };  
        
        exports.getBookingTransactionByCustomerId = async (req, res) => {
            try {
                const rows = await db.query('SELECT * FROM bookings WHERE customer_id = ?', [req.params.id]);
                if (rows.length === 0) {
                    return res.status(404).send('User with this booking transaction not found');
                }
                res.json(rows[0]);
            } catch (err) {
                console.error(err);
                res.status(500).send('Database error');
            }
        };  

        exports.getBookingTransactionByOwnerId = async (req, res) => {
            try {
              const rows = await db.query('SELECT * FROM bookings WHERE owner_id = ?', [req.params.id]);
              if (rows.length === 0) {
                return res.status(404).send('No booking transactions found for this owner');
              }
              res.json(rows[0]); // Return all matching rows
            } catch (err) {
              console.error(err);
              res.status(500).send('Database error');
            }
          };
          
        
          exports.createBookingTransaction = async (req, res) => {
            const {
                owner_id,
                motorcycle_id,
                customer_id, // Corresponds to user_id in the users table
                rental_start_date,
                rental_end_date,
                total_price,
                pickup_location,
                dropoff_location,
                pickup_time,
                dropoff_time,
                rental_status
            } = req.body;
        
            const normalizeDate = (date) => {
                const localDate = new Date(date);
                return localDate.toISOString().split('T')[0];
            };
        
            const normalizedStartDate = normalizeDate(rental_start_date);
            const normalizedEndDate = normalizeDate(rental_end_date);
        
            try {
              // Query to check if the user has a 'Verified' registration status
              const [rows] = await db.query(
                `SELECT registration_status FROM users WHERE user_id = ? AND user_type = 'Customer'`,
                [customer_id]
              );
              
              // Check if the customer exists and if their registration status is 'Verified'
              if (!rows.length || rows[0]?.registration_status !== 'Verified') {
                return res.status(400).json({
                  message: "Customer must have a 'Verified' registration status to make a booking.",
                });
              }
            
              
              
                // Check for overlapping bookings
                const [overlap] = await db.query(
                  `SELECT 1 FROM bookings
                   WHERE motorcycle_id = ?
                   AND rental_status IN ('Pending', 'Ongoing', 'Upcoming')
                   AND (
                       (rental_start_date < ? AND rental_end_date > ?) -- Overlapping start/middle
                       OR (rental_start_date < ? AND rental_end_date > ?) -- Overlapping end
                       OR (rental_start_date >= ? AND rental_end_date <= ?) -- Completely inside
                   )`,
                  [motorcycle_id, rental_end_date, rental_start_date, rental_start_date, rental_end_date, rental_start_date, rental_end_date]
                );
                
                if (overlap.length > 0) {
                  return res.status(400).json({
                    message: "The selected motorcycle is already booked for the chosen dates.",
                  });
                }
                
        
                if (overlap.length > 0) {
                    return res.status(400).json({ message: 'Motorcycle already booked for the selected dates.' });
                }
        
                // Insert booking
                const [result] = await db.query(
                    `INSERT INTO bookings
                     (owner_id, motorcycle_id, customer_id, rental_start_date, rental_end_date, total_price, pickup_location, dropoff_location, pickup_time, dropoff_time, rental_status)
                     VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
                    [owner_id, motorcycle_id, customer_id, normalizedStartDate, normalizedEndDate, total_price, pickup_location, dropoff_location, pickup_time, dropoff_time, rental_status]
                );
        
                res.status(201).json({
                    booking_id: result.insertId,
                    owner_id,
                    motorcycle_id,
                    customer_id,
                    normalizedStartDate,
                    normalizedEndDate,
                    total_price,
                    pickup_location,
                    dropoff_location,
                    pickup_time,
                    dropoff_time,
                    rental_status
                });
            } catch (err) {
                console.error(err);
                res.status(500).send('Database error!');
            }
        };
        
        
        
        
        // exports.updateBookingTransaction = async (req, res) => {
        //   const { rental_status, returned_status } = req.body;
        
        //   try {
        //     // Update rental_status if provided
        //     if (rental_status) {
        //       const [rentalResult] = await db.query(
        //         'UPDATE bookings SET rental_status = ? WHERE booking_id = ?',
        //         [rental_status, req.params.id]
        //       );
        
        //       if (rentalResult.affectedRows === 0) {
        //         return res.status(404).send('Booking not found');
        //       }
        //     }
        
        //     // Optionally update returned_status if provided
        //     if (returned_status) {
        //       const validStatuses = ['Pending', 'Confirmed', 'Returned'];  // Example of valid statuses
        //       if (!validStatuses.includes(returned_status)) {
        //         return res.status(400).send('Invalid returned status');
        //       }
        
        //       const [returnedResult] = await db.query(
        //         'UPDATE bookings SET returned_status = ? WHERE booking_id = ?',
        //         [returned_status, req.params.id]
        //       );
        
        //       if (returnedResult.affectedRows === 0) {
        //         return res.status(404).send('Booking not found');
        //       }
        //     }
        
        //     // If everything went well, send success response
        //     res.send('Booking updated successfully');
        //   } catch (err) {
        //     console.error('Error updating booking:', err);
        //     res.status(500).send('Database error');
        //   }
        // };
        
        exports.updateBookingTransaction = async (req, res) => {
          const { rental_status, returned_status } = req.body;
        
          try {
            // Update rental_status if provided
            if (rental_status) {
              const [rentalResult] = await db.query(
                'UPDATE bookings SET rental_status = ? WHERE booking_id = ?',
                [rental_status, req.params.id]
              );
        
              if (rentalResult.affectedRows === 0) {
                return res.status(404).send('Booking not found');
              }
        
              // If rental_status is updated to "Upcoming", send an e-receipt
              if (rental_status === 'Upcoming') {
                const [bookingDetails] = await db.query(
                  `SELECT b.booking_id, b.total_price, b.rental_start_date, b.rental_end_date, 
                          b.pickup_location, b.dropoff_location, u.email, u.first_name, u.last_name
                   FROM bookings b
                   JOIN users u ON b.customer_id = u.user_id
                   WHERE b.booking_id = ?`,
                  [req.params.id]
                );
              
                if (bookingDetails.length === 0) {
                  console.error('Booking not found or no email available');
                  return res.status(404).send('Booking not found');
                }
              
                const booking = bookingDetails[0];
              
                if (!booking.email) {
                  console.error('No email found for booking ID:', booking.booking_id);
                  return res.status(400).send('Unable to send receipt: No email found.');
                }
              
                const receiptHTML = generateReceiptHTML({
                  bookingId: booking.booking_id,
                  totalPrice: booking.total_price,
                  rentalStartDate: booking.rental_start_date,
                  rentalEndDate: booking.rental_end_date,
                  pickupLocation: booking.pickup_location,
                  dropoffLocation: booking.dropoff_location,
                  customerName: `${booking.first_name} ${booking.last_name}`,
                });
              
                console.log('Sending email to:', booking.email);
                await sendEmail(booking.email, 'Your Booking Receipt - Thank you!', receiptHTML);
              }
              
            }
        
            // Update returned_status if provided
            if (returned_status) {
              const validStatuses = ['Pending', 'Confirmed'];
              if (!validStatuses.includes(returned_status)) {
                return res.status(400).send('Invalid returned status');
              }
        
              const [returnedResult] = await db.query(
                'UPDATE bookings SET returned_status = ? WHERE booking_id = ?',
                [returned_status, req.params.id]
              );
        
              if (returnedResult.affectedRows === 0) {
                return res.status(404).send('Booking not found');
              }
            }
        
            // Send a success response
            res.send('Booking updated successfully');
          } catch (err) {
            console.error('Error updating booking:', err);
            res.status(500).send('Database error');
          }
        };
        

        
        // Route to update returned status of a booking
// exports.updateReturnedStatus = async (req, res) => {
//   const { returned_status } = req.body;

//   try {
//     // Update returned_status in the database
//     const [updateResult] = await db.query(
//       'UPDATE bookings SET returned_status = ? WHERE booking_id = ?',
//       [returned_status, req.params.id]
//     );

//     if (updateResult.affectedRows === 0) {
//       return res.status(404).send('Booking not found');
//     }

//     res.send('Returned status updated successfully');
//   } catch (err) {
//     console.error(err);
//     res.status(500).send('Database error');
//   }
// };

        
        exports.deleteBookingTransaction = async (req, res) => {
        try {
        const [result] = await db.query('DELETE FROM bookings WHERE booking_id = ?',
        [req.params.id]);
        if (result.affectedRows === 0) {
        return res.status(404).send('Booking not found');
        }
        res.send('Booking deleted');
        } catch (err) {
        console.error(err);
        res.status(500).send('Database error');
        }
        };
        