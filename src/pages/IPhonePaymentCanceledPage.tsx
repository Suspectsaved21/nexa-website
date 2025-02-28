
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';

const IPhonePaymentCanceledPage: React.FC = () => {
  const navigate = useNavigate();
  
  return (
    <div className="container mx-auto max-w-md py-12 px-4 text-center">
      <div className="bg-white p-8 rounded-lg shadow-md">
        <div className="text-red-500 mb-4">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </div>
        <h1 className="text-2xl font-bold mb-4">Payment Canceled</h1>
        <p className="mb-6">Your iPhone 14 payment was canceled. No charges were made.</p>
        <div className="flex flex-col space-y-4">
          <Button 
            onClick={() => navigate('/iphone-payment')} 
            className="bg-[#721244] hover:bg-[#5d0f37]"
          >
            Try Again
          </Button>
          <Button 
            onClick={() => navigate('/')} 
            variant="outline"
          >
            Return to Home
          </Button>
        </div>
      </div>
    </div>
  );
};

export default IPhonePaymentCanceledPage;
