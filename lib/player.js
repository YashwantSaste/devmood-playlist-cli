// lib/player.js
import open from 'open';
import { loadMoods } from './moodManager.js';  // Load moods from the mood manager
import { loadHistory, saveHistory } from './historyManager.js'; // Load mood and history manager
import { logSuccess, logError } from './logger.js';  // Import logger functions

export async function playMood(mood) {
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
