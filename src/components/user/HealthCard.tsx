
import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { ShieldCheck, CreditCard, Plus, QrCode, Wallet, Clock } from 'lucide-react';
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
  const [balance, setBalance] = useState(5000); // Mock balance in NPR
  const [showAddFunds, setShowAddFunds] = useState(false);
  const [amount, setAmount] = useState('');
  const [isFlipped, setIsFlipped] = useState(false);

  const handleAddFunds = () => {
    if (!amount || isNaN(Number(amount)) || Number(amount) <= 0) {
      toast({
        title: t('invalidAmount'),
        description: t('pleaseEnterValidAmount'),
        variant: "destructive",
      });
      return;
    }

    // In a real app, this would connect to a payment gateway
    setBalance(prevBalance => prevBalance + Number(amount));
    setAmount('');
    setShowAddFunds(false);
    
    toast({
      title: t('fundsAdded'),
      description: t('yourBalanceHasBeenUpdated'),
    });
  };

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat(language === 'en' ? 'en-US' : 'ne-NP', {
      style: 'currency',
      currency: 'NPR',
      maximumFractionDigits: 0,
    }).format(value);
  };

  const healthIdNumber = `NP-HEALTH-${user?.id?.slice(-8).toUpperCase() || '12345678'}`;

  return (
    <div className="space-y-6">
      <div className="relative h-56 w-full" onClick={() => setIsFlipped(!isFlipped)}>
        <div className={cn(
          "absolute w-full h-full transition-all duration-500 [transform-style:preserve-3d] rounded-xl shadow-lg",
          isFlipped ? "[transform:rotateY(180deg)]" : ""
        )}>
          {/* Front of card */}
          <div className="absolute w-full h-full [backface-visibility:hidden] bg-gradient-to-br from-nepal-royal-blue to-nepal-crimson rounded-xl p-6 text-white">
            <div className="flex justify-between items-center">
              <div>
                <h3 className="text-xl font-bold">{t('nationalHealthCard')}</h3>
                <p className="text-white/80">{user?.name}</p>
              </div>
              <ShieldCheck size={32} />
            </div>
            <div className="mt-8">
              <p className="text-sm text-white/70">{t('healthId')}</p>
              <p className="text-lg font-mono font-bold tracking-wider">{healthIdNumber}</p>
            </div>
            <div className="mt-8 flex justify-between items-end">
              <div>
                <p className="text-sm text-white/70">{t('availableBalance')}</p>
                <p className="text-2xl font-bold">{formatCurrency(balance)}</p>
              </div>
              <div className="text-sm text-white/70 italic">Tap to flip</div>
            </div>
            <div className="absolute bottom-0 right-0 w-24 h-24 bg-white/10 rounded-full blur-xl"></div>
            <div className="absolute top-0 left-0 w-16 h-16 bg-white/10 rounded-full blur-xl"></div>
          </div>

          {/* Back of card */}
          <div className="absolute w-full h-full [backface-visibility:hidden] [transform:rotateY(180deg)] bg-gradient-to-br from-gray-800 to-gray-900 rounded-xl p-6 text-white">
            <div className="h-12 bg-black/30 w-full mb-6"></div>
            <div className="space-y-4">
              <div className="flex justify-between">
                <span className="text-white/70">Issued Date:</span>
                <span>01/01/2025</span>
              </div>
              <div className="flex justify-between">
                <span className="text-white/70">Valid Until:</span>
                <span>01/01/2030</span>
              </div>
              <div className="flex justify-between">
                <span className="text-white/70">Blood Type:</span>
                <span>O+</span>
              </div>
            </div>
            <div className="mt-6 flex justify-center">
              <div className="bg-white p-2 rounded-md">
                <QrCode size={60} className="text-black" />
              </div>
            </div>
            <div className="mt-2 text-center text-white/70 text-xs">Scan for verification</div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Button 
          onClick={() => setShowAddFunds(true)}
          className="bg-gradient-to-r from-nepal-royal-blue to-nepal-royal-blue/80 hover:opacity-90 text-white h-14 gap-2"
        >
          <Plus size={16} />
          {t('addFunds')}
        </Button>
        <Button 
          variant="outline" 
          className="h-14 border-2 border-nepal-royal-blue text-nepal-royal-blue hover:bg-nepal-royal-blue/10 gap-2"
          onClick={() => toast({ title: "QR Code", description: "Scan this code at any MediSync terminal to pay." })}
        >
          <QrCode size={16} />
          {t('showQRCode')}
        </Button>
      </div>

      <Card className="overflow-hidden bg-gradient-to-b from-white to-gray-50 border-none shadow-md">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Clock size={18} className="text-nepal-royal-blue" />
            {t('recentPayments')}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex justify-between items-center p-4 bg-white rounded-xl shadow-sm border border-gray-100">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 bg-red-100 rounded-full flex items-center justify-center">
                  <CreditCard size={16} className="text-red-600" />
                </div>
                <div>
                  <p className="font-medium">Bir Hospital</p>
                  <p className="text-sm text-gray-500">Laboratory Tests</p>
                </div>
              </div>
              <p className="font-medium text-red-600">-{formatCurrency(1200)}</p>
            </div>
            <div className="flex justify-between items-center p-4 bg-white rounded-xl shadow-sm border border-gray-100">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                  <CreditCard size={16} className="text-blue-600" />
                </div>
                <div>
                  <p className="font-medium">Nepal Mediciti</p>
                  <p className="text-sm text-gray-500">Consultation Fee</p>
                </div>
              </div>
              <p className="font-medium text-red-600">-{formatCurrency(800)}</p>
            </div>
            <div className="flex justify-between items-center p-4 bg-white rounded-xl shadow-sm border border-gray-100">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                  <CreditCard size={16} className="text-green-600" />
                </div>
                <div>
                  <p className="font-medium">Teaching Hospital</p>
                  <p className="text-sm text-gray-500">Prescription</p>
                </div>
              </div>
              <p className="font-medium text-red-600">-{formatCurrency(650)}</p>
            </div>
          </div>
        </CardContent>
        <CardFooter>
          <Button variant="ghost" className="w-full hover:bg-gray-100">
            {t('viewAllTransactions')}
          </Button>
        </CardFooter>
      </Card>

      {/* Add Funds Dialog */}
      <Dialog open={showAddFunds} onOpenChange={setShowAddFunds}>
        <DialogContent className="bg-gradient-to-b from-white to-gray-50 border-none shadow-2xl max-w-md mx-auto">
          <DialogHeader>
            <DialogTitle className="text-xl font-bold">{t('addFundsToHealthCard')}</DialogTitle>
            <DialogDescription>
              {t('addFundsDescription')}
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-6 py-4">
            <div className="space-y-2">
              <Label htmlFor="amount">{t('amount')}</Label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">रू</span>
                <Input
                  id="amount"
                  placeholder="1000"
                  type="number"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  className="pl-8 text-lg"
                />
              </div>
            </div>
            <div className="grid grid-cols-3 gap-3">
              <Button 
                variant="outline" 
                onClick={() => setAmount('500')}
                className="bg-white hover:bg-gray-50 border border-gray-200 h-14"
              >
                रू 500
              </Button>
              <Button 
                variant="outline" 
                onClick={() => setAmount('1000')}
                className="bg-white hover:bg-gray-50 border border-gray-200 h-14"
              >
                रू 1,000
              </Button>
              <Button 
                variant="outline" 
                onClick={() => setAmount('5000')}
                className="bg-white hover:bg-gray-50 border border-gray-200 h-14"
              >
                रू 5,000
              </Button>
            </div>
            
            <div className="bg-blue-50 p-4 rounded-lg border border-blue-100">
              <h4 className="text-sm font-medium text-blue-800 mb-2">Payment Methods</h4>
              <div className="grid grid-cols-4 gap-2">
                <div className="bg-white p-2 rounded border border-gray-200 flex items-center justify-center">
                  <img src="https://placehold.co/40x20/e6ecf5/003893?text=eSewa" alt="eSewa" className="h-6" />
                </div>
                <div className="bg-white p-2 rounded border border-gray-200 flex items-center justify-center">
                  <img src="https://placehold.co/40x20/e6ecf5/003893?text=Khalti" alt="Khalti" className="h-6" />
                </div>
                <div className="bg-white p-2 rounded border border-gray-200 flex items-center justify-center">
                  <img src="https://placehold.co/40x20/e6ecf5/003893?text=IME" alt="IME Pay" className="h-6" />
                </div>
                <div className="bg-white p-2 rounded border border-gray-200 flex items-center justify-center">
                  <img src="https://placehold.co/40x20/e6ecf5/003893?text=Bank" alt="Connect IPS" className="h-6" />
                </div>
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowAddFunds(false)} className="border-nepal-crimson text-nepal-crimson hover:bg-nepal-crimson/10">
              {t('cancel')}
            </Button>
            <Button onClick={handleAddFunds} className="bg-nepal-royal-blue hover:bg-nepal-royal-blue/90">
              {t('addFunds')}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default HealthCard;
