import { Modal as MantineModal, Button, Text, Stack } from "@mantine/core";

interface ModalProps {
  opened: boolean;
  onClose: () => void;
}

function Modal({ opened, onClose }: ModalProps) {
  return (
    <MantineModal
      closeOnClickOutside={false}
      opened={opened}
      onClose={onClose}
      title="Authentication"
    >
      <Stack>
        <Text>This is some placeholder content for the modal.</Text>
        <Button fullWidth>Sample Action</Button>
      </Stack>
    </MantineModal>
  );
}

export default Modal;
