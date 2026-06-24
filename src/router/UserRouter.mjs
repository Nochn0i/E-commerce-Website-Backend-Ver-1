import User from "../controller/User.mjs";
import { Router } from "express";

const USER_ROUTER = Router();

USER_ROUTER.route("/").post(User.register);
USER_ROUTER.route("/").get(User.fetchAll);

export default USER_ROUTER;
