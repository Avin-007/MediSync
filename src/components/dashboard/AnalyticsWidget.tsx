
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, PieChart, Pie, Cell } from 'recharts';

interface AnalyticsProps {
  title: string;
  data: any[];
  chartType?: 'area' | 'bar' | 'pie';
  dataKey?: string;
  categories?: string[];
  colors?: string[];
}

const AnalyticsWidget: React.FC<AnalyticsProps> = ({ 
  title, 
  data, 
  chartType = 'area',
  dataKey = 'value',
  categories = ['category'],
  colors = ['#4C6FFF', '#FF577F', '#10B981', '#F59E0B']
}) => {
  const renderChart = () => {
    switch(chartType) {
      case 'area':
        return (
          <ResponsiveContainer width="100%" height={200}>
            <AreaChart data={data} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
              <defs>
                {categories.map((cat, index) => (
                  <linearGradient key={cat} id={`color-${cat}`} x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor={colors[index % colors.length]} stopOpacity={0.8} />
                    <stop offset="95%" stopColor={colors[index % colors.length]} stopOpacity={0.1} />
                  </linearGradient>
                ))}
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="name" fontSize={10} tickMargin={5} />
              <YAxis fontSize={10} tickMargin={5} />
              <Tooltip />
              {categories.map((cat, index) => (
                <Area 
                  key={cat}
                  type="monotone" 
                  dataKey={cat} 
                  stroke={colors[index % colors.length]} 
                  fillOpacity={1} 
                  fill={`url(#color-${cat})`} 
                />
              ))}
            </AreaChart>
          </ResponsiveContainer>
        );
      
      case 'bar':
        return (
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={data} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="name" fontSize={10} />
              <YAxis fontSize={10} />
              <Tooltip />
              {categories.map((cat, index) => (
                <Bar 
                  key={cat} 
                  dataKey={cat} 
                  fill={colors[index % colors.length]} 
                  radius={[4, 4, 0, 0]} 
                />
              ))}
            </BarChart>
          </ResponsiveContainer>
        );
      
      case 'pie':
        return (
          <ResponsiveContainer width="100%" height={200}>
            <PieChart>
              <Pie
                data={data}
                cx="50%"
                cy="50%"
                innerRadius={50}
                outerRadius={70}
                fill="#8884d8"
                paddingAngle={2}
                dataKey={dataKey}
                label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
              >
                {data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        );
      
      default:
        return null;
    }
  };

  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-md font-medium">{title}</CardTitle>
      </CardHeader>
      <CardContent className="pt-0">
        {renderChart()}
      </CardContent>
    </Card>
  );
};

export default AnalyticsWidget;
