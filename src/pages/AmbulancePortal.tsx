
import React, { useState } from 'react';
import Header from '@/components/Header';
import MapComponent from '@/components/MapComponent';
import RouteNavigator from '@/components/ambulance/RouteNavigator';
import StatusUpdater from '@/components/ambulance/StatusUpdater';

const AmbulancePortal = () => {
  const [destination, setDestination] = useState<{ name: string; lat: number; lng: number } | undefined>();

  const handleRouteSet = (destinationName: string) => {
    // In a real app, we would geocode the address to get coordinates
    setDestination({
      name: destinationName,
      lat: 34.052235 + (Math.random() * 0.02 - 0.01),
      lng: -118.243683 + (Math.random() * 0.02 - 0.01)
    });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main className="container mx-auto py-8 px-4">
        <div className="max-w-6xl mx-auto space-y-8">
          <div>
            <h1 className="text-2xl font-bold">Ambulance Driver Portal</h1>
            <p className="text-gray-500">Manage emergency routes and update your status</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2">
              <MapComponent destination={destination} />
            </div>
            <div className="space-y-6">
              <RouteNavigator onRouteSet={handleRouteSet} />
              <StatusUpdater />
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
            <h2 className="text-lg font-medium mb-4">Emergency Contact Information</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-4 bg-gray-50 rounded-md">
                <h3 className="text-sm font-medium text-gray-500">Dispatch Center</h3>
                <p className="font-medium">+1 (555) 123-4567</p>
              </div>
              <div className="p-4 bg-gray-50 rounded-md">
                <h3 className="text-sm font-medium text-gray-500">Technical Support</h3>
                <p className="font-medium">+1 (555) 987-6543</p>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default AmbulancePortal;
