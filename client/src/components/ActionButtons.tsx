import { Group } from "@mantine/core";
import { IconEye, IconEdit, IconTrash, IconRefresh } from "@tabler/icons-react";
import { ActionIcon } from "@mantine/core";
import { Link } from "react-router-dom";
import { Button } from "@mantine/core";

interface ActionButtonsProps<T> {
  basePath: string;
  item: T;
  onView?: (item: T) => void;
  onEdit?: (item: T) => void;
  onArchive?: (item: T) => void;
  onRestore?: (item: T) => void;
}

// Reusable component that renders view, edit, and archive action buttons for any item with an ID
export function ActionButtons<T extends { id: string | number }>({
  basePath,
  item,
  onView,
  onEdit,
  onArchive,
  onRestore,
}: ActionButtonsProps<T>) {
  const handleView = () => {
    if (onView) onView(item);
  };

  const handleEdit = () => {
    if (onEdit) onEdit(item);
  };

  const handleArchive = () => {
    if (onArchive) onArchive(item);
  };

  const handleRestore = () => {
    if (onRestore) onRestore(item);
  };

  if (onRestore) {
    return (
      <Group gap="xs" justify="center">
        <Link to={`/${basePath}/${item.id}`} onClick={handleRestore}>
          <Button
            variant="filled"
            leftSection={<IconRefresh size={14} />}
            size="xs"
          >
            Restore
          </Button>
        </Link>
      </Group>
    );
  }

  return (
    <Group gap="xs">
      <Link to={`/${basePath}/${item.id}`} onClick={handleView}>
        <ActionIcon color="grape" variant="filled" aria-label="View">
          <IconEye size={14} />
        </ActionIcon>
      </Link>
      <Link to={`/${basePath}/${item.id}/edit`} onClick={handleEdit}>
        <ActionIcon variant="filled" aria-label="Edit">
          <IconEdit size={14} />
        </ActionIcon>
      </Link>
      <ActionIcon
        variant="filled"
        color="red"
        aria-label="Archive"
        onClick={handleArchive}
      >
        <IconTrash size={14} />
      </ActionIcon>
    </Group>
  );
}

export default ActionButtons;
