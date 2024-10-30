// // Dummy user data (replace this with actual database logic)
// let users = [
//     { id: 1, name: 'Ja Uy', email: 'xghagoex69@example.com' },
//     { id: 2, name: 'Knee Guh', email: 'bobo@example.com' }
//     ];

//     exports.getAllUsers = (req, res) => {
//     res.json(users);
//     };
//     exports.getUserById = (req, res) => {
//     const userId = parseInt(req.params.id);
//     const user = users.find(u => u.id === userId);
//     if (user) {
//     res.json(user);
//     } else {
//     res.status(404).send('User not found');
//     }
//     };
//     exports.createUser = (req, res) => {
//     const newUser = {
//     id: users.length + 1,
//     name: req.body.name,
//     email: req.body.email
//     };
//     users.push(newUser);
    
//     res.status(201).json(newUser);
//     };
//     exports.updateUser = (req, res) => {
//     const userId = parseInt(req.params.id);
//     const user = users.find(u => u.id === userId);
//     if (user) {
//     user.name = req.body.name || user.name;
//     user.email = req.body.email || user.email;
//     res.json(user);
//     } else {
//     res.status(404).send('User not found');
//     }
//     };
//     exports.deleteUser = (req, res) => {
//     const userId = parseInt(req.params.id);
//     const userIndex = users.findIndex(u => u.id === userId);
//     if (userIndex !== -1) {
//     users.splice(userIndex, 1);
//     res.sendStatus(204);
//     } else {
//     res.status(404).send('User not found');
//     }
//     };



const db = require('../db/dbConfig');



    exports.getAllRegistration = async (req, res) => {
        try {
        const [rows] = await db.query('SELECT * FROM registration');
        res.json(rows);
        
        } catch (err) {
        console.error(err);
        res.status(500).send('Database error');
        }
        };
        
        
        exports.getRegistrationById = async (req, res) => {
            try {
                const [rows] = await db.query('SELECT * FROM registration WHERE registration_id = ?', [req.params.id]);
                if (rows.length === 0) {
                    return res.status(404).send('User not found');
                }
                res.json(rows[0]);
            } catch (err) {
                console.error(err);
                res.status(500).send('Database error');
            }
        };
        
        
        
        exports.createRegistration = async (req, res) => {
            const { first_name, last_name, phone_number, email, time_to_call } = req.body;
            
            try {
                const [result] = await db.query(
                    'INSERT INTO registration (first_name, last_name, phone_number, email, time_to_call) VALUES (?, ?, ?, ?, ?)',
                    [first_name, last_name, phone_number, email, time_to_call]
                );
        
                res.status(201).json({
                    registration_id: result.insertId,  
                    first_name,
                    last_name,
                    phone_number,
                    email,
                    time_to_call
                });
            } catch (err) {
                console.error(err);  
                res.status(500).send('Database error111');
            }
        };
        

        