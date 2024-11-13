const db = require('../db/dbConfig');

exports.getAllUsers = async (req, res) => {
try {
const [rows] = await db.query('SELECT * FROM users');
res.json(rows);

} catch (err) {
console.error(err);
res.status(500).send('Database error');
}
};


exports.getUserById = async (req, res) => {
    try {
        const [rows] = await db.query('SELECT * FROM users WHERE user_id = ?', [req.params.id]);
        if (rows.length === 0) {
            return res.status(404).send('User not found');
        }
        res.json(rows[0]);
    } catch (err) {
        console.error(err);
        res.status(500).send('Database error');
    }
};



exports.createUser = async (req, res) => {
    const { name, email, password_hash, phone_number, user_type } = req.body;
    
    try {
        const [result] = await db.query(
            'INSERT INTO users (name, email, password_hash, phone_number, user_type) VALUES (?, ?, ?, ?, ?)',
            [name, email, password_hash, phone_number, user_type]
        );

        res.status(201).json({
            user_id: result.insertId,  
            name,
            email,
            phone_number,
            user_type
        });
    } catch (err) {
        console.error(err);  
        res.status(500).send('Database error');
    }
};

exports.updateUser = async (req, res) => {
    const { name, email, password_hash, phone_number, user_type } = req.body;

try {
const [result] = await db.query('UPDATE users SET name = ?, email = ? WHERE user_id = ?', [name, email, req.params.id]);
if (result.affectedRows === 0) {
return res.status(404).send('User not found');
}
res.send('User updated');
} catch (err) {
console.error(err);
res.status(500).send('Database error');

}
};


exports.deleteUser = async (req, res) => {
    try {
     
      await db.query('DELETE FROM motorcycles WHERE owner_id = ?', [req.params.id]);
      await db.query('DELETE FROM reviews WHERE customer_id = ?', [req.params.id]);
      const [result] = await db.query('DELETE FROM users WHERE user_id = ?', [req.params.id]);
  
      if (result.affectedRows === 0) {
        return res.status(404).send('User not found');
      }
  
      res.send('boom!!!');
    } catch (err) {
      console.error(err);
      res.status(500).send('Database error');
    }
  };
  
