import { store } from "../store";
import { TimeCard, CreateTimeCard } from "../../types/TimeCard";
import {
  create,
  getAll,
  getOne,
  update,
  archive,
  restore,
} from "../api/timeCardApi";
import { EntityQueryFilters } from "../../types/Shared";

export const timeCardActions = {
  create: async (timeCard: CreateTimeCard) => {
    const response = await create(timeCard);

    if (response.ok) {
      store.timeCards = [...store.timeCards, response.data!];
      store.selectedTimeCard = response.data!;
    }
    return response;
  },

  update: async (timeCard: Partial<TimeCard>) => {
    const response = await update(timeCard);

    if (response.ok) {
      store.timeCards = store.timeCards.map((t) =>
        t.id === timeCard.id ? response.data! : t
      );
      store.selectedTimeCard = response.data!;
    }
    return response;
  },

  getAll: async () => {
    const status: EntityQueryFilters = "active";
    const response = await getAll(status);

    if (response.ok) {
      store.timeCards = response.data!;
    }
    return response;
  },

  getArchived: async () => {
    const status: EntityQueryFilters = "archived";
    const response = await getAll(status);

    if (response.ok) {
      store.archivedTimeCards = response.data!;
    }
    return response;
  },

  setSelectedTimeCard: async (id: string) => {
    const response = await getOne(id);

    if (response.ok) {
      store.selectedTimeCard = response.data!;
    }
    return response;
  },

  getSelectedTimeCardId: () => {
    return store.selectedTimeCard?.id || null;
  },

  archive: async (id: string) => {
    const response = await archive(id);

    if (response.ok) {
      // Remove the archived time card from the store
      store.timeCards = store.timeCards.filter((t) => t.id !== id);

      // Add the archived time card to the archived time cards
      store.archivedTimeCards = [...store.archivedTimeCards, response.data!];

      // Clear selected time card if it was archived
      if (store.selectedTimeCard?.id === id) {
        store.selectedTimeCard = null;
      }
    }
    return response;
  },

  restore: async (id: string) => {
    const response = await restore(id);

    if (response.ok) {
      // Add the restored time card to the time cards
      store.timeCards = [...store.timeCards, response.data!];

      // Remove from archived time cards
      store.archivedTimeCards = store.archivedTimeCards.filter(
        (timeCard) => timeCard.id !== id
      );

      // Update selected time card if it was restored
      if (store.selectedTimeCard?.id === id) {
        store.selectedTimeCard = response.data!;
      }
    }
    return response;
  },
};
