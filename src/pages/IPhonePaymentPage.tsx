
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import { useAuthStatus } from '@/hooks/useAuthStatus';

const IPhonePaymentPage: React.FC = () => {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { user } = useAuthStatus();
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email || !name) {
      toast.error('Please fill in all required fields');
      return;
    }
    
    setIsLoading(true);
    
    try {
      // Call the Supabase Edge Function to create a Stripe Checkout session
      const { data, error } = await supabase.functions.invoke('create-iphone-checkout', {
        body: {
          priceId: 'prod_RrIPJKAbKeC0tv',
          customerName: name,
          customerEmail: email,
          userId: user?.id || null
        }
      });

      if (error) {
        console.error('Checkout error:', error);
        throw new Error(error.message);
      }

      if (!data?.url) {
        throw new Error('No checkout URL returned');
      }

      // Save initial payment record
      const { error: paymentError } = await supabase.from('iphone_payments').insert({
        user_id: user?.id || null,
        product_name: 'iPhone 14',
        email,
        amount: 999.00, // Placeholder price
        currency: 'usd',
        stripe_payment_id: data.paymentIntentId || null
      });

      if (paymentError) {
        console.error('Error saving payment record:', paymentError);
      }

      // Redirect to Stripe checkout
      window.location.href = data.url;
      
    } catch (error: any) {
      console.error('Payment error:', error);
      toast.error('There was an error initiating your payment: ' + error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container mx-auto py-12 px-4">
      <div className="max-w-4xl mx-auto grid md:grid-cols-2 gap-8">
        <div className="p-4">
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-2xl font-bold mb-4">iPhone 14</h2>
            <div className="mb-6 rounded-lg overflow-hidden">
              <img 
                src="/lovable-uploads/c13e1fe6-bb38-4421-b142-81eeab58cca5.png" 
                alt="iPhone 14" 
                className="w-full h-auto object-contain"
              />
            </div>
            <div className="space-y-2">
              <p className="text-lg font-semibold">Key Features:</p>
              <ul className="list-disc pl-5 space-y-1 text-gray-700">
                <li>Powerful A15 Bionic chip</li>
                <li>Dual-camera system with Night mode</li>
                <li>Super Retina XDR display</li>
                <li>All-day battery life</li>
                <li>5G cellular connectivity</li>
                <li>iOS 16 with advanced features</li>
              </ul>
            </div>
          </div>
        </div>
        
        <div className="p-4">
          <Card>
            <CardHeader>
              <CardTitle>iPhone 14 - One Time Payment</CardTitle>
              <CardDescription>Complete your purchase</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Full Name</Label>
                  <Input 
                    id="name" 
                    placeholder="Enter your full name" 
                    value={name} 
                    onChange={(e) => setName(e.target.value)} 
                    required 
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input 
                    id="email" 
                    type="email" 
                    placeholder="Enter your email" 
                    value={email} 
                    onChange={(e) => setEmail(e.target.value)} 
                    required 
                  />
                </div>
                
                <div className="pt-2">
                  <div className="flex justify-between mb-2">
                    <span className="font-medium">Product</span>
                    <span className="font-medium">iPhone 14</span>
                  </div>
                  <div className="flex justify-between font-medium">
                    <span>Price</span>
                    <span>$999.00</span>
                  </div>
                </div>
              </form>
            </CardContent>
            <CardFooter>
              <Button 
                onClick={handleSubmit}
                className="w-full bg-[#721244] hover:bg-[#5d0f37]" 
                disabled={isLoading}
              >
                {isLoading ? 'Processing...' : 'Pay $999.00'}
              </Button>
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default IPhonePaymentPage;
