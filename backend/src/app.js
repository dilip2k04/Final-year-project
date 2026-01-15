import express from "express";
import cors from "cors";

import authRoutes from "./modules/auth/auth.routes.js";
import userRoutes from "./modules/users/users.routes.js";
import metaRoutes from "./modules/meta/meta.routes.js"; 
import departmentRoutes from "./modules/departments/departments.routes.js"
import projectRoutes from "./modules/projects/projects.routes.js"
import managerRoutes from "./modules/manager/manager.routes.js"

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/meta", metaRoutes);
app.use("/api/departments", departmentRoutes);
app.use("/api/projects", projectRoutes);
app.use("/api/manager", managerRoutes);


app.get("/api/health", (req, res) => {
  res.json({ status: "OK" });
});

export default app;
