
import React, { useState } from 'react';
import { Task, TaskStatus } from '@/types';
import TaskCard from './TaskCard';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { PlusIcon, Search } from 'lucide-react';

interface TaskListProps {
  tasks: Task[];
  onNewTask: () => void;
}

const TaskList: React.FC<TaskListProps> = ({ tasks, onNewTask }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<TaskStatus | 'all'>('all');
  
  const filteredTasks = tasks.filter(task => {
    const matchesSearch = 
      task.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      task.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      task.assignee.name.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesStatus = statusFilter === 'all' || task.status === statusFilter;
    
    return matchesSearch && matchesStatus;
  });
  
  return (
    <div className="animate-fade-in">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4 gap-4">
        <h2 className="text-2xl font-bold">Tasks</h2>
        <div className="flex flex-col sm:flex-row gap-2 w-full sm:w-auto">
          <div className="relative w-full sm:w-60">
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search tasks..."
              className="pl-8"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <Button onClick={onNewTask} className="gap-1.5">
            <PlusIcon className="h-4 w-4" />
            New Task
          </Button>
        </div>
      </div>
      
      <Tabs defaultValue="all" onValueChange={(value) => setStatusFilter(value as TaskStatus | 'all')}>
        <TabsList className="mb-4">
          <TabsTrigger value="all">All</TabsTrigger>
          <TabsTrigger value="pending">Pending</TabsTrigger>
          <TabsTrigger value="in-progress">In Progress</TabsTrigger>
          <TabsTrigger value="completed">Completed</TabsTrigger>
          <TabsTrigger value="overdue">Overdue</TabsTrigger>
        </TabsList>
        
        <TabsContent value="all" className="mt-0">
          <TaskGrid tasks={filteredTasks} />
        </TabsContent>
        
        <TabsContent value="pending" className="mt-0">
          <TaskGrid tasks={filteredTasks} />
        </TabsContent>
        
        <TabsContent value="in-progress" className="mt-0">
          <TaskGrid tasks={filteredTasks} />
        </TabsContent>
        
        <TabsContent value="completed" className="mt-0">
          <TaskGrid tasks={filteredTasks} />
        </TabsContent>
        
        <TabsContent value="overdue" className="mt-0">
          <TaskGrid tasks={filteredTasks} />
        </TabsContent>
      </Tabs>
    </div>
  );
};

interface TaskGridProps {
  tasks: Task[];
}

const TaskGrid: React.FC<TaskGridProps> = ({ tasks }) => {
  if (tasks.length === 0) {
    return (
      <div className="text-center p-8 border rounded-lg bg-muted/20">
        <p className="text-muted-foreground">No tasks found</p>
      </div>
    );
  }
  
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
      {tasks.map(task => (
        <TaskCard key={task.id} task={task} />
      ))}
    </div>
  );
};

export default TaskList;
