const fs = require('fs-extra');
const path = require('path');

const historyFilePath = path.join(process.cwd(), 'history.json');

// Load history
function loadHistory() {
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
function saveHistory(history) {
  try {
    fs.writeFileSync(historyFilePath, JSON.stringify(history, null, 2), 'utf-8');
  } catch (error) {
    console.error('Error writing to history file:', error);
  }
}

// Add to history
function addToHistory(mood) {
  const history = loadHistory();
  const datePlayed = new Date().toLocaleString(); // 🛠 Changed to Human-Readable format!
  history.push({ mood, datePlayed });
  saveHistory(history);
}

module.exports = {
  loadHistory,
  saveHistory,
  addToHistory,
};
