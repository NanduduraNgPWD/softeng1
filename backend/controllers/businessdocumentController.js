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

exports.getAllBusinessDocument = async (req, res) => {
    try {
    const [rows] = await db.query('SELECT * FROM business_documents');
    res.json(rows);
    
    } catch (err) {
    console.error(err);
    res.status(500).send('Database error');
    }
    };

    exports.getDocumentByBusinessId = async (req, res) => {
      try {
          const rows = await db.query('SELECT * FROM business_documents WHERE user_id = ?', [req.params.id]);
          if (rows.length === 0) {
              return res.status(404).send('Business with this booking transaction not found');
          }
          res.json(rows[0]);
      } catch (err) {
          console.error(err);
          res.status(500).send('Database error');
      }
    };  
    



exports.getBusinessDocumentById = async (req, res) => {
    try {
        const [rows] = await db.query('SELECT * FROM business_documents WHERE document_id = ?', [req.params.id]);
        if (rows.length === 0) {
            return res.status(404).send('User not found');
        }
        res.json(rows[0]);
    } catch (err) {
        console.error(err);
        res.status(500).send('Database error');
    }
};

exports.createBusinessDocument = [
  upload.fields([
    { name: "tin", maxCount: 1 },
    { name: "business_permit", maxCount: 1 },
    { name: "cor", maxCount: 1 }
  ]),
  async (req, res) => {
    try {
      const userId = req.params.id;

      // Check if the user already has a document with the same user_id
      const [existingDocument] = await db.query(
        `SELECT * FROM business_documents WHERE user_id = ?`,
        [userId]
      );

      if (existingDocument.length > 0) {
        return res.status(400).json({ error: "User already has a document." });
      }

      // Check if files are uploaded
      const tinPath = req.files?.tin?.[0]?.path || null;
      const business_permitPath = req.files?.business_permit?.[0]?.path || null;
      const corPath = req.files?.cor?.[0]?.path || null;

      // If no files are provided, return an error
      if (!tinPath && !business_permitPath && !corPath) {
        return res.status(400).json({ error: "No files provided" });
      }

      // Prepare the values for insertion
      const insertData = {
        user_id: userId,  // Assuming the user ID is passed in the URL
        tin: tinPath,
        business_permit: business_permitPath,
        cor: corPath
      };

      // Insert the data into the database
      const [result] = await db.query(
        `INSERT INTO business_documents (user_id, tin, business_permit, cor) VALUES (?, ?, ?, ?)`,
        [insertData.user_id, insertData.tin, insertData.business_permit, insertData.cor]
      );

      if (result.affectedRows === 0) {
        return res.status(500).send("Failed to create business documents");
      }

      res.status(201).send("Business documents created successfully");
    } catch (err) {
      console.error("Error creating business document:", err);
      res.status(500).send("Database error");
    }
  },
];


exports.updateBusinessDocument = [
  upload.fields([
    { name: "tin", maxCount: 1 },
    { name: "business_permit", maxCount: 1 },
    { name: "cor", maxCount: 1 }
  ]),
  async (req, res) => {
    try {
      // Check if files are uploaded
      const tinPath = req.files?.tin?.[0]?.path || null;
      const business_permitPath = req.files?.business_permit?.[0]?.path || null;
      const corPath = req.files?.cor?.[0]?.path || null;

      // Build the update query dynamically
      const fieldsToUpdate = [];
      const valuesToUpdate = [];

      if (tinPath) {
        fieldsToUpdate.push("tin = ?");
        valuesToUpdate.push(tinPath);
      }
      if (business_permitPath) {
        fieldsToUpdate.push("business_permit = ?");
        valuesToUpdate.push(business_permitPath);
      }
      if (corPath) {
        fieldsToUpdate.push("cor = ?");
        valuesToUpdate.push(corPath);
      }

      // If no fields are provided, return an error
      if (fieldsToUpdate.length === 0) {
        return res.status(400).json({ error: "No files to update" });
      }

      // Add the user_id to the query parameters
      valuesToUpdate.push(req.params.id);

      // Execute the update query
      const [result] = await db.query(
        `UPDATE business_documents SET ${fieldsToUpdate.join(", ")} WHERE user_id = ?`,
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
  
exports.deleteDocument = async (req, res) => {
  try {
  const [result] = await db.query('DELETE FROM business_documents WHERE document_id = ?',
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
  