
import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { 
  Heart, Share2, QrCode, Shield, Star, Activity, 
  Clock, Zap, Phone, Mail, MapPin, Calendar,
  Download, Copy, Check, ExternalLink, Users,
  FileText, Lock, Verified
} from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { useLanguage } from '@/contexts/LanguageContext';
import { useToast } from '@/hooks/use-toast';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog";
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

const HealthCard = () => {
  const { user } = useAuth();
  const { t, language } = useLanguage();
  const { toast } = useToast();
  const [isFlipped, setIsFlipped] = useState(false);
  const [showShareDialog, setShowShareDialog] = useState(false);
  const [shareMethod, setShareMethod] = useState<'qr' | 'link' | 'direct'>('qr');
  const [copied, setCopied] = useState(false);

  // Mock health data
  const healthData = {
    id: `NP-HEALTH-${user?.id?.slice(-8).toUpperCase() || '12345678'}`,
    healthScore: 92,
    bloodType: 'O+',
    emergencyContact: '+977-9841234567',
    lastCheckup: '2024-05-15',
    healthPoints: 2450,
    level: 'Platinum',
    memberSince: '2023-01-15',
    totalVisits: 24,
    activeConditions: ['Hypertension', 'Diabetes Type 2'],
    allergies: ['Penicillin', 'Shellfish'],
    medications: ['Metformin', 'Lisinopril', 'Aspirin'],
    insurance: 'Nepal Life Insurance - Premium Plan'
  };

  const shareLink = `https://medisync.app/health-card/${healthData.id}`;

  const handleShare = async (method: string) => {
    switch (method) {
      case 'copy':
        try {
          await navigator.clipboard.writeText(shareLink);
          setCopied(true);
          setTimeout(() => setCopied(false), 2000);
          toast({
            title: "Link Copied",
            description: "Health card link copied to clipboard",
          });
        } catch (err) {
          toast({
            title: "Error",
            description: "Failed to copy link",
            variant: "destructive",
          });
        }
        break;
      case 'doctor':
        toast({
          title: "Shared with Doctor",
          description: "Health card access granted to selected doctor",
        });
        setShowShareDialog(false);
        break;
      case 'hospital':
        toast({
          title: "Shared with Hospital",
          description: "Health card access granted to hospital system",
        });
        setShowShareDialog(false);
        break;
      case 'emergency':
        toast({
          title: "Emergency Access Enabled",
          description: "Health card available for emergency responders",
        });
        setShowShareDialog(false);
        break;
    }
  };

  const handleDownload = () => {
    toast({
      title: "Download Started",
      description: "Your health card is being downloaded as PDF",
    });
  };

  return (
    <div className="space-y-4">
      {/* Main Health Card */}
      <div className="relative">
        <motion.div 
          className="relative h-64 w-full cursor-pointer"
          onClick={() => setIsFlipped(!isFlipped)}
          style={{ perspective: '1000px' }}
        >
          <motion.div
            className="relative w-full h-full rounded-2xl shadow-xl"
            style={{ transformStyle: 'preserve-3d' }}
            animate={{ rotateY: isFlipped ? 180 : 0 }}
            transition={{ duration: 0.6, ease: 'easeInOut' }}
          >
            {/* Front of Card */}
            <div 
              className="absolute inset-0 w-full h-full rounded-2xl overflow-hidden"
              style={{ backfaceVisibility: 'hidden' }}
            >
              <div className="h-full bg-gradient-to-br from-blue-600 via-blue-700 to-purple-800 p-6 text-white relative overflow-hidden">
                {/* Background Pattern */}
                <div className="absolute inset-0 opacity-10">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-white rounded-full -translate-y-16 translate-x-16"></div>
                  <div className="absolute bottom-0 left-0 w-24 h-24 bg-white rounded-full translate-y-12 -translate-x-12"></div>
                  <div className="absolute top-1/2 left-1/2 w-40 h-40 bg-white rounded-full opacity-5 -translate-x-1/2 -translate-y-1/2"></div>
                </div>

                {/* Card Header */}
                <div className="flex justify-between items-start mb-6 relative z-10">
                  <div>
                    <div className="flex items-center space-x-2 mb-2">
                      <Heart size={20} className="text-red-300" />
                      <span className="text-sm font-medium opacity-90">MediSync Health ID</span>
                    </div>
                    <h2 className="text-2xl font-bold">{user?.name || "John Doe"}</h2>
                    <p className="text-sm opacity-80">ID: {healthData.id}</p>
                  </div>
                  <div className="text-right">
                    <Badge className="bg-white/20 text-white border-0 mb-2">
                      <Shield size={12} className="mr-1" />
                      Verified
                    </Badge>
                    <div className="flex items-center">
                      <Star size={16} className="text-yellow-300 mr-1" fill="currentColor" />
                      <span className="text-sm font-semibold">{healthData.level}</span>
                    </div>
                  </div>
                </div>

                {/* Health Points */}
                <div className="flex justify-between items-end relative z-10">
                  <div>
                    <p className="text-sm opacity-80">Health Points</p>
                    <p className="text-3xl font-bold">{healthData.healthPoints.toLocaleString()}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm opacity-80">Health Score</p>
                    <div className="flex items-center">
                      <Activity size={16} className="mr-1" />
                      <span className="text-xl font-bold">{healthData.healthScore}/100</span>
                    </div>
                  </div>
                </div>

                {/* Tap to flip indicator */}
                <div className="absolute bottom-4 right-4 text-xs opacity-60">
                  Tap to flip
                </div>
              </div>
            </div>

            {/* Back of Card */}
            <div 
              className="absolute inset-0 w-full h-full rounded-2xl overflow-hidden"
              style={{ backfaceVisibility: 'hidden', transform: 'rotateY(180deg)' }}
            >
              <div className="h-full bg-gradient-to-br from-gray-800 to-gray-900 p-6 text-white">
                {/* Magnetic Stripe */}
                <div className="h-12 bg-black/50 w-full mb-6 rounded"></div>

                {/* Medical Information */}
                <div className="space-y-4 text-sm">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-gray-400">Blood Type</p>
                      <p className="font-semibold text-red-400">{healthData.bloodType}</p>
                    </div>
                    <div>
                      <p className="text-gray-400">Emergency Contact</p>
                      <p className="font-mono text-xs">{healthData.emergencyContact}</p>
                    </div>
                  </div>
                  
                  <div>
                    <p className="text-gray-400">Allergies</p>
                    <p className="text-yellow-400 text-xs">{healthData.allergies.join(', ')}</p>
                  </div>
                  
                  <div>
                    <p className="text-gray-400">Active Medications</p>
                    <p className="text-green-400 text-xs">{healthData.medications.slice(0, 2).join(', ')}</p>
                  </div>
                </div>

                {/* QR Code */}
                <div className="absolute bottom-4 right-4">
                  <div className="bg-white p-2 rounded">
                    <QrCode size={40} className="text-black" />
                  </div>
                </div>

                {/* Verification */}
                <div className="absolute bottom-4 left-4 text-xs text-gray-400">
                  <p>Valid until: Dec 2030</p>
                  <p>Member since: {healthData.memberSince}</p>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>

      {/* Action Buttons */}
      <div className="grid grid-cols-2 gap-3">
        <Dialog open={showShareDialog} onOpenChange={setShowShareDialog}>
          <DialogTrigger asChild>
            <Button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white shadow-lg">
              <Share2 size={16} className="mr-2" />
              Share Card
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle className="flex items-center">
                <Share2 size={20} className="mr-2" />
                Share Health Card
              </DialogTitle>
              <DialogDescription>
                Grant access to your health information securely
              </DialogDescription>
            </DialogHeader>
            
            <div className="space-y-4">
              {/* Share Methods */}
              <div className="grid grid-cols-3 gap-2">
                <Button
                  variant={shareMethod === 'qr' ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setShareMethod('qr')}
                  className="flex flex-col h-16 gap-1"
                >
                  <QrCode size={16} />
                  <span className="text-xs">QR Code</span>
                </Button>
                <Button
                  variant={shareMethod === 'link' ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setShareMethod('link')}
                  className="flex flex-col h-16 gap-1"
                >
                  <ExternalLink size={16} />
                  <span className="text-xs">Link</span>
                </Button>
                <Button
                  variant={shareMethod === 'direct' ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setShareMethod('direct')}
                  className="flex flex-col h-16 gap-1"
                >
                  <Users size={16} />
                  <span className="text-xs">Direct</span>
                </Button>
              </div>

              {shareMethod === 'qr' && (
                <div className="text-center py-6">
                  <div className="bg-gray-100 p-6 rounded-lg inline-block">
                    <QrCode size={120} className="text-gray-800" />
                  </div>
                  <p className="text-sm text-gray-600 mt-2">Scan to access health card</p>
                </div>
              )}

              {shareMethod === 'link' && (
                <div className="space-y-3">
                  <div className="flex items-center space-x-2">
                    <input
                      type="text"
                      value={shareLink}
                      readOnly
                      className="flex-1 px-3 py-2 border rounded-md bg-gray-50 text-sm"
                    />
                    <Button
                      size="sm"
                      onClick={() => handleShare('copy')}
                      variant="outline"
                    >
                      {copied ? <Check size={16} /> : <Copy size={16} />}
                    </Button>
                  </div>
                  <p className="text-xs text-gray-500">
                    This link expires in 24 hours and can be accessed 3 times
                  </p>
                </div>
              )}

              {shareMethod === 'direct' && (
                <div className="space-y-3">
                  <Button
                    onClick={() => handleShare('doctor')}
                    className="w-full justify-start"
                    variant="outline"
                  >
                    <Verified size={16} className="mr-2" />
                    Share with Doctor
                  </Button>
                  <Button
                    onClick={() => handleShare('hospital')}
                    className="w-full justify-start"
                    variant="outline"
                  >
                    <MapPin size={16} className="mr-2" />
                    Share with Hospital
                  </Button>
                  <Button
                    onClick={() => handleShare('emergency')}
                    className="w-full justify-start"
                    variant="outline"
                  >
                    <Zap size={16} className="mr-2" />
                    Emergency Access
                  </Button>
                </div>
              )}
            </div>

            <DialogFooter>
              <Button variant="outline" onClick={() => setShowShareDialog(false)}>
                Cancel
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        <Button 
          variant="outline" 
          onClick={handleDownload}
          className="border-2 border-blue-200 hover:bg-blue-50"
        >
          <Download size={16} className="mr-2" />
          Download
        </Button>
      </div>

      {/* Health Summary Card */}
      <Card className="bg-gradient-to-r from-green-50 to-blue-50 border-0">
        <CardContent className="p-4">
          <div className="flex items-center justify-between mb-3">
            <h3 className="font-semibold text-gray-800">Health Summary</h3>
            <Badge variant="secondary" className="bg-green-100 text-green-800">
              Excellent
            </Badge>
          </div>
          
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-gray-600">Last Checkup</span>
              <span className="font-medium">{healthData.lastCheckup}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Total Visits</span>
              <span className="font-medium">{healthData.totalVisits}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Insurance</span>
              <span className="font-medium text-xs">Active</span>
            </div>
          </div>

          <Button variant="ghost" size="sm" className="w-full mt-3 text-blue-600 hover:text-blue-700">
            <FileText size={14} className="mr-1" />
            View Full Record
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default HealthCard;
