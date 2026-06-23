import UserAccount from "../../../models/User/Account.mjs";
import { hashPassword } from "../../../utils/bcrypt.utils.mjs";

export async function createAccount(username, email, password) {
  const uResult = await UserAccount.exists({
    $or: [{ username }, { email }],
  });
  const uE = !!uResult;

  if (uE) {
    const error = new Error("User Already Exists.");
    error.statusCode = 409;
    throw error;
  }

  const hashedPassword = await hashPassword(password);
  return await UserAccount.create({
    username,
    email,
    password: hashedPassword,
  });
}
