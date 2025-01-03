import { Link } from "react-router-dom";

import { store } from "../store";

import { CreateProject, Project, ProjectStats } from "../types/Project";
import { CreateUser, User } from "../types/User";
import { CreateTimeCard, TimeCard } from "../types/TimeCard";

/**
 * Formats a date string or Date object to YYYY-MM-DD format
 * @param date - ISO date string or Date object or null
 * @returns Formatted date string or '-' if date is null/invalid
 */
export const formatDate = (date: string | Date | null): string => {
  if (!date) return "-";

  try {
    return new Date(date).toISOString().split("T")[0];
  } catch (error: unknown) {
    console.error(`Failed to format date "${date}":`, error);
    return "-";
  }
};

export const formatProjectStatusValue = (value: string): string => {
  return value
    .replace(/_/g, " ")
    .toLowerCase()
    .replace(/\b\w/g, (l) => l.toUpperCase());
};

export const formatCurrency = (amount: number): string => {
  if (!amount && amount !== 0) return "-";
  if (isNaN(amount)) return "-";

  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(amount);
};

export const calculateProjectStats = (timeCards: TimeCard[]): ProjectStats => {
  return timeCards.reduce(
    (acc, timeCard) => {
      const cost = timeCard.timeSpent * timeCard.user.costPerHour;
      const revenue = timeCard.timeSpent * timeCard.user.pricePerHour;

      return {
        totalHours: acc.totalHours + timeCard.timeSpent,
        totalCost: acc.totalCost + cost,
        totalRevenue: acc.totalRevenue + revenue,
        totalProfit: acc.totalProfit + (revenue - cost),
      };
    },
    { totalHours: 0, totalCost: 0, totalRevenue: 0, totalProfit: 0 }
  );
};

export const renderLinkedCell = (
  cellText: string,
  basePath: string,
  itemId?: string | number
): React.ReactNode | string => {
  if (!itemId) return "-";

  return (
    <Link
      to={`/${basePath}/${itemId}`}
      style={{ color: "#228be6" }}
      className="linked-cell"
    >
      {cellText}
    </Link>
  );
};

export interface ApiResponse<T> {
  data?: T;
  error?: string;
  ok: boolean;
}

type HttpMethod = "GET" | "POST" | "PATCH";
type FetchOptions = {
  method?: HttpMethod;
  body?:
    | CreateProject
    | CreateUser
    | CreateTimeCard
    | Project
    | User
    | Partial<TimeCard>
    | Partial<Project>
    | Partial<User>;
};

export const fetchApi = async <T,>(
  endpoint: string,
  options: FetchOptions = {}
): Promise<T> => {
  store.isLoading = true;

  try {
    const response = await fetch(`http://localhost:3000/${endpoint}`, {
      method: options.method || "GET",
      headers: {
        "Content-Type": "application/json",
      },
      ...(options.body && { body: JSON.stringify(options.body) }),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return data as T;
  } catch (error) {
    console.error(`API call failed for ${endpoint}:`, error);
    store.error = `Failed to ${options.method || "fetch"} data`;
    throw error;
  } finally {
    store.isLoading = false;
  }
};

export const archiveHandler = <T extends { id: number | string }>(
  itemType: "Project" | "User" | "Timecard",
  archiveFunction: (id: T["id"]) => Promise<ApiResponse<T>>,
  setSelectedItem: (value: null) => void
) => {
  return (item: T) => {
    store.modal = {
      onConfirm: async () => {
        try {
          const response = await archiveFunction(item.id);

          if (response.ok) {
            setSelectedItem(null);
            store.modal = null;
            store.notification = {
              title: "Success!",
              message: `${itemType} archived successfully`,
              color: "green",
            };
          } else {
            store.notification = {
              title: "Error",
              message: response.error || `Failed to archive ${itemType}`,
              color: "red",
            };
          }
        } catch (error) {
          console.error(`Failed to archive ${itemType}:`, error);
        }
      },
    };
  };
};
