import express from "express";
import { createServer } from "http";
import path from "path";
import { fileURLToPath } from "url";
import { registerRoutes } from "./routers.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function startServer() {
  const app = express();
  const server = createServer(app);

  app.use(express.json());

  // Health check
  app.get("/api/health", (_req, res) => {
    res.json({
      status: "ok",
      timestamp: new Date().toISOString(),
      version: "2.0.0",
    });
  });

  // Register calibration API routes
  const apiRouter = express.Router();
  registerRoutes(apiRouter);
  app.use("/api", apiRouter);

  // Production static files
  if (process.env.NODE_ENV === "production") {
    const staticPath = path.resolve(__dirname, "public");
    app.use(express.static(staticPath));
    app.get("*", (_req, res) => {
      res.sendFile(path.join(staticPath, "index.html"));
    });
  }

  const port = parseInt(process.env.API_PORT || "3001", 10);
  server.listen(port, () => {
    console.log(`[RCS API] Server running on http://localhost:${port}/`);
  });
}

startServer().catch(console.error);
