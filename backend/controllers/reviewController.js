const db = require('../db/dbConfig');

exports.getAllReviews = async (req, res) => {
try {
const [rows] = await db.query('SELECT * FROM reviews');
res.json(rows);

} catch (err) {
console.error(err);
res.status(500).send('Database error');
}
};


exports.getReviewsById = async (req, res) => {
    try {
        const [rows] = await db.query('SELECT * FROM reviews WHERE review_id = ?', [req.params.id]);
        if (rows.length === 0) {
            return res.status(404).send('User not found');
        }
        res.json(rows[0]);
    } catch (err) {
        console.error(err);
        res.status(500).send('Database error');
    }
};



exports.createReview = async (req, res) => {
    const { rental_id, customer_id, rating, comment } = req.body;
    
    try {
        const [result] = await db.query(
            'INSERT INTO reviews (rental_id, customer_id, rating, comment) VALUES (?, ?, ?, ?)',
            [rental_id, customer_id, rating, comment]
        );

        res.status(201).json({
            review_id: result.insertId,  
            rental_id,
            customer_id,
            rating,
            comment
        });
    } catch (err) {
        console.error(err);  
        res.status(500).send('Database error');
    }
};

exports.updateReviews = async (req, res) => {
    const { rating, comment } = req.body;

try {
const [result] = await db.query('UPDATE reviews SET rating = ?, comment = ? WHERE review_id = ?', [rating, comment, req.params.id]);
if (result.affectedRows === 0) {
return res.status(404).send('Review not found');
}
res.send('Review updated');
} catch (err) {
console.error(err);
res.status(500).send('Database error');

}
};


exports.deleteReview = async (req, res) => {
    try {
     
      const [result] = await db.query('DELETE FROM reviews WHERE customer_id = ?', [req.params.id]);
  
      if (result.affectedRows === 0) {
        return res.status(404).send('Review not found');
      }
  
      res.send('boom!!!');
    } catch (err) {
      console.error(err);
      res.status(500).send('Database error');
    }
  };
  
