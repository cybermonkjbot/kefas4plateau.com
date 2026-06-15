import { mkdirSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import Database from "better-sqlite3";
import { createBlobPledge, getBlobPledgeCount, getBlobPledgeDashboard } from "./blobPledgeStore.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const projectRoot = path.resolve(__dirname, "..");
const sqlitePath = process.env.PLEDGE_SQLITE_PATH || path.join(projectRoot, ".data", "pledges.sqlite");

let database;

export async function getPledgeCount() {
  const store = getStore();
  return store.getPledgeCount();
}

export async function getPledgeDashboard(options = {}) {
  const store = getStore();
  return store.getPledgeDashboard(options);
}

export async function createPledge(pledge) {
  const store = getStore();
  return store.createPledge(pledge);
}

function getStore() {
  if (shouldUseBlobStore()) {
    return {
      createPledge: createBlobPledge,
      getPledgeCount: getBlobPledgeCount,
      getPledgeDashboard: getBlobPledgeDashboard,
    };
  }

  if (isVercelRuntime()) {
    return {
      createPledge: unsupportedVercelStorage,
      getPledgeCount: unsupportedVercelStorage,
      getPledgeDashboard: unsupportedVercelStorage,
    };
  }

  return {
    createPledge: createSqlitePledge,
    getPledgeCount: getSqlitePledgeCount,
    getPledgeDashboard: getSqlitePledgeDashboard,
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
    "Pledge storage is not configured for Vercel. Add BLOB_READ_WRITE_TOKEN to enable submissions and the admin dashboard.",
  );
  error.statusCode = 503;
  throw error;
}

async function getSqlitePledgeCount() {
  const row = getDatabase().prepare("SELECT COUNT(*) AS count FROM pledges").get();
  return row?.count ?? 0;
}

async function getSqlitePledgeDashboard({ search = "", limit = 150 } = {}) {
  const db = getDatabase();
  const safeLimit = Math.max(1, Math.min(500, Number.parseInt(String(limit), 10) || 150));
  const normalizedSearch = search.trim();
  const searchPattern = normalizedSearch ? `%${escapeLikePattern(normalizedSearch)}%` : "";

  const summary = db
    .prepare(
      `SELECT
        COUNT(*) AS total_pledges,
        SUM(CASE WHEN has_selfie = 1 THEN 1 ELSE 0 END) AS selfie_count,
        SUM(CASE WHEN submitted_at >= datetime('now', '-1 day') THEN 1 ELSE 0 END) AS pledges_last_day,
        SUM(CASE WHEN submitted_at >= datetime('now', '-7 day') THEN 1 ELSE 0 END) AS pledges_last_week
      FROM pledges`,
    )
    .get();

  const roles = db
    .prepare(
      `SELECT role, COUNT(*) AS count
      FROM pledges
      GROUP BY role
      ORDER BY count DESC, role ASC`,
    )
    .all();

  const focusAreas = db
    .prepare(
      `SELECT focus, COUNT(*) AS count
      FROM pledges
      GROUP BY focus
      ORDER BY count DESC, focus ASC`,
    )
    .all();

  const queryBase = `SELECT
      id,
      submitted_at AS submittedAt,
      name,
      email,
      phone,
      age_band AS ageBand,
      role,
      focus,
      location,
      availability,
      note,
      has_selfie AS hasSelfie,
      source,
      ip_address AS ipAddress,
      user_agent AS userAgent
    FROM pledges`;

  const whereClause = normalizedSearch
    ? ` WHERE
      name LIKE @search ESCAPE '\\' OR
      email LIKE @search ESCAPE '\\' OR
      phone LIKE @search ESCAPE '\\' OR
      role LIKE @search ESCAPE '\\' OR
      focus LIKE @search ESCAPE '\\' OR
      location LIKE @search ESCAPE '\\' OR
      availability LIKE @search ESCAPE '\\' OR
      note LIKE @search ESCAPE '\\'`
    : "";

  const pledges = db
    .prepare(`${queryBase}${whereClause} ORDER BY submitted_at DESC LIMIT @limit`)
    .all({ search: searchPattern, limit: safeLimit })
    .map((pledge) => ({
      ...pledge,
      hasSelfie: Boolean(pledge.hasSelfie),
    }));

  const filteredCountRow = normalizedSearch
    ? db
        .prepare(`SELECT COUNT(*) AS count FROM pledges${whereClause}`)
        .get({ search: searchPattern })
    : { count: summary?.total_pledges ?? 0 };

  return {
    summary: {
      totalPledges: summary?.total_pledges ?? 0,
      selfieCount: summary?.selfie_count ?? 0,
      pledgesLastDay: summary?.pledges_last_day ?? 0,
      pledgesLastWeek: summary?.pledges_last_week ?? 0,
      filteredCount: filteredCountRow?.count ?? 0,
    },
    roles,
    focusAreas,
    pledges,
  };
}

async function createSqlitePledge(pledge) {
  const db = getDatabase();

  db.prepare(
    `INSERT INTO pledges (
      id,
      submitted_at,
      name,
      email,
      phone,
      age_band,
      role,
      focus,
      location,
      availability,
      note,
      selfie_data_url,
      has_selfie,
      source,
      ip_address,
      user_agent
    ) VALUES (
      @id,
      @submittedAt,
      @name,
      @email,
      @phone,
      @ageBand,
      @role,
      @focus,
      @location,
      @availability,
      @note,
      @selfieDataUrl,
      @hasSelfie,
      @source,
      @ipAddress,
      @userAgent
    )`,
  ).run({
    ...pledge,
    hasSelfie: pledge.hasSelfie ? 1 : 0,
  });

  const count = await getSqlitePledgeCount();
  return { count, id: pledge.id };
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
  db.exec(`CREATE TABLE IF NOT EXISTS pledges (
    id TEXT PRIMARY KEY,
    submitted_at TEXT NOT NULL,
    name TEXT NOT NULL,
    email TEXT NOT NULL,
    phone TEXT NOT NULL DEFAULT '',
    age_band TEXT NOT NULL,
    role TEXT NOT NULL,
    focus TEXT NOT NULL,
    location TEXT NOT NULL,
    availability TEXT NOT NULL,
    note TEXT NOT NULL,
    selfie_data_url TEXT NOT NULL DEFAULT '',
    has_selfie INTEGER NOT NULL DEFAULT 0,
    source TEXT NOT NULL,
    ip_address TEXT NOT NULL DEFAULT '',
    user_agent TEXT NOT NULL DEFAULT ''
  );

  CREATE INDEX IF NOT EXISTS pledges_submitted_at_idx
  ON pledges (submitted_at DESC);
  `);
}

function escapeLikePattern(value) {
  return value.replace(/[\\%_]/g, "\\$&");
}
