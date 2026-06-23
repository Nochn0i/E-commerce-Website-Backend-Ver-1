import { web } from "../../utils/log.utils.mjs";
import User from "../Services/User.mjs";

async function register(req, res, next) {
  try {
    const { username, email, password } = req.body;
    const createdUser = await User.account_create(username, email, password);

    web.default("New user was created. User:", createdUser._id);
    return res.status(200).json({
      message: "User account was created successfully.",
      user: createdUser.toObject(),
    });
  } catch (error) {
    web.error("User account creation failed.");
    next(error);
  }
}

async function getAllUsers(req, res, next) {
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
