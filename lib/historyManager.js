// lib/historyManager.js
import fs from 'fs-extra';
import path from 'path';

const historyFilePath = path.join(process.cwd(), 'history.json');

// Load history
export function loadHistory() {
  try {
    if (fs.existsSync(historyFilePath)) {
      const historyData = fs.readFileSync(historyFilePath, 'utf-8');
      return JSON.parse(historyData);
    }
    return [];
  } catch (error) {
    console.error('Error reading history file:', error);
    return [];
  }
}

// Save history
export function saveHistory(history) {
  try {
    fs.writeFileSync(historyFilePath, JSON.stringify(history, null, 2), 'utf-8');
  } catch (error) {
    console.error('Error writing to history file:', error);
  }
}

// Add to history
export function addToHistory(mood) {
  const history = loadHistory();
  const datePlayed = new Date().toLocaleString(); // 🛠 Changed to Human-Readable format!
  history.push({ mood, datePlayed });
  saveHistory(history);
}
