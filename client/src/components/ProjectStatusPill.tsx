import { Badge } from "@mantine/core";
import { ProjectStatus } from "../types/Project";
import { formatProjectStatusValue } from "../utils";

const STATUS_COLORS: Record<ProjectStatus, string> = {
  [ProjectStatus.LEAD]: "blue",
  [ProjectStatus.ESTIMATE]: "violet",
  [ProjectStatus.PENDING]: "yellow",
  [ProjectStatus.PLANNED]: "cyan",
  [ProjectStatus.IN_PROGRESS]: "lime",
  [ProjectStatus.COMPLETED]: "pink",
};

interface ProjectStatusPillProps {
  status: ProjectStatus;
}

function ProjectStatusPill({ status }: ProjectStatusPillProps) {
  return (
    <Badge color={STATUS_COLORS[status]}>
      {formatProjectStatusValue(status)}
    </Badge>
  );
}

export default ProjectStatusPill;
