import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Users, Calendar, ClipboardList, BarChart3, ArrowLeft, Shield, Download, Trash2, Loader2 } from 'lucide-react';
import { Alert, AlertDescription } from '@/components/ui/alert';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { supabase } from '@/integrations/supabase/client';
import EmployeeManagement from '@/components/workforce/EmployeeManagement';
import ScheduleManagement from '@/components/workforce/ScheduleManagement';
import TaskManagement from '@/components/workforce/TaskManagement';
import Analytics from '@/components/workforce/Analytics';

const Dashboard = () => {
  const navigate = useNavigate();

  const [exportLoading, setExportLoading] = useState(false);
  const [deleteLoading, setDeleteLoading] = useState(false);
  const [privacyMessage, setPrivacyMessage] = useState('');

  const handleBackToHome = () => {
    navigate('/');
  };

  const handleExportData = async () => {
    setExportLoading(true);
    setPrivacyMessage('');
    try {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) return;

      const tables = ['clients', 'proposals', 'proposal_items', 'projects', 'project_tasks', 'products', 'service_orders', 'service_order_checklist', 'user_consents'] as const;
      const exportData: Record<string, unknown> = { exported_at: new Date().toISOString(), email: session.user.email };

      for (const table of tables) {
        const { data } = await supabase.from(table).select('*');
        exportData[table] = data || [];
      }

      const blob = new Blob([JSON.stringify(exportData, null, 2)], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `my-data-export-${new Date().toISOString().split('T')[0]}.json`;
      a.click();
      URL.revokeObjectURL(url);
      setPrivacyMessage('Your data has been exported successfully.');
    } catch {
      setPrivacyMessage('Failed to export data. Please try again.');
    } finally {
      setExportLoading(false);
    }
  };

  const handleDeleteAccount = async () => {
    setDeleteLoading(true);
    setPrivacyMessage('');
    try {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) return;

      const { error } = await supabase.functions.invoke('delete-account', {
        headers: { Authorization: `Bearer ${session.access_token}` },
      });

      if (error) throw error;

      await supabase.auth.signOut();
      navigate('/');
    } catch {
      setPrivacyMessage('Failed to delete account. Please try again.');
      setDeleteLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-card">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-foreground">Workforce Management Platform</h1>
          <div className="flex items-center space-x-4">
            <Button variant="outline" size="sm" onClick={handleBackToHome}>
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Home
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3 md:grid-cols-6">
            <TabsTrigger value="overview" className="flex items-center space-x-2">
              <BarChart3 className="h-4 w-4" />
              <span className="hidden sm:inline">Overview</span>
            </TabsTrigger>
            <TabsTrigger value="employees" className="flex items-center space-x-2">
              <Users className="h-4 w-4" />
              <span className="hidden sm:inline">Employees</span>
            </TabsTrigger>
            <TabsTrigger value="schedule" className="flex items-center space-x-2">
              <Calendar className="h-4 w-4" />
              <span className="hidden sm:inline">Schedule</span>
            </TabsTrigger>
            <TabsTrigger value="tasks" className="flex items-center space-x-2">
              <ClipboardList className="h-4 w-4" />
              <span className="hidden sm:inline">Tasks</span>
            </TabsTrigger>
            <TabsTrigger value="analytics" className="flex items-center space-x-2">
              <BarChart3 className="h-4 w-4" />
              <span className="hidden sm:inline">Analytics</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="overview">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Total Employees</CardTitle>
                  <Users className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">24</div>
                  <p className="text-xs text-muted-foreground">
                    <span className="text-green-500">+2</span> this month
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Active Projects</CardTitle>
                  <ClipboardList className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">18</div>
                  <p className="text-xs text-muted-foreground">
                    <span className="text-blue-500">6 completing</span> this week
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Today's Revenue</CardTitle>
                  <BarChart3 className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">$12,850</div>
                  <p className="text-xs text-muted-foreground">
                    <span className="text-green-500">+18%</span> vs yesterday
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Customer Satisfaction</CardTitle>
                  <Calendar className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">4.8</div>
                  <p className="text-xs text-muted-foreground">
                    <span className="text-green-500">+0.2</span> this month
                  </p>
                </CardContent>
              </Card>
            </div>

            {/* Recent Activity & Quick Stats */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
              <Card>
                <CardHeader>
                  <CardTitle>Recent Activity</CardTitle>
                  <CardDescription>Latest updates from your team</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-start space-x-4">
                      <div className="w-2 h-2 bg-green-500 rounded-full mt-2"></div>
                      <div className="flex-1">
                        <p className="text-sm font-medium">Smart Home Installation Completed</p>
                        <p className="text-xs text-muted-foreground">Mike Thompson completed the Johnson residence project</p>
                        <p className="text-xs text-muted-foreground">2 hours ago</p>
                      </div>
                    </div>
                    <div className="flex items-start space-x-4">
                      <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
                      <div className="flex-1">
                        <p className="text-sm font-medium">New Commercial Project Assigned</p>
                        <p className="text-xs text-muted-foreground">Office building automation for TechCorp downtown</p>
                        <p className="text-xs text-muted-foreground">4 hours ago</p>
                      </div>
                    </div>
                    <div className="flex items-start space-x-4">
                      <div className="w-2 h-2 bg-yellow-500 rounded-full mt-2"></div>
                      <div className="flex-1">
                        <p className="text-sm font-medium">Equipment Maintenance Due</p>
                        <p className="text-xs text-muted-foreground">Van #3 requires scheduled maintenance</p>
                        <p className="text-xs text-muted-foreground">6 hours ago</p>
                      </div>
                    </div>
                    <div className="flex items-start space-x-4">
                      <div className="w-2 h-2 bg-purple-500 rounded-full mt-2"></div>
                      <div className="flex-1">
                        <p className="text-sm font-medium">Training Completed</p>
                        <p className="text-xs text-muted-foreground">3 technicians completed security system certification</p>
                        <p className="text-xs text-muted-foreground">1 day ago</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>This Week Overview</CardTitle>
                  <CardDescription>Key metrics and progress</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center p-3 bg-muted/30 rounded-lg">
                      <div>
                        <p className="text-sm font-medium">Projects Completed</p>
                        <p className="text-2xl font-bold">7</p>
                      </div>
                      <div className="text-green-500 text-sm">+40%</div>
                    </div>
                    <div className="flex justify-between items-center p-3 bg-muted/30 rounded-lg">
                      <div>
                        <p className="text-sm font-medium">Billable Hours</p>
                        <p className="text-2xl font-bold">312</p>
                      </div>
                      <div className="text-blue-500 text-sm">+8%</div>
                    </div>
                    <div className="flex justify-between items-center p-3 bg-muted/30 rounded-lg">
                      <div>
                        <p className="text-sm font-medium">Revenue Generated</p>
                        <p className="text-2xl font-bold">$58,400</p>
                      </div>
                      <div className="text-green-500 text-sm">+15%</div>
                    </div>
                    <div className="flex justify-between items-center p-3 bg-muted/30 rounded-lg">
                      <div>
                        <p className="text-sm font-medium">Client Satisfaction</p>
                        <p className="text-2xl font-bold">4.9/5</p>
                      </div>
                      <div className="text-green-500 text-sm">+0.1</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Quick Actions */}
            <div className="mt-6">
              <Card>
                <CardHeader>
                  <CardTitle>Quick Actions</CardTitle>
                  <CardDescription>Common tasks and shortcuts</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                    <Button variant="outline" className="h-20 flex-col space-y-2">
                      <Users className="h-6 w-6" />
                      <span>Add Employee</span>
                    </Button>
                    <Button variant="outline" className="h-20 flex-col space-y-2">
                      <ClipboardList className="h-6 w-6" />
                      <span>New Project</span>
                    </Button>
                    <Button variant="outline" className="h-20 flex-col space-y-2">
                      <Calendar className="h-6 w-6" />
                      <span>Schedule Job</span>
                    </Button>
                    <Button variant="outline" className="h-20 flex-col space-y-2">
                      <BarChart3 className="h-6 w-6" />
                      <span>View Reports</span>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="employees">
            <EmployeeManagement />
          </TabsContent>

          <TabsContent value="schedule">
            <ScheduleManagement />
          </TabsContent>

          <TabsContent value="tasks">
            <TaskManagement />
          </TabsContent>

          <TabsContent value="analytics">
            <Analytics />
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
};

export default Dashboard;