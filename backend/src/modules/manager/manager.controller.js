import User from "../../models/User.js";
import Project from "../../models/Project.js";
import Department from "../../models/Department.js";

export const getManagerDashboard = async (req, res) => {
  try {
    const manager = req.user;

    // Manager must have department
    if (!manager.departmentId) {
      return res.status(400).json({ message: "Manager has no department" });
    }

    const department = await Department.findById(manager.departmentId);

    const teamLeads = await User.countDocuments({
      role: "TEAM_LEAD",
      departmentId: manager.departmentId,
    });

    const employees = await User.countDocuments({
      role: "EMPLOYEE",
      departmentId: manager.departmentId,
    });

    const projects = await Project.countDocuments({
      managerId: manager._id,
    });

    res.json({
      department,
      teamLeads,
      employees,
      projects,
    });
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
};
