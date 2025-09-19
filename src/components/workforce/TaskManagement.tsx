import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Progress } from '@/components/ui/progress';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Plus, FolderOpen, CheckCircle, Clock, AlertCircle, User, Calendar, DollarSign, Target, Wrench, Star, FileText, TrendingUp } from 'lucide-react';

interface Project {
  id: string;
  name: string;
  client_name: string;
  description: string;
  status: 'planning' | 'in_progress' | 'on_hold' | 'completed' | 'cancelled';
  priority: 'low' | 'medium' | 'high' | 'urgent';
  start_date: string;
  end_date: string;
  budget: number;
  spent_amount: number;
  manager_id: string;
  manager_name: string;
  progress: number;
  team_members: string[];
  project_type: string;
  location: string;
}

interface Task {
  id: string;
  project_id: string;
  title: string;
  description: string;
  status: 'pending' | 'in_progress' | 'completed' | 'on_hold';
  priority: 'low' | 'medium' | 'high' | 'urgent';
  assigned_to: string;
  assigned_name: string;
  estimated_hours: number;
  actual_hours: number;
  due_date: string;
  created_date: string;
  dependencies: string[];
  task_type: string;
  equipment_needed: string[];
}

// Mock data for automation integration projects
const mockProjects: Project[] = [
  {
    id: '1',
    name: 'TechCorp Smart Building Integration',
    client_name: 'TechCorp Industries',
    description: 'Complete building automation system including HVAC, lighting, security, and energy management for 15-story office building',
    status: 'in_progress',
    priority: 'high',
    start_date: '2024-01-15',
    end_date: '2024-04-30',
    budget: 285000,
    spent_amount: 142500,
    manager_id: 'AIT-004',
    manager_name: 'Jessica Park',
    progress: 65,
    team_members: ['AIT-002', 'AIT-003', 'AIT-005'],
    project_type: 'Commercial Building Automation',
    location: '5678 Business Plaza, Downtown'
  },
  {
    id: '2',
    name: 'Luxury Residence Smart Home',
    client_name: 'Johnson Family',
    description: 'Premium smart home installation including integrated audio/video, lighting control, climate management, and security systems',
    status: 'in_progress',
    priority: 'medium',
    start_date: '2024-02-01',
    end_date: '2024-03-15',
    budget: 75000,
    spent_amount: 35000,
    manager_id: 'AIT-001',
    manager_name: 'Michael Thompson',
    progress: 45,
    team_members: ['AIT-001', 'AIT-007'],
    project_type: 'Residential Smart Home',
    location: '1234 Maple Street, Suburbs'
  },
  {
    id: '3',
    name: 'Metro Logistics Security Upgrade',
    client_name: 'Metro Logistics',
    description: 'Comprehensive security system upgrade with IP cameras, access control, and perimeter monitoring for warehouse facility',
    status: 'planning',
    priority: 'high',
    start_date: '2024-03-01',
    end_date: '2024-04-15',
    budget: 125000,
    spent_amount: 0,
    manager_id: 'AIT-003',
    manager_name: 'David Rodriguez',
    progress: 15,
    team_members: ['AIT-003'],
    project_type: 'Security System Installation',
    location: '9012 Industrial Drive, Warehouse District'
  },
  {
    id: '4',
    name: 'Healthcare Center Automation',
    client_name: 'Riverside Medical Center',
    description: 'Medical facility automation including nurse call systems, access control, HVAC integration, and emergency systems',
    status: 'completed',
    priority: 'urgent',
    start_date: '2023-11-01',
    end_date: '2024-01-31',
    budget: 350000,
    spent_amount: 340000,
    manager_id: 'AIT-004',
    manager_name: 'Jessica Park',
    progress: 100,
    team_members: ['AIT-002', 'AIT-003', 'AIT-005', 'AIT-006'],
    project_type: 'Healthcare Facility Automation',
    location: '4567 Medical Drive, Healthcare District'
  },
  {
    id: '5',
    name: 'Multi-Family Smart Living',
    client_name: 'Sunrise Apartments',
    description: 'Smart apartment complex with individual unit controls, building-wide automation, and resident mobile app integration',
    status: 'planning',
    priority: 'medium',
    start_date: '2024-04-01',
    end_date: '2024-08-30',
    budget: 420000,
    spent_amount: 15000,
    manager_id: 'AIT-001',
    manager_name: 'Michael Thompson',
    progress: 5,
    team_members: ['AIT-001', 'AIT-005', 'AIT-007'],
    project_type: 'Multi-Family Residential',
    location: '7890 Pine Street, Residential Complex'
  }
];

const mockTasks: Task[] = [
  {
    id: '1',
    project_id: '1',
    title: 'Install BACnet Controllers',
    description: 'Install and configure BACnet controllers for HVAC system integration on floors 1-5',
    status: 'in_progress',
    priority: 'high',
    assigned_to: 'AIT-002',
    assigned_name: 'Sarah Chen',
    estimated_hours: 24,
    actual_hours: 16,
    due_date: '2024-03-15',
    created_date: '2024-02-01',
    dependencies: [],
    task_type: 'HVAC Integration',
    equipment_needed: ['BACnet Controllers', 'Network Cables', 'Laptop']
  },
  {
    id: '2',
    project_id: '1',
    title: 'Configure Access Control System',
    description: 'Set up card readers and configure access permissions for all entry points',
    status: 'pending',
    priority: 'medium',
    assigned_to: 'AIT-003',
    assigned_name: 'David Rodriguez',
    estimated_hours: 16,
    actual_hours: 0,
    due_date: '2024-03-20',
    created_date: '2024-02-01',
    dependencies: ['1'],
    task_type: 'Security System',
    equipment_needed: ['Card Readers', 'Access Control Panel', 'Security Cables']
  },
  {
    id: '3',
    project_id: '1',
    title: 'Network Infrastructure Setup',
    description: 'Install fiber optic backbone and network switches for building automation systems',
    status: 'completed',
    priority: 'high',
    assigned_to: 'AIT-005',
    assigned_name: 'Alex Johnson',
    estimated_hours: 32,
    actual_hours: 35,
    due_date: '2024-02-28',
    created_date: '2024-01-15',
    dependencies: [],
    task_type: 'Network Installation',
    equipment_needed: ['Fiber Optic Cables', 'Network Switches', 'Patch Panels']
  },
  {
    id: '4',
    project_id: '2',
    title: 'Smart Lighting Installation',
    description: 'Install Lutron lighting control system throughout the residence',
    status: 'in_progress',
    priority: 'medium',
    assigned_to: 'AIT-001',
    assigned_name: 'Michael Thompson',
    estimated_hours: 20,
    actual_hours: 12,
    due_date: '2024-03-10',
    created_date: '2024-02-01',
    dependencies: [],
    task_type: 'Lighting Control',
    equipment_needed: ['Lutron Switches', 'Dimmer Modules', 'Control Processor']
  },
  {
    id: '5',
    project_id: '2',
    title: 'Home Theater Setup',
    description: 'Install and calibrate 7.2 surround sound system with 4K projector',
    status: 'pending',
    priority: 'low',
    assigned_to: 'AIT-007',
    assigned_name: 'Robert Williams',
    estimated_hours: 16,
    actual_hours: 0,
    due_date: '2024-03-12',
    created_date: '2024-02-01',
    dependencies: ['4'],
    task_type: 'Audio/Video',
    equipment_needed: ['Speakers', 'Amplifiers', '4K Projector', 'AV Receiver']
  },
  {
    id: '6',
    project_id: '3',
    title: 'Security Assessment',
    description: 'Conduct thorough security assessment and create installation plan',
    status: 'completed',
    priority: 'high',
    assigned_to: 'AIT-003',
    assigned_name: 'David Rodriguez',
    estimated_hours: 8,
    actual_hours: 8,
    due_date: '2024-02-28',
    created_date: '2024-02-15',
    dependencies: [],
    task_type: 'Planning',
    equipment_needed: ['Site Survey Tools', 'Measuring Equipment']
  },
  {
    id: '7',
    project_id: '3',
    title: 'IP Camera Installation',
    description: 'Install 32 IP cameras throughout warehouse facility with night vision capability',
    status: 'pending',
    priority: 'high',
    assigned_to: 'AIT-003',
    assigned_name: 'David Rodriguez',
    estimated_hours: 40,
    actual_hours: 0,
    due_date: '2024-03-25',
    created_date: '2024-02-15',
    dependencies: ['6'],
    task_type: 'Security Camera',
    equipment_needed: ['IP Cameras', 'Mounting Hardware', 'Network Cables', 'NVR System']
  }
];

const TaskManagement = () => {
  const [projects, setProjects] = useState<Project[]>(mockProjects);
  const [tasks, setTasks] = useState<Task[]>(mockTasks);
  const [isNewProjectOpen, setIsNewProjectOpen] = useState(false);
  const [isNewTaskOpen, setIsNewTaskOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  const getStatusBadge = (status: string, type: 'project' | 'task' = 'task') => {
    const variants = {
      planning: 'secondary',
      pending: 'secondary',
      in_progress: 'default',
      on_hold: 'outline',
      completed: 'default',
      cancelled: 'destructive'
    } as const;

    const colors = {
      planning: 'text-blue-600',
      pending: 'text-yellow-600',
      in_progress: 'text-green-600',
      on_hold: 'text-orange-600',
      completed: 'text-green-700',
      cancelled: 'text-red-600'
    } as const;

    return (
      <Badge variant={variants[status as keyof typeof variants]} className={colors[status as keyof typeof colors]}>
        {status.replace('_', ' ')}
      </Badge>
    );
  };

  const getPriorityBadge = (priority: string) => {
    const variants = {
      low: 'secondary',
      medium: 'outline',
      high: 'default',
      urgent: 'destructive'
    } as const;

    return <Badge variant={variants[priority as keyof typeof variants]}>{priority}</Badge>;
  };

  const getTasksForProject = (projectId: string) => {
    return tasks.filter(task => task.project_id === projectId);
  };

  const getProjectProgress = (projectId: string) => {
    const projectTasks = getTasksForProject(projectId);
    if (projectTasks.length === 0) return 0;
    const completedTasks = projectTasks.filter(task => task.status === 'completed').length;
    return Math.round((completedTasks / projectTasks.length) * 100);
  };

  const getInitials = (name: string) => {
    return name.split(' ').map(n => n.charAt(0)).join('').toUpperCase();
  };

  // Dashboard statistics
  const totalProjects = projects.length;
  const activeProjects = projects.filter(p => p.status === 'in_progress').length;
  const completedProjects = projects.filter(p => p.status === 'completed').length;
  const totalTasks = tasks.length;
  const pendingTasks = tasks.filter(t => t.status === 'pending').length;
  const inProgressTasks = tasks.filter(t => t.status === 'in_progress').length;
  const completedTasks = tasks.filter(t => t.status === 'completed').length;
  const overdueTasks = tasks.filter(t => new Date(t.due_date) < new Date() && t.status !== 'completed').length;

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <div className="flex justify-between items-center">
            <div>
              <CardTitle>Project & Task Management</CardTitle>
              <CardDescription>
                Manage automation integration projects, tasks, and team assignments
              </CardDescription>
            </div>
            <div className="space-x-2">
              <Dialog open={isNewTaskOpen} onOpenChange={setIsNewTaskOpen}>
                <DialogTrigger asChild>
                  <Button variant="outline">
                    <Plus className="h-4 w-4 mr-2" />
                    New Task
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-md">
                  <DialogHeader>
                    <DialogTitle>Create New Task</DialogTitle>
                    <DialogDescription>Add a new task to an existing project</DialogDescription>
                  </DialogHeader>
                  <form className="space-y-4">
                    <div className="space-y-2">
                      <Label>Project</Label>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="Select project" />
                        </SelectTrigger>
                        <SelectContent>
                          {projects.filter(p => p.status !== 'completed').map(project => (
                            <SelectItem key={project.id} value={project.id}>{project.name}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label>Task Title</Label>
                      <Input placeholder="Task name" />
                    </div>
                    <div className="space-y-2">
                      <Label>Description</Label>
                      <Textarea placeholder="Task details and requirements" rows={3} />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label>Assigned To</Label>
                        <Select>
                          <SelectTrigger>
                            <SelectValue placeholder="Select technician" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="AIT-001">Michael Thompson</SelectItem>
                            <SelectItem value="AIT-002">Sarah Chen</SelectItem>
                            <SelectItem value="AIT-003">David Rodriguez</SelectItem>
                            <SelectItem value="AIT-005">Alex Johnson</SelectItem>
                            <SelectItem value="AIT-007">Robert Williams</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="space-y-2">
                        <Label>Priority</Label>
                        <Select>
                          <SelectTrigger>
                            <SelectValue placeholder="Priority" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="low">Low</SelectItem>
                            <SelectItem value="medium">Medium</SelectItem>
                            <SelectItem value="high">High</SelectItem>
                            <SelectItem value="urgent">Urgent</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label>Due Date</Label>
                        <Input type="date" />
                      </div>
                      <div className="space-y-2">
                        <Label>Estimated Hours</Label>
                        <Input type="number" placeholder="8" />
                      </div>
                    </div>
                    <Button type="submit" className="w-full">Create Task</Button>
                  </form>
                </DialogContent>
              </Dialog>
              <Dialog open={isNewProjectOpen} onOpenChange={setIsNewProjectOpen}>
                <DialogTrigger asChild>
                  <Button>
                    <Plus className="h-4 w-4 mr-2" />
                    New Project
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-lg">
                  <DialogHeader>
                    <DialogTitle>Create New Project</DialogTitle>
                    <DialogDescription>Start a new automation integration project</DialogDescription>
                  </DialogHeader>
                  <form className="space-y-4">
                    <div className="space-y-2">
                      <Label>Project Name</Label>
                      <Input placeholder="Project title" />
                    </div>
                    <div className="space-y-2">
                      <Label>Client Name</Label>
                      <Input placeholder="Client or company name" />
                    </div>
                    <div className="space-y-2">
                      <Label>Project Type</Label>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="Select type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="residential">Residential Smart Home</SelectItem>
                          <SelectItem value="commercial">Commercial Building Automation</SelectItem>
                          <SelectItem value="security">Security System Installation</SelectItem>
                          <SelectItem value="healthcare">Healthcare Facility Automation</SelectItem>
                          <SelectItem value="multifamily">Multi-Family Residential</SelectItem>
                          <SelectItem value="industrial">Industrial Automation</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label>Description</Label>
                      <Textarea placeholder="Project scope and requirements" rows={3} />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label>Start Date</Label>
                        <Input type="date" />
                      </div>
                      <div className="space-y-2">
                        <Label>End Date</Label>
                        <Input type="date" />
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label>Budget ($)</Label>
                        <Input type="number" placeholder="50000" />
                      </div>
                      <div className="space-y-2">
                        <Label>Project Manager</Label>
                        <Select>
                          <SelectTrigger>
                            <SelectValue placeholder="Select manager" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="AIT-004">Jessica Park</SelectItem>
                            <SelectItem value="AIT-001">Michael Thompson</SelectItem>
                            <SelectItem value="AIT-003">David Rodriguez</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label>Location</Label>
                      <Input placeholder="Project location address" />
                    </div>
                    <Button type="submit" className="w-full">Create Project</Button>
                  </form>
                </DialogContent>
              </Dialog>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="overview" className="space-y-4">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="projects">Projects</TabsTrigger>
              <TabsTrigger value="tasks">All Tasks</TabsTrigger>
              <TabsTrigger value="calendar">Timeline View</TabsTrigger>
            </TabsList>

            <TabsContent value="overview" className="space-y-4">
              {/* Project Statistics */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <Card>
                  <CardContent className="p-4">
                    <div className="flex items-center space-x-2">
                      <FolderOpen className="h-5 w-5 text-blue-500" />
                      <div>
                        <p className="text-sm text-muted-foreground">Total Projects</p>
                        <p className="text-2xl font-bold">{totalProjects}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-4">
                    <div className="flex items-center space-x-2">
                      <TrendingUp className="h-5 w-5 text-green-500" />
                      <div>
                        <p className="text-sm text-muted-foreground">Active Projects</p>
                        <p className="text-2xl font-bold">{activeProjects}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-4">
                    <div className="flex items-center space-x-2">
                      <CheckCircle className="h-5 w-5 text-green-600" />
                      <div>
                        <p className="text-sm text-muted-foreground">Completed</p>
                        <p className="text-2xl font-bold">{completedProjects}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-4">
                    <div className="flex items-center space-x-2">
                      <DollarSign className="h-5 w-5 text-green-500" />
                      <div>
                        <p className="text-sm text-muted-foreground">Total Revenue</p>
                        <p className="text-2xl font-bold">$1.2M</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Task Statistics */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <Card>
                  <CardContent className="p-4">
                    <div className="flex items-center space-x-2">
                      <Clock className="h-5 w-5 text-yellow-500" />
                      <div>
                        <p className="text-sm text-muted-foreground">Pending Tasks</p>
                        <p className="text-2xl font-bold">{pendingTasks}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-4">
                    <div className="flex items-center space-x-2">
                      <Clock className="h-5 w-5 text-blue-500" />
                      <div>
                        <p className="text-sm text-muted-foreground">In Progress</p>
                        <p className="text-2xl font-bold">{inProgressTasks}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-4">
                    <div className="flex items-center space-x-2">
                      <CheckCircle className="h-5 w-5 text-green-500" />
                      <div>
                        <p className="text-sm text-muted-foreground">Completed</p>
                        <p className="text-2xl font-bold">{completedTasks}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-4">
                    <div className="flex items-center space-x-2">
                      <AlertCircle className="h-5 w-5 text-red-500" />
                      <div>
                        <p className="text-sm text-muted-foreground">Overdue</p>
                        <p className="text-2xl font-bold">{overdueTasks}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Recent Projects */}
              <Card>
                <CardHeader>
                  <CardTitle>Active Projects</CardTitle>
                  <CardDescription>Current automation integration projects</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {projects.filter(p => p.status === 'in_progress').map((project) => (
                      <Card key={project.id} className="cursor-pointer hover:shadow-md transition-shadow" onClick={() => setSelectedProject(project)}>
                        <CardContent className="p-4">
                          <div className="flex items-start justify-between">
                            <div className="flex-1">
                              <div className="flex items-center space-x-2 mb-2">
                                <h4 className="font-semibold">{project.name}</h4>
                                {getStatusBadge(project.status, 'project')}
                                {getPriorityBadge(project.priority)}
                              </div>
                              <p className="text-sm text-muted-foreground mb-2">{project.client_name} - {project.project_type}</p>
                              <div className="flex items-center space-x-4 text-sm text-muted-foreground mb-3">
                                <span className="flex items-center space-x-1">
                                  <Calendar className="h-4 w-4" />
                                  <span>{new Date(project.end_date).toLocaleDateString()}</span>
                                </span>
                                <span className="flex items-center space-x-1">
                                  <DollarSign className="h-4 w-4" />
                                  <span>${project.spent_amount.toLocaleString()} / ${project.budget.toLocaleString()}</span>
                                </span>
                                <span className="flex items-center space-x-1">
                                  <User className="h-4 w-4" />
                                  <span>{project.manager_name}</span>
                                </span>
                              </div>
                              <div className="space-y-2">
                                <div className="flex justify-between text-sm">
                                  <span>Progress</span>
                                  <span>{project.progress}%</span>
                                </div>
                                <Progress value={project.progress} className="h-2" />
                              </div>
                            </div>
                            <div className="ml-4">
                              <div className="text-right">
                                <p className="text-sm font-medium">{getTasksForProject(project.id).length} tasks</p>
                                <p className="text-xs text-muted-foreground">
                                  {getTasksForProject(project.id).filter(t => t.status === 'completed').length} completed
                                </p>
                              </div>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="projects" className="space-y-4">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {projects.map((project) => (
                  <Card key={project.id} className="cursor-pointer hover:shadow-lg transition-shadow" onClick={() => setSelectedProject(project)}>
                    <CardContent className="p-6">
                      <div className="space-y-4">
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <div className="flex items-center space-x-2 mb-2">
                              <h3 className="font-semibold text-lg">{project.name}</h3>
                              {getStatusBadge(project.status, 'project')}
                            </div>
                            <p className="text-sm text-muted-foreground mb-1">{project.client_name}</p>
                            <p className="text-sm mb-3">{project.project_type}</p>
                            <p className="text-sm text-muted-foreground mb-4 line-clamp-2">{project.description}</p>
                          </div>
                          {getPriorityBadge(project.priority)}
                        </div>
                        
                        <div className="grid grid-cols-2 gap-4 text-sm">
                          <div>
                            <p className="text-muted-foreground">Timeline</p>
                            <p className="font-medium">{new Date(project.start_date).toLocaleDateString()} - {new Date(project.end_date).toLocaleDateString()}</p>
                          </div>
                          <div>
                            <p className="text-muted-foreground">Budget</p>
                            <p className="font-medium">${project.budget.toLocaleString()}</p>
                          </div>
                          <div>
                            <p className="text-muted-foreground">Manager</p>
                            <p className="font-medium">{project.manager_name}</p>
                          </div>
                          <div>
                            <p className="text-muted-foreground">Tasks</p>
                            <p className="font-medium">{getTasksForProject(project.id).length} total</p>
                          </div>
                        </div>
                        
                        <div className="space-y-2">
                          <div className="flex justify-between text-sm">
                            <span>Project Progress</span>
                            <span>{project.progress}%</span>
                          </div>
                          <Progress value={project.progress} className="h-2" />
                        </div>
                        
                        <div className="space-y-2">
                          <div className="flex justify-between text-sm">
                            <span>Budget Usage</span>
                            <span>{Math.round((project.spent_amount / project.budget) * 100)}%</span>
                          </div>
                          <Progress value={(project.spent_amount / project.budget) * 100} className="h-2" />
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="tasks" className="space-y-4">
              <div className="space-y-4">
                {tasks.map((task) => (
                  <Card key={task.id} className="hover:shadow-md transition-shadow">
                    <CardContent className="p-4">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center space-x-2 mb-2">
                            <h4 className="font-semibold">{task.title}</h4>
                            {getStatusBadge(task.status)}
                            {getPriorityBadge(task.priority)}
                          </div>
                          <p className="text-sm text-muted-foreground mb-2">{task.description}</p>
                          <div className="flex items-center space-x-4 text-sm text-muted-foreground mb-3">
                            <span className="flex items-center space-x-1">
                              <User className="h-4 w-4" />
                              <span>{task.assigned_name}</span>
                            </span>
                            <span className="flex items-center space-x-1">
                              <Calendar className="h-4 w-4" />
                              <span>Due: {new Date(task.due_date).toLocaleDateString()}</span>
                            </span>
                            <span className="flex items-center space-x-1">
                              <Clock className="h-4 w-4" />
                              <span>{task.actual_hours}h / {task.estimated_hours}h</span>
                            </span>
                            <span className="flex items-center space-x-1">
                              <Wrench className="h-4 w-4" />
                              <span>{task.task_type}</span>
                            </span>
                          </div>
                          {task.equipment_needed && task.equipment_needed.length > 0 && (
                            <div className="mb-2">
                              <p className="text-xs text-muted-foreground mb-1">Equipment Needed:</p>
                              <div className="flex flex-wrap gap-1">
                                {task.equipment_needed.map((equipment, index) => (
                                  <Badge key={index} variant="outline" className="text-xs">{equipment}</Badge>
                                ))}
                              </div>
                            </div>
                          )}
                          <div className="space-y-1">
                            <div className="flex justify-between text-xs">
                              <span>Time Progress</span>
                              <span>{task.actual_hours}h / {task.estimated_hours}h</span>
                            </div>
                            <Progress value={Math.min((task.actual_hours / task.estimated_hours) * 100, 100)} className="h-1" />
                          </div>
                        </div>
                        <div className="flex flex-col space-y-2 ml-4">
                          <Button size="sm" variant="outline">View Details</Button>
                          {task.status === 'pending' && (
                            <Button size="sm">Start Task</Button>
                          )}
                          {task.status === 'in_progress' && (
                            <Button size="sm" variant="default">Mark Complete</Button>
                          )}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="calendar" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Project Timeline</CardTitle>
                  <CardDescription>Visual timeline of all projects and key milestones</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    {projects.map((project) => (
                      <div key={project.id} className="border-l-4 border-l-blue-500 pl-4">
                        <div className="flex items-start justify-between mb-2">
                          <div>
                            <h4 className="font-semibold">{project.name}</h4>
                            <p className="text-sm text-muted-foreground">{project.client_name}</p>
                          </div>
                          <div className="flex items-center space-x-2">
                            {getStatusBadge(project.status, 'project')}
                            {getPriorityBadge(project.priority)}
                          </div>
                        </div>
                        <div className="flex items-center space-x-4 text-sm text-muted-foreground mb-2">
                          <span>{new Date(project.start_date).toLocaleDateString()}</span>
                          <span>→</span>
                          <span>{new Date(project.end_date).toLocaleDateString()}</span>
                          <span>•</span>
                          <span>{project.progress}% complete</span>
                        </div>
                        <div className="space-y-1">
                          <Progress value={project.progress} className="h-2" />
                        </div>
                        <div className="mt-3 grid grid-cols-2 md:grid-cols-4 gap-2 text-xs">
                          <span>Budget: ${project.budget.toLocaleString()}</span>
                          <span>Spent: ${project.spent_amount.toLocaleString()}</span>
                          <span>Tasks: {getTasksForProject(project.id).length}</span>
                          <span>Manager: {project.manager_name}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>

      {/* Project Detail Modal */}
      {selectedProject && (
        <Dialog open={!!selectedProject} onOpenChange={() => setSelectedProject(null)}>
          <DialogContent className="max-w-4xl">
            <DialogHeader>
              <DialogTitle className="flex items-center space-x-3">
                <FolderOpen className="h-6 w-6" />
                <div>
                  <h2 className="text-xl font-bold">{selectedProject.name}</h2>
                  <p className="text-sm text-muted-foreground">{selectedProject.client_name}</p>
                </div>
              </DialogTitle>
            </DialogHeader>
            <div className="space-y-6">
              <div className="grid grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div>
                    <Label className="text-sm font-medium">Project Type</Label>
                    <p className="mt-1">{selectedProject.project_type}</p>
                  </div>
                  <div>
                    <Label className="text-sm font-medium">Status</Label>
                    <div className="mt-1">{getStatusBadge(selectedProject.status, 'project')}</div>
                  </div>
                  <div>
                    <Label className="text-sm font-medium">Priority</Label>
                    <div className="mt-1">{getPriorityBadge(selectedProject.priority)}</div>
                  </div>
                  <div>
                    <Label className="text-sm font-medium">Manager</Label>
                    <p className="mt-1">{selectedProject.manager_name}</p>
                  </div>
                </div>
                <div className="space-y-4">
                  <div>
                    <Label className="text-sm font-medium">Timeline</Label>
                    <p className="mt-1">{new Date(selectedProject.start_date).toLocaleDateString()} - {new Date(selectedProject.end_date).toLocaleDateString()}</p>
                  </div>
                  <div>
                    <Label className="text-sm font-medium">Budget</Label>
                    <p className="mt-1">${selectedProject.budget.toLocaleString()}</p>
                  </div>
                  <div>
                    <Label className="text-sm font-medium">Spent</Label>
                    <p className="mt-1">${selectedProject.spent_amount.toLocaleString()}</p>
                  </div>
                  <div>
                    <Label className="text-sm font-medium">Location</Label>
                    <p className="mt-1">{selectedProject.location}</p>
                  </div>
                </div>
              </div>
              
              <div>
                <Label className="text-sm font-medium">Description</Label>
                <p className="mt-1 text-muted-foreground">{selectedProject.description}</p>
              </div>
              
              <div className="space-y-2">
                <Label className="text-sm font-medium">Project Progress</Label>
                <div className="flex justify-between text-sm mb-1">
                  <span>Overall Completion</span>
                  <span>{selectedProject.progress}%</span>
                </div>
                <Progress value={selectedProject.progress} className="h-3" />
              </div>
              
              <div>
                <Label className="text-sm font-medium">Project Tasks</Label>
                <div className="mt-2 space-y-2">
                  {getTasksForProject(selectedProject.id).map((task) => (
                    <div key={task.id} className="flex items-center justify-between p-2 border rounded">
                      <div className="flex items-center space-x-2">
                        <span className="text-sm font-medium">{task.title}</span>
                        {getStatusBadge(task.status)}
                      </div>
                      <div className="text-sm text-muted-foreground">
                        {task.assigned_name} • Due: {new Date(task.due_date).toLocaleDateString()}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
};

export default TaskManagement;