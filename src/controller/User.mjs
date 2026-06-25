import mongoose from "mongoose";
import { web } from "../utils/log.utils.mjs";
import { isEmpty } from "../utils/validate.utils.mjs";
import UserServices from "./Services/UserServices.mjs";

class Notify {
  static deletedAccount = (user_id) =>
    web.default("User of User Id:", user_id, "was deleted.");

  static deleteProfile = (user_id) =>
    web.default("User Profile for user id:", user_id, "was deleted.");
}

//#region Register User (Account, Profile & Wallet)
async function register(req, res, next) {
  const rollBackActions = [];
  try {
    const { username, email, password } = req.body;

    const createdUser = await UserServices.account_create(
      username,
      email,
      password,
    );
    const user_id = createdUser._id;
    web.default("New user was created. User:", user_id);

    rollBackActions.push(async () => {
      await UserServices.delete_account(user_id);
      Notify.deletedAccount(user_id);
    });

    await UserServices.register_buyer(user_id);
    web.default("New user profile was created for User:", user_id);

    rollBackActions.push(async () => {
      await UserServices.delete_profile(user_id);
      Notify.deleteProfile(user_id);
    });

    await UserServices.register_wallet(user_id);
    web.default("New user wallet was created for User:", user_id);

    return res.status(200).json({
      message: "User account was created successfully.",
      user: createdUser.toObject(),
    });
  } catch (error) {
    web.error("User account creation failed.");

    for (const func of rollBackActions.reverse()) {
      try {
        await func();
      } catch (rollbackError) {
        web.error("A rollback action failed to execute:", rollbackError);
      }
    }

    next(error);
  }
}
//#endregion

//#region GET Users
async function getAllUsers(_, res, next) {
  try {
    const users = await UserServices.get_all_users();
    web.default("Fetched All Users.");
    return res.status(200).json({
      message: "All user accounts fetched successfully.",
      users,
    });
  } catch (error) {
    web.error("User accounts fetch failed.");
    next(error);
  }
}
//#endregion

//#region GET User Profiles
async function getAllUserProfiles(_, res, next) {
  try {
    const users = await UserServices.get_all_user_profiles();
    web.default("Fetched All User Profiles.");
    return res.status(200).json({
      message: "All user profiles fetched successfully.",
      users,
    });
  } catch (error) {
    web.error("Users profiles fetch failed.");
    next(error);
  }
}
//#endregion

//#region GET User Wallets
async function getAllUserWallets(_, res, next) {
  try {
    const users = await UserServices.get_all_user_wallets();
    web.default("Fetched All User Wallets.");
    return res.status(200).json({
      message: "All user wallets fetched successfully.",
      users,
    });
  } catch (error) {
    web.error("Users wallets fetch failed.");
    next(error);
  }
}
//#endregion

function noIdError(name = "User") {
  const error = new Error(`No ${name} Id Specified`);
  error.statusCode = 400;
  throw error;
}

//#region GET User By ID
async function getUserById(req, res, next) {
  try {
    const { id } = req.params;
    const isId = await isEmpty(id);

    !isId && noIdError();

    const users = await UserServices.get_user_by_id(id);
    web.default(
      "Fetched User account of User Id:",
      new mongoose.Types.ObjectId(id),
    );
    return res.status(200).json({
      message: "User account fetched successfully.",
      users,
    });
  } catch (error) {
    web.error("Users account fetch failed.");
    next(error);
  }
}
//#endregion

//#region GET User profile by id
async function getUserProfileById(req, res, next) {
  try {
    const { id } = req.params;
    const isId = await isEmpty(id);

    !isId && noIdError("Profile");

    const userProfile = await UserServices.get_user_profile_by_id(id);
    web.default(
      "Fetched User Profile of Profile Id:",
      new mongoose.Types.ObjectId(id),
    );
    return res.status(200).json({
      message: "User profile fetched successfully.",
      userProfile,
    });
  } catch (error) {
    web.error("User profile fetch failed");
    next(error);
  }
}
//#endregion

//#region GET User profile by User id
async function getUserProfileByUserId(req, res, next) {
  try {
    const { user_id } = req.body;
    const isId = await isEmpty(user_id);

    !isId && noIdError();

    const userProfile = await UserServices.get_user_profile_by_user_id(user_id);
    web.default(
      "Fetched User Profile of User Id:",
      new mongoose.Types.ObjectId(user_id),
    );
    return res.status(200).json({
      message: "User profile fetched successfully.",
      userProfile,
    });
  } catch (error) {
    web.error("User profile fetch failed");
    next(error);
  }
}
//#endregion

//#region GET User wallet by id
async function getUserWalletById(req, res, next) {
  try {
    const { id } = req.params;
    const isId = await isEmpty(id);

    !isId && noIdError("Wallet");

    const userProfile = await UserServices.get_user_wallet_by_id(id);
    web.default(
      "Fetched User Wallet of Wallet Id:",
      new mongoose.Types.ObjectId(id),
    );
    return res.status(200).json({
      message: "User wallet fetched successfully.",
      userProfile,
    });
  } catch (error) {
    web.error("User wallet fetch failed");
    next(error);
  }
}
//#endregion

//#region GET User wallet by User id
async function getUserWalletByUserId(req, res, next) {
  try {
    const { user_id } = req.body;
    const isId = await isEmpty(user_id);

    !isId && noIdError();

    const userProfile = await UserServices.get_user_wallet_by_user_id(user_id);
    web.default(
      "Fetched User Wallet of User Id:",
      new mongoose.Types.ObjectId(user_id),
    );
    return res.status(200).json({
      message: "User wallet fetched successfully.",
      userProfile,
    });
  } catch (error) {
    web.error("User wallet fetch failed");
    next(error);
  }
}
//#endregion
export default class User {
  static register = register;

  static fetch_user_by_id = getUserById;
  static fetch_user_profile_by_id = getUserProfileById;
  static fetch_user_wallet_by_id = getUserWalletById;
  static fetch_user_profile_by_user_id = getUserProfileByUserId;
  static fetch_user_wallet_by_user_id = getUserWalletByUserId;

  static fetch_all_users = getAllUsers;
  static fetch_all_user_profiles = getAllUserProfiles;
  static fetch_all_user_wallets = getAllUserWallets;
}
