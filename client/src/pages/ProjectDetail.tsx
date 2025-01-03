import { useEffect } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { useSnapshot } from "valtio";
import {
  Container,
  Title,
  Stack,
  Text,
  Button,
  Loader,
  Group,
  Divider,
} from "@mantine/core";
import { IconArrowLeft, IconEdit } from "@tabler/icons-react";

import { projectActions, store } from "../store";
import { TimeCard } from "../types/TimeCard";
import { User } from "../types/User";
import DetailCard from "../components/DetailCard";
import FinancialSummary from "../components/FinancialSummary";
import ProjectStatusPill from "../components/ProjectStatusPill";
import TimeCardsTable from "../components/tables/TimeCardsTable";
import UsersTable from "../components/tables/UsersTable";
import { calculateProjectStats } from "../utils";

function ProjectDetail() {
  const { id } = useParams();
  const { selectedProject, isLoading } = useSnapshot(store);
  const navigate = useNavigate();

  useEffect(() => {
    const refresh = async () => {
      try {
        if (id) {
          await projectActions.setSelectedProject(id);
        }
      } catch (error) {
        console.error("Failed to load project", error);
      }
    };

    refresh();
  }, [id, selectedProject]);

  if (isLoading) {
    return (
      <Container size="md" py="xl">
        <Loader />
      </Container>
    );
  }

  if (!selectedProject) {
    return (
      <Container size="md" py="xl">
        <Text>Project not found</Text>
      </Container>
    );
  }

  const timeCards = selectedProject.timeCards || [];
  const hasTimeCards = timeCards && timeCards.length > 0;

  const users = timeCards.map((timeCard) => timeCard.user) || [];
  const hasUsers = users && users.length > 0;

  const projectStats = hasTimeCards
    ? calculateProjectStats(timeCards as TimeCard[])
    : null;

  const projectDetails = [
    { label: "Name", value: selectedProject.name, span: 12 },
    {
      label: "Status",
      value: selectedProject.status ? (
        <ProjectStatusPill status={selectedProject.status} />
      ) : (
        "-"
      ),
    },
    { label: "Description", value: selectedProject.description || "-" },
    {
      label: "Start Date",
      value: selectedProject.startDate
        ? new Date(selectedProject.startDate).toLocaleDateString()
        : "-",
    },
    {
      label: "Completion Date",
      value: selectedProject.completionDate
        ? new Date(selectedProject.completionDate).toLocaleDateString()
        : "-",
    },
    {
      label: "Archived Status",
      value: selectedProject.isArchived ? "Yes" : "No",
    },
    {
      label: "Archived At",
      value: selectedProject.archivedAt
        ? new Date(selectedProject.archivedAt).toLocaleString()
        : "-",
    },
    {
      label: "Created At",
      value: selectedProject.createdAt
        ? new Date(selectedProject.createdAt).toLocaleDateString()
        : "-",
    },
    {
      label: "Updated At",
      value: selectedProject.updatedAt
        ? new Date(selectedProject.updatedAt).toLocaleDateString()
        : "-",
    },
  ];

  return (
    <Container size="md" py="md">
      <Button
        variant="subtle"
        component={Link}
        to="/projects"
        leftSection={<IconArrowLeft size="1rem" />}
        mb="md"
        size="compact-md"
      >
        Back
      </Button>
      <Stack gap="md">
        <Group justify="space-between" align="center">
          <Title order={3}>Project Details</Title>
          <Button
            variant="subtle"
            size="compact-sm"
            leftSection={<IconEdit size="1rem" />}
            onClick={() => navigate(`/projects/${selectedProject.id}/edit`)}
          >
            Edit
          </Button>
        </Group>
        <DetailCard fields={projectDetails} />

        {hasTimeCards && (
          <>
            <Divider my="md" />
            <FinancialSummary projectStats={projectStats} />
          </>
        )}

        {hasUsers && (
          <>
            <Divider my="md" />
            <Title order={3}>Users</Title>
            <UsersTable users={[...users] as User[]} />
          </>
        )}

        {hasTimeCards && (
          <>
            <Divider my="md" />
            <Title order={3}>Time Cards</Title>
            <TimeCardsTable timeCards={[...timeCards] as TimeCard[]} />
          </>
        )}
      </Stack>
    </Container>
  );
}

export default ProjectDetail;
