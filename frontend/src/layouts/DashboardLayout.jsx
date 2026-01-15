import { Outlet, useNavigate, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { getUser, logout as doLogout } from "@/lib/auth";

export default function DashboardLayout() {
  const user = getUser();
  const navigate = useNavigate();

  if (!user) {
    navigate("/login");
    return null;
  }

  const role = user.role;

  const logout = () => {
    doLogout();
  };

  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <aside className="w-64 bg-zinc-900 text-white flex flex-col">
        <div className="p-4 text-xl font-bold border-b border-zinc-800">
          Company AI
        </div>

        <nav className="flex-1 p-4 space-y-2">
          <SidebarLinks role={role} />
        </nav>

        <div className="p-4 border-t border-zinc-800">
          <Button variant="destructive" className="w-full" onClick={logout}>
            Logout
          </Button>
        </div>
      </aside>

      {/* Main */}
      <div className="flex-1 flex flex-col">
        <header className="h-14 border-b flex items-center px-6 bg-white">
          <h1 className="font-semibold capitalize">
            {role.replace("_", " ")} Dashboard
          </h1>
        </header>

        <main className="flex-1 p-6 bg-zinc-50">
          <Outlet />
        </main>
      </div>
    </div>
  );
}

function SidebarLinks({ role }) {
  const common = [{ label: "Dashboard", path: "" }];

  const linksByRole = {
    CEO: [
      ...common,
      { label: "Departments", path: "departments" },
      { label: "Reports", path: "reports" },
      { label: "Users", path: "users" },
      { label: "Projects", path: "projects" },

    ],
    MANAGER: [
      ...common,
      { label: "Projects", path: "projects" },
    ],
    TEAM_LEAD: [
      ...common,
      { label: "My Team", path: "team" },
      { label: "Tasks", path: "tasks" },
    ],
    EMPLOYEE: [
      ...common,
      { label: "My Tasks", path: "tasks" },
    ],
  };

  return (
    <>
      {linksByRole[role]?.map((item) => (
        <Link
          key={item.label}
          to={item.path}
          className="block px-3 py-2 rounded hover:bg-zinc-800"
        >
          {item.label}
        </Link>
      ))}
    </>
  );
}
