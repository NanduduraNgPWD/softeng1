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

//  user ↓↓↓

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
const [result] = await db.query('DELETE FROM users WHERE user_id = ?',
[req.params.id]);
if (result.affectedRows === 0) {
return res.status(404).send('User not found');
}
res.send('User deleted');
} catch (err) {
console.error(err);
res.status(500).send('Database error');
}
};

// user ↑↑↑
// -------------------------------------------------------------------------------------
//  Motorcycle ↓↓↓

exports.getAllMotorcycle = async (req, res) => {
    try {
    const [rows] = await db.query('SELECT * FROM motorcycles');
    res.json(rows);
    
    } catch (err) {
    console.error(err);
    res.status(500).send('Database error');
    }
    };
    
    
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
        const { owner_id, brand, model, year, color, type, transmission, mileage, vehicle_condition, price_per_day, is_available, image_url } = req.body;
        
        try {
            const [result] = await db.query(
                'INSERT INTO motorcycles (owner_id, brand, model, year, color, type, transmission, mileage, vehicle_condition, price_per_day, is_available, image_url) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)',
                [owner_id, brand, model, year, color, type, transmission, mileage, vehicle_condition, price_per_day, is_available, image_url]
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
                is_available,
                image_url
            });
        } catch (err) {
            console.error(err);  
            res.status(500).send('Database error');
        }
    };
    
    exports.updateMotorcycle = async (req, res) => {
        const { year, color } = req.body;
    
    try {
    const [result] = await db.query('UPDATE motorcycles SET year = ?, color = ? WHERE motorcycle_id = ?', [year, color, req.params.id]);
    if (result.affectedRows === 0) {
    return res.status(404).send('Motorcycle not found');
    }
    res.send('Motorcycle updated');
    } catch (err) {
    console.error(err);
    res.status(500).send('Database error1');
    
    }
    };
    
    
    exports.deleteMotorcycle = async (req, res) => {
    try {
    const [result] = await db.query('DELETE FROM motorcycles WHERE motorcycle_id = ?',
    [req.params.id]);
    if (result.affectedRows === 0) {
    return res.status(404).send('User not found');
    }
    res.send('User deleted');
    } catch (err) {
    console.error(err);
    res.status(500).send('Database error');
    }
    };
    
    // motorcycle ↑↑↑

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
        