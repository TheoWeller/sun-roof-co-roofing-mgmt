import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useSnapshot } from "valtio";

import ProjectForm from "../components/forms/ProjectForm";
import { projectActions, store } from "../store";
import { Project } from "../types/Project";

function ProjectEdit() {
  const { id } = useParams();
  const { selectedProject } = useSnapshot(store);

  useEffect(() => {
    const loadProject = async () => {
      if (!selectedProject && id) {
        try {
          await projectActions.setSelectedProject(id);
        } catch (error) {
          console.error("Failed to load project", error);
        }
      }
    };

    loadProject();
  }, [id, selectedProject]);

  if (!selectedProject) {
    return <div>Project not found</div>;
  }

  return (
    <ProjectForm
      isCreate={false}
      title="Update Project"
      project={selectedProject as Project}
    />
  );
}

export default ProjectEdit;
