// lib/moodManager.js
const fs = require('fs-extra');
const path = require('path');
const { logInfo, logSuccess, logError } = require('./logger.js');

const moodsFilePath = path.join(process.cwd(), 'moods.json'); // Store the moods in the root directory as a .json file
// File path for history.json
const historyFilePath = path.join(process.cwd(), 'history.json');

// Load moods from the file
async function loadMoods() {
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
async function saveMoods(moods) {
  try {
    await fs.writeJson(moodsFilePath, moods, { spaces: 2 });
    logSuccess('Moods saved successfully!');
  } catch (error) {
    logError('Error saving moods:', error);
  }
}

// Add a new mood to the list
async function addMood(mood, playlistUrl) {
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
async function listMoods() {
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

// lib/moodManager.js

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
  
    // Simple mapping (you can customize these)
    const categoryMap = {
      morning: ['Happy', 'Energetic', 'Workout'],
      afternoon: ['Focus', 'Instrumental', 'Study'],
      evening: ['Chill', 'Romantic', 'Relax'],
      night: ['Sleep', 'Lo-fi', 'Calm'],
    };
  
    const possibleMoods = moodNames.filter(mood =>
      categoryMap[category].some(keyword => mood.toLowerCase().includes(keyword.toLowerCase()))
    );
  
    if (possibleMoods.length > 0) {
      const randomMood = possibleMoods[Math.floor(Math.random() * possibleMoods.length)];
      return randomMood;
    } else {
      // If no category match, return any random mood
      const randomMood = moodNames[Math.floor(Math.random() * moodNames.length)];
      return randomMood;
    }
  }
  
  module.exports = {
    loadMoods,
    saveMoods,
    addMood,
    listMoods,
    suggestMood,
  };