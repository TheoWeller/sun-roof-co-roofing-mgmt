import { store } from "../store";
import { Project, CreateProject } from "../../types/Project";
import {
  create,
  getAll,
  getOne,
  update,
  archive,
  restore,
} from "../api/projectApi";
import { EntityQueryFilters } from "../../types/Shared";

export const projectActions = {
  create: async (project: CreateProject) => {
    const response = await create(project);

    if (response.ok) {
      store.projects = [...store.projects, response.data!];
      store.selectedProject = response.data!;
    }
    return response;
  },

  update: async (project: Partial<Project>) => {
    const response = await update(project);

    if (response.ok) {
      store.projects = store.projects.map((p) =>
        p.id === project.id ? response.data! : p
      );
      store.selectedProject = response.data!;
    }
    return response;
  },

  getAll: async () => {
    const status: EntityQueryFilters = "active";
    const response = await getAll(status);

    if (response.ok) {
      store.projects = response.data!;
    }
    return response;
  },

  getArchived: async () => {
    const status: EntityQueryFilters = "archived";
    const response = await getAll(status);

    if (response.ok) {
      store.archivedProjects = response.data!;
    }
    return response;
  },

  setSelectedProject: async (id: string) => {
    const response = await getOne(id);

    if (response.ok) {
      store.selectedProject = response.data!;
    }
    return response;
  },

  getSelectedProjectId: () => {
    return store.selectedProject?.id || null;
  },

  archive: async (id: number) => {
    const response = await archive(id);

    if (response.ok) {
      // Remove the archived project from the store
      store.projects = store.projects.filter((p) => p.id !== id);

      // Add the archived project to the archived projects
      store.archivedProjects = [...store.archivedProjects, response.data!];

      // Clear selected project if it was archived
      if (store.selectedProject?.id === id) {
        store.selectedProject = null;
      }
    }
    return response;
  },

  restore: async (id: number) => {
    const response = await restore(id);

    if (response.ok) {
      // Add the restored project to the projects list
      store.projects = [...store.projects, response.data!];

      // Remove from archived projects
      store.archivedProjects = store.archivedProjects.filter(
        (p) => p.id !== id
      );

      // Update selected project if it was restored
      if (store.selectedProject?.id === id) {
        store.selectedProject = response.data!;
      }
    }
    return response;
  },
};
