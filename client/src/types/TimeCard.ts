import { Project } from "./Project";
import { User } from "./User";

export type TimeCard = {
  id: string;
  userId: string;
  projectId: number;
  timeSpent: number;
  date: Date;

  isArchived: boolean;
  archivedAt: Date | null;
  createdAt: Date;
  updatedAt: Date;

  // Add relation fields
  project: Project;
  user: User;
};

export type CreateTimeCard = {
  timeSpent: number;
  date: Date;
  isArchived: boolean;
  archivedAt?: Date | null;
};
