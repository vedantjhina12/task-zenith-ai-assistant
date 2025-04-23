
export type TaskPriority = 'low' | 'medium' | 'high';
export type TaskStatus = 'pending' | 'in-progress' | 'completed' | 'overdue';
export type TaskCategory = 'work' | 'personal' | 'meeting' | 'event' | 'other';

export interface User {
  id: string;
  name: string;
  avatar?: string;
}

export interface Task {
  id: string;
  title: string;
  description: string;
  assignee: User;
  dueDate: Date;
  createdAt: Date;
  status: TaskStatus;
  priority: TaskPriority;
  category: TaskCategory;
  progress: number; // 0-100
  tags?: string[];
}

export interface ChatMessage {
  id: string;
  content: string;
  sender: 'user' | 'ai';
  timestamp: Date;
}

export interface DashboardStats {
  tasksCompleted: number;
  tasksInProgress: number;
  tasksPending: number;
  tasksOverdue: number;
  completionRate: number;
}
