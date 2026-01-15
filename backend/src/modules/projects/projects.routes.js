import { Router } from "express";
import {
  listProjects,
  create,
  update,
  remove,
} from "./projects.controller.js";

import { requireAuth } from "../../middlewares/auth.middleware.js";
import { allowRoles } from "../../middlewares/role.middleware.js";

const router = Router();

router.use(requireAuth);

// VIEW
router.get(
  "/",
  allowRoles("CEO", "ADMIN", "MANAGER", "TEAM_LEAD", "EMPLOYEE"),
  listProjects
);

// CREATE
router.post(
  "/",
  allowRoles("CEO", "MANAGER"),
  create
);

// UPDATE
router.put(
  "/:id",
  allowRoles("CEO", "ADMIN", "MANAGER"),
  update
);

// DELETE
router.delete(
  "/:id",
  allowRoles("CEO", "ADMIN", "MANAGER"),
  remove
);

export default router;
