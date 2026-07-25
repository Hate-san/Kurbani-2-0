import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Animal, CartItem, PurchaseType } from '../types';

interface CartContextType {
  cart: CartItem[];
  addToCart: (animal: Animal, purchaseType: PurchaseType, shares: number) => void;
  removeFromCart: (animalId: number) => void;
  clearCart: () => void;
  cartTotal: number;
  totalSharesCount: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [cart, setCart] = useState<CartItem[]>(() => {
    const saved = localStorage.getItem('agro_cart');
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem('agro_cart', JSON.stringify(cart));
  }, [cart]);

  const addToCart = (animal: Animal, purchaseType: PurchaseType, shares: number) => {
    let finalShares = shares;
    if (purchaseType === 'whole') {
      finalShares = animal.available_shares;
    }

    const pricePerShare = Math.round(animal.price / animal.total_shares);
    const totalPrice = pricePerShare * finalShares;

    const newItem: CartItem = {
      animal,
      purchase_type: purchaseType,
      shares: finalShares,
      total_price: totalPrice,
    };

    // Replace if already in cart or append
    setCart((prev) => {
      const filtered = prev.filter((item) => item.animal.id !== animal.id);
      return [...filtered, newItem];
    });
  };

  const removeFromCart = (animalId: number) => {
    setCart((prev) => prev.filter((item) => item.animal.id !== animalId));
  };

  const clearCart = () => {
    setCart([]);
  };

  const cartTotal = cart.reduce((sum, item) => sum + item.total_price, 0);
  const totalSharesCount = cart.reduce((sum, item) => sum + item.shares, 0);

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart, clearCart, cartTotal, totalSharesCount }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = (): CartContextType => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
