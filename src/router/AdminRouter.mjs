import User from "../controller/User.mjs";
import { Router } from "express";

const ADMIN_ROUTER = Router();
// --- USER ACCOUNT MANAGEMENT ---

// @route   GET /users
ADMIN_ROUTER.route("/users").get(User.fetch_all_users);

// @route   GET /users/id/:id
// @route   DELETE /users/id/:id
ADMIN_ROUTER.route("/users/id/:id")
  .get(User.fetch_user_by_id)
  .delete(User.delete_user_by_id);

// @route   GET /users/profile/user/:id
ADMIN_ROUTER.route("/users/profile/user/:id").get(
  User.fetch_user_profile_by_user_id,
);

// @route   GET /users/wallet/user/:id
ADMIN_ROUTER.route("/users/wallet/user/:id").get(
  User.fetch_user_wallet_by_user_id,
);

export default ADMIN_ROUTER;
