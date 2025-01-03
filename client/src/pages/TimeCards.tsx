import { useEffect } from "react";
import { Link } from "react-router-dom";
import { useSnapshot } from "valtio";
import { Divider, Container, Title, Button, Group, Stack } from "@mantine/core";
import { IconPlus } from "@tabler/icons-react";

import TimeCardsTable from "../components/tables/TimeCardsTable";
import { store, timeCardActions } from "../store";

import { TimeCard } from "../types/TimeCard";

function TimeCards() {
  const state = useSnapshot(store);

  useEffect(() => {
    timeCardActions.getAll();
    timeCardActions.getArchived();
  }, []);

  return (
    <Container size="md" py="xl">
      <Stack gap="md">
        <Group justify="space-between">
          <Title order={2}>Time Cards</Title>
          <Button
            component={Link}
            to="/time-cards/create"
            leftSection={<IconPlus size="1rem" />}
          >
            Create New
          </Button>
        </Group>
        <Divider my="md" />
        <TimeCardsTable timeCards={[...state.timeCards] as TimeCard[]} />
        <Divider my="md" />
        <Title order={2}>Archived Time Cards</Title>
        <TimeCardsTable
          isArchived={true}
          timeCards={[...state.archivedTimeCards] as TimeCard[]}
        />
      </Stack>
    </Container>
  );
}

export default TimeCards;
