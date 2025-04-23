
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { format } from 'date-fns';
import { TaskPriority, TaskCategory, User } from '@/types';
import { getUsers, formatDate } from '@/lib/taskUtils';
import { suggestDeadline, suggestCategory } from '@/lib/aiUtils';
import { CalendarIcon } from 'lucide-react';
import { cn } from '@/lib/utils';

interface NewTaskModalProps {
  isOpen: boolean;
  onClose: () => void;
  onCreateTask: (task: any) => void;
}

const NewTaskModal: React.FC<NewTaskModalProps> = ({ isOpen, onClose, onCreateTask }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [priority, setPriority] = useState<TaskPriority>('medium');
  const [category, setCategory] = useState<TaskCategory>('work');
  const [dueDate, setDueDate] = useState<Date>(new Date());
  const [assignee, setAssignee] = useState<string>(getUsers()[0].id);
  const [isLoading, setIsLoading] = useState(false);
  
  const users = getUsers();
  
  const handleSubmit = () => {
    setIsLoading(true);
    
    // Simulate AI processing
    setTimeout(() => {
      const selectedAssignee = users.find(user => user.id === assignee) || users[0];
      
      onCreateTask({
        id: `task-${Date.now()}`,
        title,
        description,
        priority,
        category,
        dueDate,
        assignee: selectedAssignee,
        status: 'pending',
        progress: 0,
        createdAt: new Date()
      });
      
      // Reset form
      setTitle('');
      setDescription('');
      setPriority('medium');
      setCategory('work');
      setDueDate(new Date());
      setAssignee(users[0].id);
      setIsLoading(false);
      onClose();
    }, 1000);
  };
  
  const handleSuggestDeadline = () => {
    const suggested = suggestDeadline(title, description, priority);
    setDueDate(suggested);
  };
  
  const handleSuggestCategory = () => {
    const suggested = suggestCategory(title, description);
    setCategory(suggested);
  };
  
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Create New Task</DialogTitle>
          <DialogDescription>
            Fill in the details below to create a new task. Our AI will help suggest appropriate deadlines and categories.
          </DialogDescription>
        </DialogHeader>
        
        <div className="grid gap-4 py-4">
          <div>
            <Label htmlFor="title">Task Title</Label>
            <Input
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Enter task title"
              className="mt-1"
            />
          </div>
          
          <div>
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Describe the task in detail"
              className="mt-1 resize-none"
              rows={3}
            />
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="priority">Priority</Label>
              <Select
                value={priority}
                onValueChange={(value) => setPriority(value as TaskPriority)}
              >
                <SelectTrigger className="mt-1">
                  <SelectValue placeholder="Select priority" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="low">Low</SelectItem>
                  <SelectItem value="medium">Medium</SelectItem>
                  <SelectItem value="high">High</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div>
              <div className="flex justify-between">
                <Label htmlFor="category">Category</Label>
                {title && (
                  <Button 
                    variant="link" 
                    className="text-xs p-0 h-auto" 
                    onClick={handleSuggestCategory}
                  >
                    Suggest
                  </Button>
                )}
              </div>
              <Select
                value={category}
                onValueChange={(value) => setCategory(value as TaskCategory)}
              >
                <SelectTrigger className="mt-1">
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="work">Work</SelectItem>
                  <SelectItem value="personal">Personal</SelectItem>
                  <SelectItem value="meeting">Meeting</SelectItem>
                  <SelectItem value="event">Event</SelectItem>
                  <SelectItem value="other">Other</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div>
              <div className="flex justify-between">
                <Label>Due Date</Label>
                {title && (
                  <Button 
                    variant="link" 
                    className="text-xs p-0 h-auto" 
                    onClick={handleSuggestDeadline}
                  >
                    Suggest
                  </Button>
                )}
              </div>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className={cn(
                      "w-full mt-1 justify-start text-left font-normal",
                      !dueDate && "text-muted-foreground"
                    )}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {dueDate ? format(dueDate, "PPP") : <span>Pick a date</span>}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={dueDate}
                    onSelect={(date) => date && setDueDate(date)}
                    initialFocus
                    className="pointer-events-auto"
                  />
                </PopoverContent>
              </Popover>
            </div>
            
            <div>
              <Label htmlFor="assignee">Assignee</Label>
              <Select
                value={assignee}
                onValueChange={setAssignee}
              >
                <SelectTrigger className="mt-1">
                  <SelectValue placeholder="Select assignee" />
                </SelectTrigger>
                <SelectContent>
                  {users.map(user => (
                    <SelectItem key={user.id} value={user.id}>
                      {user.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>
        
        <DialogFooter>
          <Button variant="outline" onClick={onClose}>Cancel</Button>
          <Button onClick={handleSubmit} disabled={!title || isLoading}>
            {isLoading ? 'Creating...' : 'Create Task'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default NewTaskModal;
