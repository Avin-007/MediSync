
import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useLanguage } from '@/contexts/LanguageContext';
import { Ambulance, User, Hospital, Shield, Brain, Stethoscope, AlertCircle } from 'lucide-react';

interface Node {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  color: string;
  x: number;
  y: number;
}

interface Connection {
  from: string;
  to: string;
  label: string;
  dashed?: boolean;
  color?: string;
}

const FlowDiagram: React.FC = () => {
  const { t } = useLanguage();
  const [activeFlow, setActiveFlow] = useState<'emergency' | 'normal' | 'system'>('emergency');

  // Emergency Flow
  const emergencyNodes: Node[] = [
    { id: 'patient', title: t('patient'), description: t('patientDesc'), icon: <User />, color: '#4c6fff', x: 20, y: 50 },
    { id: 'app', title: t('mediSync'), description: t('mediSyncDesc'), icon: <Brain />, color: '#10b981', x: 50, y: 25 },
    { id: 'ambulance', title: t('ambulance'), description: t('ambulanceDesc'), icon: <Ambulance />, color: '#f59e0b', x: 80, y: 50 },
    { id: 'hospital', title: t('hospital'), description: t('hospitalDesc'), icon: <Hospital />, color: '#ef4444', x: 50, y: 75 },
  ];
  
  const emergencyConnections: Connection[] = [
    { from: 'patient', to: 'app', label: t('requestsEmergency') },
    { from: 'app', to: 'ambulance', label: t('notifiesNearest') },
    { from: 'ambulance', to: 'patient', label: t('respondsTo') },
    { from: 'ambulance', to: 'hospital', label: t('transportsTo') },
    { from: 'app', to: 'hospital', label: t('sharesData'), dashed: true, color: '#4c6fff' },
    { from: 'hospital', to: 'app', label: t('updatesStatus'), dashed: true, color: '#ef4444' },
  ];

  // Normal Flow
  const normalNodes: Node[] = [
    { id: 'patient', title: t('patient'), description: t('patientDesc'), icon: <User />, color: '#4c6fff', x: 20, y: 50 },
    { id: 'app', title: t('mediSync'), description: t('mediSyncDesc'), icon: <Brain />, color: '#10b981', x: 50, y: 25 },
    { id: 'doctor', title: t('doctor'), description: t('doctorDesc'), icon: <Stethoscope />, color: '#8b5cf6', x: 80, y: 50 },
    { id: 'hospital', title: t('hospital'), description: t('hospitalDesc'), icon: <Hospital />, color: '#ef4444', x: 50, y: 75 },
  ];
  
  const normalConnections: Connection[] = [
    { from: 'patient', to: 'app', label: t('managesHealth') },
    { from: 'app', to: 'doctor', label: t('schedulesWith') },
    { from: 'doctor', to: 'patient', label: t('provides') },
    { from: 'hospital', to: 'patient', label: t('servesAt') },
    { from: 'app', to: 'hospital', label: t('sharesRecords'), dashed: true, color: '#4c6fff' },
  ];

  // System Flow
  const systemNodes: Node[] = [
    { id: 'users', title: t('users'), description: t('usersDesc'), icon: <User />, color: '#4c6fff', x: 20, y: 33 },
    { id: 'services', title: t('services'), description: t('servicesDesc'), icon: <Ambulance />, color: '#f59e0b', x: 20, y: 66 },
    { id: 'app', title: t('mediSync'), description: t('mediSyncSystemDesc'), icon: <Brain />, color: '#10b981', x: 50, y: 50 },
    { id: 'hospitals', title: t('hospitals'), description: t('hospitalsDesc'), icon: <Hospital />, color: '#ef4444', x: 80, y: 33 },
    { id: 'government', title: t('government'), description: t('governmentDesc'), icon: <Shield />, color: '#8b5cf6', x: 80, y: 66 },
  ];
  
  const systemConnections: Connection[] = [
    { from: 'users', to: 'app', label: t('uses') },
    { from: 'services', to: 'app', label: t('operatesThrough') },
    { from: 'app', to: 'hospitals', label: t('connectsWith') },
    { from: 'app', to: 'government', label: t('compliesWith') },
    { from: 'hospitals', to: 'app', label: t('integrates'), dashed: true, color: '#ef4444' },
    { from: 'government', to: 'app', label: t('regulates'), dashed: true, color: '#8b5cf6' },
  ];

  const renderDiagram = (nodes: Node[], connections: Connection[]) => {
    return (
      <svg className="w-full h-[500px]" viewBox="0 0 100 100" preserveAspectRatio="xMidYMid meet">
        {/* Render connections first so they're behind nodes */}
        {connections.map((conn, idx) => {
          const fromNode = nodes.find(n => n.id === conn.from);
          const toNode = nodes.find(n => n.id === conn.to);
          
          if (!fromNode || !toNode) return null;
          
          // Calculate connection line
          const x1 = fromNode.x;
          const y1 = fromNode.y;
          const x2 = toNode.x;
          const y2 = toNode.y;
          
          // Calculate control points for curved lines
          const midX = (x1 + x2) / 2;
          const midY = (y1 + y2) / 2;
          const curvature = 15; // Adjust for more or less curve
          
          // Adjust control point based on vertical or horizontal alignment
          const dx = x2 - x1;
          const dy = y2 - y1;
          const isMoreHorizontal = Math.abs(dx) > Math.abs(dy);
          
          let controlX, controlY;
          if (isMoreHorizontal) {
            controlX = midX;
            controlY = midY + (y1 < y2 ? curvature : -curvature);
          } else {
            controlX = midX + (x1 < x2 ? curvature : -curvature);
            controlY = midY;
          }
          
          const path = `M${x1} ${y1} Q${controlX} ${controlY} ${x2} ${y2}`;
          
          // Calculate position for the label
          const labelX = controlX;
          const labelY = controlY + (isMoreHorizontal ? -2 : 0);
          
          return (
            <g key={`conn-${idx}`}>
              <path 
                d={path} 
                fill="none" 
                stroke={conn.color || "#888"} 
                strokeWidth="0.5" 
                strokeDasharray={conn.dashed ? "1,1" : "none"}
                markerEnd="url(#arrowhead)"
              />
              <text 
                x={labelX} 
                y={labelY} 
                textAnchor="middle" 
                fill="#555" 
                fontSize="2"
                className="pointer-events-none"
              >
                {conn.label}
              </text>
            </g>
          );
        })}
        
        {/* Define arrow marker */}
        <defs>
          <marker
            id="arrowhead"
            markerWidth="4"
            markerHeight="4"
            refX="2"
            refY="2"
            orient="auto"
          >
            <path d="M0,0 L0,4 L4,2 Z" fill="#888" />
          </marker>
        </defs>
        
        {/* Render nodes */}
        {nodes.map((node) => (
          <g key={node.id} className="cursor-pointer">
            <circle 
              cx={node.x} 
              cy={node.y} 
              r="6" 
              fill={node.color}
              stroke="white"
              strokeWidth="1"
              className="shadow-lg"
            />
            <foreignObject x={node.x - 8} y={node.y - 8} width="16" height="16">
              <div className="h-full w-full flex items-center justify-center text-white">
                {node.icon}
              </div>
            </foreignObject>
            <text x={node.x} y={node.y + 9} textAnchor="middle" fill="#333" fontWeight="bold" fontSize="2.5">
              {node.title}
            </text>
            <text x={node.x} y={node.y + 12} textAnchor="middle" fill="#666" fontSize="1.8">
              {node.description}
            </text>
          </g>
        ))}
      </svg>
    );
  };

  return (
    <Card className="border shadow-md">
      <CardHeader>
        <CardTitle className="text-2xl">{t('systemFlowDiagram')}</CardTitle>
        <CardDescription>{t('systemFlowDescription')}</CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs value={activeFlow} onValueChange={(v) => setActiveFlow(v as any)} className="space-y-4">
          <TabsList className="grid grid-cols-3">
            <TabsTrigger value="emergency" className="flex items-center gap-2">
              <AlertCircle size={16} /> {t('emergencyFlow')}
            </TabsTrigger>
            <TabsTrigger value="normal" className="flex items-center gap-2">
              <User size={16} /> {t('patientFlow')}
            </TabsTrigger>
            <TabsTrigger value="system" className="flex items-center gap-2">
              <Brain size={16} /> {t('systemArchitecture')}
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="emergency" className="rounded-md">
            {renderDiagram(emergencyNodes, emergencyConnections)}
          </TabsContent>
          
          <TabsContent value="normal" className="rounded-md">
            {renderDiagram(normalNodes, normalConnections)}
          </TabsContent>
          
          <TabsContent value="system" className="rounded-md">
            {renderDiagram(systemNodes, systemConnections)}
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default FlowDiagram;
