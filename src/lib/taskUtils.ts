
import { Task, TaskPriority, TaskStatus, TaskCategory, User, DashboardStats } from '@/types';

// Sample users
const users: User[] = [
  { id: 'user-1', name: 'John Doe', avatar: 'https://i.pravatar.cc/150?img=1' },
  { id: 'user-2', name: 'Jane Smith', avatar: 'https://i.pravatar.cc/150?img=2' },
  { id: 'user-3', name: 'Robert Johnson', avatar: 'https://i.pravatar.cc/150?img=3' },
  { id: 'user-4', name: 'Emily Davis', avatar: 'https://i.pravatar.cc/150?img=4' },
];

// Sample tasks
export const generateSampleTasks = (count: number = 10): Task[] => {
  const tasks: Task[] = [];
  const statuses: TaskStatus[] = ['pending', 'in-progress', 'completed', 'overdue'];
  const priorities: TaskPriority[] = ['low', 'medium', 'high'];
  const categories: TaskCategory[] = ['work', 'personal', 'meeting', 'event', 'other'];
  
  const now = new Date();
  
  for (let i = 0; i < count; i++) {
    const createdAt = new Date(now);
    createdAt.setDate(now.getDate() - Math.floor(Math.random() * 30));
    
    const dueDate = new Date(createdAt);
    dueDate.setDate(createdAt.getDate() + Math.floor(Math.random() * 14) + 1);
    
    const status = statuses[Math.floor(Math.random() * statuses.length)];
    const progress = status === 'completed' ? 100 : 
                     status === 'overdue' ? Math.floor(Math.random() * 90) : 
                     status === 'in-progress' ? Math.floor(Math.random() * 80) + 10 : 
                     0;
    
    tasks.push({
      id: `task-${i + 1}`,
      title: getSampleTaskTitle(i),
      description: getSampleTaskDescription(),
      assignee: users[Math.floor(Math.random() * users.length)],
      dueDate,
      createdAt,
      status,
      priority: priorities[Math.floor(Math.random() * priorities.length)],
      category: categories[Math.floor(Math.random() * categories.length)],
      progress,
      tags: getRandomTags(),
    });
  }
  
  return tasks;
};

const getSampleTaskTitle = (index: number): string => {
  const titles = [
    "Update website design",
    "Prepare quarterly report",
    "Client meeting preparation",
    "Research new technologies",
    "Team training session",
    "Content marketing review",
    "Software bug fixes",
    "Create user documentation",
    "Social media campaign",
    "Mobile app feature implementation",
    "Review customer feedback",
    "Internal process optimization",
    "Product launch planning",
    "Security protocol update",
    "Quality assurance testing"
  ];
  
  return titles[index % titles.length];
};

const getSampleTaskDescription = (): string => {
  const descriptions = [
    "Improve user experience and update visual elements to match new brand guidelines.",
    "Analyze financial data and compile findings into a comprehensive quarterly report.",
    "Prepare presentation slides and gather necessary materials for the upcoming client meeting.",
    "Investigate emerging technologies that could enhance our current product offerings.",
    "Organize and conduct training sessions for team members on new methodologies.",
    "Review and optimize current content marketing strategies for better engagement.",
    "Identify and fix reported software bugs to improve system stability.",
    "Create comprehensive user documentation for the latest product features.",
    "Plan and execute a targeted social media campaign for product awareness.",
    "Implement new features in the mobile application based on user feedback."
  ];
  
  return descriptions[Math.floor(Math.random() * descriptions.length)];
};

const getRandomTags = (): string[] => {
  const allTags = ["urgent", "design", "development", "marketing", "finance", "hr", "meeting", "client", "internal", "backend", "frontend", "planning", "research"];
  const numberOfTags = Math.floor(Math.random() * 3) + 1;
  const selectedTags: string[] = [];
  
  for (let i = 0; i < numberOfTags; i++) {
    const randomTag = allTags[Math.floor(Math.random() * allTags.length)];
    if (!selectedTags.includes(randomTag)) {
      selectedTags.push(randomTag);
    }
  }
  
  return selectedTags;
};

export const getTasksByDate = (tasks: Task[], date: Date): Task[] => {
  const targetDate = new Date(date);
  targetDate.setHours(0, 0, 0, 0);
  
  return tasks.filter(task => {
    const taskDate = new Date(task.dueDate);
    taskDate.setHours(0, 0, 0, 0);
    return taskDate.getTime() === targetDate.getTime();
  });
};

export const calculateDashboardStats = (tasks: Task[]): DashboardStats => {
  const tasksCompleted = tasks.filter(task => task.status === 'completed').length;
  const tasksInProgress = tasks.filter(task => task.status === 'in-progress').length;
  const tasksPending = tasks.filter(task => task.status === 'pending').length;
  const tasksOverdue = tasks.filter(task => task.status === 'overdue').length;
  
  const completionRate = tasks.length > 0 
    ? Math.round((tasksCompleted / tasks.length) * 100) 
    : 0;
  
  return {
    tasksCompleted,
    tasksInProgress,
    tasksPending,
    tasksOverdue,
    completionRate
  };
};

export const getUsers = (): User[] => {
  return users;
};

export const getPriorityColor = (priority: TaskPriority): string => {
  switch (priority) {
    case 'high':
      return 'bg-red-500';
    case 'medium':
      return 'bg-yellow-500';
    case 'low':
      return 'bg-green-500';
    default:
      return 'bg-blue-500';
  }
};

export const getStatusColor = (status: TaskStatus): string => {
  switch (status) {
    case 'completed':
      return 'bg-green-500';
    case 'in-progress':
      return 'bg-blue-500';
    case 'pending':
      return 'bg-yellow-500';
    case 'overdue':
      return 'bg-red-500';
    default:
      return 'bg-gray-500';
  }
};

export const getCategoryIcon = (category: TaskCategory): string => {
  switch (category) {
    case 'work':
      return '💼';
    case 'personal':
      return '👤';
    case 'meeting':
      return '👥';
    case 'event':
      return '🎉';
    case 'other':
      return '📋';
    default:
      return '📝';
  }
};

export const formatDate = (date: Date): string => {
  return new Date(date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  });
};

export const calculateDaysRemaining = (dueDate: Date): number => {
  const now = new Date();
  const due = new Date(dueDate);
  now.setHours(0, 0, 0, 0);
  due.setHours(0, 0, 0, 0);
  
  const diffTime = due.getTime() - now.getTime();
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  
  return diffDays;
};
