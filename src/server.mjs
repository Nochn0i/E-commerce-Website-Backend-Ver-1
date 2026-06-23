import "dotenv/config";
import __config, { validate_config } from "./config/config.mjs";
import { connect } from "./config/database.mjs";
import { startApp } from "./app.mjs";
import API_ROUTER from "./router/apiRouter.mjs";
import { server } from "./utils/log.utils.mjs";

(async () => {
  console.clear();
  try {
    server.loading("Starting Server...");
    await validate_config();
    await connect(__config.MONGOURI);

    await startApp(__config.PORT, API_ROUTER);

    server.loading("Server was started successfully...");
  } catch (error) {
    server.error("Error Encountered while starting server. ERR:", error);

    process.exit(1);
  }
})();
