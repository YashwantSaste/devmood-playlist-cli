import chalk from 'chalk';

// Info log
export const logInfo = (message) => {
  console.log(chalk.blue(`[INFO] ${message}`));
};

// Success log
export const logSuccess = (message) => {
  console.log(chalk.green(`[SUCCESS] ${message}`));
};

// Warning log
export const logWarning = (message) => {
  console.log(chalk.yellow(`[WARNING] ${message}`));
};

// Error log
export const logError = (message) => {
  console.log(chalk.red(`[ERROR] ${message}`));
};
