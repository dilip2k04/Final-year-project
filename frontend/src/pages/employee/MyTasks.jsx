import { useEffect, useState } from "react";
import { api } from "@/lib/api";
import { Button } from "@/components/ui/button";

export default function MyTasks() {
  const [tasks, setTasks] = useState([]);

  const load = async () => {
    const res = await api.get("/tasks/my");
    setTasks(res.data);
  };

  const updateStatus = async (id, status) => {
    await api.put(`/tasks/${id}/status`, { status });
    load();
  };

  useEffect(() => {
    load();
  }, []);

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-bold">My Tasks</h2>

      {tasks.map(t => (
        <div key={t._id} className="border p-3 rounded">
          <b>{t.title}</b>
          <div>Project: {t.projectId?.name}</div>
          <div>Status: {t.status}</div>

          <div className="space-x-2 mt-2">
            <Button size="sm" onClick={() => updateStatus(t._id, "IN_PROGRESS")}>
              In Progress
            </Button>
            <Button size="sm" onClick={() => updateStatus(t._id, "DONE")}>
              Done
            </Button>
          </div>
        </div>
      ))}
    </div>
  );
}
