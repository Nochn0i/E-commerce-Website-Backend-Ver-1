import express from "express";
import cors from "cors";
import helmet from "helmet";
import { appp } from "./utils/log.utils.mjs";

function loadModules() {
  try {
    const app = express();
    app.use(express.json()).use(cors()).use(helmet());
    appp.default("App modules were loaded successfully.");
    return app;
  } catch {
    throw new Error("[ app ] Error Loading app modules.");
  }
}

async function loadAPIRouter(app, apiRouter) {
  try {
    app.use("/api", apiRouter);
    appp.default("App API router was loaded successfully.");
  } catch {
    appp.error("Error Loading API Router.");
    throw new Error("Error Loading API Router.");
  }
}

async function finalize(app) {
  try {
    app.get("/", (_, res) => {
      console.log("[ app ] Server was pinged.");
      appp.router("Server was pinged.");
      return res.status(200).json({
        "app-message": "Welcome to Express Server",
        "app-health": "healthy",
        "app-uptime": process.uptime(),
      });
    });

    app.use((err, req, res, next) => {
      appp.error("Error encountered. Err message:", err.message);
      appp.error("Full Error. ERR:", err);
      return res.status(200).json({
        message: err.message || "Internal server error",
        orginalError: process.env.ENV === "development" ? err : "",
      });
    });

    appp.default("App was finalized successfully.");
  } catch (error) {
    appp.error("Error encountered while finalizing app. Err:", error);
    throw new Error(`Error encountered while finalizing app. Err: ${error}`);
  }
}

export function startApp(port = process.env.PORT, apiRouter) {
  return new Promise(async (resolve, reject) => {
    try {
      const app = await loadModules();
      await loadAPIRouter(app, apiRouter);
      await finalize(app);
      appp.loading("Starting App...");
      app.listen(port, () => {
        appp.port(`App running on port:::`, port);
        resolve();
      });
    } catch (error) {
      console.error("[ app ] Error encounted while starting app. ERR:", error);
      reject(error);
    }
  });
}
