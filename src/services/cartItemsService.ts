
import { CartItem, CartItemWithDetails } from "@/types/checkout";
import { getProductData, ProductData } from "./productData";

export const getCartItemsWithDetails = (cartItems: CartItem[]): CartItemWithDetails[] => {
  const allProducts = getProductData();
  
  return cartItems.map(item => {
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
};
