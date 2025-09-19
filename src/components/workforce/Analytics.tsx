import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, LineChart, Line, PieChart, Pie, Cell, ResponsiveContainer, AreaChart, Area } from 'recharts';
import { BarChart3, TrendingUp, Users, Clock, DollarSign, Target, Award, Calendar, AlertTriangle, CheckCircle, Timer, Wrench, Star } from 'lucide-react';

// Mock data for comprehensive analytics
const productivityData = [
  { month: 'Jan', projectsCompleted: 8, revenue: 285000, efficiency: 92, customerSatisfaction: 4.7 },
  { month: 'Feb', projectsCompleted: 12, revenue: 340000, efficiency: 89, customerSatisfaction: 4.8 },
  { month: 'Mar', projectsCompleted: 15, revenue: 425000, efficiency: 94, customerSatisfaction: 4.9 },
  { month: 'Apr', projectsCompleted: 18, revenue: 520000, efficiency: 96, customerSatisfaction: 4.8 },
  { month: 'May', projectsCompleted: 22, revenue: 580000, efficiency: 91, customerSatisfaction: 4.9 },
  { month: 'Jun', projectsCompleted: 25, revenue: 650000, efficiency: 95, customerSatisfaction: 4.8 }
];

const departmentPerformance = [
  { department: 'Residential Installation', projects: 45, revenue: 780000, efficiency: 94, employees: 8 },
  { department: 'Commercial Systems', projects: 28, revenue: 1200000, efficiency: 92, employees: 6 },
  { department: 'Security Systems', projects: 35, revenue: 650000, efficiency: 96, employees: 5 },
  { department: 'Network Infrastructure', projects: 42, revenue: 520000, efficiency: 88, employees: 4 },
  { department: 'Project Management', projects: 0, revenue: 0, efficiency: 98, employees: 2 },
  { department: 'Customer Support', projects: 0, revenue: 0, efficiency: 95, employees: 3 }
];

const projectTypeDistribution = [
  { name: 'Smart Home Installation', value: 35, color: '#3b82f6' },
  { name: 'Building Automation', value: 25, color: '#10b981' },
  { name: 'Security Systems', value: 20, color: '#f59e0b' },
  { name: 'Network Installation', value: 15, color: '#ef4444' },
  { name: 'Maintenance', value: 5, color: '#8b5cf6' }
];

const employeeUtilization = [
  { name: 'Michael Thompson', utilization: 92, billableHours: 156, projects: 8, rating: 4.9 },
  { name: 'Sarah Chen', utilization: 88, billableHours: 149, projects: 6, rating: 4.8 },
  { name: 'David Rodriguez', utilization: 94, billableHours: 159, projects: 9, rating: 4.9 },
  { name: 'Jessica Park', utilization: 85, billableHours: 144, projects: 12, rating: 4.7 },
  { name: 'Alex Johnson', utilization: 90, billableHours: 153, projects: 7, rating: 4.8 },
  { name: 'Emily Foster', utilization: 95, billableHours: 161, projects: 0, rating: 4.9 },
  { name: 'Robert Williams', utilization: 87, billableHours: 147, projects: 5, rating: 4.6 },
  { name: 'Lisa Wang', utilization: 83, billableHours: 141, projects: 0, rating: 4.8 }
];

const timeTrackingData = [
  { week: 'Week 1', totalHours: 312, overtimeHours: 8, efficiency: 94 },
  { week: 'Week 2', totalHours: 328, overtimeHours: 12, efficiency: 92 },
  { week: 'Week 3', totalHours: 345, overtimeHours: 18, efficiency: 89 },
  { week: 'Week 4', totalHours: 298, overtimeHours: 4, efficiency: 96 }
];

const customerSatisfactionTrend = [
  { month: 'Jan', satisfaction: 4.5, reviews: 28 },
  { month: 'Feb', satisfaction: 4.6, reviews: 35 },
  { month: 'Mar', satisfaction: 4.8, reviews: 42 },
  { month: 'Apr', satisfaction: 4.7, reviews: 38 },
  { month: 'May', satisfaction: 4.9, reviews: 45 },
  { month: 'Jun', satisfaction: 4.8, reviews: 52 }
];

const Analytics = () => {
  const chartConfig = {
    projects: { label: "Projects", color: "#3b82f6" },
    revenue: { label: "Revenue", color: "#10b981" },
    efficiency: { label: "Efficiency", color: "#f59e0b" },
    satisfaction: { label: "Customer Satisfaction", color: "#ef4444" }
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Workforce Analytics Dashboard</CardTitle>
          <CardDescription>
            Comprehensive insights and metrics for your automation integration business
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="overview" className="space-y-4">
            <TabsList className="grid w-full grid-cols-5">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="productivity">Productivity</TabsTrigger>
              <TabsTrigger value="performance">Performance</TabsTrigger>
              <TabsTrigger value="financial">Financial</TabsTrigger>
              <TabsTrigger value="quality">Quality</TabsTrigger>
            </TabsList>

            <TabsContent value="overview" className="space-y-6">
              {/* Key Performance Indicators */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <Card>
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-muted-foreground">Monthly Revenue</p>
                        <p className="text-2xl font-bold">$650K</p>
                        <p className="text-xs text-muted-foreground">
                          <span className="text-green-500">+12%</span> from last month
                        </p>
                      </div>
                      <DollarSign className="h-8 w-8 text-green-500" />
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-muted-foreground">Projects Completed</p>
                        <p className="text-2xl font-bold">25</p>
                        <p className="text-xs text-muted-foreground">
                          <span className="text-green-500">+39%</span> vs last month
                        </p>
                      </div>
                      <CheckCircle className="h-8 w-8 text-green-500" />
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-muted-foreground">Team Efficiency</p>
                        <p className="text-2xl font-bold">95%</p>
                        <p className="text-xs text-muted-foreground">
                          <span className="text-green-500">+4%</span> improvement
                        </p>
                      </div>
                      <TrendingUp className="h-8 w-8 text-blue-500" />
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-muted-foreground">Customer Rating</p>
                        <p className="text-2xl font-bold">4.8</p>
                        <p className="text-xs text-muted-foreground">
                          <span className="text-green-500">+0.1</span> this month
                        </p>
                      </div>
                      <Star className="h-8 w-8 text-yellow-500" />
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Productivity Trends */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Revenue & Projects Trend</CardTitle>
                    <CardDescription>Monthly performance over time</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ChartContainer config={chartConfig} className="h-[300px]">
                      <ResponsiveContainer width="100%" height="100%">
                        <AreaChart data={productivityData}>
                          <CartesianGrid strokeDasharray="3 3" />
                          <XAxis dataKey="month" />
                          <YAxis yAxisId="left" orientation="left" />
                          <YAxis yAxisId="right" orientation="right" />
                          <ChartTooltip content={<ChartTooltipContent />} />
                          <Area yAxisId="left" type="monotone" dataKey="revenue" stackId="1" stroke="#10b981" fill="#10b981" fillOpacity={0.3} />
                          <Bar yAxisId="right" dataKey="projectsCompleted" fill="#3b82f6" />
                        </AreaChart>
                      </ResponsiveContainer>
                    </ChartContainer>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Project Type Distribution</CardTitle>
                    <CardDescription>Breakdown of work by service type</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ChartContainer config={chartConfig} className="h-[300px]">
                      <ResponsiveContainer width="100%" height="100%">
                        <PieChart>
                          <Pie
                            data={projectTypeDistribution}
                            cx="50%"
                            cy="50%"
                            innerRadius={60}
                            outerRadius={120}
                            paddingAngle={5}
                            dataKey="value"
                          >
                            {projectTypeDistribution.map((entry, index) => (
                              <Cell key={`cell-${index}`} fill={entry.color} />
                            ))}
                          </Pie>
                          <ChartTooltip content={<ChartTooltipContent />} />
                        </PieChart>
                      </ResponsiveContainer>
                    </ChartContainer>
                    <div className="grid grid-cols-2 gap-2 mt-4">
                      {projectTypeDistribution.map((item, index) => (
                        <div key={index} className="flex items-center space-x-2 text-sm">
                          <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }}></div>
                          <span>{item.name}: {item.value}%</span>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Department Performance */}
              <Card>
                <CardHeader>
                  <CardTitle>Department Performance</CardTitle>
                  <CardDescription>Performance metrics by department</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {departmentPerformance.map((dept, index) => (
                      <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                        <div className="flex items-center space-x-4">
                          <div>
                            <h4 className="font-medium">{dept.department}</h4>
                            <p className="text-sm text-muted-foreground">{dept.employees} employees</p>
                          </div>
                        </div>
                        <div className="flex items-center space-x-8">
                          <div className="text-center">
                            <p className="text-sm font-medium">{dept.projects}</p>
                            <p className="text-xs text-muted-foreground">Projects</p>
                          </div>
                          <div className="text-center">
                            <p className="text-sm font-medium">${(dept.revenue / 1000).toFixed(0)}K</p>
                            <p className="text-xs text-muted-foreground">Revenue</p>
                          </div>
                          <div className="text-center">
                            <p className="text-sm font-medium">{dept.efficiency}%</p>
                            <p className="text-xs text-muted-foreground">Efficiency</p>
                          </div>
                          <div className="w-24">
                            <Progress value={dept.efficiency} className="h-2" />
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="productivity" className="space-y-6">
              {/* Employee Utilization */}
              <Card>
                <CardHeader>
                  <CardTitle>Employee Utilization & Performance</CardTitle>
                  <CardDescription>Individual productivity metrics and ratings</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {employeeUtilization.map((employee, index) => (
                      <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                        <div className="flex items-center space-x-4">
                          <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                            <span className="text-sm font-medium">{employee.name.split(' ').map(n => n[0]).join('')}</span>
                          </div>
                          <div>
                            <h4 className="font-medium">{employee.name}</h4>
                            <p className="text-sm text-muted-foreground">{employee.projects} active projects</p>
                          </div>
                        </div>
                        <div className="flex items-center space-x-8">
                          <div className="text-center">
                            <p className="text-sm font-medium">{employee.utilization}%</p>
                            <p className="text-xs text-muted-foreground">Utilization</p>
                          </div>
                          <div className="text-center">
                            <p className="text-sm font-medium">{employee.billableHours}h</p>
                            <p className="text-xs text-muted-foreground">This Month</p>
                          </div>
                          <div className="text-center">
                            <div className="flex items-center space-x-1">
                              <Star className="h-4 w-4 text-yellow-500" />
                              <span className="text-sm font-medium">{employee.rating}</span>
                            </div>
                            <p className="text-xs text-muted-foreground">Rating</p>
                          </div>
                          <div className="w-24">
                            <Progress value={employee.utilization} className="h-2" />
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Time Tracking Analysis */}
              <Card>
                <CardHeader>
                  <CardTitle>Weekly Time Analysis</CardTitle>
                  <CardDescription>Hours worked and efficiency trends</CardDescription>
                </CardHeader>
                <CardContent>
                  <ChartContainer config={chartConfig} className="h-[300px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={timeTrackingData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="week" />
                        <YAxis />
                        <ChartTooltip content={<ChartTooltipContent />} />
                        <Bar dataKey="totalHours" fill="#3b82f6" name="Total Hours" />
                        <Bar dataKey="overtimeHours" fill="#ef4444" name="Overtime Hours" />
                      </BarChart>
                    </ResponsiveContainer>
                  </ChartContainer>
                </CardContent>
              </Card>

              {/* Productivity Metrics */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Card>
                  <CardContent className="p-4">
                    <div className="flex items-center space-x-2">
                      <Timer className="h-5 w-5 text-blue-500" />
                      <div>
                        <p className="text-sm text-muted-foreground">Avg. Project Duration</p>
                        <p className="text-2xl font-bold">18 days</p>
                        <p className="text-xs text-muted-foreground">-2 days vs target</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-4">
                    <div className="flex items-center space-x-2">
                      <Target className="h-5 w-5 text-green-500" />
                      <div>
                        <p className="text-sm text-muted-foreground">On-Time Completion</p>
                        <p className="text-2xl font-bold">92%</p>
                        <p className="text-xs text-muted-foreground">+5% this quarter</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-4">
                    <div className="flex items-center space-x-2">
                      <Clock className="h-5 w-5 text-orange-500" />
                      <div>
                        <p className="text-sm text-muted-foreground">Billable Hours Ratio</p>
                        <p className="text-2xl font-bold">87%</p>
                        <p className="text-xs text-muted-foreground">Above industry avg</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="performance" className="space-y-6">
              {/* Performance Scorecard */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <Card>
                  <CardContent className="p-4">
                    <div className="text-center">
                      <Wrench className="h-8 w-8 mx-auto mb-2 text-blue-500" />
                      <p className="text-2xl font-bold">96%</p>
                      <p className="text-sm text-muted-foreground">Technical Quality Score</p>
                      <Progress value={96} className="mt-2 h-2" />
                    </div>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-4">
                    <div className="text-center">
                      <Users className="h-8 w-8 mx-auto mb-2 text-green-500" />
                      <p className="text-2xl font-bold">4.8</p>
                      <p className="text-sm text-muted-foreground">Team Collaboration</p>
                      <Progress value={96} className="mt-2 h-2" />
                    </div>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-4">
                    <div className="text-center">
                      <Calendar className="h-8 w-8 mx-auto mb-2 text-orange-500" />
                      <p className="text-2xl font-bold">89%</p>
                      <p className="text-sm text-muted-foreground">Schedule Adherence</p>
                      <Progress value={89} className="mt-2 h-2" />
                    </div>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-4">
                    <div className="text-center">
                      <Award className="h-8 w-8 mx-auto mb-2 text-purple-500" />
                      <p className="text-2xl font-bold">94%</p>
                      <p className="text-sm text-muted-foreground">Safety Compliance</p>
                      <Progress value={94} className="mt-2 h-2" />
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Skills and Certifications */}
              <Card>
                <CardHeader>
                  <CardTitle>Team Skills & Certifications</CardTitle>
                  <CardDescription>Current skill levels and certification status</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <h4 className="font-medium mb-4">Technical Skills Coverage</h4>
                      <div className="space-y-3">
                        {[
                          { skill: 'Smart Home Systems', coverage: 95, experts: 6 },
                          { skill: 'Building Automation', coverage: 88, experts: 4 },
                          { skill: 'Security Systems', coverage: 92, experts: 5 },
                          { skill: 'Network Infrastructure', coverage: 85, experts: 3 },
                          { skill: 'HVAC Integration', coverage: 78, experts: 2 },
                          { skill: 'Audio/Video Systems', coverage: 82, experts: 3 }
                        ].map((item, index) => (
                          <div key={index} className="space-y-1">
                            <div className="flex justify-between text-sm">
                              <span>{item.skill}</span>
                              <span>{item.experts} experts • {item.coverage}%</span>
                            </div>
                            <Progress value={item.coverage} className="h-2" />
                          </div>
                        ))}
                      </div>
                    </div>
                    
                    <div>
                      <h4 className="font-medium mb-4">Certification Status</h4>
                      <div className="space-y-3">
                        {[
                          { cert: 'Smart Home Professional', holders: 8, total: 8, expiring: 1 },
                          { cert: 'Building Automation', holders: 4, total: 8, expiring: 0 },
                          { cert: 'Security Systems', holders: 5, total: 8, expiring: 2 },
                          { cert: 'Network Infrastructure', holders: 3, total: 8, expiring: 0 },
                          { cert: 'Project Management', holders: 2, total: 8, expiring: 1 },
                          { cert: 'Safety Training', holders: 8, total: 8, expiring: 3 }
                        ].map((item, index) => (
                          <div key={index} className="flex items-center justify-between p-2 border rounded">
                            <div>
                              <p className="text-sm font-medium">{item.cert}</p>
                              <p className="text-xs text-muted-foreground">
                                {item.holders}/{item.total} certified
                                {item.expiring > 0 && ` • ${item.expiring} expiring soon`}
                              </p>
                            </div>
                            <div className="flex items-center space-x-2">
                              <Progress value={(item.holders / item.total) * 100} className="w-16 h-2" />
                              {item.expiring > 0 && <AlertTriangle className="h-4 w-4 text-yellow-500" />}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Training and Development */}
              <Card>
                <CardHeader>
                  <CardTitle>Training & Development</CardTitle>
                  <CardDescription>Ongoing education and skill improvement</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="text-center">
                      <div className="text-2xl font-bold">24</div>
                      <div className="text-sm text-muted-foreground">Training Hours This Month</div>
                      <Progress value={80} className="mt-2 h-2" />
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold">6</div>
                      <div className="text-sm text-muted-foreground">Certifications in Progress</div>
                      <Progress value={60} className="mt-2 h-2" />
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold">95%</div>
                      <div className="text-sm text-muted-foreground">Training Completion Rate</div>
                      <Progress value={95} className="mt-2 h-2" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="financial" className="space-y-6">
              {/* Financial Overview */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <Card>
                  <CardContent className="p-4">
                    <div className="text-center">
                      <DollarSign className="h-8 w-8 mx-auto mb-2 text-green-500" />
                      <p className="text-2xl font-bold">$3.15M</p>
                      <p className="text-sm text-muted-foreground">Total Revenue YTD</p>
                      <p className="text-xs text-green-500">+18% vs last year</p>
                    </div>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-4">
                    <div className="text-center">
                      <Target className="h-8 w-8 mx-auto mb-2 text-blue-500" />
                      <p className="text-2xl font-bold">$487K</p>
                      <p className="text-sm text-muted-foreground">Avg Project Value</p>
                      <p className="text-xs text-blue-500">+12% increase</p>
                    </div>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-4">
                    <div className="text-center">
                      <TrendingUp className="h-8 w-8 mx-auto mb-2 text-orange-500" />
                      <p className="text-2xl font-bold">24%</p>
                      <p className="text-sm text-muted-foreground">Profit Margin</p>
                      <p className="text-xs text-orange-500">Above target</p>
                    </div>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-4">
                    <div className="text-center">
                      <Clock className="h-8 w-8 mx-auto mb-2 text-purple-500" />
                      <p className="text-2xl font-bold">$185</p>
                      <p className="text-sm text-muted-foreground">Avg Hourly Rate</p>
                      <p className="text-xs text-purple-500">Premium pricing</p>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Revenue Analysis */}
              <Card>
                <CardHeader>
                  <CardTitle>Revenue Analysis</CardTitle>
                  <CardDescription>Financial performance trends and projections</CardDescription>
                </CardHeader>
                <CardContent>
                  <ChartContainer config={chartConfig} className="h-[400px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart data={productivityData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="month" />
                        <YAxis />
                        <ChartTooltip content={<ChartTooltipContent />} />
                        <Line type="monotone" dataKey="revenue" stroke="#10b981" strokeWidth={3} />
                      </LineChart>
                    </ResponsiveContainer>
                  </ChartContainer>
                </CardContent>
              </Card>

              {/* Cost Analysis */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Cost Breakdown</CardTitle>
                    <CardDescription>Operating expenses by category</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {[
                        { category: 'Labor Costs', amount: 1850000, percentage: 58 },
                        { category: 'Equipment & Materials', amount: 950000, percentage: 30 },
                        { category: 'Vehicle & Transportation', amount: 190000, percentage: 6 },
                        { category: 'Insurance & Licenses', amount: 127000, percentage: 4 },
                        { category: 'Office & Administrative', amount: 63000, percentage: 2 }
                      ].map((item, index) => (
                        <div key={index} className="space-y-2">
                          <div className="flex justify-between">
                            <span className="text-sm font-medium">{item.category}</span>
                            <span className="text-sm">${(item.amount / 1000).toFixed(0)}K ({item.percentage}%)</span>
                          </div>
                          <Progress value={item.percentage} className="h-2" />
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Profitability by Project Type</CardTitle>
                    <CardDescription>Margin analysis across service lines</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {[
                        { type: 'Commercial Building Automation', margin: 28, revenue: 1200000 },
                        { type: 'Residential Smart Home', margin: 22, revenue: 780000 },
                        { type: 'Security Systems', margin: 26, revenue: 650000 },
                        { type: 'Network Infrastructure', margin: 18, revenue: 520000 }
                      ].map((item, index) => (
                        <div key={index} className="flex items-center justify-between p-3 border rounded">
                          <div>
                            <p className="text-sm font-medium">{item.type}</p>
                            <p className="text-xs text-muted-foreground">${(item.revenue / 1000).toFixed(0)}K revenue</p>
                          </div>
                          <div className="text-right">
                            <p className="text-sm font-bold">{item.margin}%</p>
                            <p className="text-xs text-muted-foreground">margin</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="quality" className="space-y-6">
              {/* Customer Satisfaction */}
              <Card>
                <CardHeader>
                  <CardTitle>Customer Satisfaction Trends</CardTitle>
                  <CardDescription>Client feedback and satisfaction scores over time</CardDescription>
                </CardHeader>
                <CardContent>
                  <ChartContainer config={chartConfig} className="h-[300px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart data={customerSatisfactionTrend}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="month" />
                        <YAxis domain={[4, 5]} />
                        <ChartTooltip content={<ChartTooltipContent />} />
                        <Line type="monotone" dataKey="satisfaction" stroke="#f59e0b" strokeWidth={3} />
                      </LineChart>
                    </ResponsiveContainer>
                  </ChartContainer>
                </CardContent>
              </Card>

              {/* Quality Metrics */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <Card>
                  <CardContent className="p-4">
                    <div className="text-center">
                      <Star className="h-8 w-8 mx-auto mb-2 text-yellow-500" />
                      <p className="text-2xl font-bold">4.8/5</p>
                      <p className="text-sm text-muted-foreground">Overall Rating</p>
                      <p className="text-xs text-muted-foreground">240 reviews</p>
                    </div>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-4">
                    <div className="text-center">
                      <CheckCircle className="h-8 w-8 mx-auto mb-2 text-green-500" />
                      <p className="text-2xl font-bold">97%</p>
                      <p className="text-sm text-muted-foreground">First-Time Resolution</p>
                      <p className="text-xs text-muted-foreground">Technical issues</p>
                    </div>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-4">
                    <div className="text-center">
                      <Timer className="h-8 w-8 mx-auto mb-2 text-blue-500" />
                      <p className="text-2xl font-bold">2.4hrs</p>
                      <p className="text-sm text-muted-foreground">Avg Response Time</p>
                      <p className="text-xs text-muted-foreground">Support requests</p>
                    </div>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-4">
                    <div className="text-center">
                      <Award className="h-8 w-8 mx-auto mb-2 text-purple-500" />
                      <p className="text-2xl font-bold">94%</p>
                      <p className="text-sm text-muted-foreground">Recommend Rate</p>
                      <p className="text-xs text-muted-foreground">Would refer us</p>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Quality Incidents and Improvements */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Quality Incidents</CardTitle>
                    <CardDescription>Recent issues and resolution status</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {[
                        { issue: 'Network connectivity issue - TechCorp', status: 'resolved', date: '2024-06-15', severity: 'medium' },
                        { issue: 'Smart lock malfunction - Johnson residence', status: 'in_progress', date: '2024-06-14', severity: 'low' },
                        { issue: 'HVAC integration delay - Metro Logistics', status: 'resolved', date: '2024-06-12', severity: 'high' },
                        { issue: 'Camera alignment - Sunrise Apartments', status: 'resolved', date: '2024-06-10', severity: 'low' }
                      ].map((incident, index) => (
                        <div key={index} className="flex items-center justify-between p-3 border rounded">
                          <div className="flex-1">
                            <p className="text-sm font-medium">{incident.issue}</p>
                            <p className="text-xs text-muted-foreground">{incident.date}</p>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Badge variant={incident.severity === 'high' ? 'destructive' : incident.severity === 'medium' ? 'default' : 'secondary'}>
                              {incident.severity}
                            </Badge>
                            <Badge variant={incident.status === 'resolved' ? 'default' : 'secondary'}>
                              {incident.status.replace('_', ' ')}
                            </Badge>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Quality Improvements</CardTitle>
                    <CardDescription>Process enhancements and their impact</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {[
                        { improvement: 'Implemented pre-installation testing', impact: '+15% first-time success', date: '2024-05-01' },
                        { improvement: 'Enhanced technician training program', impact: '+8% customer satisfaction', date: '2024-04-15' },
                        { improvement: 'Improved project planning process', impact: '-12% project delays', date: '2024-03-20' },
                        { improvement: 'Updated quality checklist standards', impact: '+22% quality compliance', date: '2024-02-28' }
                      ].map((item, index) => (
                        <div key={index} className="p-3 border rounded">
                          <p className="text-sm font-medium">{item.improvement}</p>
                          <p className="text-xs text-green-600 font-medium">{item.impact}</p>
                          <p className="text-xs text-muted-foreground">Implemented: {item.date}</p>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};

export default Analytics;