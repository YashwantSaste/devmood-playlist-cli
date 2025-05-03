const open = require('open');
const { loadMoods } = require('./moodManager.js');
const { addToHistory } = require('./historyManager.js');
const { logSuccess, logError } = require('./logger.js');

async function playMood(mood) {
  try {
    const moods = await loadMoods(); // Get all moods from Firestore
    const playlistUrl = moods[mood]; // Get URL for specified mood

    if (!playlistUrl) {
      logError(`❌ Sorry, no playlist found for mood: ${mood}`);
      return;
    }

    logSuccess(`🎧 Playing playlist for mood: ${mood}...`);
    await open(playlistUrl); // Open the playlist URL

    // Log the mood to Firebase history
    await addToHistory(mood);

    logSuccess(`✅ Mood '${mood}' played and logged to history successfully.`);
  } catch (error) {
    logError('Error playing mood:', error.message);
  }
}

module.exports = { playMood };
