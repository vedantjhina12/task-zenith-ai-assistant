
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { generateSampleTasks, calculateDashboardStats } from '@/lib/taskUtils';
import Stats from './Stats';
import TaskList from './TaskList';
import CalendarView from './Calendar';
import Chatbot from './Chatbot';
import NewTaskModal from './NewTaskModal';
import { SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar';
import Sidebar from './Sidebar';
import { analyzeTaskPatterns } from '@/lib/aiUtils';
import { useToast } from '@/hooks/use-toast';

const Dashboard = () => {
  const [tasks, setTasks] = useState(generateSampleTasks(15));
  const [activeTab, setActiveTab] = useState('dashboard');
  const [isNewTaskModalOpen, setIsNewTaskModalOpen] = useState(false);
  const { toast } = useToast();
  
  const stats = calculateDashboardStats(tasks);
  const aiRecommendation = analyzeTaskPatterns(tasks);
  
  const handleCreateTask = (newTask) => {
    setTasks(prev => [newTask, ...prev]);
    toast({
      title: "New Task Created",
      description: `"${newTask.title}" has been assigned to ${newTask.assignee.name}.`,
    });
  };

  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full bg-gradient-to-br from-secondary/50 via-background to-secondary/50">
        <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />
        
        <div className="flex-1 flex flex-col">
          <header className="bg-background/80 backdrop-blur-md z-10 border-b sticky top-0">
            <div className="container flex h-16 items-center">
              <SidebarTrigger />
              <div className="mr-4 hidden md:flex">
                <h1 className="text-2xl font-semibold bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
                  Task Zenith
                </h1>
              </div>
            </div>
          </header>
          
          <main className="flex-1 container py-8">
            {activeTab === 'dashboard' && (
              <div className="space-y-8">
                <Stats stats={stats} />
                
                <Card className="animate-fade-in glass-card hover-card">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg font-medium">AI Insights</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">{aiRecommendation}</p>
                  </CardContent>
                </Card>
                
                <Tabs defaultValue="tasks" className="space-y-6">
                  <TabsList className="bg-background/80 backdrop-blur-sm">
                    <TabsTrigger value="tasks">My Tasks</TabsTrigger>
                    <TabsTrigger value="team">Team Tasks</TabsTrigger>
                    <TabsTrigger value="analytics">Analytics</TabsTrigger>
                  </TabsList>
                  
                  <TabsContent value="tasks" className="space-y-6">
                    <TaskList tasks={tasks} onNewTask={() => setIsNewTaskModalOpen(true)} />
                  </TabsContent>
                  
                  <TabsContent value="team" className="space-y-6">
                    <TaskList 
                      tasks={tasks.filter(task => task.category === 'work' || task.category === 'meeting')} 
                      onNewTask={() => setIsNewTaskModalOpen(true)} 
                    />
                  </TabsContent>
                  
                  <TabsContent value="analytics" className="space-y-6">
                    <Card className="glass-card hover-card">
                      <CardContent className="pt-6">
                        <p className="text-center text-muted-foreground">Analytics visualization coming soon</p>
                      </CardContent>
                    </Card>
                  </TabsContent>
                </Tabs>
              </div>
            )}
            
            {activeTab === 'calendar' && (
              <CalendarView tasks={tasks} />
            )}
            
            {activeTab === 'team' && (
              <div className="space-y-8">
                <h2 className="text-2xl font-bold bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
                  Team
                </h2>
                <Card className="glass-card hover-card">
                  <CardContent className="pt-6">
                    <p className="text-center text-muted-foreground">Team management features coming soon</p>
                  </CardContent>
                </Card>
              </div>
            )}
            
            {activeTab === 'chat' && (
              <div className="h-[calc(100vh-8rem)]">
                <Chatbot />
              </div>
            )}
          </main>
        </div>
        
        <NewTaskModal 
          isOpen={isNewTaskModalOpen} 
          onClose={() => setIsNewTaskModalOpen(false)} 
          onCreateTask={handleCreateTask}
        />
      </div>
    </SidebarProvider>
  );
};

export default Dashboard;
