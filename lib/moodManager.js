// lib/moodManager.js
const { db } = require('../database/firebase');
const { collection, doc, getDocs, setDoc } = require('firebase/firestore');
const { logInfo, logSuccess, logError } = require('./logger');

const moodsCollection = collection(db, 'moods');

// Load all moods from Firestore
async function loadMoods() {
  try {
    const snapshot = await getDocs(moodsCollection);
    const moods = {};
    snapshot.forEach(docSnap => {
      moods[docSnap.id] = docSnap.data().url;
    });
    return moods;
  } catch (error) {
    logError('Error loading moods from Firebase:', error.message);
    return {};
  }
}

// Save all moods (overwrite everything)
async function saveMoods(moods) {
  try {
    const entries = Object.entries(moods);
    for (const [mood, url] of entries) {
      await setDoc(doc(moodsCollection, mood), { url });
    }
    logSuccess('Moods saved successfully to Firebase!');
  } catch (error) {
    logError('Error saving moods to Firebase:', error.message);
  }
}

// Add a new mood to Firestore
async function addMood(mood, playlistUrl) {
  try {
    await setDoc(doc(moodsCollection, mood), { url: playlistUrl });
    logSuccess(`Mood '${mood}' added successfully to Firebase!`);
  } catch (error) {
    logError('Error adding mood:', error.message);
  }
}

// List all moods
async function listMoods() {
  try {
    const moods = await loadMoods();
    if (Object.keys(moods).length === 0) {
      logInfo('No moods found.');
      return;
    }
    logInfo('Available moods:');
    Object.keys(moods).forEach(mood => {
      console.log(`- ${mood}`);
    });
  } catch (error) {
    logError('Error listing moods:', error.message);
  }
}

// Suggest a mood based on time of day
async function suggestMood() {
  const moods = await loadMoods();
  const moodNames = Object.keys(moods);

  if (moodNames.length === 0) {
    return null; // No moods available
  }

  const hour = new Date().getHours();
  let category = '';

  if (hour >= 6 && hour < 12) {
    category = 'morning';
  } else if (hour >= 12 && hour < 17) {
    category = 'afternoon';
  } else if (hour >= 17 && hour < 21) {
    category = 'evening';
  } else {
    category = 'night';
  }

  const categoryMap = {
    morning: ['Happy', 'Energetic', 'Workout'],
    afternoon: ['Focus', 'Instrumental', 'Study'],
    evening: ['Chill', 'Romantic', 'Relax'],
    night: ['Sleep', 'Lo-fi', 'Calm'],
  };

  const possibleMoods = moodNames.filter(mood =>
    categoryMap[category].some(keyword => mood.toLowerCase().includes(keyword.toLowerCase()))
  );

  const pick = arr => arr[Math.floor(Math.random() * arr.length)];

  return possibleMoods.length > 0
    ? pick(possibleMoods)
    : pick(moodNames);
}

module.exports = {
  loadMoods,
  saveMoods,
  addMood,
  listMoods,
  suggestMood,
};
