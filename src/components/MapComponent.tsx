
import React, { useEffect, useRef, useState } from 'react';
import { MapPin, Phone, Navigation, Locate, AlertCircle } from 'lucide-react';
import { Card, CardContent, CardFooter, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { useToast } from '@/hooks/use-toast';
import { Badge } from '@/components/ui/badge';

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
  const [isRouteActive, setIsRouteActive] = useState(false);
  const [eta, setEta] = useState<string | null>(null);
  const [distance, setDistance] = useState<string | null>(null);
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
      styles: [
        {
          featureType: "water",
          elementType: "geometry",
          stylers: [{ color: "#e9e9e9" }, { lightness: 17 }]
        },
        {
          featureType: "landscape",
          elementType: "geometry",
          stylers: [{ color: "#f5f5f5" }, { lightness: 20 }]
        },
        {
          featureType: "road.highway",
          elementType: "geometry.fill",
          stylers: [{ color: "#ffffff" }, { lightness: 17 }]
        },
        {
          featureType: "road.highway",
          elementType: "geometry.stroke",
          stylers: [{ color: "#ffffff" }, { lightness: 29 }, { weight: 0.2 }]
        },
        {
          featureType: "road.arterial",
          elementType: "geometry",
          stylers: [{ color: "#ffffff" }, { lightness: 18 }]
        },
        {
          featureType: "road.local",
          elementType: "geometry",
          stylers: [{ color: "#ffffff" }, { lightness: 16 }]
        },
        {
          featureType: "poi",
          elementType: "geometry",
          stylers: [{ color: "#f5f5f5" }, { lightness: 21 }]
        },
        {
          featureType: "transit",
          elementType: "geometry",
          stylers: [{ color: "#f2f2f2" }, { lightness: 19 }]
        }
      ]
    };

    const newMap = new window.google.maps.Map(mapRef.current, mapOptions);
    setMap(newMap);

    const newDirectionsRenderer = new window.google.maps.DirectionsRenderer({
      map: newMap,
      suppressMarkers: true,
      polylineOptions: {
        strokeColor: '#4361ee',
        strokeWeight: 6,
        strokeOpacity: 0.8
      }
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
    const centerIcon = {
      path: window.google.maps.SymbolPath.CIRCLE,
      fillColor: '#4285F4',
      fillOpacity: 1,
      strokeColor: '#FFFFFF',
      strokeWeight: 2,
      scale: 8
    };

    const centerMarker = new window.google.maps.Marker({
      position: { lat: center.lat, lng: center.lng },
      map: map,
      title: center.name,
      icon: centerIcon,
      animation: window.google.maps.Animation.DROP
    });
    newMarkers.push(centerMarker);

    // Add emergency markers
    emergencies.forEach(emergency => {
      // Custom SVG marker for emergencies
      const emergencyIcon = {
        path: "M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z",
        fillColor: '#EA4335',
        fillOpacity: 1,
        strokeColor: '#FFFFFF',
        strokeWeight: 2,
        scale: 1.5,
        anchor: new window.google.maps.Point(12, 12)
      };
      
      const emergencyMarker = new window.google.maps.Marker({
        position: { lat: emergency.lat, lng: emergency.lng },
        map: map,
        title: emergency.name,
        icon: emergencyIcon,
        animation: window.google.maps.Animation.BOUNCE
      });
      newMarkers.push(emergencyMarker);
      
      // Add info window for emergency
      const infoWindow = new window.google.maps.InfoWindow({
        content: `<div style="padding: 8px;"><strong>${emergency.name}</strong><br>Emergency response active</div>`
      });
      
      emergencyMarker.addListener('click', () => {
        infoWindow.open(map, emergencyMarker);
      });
    });

    // Add destination marker and calculate route if destination exists
    if (destination) {
      const destinationIcon = {
        path: window.google.maps.SymbolPath.CIRCLE,
        fillColor: '#34A853',
        fillOpacity: 1,
        strokeColor: '#FFFFFF',
        strokeWeight: 2,
        scale: 8
      };
      
      const destinationMarker = new window.google.maps.Marker({
        position: { lat: destination.lat, lng: destination.lng },
        map: map,
        title: destination.name,
        icon: destinationIcon
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
            setIsRouteActive(true);
            
            // Extract ETA and distance
            const route = result.routes[0];
            if (route && route.legs[0]) {
              setEta(route.legs[0].duration?.text || null);
              setDistance(route.legs[0].distance?.text || null);
            }
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
  
  const handleRecenterMap = () => {
    if (map && center) {
      map.panTo({ lat: center.lat, lng: center.lng });
      map.setZoom(14);
    }
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
        
        {/* Map controls */}
        <div className="absolute right-4 top-4 flex flex-col gap-2">
          <Button size="sm" variant="outline" className="bg-white" onClick={handleRecenterMap}>
            <Locate size={16} />
          </Button>
        </div>
        
        {/* Map info overlay */}
        {isRouteActive && (
          <div className="absolute top-4 left-4 bg-white/90 rounded-lg shadow-md p-3 max-w-[200px]">
            <div className="text-sm font-medium">Route Information</div>
            {distance && (
              <div className="flex items-center gap-2 text-xs text-gray-600 mt-1">
                <Navigation size={14} /> Distance: {distance}
              </div>
            )}
            {eta && (
              <div className="flex items-center gap-2 text-xs text-gray-600">
                <Clock size={14} /> ETA: {eta}
              </div>
            )}
          </div>
        )}
        
        {/* Emergency indicator */}
        {emergencies && emergencies.length > 0 && (
          <div className="absolute top-4 right-16 bg-red-500/90 text-white rounded-lg shadow-md px-3 py-1 flex items-center gap-2">
            <AlertCircle size={16} />
            <span className="text-sm font-medium">Emergency Active</span>
          </div>
        )}
        
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

interface ClockProps extends React.SVGProps<SVGSVGElement> {
  size?: number;
}

const Clock: React.FC<ClockProps> = ({ size = 16, ...props }) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    width={size} 
    height={size} 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2" 
    strokeLinecap="round" 
    strokeLinejoin="round"
    {...props}
  >
    <circle cx="12" cy="12" r="10"></circle>
    <polyline points="12 6 12 12 16 14"></polyline>
  </svg>
);

export default MapComponent;
