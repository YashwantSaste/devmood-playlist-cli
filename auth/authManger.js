const axios = require('axios');
const { auth } = require('../database/admin');
require('dotenv').config();

// Signup using Admin SDK
async function signup(email, password) {
    try {
      // Create the user
      const userRecord = await auth.createUser({
        email,
        password,
      });

      await auth.sendEmailVerification(userRecord);
  
      // Fetch user details using the UID
      const userDetails = await auth.getUser(userRecord.uid);
  
      // Return the full user details
      return {
        success: true,
        uid: userDetails.uid,
        email: userDetails.email,  // Access email from user details
      };
    } catch (error) {
        if (error.code === 'auth/email-already-exists') {
            throw new Error(`Signup failed: The email ${email} is already in use.`);
        }
      throw new Error(`Signup failed: ${error.message}`);
    }
  }

// Login using Firebase Auth REST API
async function login(email, password) {
  try {
    const response = await axios.post(
      `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${process.env.FIREBASE_API_KEY}`,
      {
        email,
        password,
        returnSecureToken: true,
      }
    );

    // Optionally store the token for session reuse
    return {
      success: true,
      email: response.data.email,
      idToken: response.data.idToken,
      refreshToken: response.data.refreshToken,
    };
  } catch (error) {
    const message = error.response?.data?.error?.message || error.message;
    throw new Error(`Login failed: ${message}`);
  }
}

module.exports = { signup, login };
