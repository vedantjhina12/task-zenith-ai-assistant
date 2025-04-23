
import React from 'react';
import { Task } from '@/types';
import { formatDate, getPriorityColor, getStatusColor, calculateDaysRemaining, getCategoryIcon } from '@/lib/taskUtils';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

interface TaskCardProps {
  task: Task;
}

const TaskCard: React.FC<TaskCardProps> = ({ task }) => {
  const daysRemaining = calculateDaysRemaining(task.dueDate);
  const isOverdue = daysRemaining < 0;
  
  return (
    <Card className="h-full transition-all duration-200 hover:shadow-md animate-fade-in">
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <div className="flex items-center space-x-1">
            <div className="text-xl">{getCategoryIcon(task.category)}</div>
            <Badge variant="outline">{task.category}</Badge>
          </div>
          <div className={`w-3 h-3 rounded-full ${getPriorityColor(task.priority)}`} />
        </div>
        <CardTitle className="text-lg font-bold line-clamp-2">{task.title}</CardTitle>
      </CardHeader>
      <CardContent className="pb-2">
        <p className="text-sm text-muted-foreground line-clamp-2 min-h-[40px]">{task.description}</p>
        <div className="mt-4">
          <div className="flex justify-between text-sm mb-1">
            <span>Progress</span>
            <span>{task.progress}%</span>
          </div>
          <Progress value={task.progress} className="h-2" />
        </div>
        <div className="flex items-center mt-4">
          <Badge className={`${getStatusColor(task.status)} text-white capitalize`}>
            {task.status}
          </Badge>
          <div className="ml-auto flex items-center">
            <Avatar className="w-6 h-6 mr-2">
              <AvatarImage src={task.assignee.avatar} />
              <AvatarFallback>{task.assignee.name.charAt(0)}</AvatarFallback>
            </Avatar>
            <span className="text-xs truncate max-w-[100px]">{task.assignee.name}</span>
          </div>
        </div>
      </CardContent>
      <CardFooter className="pt-0">
        <div className="flex justify-between w-full text-xs text-muted-foreground">
          <span>Created: {formatDate(task.createdAt)}</span>
          <span className={isOverdue ? 'text-red-500 font-semibold' : ''}>
            {isOverdue 
              ? `Overdue by ${Math.abs(daysRemaining)} day${Math.abs(daysRemaining) !== 1 ? 's' : ''}` 
              : `Due: ${formatDate(task.dueDate)}`}
          </span>
        </div>
      </CardFooter>
    </Card>
  );
};

export default TaskCard;
