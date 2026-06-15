import { createReadStream, existsSync } from "node:fs";
import { stat } from "node:fs/promises";
import http from "node:http";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { handleAdminApiRequest } from "../server/adminApi.js";
import { handlePledgeApiRequest } from "../server/pledgeApi.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const projectRoot = path.resolve(__dirname, "..");
const distDir = path.join(projectRoot, "dist");
const port = Number.parseInt(process.env.PORT || "4321", 10);

const mimeTypes = {
  ".css": "text/css; charset=utf-8",
  ".html": "text/html; charset=utf-8",
  ".jpeg": "image/jpeg",
  ".jpg": "image/jpeg",
  ".js": "text/javascript; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".png": "image/png",
  ".svg": "image/svg+xml",
  ".txt": "text/plain; charset=utf-8",
  ".webmanifest": "application/manifest+json; charset=utf-8",
  ".webp": "image/webp",
  ".xml": "application/xml; charset=utf-8",
};

const server = http.createServer(async (request, response) => {
  const pathname = new URL(request.url, `http://${request.headers.host}`).pathname;

  if (pathname === "/api/pledges" || pathname === "/api/pledges/count") {
    await handlePledgeApiRequest(request, response);
    return;
  }

  if (pathname === "/api/admin/session" || pathname === "/api/admin/pledges") {
    await handleAdminApiRequest(request, response);
    return;
  }

  const filePath = await resolvePath(pathname);

  if (!filePath) {
    response.writeHead(404, { "Content-Type": "text/html; charset=utf-8" });
    createReadStream(path.join(distDir, "404.html")).pipe(response);
    return;
  }

  const extension = path.extname(filePath);
  response.writeHead(200, {
    "Content-Type": mimeTypes[extension] || "application/octet-stream",
  });
  createReadStream(filePath).pipe(response);
});

server.listen(port, () => {
  console.log(`dist server running at http://localhost:${port}`);
});

async function resolvePath(requestPath) {
  const safePath = decodeURIComponent(requestPath).replace(/^\/+/, "");
  const candidates = [];

  if (!safePath) {
    candidates.push(path.join(distDir, "index.html"));
  } else {
    candidates.push(path.join(distDir, safePath));
    candidates.push(path.join(distDir, `${safePath}.html`));
    candidates.push(path.join(distDir, safePath, "index.html"));
  }

  for (const candidate of candidates) {
    if (!candidate.startsWith(distDir)) continue;
    if (!existsSync(candidate)) continue;
    const details = await stat(candidate);
    if (details.isFile()) return candidate;
  }

  return null;
}
