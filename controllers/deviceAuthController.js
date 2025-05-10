const crypto = require('crypto');
const DeviceCode = require('../models/DeviceCode');
const { generateJWT } = require('../utils/jwt');

async function unifiedInit(req, res) {
  const code = crypto.randomBytes(16).toString('hex');
  await DeviceCode.create({ code });
  res.json({ authUrl: `http://localhost:3000/auth/login?device=${code}`, deviceCode: code });
}

async function deviceStatus(req, res) {
  const { device } = req.query;
  const record = await DeviceCode.findOne({ code: device });
  if (!record || record.status !== 'verified') {
    return res.status(401).json({ status: 'pending' });
  }
  res.json({ token: record.jwt });
}

async function linkDeviceToUser(userId, deviceCode) {
  const jwt = generateJWT({ _id: userId });
  await DeviceCode.findOneAndUpdate(
    { code: deviceCode },
    { status: 'verified', userId, jwt },
    { new: true }
  );
}

module.exports = {
  unifiedInit,
  deviceStatus,
  linkDeviceToUser,
};
