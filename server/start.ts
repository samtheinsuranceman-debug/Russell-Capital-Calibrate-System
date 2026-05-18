import express from "express";
import { createServer } from "http";
import apiRouter from "./routers.js";

const app = express();
const server = createServer(app);

app.use(express.json());

app.get("/api/health", (_req, res) => {
  res.json({ status: "ok", timestamp: new Date().toISOString(), version: "1.0.0" });
});

app.use("/api", apiRouter);

// Always use 3001 for the API server (Vite proxies /api here)
server.listen(3001, () => {
  console.log("[RCS API] Running on http://localhost:3001/");
});
