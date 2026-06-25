import { Router } from "express";

const API_ROUTER = Router();

import USER_ROUTER from "./UserRouter.mjs";
import ADMIN_ROUTER from "./AdminRouter.mjs";

API_ROUTER.use("/user", USER_ROUTER);
API_ROUTER.use("/admin", ADMIN_ROUTER);

export default API_ROUTER;
