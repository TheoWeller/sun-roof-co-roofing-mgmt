import { proxy } from "valtio";
import { Project } from "../types/Project";
import { TimeCard } from "../types/TimeCard";
import { User } from "../types/User";

interface NotificationType {
  title: string;
  message: string;
  color?: string;
}

interface ModalType {
  title?: string;
  message?: string;
  confirmText?: string;
  onConfirm: () => void;
}

interface Store {
  error: string | null;
  isLoading: boolean;
  modal: ModalType | null;
  notification: NotificationType | null;
  archivedProjects: Project[];
  archivedTimeCards: TimeCard[];
  archivedUsers: User[];
  projects: Project[];
  selectedProject: Project | null;
  selectedTimeCard: TimeCard | null;
  selectedUser: User | null;
  timeCards: TimeCard[];
  users: User[];
}

export const store = proxy<Store>({
  error: null,
  isLoading: false,
  modal: null,
  notification: null,
  archivedProjects: [],
  archivedTimeCards: [],
  archivedUsers: [],
  projects: [],
  selectedProject: null,
  selectedTimeCard: null,
  selectedUser: null,
  timeCards: [],
  users: [],
});
