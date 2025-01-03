import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { useForm } from "@mantine/form";
import { DateInput } from "@mantine/dates";
import {
  Button,
  Group,
  NumberInput,
  Stack,
  Switch,
  Text,
  TextInput,
  Title,
} from "@mantine/core";

import { store, userActions } from "../../store";
import { CreateUser, User } from "../../types/User";

// ===================================
//        Form Validation Helpers
// ===================================
const validateName = (value: string): string | null => {
  return value.trim().length < 2 ? "Name must be at least 2 characters" : null;
};

const validateEmail = (value: string): string | null => {
  return /^\S+@\S+$/.test(value) ? null : "Invalid email address";
};

const validateRate = (value: number | undefined): string | null => {
  return value && value >= 0 ? null : "Rate must be a positive number";
};

type UserFormValues = {
  name: string;
  email: string;
  costPerHour: number;
  pricePerHour: number;
  isArchived: boolean;
  archivedAt: Date | null;
};

interface UserFormProps {
  user?: User;
  title?: string;
  isCreate?: boolean;
}

function UserForm({
  user,
  title = "Create User",
  isCreate = true,
}: UserFormProps) {
  const navigate = useNavigate();

  const form = useForm<UserFormValues>({
    initialValues: {
      name: "",
      email: "",
      costPerHour: 0,
      pricePerHour: 0,
      isArchived: false,
      archivedAt: null,
    },
    validate: {
      name: validateName,
      email: validateEmail,
      costPerHour: validateRate,
      pricePerHour: validateRate,
    },
  });

  useEffect(() => {
    if (user) {
      const { name, email, costPerHour, pricePerHour, isArchived } = user;
      form.setValues({
        name,
        email,
        costPerHour,
        pricePerHour,
        isArchived: isArchived ?? false,
        archivedAt: user.archivedAt ? new Date(user.archivedAt) : null,
      });
      form.resetDirty();
    }
  }, [user]);

  const handleSubmit = async (values: typeof form.values) => {
    try {
      const userData = isCreate
        ? values
        : {
            ...values,
            id: user!.id,
          };

      const response = isCreate
        ? await userActions.create(userData as CreateUser)
        : await userActions.update(userData as Partial<User>);

      if (!response.ok) {
        form.setErrors({ form: response.error });
        return;
      }

      store.notification = {
        title: "Success!",
        message: `User ${isCreate ? "created" : "updated"} successfully`,
        color: "green",
      };

      navigate(`/users/${response.data!.id}`);
    } catch (error) {
      console.error("Failed to update user:", error);
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
            label="Name"
            placeholder="Enter user name"
            {...form.getInputProps("name")}
          />

          <TextInput
            required
            label="Email"
            placeholder="Enter email address"
            {...form.getInputProps("email")}
          />

          <NumberInput
            required
            label="Cost per Hour"
            placeholder="Enter cost per hour"
            min={0}
            decimalScale={2}
            {...form.getInputProps("costPerHour")}
          />

          <NumberInput
            required
            label="Price per Hour"
            placeholder="Enter price per hour"
            min={0}
            decimalScale={2}
            {...form.getInputProps("pricePerHour")}
          />

          <Switch
            label="Archive User"
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
              {isCreate ? "Create User" : "Update User"}
            </Button>
          </Group>
        </Stack>
      </form>
    </>
  );
}

export default UserForm;
