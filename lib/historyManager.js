// lib/historyManager.js
const { db } = require('../database/firebase');
const {
  collection,
  addDoc,
  getDocs,
  query,
  orderBy,
} = require('firebase/firestore');

const historyCollection = collection(db, 'history');

// Load history
async function loadHistory() {
  try {
    const q = query(historyCollection, orderBy('datePlayed', 'desc'));
    const snapshot = await getDocs(q);
    const history = [];

    snapshot.forEach(docSnap => {
      const data = docSnap.data();
      history.push({
        mood: data.mood,
        datePlayed: new Date(data.datePlayed._seconds * 1000).toLocaleString(),
      });
    });

    return history;
  } catch (error) {
    console.error('Error reading history from Firebase:', error.message);
    return [];
  }
}

// Save history – not typically needed with Firestore
// Firebase is append-only in this case via `addToHistory`

// Add to history
async function addToHistory(mood) {
  try {
    await addDoc(historyCollection, {
      mood,
      datePlayed: new Date(), // Firestore stores this as a timestamp
    });
  } catch (error) {
    console.error('Error writing to Firebase history:', error.message);
  }
}

module.exports = {
  loadHistory,
  addToHistory,
};
