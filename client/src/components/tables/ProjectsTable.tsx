import { Table, TableData } from "@mantine/core";

import ActionButtons from "../ActionButtons";
import ProjectStatusPill from "../ProjectStatusPill";

import { Project } from "../../types/Project";

import { store } from "../../store/store";
import { projectActions } from "../../store";
import { formatDate, renderLinkedCell, archiveHandler } from "../../utils";

/**
 * Renders a table of projects with different layouts for active vs archived views.
 *
 * Features:
 * - Displays project data with clickable IDs and formatted dates
 * - Shows status pills for active projects
 * - Handles project actions (view/edit/archive/restore)
 * - Uses Mantine Table component with horizontal scrolling
 */
function ProjectsTable({
  projects,
  isArchived = false,
}: {
  projects: Project[];
  isArchived?: boolean;
}) {
  const handleView = (project: Project) => {
    store.selectedProject = project;
  };

  const handleEdit = (project: Project) => {
    store.selectedProject = project;
  };

  const handleArchive = (project: Project) => {
    const handler = archiveHandler(
      "Project",
      () => projectActions.archive(project.id),
      () => store.selectedProject
    );
    handler(project);
  };

  const handleRestore = (project: Project) => {
    projectActions.restore(project.id);

    store.notification = {
      title: "Project Restored",
      message: "The project has been restored.",
    };
  };

  const BASE_PATH = "projects";

  let tableData: TableData;

  if (isArchived) {
    tableData = {
      head: ["ID", "Name", "Archive Date", ""],
      body: projects.map((project) => [
        renderLinkedCell(project.id.toString(), BASE_PATH, project.id),
        project.name,
        formatDate(project.archivedAt ?? null),
        <ActionButtons<Project>
          item={project}
          onRestore={handleRestore}
          basePath={BASE_PATH}
        />,
      ]),
    };
  } else {
    tableData = {
      head: [
        "ID",
        "Name",
        "Status",
        "Start Date",
        "Completion Date",
        "Actions",
      ],
      body: projects.map((project) => [
        renderLinkedCell(project.id.toString(), BASE_PATH, project.id),
        project.name,
        <ProjectStatusPill status={project.status} />,
        formatDate(project.startDate),
        formatDate(project.completionDate),
        <ActionButtons<Project>
          item={project}
          onView={handleView}
          onEdit={handleEdit}
          onArchive={handleArchive}
          basePath={BASE_PATH}
        />,
      ]),
    };
  }

  return (
    <>
      <Table.ScrollContainer minWidth={500}>
        <Table striped withTableBorder data={tableData} />
      </Table.ScrollContainer>
    </>
  );
}

export default ProjectsTable;
