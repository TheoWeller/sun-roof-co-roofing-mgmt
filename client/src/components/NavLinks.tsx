import { Link as RouterLink } from "react-router-dom";
import { UnstyledButton, Group, Text, Stack } from "@mantine/core";
import { useHover } from "@mantine/hooks";
import {
  IconHome,
  IconUsers,
  IconCalendar,
  IconBuildings,
} from "@tabler/icons-react";

interface LinkProps {
  color: string;
  label: string;
  to: string;
  icon: React.ReactNode;
}

function Link({ label, to, icon }: LinkProps) {
  const { hovered, ref } = useHover();

  return (
    <UnstyledButton
      component={RouterLink}
      to={to}
      w="100%"
      p="xs"
      ref={ref}
      style={(theme) => ({
        borderRadius: theme.radius.sm,
        transition: "all 0.2s ease",
        transform: hovered ? "translateX(4px)" : "none",
        backgroundColor: hovered ? theme.colors.gray[1] : "transparent",
        boxShadow: hovered ? theme.shadows.xs : "none",
      })}
    >
      <Group>
        {icon}
        <Text size="sm">{label}</Text>
      </Group>
    </UnstyledButton>
  );
}

const data = [
  { color: "blue", label: "Home", to: "/", icon: <IconHome size="1.2rem" /> },
  {
    color: "blue",
    label: "Projects",
    to: "/projects",
    icon: <IconBuildings size="1.2rem" />,
  },
  {
    color: "blue",
    label: "Users",
    to: "/users",
    icon: <IconUsers size="1.2rem" />,
  },
  {
    color: "blue",
    label: "Time Cards",
    to: "/time-cards",
    icon: <IconCalendar size="1.2rem" />,
  },
];

export function NavLinks() {
  const links = data.map((link) => <Link {...link} key={link.label} />);
  return <Stack gap="xs">{links}</Stack>;
}
