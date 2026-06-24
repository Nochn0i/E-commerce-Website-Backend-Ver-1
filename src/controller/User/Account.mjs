import { web } from "../../utils/log.utils.mjs";
import User from "../Services/User.mjs";

async function register(req, res, next) {
  const rollBackActions = [];
  try {
    const { username, email, password } = req.body;
    const createdUser = await User.account_create(username, email, password);
    const user_id = createdUser._id;
    web.default("New user was created. User:", user_id);

    rollBackActions.push(async () => await User.delete_account(user_id));
    return res.status(200).json({
      message: "User account was created successfully.",
      user: createdUser.toObject(),
    });
  } catch (error) {
    web.error("User account creation failed.");
    next(error);
  }
}

async function getAllUsers(_, res, next) {
  try {
    const users = await User.get_all_users();
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

export default class Account {
  static register = register;
  static fetchAll = getAllUsers;
}
