const db = require('../db/dbConfig');

exports.getAllMotorcycle = async (req, res) => {
  try {
    const [rows] = await db.query('SELECT * FROM motorcycles WHERE is_available = 1 AND is_deleted = 0');
      res.json(rows);
  } catch (err) {
      console.error(err);
      res.status(500).send('Database error');
  }
};

// exports.getAllMotorcycle = async (req, res) => {
//   try {
//     const [rows] = await db.query('SELECT * FROM motorcycles WHERE is_deleted = 0');
//       res.json(rows);
//   } catch (err) {
//       console.error(err);
//       res.status(500).send('Database error');
//   }
// };



    
    exports.getMotorcycleById = async (req, res) => {
        try {
            const [rows] = await db.query('SELECT * FROM motorcycles WHERE motorcycle_id = ?', [req.params.id]);
            if (rows.length === 0) {
                return res.status(404).send('User not found');
            }
            res.json(rows[0]);
        } catch (err) {
            console.error(err);
            res.status(500).send('Database error');
        }
    };
    
    
    
exports.createMotorcycle = async (req, res) => {
    const { owner_id, brand, model, year, color, type, transmission, mileage, vehicle_condition, price_per_day, is_available } = req.body;

    try {
        // Check if the owner_id has an active subscription
        const [subscriptionCheck] = await db.query(
          `SELECT plan_name
           FROM subscriptions
           WHERE user_id = ? 
           AND status = 'active'`,
          [owner_id]
      );

      if (subscriptionCheck.length === 0) {
          return res.status(403).json({
              message: 'You do not have an active subscription. Please subscribe to create a listing.'
          });
      }

      const planName = subscriptionCheck[0].plan_name;

      // If the plan is 'free', limit the motorcycle count to 2
      if (planName === 'free') {
          const [motorcycleCount] = await db.query(
              `SELECT COUNT(*) as total
               FROM motorcycles
               WHERE owner_id = ?
               AND is_deleted = 0`, // Ensures deleted motorcycles are not counted
              [owner_id]
          );

          if (motorcycleCount[0].total >= 2) {
              return res.status(403).json({
                  message: 'Free plan users can only post up to 2 motorcycles. Please upgrade your plan to add more listings.'
              });
          }
      }
        // Insert the new motorcycle listing
        const [result] = await db.query(
            `INSERT INTO motorcycles 
             (owner_id, brand, model, year, color, type, transmission, mileage, vehicle_condition, price_per_day, is_available) 
             VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
            [owner_id, brand, model, year, color, type, transmission, mileage, vehicle_condition, price_per_day, is_available]
        );

        res.status(201).json({
            motorcycle_id: result.insertId,
            owner_id,
            brand,
            model,
            year,
            color,
            type,
            transmission,
            mileage,
            vehicle_condition,
            price_per_day,
            is_available
        });
    } catch (err) {
        console.error('Error in createMotorcycle:', err);
        res.status(500).send('Database error');
    }
};

    
    exports.updateMotorcycle = async (req, res) => {
        const motorcycleId = req.params.id;
        const updates = req.body;
      
        if (!motorcycleId || isNaN(motorcycleId)) {
          return res.status(400).json({ error: 'Invalid motorcycle ID' });
        }
      
        const fields = [];
        const values = [];
      
        for (const [key, value] of Object.entries(updates)) {
          fields.push(`${key} = ?`);
          values.push(value);
        }
      
        if (fields.length === 0) {
          return res.status(400).json({ error: 'No fields to update' });
        }
      
        values.push(motorcycleId);
      
        const query = `UPDATE motorcycles SET ${fields.join(', ')} WHERE motorcycle_id = ?`;
      
        try {
          const [result] = await db.query(query, values);
      
          if (result.affectedRows === 0) {
            return res.status(404).json({ error: 'Motorcycle not found' });
          }
      
          res.json({ message: 'Motorcycle updated successfully' });
        } catch (err) {
          console.error(err);
          res.status(500).json({ error: 'Database error' });
        }
      };
      
    
    
      exports.deleteMotorcycle = async (req, res) => {
        try {
          const [result] = await db.query('UPDATE motorcycles SET is_deleted = 1 WHERE motorcycle_id = ?', [req.params.id]);
          if (result.affectedRows === 0) {
            return res.status(404).send('Motorcycle not found');
          }
          res.send('Motorcycle marked as deleted');
        } catch (err) {
          console.error("Database error:", err);
          res.status(500).send('Database error');
        }
      };
      