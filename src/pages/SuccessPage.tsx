
import { useState, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CheckCircle } from "lucide-react";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";

const SuccessPage = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [sessionDetails, setSessionDetails] = useState<{
    sessionId: string | null;
    amount: number | null;
    currency: string | null;
  }>({
    sessionId: null,
    amount: null,
    currency: null
  });

  useEffect(() => {
    // Get session ID from URL
    const sessionId = searchParams.get("session_id");
    
    // Set session ID in state
    setSessionDetails(prev => ({
      ...prev,
      sessionId
    }));

    // Check user authentication status
    supabase.auth.getUser().then(({ data: { user } }) => {
      setIsAuthenticated(!!user);
      setIsLoading(false);
    });

    // Show success toast
    toast.success("Payment successful! Thank you for your purchase.");
    
    // Clear the cart
    localStorage.removeItem("cart");
  }, [searchParams]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 p-4">
      <Card className="w-full max-w-md shadow-lg">
        <CardHeader className="text-center">
          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-green-100">
            <CheckCircle className="h-8 w-8 text-green-600" />
          </div>
          <CardTitle className="text-2xl font-bold">Payment Successful!</CardTitle>
          <CardDescription className="text-gray-600">
            Thank you for your purchase
          </CardDescription>
        </CardHeader>
        
        <CardContent className="space-y-4">
          {sessionDetails.sessionId && (
            <div className="rounded-md bg-gray-100 p-4">
              <p className="text-sm font-medium text-gray-700">Payment Reference:</p>
              <p className="text-sm text-gray-600 break-all">{sessionDetails.sessionId}</p>
            </div>
          )}
          
          <p className="text-center text-gray-600">
            We've sent a confirmation email with your order details.
          </p>
        </CardContent>
        
        <CardFooter className="flex flex-col space-y-3">
          <Button 
            onClick={() => navigate(isAuthenticated ? "/market" : "/")} 
            className="w-full bg-[#721244] hover:bg-[#5d0f37]"
          >
            {isAuthenticated ? "Continue Shopping" : "Return to Home"}
          </Button>
          
          {!isAuthenticated && (
            <Button 
              onClick={() => navigate("/auth")} 
              variant="outline"
              className="w-full"
            >
              Sign In
            </Button>
          )}
        </CardFooter>
      </Card>
    </div>
  );
};

export default SuccessPage;
