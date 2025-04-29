# 🎵 DevMood CLI

A powerful, colorful, interactive CLI tool to manage and play your favorite mood-based YouTube playlists, with history tracking, mood suggestions, backup/restore, and much more!

---

## 📦 Installation

```bash
npm install -g mood-cli
```

> Use `npm link` during development to make it globally available on your system.

---

## 📜 Available Commands

| Command | Description |
| :--- | :--- |
| `play` | Play a mood interactively from the list |
| `list` | List all available moods |
| `add <mood> <url>` | Add a new mood with YouTube playlist URL |
| `remove` | Remove a mood interactively |
| `history` | View history of played moods |
| `suggest` | Suggest a mood based on system time |
| `backup` | Backup moods and history |
| `restore` | Restore moods and history from backup |

---

## 🛠️ Usage

### ▶️ Play a Mood

```bash
mood-cli play
```
- Lists moods.
- Choose interactively.
- Plays selected mood.

---

### 📃 List Moods

```bash
mood-cli list
```
- Shows all available moods you have added.

---

### ➕ Add a Mood

```bash
mood-cli add "Happy Vibes" "https://youtube.com/playlist?list=XYZ"
```
- Adds a new mood with its YouTube playlist URL.

---

### ➖ Remove a Mood

```bash
mood-cli remove
```
- Select and remove a mood from the list.

---

### 🕰️ View History

```bash
mood-cli history
```
- View previously played moods with timestamps.

---

### 💡 Suggest Mood

```bash
mood-cli suggest
```
- Suggests a mood based on current time:
  - Morning → Energetic
  - Afternoon → Chill
  - Evening → Relax
  - Night → Sleepy vibes

---

### 💄 Backup

```bash
mood-cli --backup
```
- Creates backup copies of `moods.json` and `history.json`.

---

### ♻️ Restore

```bash
mood-cli --restore
```
- Restore your moods and history from the backup.

---

## 🧱 Project Structure

```
.
├── moodManager.js       # Manages moods (add, remove, list, save, load)
├── player.js            # Responsible for playing moods
├── logger.js            # Handles colored logging
├── historyManager.js    # Manages played mood history
├── program.js           # CLI command definitions
├── moods.json           # Stored moods (auto-created)
├── history.json         # Played moods history
├── backup/              # Folder for backup files
└── README.md            # Documentation (this file)
```

---

## 🌟 Features

- Interactive CLI prompts (via `inquirer`)
- Colorful outputs (via `chalk`)
- Loading spinners for better UX (via `ora`)
- YouTube playlist launching (via `open`)
- Mood history recording
- Time-based mood suggestions
- Backup and restore functionality
- Modular code structure
- Proper error handling

---

## 🧪 Testing

When testing:

- ✅ Check valid and invalid YouTube URLs.
- ✅ Try playing when no moods are available.
- ✅ Try removing when no moods exist.
- ✅ Simulate wrong inputs and ensure graceful failure.
- ✅ Verify backup/restore works even with corrupted or missing files.

---

## 🚀 Development Guide

1. Clone the repo:
   ```bash
   git clone https://github.com/yourusername/mood-cli.git
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Link the CLI globally for testing:
   ```bash
   npm link
   ```

4. Start using:
   ```bash
   mood-cli play
   mood-cli add "Focus" "https://youtube.com/playlist?list=XXX"
   ```

---

## 📢 Future Enhancements (Optional)

- ☁️ Cloud sync moods with GitHub Gist
- 🗓️ Scheduled mood reminders
- 📱 Mobile companion app

---

## �� License

This project is licensed under the **MIT License**.  
Feel free to use, modify, and distribute.

---

# 🎉 Happy Mood Managing! 🎶

---

