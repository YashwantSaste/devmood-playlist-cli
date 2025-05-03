const chalk = require('chalk');

// Info log
const logInfo = (message) => {
  console.log(chalk.blue(`[INFO] ${message}`));
};

// Success log
const logSuccess = (message) => {
  console.log(chalk.green(`[SUCCESS] ${message}`));
};

// Warning log
const logWarning = (message) => {
  console.log(chalk.yellow(`[WARNING] ${message}`));
};

// Error log
const logError = (message) => {
  console.log(chalk.red(`[ERROR] ${message}`));
};

module.exports = {
  logInfo,
  logSuccess,
  logWarning,
  logError,
};
