import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { useForm } from "@mantine/form";
import { DateInput } from "@mantine/dates";
import {
  Button,
  Group,
  Stack,
  Title,
  Text,
  NumberInput,
  Switch,
} from "@mantine/core";
import { useSnapshot } from "valtio";

import SearchableSelect from "./shared/SearchableSelectFormField";
import { CreateTimeCard, TimeCard } from "../../types/TimeCard";
import {
  store,
  timeCardActions,
  userActions,
  projectActions,
} from "../../store";

// ===================================
//        Form Validation Helpers
// ===================================
const validateHours = (value: number | undefined): string | null => {
  return value && value > 0 && value <= 24
    ? null
    : "Hours must be between 0 and 24";
};

type TimeCardFormValues = {
  date: Date;
  timeSpent: number;
  isArchived: boolean;
  archivedAt: Date | null;
  userId: string;
  projectId: string;
};

interface TimeCardFormProps {
  timeCard?: TimeCard;
  title?: string;
  isCreate?: boolean;
  userId?: string;
  projectId?: string;
}

function TimeCardForm({
  timeCard,
  title = "Create Time Card",
  isCreate = true,
  userId,
}: TimeCardFormProps) {
  const { users, projects } = useSnapshot(store);

  const navigate = useNavigate();

  const form = useForm<TimeCardFormValues>({
    initialValues: {
      date: new Date(),
      timeSpent: 0,
      isArchived: false,
      archivedAt: null,
      userId: userId ?? "",
      projectId: "",
    },
    validate: {
      timeSpent: validateHours,
      userId: (value) => (!value ? "User is required" : null),
      projectId: (value) => (!value ? "Project is required" : null),
    },
  });

  useEffect(() => {
    const refreshData = async () => {
      await Promise.all([userActions.getAll(), projectActions.getAll()]);
    };
    refreshData();

    if (timeCard) {
      const { date, timeSpent, isArchived, archivedAt, userId, projectId } =
        timeCard;

      form.setValues({
        date: new Date(date),
        timeSpent,
        isArchived: isArchived ?? false,
        archivedAt: archivedAt ? new Date(archivedAt) : null,
        userId,
        projectId: projectId?.toString(),
      });
      form.resetDirty();
    }
  }, [timeCard]);

  const handleSubmit = async (values: typeof form.values) => {
    try {
      const timeCardData = isCreate
        ? {
            ...values,
            timeSpent: values.timeSpent,
            projectId: parseInt(values.projectId.toString()),
          }
        : {
            ...values,
            id: timeCard!.id,
            projectId: parseInt(values.projectId.toString()),
          };

      const response = isCreate
        ? await timeCardActions.create(timeCardData as CreateTimeCard)
        : await timeCardActions.update(timeCardData as Partial<TimeCard>);

      if (!response.ok) {
        form.setErrors({ form: response.error });
        return;
      }

      store.notification = {
        title: "Success!",
        message: `Timecard ${isCreate ? "created" : "updated"} successfully`,
        color: "green",
      };

      navigate(`/time-cards/${response.data!.id}`);
    } catch (error) {
      console.error("Failed to update time card:", error);
      form.setErrors({ form: "An unexpected error occurred" });
    }
  };

  const userOptions = users.map((user) => ({
    value: user.id,
    label: `${user.name} (${user.email})`,
  }));

  const projectOptions = projects.map((project) => ({
    value: project.id.toString(),
    label: project.name,
  }));

  return (
    <>
      <form onSubmit={form.onSubmit(handleSubmit)}>
        <Stack gap="md" w={{ base: "100%", sm: "90%", md: 600 }} mx="auto">
          <Title order={1}>{title}</Title>

          <SearchableSelect
            label="User"
            placeholder="Select a user"
            data={userOptions}
            {...form.getInputProps("userId")}
          />

          <SearchableSelect
            label="Project"
            placeholder="Select a project"
            data={projectOptions}
            {...form.getInputProps("projectId")}
          />

          <DateInput
            required
            label="Date"
            placeholder="Select date"
            {...form.getInputProps("date")}
          />

          <NumberInput
            required
            label="Hours"
            placeholder="Enter hours worked"
            min={0}
            max={24}
            decimalScale={2}
            {...form.getInputProps("timeSpent")}
          />

          <Switch
            label="Archive Time Card"
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
              {isCreate ? "Create Time Card" : "Update Time Card"}
            </Button>
          </Group>
        </Stack>
      </form>
    </>
  );
}

export default TimeCardForm;
