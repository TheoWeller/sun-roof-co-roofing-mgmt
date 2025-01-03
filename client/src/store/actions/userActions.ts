import { store } from "../store";
import { User, CreateUser } from "../../types/User";
import {
  create,
  getAll,
  getOne,
  update,
  archive,
  restore,
} from "../api/userApi";
import { EntityQueryFilters } from "../../types/Shared";

export const userActions = {
  create: async (user: CreateUser) => {
    const response = await create(user);

    if (!response.ok) {
      return response;
    }

    const newUser = response.data!;
    store.users = [...store.users, newUser];
    store.selectedUser = newUser;
    return response;
  },

  update: async (user: Partial<User>) => {
    const response = await update(user);

    if (!response.ok) {
      return response;
    }

    const updatedUser = response.data!;
    store.users = store.users.map((u) =>
      u.id === updatedUser.id ? updatedUser : u
    );
    store.selectedUser = updatedUser;
    return response;
  },

  getAll: async () => {
    const status: EntityQueryFilters = "active";
    const response = await getAll(status);

    if (response.ok) {
      store.users = response.data!;
    }
    return response;
  },

  getArchived: async () => {
    const status: EntityQueryFilters = "archived";
    const response = await getAll(status);

    if (response.ok) {
      store.archivedUsers = response.data!;
    }
    return response;
  },

  setSelectedUser: async (id: string) => {
    const response = await getOne(id);

    if (response.ok) {
      store.selectedUser = response.data!;
    }
    return response;
  },

  getSelectedUserId: () => {
    return store.selectedUser?.id || null;
  },

  archive: async (id: string) => {
    const response = await archive(id);

    if (response.ok) {
      // Remove the archived user from the users
      store.users = store.users.filter((user) => user.id !== id);

      // Clear selected user if it was archived
      if (store.selectedUser?.id === id) {
        store.selectedUser = null;
      }

      // Add the archived user to the archived users
      store.archivedUsers = [...store.archivedUsers, response.data!];
    }
    return response;
  },

  restore: async (id: string) => {
    const response = await restore(id);

    if (response.ok) {
      // Add the restored user to the users
      store.users = [...store.users, response.data!];

      // Update selected user if it was restored
      if (store.selectedUser?.id === id) {
        store.selectedUser = response.data!;
      }

      // Remove from archived users
      store.archivedUsers = store.archivedUsers.filter(
        (user) => user.id !== id
      );
    }
    return response;
  },
};
