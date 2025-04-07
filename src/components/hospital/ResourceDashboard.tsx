
import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '../ui/card';

interface ResourceStats {
  ambulancesAvailable: number;
  ambulancesTotal: number;
  nursesAvailable: number;
  nursesTotal: number;
  activeCalls: number;
}

interface ResourceDashboardProps {
  stats?: ResourceStats;
}

const ResourceDashboard: React.FC<ResourceDashboardProps> = ({
  stats = {
    ambulancesAvailable: 4,
    ambulancesTotal: 6,
    nursesAvailable: 8,
    nursesTotal: 12,
    activeCalls: 3
  }
}) => {
  return (
    <Card className="shadow-md">
      <CardHeader>
        <CardTitle>Resource Dashboard</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <StatCard 
            title="Ambulances"
            available={stats.ambulancesAvailable}
            total={stats.ambulancesTotal}
            color="bg-medisync-light-blue"
          />
          <StatCard 
            title="Nurses"
            available={stats.nursesAvailable}
            total={stats.nursesTotal}
            color="bg-medisync-light-red"
          />
          <StatCard 
            title="Active Calls"
            count={stats.activeCalls}
            color="bg-yellow-50"
            textColor="text-yellow-700"
          />
        </div>
      </CardContent>
    </Card>
  );
};

interface StatCardProps {
  title: string;
  available?: number;
  total?: number;
  count?: number;
  color: string;
  textColor?: string;
}

const StatCard: React.FC<StatCardProps> = ({ 
  title, 
  available, 
  total,
  count,
  color,
  textColor = "text-gray-700"
}) => {
  return (
    <div className={`${color} p-4 rounded-lg`}>
      <h3 className="text-sm font-medium text-gray-500">{title}</h3>
      
      {(available !== undefined && total !== undefined) ? (
        <>
          <p className={`text-2xl font-bold ${textColor}`}>
            {available} <span className="text-gray-400">/ {total}</span>
          </p>
          <div className="mt-2 h-2 bg-gray-200 rounded-full overflow-hidden">
            <div 
              className="h-full bg-medisync-blue rounded-full"
              style={{ width: `${(available / total) * 100}%` }}
            ></div>
          </div>
          <p className="mt-1 text-xs text-gray-500">
            {Math.round((available / total) * 100)}% Available
          </p>
        </>
      ) : (
        <p className={`text-2xl font-bold ${textColor}`}>{count}</p>
      )}
    </div>
  );
};

export default ResourceDashboard;
