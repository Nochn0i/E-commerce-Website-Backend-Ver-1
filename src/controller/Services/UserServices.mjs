import {
  createAccount,
  createBuyer,
  createWallet,
  // -------------------
  getAllUsers,
  getAllUserProfiles,
  getAllUserWallets,
  // -------------------
  getUserById,
  getUserProfileById,
  getUserWalletById,
  // -------------------
  getUserProfileByUserId,
  getUserWalletByUserId,
  // -------------------
  deleteAccount,
  deleteProfile,
  deleteWallet,
} from "./Modules.mjs";

export default class UserServices {
  static account_create = createAccount;
  static register_buyer = createBuyer;
  static register_wallet = createWallet;

  static get_user_by_id = getUserById;
  static get_user_profile_by_id = getUserProfileById;
  static get_user_wallet_by_id = getUserWalletById;

  static get_user_profile_by_user_id = getUserProfileByUserId;
  static get_user_wallet_by_user_id = getUserWalletByUserId;

  static get_all_users = getAllUsers;
  static get_all_user_profiles = getAllUserProfiles;
  static get_all_user_wallets = getAllUserWallets;

  static delete_account = deleteAccount;
  static delete_profile = deleteProfile;
  static delete_wallet = deleteWallet;
}
