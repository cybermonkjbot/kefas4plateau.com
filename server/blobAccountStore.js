import { get, put } from "@vercel/blob";
import { createHash } from "node:crypto";

const accountPrefix = "accounts/";
const emailIndexPrefix = "account-email-index/";
const sessionPrefix = "account-sessions/";

export async function createBlobAccount(account) {
  await Promise.all([
    put(accountBlobPath(account.id), JSON.stringify(account), {
      access: "private",
      addRandomSuffix: false,
      contentType: "application/json; charset=utf-8",
    }),
    put(emailIndexBlobPath(account.email), JSON.stringify({ accountId: account.id }), {
      access: "private",
      addRandomSuffix: false,
      contentType: "application/json; charset=utf-8",
    }),
  ]);
}

export async function getBlobAccountByEmail(email) {
  const emailIndex = await readBlobJson(emailIndexBlobPath(email));
  if (!emailIndex?.accountId) return null;
  return readBlobJson(accountBlobPath(emailIndex.accountId));
}

export async function updateBlobAccountLastLogin(accountId, lastLoginAt) {
  const account = await readBlobJson(accountBlobPath(accountId));
  if (!account) return;

  await put(accountBlobPath(accountId), JSON.stringify({ ...account, lastLoginAt }), {
    access: "private",
    addRandomSuffix: false,
    contentType: "application/json; charset=utf-8",
  });
}

export async function createBlobAccountSession(session) {
  const storedSession = {
    ...session,
    token: undefined,
  };

  await Promise.all([
    put(sessionBlobPath(session.tokenHash), JSON.stringify(storedSession), {
      access: "private",
      addRandomSuffix: false,
      contentType: "application/json; charset=utf-8",
    }),
    put(sessionLookupBlobPath(session.id), JSON.stringify({ tokenHash: session.tokenHash }), {
      access: "private",
      addRandomSuffix: false,
      contentType: "application/json; charset=utf-8",
    }),
  ]);
}

export async function getBlobAccountBySessionToken(sessionToken) {
  const tokenHash = hashToken(sessionToken);
  const session = await readBlobJson(sessionBlobPath(tokenHash));
  if (!session) return null;

  const account = await readBlobJson(accountBlobPath(session.accountId));
  if (!account) return null;

  return {
    ...session,
    account,
  };
}

export async function touchBlobAccountSession(sessionId, lastUsedAt) {
  const existing = await findBlobSessionById(sessionId);
  if (!existing) return;

  await put(sessionBlobPath(existing.tokenHash), JSON.stringify({ ...existing, lastUsedAt }), {
    access: "private",
    addRandomSuffix: false,
    contentType: "application/json; charset=utf-8",
  });
}

export async function revokeBlobAccountSession(tokenHash, revokedAt) {
  const existing = await readBlobJson(sessionBlobPath(tokenHash));
  if (!existing) return;

  await put(sessionBlobPath(tokenHash), JSON.stringify({ ...existing, revokedAt }), {
    access: "private",
    addRandomSuffix: false,
    contentType: "application/json; charset=utf-8",
  });
}

async function findBlobSessionById(sessionId) {
  const session = await readBlobJson(sessionLookupBlobPath(sessionId));
  if (!session?.tokenHash) return null;
  return readBlobJson(sessionBlobPath(session.tokenHash));
}

async function readBlobJson(pathname) {
  const response = await get(pathname, {
    access: "private",
    useCache: false,
  });

  if (!response || response.statusCode !== 200 || !response.stream) {
    return null;
  }

  return new Response(response.stream).json();
}

function accountBlobPath(accountId) {
  return `${accountPrefix}${accountId}.json`;
}

function emailIndexBlobPath(email) {
  return `${emailIndexPrefix}${hashToken(email)}.json`;
}

function sessionBlobPath(tokenHash) {
  return `${sessionPrefix}${tokenHash}.json`;
}

function sessionLookupBlobPath(sessionId) {
  return `${sessionPrefix}by-id/${sessionId}.json`;
}

function hashToken(value) {
  return createHash("sha256").update(value).digest("hex");
}
