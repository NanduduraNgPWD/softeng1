const db = require('../db/dbConfig');
const bcrypt = require('bcryptjs');
const multer = require("multer");
const path = require("path");
const User = require('../models/userModel');
// Configure Multer for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/"); // Directory where files will be saved
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

const upload = multer({ storage });

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
  try {
    const { first_name, last_name, email, phone_number, password, confirm_password, user_type } = req.body;

    // Input validation
    if (!first_name || !last_name || !email || !password || !confirm_password || !phone_number) {
      return res.status(400).json({ error: 'All fields are required' });
    }

    // Validate passwords match
    if (password !== confirm_password) {
      return res.status(400).json({ error: 'Passwords do not match' });
    }

    // Check if email already exists
    const existingEmail = await User.findByEmail(email);
    if (existingEmail) {
      return res.status(400).json({ error: 'Email is already registered' });
    }

    // Check if phone number already exists
    const existingPhone = await User.findByPhone(phone_number);
    if (existingPhone) {
      return res.status(400).json({ error: 'Phone number is already registered' });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Call the User model to create a new user
    const userId = await User.create({
      first_name,
      last_name,
      email,
      password_hash: hashedPassword, // Use hashed password
      phone_number,
      user_type: user_type || 'Customer', // Default to 'Customer' if no user_type is provided
    });

    res.status(201).json({
      user_id: userId,
      first_name,
      last_name,
      email,
      phone_number,
      user_type: user_type || 'Customer',
    });
  } catch (err) {
    console.error('Error:', err);
    res.status(500).json({ error: 'Database error', message: err.message });
  }
};



exports.updateUser = [
  upload.fields([
    { name: "profile_pic", maxCount: 1 },
    { name: "valid_id", maxCount: 1 },
    { name: "drivers_license", maxCount: 1 }
  ]),
  async (req, res) => {
    try {
      const { first_name, last_name, email, phone_number, registration_status } = req.body;
      const profilePicPath = req.files?.profile_pic?.[0]?.path || null;
      const validIdPath = req.files?.valid_id?.[0]?.path || null;
      const driversLicensePath = req.files?.drivers_license?.[0]?.path || null;

      // Update fields for the user profile
      const fieldsToUpdate = [];
      const valuesToUpdate = [];

      if (first_name) {
        fieldsToUpdate.push("first_name = ?");
        valuesToUpdate.push(first_name);
      }
      if (last_name) {
        fieldsToUpdate.push("last_name = ?");
        valuesToUpdate.push(last_name);
      }
      if (email) {
        fieldsToUpdate.push("email = ?");
        valuesToUpdate.push(email);
      }
      if (phone_number) {
        fieldsToUpdate.push("phone_number = ?");
        valuesToUpdate.push(phone_number);
      }
      if (registration_status) {
        fieldsToUpdate.push("registration_status = ?");
        valuesToUpdate.push(registration_status);
      }
      if (profilePicPath) {
        fieldsToUpdate.push("profile_pic = ?");
        valuesToUpdate.push(profilePicPath);
      }

      if (fieldsToUpdate.length === 0) {
        return res.status(400).json({ error: "No fields to update" });
      }

      // Add the user_id to the query parameters for the main update
      valuesToUpdate.push(req.params.id);

      // Execute the main update query for the user profile
      const [result] = await db.query(
        `UPDATE users SET ${fieldsToUpdate.join(", ")} WHERE user_id = ?`,
        valuesToUpdate
      );

      if (result.affectedRows === 0) {
        return res.status(404).send("User not found");
      }

      // Update the customer_documents table if there are changes
      const updateDocFields = [];
      const updateDocValues = [];

      if (validIdPath) {
        updateDocFields.push("valid_id = ?");
        updateDocValues.push(validIdPath);
      }
      if (driversLicensePath) {
        updateDocFields.push("drivers_license = ?");
        updateDocValues.push(driversLicensePath);
      }

      // If there are any updates to the documents, apply them
      if (updateDocFields.length > 0) {
        updateDocValues.push(req.params.id);

        // Check if the user has a document record
        const [existingDoc] = await db.query(
          `SELECT * FROM customer_documents WHERE user_id = ?`,
          [req.params.id]
        );

        if (existingDoc.length > 0) {
          // Update existing document record
          await db.query(
            `UPDATE customer_documents SET ${updateDocFields.join(", ")} WHERE user_id = ?`,
            updateDocValues
          );
        } else {
          // Insert new document record
          await db.query(
            `INSERT INTO customer_documents (user_id, ${updateDocFields.join(", ")}) VALUES (?, ${updateDocValues.map(() => '?').join(", ")})`,
            [req.params.id, ...updateDocValues]
          );
        }
      }

      res.send("User updated successfully");
    } catch (err) {
      console.error(err);
      res.status(500).send("Database error");
    }
  },
];



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
  
