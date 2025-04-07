
import React from 'react';
import { MapPin } from 'lucide-react';

interface Location {
  name: string;
  lat: number;
  lng: number;
}

interface MapComponentProps {
  center?: Location;
  destination?: Location;
  emergencies?: Location[];
}

const MapComponent: React.FC<MapComponentProps> = ({ 
  center = { name: "Current Location", lat: 34.052235, lng: -118.243683 },
  destination,
  emergencies = []
}) => {
  // In a real application, this would be integrated with a mapping API like Google Maps, Mapbox, etc.
  return (
    <div className="relative h-[400px] bg-gray-100 rounded-lg overflow-hidden border-2 border-gray-200">
      <div className="absolute inset-0 bg-[url('https://api.mapbox.com/styles/v1/mapbox/streets-v11/static/-118.243683,34.052235,10/800x400?access_token=pk.dummy')] bg-cover bg-center opacity-70">
        {/* This is a placeholder image - in reality you'd use an actual map API */}
      </div>
      
      {/* Current location pin */}
      <div className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2">
        <div className="flex flex-col items-center">
          <MapPin size={32} className="text-medisync-blue" />
          <span className="bg-white px-2 py-1 rounded text-xs shadow-md">You are here</span>
        </div>
      </div>
      
      {/* Destination pin if provided */}
      {destination && (
        <div className="absolute left-1/3 top-1/3 transform -translate-x-1/2 -translate-y-1/2">
          <div className="flex flex-col items-center">
            <MapPin size={32} className="text-medisync-red" />
            <span className="bg-white px-2 py-1 rounded text-xs shadow-md">{destination.name}</span>
          </div>
        </div>
      )}
      
      {/* Emergency pins */}
      {emergencies.map((emergency, index) => (
        <div 
          key={index}
          className="absolute"
          style={{ left: `${30 + (index * 10)}%`, top: `${40 + (index * 5)}%` }}
        >
          <div className="flex flex-col items-center">
            <div className="relative">
              <MapPin size={32} className="text-medisync-red" />
              <span className="absolute top-0 right-0 h-3 w-3 bg-medisync-red rounded-full animate-pulse-slow"></span>
            </div>
            <span className="bg-white px-2 py-1 rounded text-xs shadow-md">{emergency.name}</span>
          </div>
        </div>
      ))}
      
      <div className="absolute bottom-4 right-4 bg-white p-2 rounded-md shadow-md text-xs">
        <p>Interactive map will be integrated with a mapping API</p>
        <p>This is a static placeholder</p>
      </div>
    </div>
  );
};

export default MapComponent;
