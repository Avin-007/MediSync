
import React, { useState } from 'react';
import Header from '@/components/Header';
import MapComponent from '@/components/MapComponent';
import EmergencyRequest from '@/components/user/EmergencyRequest';
import EmergencyStatus from '@/components/user/EmergencyStatus';

const UserPortal = () => {
  const [hasActiveEmergency, setHasActiveEmergency] = useState(false);

  // In a real app, we would get the user's current location
  const emergencyLocations = [
    { name: "Active Emergency", lat: 34.052235, lng: -118.243683 }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main className="container mx-auto py-8 px-4">
        <div className="max-w-6xl mx-auto space-y-8">
          <div>
            <h1 className="text-2xl font-bold">Patient Portal</h1>
            <p className="text-gray-500">Request emergency services and track response</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2">
              <MapComponent 
                emergencies={hasActiveEmergency ? emergencyLocations : []} 
              />
            </div>
            <div className="space-y-6">
              {hasActiveEmergency ? (
                <EmergencyStatus active={true} />
              ) : (
                <EmergencyRequest />
              )}
              
              {!hasActiveEmergency && (
                <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
                  <h2 className="text-lg font-medium mb-4">Contact Information</h2>
                  <div className="space-y-4">
                    <div className="p-4 bg-gray-50 rounded-md">
                      <h3 className="text-sm font-medium text-gray-500">Emergency Hotline</h3>
                      <p className="font-medium">911</p>
                    </div>
                    <div className="p-4 bg-gray-50 rounded-md">
                      <h3 className="text-sm font-medium text-gray-500">Medical Support</h3>
                      <p className="font-medium">+1 (555) 123-4567</p>
                    </div>
                  </div>
                </div>
              )}
              
              {/* Demo controls - in a real app this button wouldn't exist */}
              <div className="flex justify-center">
                <button 
                  className="text-xs text-gray-500 underline"
                  onClick={() => setHasActiveEmergency(!hasActiveEmergency)}
                >
                  Demo: {hasActiveEmergency ? 'Clear' : 'Show'} Emergency Status
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default UserPortal;
