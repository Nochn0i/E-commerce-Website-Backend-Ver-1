import mongoose from "mongoose";
import { mongodb, database } from "../utils/log.utils.mjs";

function configure() {
  mongoose.connection.on("connected", () =>
    mongodb.connected(
      "Connection created to MongoDB. From HOST:",
      mongoose.connection.host,
    ),
  );

  mongoose.connection.on("error", (err) =>
    mongodb.error("Error creating connection to MongoDB. ERR:", err),
  );

  mongoose.connection.on("disconnected", () =>
    mongodb.connected(
      "Connection to MongoDB was lost. Attempting to reconnect...",
      "",
    ),
  );

  mongodb.configure("MongoDB was configured successfully.");
}

function getConnection(dbName, serverSelectionTimeoutMS, socketTimeoutMS) {
  return async (URI) =>
    await mongoose.connect(URI, {
      dbName,
      serverSelectionTimeoutMS,
      socketTimeoutMS,
    });
}

export async function connect(URI, dbname, serverTimeout, socketTimeout) {
  configure();
  const connectionFunction = getConnection(
    dbname,
    serverTimeout,
    socketTimeout,
  );

  try {
    await connectionFunction(URI);
    database.success("Connected to database successfully.");
  } catch (error) {
    database.error("Error connecting to database.");
    throw error;
  }
}
