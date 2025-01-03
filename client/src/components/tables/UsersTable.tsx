import { Table, TableData } from "@mantine/core";

import { store } from "../../store/store";
import { userActions } from "../../store";

import ActionButtons from "../ActionButtons";

import { User } from "../../types/User";
import { archiveHandler, formatDate, renderLinkedCell } from "../../utils";

/**
 * Renders a table of users with different layouts for active vs archived views.
 *
 * Features:
 * - Displays user data with clickable IDs and formatted dates
 * - Shows status pills for active users
 * - Handles user actions (view/edit/archive/restore)
 * - Uses Mantine Table component with horizontal scrolling
 */
function UsersTable({
  users,
  isArchived = false,
}: {
  users: User[];
  isArchived?: boolean;
}) {
  const handleView = (user: User) => {
    store.selectedUser = user;
  };

  const handleEdit = (user: User) => {
    store.selectedUser = user;
  };

  const handleArchive = (user: User) => {
    const handler = archiveHandler(
      "User",
      () => userActions.archive(user.id),
      () => store.selectedUser
    );
    handler(user);
  };

  const handleRestore = (user: User) => {
    userActions.restore(user.id);

    store.notification = {
      title: "User Restored",
      message: "The user has been restored.",
    };
  };

  const BASE_PATH = "users";

  let tableData: TableData;

  if (isArchived) {
    tableData = {
      head: ["Name", "Email", "Archive Date", ""],
      body: users.map((user) => [
        renderLinkedCell(user.name, BASE_PATH, user.id),
        user.email,
        formatDate(user.archivedAt ?? null),
        <ActionButtons<User>
          item={user}
          onRestore={handleRestore}
          basePath={BASE_PATH}
        />,
      ]),
    };
  } else {
    tableData = {
      head: ["Name", "Email", "Cost/Hour", "Price/Hour", "Actions"],
      body: users.map((user) => [
        renderLinkedCell(user.name, BASE_PATH, user.id),
        user.email,
        `$${user.costPerHour}/hr`,
        `$${user.pricePerHour}/hr`,
        <ActionButtons<User>
          item={user}
          onView={handleView}
          onEdit={handleEdit}
          onArchive={handleArchive}
          basePath={BASE_PATH}
        />,
      ]),
    };
  }

  return (
    <Table.ScrollContainer minWidth={500}>
      <Table striped withTableBorder data={tableData} />
    </Table.ScrollContainer>
  );
}

export default UsersTable;
