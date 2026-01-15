import express from "express";
import cors from "cors";

import authRoutes from "./modules/auth/auth.routes.js";
import userRoutes from "./modules/users/users.routes.js";
import departmentRoutes from "./modules/departments/departments.routes.js";
import projectRoutes from "./modules/projects/projects.routes.js";
import metaRoutes from "./modules/meta/meta.routes.js";
import departmentHeadRoutes from "./modules/departmentHead/departmentHead.routes.js";

const app = express();

/* ======================
   ✅ CORS CONFIG
====================== */
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

/* ======================
   MIDDLEWARES
====================== */
app.use(express.json());

/* ======================
   ROUTES
====================== */
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/departments", departmentRoutes);
app.use("/api/projects", projectRoutes);
app.use("/api/meta", metaRoutes);
app.use("/api/department-head", departmentHeadRoutes);

export default app;
