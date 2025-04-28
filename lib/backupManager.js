import fs from 'fs-extra';
import path from 'path';
import { logInfo, logSuccess, logError } from './logger.js';

const moodsFilePath = path.join(process.cwd(), 'moods.json');
const historyFilePath = path.join(process.cwd(), 'history.json');
const backupDirPath = path.join(process.cwd(), 'backup');

// Ensure backup directory exists
async function ensureBackupDir() {
  try {
    if (!(await fs.pathExists(backupDirPath))) {
      await fs.mkdir(backupDirPath);
      logInfo('Backup directory created.');
    }
  } catch (error) {
    logError('Error ensuring backup directory:', error);
    throw error; // important to throw so the caller knows
  }
}

// Backup moods.json and history.json
export async function backupData() {
  try {
    await ensureBackupDir();

    await fs.copy(moodsFilePath, path.join(backupDirPath, 'moods_backup.json'));
    await fs.copy(historyFilePath, path.join(backupDirPath, 'history_backup.json'));

    logSuccess('Backup completed successfully! 🎉');
  } catch (error) {
    logError('Error creating backup:', error);
  }
}

// Restore moods.json and history.json from backups
export async function restoreData() {
  try {
    await ensureBackupDir();

    const moodsBackupPath = path.join(backupDirPath, 'moods_backup.json');
    const historyBackupPath = path.join(backupDirPath, 'history_backup.json');

    // Check if backup files exist
    if (!(await fs.pathExists(moodsBackupPath)) || !(await fs.pathExists(historyBackupPath))) {
      logError('Backup files not found. Please create a backup first.');
      return;
    }

    await fs.copy(moodsBackupPath, moodsFilePath);
    await fs.copy(historyBackupPath, historyFilePath);

    logSuccess('Restore completed successfully! 🔥');
  } catch (error) {
    logError('Error restoring backup:', error);
  }
}
