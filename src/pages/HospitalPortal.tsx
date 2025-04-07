
import React from 'react';
import Header from '@/components/Header';
import MapComponent from '@/components/MapComponent';
import ResourceDashboard from '@/components/hospital/ResourceDashboard';
import EmergencyList from '@/components/hospital/EmergencyList';

const HospitalPortal = () => {
  // In a real app, these would come from a backend API
  const emergencyLocations = [
    { name: "Emergency #1", lat: 34.052235, lng: -118.243683 },
    { name: "Emergency #2", lat: 34.062235, lng: -118.253683 },
    { name: "Emergency #3", lat: 34.042235, lng: -118.233683 },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main className="container mx-auto py-8 px-4">
        <div className="max-w-6xl mx-auto space-y-8">
          <div>
            <h1 className="text-2xl font-bold">Hospital Admin Portal</h1>
            <p className="text-gray-500">Monitor resources and manage emergency responses</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2">
              <MapComponent emergencies={emergencyLocations} />
            </div>
            <div>
              <ResourceDashboard />
            </div>
          </div>

          <div className="grid grid-cols-1 gap-6">
            <EmergencyList />
          </div>
        </div>
      </main>
    </div>
  );
};

export default HospitalPortal;
