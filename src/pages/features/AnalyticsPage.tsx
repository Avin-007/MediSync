import React, { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import DashboardLayout from '@/components/dashboard/DashboardLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, LineChart, Line, PieChart, Pie, Cell } from 'recharts';
import { TrendingUp, Activity, Clock, Users, DollarSign } from 'lucide-react';

const AnalyticsPage = () => {
  const { user } = useAuth();
  const [timeRange, setTimeRange] = useState('7d');
  const [analyticsData, setAnalyticsData] = useState<any>({});

  useEffect(() => {
    // Generate role-specific analytics data
    const generateData = () => {
      switch(user?.role) {
        case 'user':
          return {
            healthMetrics: [
              { name: 'Mon', heartRate: 72, bloodPressure: 120, steps: 8500 },
              { name: 'Tue', heartRate: 75, bloodPressure: 118, steps: 9200 },
              { name: 'Wed', heartRate: 73, bloodPressure: 122, steps: 7800 },
              { name: 'Thu', heartRate: 71, bloodPressure: 119, steps: 10200 },
              { name: 'Fri', heartRate: 74, bloodPressure: 121, steps: 9800 },
              { name: 'Sat', heartRate: 76, bloodPressure: 123, steps: 12000 },
              { name: 'Sun', heartRate: 70, bloodPressure: 117, steps: 6500 },
            ],
            appointmentTypes: [
              { name: 'Regular Checkup', value: 45, color: '#4C6FFF' },
              { name: 'Emergency', value: 20, color: '#FF577F' },
              { name: 'Specialist', value: 25, color: '#10B981' },
              { name: 'Follow-up', value: 10, color: '#F59E0B' },
            ],
            stats: {
              totalAppointments: 24,
              emergencyCalls: 3,
              healthScore: 85,
              medicationCompliance: 92
            }
          };
        case 'ambulance':
          return {
            responseMetrics: [
              { name: 'Mon', responses: 12, avgTime: 8.5, criticalCases: 3 },
              { name: 'Tue', responses: 15, avgTime: 7.2, criticalCases: 5 },
              { name: 'Wed', responses: 10, avgTime: 9.1, criticalCases: 2 },
              { name: 'Thu', responses: 18, avgTime: 6.8, criticalCases: 7 },
              { name: 'Fri', responses: 20, avgTime: 7.5, criticalCases: 6 },
              { name: 'Sat', responses: 25, avgTime: 8.0, criticalCases: 9 },
              { name: 'Sun', responses: 22, avgTime: 7.8, criticalCases: 8 },
            ],
            caseTypes: [
              { name: 'Cardiac Emergency', value: 30, color: '#FF577F' },
              { name: 'Accident', value: 25, color: '#F59E0B' },
              { name: 'Stroke', value: 20, color: '#EF4444' },
              { name: 'Other', value: 25, color: '#6B7280' },
            ],
            stats: {
              totalCalls: 122,
              avgResponseTime: 7.6,
              successRate: 96,
              fuelEfficiency: 12.5
            }
          };
        case 'hospital':
          return {
            patientFlow: [
              { name: '6AM', admissions: 5, discharges: 2, emergency: 8 },
              { name: '8AM', admissions: 12, discharges: 5, emergency: 15 },
              { name: '10AM', admissions: 18, discharges: 8, emergency: 12 },
              { name: '12PM', admissions: 25, discharges: 15, emergency: 20 },
              { name: '2PM', admissions: 22, discharges: 18, emergency: 18 },
              { name: '4PM', admissions: 20, discharges: 25, emergency: 15 },
              { name: '6PM', admissions: 15, discharges: 20, emergency: 22 },
              { name: '8PM', admissions: 10, discharges: 12, emergency: 25 },
            ],
            departmentUtilization: [
              { name: 'Emergency', value: 85, color: '#EF4444' },
              { name: 'ICU', value: 92, color: '#F59E0B' },
              { name: 'Surgery', value: 78, color: '#10B981' },
              { name: 'General', value: 65, color: '#4C6FFF' },
            ],
            stats: {
              totalPatients: 1250,
              bedOccupancy: 82,
              avgStayDuration: 4.2,
              revenue: 125000
            }
          };
        case 'traffic':
          return {
            trafficFlow: [
              { name: '6AM', clearances: 2, avgTime: 45, congestion: 20 },
              { name: '8AM', clearances: 8, avgTime: 35, congestion: 75 },
              { name: '10AM', clearances: 5, avgTime: 40, congestion: 45 },
              { name: '12PM', clearances: 12, avgTime: 30, congestion: 85 },
              { name: '2PM', clearances: 10, avgTime: 38, congestion: 70 },
              { name: '4PM', clearances: 15, avgTime: 25, congestion: 90 },
              { name: '6PM', clearances: 18, avgTime: 28, congestion: 95 },
              { name: '8PM', clearances: 8, avgTime: 42, congestion: 55 },
            ],
            emergencyTypes: [
              { name: 'Ambulance', value: 60, color: '#EF4444' },
              { name: 'Fire Truck', value: 20, color: '#F59E0B' },
              { name: 'Police', value: 15, color: '#4C6FFF' },
              { name: 'Other', value: 5, color: '#6B7280' },
            ],
            stats: {
              totalClearances: 78,
              avgClearanceTime: 32,
              trafficReduction: 25,
              emergencySuccess: 98
            }
          };
        case 'nurse':
          return {
            patientCare: [
              { name: 'Mon', patients: 25, medications: 45, vitals: 75 },
              { name: 'Tue', patients: 28, medications: 52, vitals: 84 },
              { name: 'Wed', patients: 22, medications: 38, vitals: 66 },
              { name: 'Thu', patients: 30, medications: 58, vitals: 90 },
              { name: 'Fri', patients: 26, medications: 48, vitals: 78 },
              { name: 'Sat', patients: 24, medications: 42, vitals: 72 },
              { name: 'Sun', patients: 20, medications: 35, vitals: 60 },
            ],
            taskDistribution: [
              { name: 'Medication Admin', value: 35, color: '#4C6FFF' },
              { name: 'Vital Monitoring', value: 25, color: '#10B981' },
              { name: 'Patient Care', value: 30, color: '#F59E0B' },
              { name: 'Documentation', value: 10, color: '#6B7280' },
            ],
            stats: {
              totalPatients: 175,
              medicationsGiven: 328,
              vitalsRecorded: 525,
              satisfactionScore: 4.8
            }
          };
        default:
          return {};
      }
    };

    setAnalyticsData(generateData());
  }, [user?.role, timeRange]);

  const getRoleSpecificTitle = () => {
    switch(user?.role) {
      case 'user': return 'Personal Health Analytics';
      case 'ambulance': return 'Ambulance Service Analytics';
      case 'hospital': return 'Hospital Performance Analytics';
      case 'traffic': return 'Traffic Management Analytics';
      case 'nurse': return 'Care Delivery Analytics';
      default: return 'Analytics Dashboard';
    }
  };

  const getMetricIcon = (metric: string) => {
    switch(metric) {
      case 'totalAppointments':
      case 'totalPatients':
      case 'totalCalls':
      case 'totalClearances':
        return <Users className="h-4 w-4" />;
      case 'avgResponseTime':
      case 'avgClearanceTime':
      case 'avgStayDuration':
        return <Clock className="h-4 w-4" />;
      case 'healthScore':
      case 'successRate':
      case 'emergencySuccess':
      case 'satisfactionScore':
        return <TrendingUp className="h-4 w-4" />;
      case 'revenue':
        return <DollarSign className="h-4 w-4" />;
      default:
        return <Activity className="h-4 w-4" />;
    }
  };

  const formatValue = (key: string, value: number) => {
    if (key === 'revenue') return `$${value.toLocaleString()}`;
    if (key.includes('Time')) return `${value} min`;
    if (key.includes('Rate') || key.includes('Score')) return `${value}%`;
    if (key === 'satisfactionScore') return `${value}/5`;
    return value.toString();
  };

  return (
    <DashboardLayout
      title={getRoleSpecificTitle()}
      description="Track key metrics and performance indicators"
      headerActions={
        <Select value={timeRange} onValueChange={setTimeRange}>
          <SelectTrigger className="w-32">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="1d">Last 24h</SelectItem>
            <SelectItem value="7d">Last 7 days</SelectItem>
            <SelectItem value="30d">Last 30 days</SelectItem>
            <SelectItem value="90d">Last 3 months</SelectItem>
          </SelectContent>
        </Select>
      }
    >
      <div className="space-y-6">
        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {analyticsData.stats && Object.entries(analyticsData.stats).map(([key, value]) => (
            <Card key={key}>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-500 capitalize">
                      {key.replace(/([A-Z])/g, ' $1').trim()}
                    </p>
                    <p className="text-2xl font-bold">
                      {formatValue(key, value as number)}
                    </p>
                  </div>
                  <div className="h-8 w-8 bg-blue-100 rounded-full flex items-center justify-center">
                    {getMetricIcon(key)}
                  </div>
                </div>
                <div className="flex items-center mt-2 text-sm">
                  <TrendingUp className="h-3 w-3 text-green-500 mr-1" />
                  <span className="text-green-500">+12%</span>
                  <span className="text-gray-500 ml-1">vs last period</span>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Primary Chart */}
          <Card>
            <CardHeader>
              <CardTitle>
                {user?.role === 'user' && 'Health Trends'}
                {user?.role === 'ambulance' && 'Response Metrics'}
                {user?.role === 'hospital' && 'Patient Flow'}
                {user?.role === 'traffic' && 'Traffic Management'}
                {user?.role === 'nurse' && 'Patient Care Activities'}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  {user?.role === 'user' && analyticsData.healthMetrics && (
                    <AreaChart data={analyticsData.healthMetrics}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" />
                      <YAxis />
                      <Tooltip />
                      <Area type="monotone" dataKey="heartRate" stroke="#EF4444" fill="#EF444420" />
                      <Area type="monotone" dataKey="bloodPressure" stroke="#4C6FFF" fill="#4C6FFF20" />
                    </AreaChart>
                  )}
                  
                  {user?.role === 'ambulance' && analyticsData.responseMetrics && (
                    <LineChart data={analyticsData.responseMetrics}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" />
                      <YAxis />
                      <Tooltip />
                      <Line type="monotone" dataKey="responses" stroke="#4C6FFF" />
                      <Line type="monotone" dataKey="criticalCases" stroke="#EF4444" />
                    </LineChart>
                  )}
                  
                  {user?.role === 'hospital' && analyticsData.patientFlow && (
                    <BarChart data={analyticsData.patientFlow}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" />
                      <YAxis />
                      <Tooltip />
                      <Bar dataKey="admissions" fill="#4C6FFF" />
                      <Bar dataKey="discharges" fill="#10B981" />
                      <Bar dataKey="emergency" fill="#EF4444" />
                    </BarChart>
                  )}
                  
                  {user?.role === 'traffic' && analyticsData.trafficFlow && (
                    <LineChart data={analyticsData.trafficFlow}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" />
                      <YAxis />
                      <Tooltip />
                      <Line type="monotone" dataKey="clearances" stroke="#10B981" />
                      <Line type="monotone" dataKey="congestion" stroke="#F59E0B" />
                    </LineChart>
                  )}
                  
                  {user?.role === 'nurse' && analyticsData.patientCare && (
                    <AreaChart data={analyticsData.patientCare}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" />
                      <YAxis />
                      <Tooltip />
                      <Area type="monotone" dataKey="patients" stroke="#4C6FFF" fill="#4C6FFF20" />
                      <Area type="monotone" dataKey="medications" stroke="#10B981" fill="#10B98120" />
                      <Area type="monotone" dataKey="vitals" stroke="#F59E0B" fill="#F59E0B20" />
                    </AreaChart>
                  )}
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          {/* Distribution Chart */}
          <Card>
            <CardHeader>
              <CardTitle>
                {user?.role === 'user' && 'Appointment Types'}
                {user?.role === 'ambulance' && 'Case Distribution'}
                {user?.role === 'hospital' && 'Department Utilization'}
                {user?.role === 'traffic' && 'Emergency Types'}
                {user?.role === 'nurse' && 'Task Distribution'}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={
                        analyticsData.appointmentTypes || 
                        analyticsData.caseTypes || 
                        analyticsData.departmentUtilization || 
                        analyticsData.emergencyTypes ||
                        analyticsData.taskDistribution ||
                        []
                      }
                      cx="50%"
                      cy="50%"
                      outerRadius={80}
                      dataKey="value"
                      label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                    >
                      {(analyticsData.appointmentTypes || 
                        analyticsData.caseTypes || 
                        analyticsData.departmentUtilization || 
                        analyticsData.emergencyTypes ||
                        analyticsData.taskDistribution ||
                        []).map((entry: any, index: number) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Detailed Analytics */}
        <Card>
          <CardHeader>
            <CardTitle>Detailed Reports</CardTitle>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="summary">
              <TabsList>
                <TabsTrigger value="summary">Summary</TabsTrigger>
                <TabsTrigger value="trends">Trends</TabsTrigger>
                <TabsTrigger value="insights">Insights</TabsTrigger>
              </TabsList>
              
              <TabsContent value="summary" className="mt-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-4">
                    <h3 className="font-semibold">Performance Summary</h3>
                    {user?.role === 'user' && (
                      <div className="space-y-2">
                        <div className="flex justify-between">
                          <span>Health Score Trend:</span>
                          <Badge variant="outline" className="bg-green-50 text-green-700">Improving</Badge>
                        </div>
                        <div className="flex justify-between">
                          <span>Medication Compliance:</span>
                          <Badge variant="outline" className="bg-blue-50 text-blue-700">Excellent</Badge>
                        </div>
                        <div className="flex justify-between">
                          <span>Exercise Goals:</span>
                          <Badge variant="outline" className="bg-amber-50 text-amber-700">Needs Attention</Badge>
                        </div>
                      </div>
                    )}
                    {user?.role === 'ambulance' && (
                      <div className="space-y-2">
                        <div className="flex justify-between">
                          <span>Response Time:</span>
                          <Badge variant="outline" className="bg-green-50 text-green-700">Under Target</Badge>
                        </div>
                        <div className="flex justify-between">
                          <span>Success Rate:</span>
                          <Badge variant="outline" className="bg-green-50 text-green-700">Excellent</Badge>
                        </div>
                        <div className="flex justify-between">
                          <span>Vehicle Maintenance:</span>
                          <Badge variant="outline" className="bg-blue-50 text-blue-700">Up to Date</Badge>
                        </div>
                      </div>
                    )}
                    {user?.role === 'hospital' && (
                      <div className="space-y-2">
                        <div className="flex justify-between">
                          <span>Bed Occupancy:</span>
                          <Badge variant="outline" className="bg-amber-50 text-amber-700">High</Badge>
                        </div>
                        <div className="flex justify-between">
                          <span>Patient Satisfaction:</span>
                          <Badge variant="outline" className="bg-green-50 text-green-700">Excellent</Badge>
                        </div>
                        <div className="flex justify-between">
                          <span>Staff Efficiency:</span>
                          <Badge variant="outline" className="bg-blue-50 text-blue-700">Good</Badge>
                        </div>
                      </div>
                    )}
                  </div>
                  <div className="space-y-4">
                    <h3 className="font-semibold">Key Recommendations</h3>
                    <div className="space-y-2 text-sm">
                      {user?.role === 'user' && (
                        <>
                          <p>• Increase daily exercise to meet step goals</p>
                          <p>• Schedule annual eye examination</p>
                          <p>• Continue excellent medication compliance</p>
                        </>
                      )}
                      {user?.role === 'ambulance' && (
                        <>
                          <p>• Optimize route planning for better response times</p>
                          <p>• Schedule preventive maintenance check</p>
                          <p>• Update emergency protocols training</p>
                        </>
                      )}
                      {user?.role === 'hospital' && (
                        <>
                          <p>• Consider expanding ICU capacity</p>
                          <p>• Implement staff scheduling optimization</p>
                          <p>• Review patient discharge processes</p>
                        </>
                      )}
                    </div>
                  </div>
                </div>
              </TabsContent>
              
              <TabsContent value="trends" className="mt-4">
                <p className="text-gray-600">Detailed trend analysis and historical comparisons will be displayed here.</p>
              </TabsContent>
              
              <TabsContent value="insights" className="mt-4">
                <p className="text-gray-600">AI-powered insights and predictions will be displayed here.</p>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default AnalyticsPage;
