const pool = require('../db/dbConfig');

const User = {
  create: async (userData) => {
    try {
      const {
        first_name,
        last_name,
        email,
        password_hash,
        phone_number,
        user_type = 'Customer', // Default to 'Customer'
        valid_id = null, // Default to null if not provided
        drivers_license = null, // Default to null if not provided
        profile_pic = null, // Default to null if not provided
      } = userData;
  
      const [result] = await pool.query(
        `INSERT INTO users 
        (first_name, last_name, email, password_hash, phone_number, user_type, profile_pic, created_at)
        VALUES (?, ?, ?, ?, ?, ?, ?, NOW())`, // Use NOW() to set current timestamp
        [
          first_name,
          last_name,
          email,
          password_hash,
          phone_number,
          user_type,
          profile_pic,
        ]
      );
      return result.insertId; // Return the new user's ID
    } catch (error) {
      throw new Error('Error creating user: ' + error.message);
    }
  },
  

  findByEmail: async (email) => {
    try {
      const [rows] = await pool.query('SELECT * FROM users WHERE email = ?', [email]);
      return rows[0];
    } catch (error) {
      throw new Error('Error finding user by email: ' + error.message);
    }
  },

  findByPhone: async (phone_number) => {
    try {
      const [rows] = await pool.query('SELECT * FROM users WHERE phone_number = ?', [phone_number]);
      return rows[0]; // Return the first matching record, or undefined if not found
    } catch (error) {
      throw new Error('Error finding user by phone number: ' + error.message);
    }
  },
  

  getAllUsers: async () => {
    try {
      const [rows] = await pool.query('SELECT * FROM users');
      return rows;
    } catch (error) {
      throw new Error('Error fetching all users: ' + error.message);
    }
  },

  findById: async (id) => {
    try {
      const [rows] = await pool.query('SELECT * FROM users WHERE user_id = ?', [id]);
      return rows[0];
    } catch (error) {
      throw new Error('Error finding user by ID: ' + error.message);
    }
  },

  update: async (id, updatedData) => {
    try {
      const fields = [];
      const values = [];

      Object.entries(updatedData).forEach(([key, value]) => {
        fields.push(`${key} = ?`);
        values.push(value);
      });

      values.push(id); // Add ID to the end for the WHERE clause

      const [result] = await pool.query(
        `UPDATE users SET ${fields.join(', ')} WHERE user_id = ?`,
        values
      );

      return result.affectedRows; // Number of rows updated
    } catch (error) {
      throw new Error('Error updating user: ' + error.message);
    }
  },

  delete: async (id) => {
    try {
      const [result] = await pool.query('DELETE FROM users WHERE user_id = ?', [id]);
      return result.affectedRows; // Number of rows deleted
    } catch (error) {
      throw new Error('Error deleting user: ' + error.message);
    }
  },
};

module.exports = User;
