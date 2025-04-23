
import { Task, TaskPriority, TaskCategory, User, ChatMessage } from '@/types';
import { getUsers } from './taskUtils';

// Simulated AI response processing function
export const processAIQuery = (query: string): Promise<string> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      // Simple keyword matching for demo purposes
      const lowercaseQuery = query.toLowerCase();
      
      if (lowercaseQuery.includes('hello') || lowercaseQuery.includes('hi')) {
        resolve('Hello! How can I help you with your tasks today?');
      } else if (lowercaseQuery.includes('create') || lowercaseQuery.includes('add') || lowercaseQuery.includes('new task')) {
        resolve('I can help you create a new task. What should be the title of the task?');
      } else if (lowercaseQuery.includes('deadline') || lowercaseQuery.includes('due date')) {
        resolve('When would you like this task to be completed? Please specify a date.');
      } else if (lowercaseQuery.includes('assign') || lowercaseQuery.includes('who')) {
        resolve('Who would you like to assign this task to?');
      } else if (lowercaseQuery.includes('progress') || lowercaseQuery.includes('status')) {
        resolve('I can check the progress of your tasks. Currently, you have several tasks in progress with varying completion rates.');
      } else if (lowercaseQuery.includes('priority')) {
        resolve('Would you like to set this as a high, medium, or low priority task?');
      } else if (lowercaseQuery.includes('category')) {
        resolve('What category would you like to assign to this task? Options include work, personal, meeting, event, or other.');
      } else if (lowercaseQuery.includes('completed') || lowercaseQuery.includes('finished')) {
        resolve('Great job! Would you like me to mark this task as completed?');
      } else if (lowercaseQuery.includes('overdue')) {
        resolve('I notice you have some overdue tasks. Would you like me to help you reschedule them?');
      } else if (lowercaseQuery.includes('recommend') || lowercaseQuery.includes('suggest')) {
        resolve('Based on your current workload, I recommend focusing on high priority tasks first, particularly those with approaching deadlines.');
      } else if (lowercaseQuery.includes('help')) {
        resolve('I can help you create tasks, assign deadlines, track progress, and manage your schedule. Just tell me what you need!');
      } else {
        resolve('I understand you need assistance with task management. Could you provide more details about what you need help with?');
      }
    }, 1000); // Simulate AI processing time
  });
};

// Function to suggest a deadline based on task properties
export const suggestDeadline = (title: string, description: string, priority: TaskPriority): Date => {
  const today = new Date();
  let daysToAdd = 7; // Default to one week
  
  // Adjust based on priority
  if (priority === 'high') {
    daysToAdd = 3;
  } else if (priority === 'medium') {
    daysToAdd = 5;
  }
  
  // Further adjust based on title/description keywords
  const combinedText = `${title} ${description}`.toLowerCase();
  if (combinedText.includes('urgent') || combinedText.includes('asap')) {
    daysToAdd = Math.max(1, daysToAdd - 2);
  } else if (combinedText.includes('plan') || combinedText.includes('research')) {
    daysToAdd += 2;
  }
  
  const suggestedDate = new Date(today);
  suggestedDate.setDate(today.getDate() + daysToAdd);
  return suggestedDate;
};

// Function to suggest a category based on task properties
export const suggestCategory = (title: string, description: string): TaskCategory => {
  const combinedText = `${title} ${description}`.toLowerCase();
  
  if (combinedText.includes('meet') || combinedText.includes('call') || combinedText.includes('discuss')) {
    return 'meeting';
  } else if (combinedText.includes('plan') || combinedText.includes('organize') || combinedText.includes('event')) {
    return 'event';
  } else if (combinedText.includes('personal') || combinedText.includes('home') || combinedText.includes('family')) {
    return 'personal';
  } else if (combinedText.includes('project') || combinedText.includes('client') || combinedText.includes('report')) {
    return 'work';
  } else {
    return 'other';
  }
};

// Function to suggest assignee based on task properties
export const suggestAssignee = (title: string, description: string, category: TaskCategory): User => {
  const users = getUsers();
  // For demo purposes, just return a random user
  // In a real application, you would use more sophisticated logic
  return users[Math.floor(Math.random() * users.length)];
};

// Function to analyze task patterns and make recommendations
export const analyzeTaskPatterns = (tasks: Task[]): string => {
  if (tasks.length === 0) return "No tasks to analyze.";
  
  const overdueTasks = tasks.filter(task => task.status === 'overdue').length;
  const completedTasks = tasks.filter(task => task.status === 'completed').length;
  const highPriorityTasks = tasks.filter(task => task.priority === 'high').length;
  
  if (overdueTasks > tasks.length * 0.2) {
    return "I notice you have several overdue tasks. Consider rescheduling or breaking them into smaller subtasks.";
  } else if (completedTasks < tasks.length * 0.3) {
    return "Your task completion rate is below average. Focus on completing smaller tasks first to build momentum.";
  } else if (highPriorityTasks > tasks.length * 0.5) {
    return "You have many high priority tasks. Consider re-evaluating priorities to prevent burnout.";
  } else {
    return "Your task management looks good! Keep up the consistent progress.";
  }
};

// Generate chat message history for demo purposes
export const generateChatHistory = (): ChatMessage[] => {
  const now = new Date();
  
  return [
    {
      id: '1',
      content: 'Hello! I\'m your AI assistant. How can I help you with task management today?',
      sender: 'ai',
      timestamp: new Date(now.getTime() - 1000 * 60 * 5)
    },
    {
      id: '2',
      content: 'Hi! I need to create a new task for the website redesign project.',
      sender: 'user',
      timestamp: new Date(now.getTime() - 1000 * 60 * 4)
    },
    {
      id: '3',
      content: 'Sure, I can help with that. What should be the title and description of this task?',
      sender: 'ai',
      timestamp: new Date(now.getTime() - 1000 * 60 * 3)
    },
    {
      id: '4',
      content: 'Title should be "Update website homepage" and it\'s about implementing the new design we approved last week.',
      sender: 'user',
      timestamp: new Date(now.getTime() - 1000 * 60 * 2)
    },
    {
      id: '5',
      content: 'Got it. This sounds like a high priority work task. Would you like me to set a deadline for next Friday and assign it to John?',
      sender: 'ai',
      timestamp: new Date(now.getTime() - 1000 * 60 * 1)
    }
  ];
};
