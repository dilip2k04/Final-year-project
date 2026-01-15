import { useEffect, useState } from "react";
import { api } from "@/lib/api";

export default function DepartmentHeadDashboard() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api
      .get("/department-head/dashboard")
      .then((res) => {
        setData(res.data);
        setLoading(false);
      })
      .catch(() => {
        setLoading(false);
      });
  }, []);

  if (loading) return <div>Loading...</div>;
  if (!data) return <div>No dashboard data</div>;

  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
      <div className="p-4 bg-white rounded shadow">
        <h2 className="text-sm text-gray-500">Department</h2>
        <p className="font-bold text-lg">{data.department.name}</p>
      </div>

      <div className="p-4 bg-white rounded shadow">
        <h2 className="text-sm text-gray-500">Team Leads</h2>
        <p className="text-3xl font-bold">{data.teamLeads}</p>
      </div>

      <div className="p-4 bg-white rounded shadow">
        <h2 className="text-sm text-gray-500">Employees</h2>
        <p className="text-3xl font-bold">{data.employees}</p>
      </div>

      <div className="p-4 bg-white rounded shadow">
        <h2 className="text-sm text-gray-500">Projects</h2>
        <p className="text-3xl font-bold">{data.projects}</p>
      </div>
    </div>
  );
}
