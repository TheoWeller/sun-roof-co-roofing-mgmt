import { TimeCard } from "./TimeCard";

export type User = {
  id: string;
  name: string;
  email: string;
  costPerHour: number;
  pricePerHour: number;
  timeCards?: TimeCard[];
  isArchived: boolean;
  archivedAt: Date | null;
  createdAt: Date;
  updatedAt: Date;
};

export type CreateUser = Omit<
  User,
  "id" | "timeCards" | "createdAt" | "updatedAt"
>;
