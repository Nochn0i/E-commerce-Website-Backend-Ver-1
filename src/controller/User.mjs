import { web } from "../utils/log.utils.mjs";
import UserServices from "./Services/UserServices.mjs";

class Notify {
  static deletedAccount = (user_id) =>
    web.default("User of User Id:", user_id, "was deleted.");

  static deleteProfile = (user_id) =>
    web.default("User Profile for user id:", user_id, "was deleted.");
}

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

export default class User {
  static register = register;
  static fetchAll = getAllUsers;
}
