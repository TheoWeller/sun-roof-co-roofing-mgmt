import { useEffect } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { useSnapshot } from "valtio";
import {
  Container,
  Title,
  Stack,
  Text,
  Loader,
  Divider,
  Button,
  Group,
} from "@mantine/core";
import { IconArrowLeft, IconEdit } from "@tabler/icons-react";

import { userActions, store } from "../store";
import TimeCardsTable from "../components/tables/TimeCardsTable";
import DetailCard from "../components/DetailCard";

import { TimeCard } from "../types/TimeCard";

function UserDetail() {
  const { id } = useParams();
  const { selectedUser, isLoading } = useSnapshot(store);
  const navigate = useNavigate();

  useEffect(() => {
    const loadUser = async () => {
      if (!selectedUser && id) {
        try {
          await userActions.setSelectedUser(id);
        } catch (error) {
          console.error("Failed to load user", error);
        }
      }
    };

    loadUser();
  }, [id, selectedUser]);

  if (isLoading) {
    return (
      <Container size="md" py="xl">
        <Loader />
      </Container>
    );
  }

  if (!selectedUser) {
    return (
      <Container size="md" py="xl">
        <Text>User not found</Text>
      </Container>
    );
  }

  const userDetails = [
    { label: "Name", value: selectedUser.name, span: 12 },
    { label: "Email", value: selectedUser.email },
    { label: "Archived Status", value: selectedUser.isArchived ? "Yes" : "No" },
    { label: "Cost Per Hour", value: `$${selectedUser.costPerHour}` },
    { label: "Price Per Hour", value: `$${selectedUser.pricePerHour}` },
    {
      label: "Created At",
      value: selectedUser.createdAt
        ? new Date(selectedUser.createdAt).toLocaleDateString()
        : null,
    },
    {
      label: "Updated At",
      value: selectedUser.updatedAt
        ? new Date(selectedUser.updatedAt).toLocaleDateString()
        : null,
    },
    {
      label: "Archived At",
      value: selectedUser.archivedAt
        ? new Date(selectedUser.archivedAt).toLocaleString()
        : null,
    },
  ];

  const hasTimeCards =
    selectedUser?.timeCards && selectedUser.timeCards.length > 0;

  return (
    <Container size="md" py="md">
      <Button
        variant="subtle"
        component={Link}
        to="/users"
        leftSection={<IconArrowLeft size="1rem" />}
        mb="md"
        size="compact-md"
      >
        Back
      </Button>
      <Stack gap="md">
        <Group justify="space-between" align="center">
          <Title order={3}>User Details</Title>
          <Button
            variant="subtle"
            size="compact-sm"
            leftSection={<IconEdit size="1rem" />}
            onClick={() => navigate(`/users/${selectedUser.id}/edit`)}
          >
            Edit
          </Button>
        </Group>

        <DetailCard fields={userDetails} />

        {hasTimeCards && (
          <>
            <Divider my="md" />
            <Title order={3}>Time Cards</Title>
            <TimeCardsTable
              timeCards={[...selectedUser.timeCards] as TimeCard[]}
            />
          </>
        )}
      </Stack>
    </Container>
  );
}

export default UserDetail;
