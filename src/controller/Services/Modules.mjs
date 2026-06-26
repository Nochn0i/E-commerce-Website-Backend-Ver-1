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

function noId(name = "User") {
  const error = new Error(`${name} Id not specified.`);
  error.statusCode = 400;
  throw error;
}

function userNotFoundById() {
  const error = new Error("User doesn't exist of this Id.");
  error.statusCode = 404;
  throw error;
}

function userProfileAlreadyExists() {
  const error = new Error("User profile already exists for this User Id");
  error.statusCode = 409;
  throw error;
}

function userProfileNotFoundByUserId() {
  const error = new Error("User profile doesnt exists for this User Id");
  error.statusCode = 404;
  throw error;
}

function userProfileNotFound() {
  const error = new Error("User profile doesnt exists for this User Id");
  error.statusCode = 404;
  throw error;
}

function userWalletAlreadyExistsForUserId() {
  const error = new Error("User wallet already exists for this User Id");
  error.statusCode = 409;
  throw error;
}

function userWalletNotFoundByUserId() {
  const error = new Error("User wallet doesn't exists for this User Id");
  error.statusCode = 404;
  throw error;
}

function userWalletNotFound() {
  const error = new Error("User wallet doesn't exists.");
  error.statusCode = 404;
  throw error;
}

async function checkUser(user_id) {
  const uResult = await UserAccount.exists({ _id: user_id });
  const uE = !!uResult;
  return uE;
}

async function checkUserProfile(profile_id) {
  const uResult = await UserProfile.exists({ _id: profile_id });
  const pE = !!uResult;
  return pE;
}

async function checkUserWallet(wallet_id) {
  const uResult = await UserWallet.exists({ _id: wallet_id });
  const wE = !!uResult;
  return wE;
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
  !isUserId && noId();

  const { uE, pE } = await checkUserAndProfile(user_id);

  !uE && userNotFoundById();

  pE && userProfileAlreadyExists();

  return await BuyerProfile.create({ user_id });
}
//#endregion

//#region Create Wallet
export async function createWallet(user_id) {
  const isUserId = await isEmpty(user_id);
  !isUserId && noId();

  const { uE, wE } = await checkUserAndWallet(user_id);

  !uE && userNotFoundById();
  wE && userWalletAlreadyExistsForUserId();

  return await UserWallet.create({ user_id });
}
//#endregion

//#region Delete Account
export async function deleteAccount(user_id) {
  const isUserId = await isEmpty(user_id);
  !isUserId && noId();

  const uE = await checkUser(user_id);

  !uE && userNotFoundById();

  return await UserAccount.findByIdAndDelete(user_id);
}
//#endregion

//#region Delete Profile
export async function deleteProfile(user_id) {
  const isUserId = await isEmpty(user_id);
  !isUserId && noId();

  const { uE, pE } = await checkUserAndProfile(user_id);

  !uE && userNotFoundById();
  !pE && userProfileNotFoundByUserId();

  return await UserProfile.findOneAndDelete({ user_id });
}
//#endregion

//#region Delete Wallet
export async function deleteWallet(user_id) {
  const isUserId = await isEmpty(user_id);
  !isUserId && noId();

  const { uE, wE } = await checkUserAndWallet(user_id);

  !uE && userNotFoundById();
  !wE && userWalletNotFoundByUserId();

  return await UserWallet.findOneAndDelete({ user_id });
}
//#endregion

//#region Fetch all users
export const getAllUsers = async () => await UserAccount.find({});
//#endregion

//#region Fetch user by id
export async function getUserById(user_id) {
  const isUserId = await isEmpty(user_id);
  !isUserId && noId();
  const uE = await checkUser(user_id);
  !uE && userNotFoundById();
  return await UserAccount.findById(user_id);
}
//#endregion

//#region Fetch user profile by User id
export async function getUserProfileByUserId(user_id) {
  const isUserId = await isEmpty(user_id);
  !isUserId && noId();
  const { uE, pE } = await checkUserAndProfile(user_id);
  !uE && userNotFoundById();
  !pE && userProfileNotFoundByUserId();
  return await UserProfile.findOne({ user_id }).populate("user_id");
}
//#endregion

//#region Fetch user wallet by User id
export async function getUserWalletByUserId(user_id) {
  const isUserId = await isEmpty(user_id);
  !isUserId && noId();
  const { uE, wE } = await checkUserAndWallet(user_id);
  !uE && userNotFoundById();
  !wE && userProfileNotFoundByUserId();
  return await UserWallet.findOne({ user_id }).populate("user_id");
}
//#endregion

//#region Ban User By Id
export async function banUserById(user_id, description) {
  const isUserId = await isEmpty(user_id);
  !isUserId && noId();
  const uE = await checkUser(user_id);
  !uE && userNotFoundById(user_id);
  return await UserAccount.findByIdAndUpdate(
    user_id,
    {
      $set: {
        isBanned: true,
        banReason: description || "No reason provided",
      },
    },
    { new: true },
  );
}
//#endregion

//#region Unban User By Id
export async function unBanUserById(user_id) {
  const isUserId = await isEmpty(user_id);
  !isUserId && noId();
  const uE = await checkUser(user_id);
  !uE && userNotFoundById();
  return await UserAccount.findByIdAndUpdate(
    user_id,
    {
      $set: { isBanned: false, banReason: null },
    },
    { new: true },
  );
}
//#endregion
