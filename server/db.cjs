const Database = require('better-sqlite3');
const path = require('path');

const DB_PATH = path.join(__dirname, '..', 'data.db');

const db = new Database(DB_PATH);

// Enable WAL mode for better concurrent performance
db.pragma('journal_mode = WAL');
db.pragma('foreign_keys = ON');

// Create tables
db.exec(`
  CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    email TEXT UNIQUE NOT NULL COLLATE NOCASE,
    password_hash TEXT NOT NULL,
    is_verified INTEGER DEFAULT 0,
    verify_token TEXT,
    created_at TEXT DEFAULT (datetime('now'))
  );

  CREATE TABLE IF NOT EXISTS mastery (
    user_id INTEGER NOT NULL,
    concept TEXT NOT NULL,
    total_attempts INTEGER DEFAULT 0,
    correct_first INTEGER DEFAULT 0,
    correct_with_help INTEGER DEFAULT 0,
    failed INTEGER DEFAULT 0,
    PRIMARY KEY (user_id, concept),
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
  );

  CREATE TABLE IF NOT EXISTS history (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id INTEGER NOT NULL,
    template_id TEXT,
    concept TEXT,
    character_id TEXT,
    step_results TEXT,
    created_at INTEGER DEFAULT (unixepoch()),
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
  );
`);

// ── Migrate: add enhanced history columns if missing ──────────
const historyColumns = db.prepare("PRAGMA table_info(history)").all().map(c => c.name);
const newCols = [
  ['difficulty', 'INTEGER DEFAULT 1'],
  ['time_taken_ms', 'INTEGER DEFAULT 0'],
  ['total_steps', 'INTEGER DEFAULT 0'],
  ['correct_first_count', 'INTEGER DEFAULT 0'],
  ['correct_with_help_count', 'INTEGER DEFAULT 0'],
  ['failed_count', 'INTEGER DEFAULT 0'],
];
for (const [col, def] of newCols) {
  if (!historyColumns.includes(col)) {
    db.exec(`ALTER TABLE history ADD COLUMN ${col} ${def}`);
  }
}

// Auto-insert default user (id=1) on startup
const defaultUser = db.prepare('SELECT id FROM users WHERE id = 1').get();
if (!defaultUser) {
  db.prepare(
    "INSERT INTO users (id, email, password_hash, is_verified) VALUES (1, 'default@local', 'none', 1)"
  ).run();
}

// Prepared statements
const stmts = {
  // Mastery
  getMastery: db.prepare('SELECT * FROM mastery WHERE user_id = ?'),
  upsertMastery: db.prepare(`
    INSERT INTO mastery (user_id, concept, total_attempts, correct_first, correct_with_help, failed)
    VALUES (?, ?, 1, ?, ?, ?)
    ON CONFLICT(user_id, concept) DO UPDATE SET
      total_attempts = total_attempts + 1,
      correct_first = correct_first + excluded.correct_first,
      correct_with_help = correct_with_help + excluded.correct_with_help,
      failed = failed + excluded.failed
  `),

  // History
  countHistory: db.prepare(
    'SELECT COUNT(*) as count FROM history WHERE user_id = ?'
  ),
  getHistory: db.prepare(
    'SELECT * FROM history WHERE user_id = ? ORDER BY created_at DESC LIMIT 100'
  ),
  addHistory: db.prepare(`
    INSERT INTO history (user_id, template_id, concept, character_id, step_results,
      difficulty, time_taken_ms, total_steps, correct_first_count, correct_with_help_count, failed_count)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `),
  getDetailedHistory: db.prepare(
    'SELECT * FROM history WHERE user_id = ? ORDER BY created_at DESC LIMIT ?'
  ),

  // Reset
  deleteMastery: db.prepare('DELETE FROM mastery WHERE user_id = ?'),
  deleteHistory: db.prepare('DELETE FROM history WHERE user_id = ?'),
};

module.exports = { db, stmts };
