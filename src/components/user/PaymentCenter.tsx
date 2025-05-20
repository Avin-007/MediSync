
import React from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Wallet, Plus, Download, BarChart3, CreditCard } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { useToast } from '@/hooks/use-toast';

const PaymentCenter = () => {
  const { t, language } = useLanguage();
  const { toast } = useToast();

  // Mock payment data
  const balance = 15000;
  const currencySymbol = 'रू';
  
  // Mock transaction history
  const transactions = [
    {
      id: 'tx-123',
      date: '2024-05-15',
      description: language === 'en' ? 'Medical Checkup' : 'चिकित्सा जाँच',
      amount: -2500,
      status: language === 'en' ? 'Completed' : 'पूरा भयो'
    },
    {
      id: 'tx-122',
      date: '2024-05-10',
      description: language === 'en' ? 'Added Funds' : 'रकम थपियो',
      amount: 5000,
      status: language === 'en' ? 'Completed' : 'पूरा भयो'
    },
    {
      id: 'tx-121',
      date: '2024-05-05',
      description: language === 'en' ? 'Medicine Purchase' : 'औषधि खरिद',
      amount: -1200,
      status: language === 'en' ? 'Completed' : 'पूरा भयो'
    }
  ];
  
  const handleAddFunds = () => {
    toast({
      title: t('addFunds'),
      description: language === 'en' 
        ? 'Redirecting to payment gateway...' 
        : 'भुक्तानी गेटवेमा रिडाइरेक्ट गर्दै...',
    });
  };

  const formatCurrency = (amount: number) => {
    return `${currencySymbol} ${Math.abs(amount).toLocaleString()}`;
  };

  return (
    <Card className="border-2 border-nepal-mountain-green overflow-hidden">
      <CardHeader className="bg-nepal-mountain-green text-white">
        <CardTitle className="flex items-center gap-2">
          <Wallet className="h-5 w-5" />
          {t('payments')}
        </CardTitle>
        <CardDescription className="text-white/80">
          {language === 'en' 
            ? 'Manage your health payments and add funds' 
            : 'आफ्नो स्वास्थ्य भुक्तानी व्यवस्थापन गर्नुहोस् र रकम थप्नुहोस्'}
        </CardDescription>
      </CardHeader>
      <CardContent className="p-6">
        <div className="bg-gray-50 rounded-lg p-4 mb-6">
          <div className="text-sm text-gray-500">
            {language === 'en' ? 'Available Balance' : 'उपलब्ध ब्यालेन्स'}
          </div>
          <div className="text-3xl font-bold text-nepal-mountain-green mt-1">
            {formatCurrency(balance)}
          </div>
          <Button 
            className="mt-3 bg-nepal-mountain-green hover:bg-nepal-mountain-green/90 w-full"
            onClick={handleAddFunds}
          >
            <Plus className="h-4 w-4 mr-2" />
            {t('addFunds')}
          </Button>
        </div>
        
        <div>
          <h3 className="font-semibold mb-3 flex items-center gap-2">
            <BarChart3 className="h-4 w-4" />
            {t('transactionHistory')}
          </h3>
          
          <div className="space-y-3">
            {transactions.map((tx) => (
              <div 
                key={tx.id} 
                className="flex justify-between items-center border-b pb-3"
              >
                <div>
                  <div className="font-medium">{tx.description}</div>
                  <div className="text-xs text-gray-500">
                    {new Date(tx.date).toLocaleDateString()} • {tx.status}
                  </div>
                </div>
                <div className={`font-medium ${tx.amount > 0 ? 'text-green-600' : ''}`}>
                  {tx.amount > 0 ? '+' : ''}{formatCurrency(tx.amount)}
                </div>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
      <CardFooter className="bg-gray-50 flex justify-between">
        <Button variant="outline" className="gap-2">
          <Download className="h-4 w-4" />
          {language === 'en' ? 'Download Statement' : 'विवरण डाउनलोड गर्नुहोस्'}
        </Button>
        <Button className="gap-2 bg-nepal-mountain-green hover:bg-nepal-mountain-green/90">
          <CreditCard className="h-4 w-4" />
          {language === 'en' ? 'Payment Methods' : 'भुक्तानी विधिहरू'}
        </Button>
      </CardFooter>
    </Card>
  );
};

export default PaymentCenter;
