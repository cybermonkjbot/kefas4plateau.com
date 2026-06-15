const adminPassword = (process.env.PLEDGE_ADMIN_PASSWORD || "").trim();

export function assertAdminAccess(request) {
  if (!adminPassword) {
    const error = new Error("Admin access is not configured.");
    error.statusCode = 503;
    throw error;
  }

  const authHeader = request.headers.authorization || "";
  const token = authHeader.startsWith("Bearer ") ? authHeader.slice(7).trim() : "";

  if (!token || token !== adminPassword) {
    const error = new Error("Admin access denied.");
    error.statusCode = 401;
    throw error;
  }
}

export function isAdminConfigured() {
  return Boolean(adminPassword);
}
