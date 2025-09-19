import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Calendar } from '@/components/ui/calendar';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Plus, Calendar as CalendarIcon, Clock, MapPin, User, Phone, Navigation, CheckCircle, AlertTriangle, Timer } from 'lucide-react';

interface Shift {
  id: string;
  employee_id: string;
  employee_name: string;
  employee_role: string;
  date: string;
  start_time: string;
  end_time: string;
  location: string;
  job_type: string;
  status: 'scheduled' | 'in_progress' | 'completed' | 'cancelled';
  client_name?: string;
  estimated_duration: number;
  break_duration?: number;
  notes?: string;
}

interface TimeEntry {
  id: string;
  employee_id: string;
  employee_name: string;
  clock_in: string;
  clock_out?: string;
  current_location: string;
  current_job: string;
  status: 'clocked_in' | 'on_break' | 'clocked_out';
  break_start?: string;
  total_hours?: number;
}

// Mock data for automation integration jobs
const mockShifts: Shift[] = [
  {
    id: '1',
    employee_id: 'AIT-001',
    employee_name: 'Michael Thompson',
    employee_role: 'Lead Automation Technician',
    date: new Date().toISOString().split('T')[0],
    start_time: '08:00',
    end_time: '16:30',
    location: '1234 Maple Street, Residential',
    job_type: 'Smart Home Installation',
    status: 'in_progress',
    client_name: 'Johnson Family',
    estimated_duration: 8,
    break_duration: 30,
    notes: 'Complete smart lighting, thermostat, and security system installation'
  },
  {
    id: '2',
    employee_id: 'AIT-002',
    employee_name: 'Sarah Chen',
    employee_role: 'Building Automation Specialist',
    date: new Date().toISOString().split('T')[0],
    start_time: '07:30',
    end_time: '17:00',
    location: '5678 Business Plaza, Commercial',
    job_type: 'HVAC Integration',
    status: 'scheduled',
    client_name: 'TechCorp Office Building',
    estimated_duration: 9,
    break_duration: 60,
    notes: 'Install and configure BACnet HVAC control system'
  },
  {
    id: '3',
    employee_id: 'AIT-003',
    employee_name: 'David Rodriguez',
    employee_role: 'Security Integration Engineer',
    date: new Date().toISOString().split('T')[0],
    start_time: '09:00',
    end_time: '15:00',
    location: '9012 Industrial Drive, Warehouse',
    job_type: 'Security System Upgrade',
    status: 'scheduled',
    client_name: 'Metro Logistics',
    estimated_duration: 6,
    break_duration: 30,
    notes: 'Upgrade IP cameras and access control system'
  },
  {
    id: '4',
    employee_id: 'AIT-005',
    employee_name: 'Alex Johnson',
    employee_role: 'Network Infrastructure Specialist',
    date: new Date().toISOString().split('T')[0],
    start_time: '10:00',
    end_time: '18:00',
    location: '3456 Oak Avenue, Residential',
    job_type: 'Network Installation',
    status: 'scheduled',
    client_name: 'Williams Residence',
    estimated_duration: 8,
    break_duration: 60,
    notes: 'Install fiber optic network and WiFi 6 throughout home'
  },
  {
    id: '5',
    employee_id: 'AIT-007',
    employee_name: 'Robert Williams',
    employee_role: 'Smart Home Technician',
    date: new Date(Date.now() + 86400000).toISOString().split('T')[0], // Tomorrow
    start_time: '08:30',
    end_time: '16:00',
    location: '7890 Pine Street, Residential',
    job_type: 'Smart Thermostat Installation',
    status: 'scheduled',
    client_name: 'Davis Family',
    estimated_duration: 7,
    break_duration: 30,
    notes: 'Install Nest thermostat and configure smart scheduling'
  }
];

const mockTimeEntries: TimeEntry[] = [
  {
    id: '1',
    employee_id: 'AIT-001',
    employee_name: 'Michael Thompson',
    clock_in: '08:05',
    current_location: '1234 Maple Street',
    current_job: 'Johnson Family - Smart Home Installation',
    status: 'clocked_in'
  },
  {
    id: '2',
    employee_id: 'AIT-004',
    employee_name: 'Jessica Park',
    clock_in: '07:45',
    current_location: 'Office - Project Management',
    current_job: 'Project Planning & Client Coordination',
    status: 'clocked_in'
  },
  {
    id: '3',
    employee_id: 'AIT-006',
    employee_name: 'Emily Foster',
    clock_in: '08:00',
    break_start: '12:00',
    current_location: 'Office - Technical Support',
    current_job: 'Customer Support & Remote Troubleshooting',
    status: 'on_break'
  }
];

const ScheduleManagement = () => {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());
  const [shifts, setShifts] = useState<Shift[]>(mockShifts);
  const [timeEntries, setTimeEntries] = useState<TimeEntry[]>(mockTimeEntries);
  const [isAddShiftOpen, setIsAddShiftOpen] = useState(false);

  const getShiftsForDate = (date: Date) => {
    const dateString = date.toISOString().split('T')[0];
    return shifts.filter(shift => shift.date === dateString);
  };

  const getStatusBadge = (status: string) => {
    const variants = {
      scheduled: 'default',
      in_progress: 'secondary',
      completed: 'default',
      cancelled: 'destructive'
    } as const;
    
    const colors = {
      scheduled: 'text-blue-600',
      in_progress: 'text-green-600',
      completed: 'text-green-700',
      cancelled: 'text-red-600'
    } as const;

    return (
      <Badge variant={variants[status as keyof typeof variants]} className={colors[status as keyof typeof colors]}>
        {status.replace('_', ' ')}
      </Badge>
    );
  };

  const getTimeStatusBadge = (status: string) => {
    const variants = {
      clocked_in: 'default',
      on_break: 'secondary',
      clocked_out: 'outline'
    } as const;

    return (
      <Badge variant={variants[status as keyof typeof variants]}>
        {status.replace('_', ' ')}
      </Badge>
    );
  };

  const getInitials = (name: string) => {
    return name.split(' ').map(n => n.charAt(0)).join('').toUpperCase();
  };

  const todaysShifts = getShiftsForDate(selectedDate || new Date());
  
  // Weekly overview data
  const weeklyStats = {
    totalShifts: shifts.length,
    activeShifts: shifts.filter(s => s.status === 'in_progress').length,
    completedShifts: shifts.filter(s => s.status === 'completed').length,
    totalHours: shifts.reduce((sum, shift) => sum + shift.estimated_duration, 0)
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <div className="flex justify-between items-center">
            <div>
              <CardTitle>Schedule Management</CardTitle>
              <CardDescription>
                Plan and track automation integration jobs and employee schedules
              </CardDescription>
            </div>
            <Dialog open={isAddShiftOpen} onOpenChange={setIsAddShiftOpen}>
              <DialogTrigger asChild>
                <Button>
                  <Plus className="h-4 w-4 mr-2" />
                  Schedule New Job
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-md">
                <DialogHeader>
                  <DialogTitle>Schedule New Job</DialogTitle>
                  <DialogDescription>
                    Create a new job assignment for your team
                  </DialogDescription>
                </DialogHeader>
                <form className="space-y-4">
                  <div className="space-y-2">
                    <Label>Employee</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select technician" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="AIT-001">Michael Thompson - Lead Technician</SelectItem>
                        <SelectItem value="AIT-002">Sarah Chen - Building Automation</SelectItem>
                        <SelectItem value="AIT-003">David Rodriguez - Security Systems</SelectItem>
                        <SelectItem value="AIT-005">Alex Johnson - Network Infrastructure</SelectItem>
                        <SelectItem value="AIT-007">Robert Williams - Smart Home</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label>Date</Label>
                      <Input type="date" />
                    </div>
                    <div className="space-y-2">
                      <Label>Job Type</Label>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="Select type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="smart_home">Smart Home Installation</SelectItem>
                          <SelectItem value="security">Security System</SelectItem>
                          <SelectItem value="hvac">HVAC Integration</SelectItem>
                          <SelectItem value="network">Network Installation</SelectItem>
                          <SelectItem value="maintenance">Maintenance</SelectItem>
                          <SelectItem value="consultation">Consultation</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label>Start Time</Label>
                      <Input type="time" defaultValue="08:00" />
                    </div>
                    <div className="space-y-2">
                      <Label>End Time</Label>
                      <Input type="time" defaultValue="16:00" />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label>Client Name</Label>
                    <Input placeholder="Client or company name" />
                  </div>
                  <div className="space-y-2">
                    <Label>Location</Label>
                    <Input placeholder="Job site address" />
                  </div>
                  <div className="space-y-2">
                    <Label>Notes</Label>
                    <Textarea placeholder="Job details and special instructions" rows={3} />
                  </div>
                  <Button type="submit" className="w-full">Schedule Job</Button>
                </form>
              </DialogContent>
            </Dialog>
          </div>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="today" className="space-y-6">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="today">Today's Schedule</TabsTrigger>
              <TabsTrigger value="calendar">Calendar View</TabsTrigger>
              <TabsTrigger value="timetracking">Time Tracking</TabsTrigger>
              <TabsTrigger value="overview">Weekly Overview</TabsTrigger>
            </TabsList>

            <TabsContent value="today" className="space-y-6">
              {/* Today's Summary */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <Card>
                  <CardContent className="p-4">
                    <div className="flex items-center space-x-2">
                      <CalendarIcon className="h-5 w-5 text-blue-500" />
                      <div>
                        <p className="text-sm text-muted-foreground">Scheduled Jobs</p>
                        <p className="text-2xl font-bold">{todaysShifts.length}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-4">
                    <div className="flex items-center space-x-2">
                      <Timer className="h-5 w-5 text-green-500" />
                      <div>
                        <p className="text-sm text-muted-foreground">In Progress</p>
                        <p className="text-2xl font-bold">{todaysShifts.filter(s => s.status === 'in_progress').length}</p>
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
                        <p className="text-2xl font-bold">{todaysShifts.filter(s => s.status === 'completed').length}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-4">
                    <div className="flex items-center space-x-2">
                      <Clock className="h-5 w-5 text-orange-500" />
                      <div>
                        <p className="text-sm text-muted-foreground">Total Hours</p>
                        <p className="text-2xl font-bold">{todaysShifts.reduce((sum, shift) => sum + shift.estimated_duration, 0)}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Today's Jobs */}
              <Card>
                <CardHeader>
                  <CardTitle>Today's Jobs - {selectedDate?.toLocaleDateString()}</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {todaysShifts.length === 0 ? (
                      <div className="text-center py-8 text-muted-foreground">
                        <CalendarIcon className="h-12 w-12 mx-auto mb-4 opacity-50" />
                        <p>No jobs scheduled for this date</p>
                        <Button variant="outline" className="mt-4" onClick={() => setIsAddShiftOpen(true)}>
                          <Plus className="h-4 w-4 mr-2" />
                          Schedule First Job
                        </Button>
                      </div>
                    ) : (
                      todaysShifts.map((shift) => (
                        <Card key={shift.id} className="border-l-4 border-l-blue-500">
                          <CardContent className="p-4">
                            <div className="flex items-start justify-between">
                              <div className="flex items-start space-x-4">
                                <Avatar className="h-10 w-10">
                                  <AvatarFallback>{getInitials(shift.employee_name)}</AvatarFallback>
                                </Avatar>
                                <div className="flex-1">
                                  <div className="flex items-center space-x-2 mb-1">
                                    <h4 className="font-semibold">{shift.job_type}</h4>
                                    {getStatusBadge(shift.status)}
                                  </div>
                                  <p className="text-sm text-muted-foreground mb-2">{shift.employee_name} - {shift.employee_role}</p>
                                  <div className="space-y-1 text-sm">
                                    <div className="flex items-center space-x-2">
                                      <Clock className="h-4 w-4 text-muted-foreground" />
                                      <span>{shift.start_time} - {shift.end_time} ({shift.estimated_duration}h)</span>
                                    </div>
                                    <div className="flex items-center space-x-2">
                                      <MapPin className="h-4 w-4 text-muted-foreground" />
                                      <span>{shift.location}</span>
                                    </div>
                                    <div className="flex items-center space-x-2">
                                      <User className="h-4 w-4 text-muted-foreground" />
                                      <span>{shift.client_name}</span>
                                    </div>
                                  </div>
                                  {shift.notes && (
                                    <p className="text-sm text-muted-foreground mt-2 bg-muted/30 p-2 rounded">
                                      {shift.notes}
                                    </p>
                                  )}
                                </div>
                              </div>
                              <div className="flex flex-col space-y-2">
                                <Button size="sm" variant="outline">View Details</Button>
                                {shift.status === 'scheduled' && (
                                  <Button size="sm">Start Job</Button>
                                )}
                                {shift.status === 'in_progress' && (
                                  <Button size="sm" variant="default">Complete Job</Button>
                                )}
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      ))
                    )}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="calendar" className="space-y-6">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Calendar */}
                <div className="lg:col-span-1">
                  <Calendar
                    mode="single"
                    selected={selectedDate}
                    onSelect={setSelectedDate}
                    className="rounded-md border"
                  />
                </div>

                {/* Schedule View */}
                <div className="lg:col-span-2">
                  <Card>
                    <CardHeader>
                      <CardTitle>
                        Schedule for {selectedDate?.toLocaleDateString()}
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        {getShiftsForDate(selectedDate || new Date()).map((shift) => (
                          <div key={shift.id} className="border rounded-lg p-4 hover:bg-muted/30 transition-colors">
                            <div className="flex justify-between items-start">
                              <div>
                                <div className="flex items-center space-x-2 mb-1">
                                  <h4 className="font-medium">{shift.job_type}</h4>
                                  {getStatusBadge(shift.status)}
                                </div>
                                <p className="text-sm text-muted-foreground">{shift.employee_name}</p>
                                <p className="text-sm">{shift.start_time} - {shift.end_time}</p>
                                <p className="text-sm text-muted-foreground">{shift.client_name}</p>
                              </div>
                              <Badge variant="outline">
                                <MapPin className="h-3 w-3 mr-1" />
                                {shift.location.split(',')[0]}
                              </Badge>
                            </div>
                          </div>
                        ))}
                        
                        {getShiftsForDate(selectedDate || new Date()).length === 0 && (
                          <div className="text-center py-8 text-muted-foreground">
                            <CalendarIcon className="h-8 w-8 mx-auto mb-2 opacity-50" />
                            <p>No jobs scheduled for this date</p>
                          </div>
                        )}
                      </div>
                      
                      <Button variant="outline" className="w-full mt-4" onClick={() => setIsAddShiftOpen(true)}>
                        <Plus className="h-4 w-4 mr-2" />
                        Add Job for This Day
                      </Button>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="timetracking" className="space-y-6">
              {/* Time Tracking Summary */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Card>
                  <CardContent className="p-4">
                    <div className="flex items-center space-x-2">
                      <CheckCircle className="h-5 w-5 text-green-500" />
                      <div>
                        <p className="text-sm text-muted-foreground">Clocked In</p>
                        <p className="text-2xl font-bold">{timeEntries.filter(t => t.status === 'clocked_in').length}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-4">
                    <div className="flex items-center space-x-2">
                      <AlertTriangle className="h-5 w-5 text-yellow-500" />
                      <div>
                        <p className="text-sm text-muted-foreground">On Break</p>
                        <p className="text-2xl font-bold">{timeEntries.filter(t => t.status === 'on_break').length}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-4">
                    <div className="flex items-center space-x-2">
                      <Clock className="h-5 w-5 text-blue-500" />
                      <div>
                        <p className="text-sm text-muted-foreground">Total Active Hours</p>
                        <p className="text-2xl font-bold">24.5</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Active Time Entries */}
              <Card>
                <CardHeader>
                  <CardTitle>Real-Time Employee Status</CardTitle>
                  <CardDescription>Current location and activity of your field team</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {timeEntries.map((entry) => (
                      <Card key={entry.id} className="border-l-4 border-l-green-500">
                        <CardContent className="p-4">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-4">
                              <Avatar className="h-10 w-10">
                                <AvatarFallback>{getInitials(entry.employee_name)}</AvatarFallback>
                              </Avatar>
                              <div>
                                <div className="flex items-center space-x-2 mb-1">
                                  <h4 className="font-semibold">{entry.employee_name}</h4>
                                  {getTimeStatusBadge(entry.status)}
                                </div>
                                <div className="space-y-1 text-sm">
                                  <div className="flex items-center space-x-2">
                                    <Clock className="h-4 w-4 text-muted-foreground" />
                                    <span>Clocked in at {entry.clock_in}</span>
                                    {entry.break_start && (
                                      <span className="text-yellow-600">| Break started at {entry.break_start}</span>
                                    )}
                                  </div>
                                  <div className="flex items-center space-x-2">
                                    <MapPin className="h-4 w-4 text-muted-foreground" />
                                    <span>{entry.current_location}</span>
                                  </div>
                                  <div className="flex items-center space-x-2">
                                    <Navigation className="h-4 w-4 text-muted-foreground" />
                                    <span>{entry.current_job}</span>
                                  </div>
                                </div>
                              </div>
                            </div>
                            <div className="flex flex-col space-y-2">
                              <Button size="sm" variant="outline">
                                <Phone className="h-4 w-4 mr-2" />
                                Contact
                              </Button>
                              {entry.status === 'clocked_in' && (
                                <Button size="sm" variant="outline">Clock Out</Button>
                              )}
                              {entry.status === 'on_break' && (
                                <Button size="sm" variant="default">End Break</Button>
                              )}
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="overview" className="space-y-6">
              {/* Weekly Statistics */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <Card>
                  <CardContent className="p-4">
                    <div className="text-center">
                      <div className="text-2xl font-bold">{weeklyStats.totalShifts}</div>
                      <div className="text-sm text-muted-foreground">Total Jobs This Week</div>
                    </div>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-4">
                    <div className="text-center">
                      <div className="text-2xl font-bold">{weeklyStats.activeShifts}</div>
                      <div className="text-sm text-muted-foreground">Jobs In Progress</div>
                    </div>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-4">
                    <div className="text-center">
                      <div className="text-2xl font-bold">{weeklyStats.completedShifts}</div>
                      <div className="text-sm text-muted-foreground">Jobs Completed</div>
                    </div>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-4">
                    <div className="text-center">
                      <div className="text-2xl font-bold">{weeklyStats.totalHours}</div>
                      <div className="text-sm text-muted-foreground">Scheduled Hours</div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Job Type Distribution */}
              <Card>
                <CardHeader>
                  <CardTitle>Job Type Distribution</CardTitle>
                  <CardDescription>Breakdown of work by service type</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {['Smart Home Installation', 'HVAC Integration', 'Security System Upgrade', 'Network Installation', 'Smart Thermostat Installation'].map((jobType, index) => {
                      const count = shifts.filter(s => s.job_type === jobType).length;
                      const percentage = shifts.length > 0 ? (count / shifts.length) * 100 : 0;
                      return (
                        <div key={index} className="flex items-center justify-between">
                          <div className="flex-1">
                            <div className="flex justify-between items-center mb-1">
                              <span className="text-sm font-medium">{jobType}</span>
                              <span className="text-sm text-muted-foreground">{count} jobs</span>
                            </div>
                            <div className="w-full bg-muted rounded-full h-2">
                              <div 
                                className="bg-primary h-2 rounded-full" 
                                style={{ width: `${percentage}%` }}
                              ></div>
                            </div>
                          </div>
                          <div className="ml-4 text-sm font-medium">
                            {percentage.toFixed(1)}%
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </CardContent>
              </Card>

              {/* Upcoming Jobs */}
              <Card>
                <CardHeader>
                  <CardTitle>Upcoming Jobs</CardTitle>
                  <CardDescription>Next scheduled installations and service calls</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {shifts.filter(s => s.status === 'scheduled').slice(0, 5).map((shift) => (
                      <div key={shift.id} className="flex items-center justify-between p-3 border rounded-lg">
                        <div className="flex items-center space-x-3">
                          <Avatar className="h-8 w-8">
                            <AvatarFallback className="text-xs">{getInitials(shift.employee_name)}</AvatarFallback>
                          </Avatar>
                          <div>
                            <h4 className="font-medium">{shift.job_type}</h4>
                            <p className="text-sm text-muted-foreground">{shift.client_name} - {shift.date}</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="text-sm font-medium">{shift.start_time}</p>
                          <p className="text-xs text-muted-foreground">{shift.estimated_duration}h estimated</p>
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
    </div>
  );
};

export default ScheduleManagement;