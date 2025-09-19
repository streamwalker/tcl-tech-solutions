import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';
import { Plus, Search, Filter, MoreHorizontal, Phone, Mail, MapPin, Award, Wrench, Star } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

interface Employee {
  id: string;
  employee_id: string;
  first_name: string;
  last_name: string;
  email: string;
  phone?: string;
  department: string;
  position: string;
  employment_status: string;
  hire_date: string;
  profile_image_url?: string;
  hourly_rate?: number;
  certifications?: any[];
  skills?: any[];
}

// Mock data for automation integration employees
const mockEmployees: Employee[] = [
  {
    id: '1',
    employee_id: 'AIT-001',
    first_name: 'Michael',
    last_name: 'Thompson',
    email: 'mike.thompson@company.com',
    phone: '(555) 123-4567',
    department: 'Residential Installation',
    position: 'Lead Automation Technician',
    employment_status: 'active',
    hire_date: '2022-03-15',
    hourly_rate: 35,
    certifications: ['Smart Home Pro', 'Nest Professional', 'Ring Security Expert'],
    skills: ['Home Theater', 'Smart Lighting', 'Security Systems', 'Network Setup']
  },
  {
    id: '2',
    employee_id: 'AIT-002',
    first_name: 'Sarah',
    last_name: 'Chen',
    email: 'sarah.chen@company.com',
    phone: '(555) 234-5678',
    department: 'Commercial Systems',
    position: 'Building Automation Specialist',
    employment_status: 'active',
    hire_date: '2021-08-22',
    hourly_rate: 42,
    certifications: ['BACnet Certified', 'Johnson Controls Expert', 'HVAC Integration'],
    skills: ['HVAC Systems', 'Access Control', 'Energy Management', 'Building Analytics']
  },
  {
    id: '3',
    employee_id: 'AIT-003',
    first_name: 'David',
    last_name: 'Rodriguez',
    email: 'david.rodriguez@company.com',
    phone: '(555) 345-6789',
    department: 'Security Systems',
    position: 'Security Integration Engineer',
    employment_status: 'active',
    hire_date: '2020-11-10',
    hourly_rate: 38,
    certifications: ['CCTV Professional', 'Access Control Expert', 'Alarm Systems Certified'],
    skills: ['IP Cameras', 'Intrusion Detection', 'Video Analytics', 'Perimeter Security']
  },
  {
    id: '4',
    employee_id: 'AIT-004',
    first_name: 'Jessica',
    last_name: 'Park',
    email: 'jessica.park@company.com',
    phone: '(555) 456-7890',
    department: 'Project Management',
    position: 'Senior Project Manager',
    employment_status: 'active',
    hire_date: '2019-05-18',
    hourly_rate: 55,
    certifications: ['PMP', 'Smart Building Systems', 'Project Leadership'],
    skills: ['Project Planning', 'Client Relations', 'Budget Management', 'Team Coordination']
  },
  {
    id: '5',
    employee_id: 'AIT-005',
    first_name: 'Alex',
    last_name: 'Johnson',
    email: 'alex.johnson@company.com',
    phone: '(555) 567-8901',
    department: 'Network & Infrastructure',
    position: 'Network Infrastructure Specialist',
    employment_status: 'active',
    hire_date: '2023-01-09',
    hourly_rate: 32,
    certifications: ['Cisco Certified', 'WiFi 6 Expert', 'Structured Cabling'],
    skills: ['Network Design', 'WiFi Installation', 'Fiber Optics', 'Network Security']
  },
  {
    id: '6',
    employee_id: 'AIT-006',
    first_name: 'Emily',
    last_name: 'Foster',
    email: 'emily.foster@company.com',
    phone: '(555) 678-9012',
    department: 'Customer Support',
    position: 'Technical Support Specialist',
    employment_status: 'active',
    hire_date: '2022-09-12',
    hourly_rate: 25,
    certifications: ['Customer Service Excellence', 'Technical Troubleshooting'],
    skills: ['Customer Service', 'Remote Diagnostics', 'System Troubleshooting', 'User Training']
  },
  {
    id: '7',
    employee_id: 'AIT-007',
    first_name: 'Robert',
    last_name: 'Williams',
    email: 'robert.williams@company.com',
    phone: '(555) 789-0123',
    department: 'Residential Installation',
    position: 'Smart Home Technician',
    employment_status: 'active',
    hire_date: '2023-06-01',
    hourly_rate: 28,
    certifications: ['Google Nest Certified', 'Ecobee Professional'],
    skills: ['Smart Thermostats', 'Voice Assistants', 'Smart Locks', 'IoT Devices']
  },
  {
    id: '8',
    employee_id: 'AIT-008',
    first_name: 'Lisa',
    last_name: 'Wang',
    email: 'lisa.wang@company.com',
    phone: '(555) 890-1234',
    department: 'Sales & Design',
    position: 'Solutions Designer',
    employment_status: 'active',
    hire_date: '2021-02-28',
    hourly_rate: 45,
    certifications: ['CEDIA Designer', 'Smart Home Design', 'Sales Professional'],
    skills: ['System Design', 'Client Consultation', 'Proposal Creation', 'Technology Sales']
  }
];

const EmployeeManagement = () => {
  const [employees, setEmployees] = useState<Employee[]>(mockEmployees);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [departmentFilter, setDepartmentFilter] = useState('all');
  const [isAddEmployeeOpen, setIsAddEmployeeOpen] = useState(false);
  const [selectedEmployee, setSelectedEmployee] = useState<Employee | null>(null);
  const { toast } = useToast();

  const [newEmployee, setNewEmployee] = useState({
    employee_id: '',
    first_name: '',
    last_name: '',
    email: '',
    phone: '',
    department: '',
    position: '',
    hire_date: '',
    hourly_rate: '',
  });

  const filteredEmployees = employees.filter(employee => {
    const matchesSearch = (
      employee.first_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      employee.last_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      employee.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      employee.employee_id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      employee.position.toLowerCase().includes(searchTerm.toLowerCase())
    );
    
    const matchesDepartment = departmentFilter === 'all' || employee.department === departmentFilter;
    
    return matchesSearch && matchesDepartment;
  });

  const departments = [...new Set(employees.map(emp => emp.department))];

  const getStatusBadge = (status: string) => {
    const variant = status === 'active' ? 'default' : 'secondary';
    return <Badge variant={variant}>{status}</Badge>;
  };

  const getInitials = (firstName: string, lastName: string) => {
    return `${firstName.charAt(0)}${lastName.charAt(0)}`.toUpperCase();
  };

  const getDepartmentStats = () => {
    const stats = departments.map(dept => ({
      name: dept,
      count: employees.filter(emp => emp.department === dept).length,
      avgRate: employees
        .filter(emp => emp.department === dept && emp.hourly_rate)
        .reduce((sum, emp) => sum + (emp.hourly_rate || 0), 0) / 
        employees.filter(emp => emp.department === dept && emp.hourly_rate).length || 0
    }));
    return stats;
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <div className="flex justify-between items-center">
            <div>
              <CardTitle>Employee Management</CardTitle>
              <CardDescription>
                Manage your automation integration workforce
              </CardDescription>
            </div>
            <Dialog open={isAddEmployeeOpen} onOpenChange={setIsAddEmployeeOpen}>
              <DialogTrigger asChild>
                <Button>
                  <Plus className="h-4 w-4 mr-2" />
                  Add Employee
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-md">
                <DialogHeader>
                  <DialogTitle>Add New Employee</DialogTitle>
                  <DialogDescription>
                    Enter the employee's information to add them to the system.
                  </DialogDescription>
                </DialogHeader>
                <form className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="employee_id">Employee ID</Label>
                      <Input
                        id="employee_id"
                        value={newEmployee.employee_id}
                        onChange={(e) => setNewEmployee({...newEmployee, employee_id: e.target.value})}
                        placeholder="AIT-XXX"
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="hire_date">Hire Date</Label>
                      <Input
                        id="hire_date"
                        type="date"
                        value={newEmployee.hire_date}
                        onChange={(e) => setNewEmployee({...newEmployee, hire_date: e.target.value})}
                        required
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="first_name">First Name</Label>
                      <Input
                        id="first_name"
                        value={newEmployee.first_name}
                        onChange={(e) => setNewEmployee({...newEmployee, first_name: e.target.value})}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="last_name">Last Name</Label>
                      <Input
                        id="last_name"
                        value={newEmployee.last_name}
                        onChange={(e) => setNewEmployee({...newEmployee, last_name: e.target.value})}
                        required
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      value={newEmployee.email}
                      onChange={(e) => setNewEmployee({...newEmployee, email: e.target.value})}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone</Label>
                    <Input
                      id="phone"
                      value={newEmployee.phone}
                      onChange={(e) => setNewEmployee({...newEmployee, phone: e.target.value})}
                      placeholder="(555) 123-4567"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="department">Department</Label>
                      <Select value={newEmployee.department} onValueChange={(value) => setNewEmployee({...newEmployee, department: value})}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select department" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Residential Installation">Residential Installation</SelectItem>
                          <SelectItem value="Commercial Systems">Commercial Systems</SelectItem>
                          <SelectItem value="Security Systems">Security Systems</SelectItem>
                          <SelectItem value="Network & Infrastructure">Network & Infrastructure</SelectItem>
                          <SelectItem value="Project Management">Project Management</SelectItem>
                          <SelectItem value="Sales & Design">Sales & Design</SelectItem>
                          <SelectItem value="Customer Support">Customer Support</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="position">Position</Label>
                      <Input
                        id="position"
                        value={newEmployee.position}
                        onChange={(e) => setNewEmployee({...newEmployee, position: e.target.value})}
                        placeholder="Job title"
                        required
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="hourly_rate">Hourly Rate ($)</Label>
                    <Input
                      id="hourly_rate"
                      type="number"
                      value={newEmployee.hourly_rate}
                      onChange={(e) => setNewEmployee({...newEmployee, hourly_rate: e.target.value})}
                      placeholder="25.00"
                    />
                  </div>
                  <Button type="submit" className="w-full">Add Employee</Button>
                </form>
              </DialogContent>
            </Dialog>
          </div>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="overview" className="space-y-6">
            <TabsList>
              <TabsTrigger value="overview">Team Overview</TabsTrigger>
              <TabsTrigger value="directory">Employee Directory</TabsTrigger>
              <TabsTrigger value="departments">Departments</TabsTrigger>
              <TabsTrigger value="skills">Skills Matrix</TabsTrigger>
            </TabsList>

            <TabsContent value="overview" className="space-y-6">
              {/* Key Metrics */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <Card>
                  <CardContent className="p-4">
                    <div className="text-center">
                      <div className="text-2xl font-bold">{employees.length}</div>
                      <div className="text-sm text-muted-foreground">Total Employees</div>
                    </div>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-4">
                    <div className="text-center">
                      <div className="text-2xl font-bold">{departments.length}</div>
                      <div className="text-sm text-muted-foreground">Departments</div>
                    </div>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-4">
                    <div className="text-center">
                      <div className="text-2xl font-bold">$37</div>
                      <div className="text-sm text-muted-foreground">Avg Hourly Rate</div>
                    </div>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-4">
                    <div className="text-center">
                      <div className="text-2xl font-bold">94%</div>
                      <div className="text-sm text-muted-foreground">Retention Rate</div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Department Breakdown */}
              <Card>
                <CardHeader>
                  <CardTitle>Department Distribution</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {getDepartmentStats().map((dept, index) => (
                      <div key={index} className="flex items-center justify-between">
                        <div className="flex-1">
                          <div className="flex justify-between items-center mb-1">
                            <span className="text-sm font-medium">{dept.name}</span>
                            <span className="text-sm text-muted-foreground">{dept.count} employees</span>
                          </div>
                          <Progress value={(dept.count / employees.length) * 100} className="h-2" />
                        </div>
                        <div className="ml-4 text-right">
                          <div className="text-sm font-medium">${dept.avgRate.toFixed(0)}/hr</div>
                          <div className="text-xs text-muted-foreground">avg rate</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="directory" className="space-y-6">
              {/* Search and Filters */}
              <div className="flex space-x-4">
                <div className="flex-1 relative">
                  <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search employees..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
                <Select value={departmentFilter} onValueChange={setDepartmentFilter}>
                  <SelectTrigger className="w-48">
                    <SelectValue placeholder="Filter by department" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Departments</SelectItem>
                    {departments.map(dept => (
                      <SelectItem key={dept} value={dept}>{dept}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Employee Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {filteredEmployees.map((employee) => (
                  <Card key={employee.id} className="cursor-pointer hover:shadow-md transition-shadow" onClick={() => setSelectedEmployee(employee)}>
                    <CardContent className="p-6">
                      <div className="flex items-start space-x-4">
                        <Avatar className="h-12 w-12">
                          <AvatarImage src={employee.profile_image_url} />
                          <AvatarFallback>{getInitials(employee.first_name, employee.last_name)}</AvatarFallback>
                        </Avatar>
                        <div className="flex-1 min-w-0">
                          <h3 className="font-semibold truncate">{employee.first_name} {employee.last_name}</h3>
                          <p className="text-sm text-muted-foreground truncate">{employee.position}</p>
                          <p className="text-sm text-muted-foreground">{employee.department}</p>
                          <div className="flex items-center space-x-2 mt-2">
                            {getStatusBadge(employee.employment_status)}
                            <Badge variant="outline">${employee.hourly_rate}/hr</Badge>
                          </div>
                        </div>
                      </div>
                      <div className="mt-4 space-y-2">
                        <div className="flex items-center text-sm text-muted-foreground">
                          <Mail className="h-3 w-3 mr-2" />
                          <span className="truncate">{employee.email}</span>
                        </div>
                        <div className="flex items-center text-sm text-muted-foreground">
                          <Phone className="h-3 w-3 mr-2" />
                          <span>{employee.phone}</span>
                        </div>
                      </div>
                      {employee.certifications && employee.certifications.length > 0 && (
                        <div className="mt-3">
                          <div className="flex items-center text-xs text-muted-foreground mb-1">
                            <Award className="h-3 w-3 mr-1" />
                            Certifications ({employee.certifications.length})
                          </div>
                          <div className="flex flex-wrap gap-1">
                            {employee.certifications.slice(0, 2).map((cert, index) => (
                              <Badge key={index} variant="secondary" className="text-xs">{cert}</Badge>
                            ))}
                            {employee.certifications.length > 2 && (
                              <Badge variant="secondary" className="text-xs">+{employee.certifications.length - 2} more</Badge>
                            )}
                          </div>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="departments" className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {getDepartmentStats().map((dept, index) => (
                  <Card key={index}>
                    <CardHeader>
                      <CardTitle className="flex items-center justify-between">
                        {dept.name}
                        <Badge>{dept.count} employees</Badge>
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div className="flex justify-between text-sm">
                          <span>Average Rate:</span>
                          <span className="font-medium">${dept.avgRate.toFixed(2)}/hour</span>
                        </div>
                        <div className="space-y-2">
                          {employees
                            .filter(emp => emp.department === dept.name)
                            .slice(0, 3)
                            .map((emp, empIndex) => (
                              <div key={empIndex} className="flex items-center space-x-2">
                                <Avatar className="h-6 w-6">
                                  <AvatarFallback className="text-xs">{getInitials(emp.first_name, emp.last_name)}</AvatarFallback>
                                </Avatar>
                                <span className="text-sm">{emp.first_name} {emp.last_name}</span>
                                <span className="text-xs text-muted-foreground">- {emp.position}</span>
                              </div>
                            ))}
                          {employees.filter(emp => emp.department === dept.name).length > 3 && (
                            <div className="text-xs text-muted-foreground">
                              +{employees.filter(emp => emp.department === dept.name).length - 3} more employees
                            </div>
                          )}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="skills" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Skills & Expertise Matrix</CardTitle>
                  <CardDescription>Technical capabilities across the team</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    {employees.map((employee) => (
                      employee.skills && employee.skills.length > 0 && (
                        <div key={employee.id} className="border rounded-lg p-4">
                          <div className="flex items-center space-x-3 mb-3">
                            <Avatar className="h-8 w-8">
                              <AvatarFallback className="text-xs">{getInitials(employee.first_name, employee.last_name)}</AvatarFallback>
                            </Avatar>
                            <div>
                              <h4 className="font-medium">{employee.first_name} {employee.last_name}</h4>
                              <p className="text-sm text-muted-foreground">{employee.position}</p>
                            </div>
                          </div>
                          <div className="flex flex-wrap gap-2">
                            {employee.skills.map((skill, skillIndex) => (
                              <Badge key={skillIndex} variant="outline" className="flex items-center space-x-1">
                                <Wrench className="h-3 w-3" />
                                <span>{skill}</span>
                              </Badge>
                            ))}
                          </div>
                        </div>
                      )
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>

      {/* Employee Detail Modal */}
      {selectedEmployee && (
        <Dialog open={!!selectedEmployee} onOpenChange={() => setSelectedEmployee(null)}>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle className="flex items-center space-x-3">
                <Avatar className="h-12 w-12">
                  <AvatarFallback>{getInitials(selectedEmployee.first_name, selectedEmployee.last_name)}</AvatarFallback>
                </Avatar>
                <div>
                  <h2 className="text-xl font-bold">{selectedEmployee.first_name} {selectedEmployee.last_name}</h2>
                  <p className="text-sm text-muted-foreground">{selectedEmployee.position}</p>
                </div>
              </DialogTitle>
            </DialogHeader>
            <div className="space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label className="text-sm font-medium">Employee ID</Label>
                  <p className="mt-1">{selectedEmployee.employee_id}</p>
                </div>
                <div>
                  <Label className="text-sm font-medium">Department</Label>
                  <p className="mt-1">{selectedEmployee.department}</p>
                </div>
                <div>
                  <Label className="text-sm font-medium">Email</Label>
                  <p className="mt-1">{selectedEmployee.email}</p>
                </div>
                <div>
                  <Label className="text-sm font-medium">Phone</Label>
                  <p className="mt-1">{selectedEmployee.phone}</p>
                </div>
                <div>
                  <Label className="text-sm font-medium">Hire Date</Label>
                  <p className="mt-1">{new Date(selectedEmployee.hire_date).toLocaleDateString()}</p>
                </div>
                <div>
                  <Label className="text-sm font-medium">Hourly Rate</Label>
                  <p className="mt-1">${selectedEmployee.hourly_rate}/hour</p>
                </div>
              </div>
              
              {selectedEmployee.certifications && selectedEmployee.certifications.length > 0 && (
                <div>
                  <Label className="text-sm font-medium">Certifications</Label>
                  <div className="mt-2 flex flex-wrap gap-2">
                    {selectedEmployee.certifications.map((cert, index) => (
                      <Badge key={index} variant="secondary" className="flex items-center space-x-1">
                        <Award className="h-3 w-3" />
                        <span>{cert}</span>
                      </Badge>
                    ))}
                  </div>
                </div>
              )}
              
              {selectedEmployee.skills && selectedEmployee.skills.length > 0 && (
                <div>
                  <Label className="text-sm font-medium">Technical Skills</Label>
                  <div className="mt-2 flex flex-wrap gap-2">
                    {selectedEmployee.skills.map((skill, index) => (
                      <Badge key={index} variant="outline" className="flex items-center space-x-1">
                        <Wrench className="h-3 w-3" />
                        <span>{skill}</span>
                      </Badge>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
};

export default EmployeeManagement;