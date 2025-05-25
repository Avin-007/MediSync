import React, { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import DashboardLayout from '@/components/dashboard/DashboardLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, LineChart, Line, PieChart, Pie, Cell } from 'recharts';
import { TrendingUp, Activity, Clock, Users, DollarSign, AlertCircle, Brain, Zap } from 'lucide-react';

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
            },
            smartRecommendations: [
              "Increase daily steps to 10,000 for better cardiovascular health",
              "Schedule a dental checkup - it's been 6 months",
              "Consider a nutritionist consultation based on your health goals"
            ]
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
            },
            smartRecommendations: [
              "Route optimization could reduce response time by 15%",
              "Vehicle maintenance scheduled for next week",
              "Consider backup ambulance for high-traffic hours"
            ]
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
            },
            smartRecommendations: [
              "ICU capacity reaching critical levels - consider patient transfers",
              "Staff scheduling optimization could improve efficiency",
              "Emergency department needs additional triage nurse"
            ]
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
            },
            smartRecommendations: [
              "Preemptive signal timing could reduce clearance time",
              "High congestion expected during rush hour - prepare protocols",
              "Coordinate with emergency services for faster response"
            ]
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
            },
            smartRecommendations: [
              "Medication rounds optimization could save 30 minutes daily",
              "Patient care documentation needs attention",
              "Consider delegation for routine vital checks"
            ]
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
      description="Track key metrics and performance indicators with AI-powered insights"
      headerActions={
        <div className="flex gap-2">
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
          <Badge variant="outline" className="bg-green-50 text-green-700">
            <Activity className="h-3 w-3 mr-1" />
            Live Data
          </Badge>
        </div>
      }
    >
      <div className="space-y-6">
        {/* AI-Powered Smart Recommendations */}
        {analyticsData.smartRecommendations && (
          <Card className="border-2 border-blue-200 bg-blue-50/50">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Brain className="h-5 w-5 text-blue-600" />
                Smart Recommendations
                <Badge variant="outline" className="bg-blue-100 text-blue-700">AI-Powered</Badge>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {analyticsData.smartRecommendations.map((recommendation: string, index: number) => (
                  <div key={index} className="flex items-start gap-2 p-2 bg-white rounded-md">
                    <Zap className="h-4 w-4 text-blue-500 mt-0.5 flex-shrink-0" />
                    <span className="text-sm">{recommendation}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}

        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {analyticsData.stats && Object.entries(analyticsData.stats).map(([key, value]) => (
            <Card key={key} className="hover:shadow-md transition-shadow">
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
              <CardTitle className="flex items-center justify-between">
                <span>
                  {user?.role === 'user' && 'Health Trends'}
                  {user?.role === 'ambulance' && 'Response Metrics'}
                  {user?.role === 'hospital' && 'Patient Flow'}
                  {user?.role === 'traffic' && 'Traffic Management'}
                  {user?.role === 'nurse' && 'Patient Care Activities'}
                </span>
                <Badge variant="outline" className="bg-green-50 text-green-700">
                  Real-time
                </Badge>
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

        {/* Enhanced Detailed Analytics */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BarChart className="h-5 w-5" />
              Advanced Analytics & Insights
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="summary">
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="summary">Performance Summary</TabsTrigger>
                <TabsTrigger value="trends">Trend Analysis</TabsTrigger>
                <TabsTrigger value="insights">AI Insights</TabsTrigger>
                <TabsTrigger value="alerts">Smart Alerts</TabsTrigger>
              </TabsList>
              
              <TabsContent value="summary" className="mt-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-4">
                    <h3 className="font-semibold flex items-center gap-2">
                      <TrendingUp className="h-4 w-4" />
                      Performance Summary
                    </h3>
                    {user?.role === 'user' && (
                      <>
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
                      </>
                    )}
                    {user?.role === 'ambulance' && (
                      <>
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
                      </>
                    )}
                    {user?.role === 'hospital' && (
                      <>
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
                      </>
                    )}
                  </div>
                  <div className="space-y-4">
                    <h3 className="font-semibold flex items-center gap-2">
                      <Brain className="h-4 w-4" />
                      Key Recommendations
                    </h3>
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
                <div className="space-y-4">
                  <h3 className="font-semibold">Trend Analysis</h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <Card className="p-4">
                      <h4 className="font-medium text-sm">Weekly Performance</h4>
                      <p className="text-2xl font-bold text-green-600">+15%</p>
                      <p className="text-xs text-gray-500">Compared to last week</p>
                    </Card>
                    <Card className="p-4">
                      <h4 className="font-medium text-sm">Monthly Growth</h4>
                      <p className="text-2xl font-bold text-blue-600">+8%</p>
                      <p className="text-xs text-gray-500">Consistent improvement</p>
                    </Card>
                    <Card className="p-4">
                      <h4 className="font-medium text-sm">Efficiency Score</h4>
                      <p className="text-2xl font-bold text-purple-600">92%</p>
                      <p className="text-xs text-gray-500">Above target of 85%</p>
                    </Card>
                  </div>
                </div>
              </TabsContent>
              
              <TabsContent value="insights" className="mt-4">
                <div className="space-y-4">
                  <h3 className="font-semibold flex items-center gap-2">
                    <Brain className="h-4 w-4" />
                    AI-Powered Insights
                  </h3>
                  <div className="space-y-3">
                    <div className="p-4 bg-blue-50 rounded-lg">
                      <h4 className="font-medium text-blue-800">Pattern Recognition</h4>
                      <p className="text-sm text-blue-700 mt-1">
                        AI has detected optimal performance patterns during morning hours. Consider adjusting schedules accordingly.
                      </p>
                    </div>
                    <div className="p-4 bg-green-50 rounded-lg">
                      <h4 className="font-medium text-green-800">Predictive Analysis</h4>
                      <p className="text-sm text-green-700 mt-1">
                        Based on current trends, expect 20% improvement in key metrics over the next month.
                      </p>
                    </div>
                    <div className="p-4 bg-purple-50 rounded-lg">
                      <h4 className="font-medium text-purple-800">Optimization Opportunities</h4>
                      <p className="text-sm text-purple-700 mt-1">
                        Machine learning suggests workflow adjustments that could increase efficiency by 12%.
                      </p>
                    </div>
                  </div>
                </div>
              </TabsContent>
              
              <TabsContent value="alerts" className="mt-4">
                <div className="space-y-4">
                  <h3 className="font-semibold flex items-center gap-2">
                    <AlertCircle className="h-4 w-4" />
                    Smart Alerts & Notifications
                  </h3>
                  <div className="space-y-3">
                    <div className="p-4 border-l-4 border-red-500 bg-red-50">
                      <div className="flex items-center gap-2">
                        <AlertCircle className="h-4 w-4 text-red-500" />
                        <h4 className="font-medium text-red-800">Critical Alert</h4>
                      </div>
                      <p className="text-sm text-red-700 mt-1">
                        Response time exceeding target by 25%. Immediate attention required.
                      </p>
                    </div>
                    <div className="p-4 border-l-4 border-amber-500 bg-amber-50">
                      <div className="flex items-center gap-2">
                        <Clock className="h-4 w-4 text-amber-500" />
                        <h4 className="font-medium text-amber-800">Warning</h4>
                      </div>
                      <p className="text-sm text-amber-700 mt-1">
                        Scheduled maintenance due in 2 days. Plan accordingly.
                      </p>
                    </div>
                    <div className="p-4 border-l-4 border-blue-500 bg-blue-50">
                      <div className="flex items-center gap-2">
                        <TrendingUp className="h-4 w-4 text-blue-500" />
                        <h4 className="font-medium text-blue-800">Performance Update</h4>
                      </div>
                      <p className="text-sm text-blue-700 mt-1">
                        Weekly targets achieved ahead of schedule. Great work!
                      </p>
                    </div>
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>

        {/* Real-time Status Updates */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Activity className="h-5 w-5" />
              Real-time Status Updates
              <Badge variant="outline" className="bg-green-50 text-green-700">
                <div className="w-2 h-2 bg-green-500 rounded-full mr-1 animate-pulse"></div>
                Live
              </Badge>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span className="font-medium">System Status</span>
                </div>
                <Badge variant="outline" className="bg-green-100 text-green-700">All Systems Operational</Badge>
              </div>
              <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
                  <span className="font-medium">Data Sync</span>
                </div>
                <Badge variant="outline" className="bg-blue-100 text-blue-700">Syncing...</Badge>
              </div>
              <div className="flex items-center justify-between p-3 bg-purple-50 rounded-lg">
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                  <span className="font-medium">AI Analysis</span>
                </div>
                <Badge variant="outline" className="bg-purple-100 text-purple-700">Processing Insights</Badge>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default AnalyticsPage;
