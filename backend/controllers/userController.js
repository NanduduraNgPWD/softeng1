const db = require('../db/dbConfig');

const multer = require("multer");
const path = require("path");

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



exports.createUser = [
    upload.fields([
      { name: "valid_id", maxCount: 1 },
      { name: "drivers_license", maxCount: 1 },
      { name: "profile_pic", maxCount: 1 },
    ]),
    async (req, res) => {
      try {
        const { name, email, password_hash, phone_number, user_type } = req.body;
  
        // File paths or null if not uploaded
        const validIdPath = req.files?.valid_id?.[0]?.path || null;
        const driversLicensePath = req.files?.drivers_license?.[0]?.path || null;
        const profilePicPath = req.files?.profile_pic?.[0]?.path || null;
  
        // Insert into the database
        const [result] = await db.query(
          `INSERT INTO users (name, email, password_hash, phone_number, user_type, valid_id, drivers_license, profile_pic)
           VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
          [
            name,
            email,
            password_hash,
            phone_number,
            user_type,
            validIdPath,
            driversLicensePath,
            profilePicPath,
          ]
        );
  
        res.status(201).json({
          user_id: result.insertId,
          name,
          email,
          phone_number,
          user_type,
          valid_id: validIdPath,
          drivers_license: driversLicensePath,
          profile_pic: profilePicPath,
        });
      } catch (err) {
        console.error(err);
        res.status(500).send("Database error");
      }
    },
  ];
  

  exports.updateUser = [
    upload.fields([
      { name: "valid_id", maxCount: 1 },
      { name: "drivers_license", maxCount: 1 },
      { name: "profile_pic", maxCount: 1 },
    ]),
    async (req, res) => {
      try {
        const { name, email, password_hash, phone_number, user_type } = req.body;
  
        // Extract file paths or set to null if not provided
        const validIdPath = req.files?.valid_id?.[0]?.path || null;
        const driversLicensePath = req.files?.drivers_license?.[0]?.path || null;
        const profilePicPath = req.files?.profile_pic?.[0]?.path || null;
  
        // Build the update query dynamically
        const fieldsToUpdate = [];
        const valuesToUpdate = [];
  
        if (name) {
          fieldsToUpdate.push("name = ?");
          valuesToUpdate.push(name);
        }
        if (email) {
          fieldsToUpdate.push("email = ?");
          valuesToUpdate.push(email);
        }
        if (password_hash) {
          fieldsToUpdate.push("password_hash = ?");
          valuesToUpdate.push(password_hash);
        }
        if (phone_number) {
          fieldsToUpdate.push("phone_number = ?");
          valuesToUpdate.push(phone_number);
        }
        if (user_type) {
          fieldsToUpdate.push("user_type = ?");
          valuesToUpdate.push(user_type);
        }
        if (validIdPath) {
          fieldsToUpdate.push("valid_id = ?");
          valuesToUpdate.push(validIdPath);
        }
        if (driversLicensePath) {
          fieldsToUpdate.push("drivers_license = ?");
          valuesToUpdate.push(driversLicensePath);
        }
        if (profilePicPath) {
          fieldsToUpdate.push("profile_pic = ?");
          valuesToUpdate.push(profilePicPath);
        }
  
        // If no fields are provided, return an error
        if (fieldsToUpdate.length === 0) {
          return res.status(400).json({ error: "No fields to update" });
        }
  
        // Add the user_id to the query parameters
        valuesToUpdate.push(req.params.id);
  
        // Execute the update query
        const [result] = await db.query(
          `UPDATE users SET ${fieldsToUpdate.join(", ")} WHERE user_id = ?`,
          valuesToUpdate
        );
  
        if (result.affectedRows === 0) {
          return res.status(404).send("User not found");
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
  
