import * as service from "./projects.service.js";

/* ======================
   LIST
====================== */
export const listProjects = async (req, res) => {
  const projects = await service.getAllProjects(req.user);
  res.json(projects);
};

/* ======================
   CREATE
====================== */
export const create = async (req, res) => {
  try {
    const project = await service.createProject(req.body, req.user);
    res.status(201).json(project);
  } catch (e) {
    res.status(400).json({ message: e.message });
  }
};

/* ======================
   UPDATE
====================== */
export const update = async (req, res) => {
  try {
    const project = await service.updateProject(
      req.params.id,
      req.body,
      req.user
    );
    res.json(project);
  } catch (e) {
    res.status(
      e.message.includes("only") ? 403 : 400
    ).json({ message: e.message });
  }
};

/* ======================
   DELETE
====================== */
export const remove = async (req, res) => {
  try {
    await service.deleteProject(req.params.id, req.user);
    res.json({ message: "Project deleted" });
  } catch (e) {
    res.status(403).json({ message: e.message });
  }
};
