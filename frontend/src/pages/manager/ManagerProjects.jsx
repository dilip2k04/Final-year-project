import { useEffect, useState } from "react";
import useCrud from "@/core/useCrud";
import UniversalCrudModal from "@/components/UniversalCrudModal";
import { api } from "@/lib/api";

export default function ManagerProjects() {
  const crud = useCrud("projects");

  const [teamLeads, setTeamLeads] = useState([]);
  const [employees, setEmployees] = useState([]);

  // Load team leads & employees of manager's department
  useEffect(() => {
    api.get("/meta/users?role=TEAM_LEAD").then((r) => setTeamLeads(r.data));
    api.get("/meta/users?role=EMPLOYEE").then((r) => setEmployees(r.data));
  }, []);

  const fields = [
    {
      name: "name",
      label: "Project Name",
    },
    {
      name: "teamLeadId",
      label: "Team Lead",
      type: "select",
      options: teamLeads.map((u) => ({
        label: u.name,
        value: u._id,
      })),
    },
    {
      name: "employees",
      label: "Employees",
      type: "multiselect",
      options: employees.map((u) => ({
        label: u.name,
        value: u._id,
      })),
    },
  ];

  return (
    <UniversalCrudModal
      title="My Projects"
      fields={fields}
      crud={crud}
    />
  );
}
