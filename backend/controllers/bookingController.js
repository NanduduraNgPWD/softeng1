
const db = require('../db/dbConfig');

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

              const [rows] = await db.query(
                `SELECT valid_id, drivers_license FROM users WHERE user_id = ? AND user_type = 'Customer'`,
                [customer_id]
              );
              
              if (!rows.length || !rows[0]?.valid_id || !rows[0]?.drivers_license) {
                return res.status(400).json({
                  message: "Customer must have both a valid ID and a driver's license to make a booking.",
                });
              }
              
              
              
                // Check for overlapping bookings
                const [overlap] = await db.query(
                    `SELECT 1 FROM bookings
                     WHERE motorcycle_id = ?
                     AND rental_status IN ('Pending', 'Ongoing')
                     AND (
                         rental_start_date < ? AND rental_end_date > ?
                     )`,
                    [motorcycle_id, rental_end_date, rental_start_date]
                );
        
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
        
        
        
        
        exports.updateBookingTransaction = async (req, res) => {
            const { rental_status } = req.body;
          
            try {
              // Update booking status in the database
              const [bookingResult] = await db.query(
                'UPDATE bookings SET rental_status = ? WHERE booking_id = ?',
                [rental_status, req.params.id]
              );
          
              if (bookingResult.affectedRows === 0) {
                return res.status(404).send('Booking not found');
              }
          
              // Update motorcycle availability based on the new rental status
            if (rental_status.toLowerCase() === 'completed') {
                const [motorcycleResult] = await db.query(
                  `
                  UPDATE motorcycles 
                  SET is_available = 1 
                  WHERE motorcycle_id = (SELECT motorcycle_id FROM bookings WHERE booking_id = ?)
                  `,
                  [req.params.id]
                );
          
                if (motorcycleResult.affectedRows === 0) {
                  return res.status(404).send('Motorcycle not found');
                }
              }
          
              res.send('Booking updated successfully');
            } catch (err) {
              console.error(err);
              res.status(500).send('Database error');
            }
          };
        
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
        