
import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { ShieldCheck, CreditCard, Wallet, Plus, QrCode } from 'lucide-react';
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

const HealthCard = () => {
  const { user } = useAuth();
  const { t, language } = useLanguage();
  const { toast } = useToast();
  const [balance, setBalance] = useState(5000); // Mock balance in NPR
  const [showAddFunds, setShowAddFunds] = useState(false);
  const [amount, setAmount] = useState('');

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
      <Card className="overflow-hidden">
        <div className="bg-gradient-to-r from-nepal-royal-blue to-nepal-crimson p-6 text-white">
          <div className="flex justify-between items-center">
            <div>
              <h3 className="text-xl font-bold">{t('nationalHealthCard')}</h3>
              <p className="text-white/80">{user?.name}</p>
            </div>
            <ShieldCheck size={32} />
          </div>
          <div className="mt-4">
            <p className="text-sm text-white/70">{t('healthId')}</p>
            <p className="text-lg font-mono font-bold tracking-wider">{healthIdNumber}</p>
          </div>
        </div>
        <CardContent className="p-6 space-y-4">
          <div className="flex justify-between items-center">
            <div>
              <p className="text-sm text-gray-500">{t('availableBalance')}</p>
              <p className="text-2xl font-bold">{formatCurrency(balance)}</p>
            </div>
            <Button 
              onClick={() => setShowAddFunds(true)}
              className="gap-2"
            >
              <Plus size={16} />
              {t('addFunds')}
            </Button>
          </div>
          
          <div className="grid grid-cols-2 gap-4 pt-4">
            <Button variant="outline" className="h-16 flex-col gap-1 border-dashed">
              <QrCode size={20} />
              <span className="text-sm">{t('showQRCode')}</span>
            </Button>
            <Button variant="outline" className="h-16 flex-col gap-1 border-dashed">
              <CreditCard size={20} />
              <span className="text-sm">{t('viewTransactions')}</span>
            </Button>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>{t('recentPayments')}</CardTitle>
          <CardDescription>{t('lastThreeTransactions')}</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex justify-between items-center p-3 bg-gray-50 rounded-md">
              <div>
                <p className="font-medium">Bir Hospital</p>
                <p className="text-sm text-gray-500">Laboratory Tests</p>
              </div>
              <p className="font-medium text-red-600">-{formatCurrency(1200)}</p>
            </div>
            <div className="flex justify-between items-center p-3 bg-gray-50 rounded-md">
              <div>
                <p className="font-medium">Nepal Mediciti</p>
                <p className="text-sm text-gray-500">Consultation Fee</p>
              </div>
              <p className="font-medium text-red-600">-{formatCurrency(800)}</p>
            </div>
            <div className="flex justify-between items-center p-3 bg-gray-50 rounded-md">
              <div>
                <p className="font-medium">Teaching Hospital</p>
                <p className="text-sm text-gray-500">Prescription</p>
              </div>
              <p className="font-medium text-red-600">-{formatCurrency(650)}</p>
            </div>
          </div>
        </CardContent>
        <CardFooter>
          <Button variant="ghost" className="w-full">
            {t('viewAllTransactions')}
          </Button>
        </CardFooter>
      </Card>

      {/* Add Funds Dialog */}
      <Dialog open={showAddFunds} onOpenChange={setShowAddFunds}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{t('addFundsToHealthCard')}</DialogTitle>
            <DialogDescription>
              {t('addFundsDescription')}
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="amount">{t('amount')}</Label>
              <Input
                id="amount"
                placeholder="1000"
                type="number"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
              />
            </div>
            <div className="grid grid-cols-3 gap-2">
              <Button 
                variant="outline" 
                onClick={() => setAmount('500')}
              >
                Rs. 500
              </Button>
              <Button 
                variant="outline" 
                onClick={() => setAmount('1000')}
              >
                Rs. 1,000
              </Button>
              <Button 
                variant="outline" 
                onClick={() => setAmount('5000')}
              >
                Rs. 5,000
              </Button>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowAddFunds(false)}>
              {t('cancel')}
            </Button>
            <Button onClick={handleAddFunds}>
              {t('addFunds')}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default HealthCard;
