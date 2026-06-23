import { isEmpty } from "../utils/validate.utils.mjs";
import { system } from "../utils/log.utils.mjs";
const __config = {
  PORT: process.env.PORT ? parseInt(process.env.PORT, 10) : undefined,
  ENV: process.env.ENV || undefined,
  MONGOURI: process.env.MONGOURI || undefined,
  DBNAME: process.env.DB || undefined,
  DBST: process.env.DBST ? parseInt(process.env.DBST, 10) : undefined,
  DBSCT: process.env.DBSCT ? parseInt(process.env.DBSCT, 10) : undefined,
  JWTSECRET: process.env.JWTSECRET || undefined,
  SALTROUNDS: process.env.SALTROUNDS
    ? parseInt(process.env.SALTROUNDS, 10)
    : undefined,
};

/**
 * @returns {Promise<void>}
 */

export async function validate_config() {
  const entries = Object.entries(__config);
  const validationPromises = entries.map(async ([key, value]) => {
    const isPresent = await isEmpty(value);
    return { key, isPresent };
  });

  return await Promise.all(validationPromises)
    .then((result) => {
      const failedCheck = result.find((result) => !result.isPresent);

      if (failedCheck) {
        throw new Error(`${failedCheck.key} is required.`);
      }

      system.log("Configuration validation passed successfully.");
    })
    .catch((error) => {
      console.error(`[ system ] Configuration Error: ${error.message}`);
      process.exit(1);
    });
}

export default __config;
