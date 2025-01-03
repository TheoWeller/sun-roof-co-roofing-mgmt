import { useEffect } from "react";
import { Link } from "react-router-dom";
import { useSnapshot } from "valtio";
import { Divider, Container, Title, Button, Group, Stack } from "@mantine/core";
import { IconPlus } from "@tabler/icons-react";

import UsersTable from "../components/tables/UsersTable";
import { store, userActions } from "../store";
import { User } from "../types/User";

function Users() {
  const state = useSnapshot(store);
  const hasArchivedUsers = state.archivedUsers.length > 0;

  useEffect(() => {
    userActions.getAll();
    userActions.getArchived();
  }, []);

  return (
    <Container size="md" py="xl">
      <Stack gap="md">
        <Group justify="space-between">
          <Title order={2}>Users</Title>
          <Button
            component={Link}
            to="/users/create"
            leftSection={<IconPlus size="1rem" />}
          >
            Create New
          </Button>
        </Group>
        <Divider my="md" />
        <UsersTable users={[...state.users] as User[]} />
        {hasArchivedUsers && (
          <>
            <Divider my="md" />
            <Title order={2}>Archived Users</Title>
            <UsersTable
              isArchived={true}
              users={[...state.archivedUsers] as User[]}
            />
          </>
        )}
      </Stack>
    </Container>
  );
}

export default Users;
