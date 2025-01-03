import { useEffect } from "react";
import {
  AppShell,
  Box,
  Burger,
  Group,
  LoadingOverlay,
  Text,
  Notification,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { useSnapshot } from "valtio";
import { IconSolarPanel, IconX } from "@tabler/icons-react";

import { NavLinks } from "./NavLinks";
import { store } from "../store";
import ConfirmationModal from "./ConfirmationModal";

interface LayoutProps {
  children: React.ReactNode;
}

function Layout({ children }: LayoutProps) {
  const { isLoading, notification, modal } = useSnapshot(store);
  const [opened, { toggle }] = useDisclosure();

  useEffect(() => {
    if (notification) {
      const timer = setTimeout(() => {
        store.notification = null;
      }, 5000);

      return () => clearTimeout(timer);
    }
  }, [notification]);

  return (
    <Box pos="relative" style={{ minHeight: "100vh" }}>
      {notification && (
        <Notification
          icon={<IconX size="1.1rem" />}
          color={notification.color || "blue"}
          title={notification.title}
          onClose={() => (store.notification = null)}
          style={{
            position: "fixed",
            top: "1rem",
            right: "1rem",
            zIndex: 1001,
          }}
        >
          {notification.message}
        </Notification>
      )}
      <LoadingOverlay
        visible={isLoading}
        zIndex={1000}
        overlayProps={{ blur: 2 }}
        transitionProps={{ transition: "fade", duration: 1000 }}
        loaderProps={{ color: "blue", type: "bars" }}
      />
      <AppShell
        header={{ height: 60 }}
        navbar={{
          width: 200,
          breakpoint: "sm",
          collapsed: { mobile: !opened },
        }}
        padding="md"
      >
        <AppShell.Header>
          <Group h="100%" px="md">
            <Burger
              opened={opened}
              onClick={toggle}
              hiddenFrom="sm"
              size="sm"
            />
            <Group>
              <IconSolarPanel size={24} />
              <Text>Sun Roof Co</Text>
            </Group>
          </Group>
        </AppShell.Header>
        <AppShell.Navbar p="md">
          <NavLinks />
        </AppShell.Navbar>
        <AppShell.Main>{children}</AppShell.Main>
      </AppShell>
      {modal && (
        <ConfirmationModal
          opened={true}
          modalText={modal.message}
          confirmText={modal.confirmText}
          onConfirm={modal.onConfirm}
          onCancel={() => (store.modal = null)}
          onClose={() => (store.modal = null)}
        />
      )}
    </Box>
  );
}

export default Layout;
