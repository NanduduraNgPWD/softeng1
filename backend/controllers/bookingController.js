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
        
        
        
        exports.createBookingTransaction = async (req, res) => {
           
            const { owner_id, motorcycle_id, customer_id, rental_start_date, rental_end_date, total_price, pickup_location, dropoff_location, pickup_time, dropoff_time, rental_status } = req.body;
            
            try {
               
                const [result] = await db.query(
                    'INSERT INTO bookings (owner_id, motorcycle_id, customer_id, rental_start_date, rental_end_date, total_price, pickup_location, dropoff_location, pickup_time, dropoff_time, rental_status) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)',
                    [owner_id, motorcycle_id, customer_id, rental_start_date, rental_end_date, total_price, pickup_location, dropoff_location, pickup_time, dropoff_time, rental_status]
                );
        
                
                res.status(201).json({
                    booking_id: result.insertId, 
                    owner_id,
                    motorcycle_id,
                    customer_id,
                    rental_start_date,
                    rental_end_date,
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
            const { rental_status} = req.body;
        
        try {
        const [result] = await db.query('UPDATE bookings SET rental_status = ?', [rental_status, req.params.id]);
        if (result.affectedRows === 0) {
        return res.status(404).send('Booking not found');
        }
        res.send('Booking updated');
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
        