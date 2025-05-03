const admin = require('firebase-admin');
const { applicationDefault } = require('firebase-admin/app');
require('dotenv').config();

admin.initializeApp({
  credential: admin.credential.applicationDefault(), // Uses GOOGLE_APPLICATION_CREDENTIALS env
  //projectId: process.env.FIREBASE_PROJECT_ID,
});

const auth = admin.auth();

module.exports = { admin, auth };
