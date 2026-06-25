import User from "../controller/User.mjs";
import { Router } from "express";

const USER_ROUTER = Router();

USER_ROUTER.route("/").post(User.register);

export default USER_ROUTER;
