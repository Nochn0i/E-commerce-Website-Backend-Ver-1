import { createAccount, getAllUsers } from "./User/Account.mjs";

export default class User {
  static account_create = createAccount;
  static get_all_users = getAllUsers;
}
