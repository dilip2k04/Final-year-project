import Project from "../../models/Project.js";
import User from "../../models/User.js";
import Department from "../../models/Department.js";

/* ======================
   LIST PROJECTS
====================== */
export const getAllProjects = async (user) => {
  const filter = {};

  if (user.role === "MANAGER") {
    filter.$or = [
      { managerId: user._id },
      { departmentId: user.departmentId },
    ];
  }

  if (user.role === "TEAM_LEAD") {
    filter.teamLeadId = user._id;
  }

  if (user.role === "EMPLOYEE") {
    filter.employees = user._id;
  }

  return Project.find(filter)
    .populate("departmentId", "name")
    .populate("managerId", "name")
    .populate("teamLeadId", "name")
    .populate("employees", "name");
};

/* ======================
   CREATE PROJECT
====================== */
export const createProject = async (data, user) => {
  if (!["MANAGER", "CEO"].includes(user.role)) {
    throw new Error("Only Managers or CEO can create projects");
  }

  const { name, teamLeadId, employees = [] } = data;

  if (!name || !teamLeadId) {
    throw new Error("Name & Team Lead are required");
  }

  const departmentId =
    user.role === "MANAGER" ? user.departmentId : data.departmentId;

  if (!departmentId) {
    throw new Error("Department is required");
  }

  const dept = await Department.findById(departmentId);
  if (!dept) throw new Error("Invalid Department");

  const tl = await User.findById(teamLeadId);
  if (!tl || tl.role !== "TEAM_LEAD") {
    throw new Error("Invalid Team Lead");
  }

  if (tl.departmentId.toString() !== departmentId.toString()) {
    throw new Error("Team Lead must belong to same department");
  }

  for (const empId of employees) {
    const emp = await User.findById(empId);
    if (!emp || emp.role !== "EMPLOYEE") {
      throw new Error("Invalid employee");
    }

    if (emp.departmentId.toString() !== departmentId.toString()) {
      throw new Error("Employee must belong to same department");
    }
  }

  return Project.create({
    name,
    departmentId,
    managerId: user.role === "MANAGER" ? user._id : null,
    teamLeadId,
    employees,
  });
};

/* ======================
   UPDATE PROJECT (🔥 FIXED)
====================== */
export const updateProject = async (id, data, user) => {
  const project = await Project.findById(id);
  if (!project) throw new Error("Project not found");

  // CEO & ADMIN → unrestricted
  if (["CEO", "ADMIN"].includes(user.role)) {
    await Project.findByIdAndUpdate(id, data);
  }

  // MANAGER → department-based
  if (user.role === "MANAGER") {
    if (!user.departmentId)
      throw new Error("Manager has no department");

    if (
      project.departmentId.toString() !== user.departmentId.toString()
    )
      throw new Error("You can update only your department projects");

    await Project.findByIdAndUpdate(id, data);
  }

  // 🔥 ALWAYS re-fetch populated document
  return Project.findById(id)
    .populate("departmentId", "name")
    .populate("managerId", "name")
    .populate("teamLeadId", "name")
    .populate("employees", "name");
};

/* ======================
   DELETE PROJECT
====================== */
export const deleteProject = async (id, user) => {
  const project = await Project.findById(id);
  if (!project) throw new Error("Project not found");

  if (["CEO", "ADMIN"].includes(user.role)) {
    await Project.findByIdAndDelete(id);
    return;
  }

  if (user.role === "MANAGER") {
    if (
      project.departmentId.toString() !==
      user.departmentId.toString()
    ) {
      throw new Error("You can delete only your department projects");
    }

    await Project.findByIdAndDelete(id);
    return;
  }

  throw new Error("Unauthorized");
};
