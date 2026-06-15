import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";
import { handlePledgeApiRequest } from "./server/pledgeApi.js";

export default defineConfig({
  plugins: [
    react(),
    {
      name: "pledge-api-dev-middleware",
      configureServer(server) {
        server.middlewares.use(async (request, response, next) => {
          const pathname = new URL(request.url || "/", "http://localhost").pathname;

          if (
            pathname !== "/api/pledges" &&
            pathname !== "/api/pledges/count" &&
            pathname !== "/api/admin/session" &&
            pathname !== "/api/admin/pledges"
          ) {
            next();
            return;
          }

          if (pathname.startsWith("/api/admin/")) {
            const { handleAdminApiRequest } = await import("./server/adminApi.js");
            await handleAdminApiRequest(request, response);
            return;
          }

          await handlePledgeApiRequest(request, response);
        });
      },
    },
  ],
});
