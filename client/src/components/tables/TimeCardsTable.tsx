import { Table, TableData } from "@mantine/core";

import { store } from "../../store/store";
import { timeCardActions } from "../../store";
import { TimeCard } from "../../types/TimeCard";
import ActionButtons from "../ActionButtons";
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
function TimeCardTable({
  timeCards,
  isArchived = false,
}: {
  timeCards: TimeCard[];
  isArchived?: boolean;
}) {
  const handleView = (timeCard: TimeCard) => {
    store.selectedTimeCard = timeCard;
  };

  const handleEdit = (timeCard: TimeCard) => {
    store.selectedTimeCard = timeCard;
  };

  const handleArchive = (timeCard: TimeCard) => {
    const handler = archiveHandler(
      "Timecard",
      () => timeCardActions.archive(timeCard.id),
      () => store.selectedTimeCard
    );
    handler(timeCard);
  };

  const handleRestore = (timeCard: TimeCard) => {
    timeCardActions.restore(timeCard.id);

    store.notification = {
      title: "Timecard Restored",
      message: "The timecard has been restored.",
    };
  };

  const BASE_PATH = "time-cards";

  let tableData: TableData;

  if (isArchived) {
    tableData = {
      head: ["Date", "Project", "Archive Date", ""],
      body: timeCards.map((timeCard) => [
        formatDate(timeCard.date),
        renderLinkedCell(
          timeCard?.project?.name,
          "projects",
          timeCard?.projectId
        ),
        formatDate(timeCard.archivedAt ?? null),
        <ActionButtons<TimeCard>
          item={timeCard}
          onRestore={handleRestore}
          basePath={BASE_PATH}
        />,
      ]),
    };
  } else {
    tableData = {
      head: ["Date", "Hours", "User", "Project", "Actions"],
      body: timeCards.map((timeCard) => [
        formatDate(timeCard.date),
        timeCard.timeSpent,
        renderLinkedCell(timeCard?.user?.name, "users", timeCard?.userId),
        renderLinkedCell(
          timeCard?.project?.name,
          "projects",
          timeCard?.projectId
        ),
        <ActionButtons<TimeCard>
          item={timeCard}
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

export default TimeCardTable;
