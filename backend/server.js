const express = require('express');
const app = express();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const productRoutes = require('./routes/products.routes');
const dbConfig = require('./db-config/db-config');

dbConfig();
app.use(bodyParser.json());
const cors = require('cors');
app.use(cors());

app.use('/api', productRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
