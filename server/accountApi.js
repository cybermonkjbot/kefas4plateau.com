import {
  getAccountSession,
  loginAccount,
  registerAccount,
  revokeAccountSession,
} from "./accountStore.js";

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const maxJsonBytes = 64 * 1024;

export async function handleAccountApiRequest(request, response) {
  const url = new URL(request.url, `http://${request.headers.host || "localhost"}`);

  if (url.pathname === "/api/accounts/register") {
    if (request.method !== "POST") {
      sendJson(response, 405, { error: "Method not allowed." }, { Allow: "POST, OPTIONS" });
      return;
    }

    try {
      const body = await readJsonBody(request);
      const payload = validateRegistrationBody(body);
      const session = await registerAccount({
        ...payload,
        ipAddress: getClientIp(request),
        userAgent: request.headers["user-agent"] || "",
      });

      sendJson(response, 201, {
        ok: true,
        ...session,
      });
    } catch (error) {
      handleApiError(response, error, "We couldn't create your account just now.");
    }
    return;
  }

  if (url.pathname === "/api/accounts/login") {
    if (request.method !== "POST") {
      sendJson(response, 405, { error: "Method not allowed." }, { Allow: "POST, OPTIONS" });
      return;
    }

    try {
      const body = await readJsonBody(request);
      const payload = validateLoginBody(body);
      const session = await loginAccount({
        ...payload,
        ipAddress: getClientIp(request),
        userAgent: request.headers["user-agent"] || "",
      });

      sendJson(response, 200, {
        ok: true,
        ...session,
      });
    } catch (error) {
      handleApiError(response, error, "We couldn't sign you in just now.");
    }
    return;
  }

  if (url.pathname === "/api/accounts/session") {
    const sessionToken = getBearerToken(request);

    if (request.method === "GET") {
      try {
        const session = await getAccountSession(sessionToken);
        if (!session) {
          sendJson(response, 401, { ok: false, error: "This device is signed out." });
          return;
        }

        sendJson(response, 200, {
          ok: true,
          ...session,
        });
      } catch (error) {
        handleApiError(response, error, "We couldn't verify this session.");
      }
      return;
    }

    if (request.method === "DELETE") {
      try {
        await revokeAccountSession(sessionToken);
        sendJson(response, 200, { ok: true });
      } catch (error) {
        handleApiError(response, error, "We couldn't sign this device out.");
      }
      return;
    }

    sendJson(response, 405, { error: "Method not allowed." }, { Allow: "GET, DELETE, OPTIONS" });
    return;
  }

  if (request.method === "OPTIONS") {
    const allowHeader = getAllowHeader(url.pathname);
    if (!allowHeader) {
      sendJson(response, 404, { error: "Not found." });
      return;
    }

    response.writeHead(204, {
      Allow: allowHeader,
      "Cache-Control": "no-store",
    });
    response.end();
    return;
  }

  sendJson(response, 404, { error: "Not found." });
}

function validateRegistrationBody(body) {
  const email = normalizeText(body.email, 160).toLowerCase();
  const name = normalizeText(body.name, 120);

  if (!name) {
    throw createApiError(422, "Enter your name.");
  }

  if (!emailPattern.test(email)) {
    throw createApiError(422, "Use a valid email address.");
  }

  return { email, name };
}

function validateLoginBody(body) {
  const email = normalizeText(body.email, 160).toLowerCase();
  const passphrase = typeof body.passphrase === "string" ? body.passphrase.trim() : "";

  if (!emailPattern.test(email)) {
    throw createApiError(422, "Use the email tied to your account.");
  }

  if (passphrase.split(/\s+/).filter(Boolean).length !== 12) {
    throw createApiError(422, "Enter your full 12-word passphrase.");
  }

  return { email, passphrase };
}

async function readJsonBody(request) {
  const chunks = [];
  let size = 0;

  for await (const chunk of request) {
    size += chunk.length;
    if (size > maxJsonBytes) {
      throw createApiError(413, "That request is too large.");
    }
    chunks.push(chunk);
  }

  if (!chunks.length) return {};

  try {
    return JSON.parse(Buffer.concat(chunks).toString("utf8"));
  } catch {
    throw createApiError(400, "Send account details as valid JSON.");
  }
}

function getClientIp(request) {
  const forwarded = request.headers["x-forwarded-for"];

  if (typeof forwarded === "string" && forwarded.trim()) {
    return forwarded.split(",")[0].trim();
  }

  return request.socket?.remoteAddress || "";
}

function getBearerToken(request) {
  const authHeader = request.headers.authorization || "";
  return authHeader.startsWith("Bearer ") ? authHeader.slice(7).trim() : "";
}

function getAllowHeader(pathname) {
  if (pathname === "/api/accounts/register") return "POST, OPTIONS";
  if (pathname === "/api/accounts/login") return "POST, OPTIONS";
  if (pathname === "/api/accounts/session") return "GET, DELETE, OPTIONS";
  return "";
}

function handleApiError(response, error, fallbackMessage) {
  if (error?.statusCode) {
    sendJson(response, error.statusCode, { ok: false, error: error.message });
    return;
  }

  console.error("Account API error", error);
  sendJson(response, 500, { ok: false, error: fallbackMessage });
}

function normalizeText(value, maxLength) {
  return typeof value === "string" ? value.trim().replace(/\s+/g, " ").slice(0, maxLength) : "";
}

function createApiError(statusCode, message) {
  const error = new Error(message);
  error.statusCode = statusCode;
  return error;
}

function sendJson(response, statusCode, payload, extraHeaders = {}) {
  response.writeHead(statusCode, {
    "Cache-Control": "no-store",
    "Content-Type": "application/json; charset=utf-8",
    ...extraHeaders,
  });
  response.end(JSON.stringify(payload));
}
