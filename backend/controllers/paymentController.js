const db = require('../db/dbConfig');


    exports.getAllPayment = async (req, res) => {
        try {
        const [rows] = await db.query('SELECT * FROM payments');
        res.json(rows);
        
        } catch (err) {
        console.error(err);
        res.status(500).send('Database error');
        }
        };
        
        
        exports.getPaymentById = async (req, res) => {
            try {
                const [rows] = await db.query('SELECT * FROM payments WHERE payment_id = ?', [req.params.id]);
                if (rows.length === 0) {
                    return res.status(404).send('Payment not found');
                }
                res.json(rows[0]);
            } catch (err) {
                console.error(err);
                res.status(500).send('Database error');
            }
        };
        
        
        
        exports.createPayment = async (req, res) => {
            const { rental_id, payment_method, payment_amount, payment_status } = req.body;
            
            try {
                const [result] = await db.query(
                    'INSERT INTO payments (rental_id, payment_method, payment_amount, payment_status) VALUES (?, ?, ?, ?)',
                    [rental_id, payment_method, payment_amount, payment_status]
                );
        
                res.status(201).json({
                    rental_id: result.insertId,  
                    payment_method,
                    payment_amount,
                    payment_status
                    
                });
            } catch (err) {
                console.error(err);  
                res.status(500).send('Database error');
            }
        };
        
        exports.updatePayment = async (req, res) => {
            const { payment_method, payment_amount, payment_status} = req.body;
        
        try {
        const [result] = await db.query('UPDATE payments SET payment_method = ?, payment_amount = ? WHERE payment_status = ?', [payment_method, payment_amount, payment_status, req.params.id]);
        if (result.affectedRows === 0) {
        return res.status(404).send('Payment not found');
        }
        res.send('User updated');
        } catch (err) {
        console.error(err);
        res.status(500).send('Database error');
        
        }
        };
        
        
        exports.deletePayment = async (req, res) => {
        try {
        const [result] = await db.query('DELETE FROM payments WHERE payment_id = ?',
        [req.params.id]);
        if (result.affectedRows === 0) {
        return res.status(404).send('Payment not found');
        }
        res.send('Payment deleted');
        } catch (err) {
        console.error(err);
        res.status(500).send('Database error');
        }
        };
        
      