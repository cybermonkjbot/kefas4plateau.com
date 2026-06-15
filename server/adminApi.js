import { assertAdminAccess, isAdminConfigured } from "./adminAuth.js";
import { presentPledgeCount } from "./pledgeCountPresentation.js";
import { getPledgeDashboard, getPledgeCount } from "./pledgeStore.js";

export async function handleAdminApiRequest(request, response) {
  const url = new URL(request.url, `http://${request.headers.host || "localhost"}`);

  if (url.pathname === "/api/admin/session") {
    if (request.method !== "GET") {
      sendJson(response, 405, { error: "Method not allowed." }, { Allow: "GET" });
      return;
    }

    try {
      assertAdminAccess(request);
      sendJson(response, 200, { ok: true, configured: true });
    } catch (error) {
      const statusCode = error.statusCode || 500;
      sendJson(response, statusCode, {
        ok: false,
        configured: isAdminConfigured(),
        error: error.message,
      });
    }
    return;
  }

  if (url.pathname !== "/api/admin/pledges") {
    sendJson(response, 404, { error: "Not found." });
    return;
  }

  if (request.method !== "GET") {
    sendJson(response, 405, { error: "Method not allowed." }, { Allow: "GET" });
    return;
  }

  try {
    assertAdminAccess(request);

    const search = url.searchParams.get("search") || "";
    const limit = url.searchParams.get("limit") || "150";
    const [dashboard, realCount] = await Promise.all([
      getPledgeDashboard({ search, limit }),
      getPledgeCount(),
    ]);

    sendJson(response, 200, {
      ok: true,
      countPresentation: presentPledgeCount(realCount),
      ...dashboard,
    });
  } catch (error) {
    const statusCode = error.statusCode || 500;
    if (statusCode >= 500) {
      console.error("Failed to load admin pledge dashboard", error);
    }
    sendJson(response, statusCode, {
      ok: false,
      configured: isAdminConfigured(),
      error: error.message || "We couldn't load the admin dashboard.",
    });
  }
}

function sendJson(response, statusCode, payload, extraHeaders = {}) {
  response.writeHead(statusCode, {
    "Cache-Control": "no-store",
    "Content-Type": "application/json; charset=utf-8",
    ...extraHeaders,
  });
  response.end(JSON.stringify(payload));
}
