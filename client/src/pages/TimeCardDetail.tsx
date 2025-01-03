import { useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useSnapshot } from "valtio";

import {
  Button,
  Container,
  Divider,
  Group,
  Stack,
  Text,
  Title,
} from "@mantine/core";
import { IconArrowLeft, IconEdit } from "@tabler/icons-react";

import { timeCardActions, store } from "../store";

function TimeCardDetail() {
  const { id } = useParams();
  const { selectedTimeCard } = useSnapshot(store);

  const navigate = useNavigate();

  useEffect(() => {
    const loadTimeCard = async () => {
      if (!selectedTimeCard && id) {
        try {
          await timeCardActions.setSelectedTimeCard(id);
        } catch (error) {
          console.error("Failed to load time card", error);
        }
      }
    };

    loadTimeCard();
  }, [id, selectedTimeCard]);

  if (!selectedTimeCard) {
    return (
      <Container size="md" py="xl">
        <Text>Time card not found</Text>
      </Container>
    );
  }

  return (
    <>
      <Container size="md" py="md">
        <Button
          variant="subtle"
          component={Link}
          to="/time-cards"
          leftSection={<IconArrowLeft size="1rem" />}
          mb="md"
          size="compact-md"
        >
          Back
        </Button>
        <Stack gap="md">
          <Group justify="space-between" align="center">
            <Title order={3}>Details</Title>
            <Button
              variant="subtle"
              size="compact-sm"
              leftSection={<IconEdit size="1rem" />}
              onClick={() =>
                navigate(`/time-cards/${selectedTimeCard.id}/edit`)
              }
            >
              Edit
            </Button>
          </Group>
          <Text>
            <strong>Project:</strong> {selectedTimeCard.project.name || "-"}
          </Text>
          <Text>
            <strong>Date:</strong>{" "}
            {selectedTimeCard.date
              ? new Date(selectedTimeCard.date).toLocaleDateString()
              : "-"}
          </Text>
          <Text>
            <strong>Hours:</strong> {selectedTimeCard.timeSpent || "-"}
          </Text>
          <Text>
            <strong>Created At:</strong>{" "}
            {selectedTimeCard?.createdAt
              ? new Date(selectedTimeCard.createdAt).toLocaleDateString()
              : "-"}
          </Text>
          <Text>
            <strong>Updated At:</strong>{" "}
            {selectedTimeCard?.updatedAt
              ? new Date(selectedTimeCard.updatedAt).toLocaleDateString()
              : "-"}
          </Text>
        </Stack>
      </Container>
      <Divider my="md" />
    </>
  );
}

export default TimeCardDetail;
