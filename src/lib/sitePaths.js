const viteEnv = typeof import.meta !== "undefined" ? import.meta.env || {} : {};
const envBasePath = typeof process !== "undefined" ? process.env.VITE_BASE_PATH : undefined;
const rawBasePath = viteEnv.BASE_URL || envBasePath || "/";

export const basePath = normalizeBasePath(rawBasePath);

export function withBasePath(path) {
  if (!path) return basePath;
  if (isExternalPath(path)) return path;

  const normalizedPath = normalizePath(path);
  if (basePath === "/") return normalizedPath;

  return `${basePath.slice(0, -1)}${normalizedPath}`;
}

export function stripBasePath(path) {
  const normalizedPath = normalizePath(path);

  if (basePath === "/") {
    return normalizedPath;
  }

  const trimmedBase = basePath.slice(0, -1);
  if (normalizedPath === trimmedBase) return "/";
  if (normalizedPath.startsWith(`${trimmedBase}/`)) {
    return normalizePath(normalizedPath.slice(trimmedBase.length));
  }

  return normalizedPath;
}

function normalizeBasePath(path) {
  if (!path || path === "/") return "/";
  return `/${path.replace(/^\/+|\/+$/g, "")}/`;
}

function normalizePath(path) {
  if (!path || path === "/") return "/";
  return path.startsWith("/") ? path.replace(/\/+$/, "") || "/" : `/${path.replace(/\/+$/, "")}`;
}

function isExternalPath(path) {
  return (
    path.startsWith("http://") ||
    path.startsWith("https://") ||
    path.startsWith("mailto:") ||
    path.startsWith("tel:") ||
    path.startsWith("#")
  );
}
