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
            const [result] = await db.query(
                'INSERT INTO motorcycles (owner_id, brand, model, year, color, type, transmission, mileage, vehicle_condition, price_per_day, is_available) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)',
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
            console.error(err);  
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
      