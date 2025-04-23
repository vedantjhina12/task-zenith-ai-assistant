
import React from 'react';
import { Card, CardContent } from './ui/card';
import { Progress } from './ui/progress';

const Stats = ({ stats }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 animate-fade-in">
      <StatCard 
        title="Total Tasks" 
        value={stats.tasksCompleted + stats.tasksInProgress + stats.tasksPending + stats.tasksOverdue} 
        bgColor="bg-primary/10"
        textColor="text-primary"
      />
      <StatCard 
        title="In Progress" 
        value={stats.tasksInProgress} 
        bgColor="bg-blue-500/10"
        textColor="text-blue-500"
      />
      <StatCard 
        title="Completed" 
        value={stats.tasksCompleted} 
        bgColor="bg-green-500/10"
        textColor="text-green-500"
      />
      <StatCard 
        title="Overdue" 
        value={stats.tasksOverdue} 
        bgColor="bg-red-500/10"
        textColor="text-red-500"
      />
      
      <div className="col-span-1 md:col-span-2 lg:col-span-4">
        <Card className="glass-card hover-card">
          <CardContent className="p-8">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-medium">Completion Rate</h3>
              <span className="text-3xl font-bold bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
                {stats.completionRate}%
              </span>
            </div>
            <Progress value={stats.completionRate} className="h-2.5" />
            <div className="flex justify-between text-sm text-muted-foreground mt-2">
              <span>0%</span>
              <span>50%</span>
              <span>100%</span>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

const StatCard = ({ title, value, bgColor, textColor }) => {
  return (
    <Card className={`${bgColor} border-none glass-card hover-card overflow-hidden`}>
      <CardContent className="p-6">
        <h3 className="text-base font-medium text-foreground/80">{title}</h3>
        <p className={`text-3xl font-bold mt-2 ${textColor}`}>{value}</p>
      </CardContent>
    </Card>
  );
};

export default Stats;
