import { store } from "../store";
import { Project, CreateProject } from "../../types/Project";
import { EntityQueryFilters } from "../../types/Shared";
import { ApiResponse, fetchApi } from "../../utils";

export const create = async (
  projectData: CreateProject
): Promise<ApiResponse<Project>> => {
  store.isLoading = true;

  try {
    const data = await fetchApi<Project>("projects/create", {
      method: "POST",
      body: projectData,
    });
    return { data, ok: true };
  } catch (error) {
    console.error("Failed to create project:", error);
    return {
      error:
        error instanceof Error ? error.message : "Failed to create project",
      ok: false,
    };
  } finally {
    store.isLoading = false;
  }
};

export const update = async (
  project: Partial<Project>
): Promise<ApiResponse<Project>> => {
  store.isLoading = true;

  try {
    const data = await fetchApi<Project>(`projects/${project.id}/update`, {
      method: "PATCH",
      body: project,
    });
    return { data, ok: true };
  } catch (error) {
    console.error("Failed to update project:", error);
    return {
      error:
        error instanceof Error ? error.message : "Failed to update project",
      ok: false,
    };
  } finally {
    store.isLoading = false;
  }
};

export const getAll = async (
  status: EntityQueryFilters = "active"
): Promise<ApiResponse<Project[]>> => {
  store.isLoading = true;

  try {
    const data = await fetchApi<Project[]>(`projects?status=${status}`);
    return { data, ok: true };
  } catch (error) {
    console.error("Failed to fetch projects:", error);
    return {
      error:
        error instanceof Error ? error.message : "Failed to fetch projects",
      ok: false,
    };
  } finally {
    store.isLoading = false;
  }
};

export const getOne = async (id: string): Promise<ApiResponse<Project>> => {
  store.isLoading = true;

  try {
    const data = await fetchApi<Project>(`projects/${id}`);
    return { data, ok: true };
  } catch (error) {
    console.error(`Failed to fetch project ${id}:`, error);
    return {
      error:
        error instanceof Error
          ? error.message
          : `Failed to fetch project ${id}`,
      ok: false,
    };
  } finally {
    store.isLoading = false;
  }
};

export const archive = async (id: number): Promise<ApiResponse<Project>> => {
  store.isLoading = true;

  try {
    const data = await fetchApi<Project>(`projects/${id}/archive`, {
      method: "PATCH",
    });
    return { data, ok: true };
  } catch (error) {
    console.error("Failed to archive project:", error);
    return {
      error:
        error instanceof Error ? error.message : "Failed to archive project",
      ok: false,
    };
  } finally {
    store.isLoading = false;
  }
};

export const restore = async (id: number): Promise<ApiResponse<Project>> => {
  store.isLoading = true;

  try {
    const data = await fetchApi<Project>(`projects/${id}/restore`, {
      method: "PATCH",
    });
    return { data, ok: true };
  } catch (error) {
    console.error("Failed to restore project:", error);
    return {
      error:
        error instanceof Error ? error.message : "Failed to restore project",
      ok: false,
    };
  } finally {
    store.isLoading = false;
  }
};
