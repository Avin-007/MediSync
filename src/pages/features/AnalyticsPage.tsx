import React, { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import DashboardLayout from '@/components/dashboard/DashboardLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { 
  TrendingUp, 
  Users, 
  Activity, 
  Clock, 
  AlertTriangle, 
  CheckCircle,
  Brain,
  Zap,
  Target,
  BarChart3
} from 'lucide-react';
import AnalyticsWidget from '@/components/dashboard/AnalyticsWidget';

const AnalyticsPage = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [timeRange, setTimeRange] = useState('7d');
  const [activeTab, setActiveTab] = useState('overview');

  // Mock analytics data - in real app this would come from API
  const [analyticsData, setAnalyticsData] = useState({
    overview: {
      totalUsers: 15432,
      activeEmergencies: 23,
      responseTime: 8.5,
      satisfactionRate: 94.2
    },
    trends: [
      { name: 'Mon', emergencies: 45, responses: 43, satisfaction: 92 },
      { name: 'Tue', emergencies: 52, responses: 50, satisfaction: 94 },
      { name: 'Wed', emergencies: 38, responses: 37, satisfaction: 96 },
      { name: 'Thu', emergencies: 41, responses: 40, satisfaction: 93 },
      { name: 'Fri', emergencies: 47, responses: 46, satisfaction: 95 },
      { name: 'Sat', emergencies: 35, responses: 34, satisfaction: 97 },
      { name: 'Sun', emergencies: 29, responses: 28, satisfaction: 96 }
    ],
    aiInsights: {
      predictions: [
        "Emergency calls likely to increase by 15% this weekend due to weather conditions",
        "Traffic congestion expected in Ring Road area between 4-6 PM",
        "Recommend increasing ambulance availability in Thamel area",
        "Blood supply running low - initiate donation campaign"
      ],
      recommendations: [
        "Deploy 2 additional ambulances to high-traffic areas",
        "Schedule preventive maintenance for 3 vehicles",
        "Conduct training session for new protocols",
        "Update emergency contact database"
      ]
    }
  });

  const getRoleSpecificMetrics = () => {
    switch(user?.role) {
      case 'user':
        return {
          title: 'Health Analytics',
          metrics: [
            { label: 'Health Score', value: '87%', trend: '+5%', icon: Activity },
            { label: 'Appointments', value: '12', trend: '+2', icon: Clock },
            { label: 'Medications', value: '3', trend: '0', icon: CheckCircle },
            { label: 'Alerts', value: '1', trend: '-2', icon: AlertTriangle }
          ]
        };
      case 'ambulance':
        return {
          title: 'Emergency Response Analytics',
          metrics: [
            { label: 'Response Time', value: '6.2 min', trend: '-0.8 min', icon: Clock },
            { label: 'Calls Today', value: '18', trend: '+3', icon: Activity },
            { label: 'Success Rate', value: '96%', trend: '+2%', icon: CheckCircle },
            { label: 'Active Units', value: '12', trend: '+1', icon: Users }
          ]
        };
      case 'hospital':
        return {
          title: 'Hospital Operations Analytics',
          metrics: [
            { label: 'Bed Occupancy', value: '78%', trend: '+5%', icon: Users },
            { label: 'Avg Wait Time', value: '23 min', trend: '-3 min', icon: Clock },
            { label: 'Patient Satisfaction', value: '4.6/5', trend: '+0.2', icon: CheckCircle },
            { label: 'Emergency Cases', value: '45', trend: '+7', icon: AlertTriangle }
          ]
        };
      case 'traffic':
        return {
          title: 'Traffic Management Analytics',
          metrics: [
            { label: 'Route Clearances', value: '34', trend: '+8', icon: Activity },
            { label: 'Avg Clear Time', value: '4.2 min', trend: '-0.5 min', icon: Clock },
            { label: 'Success Rate', value: '92%', trend: '+3%', icon: CheckCircle },
            { label: 'Active Signals', value: '156', trend: '0', icon: TrendingUp }
          ]
        };
      case 'nurse':
        return {
          title: 'Nursing Care Analytics',
          metrics: [
            { label: 'Patients Assigned', value: '24', trend: '+2', icon: Users },
            { label: 'Care Score', value: '94%', trend: '+1%', icon: CheckCircle },
            { label: 'Avg Response', value: '3.5 min', trend: '-0.2 min', icon: Clock },
            { label: 'Shift Hours', value: '8.5h', trend: '+0.5h', icon: Activity }
          ]
        };
      default:
        return {
          title: 'System Analytics',
          metrics: [
            { label: 'Total Users', value: '15,432', trend: '+1,234', icon: Users },
            { label: 'Active Sessions', value: '2,341', trend: '+156', icon: Activity },
            { label: 'Response Time', value: '1.2s', trend: '-0.1s', icon: Clock },
            { label: 'Uptime', value: '99.9%', trend: '+0.1%', icon: CheckCircle }
          ]
        };
    }
  };

  const roleMetrics = getRoleSpecificMetrics();

  const handleTimeRangeChange = (range: string) => {
    setTimeRange(range);
    toast({
      title: "Time Range Updated",
      description: `Analytics updated for ${range === '7d' ? '7 days' : range === '30d' ? '30 days' : '90 days'}`,
    });
  };

  return (
    <DashboardLayout
      title={roleMetrics.title}
      description="Advanced analytics and insights powered by AI"
      headerActions={
        <div className="flex gap-2">
          <Button 
            variant={timeRange === '7d' ? 'default' : 'outline'} 
            size="sm"
            onClick={() => handleTimeRangeChange('7d')}
          >
            7 Days
          </Button>
          <Button 
            variant={timeRange === '30d' ? 'default' : 'outline'} 
            size="sm"
            onClick={() => handleTimeRangeChange('30d')}
          >
            30 Days
          </Button>
          <Button 
            variant={timeRange === '90d' ? 'default' : 'outline'} 
            size="sm"
            onClick={() => handleTimeRangeChange('90d')}
          >
            90 Days
          </Button>
        </div>
      }
    >
      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList className="grid grid-cols-2 md:grid-cols-4 gap-2">
          <TabsTrigger value="overview" className="flex items-center gap-2">
            <BarChart3 size={16} />
            Overview
          </TabsTrigger>
          <TabsTrigger value="performance" className="flex items-center gap-2">
            <TrendingUp size={16} />
            Performance
          </TabsTrigger>
          <TabsTrigger value="ai-insights" className="flex items-center gap-2">
            <Brain size={16} />
            AI Insights
          </TabsTrigger>
          <TabsTrigger value="predictions" className="flex items-center gap-2">
            <Zap size={16} />
            Predictions
          </TabsTrigger>
        </TabsList>

        <TabsContent value="overview">
          <div className="space-y-6">
            {/* Key Metrics */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {roleMetrics.metrics.map((metric, index) => (
                <Card key={index}>
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-gray-500 mb-1">{metric.label}</p>
                        <p className="text-2xl font-bold">{metric.value}</p>
                        <div className="flex items-center gap-1 mt-1">
                          <Badge 
                            variant={metric.trend.startsWith('+') ? 'default' : metric.trend.startsWith('-') ? 'destructive' : 'secondary'}
                            className="text-xs"
                          >
                            {metric.trend}
                          </Badge>
                        </div>
                      </div>
                      <metric.icon className="h-8 w-8 text-gray-400" />
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Charts */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <AnalyticsWidget 
                title="Weekly Trends"
                data={analyticsData.trends}
                chartType="area"
                categories={['emergencies', 'responses']}
              />
              <AnalyticsWidget 
                title="Satisfaction Rate"
                data={analyticsData.trends}
                chartType="area"
                categories={['satisfaction']}
              />
            </div>
          </div>
        </TabsContent>

        <TabsContent value="performance">
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Activity size={18} />
                  Performance Metrics
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="text-center">
                    <div className="text-3xl font-bold text-green-600">96.2%</div>
                    <div className="text-sm text-gray-500">Success Rate</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-blue-600">6.5 min</div>
                    <div className="text-sm text-gray-500">Avg Response Time</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-purple-600">4.8/5</div>
                    <div className="text-sm text-gray-500">User Rating</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <AnalyticsWidget 
              title="Performance Trends"
              data={analyticsData.trends}
              chartType="bar"
              categories={['emergencies', 'responses', 'satisfaction']}
            />
          </div>
        </TabsContent>

        <TabsContent value="ai-insights">
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Brain size={18} />
                  AI-Powered Insights
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {analyticsData.aiInsights.predictions.map((insight, index) => (
                    <div key={index} className="flex items-start gap-3 p-3 bg-blue-50 rounded-lg">
                      <Brain size={16} className="text-blue-600 mt-0.5" />
                      <p className="text-sm">{insight}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Target size={18} />
                  Smart Recommendations
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {analyticsData.aiInsights.recommendations.map((rec, index) => (
                    <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                      <div className="flex items-center gap-3">
                        <Zap size={16} className="text-amber-500" />
                        <span className="text-sm">{rec}</span>
                      </div>
                      <Button size="sm" variant="outline">
                        Apply
                      </Button>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="predictions">
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Zap size={18} />
                  Predictive Analytics
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <h4 className="font-medium">Next 24 Hours</h4>
                    <div className="space-y-2">
                      <div className="flex justify-between items-center p-2 bg-red-50 rounded">
                        <span className="text-sm">High emergency probability</span>
                        <Badge variant="destructive">85%</Badge>
                      </div>
                      <div className="flex justify-between items-center p-2 bg-amber-50 rounded">
                        <span className="text-sm">Traffic congestion risk</span>
                        <Badge variant="secondary">65%</Badge>
                      </div>
                      <div className="flex justify-between items-center p-2 bg-green-50 rounded">
                        <span className="text-sm">Resource availability</span>
                        <Badge variant="default">92%</Badge>
                      </div>
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    <h4 className="font-medium">Next 7 Days</h4>
                    <div className="space-y-2">
                      <div className="flex justify-between items-center p-2 bg-blue-50 rounded">
                        <span className="text-sm">Demand forecast</span>
                        <Badge variant="outline">+12%</Badge>
                      </div>
                      <div className="flex justify-between items-center p-2 bg-purple-50 rounded">
                        <span className="text-sm">Optimal staffing</span>
                        <Badge variant="outline">18 units</Badge>
                      </div>
                      <div className="flex justify-between items-center p-2 bg-indigo-50 rounded">
                        <span className="text-sm">Cost optimization</span>
                        <Badge variant="outline">-8%</Badge>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <AnalyticsWidget 
              title="Predictive Model Performance"
              data={analyticsData.trends}
              chartType="area"
              categories={['emergencies', 'satisfaction']}
            />
          </div>
        </TabsContent>
      </Tabs>
    </DashboardLayout>
  );
};

export default AnalyticsPage;
