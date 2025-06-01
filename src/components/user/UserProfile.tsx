
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch';
import { 
  User, Shield, Lock, Bell, Eye, EyeOff, 
  Settings, Phone, Mail, MapPin, Calendar,
  Edit3, Save, X, Camera, Smartphone
} from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

const UserProfile = () => {
  const { user, logout } = useAuth();
  const { toast } = useToast();
  const [isEditing, setIsEditing] = useState(false);
  const [pinLockEnabled, setPinLockEnabled] = useState(false);
  const [showPin, setShowPin] = useState(false);
  const [pin, setPin] = useState('');
  const [biometricEnabled, setBiometricEnabled] = useState(false);
  const [notifications, setNotifications] = useState({
    appointments: true,
    medications: true,
    emergency: true,
    health_tips: false
  });

  const handleSaveProfile = () => {
    setIsEditing(false);
    toast({
      title: "Profile Updated",
      description: "Your profile has been successfully updated.",
    });
  };

  const handlePinSetup = () => {
    if (pin.length === 4) {
      setPinLockEnabled(true);
      toast({
        title: "PIN Lock Enabled",
        description: "Your application is now secured with a 4-digit PIN.",
      });
    } else {
      toast({
        title: "Invalid PIN",
        description: "Please enter a 4-digit PIN.",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="space-y-6 p-6">
      {/* Profile Header */}
      <Card className="border-0 bg-gradient-to-r from-blue-50 to-purple-50">
        <CardContent className="p-6">
          <div className="flex items-center space-x-4">
            <div className="relative">
              <Avatar className="h-20 w-20">
                <AvatarImage src={user?.avatar} />
                <AvatarFallback className="bg-blue-500 text-white text-xl">
                  {user?.name?.charAt(0) || 'U'}
                </AvatarFallback>
              </Avatar>
              <Button
                size="sm"
                className="absolute -bottom-2 -right-2 h-8 w-8 rounded-full bg-blue-500 hover:bg-blue-600"
              >
                <Camera size={14} />
              </Button>
            </div>
            <div className="flex-1">
              <h2 className="text-2xl font-bold text-gray-900">{user?.name}</h2>
              <p className="text-gray-600">{user?.email}</p>
              <Badge className="mt-2 bg-green-100 text-green-800">
                <Shield size={12} className="mr-1" />
                Verified Patient
              </Badge>
            </div>
            <Button
              variant="outline"
              onClick={() => setIsEditing(!isEditing)}
              className="flex items-center gap-2"
            >
              {isEditing ? <X size={16} /> : <Edit3 size={16} />}
              {isEditing ? 'Cancel' : 'Edit'}
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Security Settings */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Lock className="h-5 w-5" />
            Security & Privacy
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* PIN Lock */}
          <div className="flex items-center justify-between p-4 border rounded-lg">
            <div>
              <h3 className="font-medium">PIN Lock</h3>
              <p className="text-sm text-gray-600">Secure your app with a 4-digit PIN</p>
            </div>
            <Switch
              checked={pinLockEnabled}
              onCheckedChange={(checked) => {
                if (!checked) {
                  setPinLockEnabled(false);
                  toast({
                    title: "PIN Lock Disabled",
                    description: "Your app is no longer secured with PIN.",
                  });
                }
              }}
            />
          </div>

          {!pinLockEnabled && (
            <div className="border rounded-lg p-4 bg-gray-50">
              <Label htmlFor="pin">Set 4-Digit PIN</Label>
              <div className="flex items-center space-x-2 mt-2">
                <div className="relative">
                  <Input
                    id="pin"
                    type={showPin ? "text" : "password"}
                    placeholder="****"
                    value={pin}
                    onChange={(e) => setPin(e.target.value.slice(0, 4))}
                    className="w-24 text-center"
                    maxLength={4}
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="absolute right-0 top-0 h-full px-2"
                    onClick={() => setShowPin(!showPin)}
                  >
                    {showPin ? <EyeOff size={14} /> : <Eye size={14} />}
                  </Button>
                </div>
                <Button onClick={handlePinSetup} disabled={pin.length !== 4}>
                  Enable PIN
                </Button>
              </div>
            </div>
          )}

          {/* Biometric Lock */}
          <div className="flex items-center justify-between p-4 border rounded-lg">
            <div>
              <h3 className="font-medium flex items-center gap-2">
                <Smartphone size={16} />
                Biometric Lock
              </h3>
              <p className="text-sm text-gray-600">Use fingerprint or face recognition</p>
            </div>
            <Switch
              checked={biometricEnabled}
              onCheckedChange={setBiometricEnabled}
            />
          </div>
        </CardContent>
      </Card>

      {/* Notification Settings */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Bell className="h-5 w-5" />
            Notification Preferences
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {Object.entries(notifications).map(([key, value]) => (
            <div key={key} className="flex items-center justify-between p-4 border rounded-lg">
              <div>
                <h3 className="font-medium capitalize">
                  {key.replace('_', ' ')}
                </h3>
                <p className="text-sm text-gray-600">
                  Get notified about {key.replace('_', ' ').toLowerCase()}
                </p>
              </div>
              <Switch
                checked={value}
                onCheckedChange={(checked) =>
                  setNotifications(prev => ({ ...prev, [key]: checked }))
                }
              />
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Account Actions */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Settings className="h-5 w-5" />
            Account Actions
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <Button variant="outline" className="w-full justify-start">
            <User className="mr-2 h-4 w-4" />
            Update Personal Information
          </Button>
          <Button variant="outline" className="w-full justify-start">
            <Shield className="mr-2 h-4 w-4" />
            Privacy Settings
          </Button>
          <Button 
            variant="destructive" 
            className="w-full justify-start"
            onClick={logout}
          >
            <X className="mr-2 h-4 w-4" />
            Sign Out
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default UserProfile;
