import { Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import ProtectedRoute from "./components/ProtectedRoute";
import DashboardLayout from "./layouts/DashboardLayout";

import CeoDashboard from "./pages/dashboards/CeoDashboard";
import DepartmentHeadDashboard from "./pages/dashboards/DepartmentHeadDashboard";
import TlDashboard from "./pages/dashboards/TlDashboard";
import EmployeeDashboard from "./pages/dashboards/EmployeeDashboard";

import Users from "./pages/ceo/Users";
import Departments from "./pages/ceo/Departments";
import Projects from "./pages/ceo/Projects";
import DepartmentHeadProjects from "./pages/departmentHead/DepartmentHeadProjects";

export default function App() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />

      {/* CEO */}
      <Route
        path="/ceo"
        element={
          <ProtectedRoute allowedRoles={["CEO"]}>
            <DashboardLayout />
          </ProtectedRoute>
        }
      >
        <Route index element={<CeoDashboard />} />
        <Route path="users" element={<Users />} />
        <Route path="departments" element={<Departments />} />
        <Route path="projects" element={<Projects />} />
      </Route>

      {/* DEPARTMENT HEAD */}
      <Route
        path="/department-head"
        element={
          <ProtectedRoute allowedRoles={["DEPARTMENT_HEAD"]}>
            <DashboardLayout />
          </ProtectedRoute>
        }
      >
        <Route index element={<DepartmentHeadDashboard />} />
        <Route path="projects" element={<DepartmentHeadProjects />} />
      </Route>

      {/* TEAM LEAD */}
      <Route
        path="/team-lead"
        element={
          <ProtectedRoute allowedRoles={["TEAM_LEAD"]}>
            <DashboardLayout />
          </ProtectedRoute>
        }
      >
        <Route index element={<TlDashboard />} />
      </Route>

      {/* EMPLOYEE */}
      <Route
        path="/employee"
        element={
          <ProtectedRoute allowedRoles={["EMPLOYEE"]}>
            <DashboardLayout />
          </ProtectedRoute>
        }
      >
        <Route index element={<EmployeeDashboard />} />
      </Route>

      <Route path="*" element={<Login />} />
    </Routes>
  );
}
