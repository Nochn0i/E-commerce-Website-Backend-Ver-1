import { Router } from "express";

const API_ROUTER = Router();

import USER_ROUTER from "./UserRouter.mjs";

API_ROUTER.use("/user", USER_ROUTER);

export default API_ROUTER;
