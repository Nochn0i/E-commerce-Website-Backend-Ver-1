import {
  createAccount,
  getAllUsers,
  createBuyer,
  createWallet,
} from "./User/Account.mjs";

export default class User {
  static account_create = createAccount;
  static get_all_users = getAllUsers;
  static register_buyer = createBuyer;
  static register_wallet = createWallet;
}
