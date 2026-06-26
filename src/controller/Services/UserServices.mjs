import {
  createAccount,
  createBuyer,
  createWallet,
  // -------------------
  getAllUsers,
  // -------------------
  getUserById,
  // -------------------
  getUserProfileByUserId,
  getUserWalletByUserId,
  // -------------------
  deleteAccount,
  deleteProfile,
  deleteWallet,
  // -------------------
  banUserById,
  unBanUserById,
} from "./Modules.mjs";

export default class UserServices {
  static account_create = createAccount;
  static register_buyer = createBuyer;
  static register_wallet = createWallet;

  static get_user_by_id = getUserById;

  static get_user_profile_by_user_id = getUserProfileByUserId;
  static get_user_wallet_by_user_id = getUserWalletByUserId;

  static get_all_users = getAllUsers;

  static delete_account = deleteAccount;
  static delete_profile = deleteProfile;
  static delete_wallet = deleteWallet;

  static ban_user_by_id = banUserById;
  static unban_user_by_id = unBanUserById;
}
