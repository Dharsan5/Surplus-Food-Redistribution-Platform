import React, { createContext, useContext, useReducer, ReactNode } from 'react';
import { CartItem, MenuItem, Restaurant } from '@/types';

interface CartState {
  items: CartItem[];
  restaurant: Restaurant | null;
  totalAmount: number;
  itemCount: number;
}

type CartAction =
  | { type: 'ADD_ITEM'; payload: { menuItem: MenuItem; restaurant: Restaurant } }
  | { type: 'REMOVE_ITEM'; payload: { itemId: string } }
  | { type: 'UPDATE_QUANTITY'; payload: { itemId: string; quantity: number } }
  | { type: 'CLEAR_CART' };

const CartContext = createContext<{
  state: CartState;
  dispatch: React.Dispatch<CartAction>;
} | null>(null);

const initialState: CartState = {
  items: [],
  restaurant: null,
  totalAmount: 0,
  itemCount: 0,
};

function cartReducer(state: CartState, action: CartAction): CartState {
  switch (action.type) {
    case 'ADD_ITEM': {
      const { menuItem, restaurant } = action.payload;
      
      // If adding from different restaurant, clear cart
      if (state.restaurant && state.restaurant.id !== restaurant.id) {
        const newItem: CartItem = {
          id: `${menuItem.id}-${Date.now()}`,
          menuItem,
          quantity: 1,
          customizations: [],
          totalPrice: menuItem.price,
        };
        
        return {
          items: [newItem],
          restaurant,
          totalAmount: menuItem.price,
          itemCount: 1,
        };
      }
      
      // Check if item already exists
      const existingItemIndex = state.items.findIndex(
        item => item.menuItem.id === menuItem.id
      );
      
      if (existingItemIndex >= 0) {
        const updatedItems = [...state.items];
        updatedItems[existingItemIndex].quantity += 1;
        updatedItems[existingItemIndex].totalPrice += menuItem.price;
        
        return {
          ...state,
          items: updatedItems,
          totalAmount: state.totalAmount + menuItem.price,
          itemCount: state.itemCount + 1,
        };
      } else {
        const newItem: CartItem = {
          id: `${menuItem.id}-${Date.now()}`,
          menuItem,
          quantity: 1,
          customizations: [],
          totalPrice: menuItem.price,
        };
        
        return {
          ...state,
          items: [...state.items, newItem],
          restaurant: state.restaurant || restaurant,
          totalAmount: state.totalAmount + menuItem.price,
          itemCount: state.itemCount + 1,
        };
      }
    }
    
    case 'REMOVE_ITEM': {
      const itemToRemove = state.items.find(item => item.id === action.payload.itemId);
      if (!itemToRemove) return state;
      
      const updatedItems = state.items.filter(item => item.id !== action.payload.itemId);
      const newTotalAmount = state.totalAmount - itemToRemove.totalPrice;
      const newItemCount = state.itemCount - itemToRemove.quantity;
      
      return {
        ...state,
        items: updatedItems,
        restaurant: updatedItems.length === 0 ? null : state.restaurant,
        totalAmount: newTotalAmount,
        itemCount: newItemCount,
      };
    }
    
    case 'UPDATE_QUANTITY': {
      const { itemId, quantity } = action.payload;
      const itemIndex = state.items.findIndex(item => item.id === itemId);
      
      if (itemIndex === -1 || quantity < 0) return state;
      
      if (quantity === 0) {
        return cartReducer(state, { type: 'REMOVE_ITEM', payload: { itemId } });
      }
      
      const updatedItems = [...state.items];
      const item = updatedItems[itemIndex];
      const quantityDiff = quantity - item.quantity;
      const priceDiff = quantityDiff * item.menuItem.price;
      
      updatedItems[itemIndex] = {
        ...item,
        quantity,
        totalPrice: item.menuItem.price * quantity,
      };
      
      return {
        ...state,
        items: updatedItems,
        totalAmount: state.totalAmount + priceDiff,
        itemCount: state.itemCount + quantityDiff,
      };
    }
    
    case 'CLEAR_CART':
      return initialState;
    
    default:
      return state;
  }
}

export function CartProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(cartReducer, initialState);
  
  return (
    <CartContext.Provider value={{ state, dispatch }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
}