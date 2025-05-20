
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Tabs, TabsList, TabsTrigger, TabsContent 
} from '@/components/ui/tabs';
import {
  Search, ShoppingCart, Package, Truck, Shield, Filter, Plus, Minus, Star, Clock, CheckCircle
} from 'lucide-react';
import { AspectRatio } from '@/components/ui/aspect-ratio';
import { useToast } from '@/hooks/use-toast';

interface Medication {
  id: number;
  name: string;
  generic?: string;
  description: string;
  price: number;
  discountPrice?: number;
  image: string;
  rating: number;
  reviews: number;
  prescription: boolean;
  availableCount: number;
  deliveryTime: string;
  category: string;
}

const mockMedications: Medication[] = [
  {
    id: 1,
    name: "Lisinopril 10mg",
    generic: "Lisinopril",
    description: "Used to treat high blood pressure and heart failure",
    price: 24.99,
    discountPrice: 19.99,
    image: "https://placehold.co/400x400/e2e8f0/64748b?text=Lisinopril",
    rating: 4.8,
    reviews: 156,
    prescription: true,
    availableCount: 100,
    deliveryTime: "1-2 days",
    category: "Prescription"
  },
  {
    id: 2,
    name: "Ibuprofen 200mg",
    generic: "Ibuprofen",
    description: "Pain reliever and fever reducer",
    price: 9.99,
    image: "https://placehold.co/400x400/e2e8f0/64748b?text=Ibuprofen",
    rating: 4.5,
    reviews: 243,
    prescription: false,
    availableCount: 50,
    deliveryTime: "Same day",
    category: "Over-the-counter"
  },
  {
    id: 3,
    name: "Amoxicillin 500mg",
    generic: "Amoxicillin",
    description: "Antibiotic used to treat bacterial infections",
    price: 34.99,
    discountPrice: 29.99,
    image: "https://placehold.co/400x400/e2e8f0/64748b?text=Amoxicillin",
    rating: 4.9,
    reviews: 87,
    prescription: true,
    availableCount: 30,
    deliveryTime: "1-2 days",
    category: "Prescription"
  },
  {
    id: 4,
    name: "Vitamin D3 2000 IU",
    description: "Dietary supplement to support bone health",
    price: 15.99,
    image: "https://placehold.co/400x400/e2e8f0/64748b?text=Vitamin+D3",
    rating: 4.7,
    reviews: 320,
    prescription: false,
    availableCount: 200,
    deliveryTime: "Same day",
    category: "Supplements"
  },
  {
    id: 5,
    name: "Cetirizine 10mg",
    generic: "Cetirizine",
    description: "Antihistamine for allergy relief",
    price: 12.99,
    discountPrice: 10.49,
    image: "https://placehold.co/400x400/e2e8f0/64748b?text=Cetirizine",
    rating: 4.6,
    reviews: 179,
    prescription: false,
    availableCount: 75,
    deliveryTime: "Same day",
    category: "Over-the-counter"
  },
  {
    id: 6,
    name: "Probiotic Complex",
    description: "Supports digestive and immune health",
    price: 29.99,
    discountPrice: 24.99,
    image: "https://placehold.co/400x400/e2e8f0/64748b?text=Probiotic",
    rating: 4.4,
    reviews: 142,
    prescription: false,
    availableCount: 60,
    deliveryTime: "1-2 days",
    category: "Supplements"
  },
  {
    id: 7,
    name: "Metformin 500mg",
    generic: "Metformin",
    description: "Used to treat type 2 diabetes",
    price: 19.99,
    image: "https://placehold.co/400x400/e2e8f0/64748b?text=Metformin",
    rating: 4.7,
    reviews: 103,
    prescription: true,
    availableCount: 90,
    deliveryTime: "1-2 days",
    category: "Prescription"
  },
  {
    id: 8,
    name: "First Aid Kit",
    description: "Essential supplies for emergency treatment",
    price: 39.99,
    discountPrice: 34.99,
    image: "https://placehold.co/400x400/e2e8f0/64748b?text=First+Aid+Kit",
    rating: 4.8,
    reviews: 215,
    prescription: false,
    availableCount: 25,
    deliveryTime: "Same day",
    category: "Medical Supplies"
  }
];

interface CartItem {
  medication: Medication;
  quantity: number;
}

const StarRating = ({ rating }: { rating: number }) => {
  return (
    <div className="flex items-center">
      {[1, 2, 3, 4, 5].map((star) => (
        <Star
          key={star}
          size={14}
          className={`${
            star <= rating ? 'text-amber-500 fill-amber-500' : 'text-gray-300'
          } ${star < rating && star + 1 > rating ? 'half-filled' : ''}`}
        />
      ))}
      <span className="ml-1 text-sm font-medium">{rating.toFixed(1)}</span>
    </div>
  );
};

const MedicationMarketplace = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState('all');
  const [medications, setMedications] = useState<Medication[]>(mockMedications);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [showCart, setShowCart] = useState(false);
  const { toast } = useToast();

  const handleSearch = () => {
    if (!searchQuery.trim()) {
      filterByCategory(activeTab);
      return;
    }
    
    const filtered = mockMedications.filter(med => 
      med.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (med.generic && med.generic.toLowerCase().includes(searchQuery.toLowerCase())) ||
      med.description.toLowerCase().includes(searchQuery.toLowerCase())
    );
    
    if (activeTab !== 'all') {
      const categoryFiltered = filtered.filter(med => 
        med.category.toLowerCase() === activeTab.toLowerCase()
      );
      setMedications(categoryFiltered);
    } else {
      setMedications(filtered);
    }
  };

  const filterByCategory = (category: string) => {
    setActiveTab(category);
    if (category === 'all') {
      setMedications(mockMedications);
    } else {
      const filtered = mockMedications.filter(med => 
        med.category.toLowerCase() === category.toLowerCase()
      );
      setMedications(filtered);
    }
  };

  const addToCart = (medication: Medication) => {
    if (medication.prescription) {
      toast({
        title: "Prescription Required",
        description: "Please upload a valid prescription or connect with your doctor to purchase this medication.",
        variant: "destructive",
      });
      return;
    }
    
    const existingItem = cart.find(item => item.medication.id === medication.id);
    
    if (existingItem) {
      updateQuantity(medication.id, existingItem.quantity + 1);
    } else {
      setCart([...cart, { medication, quantity: 1 }]);
      toast({
        title: "Added to Cart",
        description: `${medication.name} has been added to your cart.`,
      });
    }
  };

  const updateQuantity = (medicationId: number, newQuantity: number) => {
    if (newQuantity < 1) {
      return removeFromCart(medicationId);
    }
    
    const medication = medications.find(med => med.id === medicationId);
    if (!medication || newQuantity > medication.availableCount) {
      toast({
        title: "Quantity Limit",
        description: "Sorry, we don't have that many in stock.",
        variant: "destructive",
      });
      return;
    }
    
    const updatedCart = cart.map(item => {
      if (item.medication.id === medicationId) {
        return { ...item, quantity: newQuantity };
      }
      return item;
    });
    
    setCart(updatedCart);
  };

  const removeFromCart = (medicationId: number) => {
    const updatedCart = cart.filter(item => item.medication.id !== medicationId);
    setCart(updatedCart);
    
    const medication = medications.find(med => med.id === medicationId);
    if (medication) {
      toast({
        title: "Removed from Cart",
        description: `${medication.name} has been removed from your cart.`,
      });
    }
  };

  const getCartTotal = () => {
    return cart.reduce((total, item) => {
      const price = item.medication.discountPrice || item.medication.price;
      return total + (price * item.quantity);
    }, 0);
  };

  const handleCheckout = () => {
    if (cart.length === 0) return;
    
    setShowCart(false);
    toast({
      title: "Order Placed!",
      description: "Your medications will be on their way soon.",
    });
    setCart([]);
  };

  const cartItemCount = cart.reduce((count, item) => count + item.quantity, 0);

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader className="pb-3">
          <CardTitle>Medication Marketplace</CardTitle>
          <CardDescription>Find and order medications for delivery to your doorstep</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col sm:flex-row gap-3 mb-4">
            <div className="relative flex-grow">
              <Search size={16} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="Search medications, supplements and supplies..."
                className="pl-9"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
              />
            </div>
            <div className="flex gap-2">
              <Button onClick={handleSearch} className="flex-grow sm:flex-grow-0">
                <Search size={16} className="mr-1" /> Search
              </Button>
              <Button
                variant="outline"
                className="relative"
                onClick={() => setShowCart(!showCart)}
              >
                <ShoppingCart size={16} />
                {cartItemCount > 0 && (
                  <Badge
                    className="absolute -top-2 -right-2 w-5 h-5 p-0 flex items-center justify-center"
                    variant="destructive"
                  >
                    {cartItemCount}
                  </Badge>
                )}
              </Button>
            </div>
          </div>
          
          <Tabs value={activeTab} onValueChange={filterByCategory}>
            <TabsList className="mb-4 w-full overflow-auto">
              <TabsTrigger value="all">All Products</TabsTrigger>
              <TabsTrigger value="Prescription">Prescription</TabsTrigger>
              <TabsTrigger value="Over-the-counter">OTC</TabsTrigger>
              <TabsTrigger value="Supplements">Supplements</TabsTrigger>
              <TabsTrigger value="Medical Supplies">Supplies</TabsTrigger>
            </TabsList>
          </Tabs>
        </CardContent>
      </Card>
      
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        <div className={showCart ? "lg:col-span-2" : "lg:col-span-4"}>
          {medications.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {medications.map(medication => (
                <Card key={medication.id} className="overflow-hidden hover:shadow-md transition-all">
                  <div className="relative">
                    <AspectRatio ratio={1/1}>
                      <div className="absolute inset-0 flex items-center justify-center bg-muted">
                        <img 
                          src={medication.image} 
                          alt={medication.name} 
                          className="object-cover w-full h-full"
                        />
                      </div>
                    </AspectRatio>
                    {medication.prescription && (
                      <Badge className="absolute top-2 left-2 bg-blue-500">
                        Prescription
                      </Badge>
                    )}
                    {medication.discountPrice && (
                      <Badge className="absolute top-2 right-2 bg-red-500">
                        Sale
                      </Badge>
                    )}
                  </div>
                  
                  <CardContent className="p-4">
                    <div className="space-y-2">
                      <div>
                        <h3 className="font-medium line-clamp-1">{medication.name}</h3>
                        {medication.generic && (
                          <p className="text-xs text-muted-foreground">{medication.generic}</p>
                        )}
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <StarRating rating={medication.rating} />
                        <span className="text-xs text-muted-foreground">
                          {medication.reviews} reviews
                        </span>
                      </div>
                      
                      <p className="text-xs text-muted-foreground line-clamp-2">
                        {medication.description}
                      </p>
                      
                      <div className="flex items-center gap-2">
                        <Clock size={14} className="text-muted-foreground" />
                        <span className="text-xs">{medication.deliveryTime} delivery</span>
                      </div>
                      
                      <div className="flex items-center justify-between pt-2">
                        <div>
                          {medication.discountPrice ? (
                            <div className="flex items-center gap-2">
                              <span className="font-bold">${medication.discountPrice.toFixed(2)}</span>
                              <span className="text-xs line-through text-muted-foreground">
                                ${medication.price.toFixed(2)}
                              </span>
                            </div>
                          ) : (
                            <span className="font-bold">${medication.price.toFixed(2)}</span>
                          )}
                        </div>
                        
                        <Button 
                          size="sm" 
                          onClick={() => addToCart(medication)}
                          disabled={medication.availableCount === 0}
                        >
                          {medication.prescription ? 'View' : 'Add'}
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <Card>
              <CardContent className="flex flex-col items-center justify-center py-8">
                <Search size={48} className="text-muted-foreground mb-4" />
                <h3 className="text-lg font-medium">No medications found</h3>
                <p className="text-sm text-muted-foreground mt-1 text-center">
                  Try adjusting your search or browse categories
                </p>
              </CardContent>
            </Card>
          )}
        </div>
        
        {showCart && (
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <ShoppingCart size={18} /> Your Cart
                  </div>
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    onClick={() => setShowCart(false)}
                  >
                    Close
                  </Button>
                </CardTitle>
              </CardHeader>
              <CardContent>
                {cart.length > 0 ? (
                  <div className="space-y-4">
                    {cart.map(item => (
                      <div key={item.medication.id} className="flex gap-4 border-b pb-4">
                        <div className="h-16 w-16 bg-muted rounded flex-shrink-0">
                          <img
                            src={item.medication.image}
                            alt={item.medication.name}
                            className="h-full w-full object-cover rounded"
                          />
                        </div>
                        <div className="flex-grow">
                          <div className="flex justify-between">
                            <h3 className="font-medium">{item.medication.name}</h3>
                            <Button
                              variant="ghost"
                              size="sm"
                              className="h-6 w-6 p-0"
                              onClick={() => removeFromCart(item.medication.id)}
                            >
                              &times;
                            </Button>
                          </div>
                          <p className="text-sm text-muted-foreground">
                            ${((item.medication.discountPrice || item.medication.price)).toFixed(2)} each
                          </p>
                          <div className="flex items-center justify-between mt-2">
                            <div className="flex items-center border rounded">
                              <Button
                                variant="ghost"
                                size="sm"
                                className="h-8 px-2"
                                onClick={() => updateQuantity(item.medication.id, item.quantity - 1)}
                              >
                                <Minus size={14} />
                              </Button>
                              <span className="w-8 text-center">{item.quantity}</span>
                              <Button
                                variant="ghost"
                                size="sm"
                                className="h-8 px-2"
                                onClick={() => updateQuantity(item.medication.id, item.quantity + 1)}
                              >
                                <Plus size={14} />
                              </Button>
                            </div>
                            <span className="font-medium">
                              ${((item.medication.discountPrice || item.medication.price) * item.quantity).toFixed(2)}
                            </span>
                          </div>
                        </div>
                      </div>
                    ))}
                    
                    <div className="space-y-3 pt-2">
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Subtotal</span>
                        <span className="font-medium">${getCartTotal().toFixed(2)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Delivery</span>
                        <span className="font-medium">$5.99</span>
                      </div>
                      <div className="flex justify-between text-lg">
                        <span className="font-medium">Total</span>
                        <span className="font-bold">${(getCartTotal() + 5.99).toFixed(2)}</span>
                      </div>
                    </div>
                    
                    <div className="pt-4 space-y-4">
                      <div className="flex gap-2 text-sm">
                        <div className="flex items-center gap-1 text-green-600">
                          <Truck size={14} />
                          <span>Free delivery on orders over $50</span>
                        </div>
                      </div>
                      
                      <Button className="w-full" onClick={handleCheckout}>
                        Proceed to Checkout
                      </Button>
                      
                      <div className="flex items-center justify-center gap-4 text-xs text-muted-foreground pt-2">
                        <div className="flex items-center gap-1">
                          <Shield size={12} />
                          <span>Secure checkout</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Package size={12} />
                          <span>Discreet packaging</span>
                        </div>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="py-8 text-center">
                    <ShoppingCart size={48} className="mx-auto text-muted-foreground mb-4" />
                    <h3 className="text-lg font-medium">Your cart is empty</h3>
                    <p className="text-sm text-muted-foreground mt-1">
                      Browse our products and add items to your cart
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>
            
            <Card className="mt-4">
              <CardHeader className="pb-3">
                <CardTitle className="text-base">Prescription Upload</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="border-2 border-dashed rounded-md p-6 text-center">
                  <div className="mx-auto w-12 h-12 rounded-full bg-primary-50 flex items-center justify-center mb-4">
                    <CheckCircle className="text-primary h-6 w-6" />
                  </div>
                  <h4 className="font-medium">Upload Your Prescription</h4>
                  <p className="text-sm text-muted-foreground mt-1 mb-4">
                    Securely upload prescriptions for verification
                  </p>
                  <Button variant="outline">
                    Upload Prescription
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </div>
  );
};

export default MedicationMarketplace;
