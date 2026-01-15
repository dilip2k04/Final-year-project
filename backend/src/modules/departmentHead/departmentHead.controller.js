import User from "../../models/User.js";
import Project from "../../models/Project.js";
import Department from "../../models/Department.js";

export const getDepartmentHeadDashboard = async (req, res) => {
  try {
    const departmentHead = req.user;

    if (!departmentHead.departmentId) {
      return res
        .status(400)
        .json({ message: "Department Head has no department assigned" });
    }

    const department = await Department.findById(
      departmentHead.departmentId
    );

    const teamLeads = await User.countDocuments({
      role: "TEAM_LEAD",
      departmentId: departmentHead.departmentId,
    });

    const employees = await User.countDocuments({
      role: "EMPLOYEE",
      departmentId: departmentHead.departmentId,
    });

    const projects = await Project.countDocuments({
      departmentId: departmentHead.departmentId,
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
