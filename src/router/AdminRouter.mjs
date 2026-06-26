import User from "../controller/User.mjs";
import { Router } from "express";

const ADMIN_ROUTER = Router();
// --- USER ACCOUNT MANAGEMENT ---

// @route  : /users
// @desc   GET    - fetch all users
ADMIN_ROUTER.route("/users").get(User.fetch_all_users);

// @route  : /users/id/:id
// @desc   GET    - fetch user by id.
// @desc   DELETE - delete user by id.
// @desc   PUT    - ban or unban user by id.
ADMIN_ROUTER.route("/users/id/:id")
  .get(User.fetch_user_by_id)
  .delete(User.delete_user_by_id)
  .put(User.ban_unban_user_by_id);

// @route  : /users/profile/:id
// @desc   GET    - fetch user profile by id.
ADMIN_ROUTER.route("/users/profile/:id").get(
  User.fetch_user_profile_by_user_id,
);

// @route  : /users/wallet/:id
// @desc   GET    - fetch user wallet by id.
ADMIN_ROUTER.route("/users/wallet/:id").get(User.fetch_user_wallet_by_user_id);

export default ADMIN_ROUTER;
