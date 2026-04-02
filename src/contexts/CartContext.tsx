import React, { createContext, useContext, useReducer, useEffect } from 'react';
import type { ReactNode } from 'react';
// import { productService } from '../firebase/services';

export interface Product {
  id: number;
  name: string;
  price: number;
  image: string;
  description: string;
}

export interface CartItem extends Product {
  quantity: number;
}

interface CartState {
  items: CartItem[];
  total: number;
  loading: boolean;
  error: string | null;
}

type CartAction =
  | { type: 'ADD_TO_CART'; product: Product }
  | { type: 'REMOVE_FROM_CART'; productId: number }
  | { type: 'UPDATE_QUANTITY'; productId: number; quantity: number }
  | { type: 'CLEAR_CART' }
  | { type: 'SET_LOADING'; loading: boolean }
  | { type: 'SET_ERROR'; error: string | null }
  | { type: 'LOAD_CART'; items: CartItem[] };

interface CartContextType {
  state: CartState;
  dispatch: React.Dispatch<CartAction>;
  addToCart: (product: Product) => void;
  removeFromCart: (productId: number) => void;
  updateQuantity: (productId: number, quantity: number) => void;
  clearCart: () => void;
  getCartItemsCount: () => number;
  saveCartToStorage: () => void;
  loadCartFromStorage: () => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

const cartReducer = (state: CartState, action: CartAction): CartState => {
  switch (action.type) {
    case 'ADD_TO_CART':
      const existingItem = state.items.find(item => item.id === action.product.id);
      
      if (existingItem) {
        const updatedItems = state.items.map(item =>
          item.id === action.product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
        const total = updatedItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
        return { ...state, items: updatedItems, total };
      } else {
        const newItems = [...state.items, { ...action.product, quantity: 1 }];
        const total = newItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
        return { ...state, items: newItems, total };
      }

    case 'REMOVE_FROM_CART':
      const filteredItems = state.items.filter(item => item.id !== action.productId);
      const total = filteredItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
      return { ...state, items: filteredItems, total };

    case 'UPDATE_QUANTITY':
      const updatedItems = state.items.map(item =>
        item.id === action.productId
          ? { ...item, quantity: action.quantity }
          : item
      ).filter(item => item.quantity > 0);
      const newTotal = updatedItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
      return { ...state, items: updatedItems, total: newTotal };

    case 'CLEAR_CART':
      return { ...state, items: [], total: 0 };

    case 'SET_LOADING':
      return { ...state, loading: action.loading };

    case 'SET_ERROR':
      return { ...state, error: action.error };

    case 'LOAD_CART':
      const loadTotal = action.items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
      return { ...state, items: action.items, total: loadTotal };

    default:
      return state;
  }
};

const CART_STORAGE_KEY = 'food-ecommerce-cart';

export const CartProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(cartReducer, { 
    items: [], 
    total: 0, 
    loading: false, 
    error: null 
  });

  // Load cart from localStorage on initialization
  useEffect(() => {
    loadCartFromStorage();
  }, []);

  // Save cart to localStorage whenever cart changes
  useEffect(() => {
    if (state.items.length > 0) {
      saveCartToStorage();
    }
  }, [state.items]);

  const addToCart = (product: Product) => {
    dispatch({ type: 'ADD_TO_CART', product });
  };

  const removeFromCart = (productId: number) => {
    dispatch({ type: 'REMOVE_FROM_CART', productId });
  };

  const updateQuantity = (productId: number, quantity: number) => {
    dispatch({ type: 'UPDATE_QUANTITY', productId, quantity });
  };

  const clearCart = () => {
    dispatch({ type: 'CLEAR_CART' });
    localStorage.removeItem(CART_STORAGE_KEY);
  };

  const getCartItemsCount = () => {
    return state.items.reduce((total, item) => total + item.quantity, 0);
  };

  const saveCartToStorage = () => {
    try {
      localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(state.items));
    } catch (error) {
      console.error('Error saving cart to localStorage:', error);
    }
  };

  const loadCartFromStorage = () => {
    try {
      const savedCart = localStorage.getItem(CART_STORAGE_KEY);
      if (savedCart) {
        const cartItems: CartItem[] = JSON.parse(savedCart);
        dispatch({ type: 'LOAD_CART', items: cartItems });
      }
    } catch (error) {
      console.error('Error loading cart from localStorage:', error);
      dispatch({ type: 'SET_ERROR', error: 'Failed to load cart data' });
    }
  };

  return (
    <CartContext.Provider
      value={{
        state,
        dispatch,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        getCartItemsCount,
        saveCartToStorage,
        loadCartFromStorage,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};