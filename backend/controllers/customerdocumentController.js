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

exports.getAllCustomerDocument = async (req, res) => {
try {
const [rows] = await db.query('SELECT * FROM customer_documents');
res.json(rows);

} catch (err) {
console.error(err);
res.status(500).send('Database error');
}
};

exports.getDocumentByCustomerId = async (req, res) => {
  try {
      const rows = await db.query('SELECT * FROM customer_documents WHERE user_id = ?', [req.params.id]);
      if (rows.length === 0) {
          return res.status(404).send('User with this booking transaction not found');
      }
      res.json(rows[0]);
  } catch (err) {
      console.error(err);
      res.status(500).send('Database error');
  }
};  

exports.getCustomerDocumentById = async (req, res) => {
    try {
        const [rows] = await db.query('SELECT * FROM customer_documents WHERE document_id = ?', [req.params.id]);
        if (rows.length === 0) {
            return res.status(404).send('User not found');
        }
        res.json(rows[0]);
    } catch (err) {
        console.error(err);
        res.status(500).send('Database error');
    }
};

exports.createCustomerDocument = [
  upload.fields([
    { name: "valid_id", maxCount: 1 },
    { name: "drivers_license", maxCount: 1 },
    { name: "national_id", maxCount: 1 }
  ]),
  async (req, res) => {
    try {
      // Extract file paths
      const valid_idPath = req.files?.valid_id?.[0]?.path || null;
      const drivers_licensePath = req.files?.drivers_license?.[0]?.path || null;
      const national_idPath = req.files?.national_id?.[0]?.path || null;

      // Check if no files are provided
      if (!valid_idPath && !drivers_licensePath && !national_idPath) {
        return res.status(400).json({ error: "No files provided" });
      }

      // Get user_id from the request
      const user_id = req.params.id;

      // Check if the user already has a document
      const [existingDocument] = await db.query(
        `SELECT * FROM customer_documents WHERE user_id = ?`,
        [user_id]
      );

      if (existingDocument.length > 0) {
        return res.status(400).json({ error: "User already has a document." });
      }

      // Insert the new document record
      const [result] = await db.query(
        "INSERT INTO customer_documents (user_id, valid_id, drivers_license, national_id) VALUES (?, ?, ?, ?)",
        [user_id, valid_idPath, drivers_licensePath, national_idPath]
      );

      res.status(201).send("Document created successfully");
    } catch (err) {
      console.error("Error creating customer document:", err);
      res.status(500).send("Database error");
    }
  },
];





exports.updateCustomerDocument = [
  upload.fields([
    { name: "valid_id", maxCount: 1 },
    { name: "drivers_license", maxCount: 1 },
    { name: "national_id", maxCount: 1 }
  ]),
  async (req, res) => {
    try {
      // Check if files are uploaded
      const valid_idPath = req.files?.valid_id?.[0]?.path || null;
      const drivers_licensePath = req.files?.drivers_license?.[0]?.path || null;
      const national_idPath = req.files?.national_id?.[0]?.path || null;

      // Build the update query dynamically
      const fieldsToUpdate = [];
      const valuesToUpdate = [];

      if (valid_idPath) {
        fieldsToUpdate.push("valid_id = ?");
        valuesToUpdate.push(valid_idPath);
      }
      if (drivers_licensePath) {
        fieldsToUpdate.push("drivers_license = ?");
        valuesToUpdate.push(drivers_licensePath);
      }
      if (national_idPath) {
        fieldsToUpdate.push("national_id = ?");
        valuesToUpdate.push(national_idPath);
      }

      // If no fields are provided, return an error
      if (fieldsToUpdate.length === 0) {
        return res.status(400).json({ error: "No files to update" });
      }

      // Add the user_id to the query parameters
      valuesToUpdate.push(req.params.id);

      // Execute the update query
      const [result] = await db.query(
        `UPDATE customer_documents SET ${fieldsToUpdate.join(", ")} WHERE user_id = ?`,
        valuesToUpdate
      );

      if (result.affectedRows === 0) {
        return res.status(404).send("Documents not found for the user");
      }

      res.send("Documents updated successfully");
    } catch (err) {
      console.error(err);
      res.status(500).send("Database error");
    }
  },
];

