
const express = require('express');
const app = express();
const port = 3000;
const userRoutes = require('./routes/userRoutes');
const motorcycleRoutes = require('./routes/motorcycleRoutes');

const registrationRoutes = require('./routes/registrationRoutes');

var things = require('./things');


app.use('/things', things);

app.use(express.json());
app.use('/users', userRoutes);
app.use('/motorcycles', motorcycleRoutes);

app.use('/registration', registrationRoutes);


app.use((req, res) => {
res.status(404).send('Page Not Found');
});
app.listen(port, () => {
console.log(`Server running at http://localhost:${port}`);
});