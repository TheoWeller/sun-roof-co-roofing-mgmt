import { Container } from "@mantine/core";
import UserForm from "../components/forms/UserForm";

function UserCreate() {
  return (
    <Container size="md" py="xl">
      <UserForm />
    </Container>
  );
}

export default UserCreate;
