import Account from "../controller/User/Account.mjs";
import { Router } from "express";

const USER_ROUTER = Router();
const ACCOUNT_ROUTER = Router();

ACCOUNT_ROUTER.route("/").post(Account.register);

USER_ROUTER.use("/account", ACCOUNT_ROUTER);

export default USER_ROUTER;
