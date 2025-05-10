const mongoose = require('mongoose');
const { dbConfig } = require('../config/config');

const connectToDatabase = async () => {
    await mongoose.connect(dbConfig.mongoURI);
    console.log("Devmood Database connected to the CLI")
}

module.exports = {
    connectToDatabase
}