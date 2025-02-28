
import React, { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

const PaymentSuccessPage: React.FC = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [isLoading, setIsLoading] = useState(true);
  
  // Get the payment_intent and session_id from the URL
  const paymentIntentId = searchParams.get('payment_intent');
  const sessionId = searchParams.get('session_id');
  
  useEffect(() => {
    const updatePaymentStatus = async () => {
      if (!paymentIntentId) {
        setIsLoading(false);
        return;
      }
      
      try {
        // Update the payment status in our database
        const { error } = await supabase
          .from('payments')
          .update({ 
            payment_status: 'completed',
            updated_at: new Date().toISOString()
          })
          .eq('payment_intent_id', paymentIntentId);
          
        if (error) {
          console.error("Error updating payment:", error);
          toast.error("There was an issue updating your payment status.");
        } else {
          toast.success("Payment completed successfully!");
        }
      } catch (err) {
        console.error("Error:", err);
      } finally {
        setIsLoading(false);
      }
    };
    
    updatePaymentStatus();
  }, [paymentIntentId]);
  
  return (
    <div className="container mx-auto max-w-md py-12 px-4 text-center">
      <div className="bg-white p-8 rounded-lg shadow-md">
        <div className="text-green-500 mb-4">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h1 className="text-2xl font-bold mb-4">Payment Successful!</h1>
        <p className="mb-6">Thank you for your purchase. Your payment has been successfully processed.</p>
        {paymentIntentId && (
          <p className="text-sm text-gray-500 mb-6">Payment ID: {paymentIntentId}</p>
        )}
        <Button 
          onClick={() => navigate('/market')} 
          className="bg-[#721244] hover:bg-[#5d0f37]"
        >
          Continue Shopping
        </Button>
      </div>
    </div>
  );
};

export default PaymentSuccessPage;
