const { db } = require('../database/firebase');
const { logSuccess, logError, logInfo } = require('./logger.js');

// Backup from Firestore: Read all data and copy it to backup collections
async function backupData() {
  try {
    // Read moods
    const moodsSnapshot = await db.collection('moods').get();
    const moodsBackupBatch = db.batch();

    moodsSnapshot.forEach(doc => {
      const backupRef = db.collection('moods_backup').doc(doc.id);
      moodsBackupBatch.set(backupRef, doc.data());
    });

    await moodsBackupBatch.commit();

    // Read history
    const historySnapshot = await db.collection('history').get();
    const historyBackupBatch = db.batch();

    historySnapshot.forEach(doc => {
      const backupRef = db.collection('history_backup').doc(doc.id);
      historyBackupBatch.set(backupRef, doc.data());
    });

    await historyBackupBatch.commit();

    logSuccess('✅ Firestore backup completed to moods_backup and history_backup collections.');
  } catch (error) {
    logError('❌ Error during Firestore backup:', error.message);
  }
}

// Restore from backup collections to main ones
async function restoreData() {
  try {
    // Read moods_backup and restore to moods
    const moodsBackupSnapshot = await db.collection('moods_backup').get();
    const moodsRestoreBatch = db.batch();

    moodsBackupSnapshot.forEach(doc => {
      const restoreRef = db.collection('moods').doc(doc.id);
      moodsRestoreBatch.set(restoreRef, doc.data());
    });

    await moodsRestoreBatch.commit();

    // Read history_backup and restore to history
    const historyBackupSnapshot = await db.collection('history_backup').get();
    const historyRestoreBatch = db.batch();

    historyBackupSnapshot.forEach(doc => {
      const restoreRef = db.collection('history').doc(doc.id);
      historyRestoreBatch.set(restoreRef, doc.data());
    });

    await historyRestoreBatch.commit();

    logSuccess('🔥 Restore from backup completed successfully to moods and history collections.');
  } catch (error) {
    logError('❌ Error during Firestore restore:', error.message);
  }
}

module.exports = {
  backupData,
  restoreData,
};
