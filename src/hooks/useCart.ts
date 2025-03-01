
import { useState, useEffect } from 'react';
import { toast } from 'sonner';
import { CartItem } from '@/types/checkout';

export const useCart = () => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Load cart from localStorage on initial load
  useEffect(() => {
    try {
      const savedCart = localStorage.getItem('cart');
      if (savedCart) {
        setCartItems(JSON.parse(savedCart));
      }
    } catch (error) {
      console.error('Error loading cart from localStorage:', error);
      // If there's an error parsing, reset the cart
      localStorage.removeItem('cart');
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    if (!isLoading) {
      localStorage.setItem('cart', JSON.stringify(cartItems));
    }
  }, [cartItems, isLoading]);

  const addToCart = async (productId: number) => {
    try {
      if (!productId) {
        throw new Error('Invalid product ID');
      }

      const existingItem = cartItems.find(item => item.product_id === productId);

      if (existingItem) {
        setCartItems(prev => prev.map(item => 
          item.id === existingItem.id 
            ? { ...item, quantity: item.quantity + 1 }
            : item
        ));
      } else {
        const newItem = {
          id: Math.random().toString(36).substr(2, 9),
          product_id: productId,
          quantity: 1
        };
        setCartItems(prev => [...prev, newItem]);
      }
      toast.success('Item added to cart');
    } catch (error) {
      console.error('Error adding to cart:', error);
      toast.error('Failed to add item to cart');
    }
  };

  const removeFromCart = async (itemId: string) => {
    try {
      if (!itemId) {
        throw new Error('Invalid item ID');
      }
      
      setCartItems(prev => prev.filter(item => item.id !== itemId));
      toast.success('Item removed from cart');
    } catch (error) {
      console.error('Error removing from cart:', error);
      toast.error('Failed to remove item from cart');
    }
  };

  const updateQuantity = async (itemId: string, quantity: number) => {
    try {
      if (!itemId) {
        throw new Error('Invalid item ID');
      }
      
      if (quantity < 1) {
        await removeFromCart(itemId);
        return;
      }

      setCartItems(prev => prev.map(item => 
        item.id === itemId ? { ...item, quantity } : item
      ));
      
      toast.success('Quantity updated');
    } catch (error) {
      console.error('Error updating quantity:', error);
      toast.error('Failed to update quantity');
    }
  };

  const clearCart = () => {
    setCartItems([]);
    localStorage.removeItem('cart');
    toast.success('Cart cleared');
  };

  const getCartTotal = () => 
    cartItems.reduce((sum, item) => sum + item.quantity, 0);
    
  const getCartSubtotal = (items: {price: number, quantity: number}[]) => 
    items.reduce((sum, item) => sum + (item.price * item.quantity), 0);

  return {
    cartItems,
    isLoading,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    getCartTotal,
    getCartSubtotal
  };
};
