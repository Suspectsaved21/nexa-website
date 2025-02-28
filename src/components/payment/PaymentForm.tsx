
import React, { useState } from 'react';
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { supabase } from "@/integrations/supabase/client";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

interface PaymentFormProps {
  productId: number;
  productName: string;
  productPrice: number;
  onSubmit: (name: string, email: string) => Promise<void>;
}

export const PaymentForm: React.FC<PaymentFormProps> = ({ 
  productId, 
  productName, 
  productPrice,
  onSubmit
}) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!name || !email) {
      toast.error("Please fill in all required fields");
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      await onSubmit(name, email);
    } catch (error) {
      console.error("Payment error:", error);
      toast.error("There was an error processing your payment. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle>Complete your purchase</CardTitle>
        <CardDescription>You're purchasing {productName}</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">Name</Label>
            <Input 
              id="name" 
              type="text" 
              value={name} 
              onChange={(e) => setName(e.target.value)} 
              placeholder="Your full name"
              required
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input 
              id="email" 
              type="email" 
              value={email} 
              onChange={(e) => setEmail(e.target.value)} 
              placeholder="Your email address"
              required
            />
          </div>

          <div className="pt-4 border-t">
            <div className="flex justify-between font-medium">
              <span>Total</span>
              <span>${productPrice.toFixed(2)}</span>
            </div>
          </div>

          <Button 
            type="submit" 
            className="w-full bg-[#721244] hover:bg-[#5d0f37]" 
            disabled={isSubmitting}
          >
            {isSubmitting ? "Processing..." : `Pay $${productPrice.toFixed(2)}`}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};
