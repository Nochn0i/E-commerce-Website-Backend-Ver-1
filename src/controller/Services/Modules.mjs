import UserAccount from "../../models/User/Account.mjs";
import { BuyerProfile, UserProfile } from "../../models/User/Profile.mjs";
import UserWallet from "../../models/User/Wallet.mjs";
import { hashPassword } from "../../utils/bcrypt.utils.mjs";
import { isEmpty } from "../../utils/validate.utils.mjs";

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

//#region Create Account
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
//#endregion

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

function userProfileNotFound() {
  const error = new Error("User profile doesnt exists for this User Id");
  error.statusCode = 404;
  throw error;
}

function userWalletAlreadyExists() {
  const error = new Error("User wallet already exists for this User Id");
  error.statusCode = 409;
  throw error;
}

function userWalletNotFound() {
  const error = new Error("User wallet doesn't exists for this User Id");
  error.statusCode = 404;
  throw error;
}

async function checkUser(user_id) {
  const uResult = await UserAccount.exists({ _id: user_id });
  const uE = !!uResult;
  return uE;
}

async function checkUserAndProfile(user_id) {
  const uResult = await UserAccount.exists({ _id: user_id });
  const pResult = await UserProfile.exists({ user_id });
  const uE = !!uResult;
  const pE = !!pResult;
  return { uE, pE };
}

async function checkUserAndWallet(user_id) {
  const uResult = await UserAccount.exists({ _id: user_id });
  const wResult = await UserWallet.exists({ user_id });
  const uE = !!uResult;
  const wE = !!wResult;
  return { uE, wE };
}

//#region Create Buyer
export async function createBuyer(user_id) {
  const isUserId = await isEmpty(user_id);
  !isUserId && noUserId();

  const { uE, pE } = await checkUserAndProfile(user_id);

  !uE && userNotFound();

  pE && userProfileAlreadyExists();

  return await BuyerProfile.create({ user_id });
}
//#endregion

//#region Create Wallet
export async function createWallet(user_id) {
  const isUserId = await isEmpty(user_id);
  !isUserId && noUserId();

  const { uE, wE } = await checkUserAndWallet(user_id);

  !uE && userNotFound();
  wE && userWalletAlreadyExists();

  return await UserWallet.create({ user_id });
}
//#endregion

//#region Fetch all users
export const getAllUsers = async () => await UserAccount.find({});
//#endregion

//#region Delete Account
export async function deleteAccount(user_id) {
  const isUserId = await isEmpty(user_id);
  !isUserId && noUserId();

  const uE = await checkUser(user_id);

  !uE && userNotFound();

  return await UserAccount.findByIdAndDelete(user_id);
}
//#endregion

//#region Delete Profile
export async function deleteProfile(user_id) {
  const isUserId = await isEmpty(user_id);
  !isUserId && noUserId();

  const { uE, pE } = await checkUserAndProfile(user_id);

  !uE && userNotFound();
  !pE && userProfileNotFound();

  return await UserProfile.findOneAndDelete({ user_id });
}
//#endregion

//#region Delete Wallet
export async function deleteWallet(user_id) {
  const isUserId = await isEmpty(user_id);
  !isUserId && noUserId();

  const { uE, wE } = await checkUserAndWallet(user_id);

  !uE && userNotFound();
  !wE && userWalletNotFound();

  return await UserWallet.findOneAndDelete({ user_id });
}
//#endregion
