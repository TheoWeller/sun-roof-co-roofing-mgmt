import { Paper, Grid, Text } from "@mantine/core";

export type DetailField = {
  label: string;
  value: string | number | JSX.Element | null | undefined;
  span?: number;
};

type DetailCardProps = {
  fields: DetailField[];
};

function DetailCard({ fields }: DetailCardProps) {
  return (
    <Paper shadow="xs" p="md" radius="md">
      <Grid gutter="md">
        {fields.map((field, index) => (
          <Grid.Col key={index} span={field.span || 6}>
            <Text fw={500} size="sm" c="dimmed">
              {field.label}
            </Text>
            <Text style={{ wordBreak: "break-word" }}>
              {field.value ?? "-"}
            </Text>
          </Grid.Col>
        ))}
      </Grid>
    </Paper>
  );
}

export default DetailCard;
