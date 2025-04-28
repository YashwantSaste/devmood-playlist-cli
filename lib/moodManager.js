// lib/moodManager.js
import fs from 'fs-extra'; // For reading/writing to the file
import path from 'path';
import { logInfo, logSuccess, logError } from './logger.js'; // Using our logger functions

const moodsFilePath = path.join(process.cwd(), 'moods.json'); // Store the moods in the root directory as a .json file
// File path for history.json
const historyFilePath = path.join(process.cwd(), 'history.json');

// Load moods from the file
export async function loadMoods() {
  try {
    if (await fs.pathExists(moodsFilePath)) {
      const data = await fs.readJson(moodsFilePath);
      return data;
    }
    return {}; // Return an empty object if the file doesn't exist
  } catch (error) {
    logError('Error loading moods:', error);
    return {};
  }
}

// Save moods to the file
export async function saveMoods(moods) {
  try {
    await fs.writeJson(moodsFilePath, moods, { spaces: 2 });
    logSuccess('Moods saved successfully!');
  } catch (error) {
    logError('Error saving moods:', error);
  }
}

// Add a new mood to the list
export async function addMood(mood, playlistUrl) {
  try {
    const moods = await loadMoods();
    moods[mood] = playlistUrl;
    await saveMoods(moods);
    logSuccess(`Mood '${mood}' added successfully!`);
  } catch (error) {
    logError('Error adding mood:', error);
  }
}

// List all moods
export async function listMoods() {
  try {
    const moods = await loadMoods();
    if (Object.keys(moods).length === 0) {
      logInfo('No moods found.');
      return;
    }
    logInfo('Available moods:');
    Object.keys(moods).forEach((mood) => {
      console.log(`- ${mood}`);
    });
  } catch (error) {
    logError('Error listing moods:', error);
  }
}


