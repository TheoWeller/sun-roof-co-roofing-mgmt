import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { useForm } from "@mantine/form";
import { DateInput } from "@mantine/dates";
import {
  Button,
  Group,
  Select,
  Stack,
  Switch,
  Text,
  TextInput,
  Textarea,
  Title,
} from "@mantine/core";

import { projectActions, store } from "../../store";

import { Project, ProjectStatus, CreateProject } from "../../types/Project";

import { formatProjectStatusValue } from "../../utils";

// ===================================
//        Form Validation Helpers
// ===================================
const validateProjectName = (value: string): string | null => {
  return value.trim().length < 2
    ? "Project name must be at least 2 characters"
    : null;
};

const validateProjectStatus = (value: string): string | null => {
  return Object.values(ProjectStatus).includes(value as ProjectStatus)
    ? null
    : "Invalid status";
};

const validateCompletionDate = (
  value: Date | null,
  values: ProjectFormValues
): string | null => {
  if (!value || !values.startDate) return null;

  const completionDate = new Date(value).setHours(0, 0, 0, 0);
  const startDate = new Date(values.startDate).setHours(0, 0, 0, 0);

  return completionDate < startDate
    ? "Completion date cannot be earlier than start date"
    : null;
};

type ProjectFormValues = {
  name: string;
  description: string;
  status: ProjectStatus;
  startDate: Date | null;
  completionDate: Date | null;
  isArchived: boolean;
  archivedAt: Date | null;
};

interface ProjectFormProps {
  project?: Project;
  title?: string;
  isCreate?: boolean;
}

function ProjectForm({
  project,
  title = "Create Project",
  isCreate = true,
}: ProjectFormProps) {
  const navigate = useNavigate();

  const form = useForm<ProjectFormValues>({
    initialValues: {
      name: "",
      description: "",
      status: ProjectStatus.LEAD,
      startDate: null,
      completionDate: null,
      isArchived: false,
      archivedAt: null,
    },
    validate: {
      name: validateProjectName,
      status: validateProjectStatus,
      completionDate: validateCompletionDate,
    },
  });

  useEffect(() => {
    if (project) {
      const {
        name,
        description,
        status,
        startDate,
        completionDate,
        isArchived,
      } = project;

      form.setValues({
        name,
        description: description ?? "",
        status: status,
        startDate: new Date(startDate ?? new Date()),
        completionDate: new Date(completionDate ?? new Date()),
        isArchived: isArchived ?? false,
      });
      form.resetDirty();
    }
  }, [project]);

  const handleSubmit = async (values: typeof form.values) => {
    try {
      const projectData = isCreate
        ? values
        : {
            ...values,
            id: project!.id,
            status: values.status as ProjectStatus,
          };

      const response = isCreate
        ? await projectActions.create(projectData as CreateProject)
        : await projectActions.update(projectData as Partial<Project>);

      if (!response.ok) {
        form.setErrors({ form: response.error });
        return;
      }

      store.notification = {
        title: "Success!",
        message: `Project ${isCreate ? "created" : "updated"} successfully`,
        color: "green",
      };

      navigate(`/projects/${response.data!.id}`);
    } catch (error) {
      console.error("Failed to update project:", error);
      form.setErrors({ form: "An unexpected error occurred" });
    }
  };

  return (
    <>
      <form onSubmit={form.onSubmit(handleSubmit)}>
        <Stack gap="md" w={{ base: "100%", sm: "90%", md: 600 }} mx="auto">
          <Title order={1}>{title}</Title>
          <TextInput
            required
            label="Project Name"
            placeholder="Enter project name"
            {...form.getInputProps("name")}
          />

          <Textarea
            label="Description"
            placeholder="Enter project description"
            {...form.getInputProps("description")}
          />

          <Select
            required
            label="Status"
            data={Object.values(ProjectStatus).map((status) => ({
              value: status,
              label: formatProjectStatusValue(status),
            }))}
            {...form.getInputProps("status")}
          />

          <DateInput
            label="Start Date"
            placeholder="Select start date"
            clearable
            size="sm"
            {...form.getInputProps("startDate")}
          />

          <DateInput
            label="Completion Date"
            placeholder="Select completion date"
            clearable
            min={
              form.values.startDate
                ? form.values.startDate.toISOString()
                : undefined
            }
            {...form.getInputProps("completionDate")}
          />

          <Switch
            label="Archive Project"
            color="red"
            {...form.getInputProps("isArchived", { type: "checkbox" })}
          />

          {isCreate && (
            <DateInput
              label="Archive Date"
              placeholder="Select archive date"
              clearable
              size="sm"
              {...form.getInputProps("archivedAt")}
            />
          )}

          {form.errors.form && (
            <Text color="red" size="sm">
              {form.errors.form}
            </Text>
          )}

          <Group justify="flex-end">
            <Button variant="subtle" onClick={() => navigate(-1)}>
              Cancel
            </Button>
            <Button type="submit" disabled={!form.isDirty()}>
              {isCreate ? "Create Project" : "Update Project"}
            </Button>
          </Group>
        </Stack>
      </form>
    </>
  );
}

export default ProjectForm;
