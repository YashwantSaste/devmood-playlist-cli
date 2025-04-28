// lib/player.js
import open from 'open';
import { loadMoods } from './moodManager.js'; // We load the moods from the manager

export async function playMood(mood) {
  try {
    const moods = await loadMoods(); // Get all moods
    const playlistUrl = moods[mood];  // Get the URL for the specified mood

    if (!playlistUrl) {
      console.log(`Sorry, no playlist found for mood: ${mood}`);
      return;
    }

    console.log(`🎧 Playing playlist for mood: ${mood}...`);
    open(playlistUrl);  // Open the URL in the default browser
  } catch (error) {
    console.error('Error playing mood:', error);
  }
}
