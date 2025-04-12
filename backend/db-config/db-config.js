const mongoose = require('mongoose')
const dbConfig = () => {
    mongoose.connect('mongodb://localhost:27017/products', {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    });

    const db = mongoose.connection;
    db.on('error', console.error.bind(console, 'connection error:'));
    db.once('open', () => {
        console.log('Connected to MongoDB');
    });
}

module.exports = dbConfig;