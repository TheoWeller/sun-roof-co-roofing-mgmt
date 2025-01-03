import { TimeCard } from "./TimeCard";

export type Project = {
  id: number;
  name: string;
  description: string | null;
  status: ProjectStatus;
  startDate: Date | null;
  completionDate: Date | null;
  timeCards: TimeCard[];
  isArchived: boolean;
  archivedAt?: Date | null;
  createdAt?: Date;
  updatedAt?: Date;
};

export type CreateProject = Omit<
  Project,
  "id" | "timeCards" | "createdAt" | "updatedAt"
>;

export enum ProjectStatus {
  LEAD = "LEAD",
  ESTIMATE = "ESTIMATE",
  PENDING = "PENDING",
  PLANNED = "PLANNED",
  IN_PROGRESS = "IN_PROGRESS",
  COMPLETED = "COMPLETED",
}

export interface ProjectStats {
  totalHours: number;
  totalCost: number;
  totalRevenue: number;
  totalProfit: number;
}
