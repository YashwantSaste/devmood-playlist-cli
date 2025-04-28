// lib/player.js
import open from 'open';
import { loadMoods, loadHistory, saveHistory } from './moodManager.js';
import { logSuccess, logError } from './logger.js';

export async function playMood(mood) {
  try {
    const moods = await loadMoods();
    const playlistUrl = moods[mood];

    if (!playlistUrl) {
      logError(`Sorry, no playlist found for mood: ${mood}`);
      return;
    }

    logSuccess(`🎧 Playing playlist for mood: ${mood}...`);
    open(playlistUrl);

    // Format the date to a human-readable format
    const playedDate = new Date();
    const formattedDate = playedDate.toLocaleString('en-GB', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      hour12: true,
    });

    // Log the played mood to history
    const history = loadHistory();
    const newHistoryEntry = {
      mood: mood,
      datePlayed: formattedDate,  // Now human readable
    };

    history.push(newHistoryEntry);
    saveHistory(history);

    logSuccess(`Mood '${mood}' played successfully and logged to history.`);

  } catch (error) {
    logError('Error playing mood:', error.message);
  }
}
