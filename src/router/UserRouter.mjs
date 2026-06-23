import Account from "../controller/User/Account.mjs";
import { Router } from "express";

const USER_ROUTER = Router();
const ACCOUNT_ROUTER = Router();

ACCOUNT_ROUTER.route("/").post(Account.register);
ACCOUNT_ROUTER.route("/get-all-users").get(Account.fetchAll);

USER_ROUTER.use("/account", ACCOUNT_ROUTER);

export default USER_ROUTER;
