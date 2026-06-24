import UserAccount from "../../../models/User/Account.mjs";
import { BuyerProfile, UserProfile } from "../../../models/User/Profile.mjs";
import UserWallet from "../../../models/User/Wallet.mjs";
import { hashPassword } from "../../../utils/bcrypt.utils.mjs";
import { isEmpty } from "../../../utils/validate.utils.mjs";

function noUsername() {
  const error = new Error("Username empty.");
  error.statusCode = 400;
  throw error;
}

function noEmail() {
  const error = new Error("Email empty.");
  error.statusCode = 400;
  throw error;
}

function userAlreadyExists() {
  const error = new Error("User Already Exists.");
  error.statusCode = 409;
  throw error;
}

export async function createAccount(username, email, password) {
  const isUsername = await isEmpty(username);
  const isEmail = await isEmpty(email);

  !isUsername && noUsername();

  !isEmail && noEmail();

  const uResult = await UserAccount.exists({
    $or: [{ username }, { email }],
  });
  const uE = !!uResult;

  uE && userAlreadyExists();

  const hashedPassword = await hashPassword(password);
  return await UserAccount.create({
    username,
    email,
    password: hashedPassword,
  });
}

function noUserId() {
  const error = new Error("User Id not specified.");
  error.statusCode = 400;
  throw error;
}

function userNotFound() {
  const error = new Error("User doesn't exist of this Id.");
  error.statusCode = 404;
  throw error;
}

function userProfileAlreadyExists() {
  const error = new Error("User profile already exists for this User Id");
  error.statusCode = 409;
  throw error;
}

function userWalletAlreadyExists() {
  const error = new Error("User wallet already exists for this User Id");
  error.statusCode = 409;
  throw error;
}

export async function createBuyer(user_id) {
  const isUserId = await isEmpty(user_id);
  !isUserId && noUserId();

  const uResult = await UserAccount.exists({ _id: user_id });
  const pResult = await UserProfile.exists({ user_id });
  const uE = !!uResult;
  const pE = !!pResult;

  !uE && userNotFound();

  pE && userProfileAlreadyExists();

  return await BuyerProfile.create({ user_id });
}

export async function createWallet(user_id) {
  const isUserId = await isEmpty(user_id);
  !isUserId && noUserId();

  const uResult = await UserAccount.exists({ _id: user_id });
  const wResult = await UserWallet.exists({ user_id });
  const uE = !!uResult;
  const wE = !!wResult;

  !uE && userNotFound();
  wE && userWalletAlreadyExists();

  return await UserWallet.create({ user_id });
}

export const getAllUsers = async () => await UserAccount.find({});
