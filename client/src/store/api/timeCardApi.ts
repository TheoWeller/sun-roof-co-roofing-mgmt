import { store } from "../store";
import { TimeCard, CreateTimeCard } from "../../types/TimeCard";
import { EntityQueryFilters } from "../../types/Shared";
import { ApiResponse, fetchApi } from "../../utils";

export const create = async (
  timeCardData: CreateTimeCard
): Promise<ApiResponse<TimeCard>> => {
  store.isLoading = true;

  try {
    const data = await fetchApi<TimeCard>("time-cards/create", {
      method: "POST",
      body: timeCardData,
    });
    return { data, ok: true };
  } catch (error) {
    console.error("Failed to create time card:", error);
    return {
      error:
        error instanceof Error ? error.message : "Failed to create time card",
      ok: false,
    };
  } finally {
    store.isLoading = false;
  }
};

export const update = async (
  timeCard: Partial<TimeCard>
): Promise<ApiResponse<TimeCard>> => {
  store.isLoading = true;

  try {
    const data = await fetchApi<TimeCard>(`time-cards/${timeCard.id}/update`, {
      method: "PATCH",
      body: timeCard,
    });
    return { data, ok: true };
  } catch (error) {
    console.error("Failed to update time card:", error);
    return {
      error:
        error instanceof Error ? error.message : "Failed to update time card",
      ok: false,
    };
  } finally {
    store.isLoading = false;
  }
};

export const getAll = async (
  status: EntityQueryFilters = "active"
): Promise<ApiResponse<TimeCard[]>> => {
  store.isLoading = true;

  try {
    const data = await fetchApi<TimeCard[]>(`time-cards?status=${status}`);
    return { data, ok: true };
  } catch (error) {
    console.error("Failed to fetch time cards:", error);
    return {
      error:
        error instanceof Error ? error.message : "Failed to fetch time cards",
      ok: false,
    };
  } finally {
    store.isLoading = false;
  }
};

export const getOne = async (id: string): Promise<ApiResponse<TimeCard>> => {
  store.isLoading = true;

  try {
    const data = await fetchApi<TimeCard>(`time-cards/${id}`);
    return { data, ok: true };
  } catch (error) {
    console.error(`Failed to fetch timecard ${id}:`, error);
    return {
      error:
        error instanceof Error
          ? error.message
          : `Failed to fetch timecard ${id}`,
      ok: false,
    };
  } finally {
    store.isLoading = false;
  }
};

export const archive = async (id: string): Promise<ApiResponse<TimeCard>> => {
  store.isLoading = true;

  try {
    const data = await fetchApi<TimeCard>(`time-cards/${id}/archive`, {
      method: "PATCH",
    });
    return { data, ok: true };
  } catch (error) {
    console.error("Failed to archive time card:", error);
    return {
      error:
        error instanceof Error ? error.message : "Failed to archive time card",
      ok: false,
    };
  } finally {
    store.isLoading = false;
  }
};

export const restore = async (id: string): Promise<ApiResponse<TimeCard>> => {
  store.isLoading = true;

  try {
    const data = await fetchApi<TimeCard>(`time-cards/${id}/restore`, {
      method: "PATCH",
    });
    return { data, ok: true };
  } catch (error) {
    console.error("Failed to restore time card:", error);
    return {
      error:
        error instanceof Error ? error.message : "Failed to restore time card",
      ok: false,
    };
  } finally {
    store.isLoading = false;
  }
};
