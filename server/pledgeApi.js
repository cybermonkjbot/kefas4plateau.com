import { randomUUID } from "node:crypto";
import { ageBands, availabilityOptions, focusOptions, roleOptions } from "../src/data/pledgeOptions.js";
import { presentPledgeCount } from "./pledgeCountPresentation.js";
import { createPledge, getPledgeCount } from "./pledgeStore.js";

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const selfiePattern = /^data:image\/(?:jpeg|jpg|png|webp);base64,/i;
const maxJsonBytes = 3 * 1024 * 1024;

export async function handlePledgeApiRequest(request, response) {
  const url = new URL(request.url, `http://${request.headers.host || "localhost"}`);
  const isCountEndpoint = url.pathname === "/api/pledges/count";
  const isPledgesEndpoint = url.pathname === "/api/pledges";

  if (!isCountEndpoint && !isPledgesEndpoint) {
    sendJson(response, 404, { error: "Not found." });
    return;
  }

  if (request.method === "GET" && (isCountEndpoint || isPledgesEndpoint)) {
    try {
      const realCount = await getPledgeCount();
      sendJson(response, 200, presentPledgeCount(realCount));
    } catch (error) {
      const statusCode = error.statusCode || 500;

      if (statusCode >= 500) {
        console.error("Failed to load pledge count", error);
      }

      sendJson(response, statusCode, {
        error: error.message || "We couldn't load the pledge count right now.",
      });
    }
    return;
  }

  if (request.method === "POST" && isPledgesEndpoint) {
    try {
      const body = await readJsonBody(request);
      const pledge = validatePledgeBody(body, request);
      const saved = await createPledge(pledge);
      sendJson(response, 201, {
        ok: true,
        pledgeId: saved.id,
        ...presentPledgeCount(saved.count),
      });
      return;
    } catch (error) {
      if (error instanceof ApiError) {
        sendJson(response, error.statusCode, { error: error.message, details: error.details });
        return;
      }

      if (error?.statusCode) {
        sendJson(response, error.statusCode, { error: error.message });
        return;
      }

      console.error("Failed to save pledge", error);
      sendJson(response, 500, { error: "We couldn't save your pledge just now." });
      return;
    }
  }

  if (request.method === "OPTIONS") {
    response.writeHead(204, {
      Allow: isCountEndpoint ? "GET, OPTIONS" : "GET, POST, OPTIONS",
      "Cache-Control": "no-store",
    });
    response.end();
    return;
  }

  sendJson(
    response,
    405,
    { error: "Method not allowed." },
    { Allow: isCountEndpoint ? "GET, OPTIONS" : "GET, POST, OPTIONS" },
  );
}

function validatePledgeBody(body, request) {
  const payload = {
    name: normalizeText(body.name, 120),
    email: normalizeText(body.email, 160).toLowerCase(),
    phone: normalizeText(body.phone, 40),
    ageBand: normalizeText(body.ageBand, 20),
    role: normalizeText(body.role, 40),
    focus: normalizeText(body.focus, 60),
    location: normalizeText(body.location, 120),
    availability: normalizeText(body.availability, 60),
    note: normalizeText(body.note, 400),
    selfieDataUrl: typeof body.selfieDataUrl === "string" ? body.selfieDataUrl.trim() : "",
  };

  const details = {};

  if (!payload.name) details.name = "Tell us your name.";
  if (!payload.email || !emailPattern.test(payload.email)) details.email = "Use a valid email address.";
  if (!ageBands.includes(payload.ageBand)) details.ageBand = "Choose your age band.";
  if (!roleOptions.includes(payload.role)) details.role = "Choose how you want to help.";
  if (!focusOptions.includes(payload.focus)) details.focus = "Choose a focus area.";
  if (!payload.location) details.location = "Tell us where you are based.";
  if (!availabilityOptions.includes(payload.availability)) details.availability = "Choose your availability.";
  if (!payload.note) details.note = "Tell the team how you want to help.";
  if (payload.selfieDataUrl && !selfiePattern.test(payload.selfieDataUrl)) {
    details.selfieDataUrl = "Use a supported selfie image.";
  }
  if (payload.selfieDataUrl.length > 2 * 1024 * 1024) {
    details.selfieDataUrl = "Keep the selfie image small enough to upload.";
  }

  if (Object.keys(details).length > 0) {
    throw new ApiError(422, "Some pledge details need attention.", details);
  }

  return {
    id: randomUUID(),
    submittedAt: new Date().toISOString(),
    ...payload,
    hasSelfie: Boolean(payload.selfieDataUrl),
    source: "website",
    ipAddress: getClientIp(request),
    userAgent: request.headers["user-agent"] || "",
  };
}

async function readJsonBody(request) {
  const chunks = [];
  let size = 0;

  for await (const chunk of request) {
    size += chunk.length;

    if (size > maxJsonBytes) {
      throw new ApiError(413, "This pledge is too large to upload.");
    }

    chunks.push(chunk);
  }

  if (chunks.length === 0) {
    return {};
  }

  try {
    return JSON.parse(Buffer.concat(chunks).toString("utf8"));
  } catch {
    throw new ApiError(400, "Send pledge details as valid JSON.");
  }
}

function normalizeText(value, maxLength) {
  return typeof value === "string" ? value.trim().slice(0, maxLength) : "";
}

function getClientIp(request) {
  const forwarded = request.headers["x-forwarded-for"];

  if (typeof forwarded === "string" && forwarded.trim()) {
    return forwarded.split(",")[0].trim();
  }

  return request.socket?.remoteAddress || "";
}

function sendJson(response, statusCode, payload, extraHeaders = {}) {
  response.writeHead(statusCode, {
    "Cache-Control": "no-store",
    "Content-Type": "application/json; charset=utf-8",
    ...extraHeaders,
  });
  response.end(JSON.stringify(payload));
}

class ApiError extends Error {
  constructor(statusCode, message, details = undefined) {
    super(message);
    this.name = "ApiError";
    this.statusCode = statusCode;
    this.details = details;
  }
}
