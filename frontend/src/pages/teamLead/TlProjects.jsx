import { useEffect, useState } from "react";
import { api } from "@/lib/api";
import { useNavigate } from "react-router-dom";

export default function TlProjects() {
  const [projects, setProjects] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    api.get("/projects").then((res) => setProjects(res.data));
  }, []);

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-bold">My Projects</h2>

      {projects.map((p) => (
        <div
          key={p._id}
          className="border p-4 rounded bg-white flex justify-between"
        >
          <div>
            <div className="font-semibold">{p.name}</div>
            <div className="text-sm text-gray-500">
              Team Lead: {p.teamLeadId?.name}
            </div>
          </div>

          <button
            onClick={() =>
              navigate(`/team-lead/projects/${p._id}/tasks`)
            }
            className="text-blue-600 underline"
          >
            View Tasks
          </button>
        </div>
      ))}
    </div>
  );
}
