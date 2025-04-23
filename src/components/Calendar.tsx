
import React, { useState } from 'react';
import { Calendar as CalendarComponent } from '@/components/ui/calendar';
import { Task } from '@/types';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { format } from 'date-fns';
import { Progress } from '@/components/ui/progress';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { getTasksByDate, getStatusColor } from '@/lib/taskUtils';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

interface CalendarViewProps {
  tasks: Task[];
}

const CalendarView: React.FC<CalendarViewProps> = ({ tasks }) => {
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [view, setView] = useState<'calendar' | 'tasks'>('calendar');
  
  const tasksForSelectedDate = getTasksByDate(tasks, selectedDate);
  
  // Function to highlight dates with tasks
  const isDayWithTask = (day: Date) => {
    return tasks.some(task => {
      const taskDate = new Date(task.dueDate);
      return (
        taskDate.getDate() === day.getDate() &&
        taskDate.getMonth() === day.getMonth() &&
        taskDate.getFullYear() === day.getFullYear()
      );
    });
  };
  
  return (
    <div className="animate-fade-in">
      <h2 className="text-2xl font-bold mb-4">Calendar</h2>
      
      <Tabs value={view} onValueChange={(v) => setView(v as 'calendar' | 'tasks')}>
        <TabsList className="mb-4">
          <TabsTrigger value="calendar">Calendar View</TabsTrigger>
          <TabsTrigger value="tasks">Tasks View</TabsTrigger>
        </TabsList>
        
        <TabsContent value="calendar" className="mt-0">
          <div className="flex flex-col lg:flex-row gap-6">
            <Card className="w-full lg:w-auto">
              <CardContent className="p-4">
                <CalendarComponent
                  mode="single"
                  selected={selectedDate}
                  onSelect={(date) => date && setSelectedDate(date)}
                  className="rounded-md border pointer-events-auto"
                  modifiers={{
                    withTask: (date) => isDayWithTask(date),
                  }}
                  modifiersStyles={{
                    withTask: { 
                      backgroundColor: 'rgba(126, 105, 171, 0.1)', 
                      fontWeight: 'bold',
                      position: 'relative',
                    }
                  }}
                />
              </CardContent>
            </Card>
            
            <div className="flex-1">
              <h3 className="text-lg font-semibold mb-3">
                Tasks for {format(selectedDate, 'MMMM d, yyyy')}
              </h3>
              
              {tasksForSelectedDate.length === 0 ? (
                <Card>
                  <CardContent className="p-6 text-center">
                    <p className="text-muted-foreground">No tasks scheduled for this date</p>
                  </CardContent>
                </Card>
              ) : (
                <div className="space-y-4">
                  {tasksForSelectedDate.map(task => (
                    <TaskRow key={task.id} task={task} />
                  ))}
                </div>
              )}
            </div>
          </div>
        </TabsContent>
        
        <TabsContent value="tasks" className="mt-0">
          <Card>
            <CardContent className="p-6">
              <h3 className="text-lg font-semibold mb-3">Upcoming Tasks</h3>
              <div className="space-y-4">
                {tasks
                  .sort((a, b) => new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime())
                  .slice(0, 10)
                  .map(task => (
                    <TaskRow key={task.id} task={task} showDate />
                  ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

interface TaskRowProps {
  task: Task;
  showDate?: boolean;
}

const TaskRow: React.FC<TaskRowProps> = ({ task, showDate = false }) => {
  return (
    <Card className="overflow-hidden transition-all duration-200 hover:shadow-md">
      <CardContent className="p-4">
        <div className="flex items-start gap-4">
          <Avatar className="mt-1">
            <AvatarImage src={task.assignee.avatar} />
            <AvatarFallback>{task.assignee.name.charAt(0)}</AvatarFallback>
          </Avatar>
          
          <div className="flex-1 min-w-0">
            <div className="flex items-center justify-between">
              <h4 className="font-medium truncate">{task.title}</h4>
              <Badge className={`${getStatusColor(task.status)} text-white capitalize`}>
                {task.status}
              </Badge>
            </div>
            
            <p className="text-sm text-muted-foreground line-clamp-1 mt-1">{task.description}</p>
            
            <div className="mt-3">
              <div className="flex justify-between text-xs mb-1">
                <span>Progress</span>
                <span>{task.progress}%</span>
              </div>
              <Progress value={task.progress} className="h-1.5" />
            </div>
            
            {showDate && (
              <div className="mt-2 text-xs text-muted-foreground">
                Due: {format(new Date(task.dueDate), 'MMM d, yyyy')}
              </div>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default CalendarView;
