import User from "../controller/User.mjs";
import { Router } from "express";

const ADMIN_ROUTER = Router();

ADMIN_ROUTER.route("/users").get(User.fetch_all_users);
ADMIN_ROUTER.route("/users/id/:id").get(User.fetch_user_by_id);
ADMIN_ROUTER.route("/users/profile/id/:id").get(User.fetch_user_profile_by_id);
ADMIN_ROUTER.route("/users/wallet/id/:id").get(User.fetch_user_wallet_by_id);

ADMIN_ROUTER.route("/users/profile/user/:id").get(
  User.fetch_user_profile_by_user_id,
);
ADMIN_ROUTER.route("/users/wallet/user/:id").get(
  User.fetch_user_wallet_by_user_id,
);

ADMIN_ROUTER.route("/users/profile").get(User.fetch_all_user_profiles);
ADMIN_ROUTER.route("/users/wallet").get(User.fetch_all_user_wallets);

export default ADMIN_ROUTER;
