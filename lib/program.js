const { Command } = require('commander');
const inquirer = require('inquirer');
const { playMood } = require('./player.js');
const { listMoods, addMood, loadMoods, saveMoods, suggestMood } = require('./moodManager.js');
const { logInfo, logSuccess, logError } = require('./logger.js');
const { loadHistory } = require('./historyManager.js');
const { backupData, restoreData } = require('./backupManager.js');
const ora = require('ora').default; // Use .default for ESM compatibility in CommonJS
const chalk = require('chalk');
const fs = require('fs');

const program = new Command();

// Command to play a specific mood interactively
program.command('play')
  .description('Play a mood playlist')
  .action(async () => {
    try {
      const moods = await loadMoods();
      const moodChoices = Object.keys(moods); // Get mood names

      if (moodChoices.length === 0) {
        logError('No moods available!');
        return;
      }

      // Ask the user to select a mood
      const answers = await inquirer.prompt([
        {
          type: 'list',
          name: 'mood',
          message: 'Choose a mood to play:',
          choices: moodChoices,
        },
      ]);
      const spinner = ora(`Playing mood: ${answers.mood}`).start(); 
      await playMood(answers.mood);  // Play the selected mood
      spinner.succeed(chalk.green(`${answers.mood} is now playing! `));
    } catch (error) {
      logError(`Error: ${error.message}`);
    }
  });

// Command to list all available moods
program.command('list')
  .description('List all available moods')
  .action(async () => {
    try {
      await listMoods();  // Call listMoods from moodManager.js
    } catch (error) {
      logError(`Error: ${error.message}`);
    }
  });

// Command to add a new mood with a YouTube playlist URL
program.command('add')
  .description('Add a new mood with a YouTube playlist')
  .argument('<mood>', 'Mood name')
  .argument('<url>', 'YouTube playlist URL')
  .action(async (mood, url) => {
    try {
        const spinner = ora(`Adding mood: ${mood}`).start();
        await addMood(mood, url);  // Add a new mood using the addMood function
        spinner.succeed(chalk.green(`${mood} added successfully! 🎉`));
    } catch (error) {
      logError(`Error: ${error.message}`);
    }
  });

// Command to remove a mood interactively
program.command('remove')
  .description('Remove a mood')
  .action(async () => {
    try {
      const moods = await loadMoods();
      const moodChoices = Object.keys(moods);

      if (moodChoices.length === 0) {
        logError('No moods available to remove!');
        return;
      }

      const answers = await inquirer.prompt([
        {
          type: 'list',
          name: 'mood',
          message: 'Select a mood to remove:',
          choices: moodChoices,
        },
      ]);

      const spinner = ora(`Removing mood: ${answers.mood}`).start();
      delete moods[answers.mood]; // Remove the selected mood
      await saveMoods(moods);  // Save the updated moods
      spinner.succeed(chalk.green(`Mood '${answers.mood}' removed successfully! 🗑️`));
    } catch (error) {
      logError(`Error: ${error.message}`);
    }
  });

// Command to export moods to a JSON file
program.command('export <filename>')
  .description('Export moods to a JSON file')
  .action(async (filename) => {
    try {
      const moods = await loadMoods();
      const fs = require('fs');
      fs.writeFileSync(filename, JSON.stringify(moods, null, 2)); // Write moods to file
      logSuccess(`Moods exported to ${filename}`);
    } catch (error) {
      logError(`Error: ${error.message}`);
    }
  });

// Command to import moods from a JSON file
program.command('import <filename>')
  .description('Import moods from a JSON file')
  .action(async (filename) => {
    try {
      const fs = require('fs');
      const data = fs.readFileSync(filename, 'utf-8');
      const moods = JSON.parse(data); // Parse the imported JSON data
      await saveMoods(moods);
      logSuccess(`Moods imported from ${filename}`);
    } catch (error) {
      logError(`Error: ${error.message}`);
    }
  });


  // Command to view the history of played moods
program.command('history')
.description('View the history of played moods')
.action(async () => {
  try {
    const history = loadHistory();
    if (history.length === 0) {
      logError('No history available.');
      return;
    }

    // Display the history
    logInfo(chalk.blue('History of played moods:'));
    history.forEach((entry, index) => {
        logInfo(`${index + 1}. ${chalk.cyan(entry.mood)} (Played on: ${entry.datePlayed})`);
    });
  } catch (error) {
    logError(`Error: ${error.message}`);
  }
});

program
  .command('suggest')
  .description('Suggest a mood based on the time of day')
  .action(async () => {
    try {
      const mood = await suggestMood();
      if (mood) {
        logSuccess(chalk.green(`💡 Suggested mood for you: ${mood}`));
      } else {
        logError('No moods available to suggest.');
      }
    } catch (error) {
      logError(`Error: ${error.message}`);
    }
  });

  // Command to backup moods and history data
program.command('backup')
.description('Backup the moods and history data')
.action(async () => {
  try {
    await backupData(); // Backup data
  } catch (error) {
    logError(`Error during backup: ${error.message}`);
  }
});

// Command to restore moods and history data from a backup
program.command('restore')
.description('Restore moods and history data from a backup')
.action(async () => {
  try {
    await restoreData(); // Restore data
  } catch (error) {
    logError(`Error during restore: ${error.message}`);
  }
});


module.exports = program;
