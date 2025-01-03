import { useEffect } from "react";
import { Link } from "react-router-dom";

import { Container, Title, Button, Group, Stack, Divider } from "@mantine/core";
import { IconPlus } from "@tabler/icons-react";
import { useSnapshot } from "valtio";

import ProjectsTable from "../components/tables/ProjectsTable";
import { store, projectActions } from "../store";

import { Project } from "../types/Project";

function Projects() {
  const state = useSnapshot(store);

  useEffect(() => {
    projectActions.getAll();
    projectActions.getArchived();
  }, []);

  const hasArchivedProjects = state.archivedProjects.length > 0;

  return (
    <Container size="md" py="xl">
      <Stack gap="md">
        <Group justify="space-between">
          <Title order={2}>Projects</Title>
          <Button
            component={Link}
            to="/projects/create"
            leftSection={<IconPlus size="1rem" />}
          >
            Create New
          </Button>
        </Group>
        <ProjectsTable projects={[...state.projects] as Project[]} />
        {hasArchivedProjects && (
          <>
            <Divider my="md" />
            <Title order={2}>Archived Projects</Title>
            <ProjectsTable
              isArchived={true}
              projects={[...state.archivedProjects] as Project[]}
            />
          </>
        )}
      </Stack>
    </Container>
  );
}

export default Projects;
