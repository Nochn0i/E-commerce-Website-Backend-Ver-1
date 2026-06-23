import { hash } from "bcrypt";
import __config from "../config/config.mjs";

export async function hashPassword(password) {
  return await hash(password, parseInt(__config.SALTROUNDS, 10));
}
