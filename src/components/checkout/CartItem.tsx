import { Button } from "@/components/ui/button";
import { Plus, Minus, Trash2 } from "lucide-react";
import { CartItemProps } from "@/types/checkout";

export const CartItem = ({
  id,
  name,
  price,
  image,
  quantity,
  onUpdateQuantity,
  onRemove
}: CartItemProps) => {
  return (
    <div className="flex items-center gap-4 p-4 bg-white rounded-lg shadow">
      <img src={image} alt={name} className="w-24 h-24 object-contain" />
      
      <div className="flex-1">
        <h3 className="text-lg font-semibold">{name}</h3>
        <p className="text-gray-600">${price}</p>
      </div>
      
      <div className="flex items-center gap-2">
        <Button 
          variant="outline"
          size="icon"
          onClick={() => onUpdateQuantity(id, quantity - 1)}
        >
          <Minus className="h-4 w-4" />
        </Button>
        <span className="w-8 text-center">{quantity}</span>
        <Button 
          variant="outline"
          size="icon"
          onClick={() => onUpdateQuantity(id, quantity + 1)}
        >
          <Plus className="h-4 w-4" />
        </Button>
        <Button 
          variant="destructive"
          size="icon"
          onClick={() => onRemove(id)}
        >
          <Trash2 className="h-4 w-4" />
        </Button>
      </div>
      
      <div className="text-right min-w-[100px]">
        <p className="font-semibold">${(price * quantity).toFixed(2)}</p>
      </div>
    </div>
  );
};
