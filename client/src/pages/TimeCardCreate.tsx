import { Container } from "@mantine/core";
import TimeCardForm from "../components/forms/TimeCardForm";

function TimeCardCreate() {
  return (
    <Container size="md" py="xl">
      <TimeCardForm />
    </Container>
  );
}

export default TimeCardCreate;
