const mongoose = require('mongoose');

const DeviceCodeSchema = new mongoose.Schema({
  code: { type: String, required: true, unique: true },
  status: { type: String, enum: ['pending', 'verified'], default: 'pending' },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  jwt: String,
  createdAt: { type: Date, default: Date.now, expires: 300 }, // Expires after 5 mins
});


const DeviceCode = mongoose.model('DeviceCode', DeviceCodeSchema);

module.exports = DeviceCode;
