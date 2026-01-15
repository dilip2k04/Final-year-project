import { useEffect, useState, useMemo } from "react";
import useCrud from "@/core/useCrud";
import UniversalCrudModal from "@/components/UniversalCrudModal";
import { api } from "@/lib/api";
import { getUser } from "@/lib/auth";

export default function DepartmentHeadProjects() {
  const crud = useCrud("projects");
  const user = getUser();

  const [teamLeads, setTeamLeads] = useState([]);
  const [employees, setEmployees] = useState([]);

  /* ============================
     Load users of SAME department
  ============================ */
  useEffect(() => {
    if (!user?.departmentId) return;

    api
      .get(
        `/meta/users?role=TEAM_LEAD&departmentId=${user.departmentId}`
      )
      .then((r) => setTeamLeads(r.data));

    api
      .get(
        `/meta/users?role=EMPLOYEE&departmentId=${user.departmentId}`
      )
      .then((r) => setEmployees(r.data));
  }, [user]);

  /* ============================
     Dynamic form fields
  ============================ */
  const fields = useMemo(
    () => [
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
    ],
    [teamLeads, employees]
  );

  return (
    <UniversalCrudModal
      title="Department Projects"
      fields={fields}
      crud={crud}
    />
  );
}
