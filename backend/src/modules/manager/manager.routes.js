import { Router } from "express";
import { getManagerDashboard } from "./manager.controller.js";
import { requireAuth } from "../../middlewares/auth.middleware.js";
import { allowRoles } from "../../middlewares/role.middleware.js";

const router = Router();

router.use(requireAuth);
router.use(allowRoles("MANAGER"));

router.get("/dashboard", getManagerDashboard);

export default router;
