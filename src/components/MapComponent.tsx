
import React, { useEffect, useRef, useState } from 'react';
import { MapPin, Phone } from 'lucide-react';
import { Card, CardContent, CardFooter, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { useToast } from '@/hooks/use-toast';

// Add proper type declarations for Google Maps
declare global {
  interface Window {
    google: typeof google;
  }
}

interface Location {
  name: string;
  lat: number;
  lng: number;
}

interface MapComponentProps {
  center?: Location;
  destination?: Location;
  emergencies?: Location[];
  withContactTraffic?: boolean;
}

const MapComponent: React.FC<MapComponentProps> = ({ 
  center = { name: "Current Location", lat: 34.052235, lng: -118.243683 },
  destination,
  emergencies = [],
  withContactTraffic = false
}) => {
  const mapRef = useRef<HTMLDivElement>(null);
  const [map, setMap] = useState<google.maps.Map | null>(null);
  const [markers, setMarkers] = useState<google.maps.Marker[]>([]);
  const [directionsRenderer, setDirectionsRenderer] = useState<google.maps.DirectionsRenderer | null>(null);
  const [isMapLoaded, setIsMapLoaded] = useState(false);
  const { toast } = useToast();

  // Load Google Maps script
  useEffect(() => {
    // Check if Google Maps script is already loaded
    if (window.google && window.google.maps) {
      setIsMapLoaded(true);
      return;
    }

    const googleMapsScript = document.createElement('script');
    googleMapsScript.src = `https://maps.googleapis.com/maps/api/js?key=YOUR_API_KEY&libraries=places`;
    googleMapsScript.async = true;
    googleMapsScript.defer = true;
    googleMapsScript.onload = () => setIsMapLoaded(true);
    document.head.appendChild(googleMapsScript);

    return () => {
      // Clean up script if component unmounts before script loads
      if (!isMapLoaded) {
        document.head.removeChild(googleMapsScript);
      }
    };
  }, []);

  // Initialize map when script is loaded
  useEffect(() => {
    if (!isMapLoaded || !mapRef.current) return;

    const mapOptions: google.maps.MapOptions = {
      center: { lat: center.lat, lng: center.lng },
      zoom: 12,
      mapTypeControl: false,
      streetViewControl: false,
      fullscreenControl: false,
    };

    const newMap = new window.google.maps.Map(mapRef.current, mapOptions);
    setMap(newMap);

    const newDirectionsRenderer = new window.google.maps.DirectionsRenderer({
      map: newMap,
      suppressMarkers: true
    });
    setDirectionsRenderer(newDirectionsRenderer);

    return () => {
      setMap(null);
      setDirectionsRenderer(null);
    };
  }, [isMapLoaded, center]);

  // Update markers and routes when data changes
  useEffect(() => {
    if (!map) return;

    // Clear existing markers
    markers.forEach(marker => marker.setMap(null));
    const newMarkers: google.maps.Marker[] = [];

    // Add center marker (current location)
    const centerMarker = new window.google.maps.Marker({
      position: { lat: center.lat, lng: center.lng },
      map: map,
      title: center.name,
      icon: {
        path: window.google.maps.SymbolPath.CIRCLE,
        fillColor: '#4285F4',
        fillOpacity: 1,
        strokeColor: '#FFFFFF',
        strokeWeight: 2,
        scale: 8
      }
    });
    newMarkers.push(centerMarker);

    // Add emergency markers
    emergencies.forEach(emergency => {
      const emergencyMarker = new window.google.maps.Marker({
        position: { lat: emergency.lat, lng: emergency.lng },
        map: map,
        title: emergency.name,
        icon: {
          path: window.google.maps.SymbolPath.CIRCLE,
          fillColor: '#EA4335',
          fillOpacity: 1,
          strokeColor: '#FFFFFF',
          strokeWeight: 2,
          scale: 8
        },
        animation: window.google.maps.Animation.BOUNCE
      });
      newMarkers.push(emergencyMarker);
    });

    // Add destination marker and calculate route if destination exists
    if (destination) {
      const destinationMarker = new window.google.maps.Marker({
        position: { lat: destination.lat, lng: destination.lng },
        map: map,
        title: destination.name,
        icon: {
          path: window.google.maps.SymbolPath.CIRCLE,
          fillColor: '#34A853',
          fillOpacity: 1,
          strokeColor: '#FFFFFF',
          strokeWeight: 2,
          scale: 8
        }
      });
      newMarkers.push(destinationMarker);

      // Calculate and display route
      if (directionsRenderer) {
        const directionsService = new window.google.maps.DirectionsService();
        directionsService.route({
          origin: { lat: center.lat, lng: center.lng },
          destination: { lat: destination.lat, lng: destination.lng },
          travelMode: window.google.maps.TravelMode.DRIVING
        }, (result, status) => {
          if (status === window.google.maps.DirectionsStatus.OK && result) {
            directionsRenderer.setDirections(result);
          }
        });
      }
    }

    setMarkers(newMarkers);
  }, [map, directionsRenderer, center, destination, emergencies]);

  const handleContactTraffic = () => {
    toast({
      title: "Traffic Authority Contacted",
      description: "Your request to clear the route has been sent to the nearest traffic authority.",
    });
  };

  return (
    <Card className="w-full overflow-hidden">
      <div className="relative h-[400px] overflow-hidden">
        {!isMapLoaded && (
          <div className="absolute inset-0 flex items-center justify-center bg-gray-100 text-gray-500">
            Loading map...
          </div>
        )}
        <div ref={mapRef} className="h-full w-full" />
        
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/50 to-transparent p-4">
          <div className="text-white text-sm">
            {destination ? (
              <div className="flex items-center gap-2">
                <MapPin size={16} />
                <span>Destination: {destination.name}</span>
              </div>
            ) : emergencies && emergencies.length > 0 ? (
              <div className="flex items-center gap-2">
                <MapPin size={16} className="text-red-400" />
                <span>Emergency locations: {emergencies.length}</span>
              </div>
            ) : null}
          </div>
        </div>
      </div>
      
      {withContactTraffic && destination && (
        <CardFooter className="p-4 bg-gray-50">
          <Button 
            onClick={handleContactTraffic} 
            className="gap-2 w-full bg-medisync-red hover:bg-medisync-red/90"
          >
            <Phone size={16} />
            Contact Traffic Authority to Clear Route
          </Button>
        </CardFooter>
      )}

      {!isMapLoaded && (
        <CardContent className="p-4 text-center text-sm text-gray-500">
          <p>
            Note: This is using a placeholder Google Maps API key. 
            Replace 'YOUR_API_KEY' with a valid API key for production use.
          </p>
        </CardContent>
      )}
    </Card>
  );
};

export default MapComponent;
