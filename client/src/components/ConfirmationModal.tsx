import { Modal, Stack, Title, Group, Button } from "@mantine/core";
import { IconAlertSquareFilled } from "@tabler/icons-react";

interface ConfirmationModalProps {
  modalText?: string;
  confirmText?: string;
  opened: boolean;
  onClose?: () => void;
  onConfirm: () => void;
  onCancel: () => void;
}

function ConfirmationModal({
  modalText = "Are you sure you want to archive this item?",
  confirmText = "Archive",
  opened,
  onClose,
  onConfirm,
}: ConfirmationModalProps) {
  return (
    <Modal
      centered
      opened={opened}
      onClose={onClose || (() => {})}
      withCloseButton={false}
    >
      <Stack align="center">
        <IconAlertSquareFilled size={50} color="var(--mantine-color-red-6)" />
        <Title order={5} c="gray.8" style={{ lineHeight: 1.5 }} ta="center">
          {modalText}
        </Title>
        <Group justify="flex-end">
          <Button variant="subtle" onClick={onClose}>
            Cancel
          </Button>
          <Button color="red" onClick={onConfirm}>
            {confirmText}
          </Button>
        </Group>
      </Stack>
    </Modal>
  );
}

export default ConfirmationModal;
