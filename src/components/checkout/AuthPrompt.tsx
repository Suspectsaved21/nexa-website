
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

export const AuthPrompt = () => {
  const navigate = useNavigate();

  return (
    <div className="text-center">
      <h2 className="text-2xl font-bold mb-4">Please log in to continue</h2>
      <Button onClick={() => navigate("/auth")} className="bg-[#721244] hover:bg-[#5d0f37]">
        Go to Login
      </Button>
    </div>
  );
};
