
import React from 'react';
import { DashboardStats } from '@/types';
import { Card, CardContent } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';

interface StatsProps {
  stats: DashboardStats;
}

const Stats: React.FC<StatsProps> = ({ stats }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 animate-fade-in">
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
        <Card>
          <CardContent className="p-6">
            <div className="flex justify-between items-center mb-2">
              <h3 className="text-lg font-medium">Completion Rate</h3>
              <span className="text-2xl font-bold">{stats.completionRate}%</span>
            </div>
            <Progress value={stats.completionRate} className="h-2" />
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

interface StatCardProps {
  title: string;
  value: number;
  bgColor: string;
  textColor: string;
}

const StatCard: React.FC<StatCardProps> = ({ title, value, bgColor, textColor }) => {
  return (
    <Card className={`${bgColor} border-none`}>
      <CardContent className="p-6">
        <h3 className="text-lg font-medium">{title}</h3>
        <p className={`text-3xl font-bold ${textColor}`}>{value}</p>
      </CardContent>
    </Card>
  );
};

export default Stats;
