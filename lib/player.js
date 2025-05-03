const open = require('open');
const { loadMoods } = require('./moodManager.js');
const { loadHistory, saveHistory } = require('./historyManager.js');
const { logSuccess, logError } = require('./logger.js');

async function playMood(mood) {
  try {
    const moods = await loadMoods();  // Get all moods
    const playlistUrl = moods[mood];  // Get the URL for the specified mood

    if (!playlistUrl) {
      logError(`Sorry, no playlist found for mood: ${mood}`);
      return;
    }

    logSuccess(`🎧 Playing playlist for mood: ${mood}...`);
    open(playlistUrl);  // Open the URL in the default browser

    // Log the played mood to history
    const history = loadHistory();
    const newHistoryEntry = {
      mood: mood,
      datePlayed: new Date().toISOString(), // Store the timestamp in ISO format
    };

    // Add the new history entry
    history.push(newHistoryEntry);

    // Save the updated history
    saveHistory(history);

    logSuccess(`Mood '${mood}' played successfully and logged to history.`);

  } catch (error) {
    logError('Error playing mood:', error.message);
  }
}


module.exports = { playMood };