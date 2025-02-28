
import { useState, useEffect } from "react";
import { CartItem, CartItemWithDetails } from "@/types/checkout";
import { getAllProducts } from "@/data/productData";

export const useProductDetails = (cartItems: CartItem[]) => {
  const [itemsWithDetails, setItemsWithDetails] = useState<CartItemWithDetails[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const allProducts = getAllProducts();
    
    const items = cartItems.map(item => {
      const product = allProducts.find(p => p.id === item.product_id);
      if (!product) {
        console.error(`Product not found for id: ${item.product_id}`);
      }
      return {
        ...item,
        name: product?.name || "Product not found",
        price: product?.price || 0,
        image: product?.image || ""
      };
    });

    setItemsWithDetails(items);
    setIsLoading(false);
  }, [cartItems]);

  return { itemsWithDetails, isLoading };
};
