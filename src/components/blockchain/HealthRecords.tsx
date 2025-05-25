
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Shield, Lock, Share, History, FileText, Key } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface HealthRecord {
  id: string;
  date: string;
  type: 'consultation' | 'lab' | 'prescription' | 'surgery';
  provider: string;
  summary: string;
  hash: string;
  verified: boolean;
}

interface AccessRequest {
  id: string;
  requester: string;
  institution: string;
  purpose: string;
  recordTypes: string[];
  status: 'pending' | 'approved' | 'denied';
  expiry: string;
}

const HealthRecords: React.FC = () => {
  const { toast } = useToast();
  const [records, setRecords] = useState<HealthRecord[]>([]);
  const [accessRequests, setAccessRequests] = useState<AccessRequest[]>([]);
  const [newRecordHash, setNewRecordHash] = useState('');

  useEffect(() => {
    // Simulate blockchain health records
    setRecords([
      {
        id: '1',
        date: '2024-01-15',
        type: 'consultation',
        provider: 'Bir Hospital',
        summary: 'General checkup - Normal blood pressure, recommended lifestyle changes',
        hash: '0x1a2b3c4d5e6f...',
        verified: true
      },
      {
        id: '2',
        date: '2024-01-10',
        type: 'lab',
        provider: 'NepalMed Lab',
        summary: 'Blood work - Cholesterol levels slightly elevated',
        hash: '0x2b3c4d5e6f7a...',
        verified: true
      },
      {
        id: '3',
        date: '2024-01-05',
        type: 'prescription',
        provider: 'City Pharmacy',
        summary: 'Prescribed medication for seasonal allergies',
        hash: '0x3c4d5e6f7a8b...',
        verified: true
      }
    ]);

    setAccessRequests([
      {
        id: '1',
        requester: 'Dr. Sarah Johnson',
        institution: 'Patan Hospital',
        purpose: 'Emergency treatment consultation',
        recordTypes: ['consultation', 'lab'],
        status: 'pending',
        expiry: '2024-02-15'
      },
      {
        id: '2',
        requester: 'Insurance Team',
        institution: 'Nepal Insurance',
        purpose: 'Claim verification',
        recordTypes: ['prescription'],
        status: 'pending',
        expiry: '2024-02-20'
      }
    ]);
  }, []);

  const handleAccessRequest = (requestId: string, action: 'approve' | 'deny') => {
    setAccessRequests(prev => 
      prev.map(req => 
        req.id === requestId 
          ? { ...req, status: action === 'approve' ? 'approved' : 'denied' }
          : req
      )
    );
    
    toast({
      title: `Access ${action === 'approve' ? 'Granted' : 'Denied'}`,
      description: `Health record access has been ${action === 'approve' ? 'approved' : 'denied'}.`
    });
  };

  const addNewRecord = () => {
    if (!newRecordHash.trim()) return;
    
    const newRecord: HealthRecord = {
      id: Date.now().toString(),
      date: new Date().toISOString().split('T')[0],
      type: 'consultation',
      provider: 'Manual Entry',
      summary: 'Record added via blockchain verification',
      hash: newRecordHash,
      verified: false
    };
    
    setRecords(prev => [newRecord, ...prev]);
    setNewRecordHash('');
    
    toast({
      title: 'Record Added',
      description: 'New health record has been added to blockchain for verification.'
    });
  };

  const getRecordTypeColor = (type: string) => {
    switch (type) {
      case 'consultation': return 'bg-blue-100 text-blue-800';
      case 'lab': return 'bg-green-100 text-green-800';
      case 'prescription': return 'bg-purple-100 text-purple-800';
      case 'surgery': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'approved': return 'bg-green-100 text-green-800';
      case 'denied': return 'bg-red-100 text-red-800';
      case 'pending': return 'bg-amber-100 text-amber-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Shield className="h-5 w-5 text-blue-600" />
            Blockchain Health Records
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="records">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="records">My Records</TabsTrigger>
              <TabsTrigger value="access">Access Requests</TabsTrigger>
              <TabsTrigger value="add">Add Record</TabsTrigger>
            </TabsList>

            <TabsContent value="records" className="space-y-4">
              {records.map((record) => (
                <div key={record.id} className="border rounded-lg p-4">
                  <div className="flex justify-between items-start mb-2">
                    <div className="flex items-center gap-2">
                      <Badge className={getRecordTypeColor(record.type)}>
                        {record.type}
                      </Badge>
                      {record.verified && (
                        <Badge className="bg-green-100 text-green-800">
                          <Shield className="h-3 w-3 mr-1" />
                          Verified
                        </Badge>
                      )}
                    </div>
                    <span className="text-sm text-gray-500">{record.date}</span>
                  </div>
                  <h3 className="font-medium mb-1">{record.provider}</h3>
                  <p className="text-sm text-gray-600 mb-2">{record.summary}</p>
                  <div className="flex items-center gap-2 text-xs text-gray-500">
                    <Key className="h-3 w-3" />
                    <span className="font-mono">{record.hash}</span>
                  </div>
                </div>
              ))}
            </TabsContent>

            <TabsContent value="access" className="space-y-4">
              {accessRequests.map((request) => (
                <div key={request.id} className="border rounded-lg p-4">
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <h3 className="font-medium">{request.requester}</h3>
                      <p className="text-sm text-gray-600">{request.institution}</p>
                    </div>
                    <Badge className={getStatusColor(request.status)}>
                      {request.status}
                    </Badge>
                  </div>
                  <p className="text-sm mb-2"><strong>Purpose:</strong> {request.purpose}</p>
                  <p className="text-sm mb-2"><strong>Record Types:</strong> {request.recordTypes.join(', ')}</p>
                  <p className="text-sm text-gray-500 mb-3">Expires: {request.expiry}</p>
                  
                  {request.status === 'pending' && (
                    <div className="flex gap-2">
                      <Button 
                        size="sm" 
                        onClick={() => handleAccessRequest(request.id, 'approve')}
                        className="bg-green-600 hover:bg-green-700"
                      >
                        Approve
                      </Button>
                      <Button 
                        size="sm" 
                        variant="outline"
                        onClick={() => handleAccessRequest(request.id, 'deny')}
                      >
                        Deny
                      </Button>
                    </div>
                  )}
                </div>
              ))}
            </TabsContent>

            <TabsContent value="add" className="space-y-4">
              <div className="border rounded-lg p-4">
                <Label htmlFor="record-hash">Blockchain Hash</Label>
                <Input
                  id="record-hash"
                  placeholder="Enter blockchain hash for new record"
                  value={newRecordHash}
                  onChange={(e) => setNewRecordHash(e.target.value)}
                  className="mt-1"
                />
                <Button 
                  className="mt-3" 
                  onClick={addNewRecord}
                  disabled={!newRecordHash.trim()}
                >
                  Add to Blockchain
                </Button>
              </div>
              
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <h3 className="font-medium text-blue-800 mb-2">How it works:</h3>
                <ul className="text-sm text-blue-700 space-y-1">
                  <li>• Records are stored on secure blockchain</li>
                  <li>• You control who can access your data</li>
                  <li>• All access requests require your approval</li>
                  <li>• Records are immutable and cryptographically verified</li>
                </ul>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};

export default HealthRecords;
