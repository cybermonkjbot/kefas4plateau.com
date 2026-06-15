import { rm } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { spawnSync } from "node:child_process";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const projectRoot = path.resolve(__dirname, "..");
const ssrOutDir = path.join(projectRoot, "dist-ssr");

run("npx", ["vite", "build"]);
run("npx", ["vite", "build", "--ssr", "src/entry-server.jsx", "--outDir", "dist-ssr"]);
run("node", ["scripts/prerender-seo.mjs"]);
run("node", ["scripts/validate-seo.mjs"]);
await rm(ssrOutDir, { recursive: true, force: true });

function run(command, args) {
  const result = spawnSync(command, args, {
    cwd: projectRoot,
    stdio: "inherit",
    shell: false,
  });

  if (result.status !== 0) {
    process.exit(result.status ?? 1);
  }
}
