import { useEffect, useState } from "react";
import { api } from "@/lib/api";

export default function ManagerDashboard() {
  const [data, setData] = useState(null);

  useEffect(() => {
    api.get("/manager/dashboard").then((r) => setData(r.data));
  }, []);

  if (!data) return <div>Loading...</div>;

  return (
    <div className="grid grid-cols-4 gap-4">
      <div className="p-4 bg-white rounded shadow">
        <h2>Department</h2>
        <p className="font-bold">{data.department.name}</p>
      </div>

      <div className="p-4 bg-white rounded shadow">
        <h2>Team Leads</h2>
        <p className="text-2xl">{data.teamLeads}</p>
      </div>

      <div className="p-4 bg-white rounded shadow">
        <h2>Employees</h2>
        <p className="text-2xl">{data.employees}</p>
      </div>

      <div className="p-4 bg-white rounded shadow">
        <h2>Projects</h2>
        <p className="text-2xl">{data.projects}</p>
      </div>
    </div>
  );
}
