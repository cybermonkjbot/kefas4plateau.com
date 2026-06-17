import { mkdirSync } from "node:fs";
import path from "node:path";
import {
  createHash,
  randomBytes,
  randomInt,
  randomUUID,
  scryptSync,
  timingSafeEqual,
} from "node:crypto";
import { fileURLToPath } from "node:url";
import Database from "better-sqlite3";
import {
  createBlobAccount,
  createBlobAccountSession,
  getBlobAccountByEmail,
  getBlobAccountBySessionToken,
  revokeBlobAccountSession,
  touchBlobAccountSession,
  updateBlobAccountLastLogin,
} from "./blobAccountStore.js";
import { passphraseWords } from "./passphraseWords.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const projectRoot = path.resolve(__dirname, "..");
const sqlitePath = process.env.PLEDGE_SQLITE_PATH || path.join(projectRoot, ".data", "pledges.sqlite");
const sessionDurationDays = 180;

let database;

export async function registerAccount({ email, name, ipAddress = "", userAgent = "" }) {
  const normalizedEmail = normalizeEmail(email);
  const normalizedName = normalizeName(name);

  if (!normalizedName || !normalizedEmail) {
    throw createAccountError(422, "Enter your name and email.");
  }

  const existingAccount = await findAccountByEmail(normalizedEmail);
  if (existingAccount) {
    throw createAccountError(409, "An account already exists for this email. Sign in with your passphrase.");
  }

  const passphrase = generatePassphrase();
  const now = new Date().toISOString();
  const account = {
    id: randomUUID(),
    createdAt: now,
    email: normalizedEmail,
    name: normalizedName,
    lastLoginAt: now,
    recoveryWordCount: 12,
    passphraseSalt: randomBytes(16).toString("hex"),
  };

  const passphraseHash = hashSecret(normalizePassphrase(passphrase), account.passphraseSalt);
  const session = buildSession({ accountId: account.id, ipAddress, userAgent });

  const store = getStore();
  await store.createAccount({
    ...account,
    passphraseHash,
  });
  await store.createSession(session);

  return {
    account: toPublicAccount(account),
    passphrase,
    sessionToken: session.token,
  };
}

export async function loginAccount({ email, passphrase, ipAddress = "", userAgent = "" }) {
  const normalizedEmail = normalizeEmail(email);
  const normalizedPassphrase = normalizePassphrase(passphrase);

  if (!normalizedEmail || !normalizedPassphrase) {
    throw createAccountError(422, "Enter the email and 12-word passphrase.");
  }

  const account = await findAccountByEmail(normalizedEmail);
  if (!account) {
    throw createAccountError(401, "We couldn't match that email and passphrase.");
  }

  const expectedHash = Buffer.from(account.passphraseHash, "hex");
  const actualHash = Buffer.from(hashSecret(normalizedPassphrase, account.passphraseSalt), "hex");

  if (expectedHash.length !== actualHash.length || !timingSafeEqual(expectedHash, actualHash)) {
    throw createAccountError(401, "We couldn't match that email and passphrase.");
  }

  const session = buildSession({ accountId: account.id, ipAddress, userAgent });
  const store = getStore();
  await Promise.all([
    store.createSession(session),
    store.updateAccountLastLogin(account.id, new Date().toISOString()),
  ]);

  return {
    account: toPublicAccount({
      ...account,
      lastLoginAt: new Date().toISOString(),
    }),
    sessionToken: session.token,
  };
}

export async function getAccountSession(sessionToken) {
  const normalizedToken = normalizeSessionToken(sessionToken);
  if (!normalizedToken) return null;

  const store = getStore();
  const session = await store.getSessionByToken(normalizedToken);

  if (!session) {
    return null;
  }

  if (session.revokedAt) {
    return null;
  }

  if (Date.parse(session.expiresAt) <= Date.now()) {
    return null;
  }

  const nextLastUsedAt = new Date().toISOString();
  await store.touchSession(session.id, nextLastUsedAt);

  return {
    account: toPublicAccount(session.account),
  };
}

export async function revokeAccountSession(sessionToken) {
  const normalizedToken = normalizeSessionToken(sessionToken);
  if (!normalizedToken) return;

  const store = getStore();
  await store.revokeSession(hashToken(normalizedToken), new Date().toISOString());
}

function getStore() {
  if (shouldUseBlobStore()) {
    return {
      createAccount: createBlobAccount,
      createSession: createBlobAccountSession,
      getSessionByToken: getBlobAccountBySessionToken,
      revokeSession: revokeBlobAccountSession,
      touchSession: touchBlobAccountSession,
      updateAccountLastLogin: updateBlobAccountLastLogin,
    };
  }

  if (isVercelRuntime()) {
    return {
      createAccount: unsupportedVercelStorage,
      createSession: unsupportedVercelStorage,
      getSessionByToken: unsupportedVercelStorage,
      revokeSession: unsupportedVercelStorage,
      touchSession: unsupportedVercelStorage,
      updateAccountLastLogin: unsupportedVercelStorage,
    };
  }

  return {
    createAccount: createSqliteAccount,
    createSession: createSqliteAccountSession,
    getSessionByToken: getSqliteAccountBySessionToken,
    revokeSession: revokeSqliteAccountSession,
    touchSession: touchSqliteAccountSession,
    updateAccountLastLogin: updateSqliteAccountLastLogin,
  };
}

function shouldUseBlobStore() {
  return Boolean((process.env.BLOB_READ_WRITE_TOKEN || "").trim());
}

function isVercelRuntime() {
  return process.env.VERCEL === "1";
}

async function unsupportedVercelStorage() {
  const error = new Error(
    "Account storage is not configured for Vercel. Add BLOB_READ_WRITE_TOKEN to enable account creation and passphrase sign-in.",
  );
  error.statusCode = 503;
  throw error;
}

async function findAccountByEmail(email) {
  if (shouldUseBlobStore()) {
    return getBlobAccountByEmail(email);
  }

  if (isVercelRuntime()) {
    return unsupportedVercelStorage();
  }

  return getSqliteAccountByEmail(email);
}

async function createSqliteAccount(account) {
  const db = getDatabase();

  db.prepare(
    `INSERT INTO accounts (
      id,
      created_at,
      email,
      name,
      passphrase_hash,
      passphrase_salt,
      recovery_word_count,
      last_login_at
    ) VALUES (
      @id,
      @createdAt,
      @email,
      @name,
      @passphraseHash,
      @passphraseSalt,
      @recoveryWordCount,
      @lastLoginAt
    )`,
  ).run(account);
}

async function getSqliteAccountByEmail(email) {
  const row = getDatabase()
    .prepare(
      `SELECT
        id,
        created_at AS createdAt,
        email,
        name,
        passphrase_hash AS passphraseHash,
        passphrase_salt AS passphraseSalt,
        recovery_word_count AS recoveryWordCount,
        last_login_at AS lastLoginAt
      FROM accounts
      WHERE email = ?`,
    )
    .get(email);

  return row || null;
}

async function updateSqliteAccountLastLogin(accountId, lastLoginAt) {
  getDatabase()
    .prepare("UPDATE accounts SET last_login_at = ? WHERE id = ?")
    .run(lastLoginAt, accountId);
}

async function createSqliteAccountSession(session) {
  getDatabase()
    .prepare(
      `INSERT INTO account_sessions (
        id,
        account_id,
        token_hash,
        created_at,
        last_used_at,
        expires_at,
        revoked_at,
        ip_address,
        user_agent
      ) VALUES (
        @id,
        @accountId,
        @tokenHash,
        @createdAt,
        @lastUsedAt,
        @expiresAt,
        @revokedAt,
        @ipAddress,
        @userAgent
      )`,
    )
    .run(session);
}

async function getSqliteAccountBySessionToken(sessionToken) {
  const tokenHash = hashToken(sessionToken);

  const row = getDatabase()
    .prepare(
      `SELECT
        sessions.id AS sessionId,
        sessions.account_id AS accountId,
        sessions.created_at AS createdAt,
        sessions.last_used_at AS lastUsedAt,
        sessions.expires_at AS expiresAt,
        sessions.revoked_at AS revokedAt,
        sessions.ip_address AS ipAddress,
        sessions.user_agent AS userAgent,
        accounts.id AS id,
        accounts.created_at AS accountCreatedAt,
        accounts.email AS email,
        accounts.name AS name,
        accounts.recovery_word_count AS recoveryWordCount,
        accounts.last_login_at AS lastLoginAt
      FROM account_sessions AS sessions
      INNER JOIN accounts ON accounts.id = sessions.account_id
      WHERE sessions.token_hash = ?`,
    )
    .get(tokenHash);

  if (!row) return null;

  return {
    id: row.sessionId,
    accountId: row.accountId,
    createdAt: row.createdAt,
    lastUsedAt: row.lastUsedAt,
    expiresAt: row.expiresAt,
    revokedAt: row.revokedAt,
    ipAddress: row.ipAddress,
    userAgent: row.userAgent,
    account: {
      id: row.id,
      createdAt: row.accountCreatedAt,
      email: row.email,
      name: row.name,
      recoveryWordCount: row.recoveryWordCount,
      lastLoginAt: row.lastLoginAt,
    },
  };
}

async function touchSqliteAccountSession(sessionId, lastUsedAt) {
  getDatabase()
    .prepare("UPDATE account_sessions SET last_used_at = ? WHERE id = ?")
    .run(lastUsedAt, sessionId);
}

async function revokeSqliteAccountSession(tokenHash, revokedAt) {
  getDatabase()
    .prepare("UPDATE account_sessions SET revoked_at = ? WHERE token_hash = ?")
    .run(revokedAt, tokenHash);
}

function getDatabase() {
  if (!database) {
    mkdirSync(path.dirname(sqlitePath), { recursive: true });
    database = new Database(sqlitePath);
    database.pragma("journal_mode = WAL");
    database.pragma("foreign_keys = ON");
    ensureSchema(database);
  }

  return database;
}

function ensureSchema(db) {
  db.exec(`CREATE TABLE IF NOT EXISTS accounts (
    id TEXT PRIMARY KEY,
    created_at TEXT NOT NULL,
    email TEXT NOT NULL UNIQUE,
    name TEXT NOT NULL,
    passphrase_hash TEXT NOT NULL,
    passphrase_salt TEXT NOT NULL,
    recovery_word_count INTEGER NOT NULL DEFAULT 12,
    last_login_at TEXT NOT NULL
  );

  CREATE TABLE IF NOT EXISTS account_sessions (
    id TEXT PRIMARY KEY,
    account_id TEXT NOT NULL,
    token_hash TEXT NOT NULL UNIQUE,
    created_at TEXT NOT NULL,
    last_used_at TEXT NOT NULL,
    expires_at TEXT NOT NULL,
    revoked_at TEXT,
    ip_address TEXT NOT NULL DEFAULT '',
    user_agent TEXT NOT NULL DEFAULT '',
    FOREIGN KEY (account_id) REFERENCES accounts (id) ON DELETE CASCADE
  );

  CREATE INDEX IF NOT EXISTS accounts_email_idx
  ON accounts (email);

  CREATE INDEX IF NOT EXISTS account_sessions_account_idx
  ON account_sessions (account_id, created_at DESC);

  CREATE INDEX IF NOT EXISTS account_sessions_expires_idx
  ON account_sessions (expires_at);
  `);
}

function buildSession({ accountId, ipAddress, userAgent }) {
  const token = randomBytes(32).toString("hex");
  const createdAt = new Date().toISOString();

  return {
    id: randomUUID(),
    accountId,
    token,
    tokenHash: hashToken(token),
    createdAt,
    lastUsedAt: createdAt,
    expiresAt: new Date(Date.now() + sessionDurationDays * 24 * 60 * 60 * 1000).toISOString(),
    revokedAt: null,
    ipAddress,
    userAgent,
  };
}

function generatePassphrase() {
  const words = [];
  const usedIndexes = new Set();

  while (words.length < 12) {
    const index = randomInt(0, passphraseWords.length);
    if (usedIndexes.has(index)) continue;
    usedIndexes.add(index);
    words.push(passphraseWords[index]);
  }

  return words.join(" ");
}

function hashSecret(secret, salt) {
  return scryptSync(secret, salt, 32).toString("hex");
}

function hashToken(token) {
  return createHash("sha256").update(token).digest("hex");
}

function normalizeEmail(value) {
  return typeof value === "string" ? value.trim().toLowerCase().slice(0, 160) : "";
}

function normalizeName(value) {
  return typeof value === "string" ? value.trim().replace(/\s+/g, " ").slice(0, 120) : "";
}

function normalizePassphrase(value) {
  return typeof value === "string" ? value.trim().toLowerCase().replace(/\s+/g, " ") : "";
}

function normalizeSessionToken(value) {
  return typeof value === "string" ? value.trim() : "";
}

function toPublicAccount(account) {
  return {
    id: account.id,
    createdAt: account.createdAt,
    email: account.email,
    name: account.name,
    recoveryWordCount: account.recoveryWordCount,
    lastLoginAt: account.lastLoginAt,
  };
}

function createAccountError(statusCode, message) {
  const error = new Error(message);
  error.statusCode = statusCode;
  return error;
}
