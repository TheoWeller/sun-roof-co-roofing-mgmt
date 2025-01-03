import { store } from "../store";
import { User, CreateUser } from "../../types/User";
import { EntityQueryFilters } from "../../types/Shared";
import { ApiResponse, fetchApi } from "../../utils";

export const create = async (
  userData: CreateUser
): Promise<ApiResponse<User>> => {
  store.isLoading = true;

  try {
    const data = await fetchApi<User>("users/create", {
      method: "POST",
      body: userData,
    });
    return { data, ok: true };
  } catch (error) {
    console.error("Failed to create user:", error);
    return {
      error: error instanceof Error ? error.message : "Failed to create user",
      ok: false,
    };
  } finally {
    store.isLoading = false;
  }
};

export const update = async (
  user: Partial<User>
): Promise<ApiResponse<User>> => {
  store.isLoading = true;

  try {
    const data = await fetchApi<User>(`users/${user.id}/update`, {
      method: "PATCH",
      body: user,
    });
    return { data, ok: true };
  } catch (error) {
    console.error("Failed to update user:", error);
    return {
      error: error instanceof Error ? error.message : "Failed to update user",
      ok: false,
    };
  } finally {
    store.isLoading = false;
  }
};

export const getAll = async (
  status: EntityQueryFilters = "active"
): Promise<ApiResponse<User[]>> => {
  store.isLoading = true;

  try {
    const data = await fetchApi<User[]>(`users?status=${status}`);
    return { data, ok: true };
  } catch (error) {
    console.error("Failed to fetch users:", error);
    return {
      error: error instanceof Error ? error.message : "Failed to fetch users",
      ok: false,
    };
  } finally {
    store.isLoading = false;
  }
};

export const getOne = async (id: string): Promise<ApiResponse<User>> => {
  store.isLoading = true;

  try {
    const data = await fetchApi<User>(`users/${id}`);
    return { data, ok: true };
  } catch (error) {
    console.error(`Failed to fetch user ${id}:`, error);
    return {
      error:
        error instanceof Error ? error.message : `Failed to fetch user ${id}`,
      ok: false,
    };
  } finally {
    store.isLoading = false;
  }
};

export const archive = async (id: string): Promise<ApiResponse<User>> => {
  store.isLoading = true;

  try {
    const data = await fetchApi<User>(`users/${id}/archive`, {
      method: "PATCH",
    });
    return { data, ok: true };
  } catch (error) {
    console.error("Failed to archive user:", error);
    return {
      error: error instanceof Error ? error.message : "Failed to archive user",
      ok: false,
    };
  } finally {
    store.isLoading = false;
  }
};

export const restore = async (id: string): Promise<ApiResponse<User>> => {
  store.isLoading = true;

  try {
    const data = await fetchApi<User>(`users/${id}/restore`, {
      method: "PATCH",
    });
    return { data, ok: true };
  } catch (error) {
    console.error("Failed to restore user:", error);
    return {
      error: error instanceof Error ? error.message : "Failed to restore user",
      ok: false,
    };
  } finally {
    store.isLoading = false;
  }
};
