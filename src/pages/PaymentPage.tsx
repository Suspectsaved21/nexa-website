
import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { PaymentForm } from '@/components/payment/PaymentForm';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import { getAllProducts } from '@/data/productData';

const PaymentPage: React.FC = () => {
  const navigate = useNavigate();
  const { productId } = useParams<{ productId: string }>();
  const [isLoading, setIsLoading] = useState(false);

  // Find the product by ID
  const allProducts = getAllProducts();
  const product = allProducts.find(p => p.id === Number(productId));

  if (!product) {
    return (
      <div className="container mx-auto max-w-4xl py-12 px-4">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Product Not Found</h1>
          <p className="mb-4">The product you're looking for does not exist.</p>
          <button 
            onClick={() => navigate('/market')} 
            className="bg-[#721244] hover:bg-[#5d0f37] text-white px-4 py-2 rounded"
          >
            Return to Market
          </button>
        </div>
      </div>
    );
  }

  const handlePayment = async (name: string, email: string) => {
    setIsLoading(true);
    
    try {
      // Call the Supabase Edge Function to create a Stripe Checkout session
      const { data, error } = await supabase.functions.invoke('create-checkout-session', {
        body: {
          productId: product.id,
          productName: product.name,
          unitAmount: product.price * 100, // Convert to cents for Stripe
          customerName: name,
          customerEmail: email
        }
      });

      if (error) {
        throw new Error(error.message);
      }

      // Save the initial payment record in Supabase
      const { error: paymentError } = await supabase
        .from('payments')
        .insert({
          name,
          email,
          amount: product.price,
          product_id: product.id,
          payment_intent_id: data.paymentIntentId,
        });

      if (paymentError) {
        console.error("Error saving payment record:", paymentError);
      }

      // Redirect to Stripe Checkout
      window.location.href = data.url;
      
    } catch (error: any) {
      console.error("Payment error:", error);
      toast.error("There was an error initiating your payment. Please try again.");
      setIsLoading(false);
    }
  };

  return (
    <div className="container mx-auto max-w-4xl py-12 px-4">
      <div className="grid md:grid-cols-2 gap-8">
        <div className="p-4">
          <h1 className="text-2xl font-bold mb-4">{product.name}</h1>
          <div className="rounded overflow-hidden mb-4">
            <img 
              src={product.image} 
              alt={product.name} 
              className="w-full h-auto object-cover"
            />
          </div>
          <p className="text-xl font-bold mb-2">${product.price.toFixed(2)}</p>
        </div>
        
        <div className="p-4">
          <PaymentForm 
            productId={product.id}
            productName={product.name}
            productPrice={product.price}
            onSubmit={handlePayment}
          />
        </div>
      </div>
    </div>
  );
};

export default PaymentPage;
