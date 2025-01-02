
const db = require('../db/dbConfig');

    exports.getAllSubscription = async (req, res) => {
        try {
        const [rows] = await db.query('SELECT * FROM subscriptions');
        res.json(rows);
        
        } catch (err) {
        console.error(err);
        res.status(500).send('Database errorz');
        }
        };
        
        
        exports.getSubscriptionById = async (req, res) => {
            try {
                const [rows] = await db.query('SELECT * FROM subscriptions WHERE subscription_id = ?', [req.params.id]);
                if (rows.length === 0) {
                    return res.status(404).send('subscription transaction not found');
                }
                res.json(rows[0]);
            } catch (err) {
                console.error(err);
                res.status(500).send('Database error');
            }
        };  
        
        exports.getSubscriptionByUserId = async (req, res) => {
          try {
              const [rows]  = await db.query('SELECT * FROM subscriptions WHERE user_id = ? AND status = ?', [req.params.id, 'active']);
              if (rows.length === 0) {
                  return res.status(404).send('No active subscriptions found for the user');
              }
              res.json(rows);
          } catch (err) {
              console.error(err);
              res.status(500).send('Database error');
          }
      };


      
        exports.createSubscription = async (req, res) => {
          const { user_id, plan_name, start_date, end_date, status } = req.body;

          const normalizeDate = (date) => {
            const localDate = new Date(date);
            return localDate.toISOString().split('T')[0];
        };
    
        const normalizedStartDate = normalizeDate(start_date);
        const normalizedEndDate = normalizeDate(end_date);
    

        
          // Validate input fields before inserting
          if (!user_id || !plan_name || !start_date || !end_date || !status) {
            return res.status(400).json({ message: 'All fields are required' });
          }
        
          try {
            // Check if the user is a valid business user and their registration status is Verified
            const [users] = await db.query('SELECT user_type, registration_status FROM users WHERE user_id = ?', [user_id]);
        
            // Ensure we get a valid user
            if (users.length === 0 || users[0].user_type !== 'Business' || users[0].registration_status !== 'Verified') {
              return res.status(400).json({ message: 'User is not a verified business user' });
            }
        
            // Check if the user already has an active subscription
            const [existingSubscription] = await db.query(
              'SELECT * FROM subscriptions WHERE user_id = ? AND status = "active"',
              [user_id]
            );
        
            if (existingSubscription.length > 0) {
              return res.status(400).json({ message: 'User already has an active subscription' });
            }
        
            // Insert subscription into the database
            const [result] = await db.query(
              'INSERT INTO subscriptions (user_id, plan_name, start_date, end_date, status) VALUES (?, ?, ?, ?, ?)',
              [user_id, plan_name, normalizedStartDate, normalizedEndDate, status]
            );
        
            // Respond with the newly created subscription
            res.status(201).json({
              subscription_id: result.insertId,
              user_id,
              plan_name,
              normalizedStartDate,
              normalizedEndDate,
              status
            });
          } catch (err) {
            console.error(err);
            res.status(500).send('Database error');
          }
        };
        
        
        
        exports.updateSubscription = async (req, res) => {
          const { subscription_id } = req.params;  // Get subscription_id from the URL params
          const { plan_name, status } = req.body;  // Get data from request body
        
          // Check if the subscription exists
          const [existingSubscription] = await db.query(
            'SELECT * FROM subscriptions WHERE subscription_id = ?',
            [subscription_id]
          );
        
          if (!existingSubscription) {
            return res.status(404).json({ message: 'Subscription not found' });
          }
        
          try {
            // Update the subscription details in the database
            await db.query(
              'UPDATE subscriptions SET plan_name = ?, status = ? WHERE subscription_id = ?',
              [plan_name, status, subscription_id]
            );
        
            // Respond with the updated subscription data
            res.status(200).json({
              subscription_id,
              plan_name,
              status
            });
          } catch (err) {
            console.error(err);
            res.status(500).send('Database error');
          }
        };
        

        exports.deleteSubscription = async (req, res) => {
        try {
        const [result] = await db.query('DELETE FROM subscriptions WHERE subscription_id = ?',
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
        