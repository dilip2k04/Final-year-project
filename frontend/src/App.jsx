import { Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import ProtectedRoute from "./components/ProtectedRoute";
import DashboardLayout from "./layouts/DashboardLayout";

import CeoDashboard from "./pages/dashboards/CeoDashboard";
import ManagerDashboard from "./pages/dashboards/ManagerDashboard";
import TlDashboard from "./pages/dashboards/TlDashboard";
import EmployeeDashboard from "./pages/dashboards/EmployeeDashboard";
import ManagerProjects from "./pages/manager/ManagerProjects";
import Users from "./pages/admin/Users"
import Departments from "./pages/admin/Departments"; 
import Projects from "./pages/admin/Projects";

export default function App() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />

      {/* CEO */}
      <Route
        path="/admin"
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

      {/* MANAGER */}
      <Route
        path="/manager"
        element={
          <ProtectedRoute allowedRoles={["MANAGER"]}>
            <DashboardLayout />
          </ProtectedRoute>
        }
      >
        <Route index element={<ManagerDashboard />} />
        <Route path="projects" element={<ManagerProjects />} />
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
